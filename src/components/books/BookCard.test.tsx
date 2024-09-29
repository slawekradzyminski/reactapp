import { render, screen } from '@testing-library/react';
import { it, expect } from 'vitest';
import BookCard from './BookCard';

it('renders BookCard with correct title and description', () => {
    // given
    const book = {
        title: "Sample Book Title",
        description: "Sample Book Description",
        path: "path/to/image.jpg",
        link: "http://example.com"
    };

    // when
    render(<BookCard book={book} />);

    // then
    expect(screen.getByText(book.title)).toBeInTheDocument();
    expect(screen.getByText(book.description)).toBeInTheDocument();
});

