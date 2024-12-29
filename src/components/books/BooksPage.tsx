import React from "react";
import LoadMoreBooks from "./LoadMoreBooks";
import useBookLoader from "../../hooks/useBookLoader";
import { Box } from "@mui/material";
import SearchBookInput from "./SearchBookInput";
import DisplayedBookCards from "./DisplayedBookCards";

const BooksPage = () => {
  const booksPerLoad = 6;
  const {
    displayedBooks,
    hasMore,
    loadMoreBooks,
    loadAllBooks,
    setSearchTerm,
  } = useBookLoader(booksPerLoad);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Box>
      <SearchBookInput onSearchChange={handleSearchChange} />
      <DisplayedBookCards books={displayedBooks} />
      <LoadMoreBooks
        hasMore={hasMore}
        onLoadMore={loadMoreBooks}
        onLoadAll={loadAllBooks}
      />
    </Box>
  );
};

export default BooksPage;
