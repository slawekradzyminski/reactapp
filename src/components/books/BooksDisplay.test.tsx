import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BooksDisplay from './BooksDisplay';
import useBookLoader from '../../hooks/useBookLoader';
import books from '../../data/books.json';

jest.mock('../../hooks/useBookLoader');

describe('BooksDisplay', () => {
  test('renders correct number of book cards initially', () => {
    // given
    (useBookLoader as jest.Mock).mockReturnValue({
      displayedBooks: books.slice(0, 6),
      hasMore: true,
      loadMoreBooks: jest.fn(),
    });

    // when
    render(<BooksDisplay />);
    
    // then
    const bookCards = screen.getAllByTestId('book-card');
    expect(bookCards).toHaveLength(6); 
  });

  test('displays book titles correctly', () => {
    // given
    (useBookLoader as jest.Mock).mockReturnValue({
      displayedBooks: books.slice(0, 6),
      hasMore: true,
      loadMoreBooks: jest.fn(),
    });

    // when
    render(<BooksDisplay />);
    
    // then
    books.slice(0, 6).forEach(book => {
      expect(screen.getByText(book.title)).toBeInTheDocument();
    });
  });

  test('renders LoadMoreBooks component with correct props when hasMore is true', () => {
    // given
    (useBookLoader as jest.Mock).mockReturnValue({
      displayedBooks: books.slice(0, 6),
      hasMore: true,
      loadMoreBooks: jest.fn(),
    });

    // when
    render(<BooksDisplay />);
    
    // then
    expect(screen.getByRole('button', { name: /load more/i })).toBeInTheDocument();
  });

  test('renders LoadMoreBooks component with correct props when hasMore is false', () => {
    // given
    (useBookLoader as jest.Mock).mockReturnValue({
      displayedBooks: books,
      hasMore: false,
      loadMoreBooks: jest.fn(),
    });

    // when
    render(<BooksDisplay />);
    
    // then
    expect(screen.getByText(/you have seen all the books!/i)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /load more/i })).not.toBeInTheDocument();
  });
});