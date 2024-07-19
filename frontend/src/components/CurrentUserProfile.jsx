import React, { useState, useEffect } from 'react';
import { Container, Box, Typography } from '@mui/material';
import axios from 'axios';
import { useSelector } from 'react-redux';
import UserContentButton from './UserContentButton';

const MyProfile = ({ url }) => {
  const [currentUser, setUser] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`${url}/users/${user.user.userId}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };
    fetchUserProfile();
  }, [user.user.userId, url]);

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 8 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>{currentUser.username}</Typography>
        <UserContentButton userId={user.user.userId} url={url} token={token}/>
      </Box>
    </Container>
  );
};

export default MyProfile;