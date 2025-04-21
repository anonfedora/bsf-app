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
  questions: questions,
  failedLevels: []
};

// Add a lock to prevent concurrent state updates
let stateUpdateLock = false;

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
    if (stateUpdateLock) {
      console.log('State update blocked - another update in progress');
      return;
    }

    try {
      stateUpdateLock = true;
      gameState = { ...gameState, ...newState };
      io.emit('gameState', gameState);
    } finally {
      stateUpdateLock = false;
    }
  });

  // Handle question selection
  socket.on('selectQuestion', (question) => {
    if (stateUpdateLock) {
      console.log('Question selection blocked - another update in progress');
      return;
    }

    try {
      stateUpdateLock = true;
      gameState = {
        ...gameState,
        currentQuestion: question,
        selectedOption: null,
        revealAnswer: false,
        gameStarted: true
      };
      io.emit('gameState', gameState);
    } finally {
      stateUpdateLock = false;
    }
  });

  // Handle option selection
  socket.on('selectOption', (optionId) => {
    if (stateUpdateLock) {
      console.log('Option selection blocked - another update in progress');
      return;
    }

    try {
      stateUpdateLock = true;
      gameState = {
        ...gameState,
        selectedOption: optionId
      };
      io.emit('gameState', gameState);
    } finally {
      stateUpdateLock = false;
    }
  });

  // Handle answer reveal
  socket.on('revealAnswer', () => {
    if (stateUpdateLock) {
      console.log('Answer reveal blocked - another update in progress');
      return;
    }

    try {
      stateUpdateLock = true;
      const { currentQuestion, selectedOption, currentLevel } = gameState;
      
      if (currentQuestion && selectedOption) {
        const isCorrect = selectedOption === currentQuestion.correctOption;
        
        if (!isCorrect) {
          gameState = {
            ...gameState,
            revealAnswer: true,
            failedLevels: [...gameState.failedLevels, currentLevel]
          };
        } else {
          gameState = {
            ...gameState,
            revealAnswer: true
          };
        }
      } else {
        gameState = {
          ...gameState,
          revealAnswer: true
        };
      }
      io.emit('gameState', gameState);
    } finally {
      stateUpdateLock = false;
    }
  });

  // Handle next question
  socket.on('nextQuestion', () => {
    if (stateUpdateLock) {
      console.log('Next question blocked - another update in progress');
      return;
    }

    try {
      stateUpdateLock = true;
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
    } finally {
      stateUpdateLock = false;
    }
  });

  // Handle game reset
  socket.on('resetGame', () => {
    if (stateUpdateLock) {
      console.log('Game reset blocked - another update in progress');
      return;
    }

    try {
      stateUpdateLock = true;
      gameState = {
        currentQuestion: null,
        selectedOption: null,
        revealAnswer: false,
        gameStarted: true,
        gameEnded: false,
        score: 0,
        questionsAnswered: 0,
        currentLevel: 1,
        questions: questions,
        failedLevels: []
      };
      io.emit('gameState', gameState);
    } finally {
      stateUpdateLock = false;
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});