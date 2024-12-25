import { Box, Pagination } from "@mui/material";

interface BlogPaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (event: React.ChangeEvent<unknown>, page: number) => void;
}

export const BlogPagination = ({
  totalPages,
  currentPage,
  onPageChange,
}: BlogPaginationProps) => {
  return (
    <Box className="blog-pagination" sx={{ mt: 4, mb: 4 }}>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={onPageChange}
        color="primary"
        size="large"
        showFirstButton
        showLastButton
      />
    </Box>
  );
}; 