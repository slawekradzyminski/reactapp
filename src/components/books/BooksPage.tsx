import React, { useState } from "react";
import LoadMoreBooks from "./LoadMoreBooks";
import useBookLoader from "../../hooks/useBookLoader";
import { Box, Container } from "@mui/material";
import SearchInput from "../shared/SearchInput";
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
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setSearchValue(newValue);
    setSearchTerm(newValue);
  };

  return (
    <Container maxWidth="lg">
      <Box>
        <SearchInput 
          onSearchChange={handleSearchChange} 
          testId="search-book-input"
          value={searchValue}
        />
        <DisplayedBookCards books={displayedBooks} />
        <LoadMoreBooks
          hasMore={hasMore}
          onLoadMore={loadMoreBooks}
          onLoadAll={loadAllBooks}
        />
      </Box>
    </Container>
  );
};

export default BooksPage;
