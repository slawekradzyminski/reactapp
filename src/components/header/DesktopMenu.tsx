import { useNavigate, useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import { pages } from './pages';

const DesktopMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
      {pages.map((page) => (
        <Button
          key={page.name}
          onClick={() => navigate(page.path)}
          sx={{
            my: 2,
            color: 'white',
            display: 'block',
            fontWeight: location.pathname.includes(page.path) ? 'bold' : 'normal'
          }}
        >
          {page.name}
        </Button>
      ))}
    </Box>
  );
}

export default DesktopMenu;