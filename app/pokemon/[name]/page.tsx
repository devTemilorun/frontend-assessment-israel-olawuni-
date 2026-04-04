import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { getPokemonDetails, getPokemonList } from '@/features/pokemon/api/pokemonApi';

// Generate static paths for all pokemon
export async function generateStaticParams() {
  const list = await getPokemonList(0, 20);
  return list.map(p => ({ name: p.name }));
}

// Dynamic metadata for SEO
export async function generateMetadata({ params }: { params: { name: string } }): Promise<Metadata> {
  const pokemon = await getPokemonDetails(params.name);
  return {
    title: `${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)} - Pokédex 3000`,
    description: `Learn about ${pokemon.name}, a ${pokemon.types.map(t => t.type.name).join('/')} type Pokémon. Height: ${pokemon.height / 10}m, Weight: ${pokemon.weight / 10}kg.`,
    openGraph: {
      title: pokemon.name,
      description: `Discover ${pokemon.name}'s stats and abilities`,
      images: [pokemon.sprites.other['official-artwork'].front_default],
    },
  };
}

export default async function PokemonDetailPage({ params }: { params: { name: string } }) {
  const pokemon = await getPokemonDetails(params.name).catch(() => null);
  
  if (!pokemon) {
    notFound();
  }

  const mainType = pokemon.types[0]?.type.name || 'normal';
  
  // Dynamic background gradient based on primary type
  const typeGradients: Record<string, string> = {
    fire: 'from-red-600 to-orange-500',
    water: 'from-blue-600 to-cyan-500',
    grass: 'from-green-600 to-emerald-500',
    electric: 'from-yellow-500 to-amber-500',
    psychic: 'from-pink-600 to-purple-500',
    default: 'from-purple-700 to-indigo-900',
  };
  
  const gradient = typeGradients[mainType] || typeGradients.default;

  return (
    <main className={`min-h-screen bg-gradient-to-br ${gradient} p-6 md:p-8`}>
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <Link href="/" className="text-white/70 hover:text-white transition">
            ← Back to Pokédex
          </Link>
        </nav>

        {/* Detail Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 md:p-8 border border-white/20">
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            {/* Image */}
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <Image
                src={pokemon.sprites.other['official-artwork'].front_default}
                alt={pokemon.name}
                fill
                className="object-contain drop-shadow-2xl"
                priority
              />
            </div>
            
            {/* Info */}
            <div className="flex-1 text-white">
              <h1 className="text-4xl md:text-5xl font-bold capitalize mb-2">
                {pokemon.name}
              </h1>
              <p className="text-purple-200 mb-4">#{String(pokemon.id).padStart(3, '0')}</p>
              
              {/* Types */}
              <div className="flex gap-2 mb-6">
                {pokemon.types.map(t => (
                  <span key={t.type.name} className="px-3 py-1 rounded-full bg-black/30 text-sm capitalize">
                    {t.type.name}
                  </span>
                ))}
              </div>
              
              {/* Measurements */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-black/20 rounded-xl p-3 text-center">
                  <div className="text-2xl font-bold">{pokemon.height / 10}m</div>
                  <div className="text-sm text-purple-200">Height</div>
                </div>
                <div className="bg-black/20 rounded-xl p-3 text-center">
                  <div className="text-2xl font-bold">{pokemon.weight / 10}kg</div>
                  <div className="text-sm text-purple-200">Weight</div>
                </div>
              </div>
              
              {/* Stats */}
              <div className="space-y-2">
                <h3 className="text-xl font-semibold mb-3">Base Stats</h3>
                {pokemon.stats.map(stat => (
                  <div key={stat.stat.name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="capitalize">{stat.stat.name.replace('-', ' ')}</span>
                      <span>{stat.base_stat}</span>
                    </div>
                    <div className="w-full bg-black/30 rounded-full h-2">
                      <div
                        className="bg-yellow-400 h-2 rounded-full transition-all"
                        style={{ width: `${Math.min(100, stat.base_stat / 2)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}