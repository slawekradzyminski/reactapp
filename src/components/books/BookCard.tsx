import { Card, CardMedia, CardContent, CardActions, Typography, Button } from '@mui/material';
import { Book } from '../../types/book';

interface BookCardProps {
    book: Book;
}

const BookCard = ({ book }: BookCardProps) => {
    return (
        <Card sx={{ maxWidth: 365 }} data-testid="book-card">
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
    );
};

export default BookCard;