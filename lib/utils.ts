import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Function to format money values
export const formatMoney = (amount: number): string => {
  if (amount >= 1000000) {
    return '$1,000,000';
  }
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
};

// Map difficulty to money value
export const difficultyToMoney = (difficulty: string): number => {
  const moneyMap: Record<string, number> = {
    'easy': 1000,
    'medium': 10000,
    'hard': 100000,
    'million': 1000000
  };
  
  return moneyMap[difficulty] || 0;
};