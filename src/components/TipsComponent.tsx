import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Box, Divider, IconButton, useMediaQuery } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { tipsData } from './tipsData';
import { TipsList } from './TipsList';
import { TipBody } from './TipBody';

function TipsComponent() {
  const { tipId } = useParams<{ tipId: string }>();
  const [selectedTip, setSelectedTip] = useState(tipsData[0]);
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    const tip = tipsData.find(tip => tip.id.toString() === tipId);
    if (tip) {
      setSelectedTip(tip);
    } else {
      setSelectedTip(tipsData[0]);
    }
  }, [tipId]);

  const handleNavigation = (direction: 'prev' | 'next') => {
    const currentIndex = tipsData.findIndex(tip => tip.id.toString() === tipId);
    const newIndex = direction === 'prev' ? currentIndex - 1 : currentIndex + 1;
    if (tipsData[newIndex]) {
      navigate(`/tips/${tipsData[newIndex].id}`);
    }
  };

  return (
    <>
      {isMobile ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            {tipsData.findIndex(tip => tip.id.toString() === tipId) > 0 && (
              <IconButton onClick={() => handleNavigation('prev')}>
                <ArrowBackIosNewIcon />
              </IconButton>
            )}
            {tipsData.findIndex(tip => tip.id.toString() === tipId) < tipsData.length - 1 && (
              <IconButton onClick={() => handleNavigation('next')}>
                <ArrowForwardIosIcon />
              </IconButton>
            )}
          </Box>
          <TipBody selectedTip={selectedTip} />
        </Box>
      ) : (
        <Box sx={{ display: 'flex', p: 3 }}>
          <Box sx={{ width: '25%', mr: 2 }}>
            <TipsList tipsData={tipsData} tipId={tipId} />
          </Box>
          <Divider orientation="vertical" flexItem />
          <Box sx={{ width: '75%', ml: 2 }}>
            <TipBody selectedTip={selectedTip} />
          </Box>
        </Box>
      )}
    </>
  );
}

export default TipsComponent;