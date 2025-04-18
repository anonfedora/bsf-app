'use client';

import React, { useEffect, useState } from 'react';
import { Logo } from '@/components/Logo';
import { QuestionDisplay } from '@/components/QuestionDisplay';
import { GameLevels } from '@/components/GameLevels';
import { GameControls } from '@/components/GameControls';
import { useGameStore } from '@/lib/store';
import { Question } from '@/lib/types';
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
    selectOption,
    setCurrentQuestion,
    revealCorrectAnswer,
    resetAnswer,
    restartGame,
    questionsAnswered,
    currentLevel,
    nextQuestion: storeNextQuestion,
    initializeQuestions,
  } = useGameStore();

  // Socket connection
  const { socket, isConnected, connectionError, updateGameState, selectQuestion: emitQuestion, selectOption: emitOption, revealAnswer: emitReveal, resetGame: emitReset, nextQuestion: emitNextQuestion } = useSocket();

  // Initialize game state on mount
  useEffect(() => {
    if (socket) {
      // Initialize questions if not already done
      if (!gameStarted) {
        initializeQuestions();
        // Emit initial game state
        updateGameState({
          gameStarted: true,
          currentQuestion: questions[0],
          currentLevel: 1,
          questionsAnswered: 0
        });
      }

      socket.on('gameState', (data) => {
        // Only update if there are actual changes
        const updates: any = {};
        let hasChanges = false;

        if (data.currentQuestion && data.currentQuestion.id !== currentQuestion?.id) {
          updates.currentQuestion = data.currentQuestion;
          hasChanges = true;
        }
        if (data.selectedOption !== undefined && data.selectedOption !== selectedOption) {
          updates.selectedOption = data.selectedOption;
          hasChanges = true;
        }
        if (data.revealAnswer !== undefined && data.revealAnswer !== revealAnswer) {
          updates.revealAnswer = data.revealAnswer;
          hasChanges = true;
        }
        if (data.currentLevel !== undefined && data.currentLevel !== currentLevel) {
          updates.currentLevel = data.currentLevel;
          hasChanges = true;
        }
        if (data.gameStarted !== undefined && data.gameStarted !== gameStarted) {
          updates.gameStarted = data.gameStarted;
          hasChanges = true;
        }

        if (hasChanges) {
          updateGameState(updates);
        }
      });
    }

    return () => {
      socket?.off('gameState');
    };
  }, [socket, currentQuestion, selectedOption, revealAnswer, currentLevel, gameStarted]);

  const handleSelectQuestion = (question: Question) => {
    setCurrentQuestion(question);
    emitQuestion(question);
  };

  const handleSelectOption = (optionId: string) => {
    selectOption(optionId);
    emitOption(optionId);
  };

  const handleRevealAnswer = () => {
    revealCorrectAnswer();
    emitReveal();
  };

  const handleNextQuestion = () => {
    storeNextQuestion();
    emitNextQuestion();
  };

  const handleResetGame = () => {
    restartGame();
    emitReset();
  };

  const handleClearState = () => {
    // Clear localStorage
    localStorage.removeItem('millionaire-game-storage');
    localStorage.removeItem('millionaireQuestions');
    
    // Reset game state
    restartGame();
    emitReset();
    
    // Reload the page to ensure clean state
    window.location.reload();
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
            disabled={false}
          />
          
          <GameControls
            currentQuestion={currentQuestion}
            questions={questions}
            onSelectQuestion={handleSelectQuestion}
            onRevealAnswer={handleRevealAnswer}
            onNextQuestion={handleNextQuestion}
            onResetGame={handleResetGame}
            onClearState={handleClearState}
            revealAnswer={revealAnswer}
            gameEnded={gameEnded}
          />
        </div>
      </div>
    </div>
  );
}