import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { Container, Typography, Box, TextField, Button, Paper } from '@mui/material';

const ContactForm = () => {
  const [state, handleSubmit] = useForm("mayzlawg");

  if (state.succeeded) {
    return (
      <Typography variant="h6" color="success.main" textAlign="center" mt={4}>
        Thanks for your message! I'll get back to you soon.
      </Typography>
    );
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
      <TextField
        fullWidth
        id="email"
        label="Email Address"
        type="email" 
        name="email"
        margin="normal"
        required
      />
      <ValidationError 
        prefix="Email" 
        field="email"
        errors={state.errors}
      />
      <TextField
        fullWidth
        id="message"
        label="Message"
        name="message"
        multiline
        rows={4}
        margin="normal"
        required
      />
      <ValidationError 
        prefix="Message" 
        field="message"
        errors={state.errors}
      />
      <Button 
        type="submit" 
        variant="contained" 
        disabled={state.submitting}
        sx={{ mt: 2 }}
      >
        Submit
      </Button>
    </Box>
  );
}

const ContactPage = () => {
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Typography variant="h2" component="h1" gutterBottom align="center">
        Contact Me
      </Typography>
      
      <Paper elevation={1} sx={{ p: 4, mt: 4 }}>
        <Typography variant="body1" paragraph align="justify">
          If you're looking for expert help with test automation, continuous integration, or performance testing, you're in the right place. As an experienced software engineer in test, I'll tailor my approach to fit your exact needs. Whether you want one-on-one sessions, consulting for your company, or full training on API testing, UI testing, Performance testing, AI, or CI/CD, I'm here to help. Let's work together to help you thrive in the world of software testing—don't hesitate to get in touch!
        </Typography>
        
        <ContactForm />
      </Paper>
    </Container>
  );
}

export default ContactPage;