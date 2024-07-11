import React from 'react';
import ContentDetails from '../components/ContentDetails';
import { useParams } from 'react-router-dom';
import { Container, Box } from '@mui/material';

const DetailedViewPage = ({ url }) => {
    const { id } = useParams();
    console.log(id);
    return (
        <Container maxWidth="md">
            <Box sx={{ mt: 8 }}>
                <ContentDetails id={id} url={url} />
            </Box>
        </Container>
    );
};

export default DetailedViewPage;
