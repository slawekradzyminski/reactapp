import { Button, Typography, Box } from "@mui/material";
import { MouseEventHandler } from "react";

interface LoadMoreBooksProps {
  hasMore: boolean;
  onLoadMore: MouseEventHandler<HTMLButtonElement>;
  onLoadAll: MouseEventHandler<HTMLButtonElement>;
}

const LoadMoreBooks = ({ hasMore, onLoadMore, onLoadAll }: LoadMoreBooksProps) => (
  <Box sx={{ textAlign: "center", marginTop: "20px" }}>
    {hasMore ? (
      <Box sx={{ display: "flex", justifyContent: "center", gap: "10px" }}>
        <Button variant="contained" color="primary" onClick={onLoadMore}>
          Load More
        </Button>
        <Button variant="outlined" color="primary" onClick={onLoadAll}>
          Load All
        </Button>
      </Box>
    ) : (
      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
        That's all the books!
      </Typography>
    )}
  </Box>
);

export default LoadMoreBooks;
