import { fetchApi } from '@/lib/api-client';
import { Pokemon, PokemonListResponse, PokemonListItem } from '@/shared/types/pokemon';

export async function getPokemonList(offset: number = 0, limit: number = 20): Promise<PokemonListItem[]> {
  const data = await fetchApi<PokemonListResponse>(`/pokemon?offset=${offset}&limit=${limit}`);
  return data.results;
}

export async function getPokemonDetails(nameOrId: string | number): Promise<Pokemon> {
  return fetchApi<Pokemon>(`/pokemon/${nameOrId}`);
}

export async function getPokemonByPage(page: number, limit: number = 20): Promise<Pokemon[]> {
  const offset = (page - 1) * limit;
  const list = await getPokemonList(offset, limit);
  const details = await Promise.all(
    list.map(pokemon => getPokemonDetails(pokemon.name))
  );
  return details;
}

export async function getTotalCount(): Promise<number> {
  const data = await fetchApi<PokemonListResponse>('/pokemon?limit=1');
  return data.count;
}