import { useEffect, useState } from 'react';
import { GameState, Question } from './types';

export const useEvents = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const [eventSource, setEventSource] = useState<EventSource | null>(null);

  useEffect(() => {
    // Initialize SSE connection
    const source = new EventSource('/api/events');
    setEventSource(source);

    source.onopen = () => {
      console.log('SSE connected');
      setIsConnected(true);
      setConnectionError(null);
    };

    source.onerror = (error) => {
      console.error('SSE connection error:', error);
      setIsConnected(false);
      setConnectionError('Connection error');
      source.close();
    };

    // Clean up
    return () => {
      source.close();
    };
  }, []);

  // Functions to emit events
  const updateGameState = async (gameState: Partial<GameState>) => {
    try {
      await fetch('/api/events/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'updateGameState', data: gameState })
      });
    } catch (error) {
      console.error('Error updating game state:', error);
      setConnectionError('Failed to update game state');
    }
  };

  const setCurrentQuestion = async (question: Question) => {
    try {
      await fetch('/api/events/question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'setCurrentQuestion', data: question })
      });
    } catch (error) {
      console.error('Error setting question:', error);
      setConnectionError('Failed to set question');
    }
  };

  const selectOption = async (optionId: string) => {
    try {
      await fetch('/api/events/option', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'selectOption', data: optionId })
      });
    } catch (error) {
      console.error('Error selecting option:', error);
      setConnectionError('Failed to select option');
    }
  };

  const revealAnswer = async () => {
    try {
      await fetch('/api/events/reveal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (error) {
      console.error('Error revealing answer:', error);
      setConnectionError('Failed to reveal answer');
    }
  };

  const resetGame = async () => {
    try {
      await fetch('/api/events/reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (error) {
      console.error('Error resetting game:', error);
      setConnectionError('Failed to reset game');
    }
  };

  return {
    eventSource,
    isConnected,
    connectionError,
    updateGameState,
    setCurrentQuestion,
    selectOption,
    revealAnswer,
    resetGame
  };
}; 