import React from 'react';
import { IconButton, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface MobileTipNavigationProps {
    tipId: string | undefined;
    tips: { id: string; title: string; }[];
    onNavigate: (direction: 'prev' | 'next') => void;
    onNavigateToTip: (tipId: string) => void;
}

const MobileTipNavigation: React.FC<MobileTipNavigationProps> = ({ tipId, tips, onNavigate, onNavigateToTip }) => {
    const handleSelectChange = (event: SelectChangeEvent<string>) => {
        const selectedTipId = event.target.value;
        onNavigateToTip(selectedTipId);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <IconButton onClick={() => onNavigate('prev')} disabled={tips.findIndex(tip => tip.id === tipId) <= 0}>
                <ArrowBackIosNewIcon />
            </IconButton>
            <Select
                value={tipId || ""}
                onChange={handleSelectChange}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
                style={{ minWidth: 120 }}
                renderValue={() => "Jump to..."}
            >
                {tips.map((tip) => (
                    <MenuItem key={tip.id} value={tip.id}>
                        {tip.title}
                    </MenuItem>
                ))}
            </Select>
            <IconButton onClick={() => onNavigate('next')} disabled={tips.findIndex(tip => tip.id === tipId) >= tips.length - 1}>
                <ArrowForwardIosIcon />
            </IconButton>
        </div>
    );
};

export default MobileTipNavigation;
