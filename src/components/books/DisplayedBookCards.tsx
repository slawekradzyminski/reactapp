import { Box } from "@mui/material";
import BookCard from "./BookCard";
import { Book } from "../../types/domain";

interface DisplayedBookCardsProps {
  books: Book[];
}

const DisplayedBookCards = ({ books }: DisplayedBookCardsProps) => (
  <Box
    sx={{
      display: "flex",
      flexWrap: "wrap",
      gap: "20px",
      justifyContent: "center",
      marginTop: "30px",
    }}
  >
    {books.map((book: Book) => (
      <BookCard key={book.title} book={book} />
    ))}
  </Box>
);

export default DisplayedBookCards;