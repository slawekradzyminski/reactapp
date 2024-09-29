import Typography from "@mui/material/Typography";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Box from "@mui/material/Box";

const LinkedInFollow = () => {
  const linkedInUrl = "https://www.linkedin.com/in/slawekradzyminski/";

  return (
    <Box component="a"
      href={linkedInUrl}
      target="_blank"
      rel="noopener noreferrer"
      sx={{
        display: "flex",
        alignItems: "center",
        textDecoration: "none",
        color: "inherit",
      }}
    >
      <Typography variant="body1">
        Follow me on
      </Typography>
      <LinkedInIcon sx={{ mr: 3, ml: 0.5 }} />
    </Box>
  );
};

export default LinkedInFollow;
