'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Option } from '@/lib/types';

interface OptionButtonProps {
  option: Option;
  isSelected: boolean;
  isCorrect: boolean;
  revealAnswer: boolean;
  onSelect: (optionId: string) => void;
  disabled?: boolean;
}

export const OptionButton: React.FC<OptionButtonProps> = ({
  option,
  isSelected,
  isCorrect,
  revealAnswer,
  onSelect,
  disabled = false
}) => {
  const getButtonClasses = () => {
    // Default styles
    let classes = 'flex items-center w-full p-4 my-2 text-lg font-medium rounded-md border border-blue-700 transition-all duration-300';
    
    // Add hover effect if not disabled
    if (!disabled) {
      classes += ' hover:bg-blue-700 hover:text-white hover:shadow-md hover:scale-102';
    }
    
    // Base styles for different states
    if (!revealAnswer) {
      if (isSelected) {
        // Selected but answer not revealed yet
        classes += ' bg-blue-600 text-white shadow-lg';
      } else {
        // Not selected and answer not revealed
        classes += ' bg-gradient-to-r from-blue-900 to-indigo-900 text-white/90';
      }
    } else {
      // Answer is revealed
      if (isCorrect) {
        // Correct answer
        classes += ' bg-green-600 text-white shadow-lg scale-102 animate-pulse';
      } else if (isSelected && !isCorrect) {
        // Selected wrong answer
        classes += ' bg-red-600 text-white shadow-md';
      } else {
        // Other options
        classes += ' bg-blue-900 text-white/70 opacity-80';
      }
    }
    
    return classes;
  };

  return (
    <button
      className={cn(getButtonClasses())}
      onClick={() => !disabled && onSelect(option.id)}
      disabled={disabled || revealAnswer}
    >
      <div className="flex items-center w-full">
        <div className="flex justify-center items-center h-8 w-8 bg-gradient-to-br from-amber-400 to-yellow-600 text-black font-bold rounded-full mr-4">
          {option.id}
        </div>
        <span>{option.text}</span>
      </div>
    </button>
  );
};