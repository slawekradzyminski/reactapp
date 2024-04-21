import { Box, Typography } from '@mui/material';

interface TipBodyProps {
    selectedTip: { title: string; content: string; };
}

export const TipBody = ({ selectedTip }: TipBodyProps) => {
    return (
        <Box sx={{ width: '70%', ml: 2 }}>
            {selectedTip ? (
                <>
                    <Typography variant="h6">{selectedTip.title}</Typography>
                    <Typography variant="body1" sx={{ textAlign: 'justify' }} dangerouslySetInnerHTML={{ __html: selectedTip.content }} />
                </>
            ) : (
                <Typography variant="h6">Select a tip to view details</Typography>
            )}
        </Box>
    );
};