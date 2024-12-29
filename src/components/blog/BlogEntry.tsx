import { Link } from "react-router-dom";
import { Paper, Typography, Box } from "@mui/material";
import { Category as CategoryIcon } from "@mui/icons-material";

interface BlogPost {
  id: string;
  title: string;
  date: string;
  category: string;
  permalink: string;
  preview?: string;
}

interface BlogEntryProps {
  post: BlogPost;
  onCategoryClick: (e: React.MouseEvent, category: string) => void;
}

export const BlogEntry = ({ post, onCategoryClick }: BlogEntryProps) => {
  return (
    <Link to={post.permalink} style={{ textDecoration: "none" }}>
      <Paper
        className="blog-entry"
        elevation={1}
        sx={{
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: 3,
          },
        }}
      >
        <Typography variant="h5" component="h2" className="blog-entry-title">
          {post.title}
        </Typography>

        <Typography className="blog-entry-date">
          {new Date(post.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </Typography>

        {post.preview && (
          <Typography 
            className="blog-entry-preview" 
            data-testid="blog-entry-preview"
            sx={{ 
              mt: 2, 
              mb: 2,
              color: 'text.secondary',
              fontSize: '0.95rem',
              lineHeight: 1.6
            }}
          >
            {post.preview}
          </Typography>
        )}

        <Box className="blog-entry-meta">
          {post.category && (
            <Box
              className="blog-entry-section"
              component="span"
              onClick={(e) => {
                e.preventDefault();
                onCategoryClick(e, post.category);
              }}
              sx={{
                cursor: "pointer",
                textDecoration: "none",
                color: "inherit",
                display: "flex",
                alignItems: "center",
                "&:hover": {
                  color: "primary.main",
                  "& .MuiSvgIcon-root": {
                    color: "primary.main",
                  },
                },
              }}
            >
              <CategoryIcon fontSize="small" color="action" />
              <span className="blog-entry-section-label">Category:</span>
              <span>{post.category}</span>
            </Box>
          )}
        </Box>
      </Paper>
    </Link>
  );
}; 