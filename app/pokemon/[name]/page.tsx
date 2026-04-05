import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { getPokemonDetails, getPokemonList } from '@/features/pokemon/api/pokemonApi';
import { Pokemon } from '@/shared/types/pokemon';

// Helper function to get image URL with fallback
function getPokemonImageUrl(pokemon: Pokemon): string {
  const officialArtwork = pokemon.sprites?.other?.['official-artwork']?.front_default;
  if (officialArtwork) return officialArtwork;
  const defaultSprite = pokemon.sprites?.front_default;
  if (defaultSprite) return defaultSprite;
  return 'https://via.placeholder.com/300/333/white?text=No+Image';
}

// Helper to get color for stat bar
function getStatColor(statName: string): string {
  const colors: Record<string, string> = {
    hp: 'bg-red-500',
    attack: 'bg-orange-500',
    defense: 'bg-yellow-500',
    'special-attack': 'bg-blue-500',
    'special-defense': 'bg-green-500',
    speed: 'bg-pink-500',
  };
  return colors[statName] || 'bg-purple-500';
}

// Helper to get type badge color
function getTypeColor(type: string): string {
  const colors: Record<string, string> = {
    normal: 'bg-gray-500',
    fire: 'bg-red-600',
    water: 'bg-blue-600',
    electric: 'bg-yellow-500',
    grass: 'bg-green-600',
    ice: 'bg-cyan-500',
    fighting: 'bg-red-700',
    poison: 'bg-purple-700',
    ground: 'bg-yellow-700',
    flying: 'bg-indigo-500',
    psychic: 'bg-pink-600',
    bug: 'bg-lime-600',
    rock: 'bg-stone-600',
    ghost: 'bg-purple-900',
    dragon: 'bg-indigo-800',
    dark: 'bg-gray-800',
    steel: 'bg-gray-400',
    fairy: 'bg-pink-400',
  };
  return colors[type] || 'bg-gray-600';
}

// Generate static paths for first 20 Pokémon
export async function generateStaticParams() {
  const list = await getPokemonList(0, 20);
  return list.map(p => ({ name: p.name }));
}

// Dynamic metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ name: string }> }): Promise<Metadata> {
  const { name } = await params;
  try {
    const pokemon = await getPokemonDetails(name);
    const capitalizedName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    const types = pokemon.types.map(t => t.type.name).join('/');
    
    return {
      title: `${capitalizedName} - Stats, Types, and Abilities`,
      description: `Discover ${capitalizedName}'s stats and abilities. A ${types} type Pokémon with ${pokemon.height / 10}m height and ${pokemon.weight / 10}kg weight.`,
      openGraph: {
        title: `${capitalizedName} | Pokédex 3000`,
        description: `Explore detailed stats and information about ${capitalizedName}.`,
        images: [getPokemonImageUrl(pokemon)],
        type: 'article',
      },
      twitter: {
        card: 'summary_large_image',
        title: `${capitalizedName} | Pokédex 3000`,
        description: `Explore detailed stats about ${capitalizedName}.`,
        images: [getPokemonImageUrl(pokemon)],
      },
    };
  } catch {
    return {
      title: 'Pokémon Not Found',
      description: 'The requested Pokémon could not be found in our Pokédex.',
    };
  }
}

