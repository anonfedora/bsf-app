const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
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
  questionsAnswered: 0
};

io.on('connection', (socket) => {
  console.log('Client connected');

  // Send initial state to new connection
  socket.emit('gameState', gameState);

  // Handle game state updates
  socket.on('updateGameState', (newState) => {
    gameState = { ...gameState, ...newState };
    io.emit('gameState', gameState);
  });

  // Handle question selection
  socket.on('selectQuestion', (question) => {
    gameState.currentQuestion = question;
    gameState.selectedOption = null;
    gameState.revealAnswer = false;
    io.emit('gameState', gameState);
  });

  // Handle option selection
  socket.on('selectOption', (optionId) => {
    gameState.selectedOption = optionId;
    io.emit('gameState', gameState);
  });

  // Handle answer reveal
  socket.on('revealAnswer', () => {
    gameState.revealAnswer = true;
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
      questionsAnswered: 0
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