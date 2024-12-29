import React from 'react';
import { Typography, Paper, Box, Link } from '@mui/material';

const HomePage = () => {
    return (
        <Paper elevation={1} sx={{ padding: 4, marginTop: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h5" gutterBottom>
                Hello 😊
            </Typography>
            <Box
                component="img"
                alt="Sławek"
                src="/images/slawek.jpeg"
                sx={{
                    width: '30%',
                    height: '30%', 
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain' 
                }}
            />
            <Typography variant="body1" gutterBottom sx={{ marginTop: 3 }}>
                My name is Sławek, and I've created this website to compile and maintain an archive of "Friday Tips for Seniors" (ftfs) that I share on <Link href="https://www.linkedin.com/in/slawekradzyminski/" target="_blank" rel="noopener noreferrer">LinkedIn</Link>. Additionally, I aim to organize my book recommendations in a clear and structured manner. Please feel free to explore and enjoy the site!
                <br /><br />
                Tips can also be accessed directly in Markdown format from the publicly available <Link href="https://github.com/slawekradzyminski/reactapp" target="_blank" rel="noopener noreferrer">React codebase</Link>. You can view a sample tip on <Link href="https://github.com/slawekradzyminski/reactapp/blob/master/src/tips/Visibility.md" target="_blank" rel="noopener noreferrer">Visibility</Link>.
            </Typography>
        </Paper>
    );
};

export default HomePage;