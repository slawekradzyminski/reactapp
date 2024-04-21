import { useState } from 'react';
import { Box, List, ListItem, ListItemButton, ListItemText, Typography, Divider } from '@mui/material';
import { tipsData } from './tipsData';


function TipsComponent() {
  const [selectedTip, setSelectedTip] = useState(tipsData[0]);

  return (
    <Box sx={{ display: 'flex', p: 3 }}>
      <Box sx={{ width: '30%', mr: 2 }}>
        <Typography variant="h6">Tips List</Typography>
        <List>
          {tipsData.map((tip) => (
            <ListItem key={tip.id} disablePadding>
              <ListItemButton onClick={() => setSelectedTip(tip)}>
                <ListItemText primary={tip.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
      <Divider orientation="vertical" flexItem />
      <Box sx={{ width: '70%', ml: 2 }}>
        <Typography variant="h6">{selectedTip.title}</Typography>
        <Typography variant="body1" sx={{ textAlign: 'justify' }} dangerouslySetInnerHTML={{ __html: selectedTip.content }} />
      </Box>
    </Box>
  );
}

export default TipsComponent;