import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SearchAndFilter from '@/features/pokemon/components/SearchAndFilter';

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
  usePathname: () => '/',
}));

describe('SearchAndFilter', () => {
  it('renders search input and filter select', () => {
    render(
      <SearchAndFilter search="" selectedType="all" types={['all', 'fire', 'water']} />
    );
    
    expect(screen.getByPlaceholderText('Search Pokémon...')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('shows correct selected type', () => {
    render(
      <SearchAndFilter search="" selectedType="fire" types={['all', 'fire', 'water']} />
    );
    
    expect(screen.getByRole('combobox')).toHaveValue('fire');
  });
});