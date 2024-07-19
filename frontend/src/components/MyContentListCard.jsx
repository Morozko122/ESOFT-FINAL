import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import Box from '@mui/material/Box';

const MyContentCard = ({ content, handleDeleteContent }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/content/${content.content_id}`);

  };
  const handleEditClick = () => {
    navigate(`/content/${content.content_id}/edit`);
  };
  return (
    <Card sx={{ display: 'flex', marginBottom: 2, borderRadius: 2, boxShadow: 3 }}>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={content.previewPath}
        alt="Content Image"
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography
            component="div"
            variant="h5"
            sx={{ cursor: 'pointer', textDecoration: 'underline' }}
            onClick={handleCardClick}
          >
            {content.label}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            {content.description}
          </Typography>
          <Typography variant="body2" color="text.secondary" component="div">
            В избранном: {content.rating}
          </Typography>
        </CardContent>
        <CardActions sx={{ paddingLeft: 2 }}>
          <Button size="small" variant="outlined" onClick={handleEditClick}>Редактировать</Button>
          <Button size="small" variant="outlined" color="error" onClick={handleDeleteContent}>Удалить</Button>
        </CardActions>
      </Box>
    </Card>
  );
};

export default MyContentCard;