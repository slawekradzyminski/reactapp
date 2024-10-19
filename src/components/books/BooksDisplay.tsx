import BookCard from "./BookCard";
import LoadMoreBooks from "./LoadMoreBooks";
import useBookLoader from "../../hooks/useBookLoader";
import { Book } from "../../types/domain";
import { Box } from "@mui/material";

const BooksDisplay = () => {
  const booksPerLoad = 6;
  const { displayedBooks, hasMore, loadMoreBooks, loadAllBooks } = useBookLoader(booksPerLoad);

  return (
    <Box>
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
