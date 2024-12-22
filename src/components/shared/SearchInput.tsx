import React from "react";
import { Box, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface SearchInputProps {
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  placeholder?: string;
  testId?: string;
}

const SearchInput = ({ 
  onSearchChange, 
  value = '', 
  placeholder = "Search by title",
  testId = "search-input"
}: SearchInputProps) => (
  <Box sx={{ display: "flex", justifyContent: "center", mb: 2, mt: 2 }}>
    <TextField
      placeholder={placeholder}
      variant="outlined"
      size="small"
      value={value}
      onChange={onSearchChange}
      inputProps={{
        "data-testid": testId
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  </Box>
);

export default SearchInput; 