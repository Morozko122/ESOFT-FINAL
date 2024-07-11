import React from 'react';
import UserContent from '../components/UserContent';
import { Container, Box } from '@mui/material';

const UserContentPage = ({url}) => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 8 }}>
        <UserContent url={url}/>
      </Box>
    </Container>
  );
};

export default UserContentPage;
