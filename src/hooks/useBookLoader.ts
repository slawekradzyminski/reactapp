import { useState, useEffect, useMemo } from "react";
import books from "../data/books.json";
import { Book } from "../types/domain";

const useBookLoader = (booksPerLoad: number) => {
  const [displayedBooks, setDisplayedBooks] = useState<Book[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBooks = useMemo(() => {
    return books.filter((book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
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
