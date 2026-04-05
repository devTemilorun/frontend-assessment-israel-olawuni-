'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function PokemonDetailError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Pokémon detail error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-6">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center max-w-md">
        {/* Animated error icon */}
        <div className="text-7xl mb-4 animate-bounce">😱</div>
        
        <h2 className="text-3xl font-bold text-white mb-3">
          Failed to Load Pokémon
        </h2>
        
        <p className="text-purple-200 mb-6">
          {error.message || 'Something went wrong while loading this Pokémon. Please try again.'}
        </p>
        
        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-xl transition transform hover:scale-105"
          >
            Try Again
          </button>
          
          <Link
            href="/"
            className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition border border-white/20"
          >
            Back to Pokédex
          </Link>
        </div>
        
        {/* Error details for debugging */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-6 p-4 bg-red-900/50 rounded-lg text-left">
            <p className="text-red-200 text-sm font-mono break-all">
              {error.stack}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}