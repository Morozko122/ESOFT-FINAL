import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Box, Typography, Button } from '@mui/material';
import axios from 'axios';
import { useSelector } from 'react-redux';
import UserContentButton from './UserContentButton';
import UserPlaylistButton from './UserPlaylistButton';

const UserProfile = ({ url }) => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [currrentuser, setUser] = useState(null);
  const [isFriend, setIsFriend] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { token } = useSelector((state) => state.auth);
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`${url}/users/${userId}`);
        setUser(response.data);
        const friendResponse = await axios.get(`${url}/friends/check/${userId}?currentUserId=${user.user.userId}`);
        setIsFriend(friendResponse.data.isFriend);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };
    fetchUserProfile();
  }, [userId, url]);

  const handleFriendAction = async () => {
    try {
      if (isFriend) {
        await axios.delete(`${url}/friends/remove`, {data:{ userId: user.user.userId, friendId: userId }});
        setIsFriend(false);
      } else {
        await axios.post(`${url}/friends/add`, { userId: user.user.userId, friendId: userId });
        setIsFriend(true);
      }
    } catch (error) {
      console.error('Error handling friend action:', error);
    }
  };

  if (!currrentuser) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4">{currrentuser.username}</Typography>
        <UserContentButton userId={currrentuser.userId} url={url} token={token}/>
        <UserPlaylistButton userId={userId} url={url} token={token} />
        <Button onClick={handleFriendAction}>{isFriend ? 'Удалить из друзей' : 'Добавить в друзья'}</Button>
      </Box>
    </Container>
  );
};

export default UserProfile;