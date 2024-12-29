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
                I'm a seasoned test engineer who's always embraced test automation and CI/CD to help teams deliver high-quality software at speed. As a Senior Staff Test Engineer at Ocado Technology, I stay on the cutting edge of modern development practices, sharing my knowledge and expertise both at work and as a trainer with various companies and universities.
                <br /><br />
                When I'm not immersed in code and pipelines, you'll find me enjoying time with my wonderful family, hitting the squash court, exploring new travel destinations, or challenging myself at scrabble. I keep fit with regular gym sessions and wind down by watching TV series with my wife, making sure I strike a balance between professional growth and personal fulfillment.
            </Typography>
        </Paper>
    );
};

export default HomePage;