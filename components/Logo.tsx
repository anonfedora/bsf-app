import React from 'react';
import { CircleDollarSign } from 'lucide-react';

export const Logo: React.FC = () => {
  return (
    <div className="flex items-center justify-center mb-6">
      <div className="bg-gradient-to-r from-amber-400 to-yellow-600 p-3 rounded-full shadow-lg">
        <CircleDollarSign size={28} className="text-blue-900" />
      </div>
      <h1 className="text-2xl md:text-3xl font-bold ml-2 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-600">
        Bible Trivia Blast
      </h1>
    </div>
  );
};