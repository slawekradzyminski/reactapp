import { List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

interface TipsListProps {
    tipsData: { id: number; title: string; }[];
    tipId: string | undefined;
}

export const TipsList = ({ tipsData, tipId }: TipsListProps) => {
    return (
        <>
            <Typography variant="h6">Tips List</Typography>
            <List>
                {tipsData.map((tip) => (
                    <ListItem key={tip.id} disablePadding>
                        <ListItemButton component={Link} to={`/tips/${tip.id}`}>
                            <ListItemText
                                primary={tip.title}
                                primaryTypographyProps={{
                                    style: { fontWeight: tip.id.toString() === tipId || (!tipId && tipsData[0].id === tip.id) ? 'bold' : 'normal' }
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </>
    );
};