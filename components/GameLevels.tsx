import React, { useMemo } from 'react';
import { useGameStore } from '@/lib/store';
import { difficultyToMoney } from '@/lib/utils';

const LevelItem: React.FC<{
  level: number;
  isCurrent: boolean;
  isCompleted: boolean;
  isFailed: boolean;
}> = React.memo(({ level, isCurrent, isCompleted, isFailed }) => {
  const difficulty = useMemo(() => {
    if (level <= 5) return 'easy';
    if (level <= 10) return 'medium';
    return 'hard';
  }, [level]);

  return (
    <div
      className={`flex items-center justify-between p-2 rounded-md transition-colors duration-300 ${
        isCurrent
          ? 'bg-blue-600 text-white'
          : isFailed
          ? 'bg-red-600 text-white'
          : isCompleted
          ? 'bg-green-600 text-white'
          : 'bg-gray-700 text-gray-300'
      }`}
    >
      <div className="flex items-center">
        <span className="font-bold mr-2">Level {level}</span>
        {/* <span className="text-sm">
          ({difficulty.charAt(0).toUpperCase() + difficulty.slice(1)})
        </span> */}
        {isCurrent && (
          <span className="ml-2 px-2 py-1 bg-yellow-500 text-black text-xs font-bold rounded-full">
            Current Level
          </span>
        )}
      </div>
    </div>
  );
}, (prevProps, nextProps) => {
  // Only re-render if these specific props change
  return (
    prevProps.level === nextProps.level &&
    prevProps.isCurrent === nextProps.isCurrent &&
    prevProps.isCompleted === nextProps.isCompleted &&
    prevProps.isFailed === nextProps.isFailed
  );
});

LevelItem.displayName = 'LevelItem';

export const GameLevels: React.FC = React.memo(() => {
  const { currentLevel, failedLevels } = useGameStore();

  const levels = useMemo(() => Array.from({ length: 15 }, (_, i) => i + 1), []);

  const levelItems = useMemo(() => {
    return levels.map((level) => {
      const isCurrent = level === currentLevel;
      // Only mark levels as completed if they are less than current level AND current level is greater than 1
      const isCompleted = currentLevel > 1 && level < currentLevel;
      const isFailed = failedLevels.includes(level);

      return (
        <LevelItem
          key={level}
          level={level}
          isCurrent={isCurrent}
          isCompleted={isCompleted}
          isFailed={isFailed}
        />
      );
    });
  }, [levels, currentLevel, failedLevels]);

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-white mb-4">Game Levels</h2>
      <div className="space-y-2">
        {levelItems}
      </div>
    </div>
  );
}, (prevProps, nextProps) => {
  // Prevent re-renders if props haven't changed
  return true;
});

GameLevels.displayName = 'GameLevels'; 