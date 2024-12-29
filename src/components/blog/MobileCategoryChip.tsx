import { Box, Chip } from "@mui/material";

interface MobileCategoryChipProps {
  category: string | null;
  onClear: () => void;
}

export const MobileCategoryChip = ({ category, onClear }: MobileCategoryChipProps) => {
  if (!category) return null;

  return (
    <Box 
      data-testid="mobile-category-chip"
      sx={{ 
        display: { xs: 'flex', md: 'none' }, 
        mt: 2, 
        mb: 2,
        justifyContent: 'center'
      }}
    >
      <Chip
        label={`Category: ${category}`}
        onDelete={onClear}
        color="primary"
      />
    </Box>
  );
}; 