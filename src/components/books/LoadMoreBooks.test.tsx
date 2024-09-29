import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoadMoreBooks from './LoadMoreBooks';

describe('LoadMoreBooks', () => {
  test('renders Load More button when hasMore is true', () => {
    render(<LoadMoreBooks hasMore={true} onLoadMore={() => {}} />);
    expect(screen.getByRole('button', { name: /load more/i })).toBeInTheDocument();
  });

  test('renders "You have seen all the books!" message when hasMore is false', () => {
    render(<LoadMoreBooks hasMore={false} onLoadMore={() => {}} />);
    expect(screen.getByText(/you have seen all the books!/i)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /load more/i })).not.toBeInTheDocument();
  });

  test('calls onLoadMore when Load More button is clicked', () => {
    const mockOnLoadMore = jest.fn();
    render(<LoadMoreBooks hasMore={true} onLoadMore={mockOnLoadMore} />);
    fireEvent.click(screen.getByRole('button', { name: /load more/i }));
    expect(mockOnLoadMore).toHaveBeenCalledTimes(1);
  });
});