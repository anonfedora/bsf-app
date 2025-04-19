const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const path = require('path');
const { questions } = require('./questions');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Store game state
let gameState = {
  currentQuestion: null,
  selectedOption: null,
  revealAnswer: false,
  gameStarted: true,
  gameEnded: false,
  score: 0,
  questionsAnswered: 0,
  currentLevel: 1,
  questions: questions
};

io.on('connection', (socket) => {
  console.log('Client connected');

  // Send initial state to new connection
  socket.emit('gameState', gameState);

  // Handle game state requests
  socket.on('getGameState', () => {
    socket.emit('gameState', gameState);
  });

  // Handle game state updates
  socket.on('updateGameState', (newState) => {
    gameState = { ...gameState, ...newState };
    io.emit('gameState', gameState);
  });

  // Handle question selection
  socket.on('selectQuestion', (question) => {
    gameState = {
      ...gameState,
      currentQuestion: question,
      selectedOption: null,
      revealAnswer: false,
      gameStarted: true
    };
    io.emit('gameState', gameState);
  });

  // Handle option selection
  socket.on('selectOption', (optionId) => {
    gameState = {
      ...gameState,
      selectedOption: optionId
    };
    io.emit('gameState', gameState);
  });

  // Handle answer reveal
  socket.on('revealAnswer', () => {
    gameState = {
      ...gameState,
      revealAnswer: true
    };
    io.emit('gameState', gameState);
  });

  // Handle next question
  socket.on('nextQuestion', () => {
    const currentIndex = gameState.questions.findIndex(q => q.id === gameState.currentQuestion?.id);
    const nextIndex = currentIndex + 1;
    
    if (nextIndex < gameState.questions.length) {
      gameState = {
        ...gameState,
        currentQuestion: gameState.questions[nextIndex],
        selectedOption: null,
        revealAnswer: false,
        questionsAnswered: gameState.questionsAnswered + 1,
        currentLevel: Math.min(gameState.currentLevel + 1, 15)
      };
    } else {
      gameState = {
        ...gameState,
        gameEnded: true,
        currentQuestion: null
      };
    }
    io.emit('gameState', gameState);
  });

  // Handle game reset
  socket.on('resetGame', () => {
    gameState = {
      currentQuestion: null,
      selectedOption: null,
      revealAnswer: false,
      gameStarted: true,
      gameEnded: false,
      score: 0,
      questionsAnswered: 0,
      currentLevel: 1,
      questions: questions
    };
    io.emit('gameState', gameState);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});