export default async function PokemonDetailPage({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const pokemon = await getPokemonDetails(name).catch(() => null);
  
  if (!pokemon) {
    notFound();
  }

  const imageUrl = getPokemonImageUrl(pokemon);
  const mainType = pokemon.types[0]?.type.name || 'normal';
  
  // Dynamic gradient based on primary type
  const typeGradients: Record<string, string> = {
    fire: 'from-red-600 via-orange-600 to-red-700',
    water: 'from-blue-600 via-cyan-600 to-blue-700',
    grass: 'from-green-600 via-emerald-600 to-green-700',
    electric: 'from-yellow-500 via-amber-500 to-yellow-600',
    psychic: 'from-pink-600 via-purple-600 to-pink-700',
    ice: 'from-cyan-400 via-blue-400 to-cyan-500',
    rock: 'from-stone-600 via-stone-700 to-stone-800',
    ground: 'from-amber-700 via-yellow-700 to-amber-800',
    flying: 'from-sky-400 via-indigo-400 to-sky-500',
    bug: 'from-lime-600 via-green-600 to-lime-700',
    poison: 'from-purple-700 via-fuchsia-700 to-purple-800',
    dark: 'from-gray-800 via-gray-900 to-black',
    dragon: 'from-indigo-700 via-purple-700 to-indigo-800',
    fairy: 'from-pink-400 via-rose-400 to-pink-500',
    fighting: 'from-red-700 via-orange-700 to-red-800',
    ghost: 'from-purple-900 via-indigo-900 to-purple-950',
    steel: 'from-gray-500 via-slate-500 to-gray-600',
    default: 'from-purple-700 via-indigo-700 to-purple-800',
  };
  
  const gradient = typeGradients[mainType] || typeGradients.default;

  return (
    <main className={`min-h-screen bg-linear-to-br ${gradient} p-6 md:p-8`}>
      <div className="max-w-5xl mx-auto">
        {/* Breadcrumb Navigation */}
        <nav className="mb-6">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 px-4 py-2 bg-black/20 hover:bg-black/30 backdrop-blur-sm rounded-lg text-white transition-all duration-200 group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            <span>Back to Pokédex</span>
          </Link>
        </nav>

        {/* Main Pokémon Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 overflow-hidden shadow-2xl">
          {/* Header Banner */}
          <div className="bg-black/20 px-6 py-4 border-b border-white/10">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-purple-200 text-sm font-semibold uppercase tracking-wide">Pokédex Entry</p>
                <p className="text-white/60 text-sm">#{String(pokemon.id).padStart(4, '0')}</p>
              </div>
              <div className="flex gap-2">
                {pokemon.types.map(t => (
                  <span
                    key={t.type.name}
                    className={`${getTypeColor(t.type.name)} px-4 py-1.5 rounded-full text-white text-sm font-semibold capitalize shadow-lg`}
                  >
                    {t.type.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="p-6 md:p-8">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Image Section */}
              <div className="lg:w-1/2">
                <div className="relative bg-linear-to-br from-white/5 to-black/20 rounded-2xl p-8">
                  <div className="relative w-full aspect-square">
                    <Image
                      src={imageUrl}
                      alt={pokemon.name}
                      fill
                      className="object-contain drop-shadow-2xl"
                      priority
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>
                
                {/* Fun Facts */}
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="bg-black/20 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-yellow-400">{pokemon.height / 10}m</div>
                    <div className="text-sm text-purple-200">Height</div>
                  </div>
                  <div className="bg-black/20 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-yellow-400">{pokemon.weight / 10}kg</div>
                    <div className="text-sm text-purple-200">Weight</div>
                  </div>
                </div>
              </div>

              {/* Info Section */}
              <div className="lg:w-1/2">
                <div className="mb-6">
                  <h1 className="text-4xl md:text-5xl font-bold text-white capitalize mb-2">
                    {pokemon.name}
                  </h1>
                  <p className="text-purple-200 text-lg capitalize">
                    {pokemon.types.map(t => t.type.name).join(' / ')} Type Pokémon
                  </p>
                </div>

                {/* Base Stats */}
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                    <span>📊</span> Base Stats
                  </h2>
                  <div className="space-y-3">
                    {pokemon.stats.map(stat => {
                      const statName = stat.stat.name;
                      const displayName = statName.replace('-', ' ').toUpperCase();
                      const percentage = (stat.base_stat / 255) * 100;
                      const statColor = getStatColor(statName);
                      
                      return (
                        <div key={statName}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-purple-200 font-medium">{displayName}</span>
                            <span className="text-white font-bold">{stat.base_stat}</span>
                          </div>
                          <div className="w-full bg-black/30 rounded-full h-3 overflow-hidden">
                            <div
                              className={`${statColor} h-3 rounded-full transition-all duration-1000 ease-out`}
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Total Stats */}
                <div className="bg-yellow-500/20 rounded-xl p-4 border border-yellow-500/30">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-semibold">Total Base Stats</span>
                    <span className="text-2xl font-bold text-yellow-400">
                      {pokemon.stats.reduce((sum, stat) => sum + stat.base_stat, 0)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Navigation - Fixed Next/Previous */}
          <div className="bg-black/20 px-6 py-4 border-t border-white/10">
            <div className="flex justify-between items-center">
              <Link
                href={pokemon.id > 1 ? `/pokemon/${pokemon.id - 1}` : '#'}
                className={`px-4 py-2 rounded-lg transition-all ${
                  pokemon.id > 1
                    ? 'bg-white/10 hover:bg-white/20 text-white'
                    : 'bg-white/5 text-white/30 cursor-not-allowed pointer-events-none'
                }`}
              >
                ← Previous
              </Link>
              <Link
                href="/"
                className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg transition-all transform hover:scale-105"
              >
                Back to Pokédex
              </Link>
              <Link
                href={`/pokemon/${pokemon.id + 1}`}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all"
              >
                Next →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}