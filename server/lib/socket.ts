import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { GameState, Question } from './types';

export const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);

  useEffect(() => {
    // Initialize socket connection
    const socketInstance = io('http://localhost:3001');

    socketInstance.on('connect', () => {
      console.log('Connected to server');
      setIsConnected(true);
      setConnectionError(null);
    });

    socketInstance.on('disconnect', () => {
      console.log('Disconnected from server');
      setIsConnected(false);
    });

    socketInstance.on('connect_error', (error) => {
      console.error('Connection error:', error);
      setConnectionError('Failed to connect to server');
    });

    setSocket(socketInstance);

    // Cleanup
    return () => {
      socketInstance.disconnect();
    };
  }, []);

  // Functions to emit events
  const updateGameState = (gameState: Partial<GameState>) => {
    socket?.emit('updateGameState', gameState);
  };

  const selectQuestion = (question: Question) => {
    socket?.emit('selectQuestion', question);
  };

  const selectOption = (optionId: string) => {
    socket?.emit('selectOption', optionId);
  };

  const revealAnswer = () => {
    socket?.emit('revealAnswer');
  };

  const nextQuestion = () => {
    socket?.emit('nextQuestion');
  };

  const resetGame = () => {
    socket?.emit('resetGame');
  };

  return {
    socket,
    isConnected,
    connectionError,
    updateGameState,
    selectQuestion,
    selectOption,
    revealAnswer,
    nextQuestion,
    resetGame
  };
}; 