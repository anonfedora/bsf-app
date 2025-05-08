'use client';

import React, { useEffect, useState } from 'react';
import { Logo } from '@/components/Logo';
import { QuestionDisplay } from '@/components/QuestionDisplay';
import { GameLevels } from '@/components/GameLevels';
import { GameControls } from '@/components/GameControls';
import { useGameStore } from '@/lib/store';
import { Question, GameState } from '@/lib/types';
import { useSocket } from '@/lib/socket';
import { questions } from '@/lib/questions';

export default function PresenterPage() {
  // Game state from store
  const {
    currentQuestion,
    selectedOption,
    revealAnswer,
    gameStarted,
    gameEnded,
    questionsAnswered,
    currentLevel,
    updateGameState,
    initializeQuestions,
    score,
    failedLevels,
    fiftyFiftyUsed,
    useFiftyFifty,
    removedOptions
  } = useGameStore();

  // Socket connection
  const { socket, isConnected, connectionError } = useSocket();

  // Initialize game state on mount
  useEffect(() => {
    if (!socket) return;

    // Initialize questions if not already done
    if (!gameStarted) {
      initializeQuestions();
      // Emit initial game state
      socket.emit('updateGameState', {
        gameStarted: true,
        currentQuestion: questions[0],
        currentLevel: 1,
        questionsAnswered: 0,
        selectedOption: null,
        revealAnswer: false,
        score: 0,
        gameEnded: false,
        failedLevels: []
      });
    }

    const handleGameState = (data: any) => {
      if (!data) return;
      
      // Update local state to match server state
      updateGameState({
        currentQuestion: data.currentQuestion,
        selectedOption: data.selectedOption,
        revealAnswer: data.revealAnswer,
        gameStarted: data.gameStarted,
        gameEnded: data.gameEnded,
        score: data.score,
        questionsAnswered: data.questionsAnswered,
        currentLevel: data.currentLevel,
        failedLevels: data.failedLevels || [],
        removedOptions: data.removedOptions || [],
        fiftyFiftyUsed: data.fiftyFiftyUsed || false
      });
    };

    // Set up event listeners
    socket.on('gameState', handleGameState);

    // Request initial state
    socket.emit('getGameState');

    return () => {
      socket.off('gameState', handleGameState);
    };
  }, [socket, gameStarted, updateGameState, initializeQuestions]);

  // Function to emit state updates to all clients
  const emitGameState = (updates: Partial<GameState>) => {
    if (!socket) return;
    
    // Update local state
    updateGameState(updates);
    // Emit to server
    socket.emit('updateGameState', updates);
  };

  const handleSelectQuestion = (question: Question) => {
    emitGameState({
      currentQuestion: question,
      selectedOption: null,
      revealAnswer: false
    });
  };

  const handleSelectOption = (optionId: string) => {
    emitGameState({
      selectedOption: optionId
    });
  };

  const handleRevealAnswer = () => {
    if (!currentQuestion || !selectedOption) return;
    
    const isCorrect = selectedOption === currentQuestion.correctOption;
    
    emitGameState({
      revealAnswer: true,
      score: isCorrect ? (score || 0) + 1 : score,
      failedLevels: isCorrect ? failedLevels : [...(failedLevels || []), currentLevel]
    });
  };

  const handleNextQuestion = () => {
    if (!currentQuestion) return;
    
    // Simply emit the 'nextQuestion' event and let the server handle the state update
    if (!socket) {
      console.error('Socket not connected');
      return;
    }
    socket.emit('nextQuestion');
  };

  const handleResetGame = () => {
    emitGameState({
      currentQuestion: questions[0],
      selectedOption: null,
      revealAnswer: false,
      gameStarted: true,
      gameEnded: false,
      score: 0,
      questionsAnswered: 0,
      currentLevel: 1,
      failedLevels: []
    });
  };

  const handleClearState = () => {
    // Clear localStorage
    localStorage.removeItem('millionaire-game-storage');
    localStorage.removeItem('millionaireQuestions');
    
    handleResetGame();
  };

  const handleResetRoles = () => {
    if (!socket) {
      console.log('Socket is not connected');
      return;
    }
    console.log('Emitting resetRoles event');
    socket.emit('resetRoles');
  };

  const handleFiftyFifty = () => {
    if (!socket) return;
    useFiftyFifty();
    socket.emit('fiftyFifty');
  };

  return (
    <div className="millionaire-bg min-h-screen flex flex-col items-center justify-center p-4">
      <Logo />
      
      <div className="max-w-7xl w-full flex gap-6">
        <div className="w-1/4">
          <GameLevels />
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-white">Presenter View</h2>
            <div className="flex items-center gap-2">
              <div className={`px-3 py-1 rounded-full text-xs ${isConnected ? 'bg-green-600' : 'bg-red-600'}`}>
                {isConnected ? 'Connected' : 'Disconnected'}
              </div>
              {connectionError && (
                <div className="text-red-500 text-xs">
                  {connectionError}
                </div>
              )}
            </div>
          </div>
          
          <QuestionDisplay
            question={currentQuestion}
            selectedOption={selectedOption}
            revealAnswer={revealAnswer}
            onSelectOption={handleSelectOption}
            disabled={false} // Presenter can select options
            removedOptions={removedOptions}
          />
          
          <GameControls
            currentQuestion={currentQuestion}
            questions={questions}
            onSelectQuestion={handleSelectQuestion}
            onRevealAnswer={handleRevealAnswer}
            onNextQuestion={handleNextQuestion}
            onResetGame={handleResetGame}
            onClearState={handleClearState}
            onResetRoles={handleResetRoles}
            onFiftyFifty={handleFiftyFifty}
            revealAnswer={revealAnswer}
            gameEnded={gameEnded}
            fiftyFiftyUsed={fiftyFiftyUsed}
          />
        </div>
      </div>
    </div>
  );
}