import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react';
import BooksDisplay from './BooksDisplay';
import useBookLoader from '../../hooks/useBookLoader';
import books from '../../data/books.json';

vi.mock('../../hooks/useBookLoader');

describe('BooksDisplay', () => {
  it('renders correct number of book cards initially', () => {
    // given
    vi.mocked(useBookLoader).mockReturnValue({
      displayedBooks: books.slice(0, 6),
      hasMore: true,
      loadMoreBooks: vi.fn(),
    });

    // when
    render(<BooksDisplay />);
    
    // then
    const bookCards = screen.getAllByTestId('book-card');
    expect(bookCards).toHaveLength(6); 
  });

  it('displays book titles correctly', () => {
    // given
    vi.mocked(useBookLoader).mockReturnValue({
      displayedBooks: books.slice(0, 6),
      hasMore: true,
      loadMoreBooks: vi.fn(),
    });

    // when
    render(<BooksDisplay />);
    
    // then
    books.slice(0, 6).forEach(book => {
      expect(screen.getByText(book.title)).toBeInTheDocument();
    });
  });

  it('renders LoadMoreBooks component with correct props when hasMore is true', () => {
    // given
    vi.mocked(useBookLoader).mockReturnValue({
      displayedBooks: books.slice(0, 6),
      hasMore: true,
      loadMoreBooks: vi.fn(),
    });

    // when
    render(<BooksDisplay />);
    
    // then
    expect(screen.getByRole('button', { name: /load more/i })).toBeInTheDocument();
  });

  it('renders LoadMoreBooks component with correct props when hasMore is false', () => {
    // given
    vi.mocked(useBookLoader).mockReturnValue({
      displayedBooks: books,
      hasMore: false,
      loadMoreBooks: vi.fn(),
    });

    // when
    render(<BooksDisplay />);
    
    // then
    expect(screen.getByText(/you have seen all the books!/i)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /load more/i })).not.toBeInTheDocument();
  });
});