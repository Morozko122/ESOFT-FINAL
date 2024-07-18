import React from 'react';
import { Container, Box, Typography } from '@mui/material';
import EditContentForm from '../components/EditContentForm';

const EditContentPage = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4">Редактирование контента</Typography>
        <EditContentForm />
      </Box>
    </Container>
  );
};

export default EditContentPage;