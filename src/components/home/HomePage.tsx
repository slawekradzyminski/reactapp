import React from 'react';
import { Typography, Paper, Box, Link } from '@mui/material';

const HomePage = () => {
    return (
        <Paper elevation={1} sx={{ padding: 4, marginTop: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h5" gutterBottom>
                Hello 😊,
            </Typography>
            <Box
                component="img"
                alt="Sławek"
                src="/images/slawek.jpeg"
                sx={{ width: '30%' }}
            />
            <Typography variant="body1" gutterBottom sx={{ marginTop: 4 }}>
                My name is Sławek, and I've created this website to compile and maintain an archive of "Friday Tips for Seniors" (ftfs) that I share on <Link href="https://www.linkedin.com/in/slawekradzyminski/" target="_blank" rel="noopener noreferrer">LinkedIn</Link>. Additionally, I aim to organize my book recommendations in a clear and structured manner. Please feel free to explore and enjoy the site!
            </Typography>
        </Paper>
    );
};

export default HomePage;