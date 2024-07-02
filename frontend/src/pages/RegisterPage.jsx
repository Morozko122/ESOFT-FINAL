import React from 'react';
import RegisterForm from '../components/RegisterForm';
import { Container, Box } from '@mui/material';

const RegisterPage = () => {
  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <RegisterForm />
      </Box>
    </Container>
  );
};

export default RegisterPage;
