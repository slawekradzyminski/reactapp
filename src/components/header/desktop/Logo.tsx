import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import PestControlIcon from '@mui/icons-material/PestControl';
const Logo = () => {
  const navigate = useNavigate();

  return (
    <>
      <IconButton
        onClick={() => navigate('/')} 
        style={{ color: 'inherit', textDecoration: 'none' }}
      >
        <PestControlIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
      </IconButton>
    </>
  );
}

export default Logo;