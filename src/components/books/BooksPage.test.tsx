import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react';
import BooksPage from './BooksPage';
import useBookLoader from '../../hooks/useBookLoader';
import books from '../../data/books.json';

import DisplayedBookCards from './DisplayedBookCards';
import { Book } from '../../types/domain';

vi.mock('../../hooks/useBookLoader');
vi.mock('./SearchBookInput', () => ({
  default: vi.fn(({ onSearchChange }) => (
    <input
      placeholder="Search by title"
      onChange={onSearchChange}
      data-testid="search-book-input"
    />
  ))
}));

vi.mock('./DisplayedBookCards', () => ({
  default: vi.fn(({ books }) => (
    <div data-testid="displayed-book-cards">
      {books.map((book: Book) => (
        <div key={book.title} data-testid="book-card">{book.title}</div>
      ))}
    </div>
  ))
}));

const setupTest = (overrides = {}) => {
  const defaultProps = {
    displayedBooks: books.slice(0, 6),
    hasMore: true,
    loadMoreBooks: vi.fn(),
    loadAllBooks: vi.fn(),
    setSearchTerm: vi.fn(),
  };
  
  vi.mocked(useBookLoader).mockReturnValue({ ...defaultProps, ...overrides });
  return render(<BooksPage />);
};

describe('BooksPage', () => {
  it('renders correct number of book cards and displays titles', () => {
    // given
    const mockBooks = books.slice(0, 6);

    // when
    setupTest({ displayedBooks: mockBooks });

    // then
    expect(screen.getAllByTestId('book-card')).toHaveLength(6);
    mockBooks.forEach(book => {
      expect(screen.getByText(book.title)).toBeInTheDocument();
    });
  });

  it('renders LoadMoreBooks component correctly based on hasMore (true)', () => {
    // then
    setupTest({ hasMore: true });

    // then
    expect(screen.queryByText(/that's all the books!/i)).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /load more/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /load all/i })).toBeInTheDocument();
  });

  it('renders LoadMoreBooks component correctly based on hasMore (false)', () => {
    // when
    setupTest({ hasMore: false });

    // then
    expect(screen.queryByText(/that's all the books!/i)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /load more/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /load all/i })).not.toBeInTheDocument();
  });

  describe('BooksPage interactions', () => {
    it('calls loadMoreBooks function when "Load More" button is clicked', () => {
      // given
      const loadMoreBooks = vi.fn();
      setupTest({ loadMoreBooks });

      // when
      fireEvent.click(screen.getByRole('button', { name: /load more/i }));

      // then
      expect(loadMoreBooks).toHaveBeenCalledTimes(1);
    });

    it('calls loadAllBooks function when "Load All" button is clicked', () => {
      // given
      const loadAllBooks = vi.fn();
      setupTest({ loadAllBooks });

      // when
      fireEvent.click(screen.getByRole('button', { name: /load all/i }));

      // then
      expect(loadAllBooks).toHaveBeenCalledTimes(1);
    });

    it('calls setSearchTerm function with correct value when search input changes', () => {
      // given
      const setSearchTerm = vi.fn();
      setupTest({ setSearchTerm });

      // when
      fireEvent.change(screen.getByTestId('search-book-input'), { target: { value: 'test search' } });

      // then
      expect(setSearchTerm).toHaveBeenCalledWith('test search');
    });
  });

  it('displays filtered books and renders DisplayedBookCards correctly', () => {
    // given
    const filteredBooks = [books[0]];

    // when
    setupTest({ displayedBooks: filteredBooks, hasMore: false });

    // then
    expect(screen.getAllByTestId('book-card')).toHaveLength(1);
    expect(screen.getByText(filteredBooks[0].title)).toBeInTheDocument();
    expect(DisplayedBookCards).toHaveBeenCalledWith({ books: filteredBooks }, {});
  });
});
