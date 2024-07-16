import React from 'react';
import { Container, Box, Typography} from '@mui/material';
import CreateContentForm from '../components/CreateContentForm';

const CreateContentPage = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4">Создание Мема</Typography>
        <CreateContentForm />
      </Box>
    </Container>
  );
};

export default CreateContentPage;
