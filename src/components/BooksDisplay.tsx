import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, Button, Container } from '@mui/material';
import books from './books';

const BooksDisplay: React.FC = () => {
  return (
    <Container maxWidth="xl">
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center', marginTop: '30px' }}>
        {books.map((book) => (
          <Card key={book.title} sx={{ maxWidth: 365 }}>
            <CardMedia
              component="img"
              height="500"
              image={book.path}
              alt={book.title}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {book.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {book.description}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" href={book.link} target="_blank" rel="noopener noreferrer">Buy on Amazon</Button>
            </CardActions>
          </Card>
        ))}
      </div>
    </Container>
  );
};

export default BooksDisplay;
