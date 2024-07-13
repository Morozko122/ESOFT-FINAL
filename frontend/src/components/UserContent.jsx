import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Box, Grid, Typography } from '@mui/material';
import MyContentCard from './MyContentListCard';
import ContentCard from './ContentCard';
const UserContent = ({ url }) => {
  const [content, setContent] = useState([]);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    fetchUserContent();
  }, []);

  const fetchUserContent = async () => {
    try {
      const response = await axios.get(`${url}/content/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setContent(response.data);
    } catch (error) {
      console.error('Error fetching user content:', error);
    }
  };

  const handleDeleteContent = async (contentId) => {
    try {
      await axios.delete(`${url}/content/delete/${contentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchUserContent();
    } catch (error) {
      console.error('Error deleting content:', error);
    }
  };

  return (
    <Box>
      <Typography variant="h4">Мой контент</Typography>
        {content.map((item) => (
          <Grid item key={item.content_id}>
            <MyContentCard content={item} />
          </Grid>
        ))}
    </Box>
  );
};

export default UserContent;