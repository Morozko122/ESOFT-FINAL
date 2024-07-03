import React, { useState } from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

const ContentCard = ({ content }) => {
  const [hover, setHover] = useState(false);

  return (
    <Card 
      onMouseEnter={() => setHover(true)} 
      onMouseLeave={() => setHover(false)} 
      sx={{ 
        width: 200, 
        height: 200, 
        backgroundColor: '#f0f0f0', 
        margin: 1, 
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {!hover ? (
        <Typography variant="h6" align="center">{content.label}</Typography>
      ) : (
        <Box sx={{ padding: 2 }}>
          <Typography variant="body2">Описание: {content.description}</Typography>
          {/* <Typography variant="body2">Теги: {content.tags.join(', ')}</Typography> */}
          <Typography variant="body2">Тип: {content.type_id}</Typography>
          <Typography variant="body2">Рейтинг: {content.rating}</Typography>
        </Box>
      )}
    </Card>
  );
};

export default ContentCard;
