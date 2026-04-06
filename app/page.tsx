import Link from 'next/link';
import Image from 'next/image';
import { getPokemonByPage, getTotalCount } from '@/features/pokemon/api/pokemonApi';
import { Pokemon } from '@/shared/types/pokemon';
import SearchAndFilter from '@/features/pokemon/components/SearchAndFilter';
import Pagination from '@/features/pokemon/components/Pagination';

const ITEMS_PER_PAGE = 20;

// All Pokémon types for filter
const ALL_TYPES = ['all', 'fire', 'water', 'grass', 'electric', 'psychic', 'rock', 'ground', 'flying', 'bug', 'poison', 'dark', 'dragon', 'fairy', 'fighting', 'ghost', 'ice', 'normal', 'steel'];

// Helper function to get image URL with fallback
function getPokemonImageUrl(pokemon: Pokemon): string {
  const officialArtwork = pokemon.sprites?.other?.['official-artwork']?.front_default;
  if (officialArtwork) return officialArtwork;
  const defaultSprite = pokemon.sprites?.front_default;
  if (defaultSprite) return defaultSprite;
  // SVG fallback - Pokéball pattern
  return 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Ccircle cx="50" cy="50" r="45" fill="%23333"/%3E%3Ccircle cx="50" cy="50" r="20" fill="%23fff"/%3E%3Crect x="45" y="5" width="10" height="90" fill="%23fff"/%3E%3C/svg%3E';
}

async function getFilteredPokemon(
  search: string, 
  type: string, 
  page: number
): Promise<{ pokemon: Pokemon[]; totalFiltered: number }> {
  try {
    // Get current page of Pokémon
    const pagePokemon = await getPokemonByPage(page, ITEMS_PER_PAGE);
    
    // Apply filters client-side
    let filtered = pagePokemon.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
    
    if (type !== 'all') {
      filtered = filtered.filter(p =>
        p.types.some(t => t.type.name === type)
      );
    }
    
    return { pokemon: filtered, totalFiltered: filtered.length };
  } catch (error) {
    console.error('Failed to fetch Pokémon:', error);
    return { pokemon: [], totalFiltered: 0 };
  }
}

async function getTotalPages(): Promise<number> {
  try {
    const total = await getTotalCount();
    return Math.ceil(total / ITEMS_PER_PAGE);
  } catch (error) {
    console.error('Failed to get total count:', error);
    return 1;
  }
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; type?: string; page?: string }>;
}) {
  const { search = '', type = 'all', page = '1' } = await searchParams;
  const currentPage = parseInt(page, 10);
  
  const [{ pokemon, totalFiltered }, totalPages] = await Promise.all([
    getFilteredPokemon(search, type, currentPage),
    getTotalPages(),
  ]);

  const hasNoResults = pokemon.length === 0;

  return (
    <main id="main-content" className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
            Pokédex<span className="text-yellow-400">3000</span>
          </h1>
          <p className="text-purple-200">
            {totalFiltered} Pokémon found • Page {currentPage} of {totalPages}
          </p>
        </header>

        <SearchAndFilter search={search} selectedType={type} types={ALL_TYPES} />

        {hasNoResults ? (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-12 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-white mb-2">No Pokémon found</h3>
            <p className="text-purple-200">Try adjusting your search or filter</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {pokemon.map((p, index) => {
                const imageUrl = getPokemonImageUrl(p);
                
                return (
                  <Link href={`/pokemon/${p.name}`} key={p.id}>
                    <div className="group relative bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20 transition-all duration-300 hover:scale-105 hover:bg-white/20 hover:shadow-2xl cursor-pointer">
                      <div className="relative w-full aspect-square mb-3">
                        <Image
                          src={imageUrl}
                          alt={p.name}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          className="object-contain drop-shadow-xl"
                          priority={index < 4 && currentPage === 1}
                        />
                      </div>
                      <h2 className="text-xl font-bold text-white capitalize text-center">
                        {p.name}
                      </h2>
                      <div className="flex justify-center gap-2 mt-2">
                        <span className="text-sm text-purple-200">Ht: {p.height / 10}m</span>
                        <span className="text-sm text-purple-200">Wt: {p.weight / 10}kg</span>
                      </div>
                      <div className="flex justify-center gap-1 mt-2 flex-wrap">
                        {p.types.map(t => (
                          <span key={t.type.name} className="text-xs px-2 py-0.5 rounded-full bg-black/30 text-white">
                            {t.type.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
            <Pagination currentPage={currentPage} totalPages={totalPages} />
          </>
        )}
      </div>
    </main>
  );
}