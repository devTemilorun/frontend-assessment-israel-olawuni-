const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://pokeapi.co/api/v2';

export async function fetchApi<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    next: { revalidate: 3600 }, // ISR: revalidate every hour
  });
  
  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }
  
  return res.json();
}