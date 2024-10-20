import React from "react";
import { Box, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface SearchBookInputProps {
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBookInput = ({ onSearchChange }: SearchBookInputProps) => (
  <Box sx={{ display: "flex", justifyContent: "center", mb: 2, mt: 2 }}>
    <TextField
      placeholder="Search by title"
      variant="outlined"
      size="small"
      onChange={onSearchChange}
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
);

export default SearchBookInput;