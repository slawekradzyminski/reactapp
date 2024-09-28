import { Button, Typography, Box } from "@mui/material";
import { MouseEventHandler } from "react";

interface LoadMoreBooksProps {
  hasMore: boolean;
  onLoadMore: MouseEventHandler<HTMLButtonElement>;
}

const LoadMoreBooks = ({ hasMore, onLoadMore }: LoadMoreBooksProps) => (
  <Box sx={{ textAlign: "center", marginTop: "20px" }}>
    {hasMore ? (
      <Button variant="contained" color="primary" onClick={onLoadMore}>
        Load More
      </Button>
    ) : (
      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
        You have seen all the books!
      </Typography>
    )}
  </Box>
);

export default LoadMoreBooks;