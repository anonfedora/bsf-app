'use client';

import React from 'react';
import { difficultyToMoney, formatMoney } from '@/lib/utils';
import { Question } from '@/lib/types';

interface GameStatsProps {
  currentQuestion: Question | null;
  score: number;
  questionsAnswered: number;
  totalQuestions: number;
}

export const GameStats: React.FC<GameStatsProps> = ({
  currentQuestion,
  score,
  questionsAnswered,
  totalQuestions
}) => {
  const currentValue = currentQuestion ? difficultyToMoney(currentQuestion.difficulty) : 0;
  
  return (
    <div className="bg-gradient-to-br from-indigo-900 to-blue-800 p-4 rounded-lg shadow-md text-white">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center">
          <div className="text-sm md:text-base">
            <span className="font-bold">Question:</span> {questionsAnswered + 1}/{totalQuestions}
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="text-sm md:text-base">
            <span className="font-bold">Score:</span> {score}/{totalQuestions}
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="text-sm md:text-base">
            <span className="font-bold">Current Value:</span> {formatMoney(currentValue)}
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="bg-gradient-to-r from-amber-400 to-yellow-600 text-blue-900 px-4 py-1 rounded-full text-sm font-bold">
            {formatMoney(score * 1000)}
          </div>
        </div>
      </div>
    </div>
  );
};