import { List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import tipsData from '../../../data/tipsData.json';

interface TipsListProps {
    title: string
    id: string;
}

export const TipsList = ({ title, id }: TipsListProps) => {
    return (
        <>
            <Typography variant="h5">{title}</Typography>
            <List>
                {tipsData.map((tip) => (
                    <ListItem key={tip.id} disablePadding>
                        <ListItemButton component={Link} to={`/tips/${tip.id}`}>
                            <ListItemText
                                primary={tip.title}
                                primaryTypographyProps={{
                                    style: { fontWeight: tip.id === id ? 'bold' : 'normal' }
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </>
    );
};