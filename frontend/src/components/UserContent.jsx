import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Box, Grid, Typography } from '@mui/material';
import MyContentCard from './MyContentListCard';
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
      console.error('Ошибка получения контента:', error);
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
      console.error('Ошибка удаления контента:', error);
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" marginBottom={'10px'}>Мой контент</Typography>
        {content.map((item) => (
          <Grid item key={item.content_id}>
            <MyContentCard content={item} handleDeleteContent={handleDeleteContent}/>
          </Grid>
        ))}
    </Box>
  );
};

export default UserContent;