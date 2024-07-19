import React from 'react';
import UserProfile from '../components/UserProfile';
import { Container, Box } from '@mui/material';

const UserProfilePage = ({url}) => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 8 }}>
        <UserProfile url={url}/>
      </Box>
    </Container>
  );
};

export default UserProfilePage;
