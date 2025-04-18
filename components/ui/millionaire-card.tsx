import React from 'react';
import { cn } from '@/lib/utils';

interface MillionaireCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'presenter' | 'participant';
}

export function MillionaireCard({
  children,
  className,
  variant = 'default',
  ...props
}: MillionaireCardProps) {
  return (
    <div
      className={cn(
        'rounded-lg p-6 shadow-lg backdrop-blur-sm transition-all duration-300',
        {
          'bg-gradient-to-br from-blue-950 to-indigo-900 text-white': variant === 'default',
          'bg-gradient-to-br from-indigo-950 to-purple-900 text-white': variant === 'presenter',
          'bg-gradient-to-br from-blue-900 to-indigo-800 text-white': variant === 'participant',
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}