import { create } from 'zustand';
import { GameState, Question } from './types';
import { defaultQuestions } from './defaultQuestions';
import { persist } from 'zustand/middleware';

interface GameStore extends GameState {
  questions: Question[];
  initializeQuestions: () => void;
  setCurrentQuestion: (question: Question | null) => void;
  selectOption: (optionId: string) => void;
  revealCorrectAnswer: () => void;
  resetAnswer: () => void;
  nextQuestion: () => void;
  restartGame: () => void;
  updateGameState: (newState: Partial<GameState>) => void;
}

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      questions: [],
      currentQuestion: null,
      selectedOption: null,
      revealAnswer: false,
      gameStarted: false,
      gameEnded: false,
      score: 0,
      questionsAnswered: 0,
      currentLevel: 1,

      initializeQuestions: () => {
        // Check if questions exist in localStorage
        const storedQuestions = localStorage.getItem('millionaireQuestions');
        if (storedQuestions) {
          set({ questions: JSON.parse(storedQuestions) });
        } else {
          // If no questions in localStorage, use defaults
          set({ questions: defaultQuestions });
          localStorage.setItem('millionaireQuestions', JSON.stringify(defaultQuestions));
        }

        // Start game
        set({ 
          gameStarted: true, 
          gameEnded: false, 
          score: 0, 
          questionsAnswered: 0,
          currentLevel: 1
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
        const { currentQuestion, selectedOption } = get();
        
        if (currentQuestion && selectedOption) {
          const isCorrect = selectedOption === currentQuestion.correctOption;
          
          if (isCorrect) {
            set({ 
              score: get().score + 1,
              revealAnswer: true 
            });
          } else {
            set({ revealAnswer: true });
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
        
        if (!currentQuestion) return;
        
        // Find the current question's index
        const currentIndex = questions.findIndex(q => q.id === currentQuestion.id);
        
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
          currentLevel: 1
        });
      },

      updateGameState: (newState) => {
        set(newState);
      }
    }),
    {
      name: 'millionaire-game-storage'
    }
  )
);