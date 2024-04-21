import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Box, List, ListItem, ListItemButton, ListItemText, Typography, Divider } from '@mui/material';
import { tipsData } from './tipsData';
import { Link } from 'react-router-dom';

function TipsComponent() {
  const { tipId } = useParams<{ tipId: string }>();
  const [selectedTip, setSelectedTip] = useState(tipsData[0]);

  useEffect(() => {
    const tip = tipsData.find(tip => tip.id.toString() === tipId);
    if (tip) {
      setSelectedTip(tip);
    }
  }, [tipId]);

  return (
    <Box sx={{ display: 'flex', p: 3 }}>
      <Box sx={{ width: '25%', mr: 2 }}>
        <Typography variant="h6">Tips List</Typography>
        <List>
          {tipsData.map((tip) => (
            <ListItem key={tip.id} disablePadding>
              <ListItemButton component={Link} to={`/tips/${tip.id}`}>
                <ListItemText primary={tip.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
      <Divider orientation="vertical" flexItem />
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
    </Box>
  );
}

export default TipsComponent;