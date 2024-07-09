// ContentDetails.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, CircularProgress, Card,  CardContent, CardMedia} from '@mui/material';
import { useSelector } from 'react-redux';
const ContentDetails = ({id, url}) => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const { token } = useSelector((state) => state.auth);
  
  useEffect(() => {
    const fetchContentDetails = async () => {
      try {
        const response = await axios.get(`${url}/content/get/${id}`, {    
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        setContent(response.data);
      } catch (error) {
        console.error('Error fetching content details:', error);
      }
      setLoading(false);
    };

    fetchContentDetails();
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!content) {
    return <Typography>Content not found</Typography>;
  }

  return (
    <Box sx={{ padding: 2 }}>
    <Card>
      <CardMedia
        component={content.typeLabel === 'Image' ? 'img' : 'video'}
        image={content.mediaUrl}
        title={content.label}
        sx={{ height: 400 }}
        controls={content.typeLabel === 'Video' ? true : undefined}
      />
      <CardContent>
        <Typography variant="h4" gutterBottom>
          {content.label}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {content.description}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Created by: {content.username}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Age Rating: {content.age}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Type: {content.typeLabel}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Favorites: {content.favorite_count}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Rating: {content.rating}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Uploaded on: {content.upload_date}
        </Typography>
      </CardContent>
    </Card>
  </Box>
  );
};

export default ContentDetails;
