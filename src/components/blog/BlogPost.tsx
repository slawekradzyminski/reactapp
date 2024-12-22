import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Typography, Paper, Box, Container, Link } from '@mui/material';
import { Category as CategoryIcon } from '@mui/icons-material';
import blogIndex from '../../data/blog/index.json';
import 'highlight.js/styles/github.css';
import './BlogPost.css';

interface BlogPostData {
  id: string;
  title: string;
  date: string;
  category: string;
  content: string;
  permalink: string;
}

const BlogPost = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPostData | null>(null);

  useEffect(() => {
    const loadPost = async () => {
      try {
        const currentPath = location.pathname;
        const indexEntry = blogIndex.find(post => post.permalink === currentPath);
        
        if (!indexEntry) {
          console.error('Post not found');
          return;
        }

        const postData = await import(`../../data/blog/${indexEntry.id}.json`);
        setPost(postData);
      } catch (error) {
        console.error('Error loading blog post:', error);
      }
    };

    loadPost();
  }, [location.pathname]);

  const handleCategoryClick = (category: string) => {
    navigate(`/blog?category=${category}&page=1`);
  };

  if (!post) {
    return (
      <Container maxWidth="md">
        <Typography variant="h4" color="error" align="center" mt={4}>
          Loading...
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {post.title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Date: {post.date}
        </Typography>
        <Box 
          mb={2}
          sx={{ 
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}
        >
          <CategoryIcon fontSize="small" color="action" />
          <Typography variant="subtitle2" component="span">
            Category:
          </Typography>
          {post.category && (
            <Link
              component="button"
              variant="subtitle2"
              onClick={() => handleCategoryClick(post.category)}
              sx={{
                textDecoration: 'none',
                cursor: 'pointer',
                border: 'none',
                background: 'none',
                '&:hover': {
                  color: 'primary.main'
                }
              }}
            >
              {post.category}
            </Link>
          )}
        </Box>
        <Box className="blog-content" dangerouslySetInnerHTML={{ __html: post.content }} />
      </Paper>
    </Container>
  );
};

export default BlogPost;
