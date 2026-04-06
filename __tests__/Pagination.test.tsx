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

  it('shows current page as active', () => {
    render(<Pagination currentPage={5} totalPages={10} />);
    const activeButton = screen.getByText('5');
    expect(activeButton).toHaveClass('bg-yellow-500');
  });

  it('renders correct number of page buttons', () => {
    render(<Pagination currentPage={5} totalPages={10} />);
    // Should show: 1 ... 4 5 6 ... 10
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('6')).toBeInTheDocument();
  });
});