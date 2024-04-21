import React from 'react';
import { IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface MobileTipNavigationProps {
  tipId: string | undefined;
  tipIds: { id: string; }[];
  onNavigate: (direction: 'prev' | 'next') => void;
}

const MobileTipNavigation: React.FC<MobileTipNavigationProps> = ({ tipId, tipIds, onNavigate }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
      <div>
        {tipIds.findIndex(tip => tip.id === tipId) > 0 && (
          <IconButton onClick={() => onNavigate('prev')}>
            <ArrowBackIosNewIcon />
          </IconButton>
        )}
      </div>
      <div>
        {tipIds.findIndex(tip => tip.id === tipId) < tipIds.length - 1 && (
          <IconButton onClick={() => onNavigate('next')}>
            <ArrowForwardIosIcon />
          </IconButton>
        )}
      </div>
    </div>
  );
};

export default MobileTipNavigation;