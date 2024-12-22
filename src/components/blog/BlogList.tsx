import { Link, useSearchParams } from 'react-router-dom';
import { Container, Paper, Typography, Chip, Box, Pagination } from '@mui/material';
import { LocalOffer as TagIcon, Category as CategoryIcon } from '@mui/icons-material';
import blogIndex from '../../data/blog/index.json';
import './BlogList.css';

const POSTS_PER_PAGE = 5;

const BlogList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const totalPages = Math.ceil(blogIndex.length / POSTS_PER_PAGE);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setSearchParams({ page: page.toString() });
    window.scrollTo(0, 0);
  };

  const currentPosts = blogIndex.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  return (
    <Container maxWidth="md" className="blog-list">
      <Typography variant="h4" component="h1" className="blog-list-title">
        Blog Archive
      </Typography>
      
      {currentPosts.map((post) => (
        <Link to={post.permalink} key={post.id} style={{ textDecoration: 'none' }}>
          <Paper className="blog-entry" elevation={1}>
            <Typography variant="h5" component="h2" className="blog-entry-title">
              {post.title}
            </Typography>
            
            <Typography className="blog-entry-date">
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </Typography>

            <Box className="blog-entry-meta">
              {post.categories.length > 0 && (
                <Box className="blog-entry-section">
                  <CategoryIcon fontSize="small" color="action" />
                  <span className="blog-entry-section-label">Categories:</span>
                  <Box>
                    {post.categories.map((category) => (
                      <Chip
                        key={category}
                        label={category}
                        variant="outlined"
                        size="small"
                        sx={{ mr: 0.5 }}
                      />
                    ))}
                  </Box>
                </Box>
              )}

              {post.tags.length > 0 && (
                <Box className="blog-entry-section">
                  <TagIcon fontSize="small" color="action" />
                  <span className="blog-entry-section-label">Tags:</span>
                  <Box>
                    {post.tags.map((tag) => (
                      <Chip
                        key={tag}
                        label={tag}
                        size="small"
                        sx={{ mr: 0.5 }}
                      />
                    ))}
                  </Box>
                </Box>
              )}
            </Box>
          </Paper>
        </Link>
      ))}

      {totalPages > 1 && (
        <Box className="blog-pagination">
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            size="large"
            showFirstButton
            showLastButton
          />
        </Box>
      )}
    </Container>
  );
};

export default BlogList;