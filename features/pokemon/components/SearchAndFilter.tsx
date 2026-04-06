'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useDebouncedCallback } from '@/shared/hooks/useDebouncedCallback';

interface Props {
  search: string;
  selectedType: string;
  types: string[];
}

export default function SearchAndFilter({ search, selectedType, types }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const updateParams = (key: string, value: string) => {
    const params = new URLSearchParams(window.location.search);
    if (value && value !== 'all') {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSearch = useDebouncedCallback((value: string) => {
    updateParams('search', value);
  }, 300);

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8">
      <input
        type="text"
        placeholder="Search Pokémon..."
        defaultValue={search}
        onChange={(e) => handleSearch(e.target.value)}
          aria-label="Search Pokémon by name"
        className="flex-1 px-4 py-3 rounded-xl bg-white/10 backdrop-blur border border-white/20 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
      />
      <select
        value={selectedType}
        onChange={(e) => updateParams('type', e.target.value)}
          aria-label="Filter by Pokémon type"
        className="px-4 py-3 rounded-xl bg-white/10 backdrop-blur border border-white/20 text-white capitalize focus:outline-none focus:ring-2 focus:ring-yellow-400"
      >
        {types.map(t => (
          <option key={t} value={t} className="capitalize bg-purple-900">
            {t}
          </option>
        ))}
      </select>
    </div>
  );
}