import type { NextApiRequest, NextApiResponse } from 'next';
import { GameState, Question } from '@/lib/types';

// Store connected clients
const clients = new Set<NextApiResponse>();

// Store current game state
let currentGameState: Partial<GameState> = {};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Set headers for SSE
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  // Add client to the set
  clients.add(res);

  // Send initial state
  res.write(`data: ${JSON.stringify({ type: 'initialState', data: currentGameState })}\n\n`);

  // Handle client disconnect
  req.on('close', () => {
    clients.delete(res);
  });
}

// Helper function to broadcast to all clients
export function broadcast(type: string, data: any) {
  const message = `data: ${JSON.stringify({ type, data })}\n\n`;
  clients.forEach(client => {
    client.write(message);
  });
}

// Game state update functions
export function updateGameState(gameState: Partial<GameState>) {
  currentGameState = { ...currentGameState, ...gameState };
  broadcast('gameStateUpdate', gameState);
}

export function setCurrentQuestion(question: Question) {
  currentGameState.currentQuestion = question;
  broadcast('currentQuestionUpdate', question);
}

export function selectOption(optionId: string) {
  currentGameState.selectedOption = optionId;
  broadcast('optionSelected', optionId);
}

export function revealAnswer() {
  currentGameState.revealAnswer = true;
  broadcast('answerRevealed', null);
}

export function resetGame() {
  currentGameState = {
    currentQuestion: null,
    selectedOption: null,
    revealAnswer: false,
    gameStarted: true,
    gameEnded: false,
    score: 0,
    questionsAnswered: 0
  };
  broadcast('gameReset', null);
} 