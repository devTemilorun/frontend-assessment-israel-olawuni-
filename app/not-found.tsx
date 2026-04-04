import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-6">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center">
        <div className="text-8xl mb-4">🔍</div>
        <h2 className="text-3xl font-bold text-white mb-2">Pokémon Not Found</h2>
        <p className="text-purple-200 mb-6">The Pokémon you're looking for doesn't exist in our Pokédex</p>
        <Link href="/" className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-xl transition">
          Back to Pokédex
        </Link>
      </div>
    </div>
  );
}