import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import useBookLoader from './useBookLoader'
import books from '../data/books.json'

describe('useBookLoader', () => {
  beforeEach(() => {
    vi.spyOn(Math, 'random').mockRestore();
  });

  it('should initialize with correct number of books', () => {
    // given
    const { result } = renderHook(() => useBookLoader(10))
    
    // when
    const { displayedBooks, hasMore } = result.current

    // then
    expect(displayedBooks).toHaveLength(10)
    expect(hasMore).toBe(true)
  })

  it('should load more books when loadMoreBooks is called', () => {
    // given
    const { result } = renderHook(() => useBookLoader(10))
    
    // when
    act(() => {
      result.current.loadMoreBooks()
    })

    // then
    expect(result.current.displayedBooks).toHaveLength(20)
    expect(result.current.hasMore).toBe(true)
  })

  it('should set hasMore to false when all books are loaded', () => {
    // given
    const { result } = renderHook(() => useBookLoader(books.length - 5))
    
    // when
    act(() => {
      result.current.loadMoreBooks()
    })

    // then
    expect(result.current.displayedBooks).toHaveLength(books.length)
    expect(result.current.hasMore).toBe(false)
  })

  it('should not load more books than available', () => {
    // given
    const { result } = renderHook(() => useBookLoader(books.length))
    
    // when
    const { displayedBooks, hasMore } = result.current

    // then
    expect(displayedBooks).toHaveLength(books.length)
    expect(hasMore).toBe(false)
  })

  it('should load all books when loadAllBooks is called', () => {
    // given
    const { result } = renderHook(() => useBookLoader(10))
    
    // when
    act(() => {
      result.current.loadAllBooks()
    })

    // then
    expect(result.current.displayedBooks).toHaveLength(books.length)
    expect(result.current.hasMore).toBe(false)
  })

  it('should filter books based on search term', () => {
    // given
    const { result } = renderHook(() => useBookLoader(10))
    const searchTerm = books[0].title.slice(0, 5)
    
    // when
    act(() => {
      result.current.setSearchTerm(searchTerm)
    })

    // then
    expect(result.current.displayedBooks.every(book => 
      book.title.toLowerCase().includes(searchTerm.toLowerCase())
    )).toBe(true)
  })

  it('should update displayed books when search term changes', () => {
    // given
    const { result } = renderHook(() => useBookLoader(10))
    const searchTerm = books[0].title.slice(0, 5)
    
    // when
    act(() => {
      result.current.setSearchTerm(searchTerm)
    })

    // then
    expect(result.current.displayedBooks.length).toBeLessThanOrEqual(10)
    expect(result.current.displayedBooks.every(book => 
      book.title.toLowerCase().includes(searchTerm.toLowerCase())
    )).toBe(true)
  })

  it('should reset search when search term is cleared', () => {
    // given
    const { result } = renderHook(() => useBookLoader(10))
    const searchTerm = books[0].title.slice(0, 5)
    
    // when
    act(() => {
      result.current.setSearchTerm(searchTerm)
    })
    act(() => {
      result.current.setSearchTerm('')
    })

    // then
    expect(result.current.displayedBooks).toHaveLength(10)
    expect(result.current.hasMore).toBe(true)
  })

  it('should maintain stable order between renders with same search term', () => {
    // given
    const { result, rerender } = renderHook(() => useBookLoader(books.length));
    const firstOrder = result.current.displayedBooks.map(book => book.title);
    
    // when
    rerender();
    const secondOrder = result.current.displayedBooks.map(book => book.title);

    // then
    expect(firstOrder).toEqual(secondOrder);
  });

  it('should potentially reorder books when search term changes', () => {
    // given
    const { result } = renderHook(() => useBookLoader(books.length));
    const initialOrder = result.current.displayedBooks.map(book => book.title);
    
    // when - change search term to trigger memoization
    act(() => {
      result.current.setSearchTerm('a');
    });
    
    const filteredOrder = result.current.displayedBooks.map(book => book.title);
    
    // then - filtered results should be in potentially different order
    expect(filteredOrder.length).toBeLessThan(initialOrder.length);
    expect(filteredOrder.every(title => initialOrder.includes(title))).toBe(true);
  });
})