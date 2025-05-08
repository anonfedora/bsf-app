'use client';

import React from 'react';
import { Question } from '@/lib/types';
import { OptionButton } from './OptionButton';
import { difficultyToMoney, formatMoney } from '@/lib/utils';
import { MillionaireCard } from '@/components/ui/millionaire-card';

interface QuestionDisplayProps {
  question: Question | null;
  selectedOption: string | null;
  revealAnswer: boolean;
  onSelectOption: (optionId: string) => void;
  disabled?: boolean;
  showAnswer?: boolean;
  removedOptions?: string[];
}

export const QuestionDisplay: React.FC<QuestionDisplayProps> = ({
  question,
  selectedOption,
  revealAnswer,
  onSelectOption,
  disabled = false,
  showAnswer = false,
  removedOptions = []
}) => {
  if (!question) {
    return (
      <MillionaireCard className="flex flex-col items-center justify-center h-64 mb-6">
        <h2 className="text-2xl font-bold text-center mb-4">
          Waiting for the game to start...
        </h2>
      </MillionaireCard>
    );
  }

  return (
    <div className="space-y-6 w-full max-w-4xl">
      <MillionaireCard>
        <div className="flex justify-between items-center mb-2">
          <span className="bg-blue-700 text-white px-3 py-1 rounded-full text-xs font-medium">
            {question.category}
          </span>
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-center mb-6 text-white">
          {question.text}
        </h2>
        
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          {question.options.map((option) => {
            const isRemoved = removedOptions.includes(option.id);
            return (
              <OptionButton
                key={option.id}
                option={option}
                isSelected={selectedOption === option.id}
                isCorrect={option.id === question.correctOption}
                revealAnswer={revealAnswer}
                onSelect={onSelectOption}
                disabled={disabled || isRemoved}
                isRemoved={isRemoved}
              />
            );
          })}
        </div>
        
        {showAnswer && (
          <div className="mt-4 text-center">
            <p className="text-amber-300 font-semibold">
              Correct answer: {question.options.find(o => o.id === question.correctOption)?.text}
            </p>
          </div>
        )}
      </MillionaireCard>
    </div>
  );
};