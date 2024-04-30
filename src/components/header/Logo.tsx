import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AdbIcon from '@mui/icons-material/Adb';

const Logo = () => {
  const navigate = useNavigate();

  return (
    <>
      <IconButton
        onClick={() => navigate('/tips/1')} 
        style={{ color: 'inherit', textDecoration: 'none' }}
      >
        <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
      </IconButton>
      <Typography
        variant="h6"
        noWrap
        onClick={() => navigate('/tips/1')} 
        sx={{
          mr: 2,
          display: { xs: 'none', md: 'flex' },
          fontFamily: 'monospace',
          fontWeight: 700,
          letterSpacing: '.3rem',
          color: 'inherit',
          textDecoration: 'none',
          cursor: 'pointer', 
        }}
      >
        ftfs.it
      </Typography>
    </>
  );
}

export default Logo;