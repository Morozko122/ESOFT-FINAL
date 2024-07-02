import React from 'react';
import LoginForm from '../components/LoginForm';
import { Container, Box } from '@mui/material';

const LoginPage = () => {
  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <LoginForm />
      </Box>
    </Container>
  );
};

export default LoginPage;
