import Link from 'next/link';
import Image from 'next/image';
import { getPokemonList, getPokemonDetails } from '@/features/pokemon/api/pokemonApi';
import { Pokemon } from '@/shared/types/pokemon';

// Generate static params for first 20 pokemon (SSG)
export async function generateStaticParams() {
  const pokemonList = await getPokemonList(0, 20);
  return pokemonList.map((p) => ({ name: p.name }));
}

// Get first 20 pokemon with their details
async function getInitialPokemon(): Promise<Pokemon[]> {
  const list = await getPokemonList(0, 20);
  const details = await Promise.all(
    list.map(pokemon => getPokemonDetails(pokemon.name))
  );
  return details;
}

export default async function HomePage() {
  const pokemon = await getInitialPokemon();

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
            Pokédex<span className="text-yellow-400">3000</span>
          </h1>
          <p className="text-purple-200 text-lg">
            Explore {pokemon.length}+ Pokémon with glassmorphism magic
          </p>
        </header>

        {/* Responsive Grid: 1 col mobile, 2 col tablet, 4 col desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pokemon.map((p, index) => (
            <Link href={`/pokemon/${p.name}`} key={p.id}>
              <div className="group relative bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20 transition-all duration-300 hover:scale-105 hover:bg-white/20 hover:shadow-2xl cursor-pointer">
                {/* Priority on first 4 images (above the fold) */}
                <div className="relative w-full aspect-square mb-3">
                  <Image
                    src={p.sprites.other['official-artwork'].front_default}
                    alt={p.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-contain drop-shadow-xl"
                    priority={index < 4}
                  />
                </div>
                <h2 className="text-xl font-bold text-white capitalize text-center">
                  {p.name}
                </h2>
                <div className="flex justify-center gap-2 mt-2">
                  <span className="text-sm text-purple-200">Ht: {p.height / 10}m</span>
                  <span className="text-sm text-purple-200">Wt: {p.weight / 10}kg</span>
                </div>
                {/* Type badges */}
                <div className="flex justify-center gap-1 mt-2 flex-wrap">
                  {p.types.map(t => (
                    <span
                      key={t.type.name}
                      className="text-xs px-2 py-0.5 rounded-full bg-black/30 text-white"
                    >
                      {t.type.name}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}