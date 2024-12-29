import { Typography } from "@mui/material";

export const NoPostsFound = () => {
  return (
    <Typography
      variant="h6"
      color="text.secondary"
      sx={{ textAlign: "center", mt: 4 }}
    >
      No posts found matching your criteria
    </Typography>
  );
}; 