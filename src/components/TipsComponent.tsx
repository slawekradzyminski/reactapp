import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Box, Divider } from '@mui/material';
import { tipsData } from './tipsData';
import { TipsList } from './TipsList';
import { TipBody } from './TipBody';

function TipsComponent() {
  const { tipId } = useParams<{ tipId: string }>();
  const [selectedTip, setSelectedTip] = useState(tipsData[0]);

  useEffect(() => {
    const tip = tipsData.find(tip => tip.id.toString() === tipId);
    if (tip) {
      setSelectedTip(tip);
    } else {
      setSelectedTip(tipsData[0]);
    }
  }, [tipId]);

  return (
    <Box sx={{ display: 'flex', p: 3 }}>
      <Box sx={{ width: '25%', mr: 2 }}>
        <TipsList tipsData={tipsData} tipId={tipId} />
      </Box>
      <Divider orientation="vertical" flexItem />
      <TipBody selectedTip={selectedTip} />
    </Box>
  );
}

export default TipsComponent;