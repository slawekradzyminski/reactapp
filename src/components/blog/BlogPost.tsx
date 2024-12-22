import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Typography, Paper, Chip, Box, Container, useTheme } from '@mui/material';
import blogIndex from '../../data/blog/index.json';
import 'highlight.js/styles/github.css';

interface BlogPostData {
  id: string;
  title: string;
  date: string;
  categories: string[];
  tags: string[];
  content: string;
  permalink: string;
}

const BlogPost = () => {
  const location = useLocation();
  const theme = useTheme();
  const [post, setPost] = useState<BlogPostData | null>(null);

  useEffect(() => {
    const loadPost = async () => {
      try {
        // Find the post ID from the index based on the current URL
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
        <Typography variant="h3" component="h1" gutterBottom>
          {post.title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Date: {post.date}
        </Typography>
        <Box mb={2}>
          <Typography variant="subtitle2" component="span" mr={1}>
            Categories:
          </Typography>
          {post.categories.map((category) => (
            <Chip key={category} label={category} variant="outlined" size="small" sx={{ mr: 0.5 }} />
          ))}
        </Box>
        <Box mb={3}>
          <Typography variant="subtitle2" component="span" mr={1}>
            Tags:
          </Typography>
          {post.tags.map((tag) => (
            <Chip key={tag} label={tag} size="small" sx={{ mr: 0.5 }} />
          ))}
        </Box>
        <Box sx={{ 
          '& img': { 
            maxWidth: '100%', 
            height: 'auto',
            display: 'block',
            margin: `${theme.spacing(2)} auto`
          },
          '& pre': {
            backgroundColor: theme.palette.grey[100],
            padding: theme.spacing(2),
            borderRadius: theme.shape.borderRadius,
            overflow: 'auto',
            margin: theme.spacing(2, 0)
          },
          '& code': {
            fontFamily: 'monospace',
            fontSize: '0.9em'
          },
          '& a': {
            color: theme.palette.primary.main,
            textDecoration: 'none',
            '&:hover': {
              textDecoration: 'underline'
            }
          },
          '& blockquote.blog-quote': {
            borderLeft: `4px solid ${theme.palette.primary.main}`,
            margin: theme.spacing(2, 0),
            padding: theme.spacing(1, 2),
            backgroundColor: theme.palette.grey[50],
            '& p': {
              margin: 0,
              color: theme.palette.text.secondary
            }
          },
          '& .hljs': {
            background: 'transparent',
            padding: 0
          }
        }} dangerouslySetInnerHTML={{ __html: post.content }} />
      </Paper>
    </Container>
  );
};

export default BlogPost;
