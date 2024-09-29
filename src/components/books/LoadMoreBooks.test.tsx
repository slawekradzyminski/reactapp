import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react';
import LoadMoreBooks from './LoadMoreBooks';

describe('LoadMoreBooks', () => {
  it('renders Load More button when hasMore is true', () => {
    // when
    render(<LoadMoreBooks hasMore={true} onLoadMore={() => {}} />);
    
    // then
    expect(screen.getByRole('button', { name: /load more/i })).toBeInTheDocument();
  });

  it('renders "You have seen all the books!" message when hasMore is false', () => {
    // when
    render(<LoadMoreBooks hasMore={false} onLoadMore={() => {}} />);
    
    // then
    expect(screen.getByText(/you have seen all the books!/i)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /load more/i })).not.toBeInTheDocument();
  });

  it('calls onLoadMore when Load More button is clicked', () => {
    // when
    const mockOnLoadMore = vi.fn();
    render(<LoadMoreBooks hasMore={true} onLoadMore={mockOnLoadMore} />);
    fireEvent.click(screen.getByRole('button', { name: /load more/i }));
    
    // then
    expect(mockOnLoadMore).toHaveBeenCalledTimes(1);
  });
});