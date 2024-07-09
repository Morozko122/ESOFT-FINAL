import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Typography, Box } from '@mui/material';

const ContentCard = ({ content }) => {
  const [hover, setHover] = useState(false);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/content/${content.content_id}`);
  };

  return (

    <Card
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={handleClick}
      sx={{
        width: 200,
        height: 200,
        backgroundColor: '#f0f0f0',
        margin: 1,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: `url(${content.previewUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        cursor: 'pointer'
      }}
    >
      {!hover ? (
        <Typography variant="h6" align="center">{content.label}</Typography>
      ) : (
        <Box>
          <Typography variant="body2">Описание: {content.description}</Typography>
          <Typography variant="body2">Тип: {content.type_id}</Typography>
          <Typography variant="body2">Рейтинг: {content.rating}</Typography>
        </Box>
      )}
    </Card>
  );
};

export default ContentCard;
