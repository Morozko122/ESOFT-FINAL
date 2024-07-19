import React from 'react';
import MyProfile from '../components/CurrentUserProfile';
import { Container, Box } from '@mui/material';

const CurrentProfilePage = ({url}) => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 8 }}>
        <MyProfile url={url}/>
      </Box>
    </Container>
  );
};

export default CurrentProfilePage;
