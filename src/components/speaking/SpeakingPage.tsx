import { 
  Container, 
  Typography, 
  Card, 
  CardContent, 
  CardMedia,
  Box
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import talks from '../../data/talks.json';

interface Talk {
  id: string;
  title: string;
  url: string;
  language: string;
}

const SpeakingPage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h2" component="h1" gutterBottom align="center">
        Public Speaking
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom align="center" color="text.secondary" sx={{ mb: 6 }}>
        Conference Talks & Presentations
      </Typography>

      <Grid container spacing={4}>
        {talks.map((talk: Talk) => (
          <Grid size={{ xs: 12, md: 6 }} key={talk.id}>
            <Card sx={{ height: '100%' }}>
              <CardMedia
                component="iframe"
                height="315"
                src={`https://www.youtube.com/embed/${talk.id}`}
                title={talk.title}
                sx={{ border: 0 }}
              />
              <CardContent>
                <Typography variant="h6" component="h3" gutterBottom>
                  {talk.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Language: {talk.language}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default SpeakingPage; 