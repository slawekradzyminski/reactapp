import React from "react";
import BookCard from "./BookCard";
import LoadMoreBooks from "./LoadMoreBooks";
import useBookLoader from "../../hooks/useBookLoader";
import { Book } from "../../types/domain";
import { Box, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const BooksDisplay = () => {
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
      <Box sx={{ display: "flex", justifyContent: "center", mb: 2, mt: 2 }}>
        {" "}
        <TextField
          placeholder="Search by title"
          variant="outlined"
          size="small"
          onChange={handleSearchChange}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center",
          marginTop: "30px",
        }}
      >
        {displayedBooks.map((book: Book) => (
          <BookCard key={book.title} book={book} />
        ))}
      </Box>
      <LoadMoreBooks
        hasMore={hasMore}
        onLoadMore={loadMoreBooks}
        onLoadAll={loadAllBooks}
      />
    </Box>
  );
};

export default BooksDisplay;
