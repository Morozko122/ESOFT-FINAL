import React from 'react';
import PlaylistManager from '../components/PlaylistManager';
import { Container, Box } from '@mui/material';

const PlaylistsPage = ({ url }) => {
    return (
        <Container maxWidth="lg">
            <Box sx={{ mt: 8 }}>
                <PlaylistManager url={url} />
            </Box>
        </Container>
    );
};

export default PlaylistsPage;