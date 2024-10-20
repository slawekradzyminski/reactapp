import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import DisplayedBookCards from './DisplayedBookCards';
import { Book } from '../../types/domain';
import books from '../../data/books.json';

describe('DisplayedBookCards', () => {
  it('renders the correct number of BookCards with proper content', () => {
    // when
    render(<DisplayedBookCards books={books} />);

    // then
    const bookCards = screen.getAllByTestId('book-card');
    expect(bookCards).toHaveLength(books.length);

    books.forEach((book: Book) => {
      const bookCard = screen.getByText(book.title).closest('[data-testid="book-card"]');
      expect(bookCard).toBeInTheDocument();
      expect(bookCard).toHaveTextContent(book.title);
      expect(bookCard).toHaveTextContent(book.description);
    });
  });
});
