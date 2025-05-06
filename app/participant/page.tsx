'use client';

import React, { useEffect, useState } from 'react';
import { Logo } from '@/components/Logo';
import { QuestionDisplay } from '@/components/QuestionDisplay';
import { GameLevels } from '@/components/GameLevels';
import { useGameStore } from '@/lib/store';
import { useSocket } from '@/lib/socket';

export default function ParticipantPage() {
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
    removedOptions
  } = useGameStore();

  // State to show feedback messages
  const [message, setMessage] = useState<string | null>(null);

  // Socket connection
  const { socket, isConnected, connectionError } = useSocket();

  // Initialize game state and set up socket listeners
  useEffect(() => {
    if (!socket) return;

    // Request initial game state
    socket.emit('getGameState');

    const handleGameState = (data: any) => {
      if (!data) return;

      // Only update state if we receive valid data
      updateGameState({
        currentQuestion: data.currentQuestion,
        selectedOption: data.selectedOption,
        revealAnswer: data.revealAnswer,
        gameStarted: data.gameStarted !== undefined ? data.gameStarted : true,
        gameEnded: data.gameEnded,
        score: data.score,
        questionsAnswered: data.questionsAnswered,
        currentLevel: data.currentLevel,
        failedLevels: data.failedLevels || [],
        removedOptions: data.removedOptions || [],
        fiftyFiftyUsed: data.fiftyFiftyUsed || false
      });

      if (data.gameEnded) {
        setMessage('Game Over!');
      } else {
        setMessage(null);
      }
    };

    const handleConnect = () => {
      setMessage(null);
      socket.emit('getGameState');
    };

    const handleDisconnect = () => {
      setMessage('Disconnected from server. Waiting to reconnect...');
    };

    const handleConnectError = () => {
      setMessage('Connection error. Please refresh the page.');
    };

    const handleResetRoles = () => {
      console.log('Received resetRoles event, redirecting to home page');
      // Redirect to home page
      window.location.href = '/';
    };

    // Set up event listeners
    socket.on('gameState', handleGameState);
    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);
    socket.on('connect_error', handleConnectError);
    socket.on('resetRoles', handleResetRoles);

    // Cleanup listeners on unmount
    return () => {
      socket.off('gameState', handleGameState);
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
      socket.off('connect_error', handleConnectError);
      socket.off('resetRoles', handleResetRoles);
    };
  }, [socket, updateGameState]);

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
                onSelectOption={() => {}} // Participant cannot select options
                disabled={true} // Always disabled for participant
                removedOptions={removedOptions}
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