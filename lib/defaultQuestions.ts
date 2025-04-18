import { Question } from './types';
import { v4 as uuidv4 } from 'uuid';

export const defaultQuestions: Question[] = [
  {
    id: uuidv4(),
    text: 'Which planet is known as the "Red Planet"?',
    options: [
      { id: 'A', text: 'Venus' },
      { id: 'B', text: 'Mars' },
      { id: 'C', text: 'Jupiter' },
      { id: 'D', text: 'Saturn' }
    ],
    correctOption: 'B',
    difficulty: 'easy',
    category: 'Science'
  },
  {
    id: uuidv4(),
    text: 'In which year did World War II end?',
    options: [
      { id: 'A', text: '1943' },
      { id: 'B', text: '1944' },
      { id: 'C', text: '1945' },
      { id: 'D', text: '1946' }
    ],
    correctOption: 'C',
    difficulty: 'easy',
    category: 'History'
  },
  {
    id: uuidv4(),
    text: 'Who painted the Mona Lisa?',
    options: [
      { id: 'A', text: 'Vincent van Gogh' },
      { id: 'B', text: 'Pablo Picasso' },
      { id: 'C', text: 'Michelangelo' },
      { id: 'D', text: 'Leonardo da Vinci' }
    ],
    correctOption: 'D',
    difficulty: 'easy',
    category: 'Art'
  },
  {
    id: uuidv4(),
    text: 'What is the chemical symbol for gold?',
    options: [
      { id: 'A', text: 'Go' },
      { id: 'B', text: 'Gd' },
      { id: 'C', text: 'Au' },
      { id: 'D', text: 'Ag' }
    ],
    correctOption: 'C',
    difficulty: 'medium',
    category: 'Science'
  },
  {
    id: uuidv4(),
    text: 'Which famous physicist developed the theory of relativity?',
    options: [
      { id: 'A', text: 'Isaac Newton' },
      { id: 'B', text: 'Albert Einstein' },
      { id: 'C', text: 'Stephen Hawking' },
      { id: 'D', text: 'Niels Bohr' }
    ],
    correctOption: 'B',
    difficulty: 'medium',
    category: 'Science'
  },
  {
    id: uuidv4(),
    text: 'Which country is home to the Great Barrier Reef?',
    options: [
      { id: 'A', text: 'Brazil' },
      { id: 'B', text: 'Australia' },
      { id: 'C', text: 'Indonesia' },
      { id: 'D', text: 'Mexico' }
    ],
    correctOption: 'B',
    difficulty: 'medium',
    category: 'Geography'
  },
  {
    id: uuidv4(),
    text: 'What is the smallest bone in the human body?',
    options: [
      { id: 'A', text: 'Stapes (in the ear)' },
      { id: 'B', text: 'Phalanges (finger bones)' },
      { id: 'C', text: 'Femur (thigh bone)' },
      { id: 'D', text: 'Hyoid (in the throat)' }
    ],
    correctOption: 'A',
    difficulty: 'hard',
    category: 'Biology'
  },
  {
    id: uuidv4(),
    text: 'Which author wrote "War and Peace"?',
    options: [
      { id: 'A', text: 'Charles Dickens' },
      { id: 'B', text: 'Leo Tolstoy' },
      { id: 'C', text: 'Fyodor Dostoevsky' },
      { id: 'D', text: 'Jane Austen' }
    ],
    correctOption: 'B',
    difficulty: 'hard',
    category: 'Literature'
  },
  {
    id: uuidv4(),
    text: 'In which year was the first iPhone released?',
    options: [
      { id: 'A', text: '2005' },
      { id: 'B', text: '2006' },
      { id: 'C', text: '2007' },
      { id: 'D', text: '2008' }
    ],
    correctOption: 'C',
    difficulty: 'hard',
    category: 'Technology'
  },
  {
    id: uuidv4(),
    text: 'Who was the first woman to win a Nobel Prize?',
    options: [
      { id: 'A', text: 'Marie Curie' },
      { id: 'B', text: 'Rosalind Franklin' },
      { id: 'C', text: 'Ada Lovelace' },
      { id: 'D', text: 'Dorothy Hodgkin' }
    ],
    correctOption: 'A',
    difficulty: 'million',
    category: 'History'
  }
];