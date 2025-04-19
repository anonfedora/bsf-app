import { create } from 'zustand';
import { GameState, Question } from './types';
import { questions as MyQuestions } from './questions';

interface GameStore extends GameState {
  questions: Question[];
  failedLevels: number[];
  initializeQuestions: () => void;
  setCurrentQuestion: (question: Question | null) => void;
  selectOption: (optionId: string) => void;
  revealCorrectAnswer: () => void;
  resetAnswer: () => void;
  nextQuestion: () => void;
  restartGame: () => void;
  updateGameState: (newState: Partial<GameState>) => void;
}

export const useGameStore = create<GameStore>()((set, get) => ({
  questions: MyQuestions,
  currentQuestion: null,
  selectedOption: null,
  revealAnswer: false,
  gameStarted: false,
  gameEnded: false,
  score: 0,
  questionsAnswered: 0,
  currentLevel: 1,
  failedLevels: [],

  initializeQuestions: () => {
    // Start game with MyQuestions
    set({ 
      questions: MyQuestions,
      gameStarted: true, 
      gameEnded: false, 
      score: 0, 
      questionsAnswered: 0,
      currentLevel: 1,
      failedLevels: []
    });
    
    // Set the first question
    const { questions } = get();
    if (questions.length > 0) {
      set({ currentQuestion: questions[0] });
    }
  },

  setCurrentQuestion: (question) => {
    set({ 
      currentQuestion: question,
      selectedOption: null,
      revealAnswer: false
    });
  },

  selectOption: (optionId) => {
    set({ selectedOption: optionId });
  },

  revealCorrectAnswer: () => {
    const { currentQuestion, selectedOption, currentLevel } = get();
    
    if (currentQuestion && selectedOption) {
      const isCorrect = selectedOption === currentQuestion.correctOption;
      
      if (isCorrect) {
        set({ 
          score: get().score + 1,
          revealAnswer: true 
        });
      } else {
        set({ 
          revealAnswer: true,
          failedLevels: [...get().failedLevels, currentLevel]
        });
      }
    }
  },

  resetAnswer: () => {
    set({ 
      selectedOption: null,
      revealAnswer: false
    });
  },

  nextQuestion: () => {
    const { questions, currentQuestion, questionsAnswered, currentLevel } = get();
    console.log(currentQuestion);
    if (!currentQuestion) return;
    
    // Find the current question's index
    const currentIndex = questions.findIndex(q => q.id === currentQuestion.id);
    console.log(currentIndex);
    // If we can't find the current question, start from the beginning
    if (currentIndex === -1) {
      set({ 
        currentQuestion: questions[0],
        selectedOption: null,
        revealAnswer: false,
        questionsAnswered: questionsAnswered + 1,
        currentLevel: Math.min(currentLevel + 1, 15)
      });
      return;
    }
    
    // Get the next question
    const nextIndex = currentIndex + 1;
    
    if (nextIndex < questions.length) {
      const nextQuestion = questions[nextIndex];
      set({ 
        currentQuestion: nextQuestion,
        selectedOption: null,
        revealAnswer: false,
        questionsAnswered: questionsAnswered + 1,
        currentLevel: Math.min(currentLevel + 1, 15)
      });
    } else {
      // End game if no more questions
      set({ 
        gameEnded: true,
        currentQuestion: null,
        questionsAnswered: questionsAnswered + 1
      });
    }
  },

  restartGame: () => {
    const { questions } = get();
    set({
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
  },

  updateGameState: (newState) => {
    set(newState);
  }
}));