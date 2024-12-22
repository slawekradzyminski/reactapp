import { Box, Chip, Paper, Button, Collapse } from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import blogIndex from '../../data/blog/index.json';

const CategoryFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategory = searchParams.get('category');
  const [isExpanded, setIsExpanded] = useState(false);

  const categories = Array.from(new Set(blogIndex
    .map(post => post.category)
    .filter(category => category))) 
    .sort();

  const handleCategoryClick = (category: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    
    if (currentCategory === category) {
      newSearchParams.delete('category');
    } else {
      newSearchParams.set('category', category);
    }
    
    newSearchParams.set('page', '1');
    setSearchParams(newSearchParams);
    setIsExpanded(false);
  };

  return (
    <Box>
      <Button
        onClick={() => setIsExpanded(!isExpanded)}
        startIcon={isExpanded ? <ExpandLess /> : <ExpandMore />}
        sx={{ 
          mb: 2,
          textTransform: 'none',
          fontSize: '1.1rem'
        }}
      >
        {isExpanded ? 'Hide Categories' : 'Pick Category'}
        {currentCategory && !isExpanded && (
          <Chip
            label={currentCategory}
            color="primary"
            size="small"
            sx={{ ml: 1 }}
            onDelete={() => handleCategoryClick(currentCategory)}
          />
        )}
      </Button>

      <Collapse in={isExpanded}>
        <Paper 
          elevation={2}
          sx={{
            backgroundColor: 'background.paper',
            padding: 3,
            borderRadius: '8px',
            mb: 3,
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
          }}
        >
          <Box sx={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: 1.5,
            justifyContent: 'center',
            maxWidth: '100%',
            margin: '0 auto'
          }}>
            {categories.map((category) => (
              <Chip
                key={category}
                label={category}
                onClick={() => handleCategoryClick(category)}
                color={currentCategory === category ? 'primary' : 'default'}
                variant={currentCategory === category ? 'filled' : 'outlined'}
                sx={{ 
                  fontSize: '0.95rem',
                  padding: '20px 12px',
                  height: 'auto',
                  '&:hover': {
                    backgroundColor: currentCategory === category ? 'primary.main' : 'action.hover',
                    transform: 'translateY(-1px)',
                    transition: 'all 0.2s ease'
                  }
                }}
                clickable
              />
            ))}
          </Box>
        </Paper>
      </Collapse>
    </Box>
  );
};

export default CategoryFilter; 