import { MenuItem, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { mobilePages } from '../pages';

type MobileMenuItemsProps = {
  onItemClick: () => void;
};

const MobileMenuItems = ({ onItemClick }: MobileMenuItemsProps) => {
  const navigate = useNavigate();

  const handleMenuItemClick = (path: string) => {
    onItemClick();
    navigate(path);
  };

  return (
    <>
      {mobilePages.map((page) => (
        <MenuItem key={page.name} onClick={() => handleMenuItemClick(page.path)}>
          <Typography textAlign="center">{page.name}</Typography>
        </MenuItem>
      ))}
    </>
  );
};

export default MobileMenuItems;