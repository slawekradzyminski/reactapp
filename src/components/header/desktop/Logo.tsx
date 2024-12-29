import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AdbIcon from '@mui/icons-material/Adb';

const Logo = () => {
  const navigate = useNavigate();

  return (
    <>
      <IconButton
        onClick={() => navigate('/')} 
        style={{ color: 'inherit', textDecoration: 'none' }}
      >
        <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
      </IconButton>
    </>
  );
}

export default Logo;