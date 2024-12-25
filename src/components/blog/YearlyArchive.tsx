import { Box, Paper, Typography, Chip, IconButton, Collapse } from "@mui/material";
import { CalendarMonth as CalendarIcon } from "@mui/icons-material";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import { useState } from "react";

interface YearCount {
  year: number;
  count: number;
}

interface YearlyArchiveProps {
  posts: Array<{ date: string }>;
  selectedYear?: number;
  onYearSelect: (year: number | undefined) => void;
}

export const YearlyArchive = ({ posts, selectedYear, onYearSelect }: YearlyArchiveProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const yearCounts = posts.reduce((acc: YearCount[], post) => {
    const year = new Date(post.date).getFullYear();
    const existingYear = acc.find(y => y.year === year);
    
    if (existingYear) {
      existingYear.count++;
    } else {
      acc.push({ year, count: 1 });
    }
    
    return acc;
  }, []).sort((a, b) => b.year - a.year);

  const handleHeaderClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      setIsExpanded(!isExpanded);
    }
  };

  const clearYear = (event: React.MouseEvent) => {
    event.stopPropagation();
    onYearSelect(undefined);
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
        <CalendarIcon sx={{ mr: 1 }} />
        <Typography variant="h6" component="h2" sx={{ flex: 1 }}>
          Yearly Archive {selectedYear && !isExpanded && (
            <Chip
              label={selectedYear}
              size="small"
              color="primary"
              onDelete={clearYear}
              sx={{ ml: 1 }}
            />
          )}
        </Typography>
        <IconButton 
          size="small" 
          sx={{ ml: 1 }}
          onClick={() => setIsExpanded(!isExpanded)}
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
          {yearCounts.map(({ year, count }) => (
            <Box
              key={year}
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
              onClick={() => onYearSelect(selectedYear === year ? undefined : year)}
            >
              <Typography 
                sx={{ 
                  flex: 1,
                  color: selectedYear === year ? 'primary.main' : 'text.primary',
                  fontWeight: selectedYear === year ? 'bold' : 'normal'
                }}
              >
                {year}
              </Typography>
              <Chip 
                label={count}
                size="small"
                variant={selectedYear === year ? "filled" : "outlined"}
                color={selectedYear === year ? "primary" : "default"}
              />
            </Box>
          ))}
        </Box>
      </Collapse>
    </Paper>
  );
}; 