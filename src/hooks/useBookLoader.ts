import { useState, useEffect, useMemo } from "react";
import books from "../data/books.json";
import { Book } from "../types/domain";

const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const useBookLoader = (booksPerLoad: number) => {
  const [displayedBooks, setDisplayedBooks] = useState<Book[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBooks = useMemo(() => {
    const filtered = books.filter((book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return shuffleArray(filtered);
  }, [searchTerm]);

  useEffect(() => {
    const initialBooks = filteredBooks.slice(0, booksPerLoad);
    setDisplayedBooks(initialBooks);
    setHasMore(filteredBooks.length > booksPerLoad);
  }, [booksPerLoad, filteredBooks]);

  const loadMoreBooks = () => {
    const currentLength = displayedBooks.length;
    const moreBooks = filteredBooks.slice(currentLength, currentLength + booksPerLoad);
    setDisplayedBooks((prevBooks) => [...prevBooks, ...moreBooks]);

    if (currentLength + moreBooks.length >= filteredBooks.length) {
      setHasMore(false);
    }
  };

  const loadAllBooks = () => {
    setDisplayedBooks(filteredBooks);
    setHasMore(false);
  };

  return { displayedBooks, hasMore, loadMoreBooks, loadAllBooks, setSearchTerm };
};

export default useBookLoader;
