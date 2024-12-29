import { Box, IconButton, Typography } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";
import blogIndex from "../../data/blog/index.json";

interface BlogPostNavigationProps {
  currentPostId: string;
}

const BlogPostNavigation = ({ currentPostId }: BlogPostNavigationProps) => {
  const navigate = useNavigate();
  const currentIndex = blogIndex.findIndex((post) => post.id === currentPostId);
  const prevPost = currentIndex > 0 ? blogIndex[currentIndex - 1] : null;
  const nextPost = currentIndex < blogIndex.length - 1 ? blogIndex[currentIndex + 1] : null;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mt: 4,
        mb: 2,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
        <IconButton
          onClick={() => prevPost && navigate(`${prevPost.permalink}`)}
          disabled={!prevPost}
          sx={{ visibility: prevPost ? "visible" : "hidden" }}
        >
          <ArrowBackIosNewIcon />
        </IconButton>

        {prevPost && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              cursor: "pointer",
              "&:hover": { textDecoration: "underline" },
              display: { xs: "none", sm: "block" },
              ml: 1
            }}
            onClick={() => navigate(`${prevPost.permalink}`)}
          >
            Previous: {prevPost.title}
          </Typography>
        )}
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', flex: 1, justifyContent: 'flex-end' }}>
        {nextPost && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              cursor: "pointer",
              "&:hover": { textDecoration: "underline" },
              display: { xs: "none", sm: "block" },
              mr: 1
            }}
            onClick={() => navigate(`${nextPost.permalink}`)}
          >
            Next: {nextPost.title}
          </Typography>
        )}

        <IconButton
          onClick={() => nextPost && navigate(`${nextPost.permalink}`)}
          disabled={!nextPost}
          sx={{ visibility: nextPost ? "visible" : "hidden" }}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default BlogPostNavigation; 