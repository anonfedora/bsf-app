'use client';

import { Logo } from '@/components/Logo';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="millionaire-bg min-h-screen flex flex-col items-center justify-center p-4">
      <Logo />
      
      <div className="max-w-md w-full">
        <div className="bg-gradient-to-br from-blue-950 to-indigo-900 p-8 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold mb-6 text-white">Select Your Role</h2>
          
          <div className="space-y-4">
            <Link 
              href="/presenter"
              className="block w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold py-4 px-6 rounded-md transition-all duration-300 shadow-md"
            >
              Presenter
            </Link>
            
            <Link 
              href="/participant"
              className="block w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-4 px-6 rounded-md transition-all duration-300 shadow-md"
            >
              Participant
            </Link>
          </div>
          
          <p className="mt-8 text-blue-200 text-sm">
            Use the presenter view to control the game and see the answers.
            <br />
            The participant view shows the questions and accepts answers.
          </p>
        </div>
      </div>
    </div>
  );
}