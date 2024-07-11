import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Box, Button, List, ListItem, ListItemText, Typography } from '@mui/material';

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
      <Typography variant="h4">Your Content</Typography>
      <List>
        {content.map((item) => (
          <ListItem key={item.content_id}>
            <ListItemText primary={item.label} secondary={item.description} />
            <Button variant="outlined" color="secondary" onClick={() => handleDeleteContent(item.content_id)}>
              Delete
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default UserContent;