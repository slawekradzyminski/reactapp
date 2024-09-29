import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BooksDisplay from './BooksDisplay';
import useBookLoader from '../../hooks/useBookLoader';
import books from '../../data/books.json';

jest.mock('../../hooks/useBookLoader');

describe('BooksDisplay', () => {
  test('renders correct number of book cards initially', () => {
    (useBookLoader as jest.Mock).mockReturnValue({
      displayedBooks: books.slice(0, 6),
      hasMore: true,
      loadMoreBooks: jest.fn(),
    });

    render(<BooksDisplay />);
    
    const bookCards = screen.getAllByTestId('book-card');
    expect(bookCards).toHaveLength(6); 
  });

  test('displays book titles correctly', () => {
    (useBookLoader as jest.Mock).mockReturnValue({
      displayedBooks: books.slice(0, 6),
      hasMore: true,
      loadMoreBooks: jest.fn(),
    });

    render(<BooksDisplay />);
    
    books.slice(0, 6).forEach(book => {
      expect(screen.getByText(book.title)).toBeInTheDocument();
    });
  });

  test('renders LoadMoreBooks component with correct props when hasMore is true', () => {
    (useBookLoader as jest.Mock).mockReturnValue({
      displayedBooks: books.slice(0, 6),
      hasMore: true,
      loadMoreBooks: jest.fn(),
    });

    render(<BooksDisplay />);
    
    expect(screen.getByRole('button', { name: /load more/i })).toBeInTheDocument();
  });

  test('renders LoadMoreBooks component with correct props when hasMore is false', () => {
    (useBookLoader as jest.Mock).mockReturnValue({
      displayedBooks: books,
      hasMore: false,
      loadMoreBooks: jest.fn(),
    });

    render(<BooksDisplay />);
    
    expect(screen.getByText(/you have seen all the books!/i)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /load more/i })).not.toBeInTheDocument();
  });
});