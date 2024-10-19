import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react';
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
      loadAllBooks: vi.fn(),
      setSearchTerm: vi.fn(),
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
      loadAllBooks: vi.fn(),
      setSearchTerm: vi.fn(),
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
    const loadMoreBooks = vi.fn();
    const loadAllBooks = vi.fn();
    vi.mocked(useBookLoader).mockReturnValue({
      displayedBooks: books.slice(0, 6),
      hasMore: true,
      loadMoreBooks,
      loadAllBooks,
      setSearchTerm: vi.fn(),
    });

    // when
    render(<BooksDisplay />);
    
    // then
    expect(screen.getByRole('button', { name: /load more/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /load all/i })).toBeInTheDocument();
  });

  it('renders LoadMoreBooks component with correct props when hasMore is false', () => {
    // given
    vi.mocked(useBookLoader).mockReturnValue({
      displayedBooks: books,
      hasMore: false,
      loadMoreBooks: vi.fn(),
      loadAllBooks: vi.fn(),
      setSearchTerm: vi.fn(),
    });

    // when
    render(<BooksDisplay />);
    
    // then
    expect(screen.getByText(/you have seen all the books!/i)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /load more/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /load all/i })).not.toBeInTheDocument();
  });

  it('calls loadMoreBooks when Load More button is clicked', () => {
    // given
    const loadMoreBooks = vi.fn();
    const loadAllBooks = vi.fn();
    const setSearchTerm = vi.fn();
    vi.mocked(useBookLoader).mockReturnValue({
      displayedBooks: books.slice(0, 6),
      hasMore: true,
      loadMoreBooks,
      loadAllBooks,
      setSearchTerm,
    });

    // when
    render(<BooksDisplay />);
    fireEvent.click(screen.getByRole('button', { name: /load more/i }));
    
    // then
    expect(loadMoreBooks).toHaveBeenCalledTimes(1);
  });

  it('calls loadAllBooks when Load All button is clicked', () => {
    // given
    const loadMoreBooks = vi.fn();
    const loadAllBooks = vi.fn();
    const setSearchTerm = vi.fn();
    vi.mocked(useBookLoader).mockReturnValue({
      displayedBooks: books.slice(0, 6),
      hasMore: true,
      loadMoreBooks,
      loadAllBooks,
      setSearchTerm,
    });

    // when
    render(<BooksDisplay />);
    fireEvent.click(screen.getByRole('button', { name: /load all/i }));
    
    // then
    expect(loadAllBooks).toHaveBeenCalledTimes(1);
  });

  it('calls setSearchTerm when search input changes', () => {
    // given
    const setSearchTerm = vi.fn();
    vi.mocked(useBookLoader).mockReturnValue({
      displayedBooks: books.slice(0, 6),
      hasMore: true,
      loadMoreBooks: vi.fn(),
      loadAllBooks: vi.fn(),
      setSearchTerm,
    });

    // when
    render(<BooksDisplay />);
    fireEvent.change(screen.getByPlaceholderText('Search by title'), { target: { value: 'test search' } });
    
    // then
    expect(setSearchTerm).toHaveBeenCalledWith('test search');
  });

  it('displays filtered books when search term is provided', () => {
    // given
    const filteredBooks = [books[0]];
    vi.mocked(useBookLoader).mockReturnValue({
      displayedBooks: filteredBooks,
      hasMore: false,
      loadMoreBooks: vi.fn(),
      loadAllBooks: vi.fn(),
      setSearchTerm: vi.fn(),
    });

    // when
    render(<BooksDisplay />);
    
    // then
    expect(screen.getAllByTestId('book-card')).toHaveLength(1);
    expect(screen.getByText(filteredBooks[0].title)).toBeInTheDocument();
  });
});
