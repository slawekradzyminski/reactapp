import { Box, Typography } from "@mui/material";
import SearchInput from "../shared/SearchInput";

interface BlogListHeaderProps {
  searchTerm: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const BlogListHeader = ({ searchTerm, onSearchChange }: BlogListHeaderProps) => {
  return (
    <>
      <Box>
        <SearchInput 
          value={searchTerm} 
          onSearchChange={onSearchChange}
          testId="search-blog-input"
        />
      </Box>

      <Typography
        variant="h4"
        component="h1"
        className="blog-list-title"
        sx={{ mb: 3, textAlign: "center" }}
      >
        Blog Archive
      </Typography>
    </>
  );
}; 