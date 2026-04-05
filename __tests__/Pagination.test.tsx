import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Pagination from '@/features/pokemon/components/Pagination';

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}));

describe('Pagination', () => {
  it('disables previous button on first page', () => {
    render(<Pagination currentPage={1} totalPages={10} />);
    const prevButton = screen.getByText('← Previous');
    expect(prevButton).toBeDisabled();
  });

  it('disables next button on last page', () => {
    render(<Pagination currentPage={10} totalPages={10} />);
    const nextButton = screen.getByText('Next →');
    expect(nextButton).toBeDisabled();
  });

  it('shows correct page numbers', () => {
    render(<Pagination currentPage={5} totalPages={10} />);
    expect(screen.getByText('5')).toBeInTheDocument();
  });
});