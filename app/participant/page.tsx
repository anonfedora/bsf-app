'use client';

import React, { useEffect, useState } from 'react';
import { Logo } from '@/components/Logo';
import { QuestionDisplay } from '@/components/QuestionDisplay';
import { GameLevels } from '@/components/GameLevels';
import { useGameStore } from '@/lib/store';
import { useSocket } from '@/lib/socket';
import { difficultyToMoney, formatMoney } from '@/lib/utils';

export default function ParticipantPage() {
  // Game state from store
  const {
    currentQuestion,
    selectedOption,
    revealAnswer,
    gameStarted,
    gameEnded,
    selectOption: storeSelectOption,
    questionsAnswered,
    currentLevel,
    revealCorrectAnswer,
    setCurrentQuestion,
    updateGameState,
    initializeQuestions
  } = useGameStore();

  // State to show feedback messages
  const [message, setMessage] = useState<string | null>(null);

  // Socket connection
  const { socket, isConnected, connectionError } = useSocket();

  // Add a ref to track current state
  const currentStateRef = React.useRef({
    currentQuestion,
    selectedOption,
    revealAnswer,
    currentLevel,
    questionsAnswered,
    gameEnded
  });

  // Update ref when state changes
  React.useEffect(() => {
    currentStateRef.current = {
      currentQuestion,
      selectedOption,
      revealAnswer,
      currentLevel,
      questionsAnswered,
      gameEnded
    };
  }, [currentQuestion, selectedOption, revealAnswer, currentLevel, questionsAnswered, gameEnded]);

  // Initialize game state on mount
  useEffect(() => {
    if (socket) {
      // Reset game state on mount
      initializeQuestions();
      
      // Request initial game state
      socket.emit('getGameState');

      socket.on('gameState', (data) => {
        console.log('Received game state:', data); // Debug log
        
        // Update all state values at once
        const updates = {
          currentQuestion: data.currentQuestion,
          selectedOption: data.selectedOption,
          revealAnswer: data.revealAnswer,
          gameStarted: data.gameStarted !== undefined ? data.gameStarted : true,
          gameEnded: data.gameEnded,
          score: data.score,
          questionsAnswered: data.questionsAnswered,
          currentLevel: data.currentLevel,
          failedLevels: data.failedLevels || []
        };

        // Log the updates being applied
        console.log('Applying updates:', updates);
        
        // Apply updates to the store
        updateGameState(updates);

        if (data.gameEnded) {
          setMessage('Game Over!');
        } else {
          setMessage(null);
        }
      });

      // Handle connection events
      socket.on('connect', () => {
        console.log('Socket connected'); // Debug log
        socket.emit('getGameState');
      });

      socket.on('disconnect', () => {
        console.log('Socket disconnected'); // Debug log
        setMessage('Disconnected from server');
      });

      socket.on('connect_error', (error) => {
        console.error('Connection error:', error);
        setMessage('Connection error. Please refresh the page.');
      });
    }

    return () => {
      socket?.off('gameState');
      socket?.off('connect');
      socket?.off('disconnect');
      socket?.off('connect_error');
    };
  }, [socket, updateGameState, initializeQuestions]);

  // Add debug logging for state changes
  useEffect(() => {
    console.log('Game state updated:', {
      gameStarted,
      currentQuestion,
      currentLevel,
      questionsAnswered,
      selectedOption,
      revealAnswer
    });
  }, [gameStarted, currentQuestion, currentLevel, questionsAnswered, selectedOption, revealAnswer]);

  const handleSelectOption = (optionId: string) => {
    // In participant view, options are selected by the presenter
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
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white">Participant View</h2>
              <div className="text-white mt-2">
                <span className="font-bold">Current Level:</span> {currentLevel}
                <span className="mx-2">•</span>
                <span className="font-bold">Questions Answered:</span> {questionsAnswered}
              </div>
            </div>
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
          
          {message && (
            <div className="animate-pulse bg-gradient-to-r from-blue-600 to-indigo-600 p-4 rounded-lg shadow-md text-white text-center mb-6">
              <p className="text-xl font-bold">{message}</p>
            </div>
          )}
          
          {!gameStarted ? (
            <div className="text-center text-white text-xl">
              Waiting for the game to start...
            </div>
          ) : (
            <>
              <QuestionDisplay
                question={currentQuestion}
                selectedOption={selectedOption}
                revealAnswer={revealAnswer}
                onSelectOption={handleSelectOption}
                disabled={true}
              />
              
              {gameEnded && (
                <div className="mt-6 bg-gradient-to-r from-indigo-700 to-purple-700 p-6 rounded-lg shadow-lg text-center">
                  <h3 className="text-2xl font-bold text-white mb-4">Game Over!</h3>
                  <p className="text-lg text-blue-200">Thank you for playing!</p>
                </div>
              )}
            </>
          )}
          
          <div className="mt-6 text-center text-blue-300 text-sm">
            <p>The presenter is controlling this game. Just watch and enjoy!</p>
          </div>
        </div>
      </div>
    </div>
  );
}