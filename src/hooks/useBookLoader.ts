import { useState, useEffect } from "react";
import books from "../data/books.json";
import { Book } from "../types/book";

const useBookLoader = (booksPerLoad: number) => {
  const [displayedBooks, setDisplayedBooks] = useState<Book[]>([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const initialBooks = books.slice(0, booksPerLoad);
    setDisplayedBooks(initialBooks);
    setHasMore(books.length > booksPerLoad);
  }, [booksPerLoad]);

  const loadMoreBooks = () => {
    const currentLength = displayedBooks.length;
    const moreBooks = books.slice(currentLength, currentLength + booksPerLoad);
    setDisplayedBooks((prevBooks) => [...prevBooks, ...moreBooks]);

    if (currentLength + moreBooks.length >= books.length) {
      setHasMore(false);
    }
  };

  return { displayedBooks, hasMore, loadMoreBooks };
};

export default useBookLoader;