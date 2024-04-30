import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const LinkedInFollow = () => {
  const linkedInUrl = "https://www.linkedin.com/in/slawekradzyminski/";

  return (
    <>
      <a href={linkedInUrl} target="_blank" rel="noopener noreferrer" style={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end', textDecoration: 'none', color: 'inherit' }}>
        <Typography variant="body1" sx={{ textAlign: 'right' }}>
          Follow me on
        </Typography>
      </a>
      <IconButton
        edge="end"
        color="inherit"
        href={linkedInUrl}
        target="_blank"
        rel="noopener noreferrer"
        sx={{ mr: 2 }} 
      >
        <LinkedInIcon />
      </IconButton>
    </>
  );
}

export default LinkedInFollow;