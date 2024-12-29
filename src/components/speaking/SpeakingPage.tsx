import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Stack,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import talks from "../../data/talks.json";

interface Talk {
  id: string;
  title: string;
  url: string;
  language: string;
}

const getLanguageWithFlag = (
  language: string
): { flag: string; label: string } => {
  switch (language.toLowerCase()) {
    case "polish":
      return { flag: "🇵🇱", label: "Polish" };
    case "english":
      return { flag: "🇬🇧", label: "English" };
    default:
      return { flag: "", label: language };
  }
};

const SpeakingPage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h2" component="h1" gutterBottom align="center">
        Public Speaking
      </Typography>
      <Typography
        variant="h5"
        component="h2"
        gutterBottom
        align="center"
        color="text.secondary"
        sx={{ mb: 6 }}
      >
        Conference Talks & Presentations
      </Typography>

      <Grid container spacing={4}>
        {talks.map((talk: Talk) => {
          const { flag, label } = getLanguageWithFlag(talk.language);
          return (
            <Grid size={{ xs: 12, md: 6 }} key={talk.id}>
              <Card sx={{ height: "100%" }}>
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
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography variant="body2" color="text.secondary">
                      Language:
                    </Typography>
                    <Typography
                      variant="body2"
                      component="span"
                      sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                    >
                      {flag} {label}
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default SpeakingPage;
