import { renderHook, act } from '@testing-library/react';
import useBookLoader from './useBookLoader';
import books from '../data/books.json';

describe('useBookLoader', () => {
  test('should initialize with correct number of books', () => {
    const { result } = renderHook(() => useBookLoader(10));
    
    expect(result.current.displayedBooks).toHaveLength(10);
    expect(result.current.hasMore).toBe(true);
  });

  test('should load more books when loadMoreBooks is called', () => {
    const { result } = renderHook(() => useBookLoader(10));
    
    act(() => {
      result.current.loadMoreBooks();
    });

    expect(result.current.displayedBooks).toHaveLength(20);
    expect(result.current.hasMore).toBe(true);
  });

  test('should set hasMore to false when all books are loaded', () => {
    const { result } = renderHook(() => useBookLoader(books.length - 5));
    
    act(() => {
      result.current.loadMoreBooks();
    });

    expect(result.current.displayedBooks).toHaveLength(books.length);
    expect(result.current.hasMore).toBe(false);
  });

  test('should not load more books than available', () => {
    const { result } = renderHook(() => useBookLoader(books.length));
    
    expect(result.current.displayedBooks).toHaveLength(books.length);
    expect(result.current.hasMore).toBe(false);

    act(() => {
      result.current.loadMoreBooks();
    });

    expect(result.current.displayedBooks).toHaveLength(books.length);
    expect(result.current.hasMore).toBe(false);
  });
});