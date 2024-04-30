import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Logo from './Logo';
import MobileMenu from './MobileMenu';
import DesktopMenu from './DesktopMenu';
import LinkedInFollow from './LinkedInFollow';

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <AppBar position="static">
      <Toolbar disableGutters sx={{ justifyContent: 'flex-start' }}>
        <Logo />
        {isMobile ? (
          <MobileMenu />
        ) : (
          <DesktopMenu />
        )}
        <LinkedInFollow />
      </Toolbar>
    </AppBar>
  );
}

export default Header;