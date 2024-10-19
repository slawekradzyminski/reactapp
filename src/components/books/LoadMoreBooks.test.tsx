import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react';
import LoadMoreBooks from './LoadMoreBooks';

describe('LoadMoreBooks', () => {
  it('renders Load More and Load All buttons when hasMore is true', () => {
    // given
    const onLoadMore = vi.fn();
    const onLoadAll = vi.fn();

    // when
    render(<LoadMoreBooks hasMore={true} onLoadMore={onLoadMore} onLoadAll={onLoadAll} />);
    
    // then
    expect(screen.getByRole('button', { name: /load more/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /load all/i })).toBeInTheDocument();
  });

  it('renders "You have seen all the books!" message when hasMore is false', () => {
    // given
    const onLoadMore = vi.fn();
    const onLoadAll = vi.fn();

    // when
    render(<LoadMoreBooks hasMore={false} onLoadMore={onLoadMore} onLoadAll={onLoadAll} />);
    
    // then
    expect(screen.getByText(/you have seen all the books!/i)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /load more/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /load all/i })).not.toBeInTheDocument();
  });

  it('calls onLoadMore when Load More button is clicked', () => {
    // given
    const onLoadMore = vi.fn();
    const onLoadAll = vi.fn();

    // when
    render(<LoadMoreBooks hasMore={true} onLoadMore={onLoadMore} onLoadAll={onLoadAll} />);
    fireEvent.click(screen.getByRole('button', { name: /load more/i }));
    
    // then
    expect(onLoadMore).toHaveBeenCalledTimes(1);
  });

  it('calls onLoadAll when Load All button is clicked', () => {
    // given
    const onLoadMore = vi.fn();
    const onLoadAll = vi.fn();

    // when
    render(<LoadMoreBooks hasMore={true} onLoadMore={onLoadMore} onLoadAll={onLoadAll} />);
    fireEvent.click(screen.getByRole('button', { name: /load all/i }));
    
    // then
    expect(onLoadAll).toHaveBeenCalledTimes(1);
  });
});
