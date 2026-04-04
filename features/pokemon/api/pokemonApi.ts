import { fetchApi } from '@/lib/api-client';
import { Pokemon, PokemonListResponse, PokemonListItem } from '@/shared/types/pokemon';

export async function getPokemonList(offset: number = 0, limit: number = 20): Promise<PokemonListItem[]> {
  const data = await fetchApi<PokemonListResponse>(`/pokemon?offset=${offset}&limit=${limit}`);
  return data.results;
}

export async function getPokemonDetails(nameOrId: string | number): Promise<Pokemon> {
  return fetchApi<Pokemon>(`/pokemon/${nameOrId}`);
}

export async function getPokemonByIds(ids: number[]): Promise<Pokemon[]> {
  const promises = ids.map(id => getPokemonDetails(id));
  return Promise.all(promises);
}