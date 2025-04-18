'use client';

import React from 'react';
import { Question } from '@/lib/types';

interface GameControlsProps {
  currentQuestion: Question | null;
  questions: Question[];
  onSelectQuestion: (question: Question) => void;
  onRevealAnswer: () => void;
  onNextQuestion: () => void;
  onResetGame: () => void;
  onClearState: () => void;
  revealAnswer: boolean;
  gameEnded: boolean;
}

export const GameControls: React.FC<GameControlsProps> = ({
  currentQuestion,
  questions,
  onSelectQuestion,
  onRevealAnswer,
  onNextQuestion,
  onResetGame,
  onClearState,
  revealAnswer,
  gameEnded
}) => {
  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-white mb-4">Presenter Controls</h2>
      
      <div className="space-y-4">
        {!gameEnded ? (
          <>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={onRevealAnswer}
                disabled={!currentQuestion || revealAnswer}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-2 px-4 rounded-md transition-all duration-300 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Reveal Answer
              </button>
              
              <button
                onClick={onNextQuestion}
                disabled={!currentQuestion || !revealAnswer}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-2 px-4 rounded-md transition-all duration-300 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next Question
              </button>
              
              <button
                onClick={onClearState}
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-2 px-4 rounded-md transition-all duration-300 shadow-md"
              >
                Clear All State
              </button>
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-white mb-2">Select Question:</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                {questions.map((question, index) => (
                  <button
                    key={question.id}
                    onClick={() => onSelectQuestion(question)}
                    className={`p-2 text-sm rounded-md transition-all ${
                      currentQuestion?.id === question.id
                        ? 'bg-blue-600 text-white font-bold'
                        : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                    }`}
                  >
                    Q{index + 1}: {question.difficulty}
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="text-center">
            <h3 className="text-xl text-white mb-4">Game Over!</h3>
            <button
              onClick={onResetGame}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-2 px-4 rounded-md transition-all duration-300 shadow-md"
            >
              Start New Game
            </button>
          </div>
        )}
      </div>
    </div>
  );
};