import React from 'react';
import { IconButton, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import tipsData from '../../data/tipsData.json';

interface MobileTipNavigationProps {
    tipId: number;
    onNavigate: (direction: 'prev' | 'next') => void;
    onNavigateToTip: (tipId: string) => void;
}

const MobileTipNavigation: React.FC<MobileTipNavigationProps> = ({ tipId, onNavigate, onNavigateToTip }) => {
    const handleSelectChange = (event: SelectChangeEvent<string>) => {
        const selectedTipId = event.target.value;
        onNavigateToTip(selectedTipId);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <IconButton onClick={() => onNavigate('prev')} disabled={tipsData.findIndex(tip => tip.id === tipId) <= 0}>
                <ArrowBackIosNewIcon />
            </IconButton>
            <Select
                value={tipId.toString() || ""}
                onChange={handleSelectChange}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
                style={{ minWidth: 120 }}
                renderValue={() => "Jump to..."}
            >
                {tipsData.map((tip) => (
                    <MenuItem key={tip.id} value={tip.id}>
                        {tip.title}
                    </MenuItem>
                ))}
            </Select>
            <IconButton onClick={() => onNavigate('next')} disabled={tipsData.findIndex(tip => tip.id === tipId) >= tipsData.length - 1}>
                <ArrowForwardIosIcon />
            </IconButton>
        </div>
    );
};

export default MobileTipNavigation;
