import { Box, Paper, Typography, Chip, IconButton, Collapse } from '@mui/material';
import { Category as CategoryIcon } from '@mui/icons-material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import blogIndex from '../../data/blog/index.json';

const CategoryFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isExpanded, setIsExpanded] = useState(false);
  const currentCategory = searchParams.get('category');

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
  };

  const handleHeaderClick = () => {
    setIsExpanded(!isExpanded);
  };

  const clearCategory = (event: React.MouseEvent) => {
    event.stopPropagation();
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete('category');
    newSearchParams.set('page', '1');
    setSearchParams(newSearchParams);
  };

  return (
    <Paper 
      elevation={0}
      sx={{ 
        p: 2,
        backgroundColor: 'background.default',
        display: { xs: 'none', md: 'block' }
      }}
    >
      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          mb: isExpanded ? 2 : 0,
          cursor: 'pointer'
        }}
        onClick={handleHeaderClick}
      >
        <CategoryIcon sx={{ mr: 1 }} />
        <Typography variant="h6" component="h2" sx={{ flex: 1 }}>
          Categories {currentCategory && !isExpanded && (
            <Chip
              label={currentCategory}
              size="small"
              color="primary"
              onDelete={clearCategory}
              sx={{ ml: 1 }}
            />
          )}
        </Typography>
        <IconButton 
          size="small" 
          sx={{ ml: 1 }}
          onClick={(e) => {
            e.stopPropagation();
            setIsExpanded(!isExpanded);
          }}
        >
          {isExpanded ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      </Box>
      
      <Collapse in={isExpanded}>
        <Box sx={{ 
          display: 'flex',
          flexDirection: 'column',
          gap: 1
        }}>
          {categories.map((category) => (
            <Box
              key={category}
              sx={{
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
                cursor: 'pointer',
                py: 0.5,
                px: 1,
                borderRadius: 1,
                '&:hover': {
                  backgroundColor: 'action.hover',
                }
              }}
              onClick={() => handleCategoryClick(category)}
            >
              <Typography 
                sx={{ 
                  flex: 1,
                  color: currentCategory === category ? 'primary.main' : 'text.primary',
                  fontWeight: currentCategory === category ? 'bold' : 'normal'
                }}
              >
                {category}
              </Typography>
              <Chip 
                label={blogIndex.filter(post => post.category === category).length}
                size="small"
                variant={currentCategory === category ? "filled" : "outlined"}
                color={currentCategory === category ? "primary" : "default"}
              />
            </Box>
          ))}
        </Box>
      </Collapse>
    </Paper>
  );
};

export default CategoryFilter; 