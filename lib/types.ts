export interface Question {
  id: string;
  text: string;
  options: Option[];
  correctOption: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'million';
  category: string;
}

export interface Option {
  id: string;
  text: string;
}

export interface GameState {
  currentQuestion: Question | null;
  selectedOption: string | null;
  revealAnswer: boolean;
  gameStarted: boolean;
  gameEnded: boolean;
  score: number;
  questionsAnswered: number;
  currentLevel: number;
  failedLevels: number[];
}