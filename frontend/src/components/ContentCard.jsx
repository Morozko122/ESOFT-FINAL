import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Typography, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import AuthModal from './AuthModal';

const ContentCard = ({ content }) => {
  const [hover, setHover] = useState(false);
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const { token } = useSelector((state) => state.auth);

  const handleCardClick = () => {
    if (!token) {
      setOpenModal(true);
    } else {
      navigate(`/content/${content.content_id}`);
    }
  };
  return (
    <>
      <Card
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={handleCardClick}
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
          <Typography variant="body2"></Typography>
        ) : (
          <Box sx={{backdropFilter:'blur(5px)', backgroundColor: 'darkgray'}}>
            <Typography variant="h6" align="center"> {content.label}</Typography>
            <Typography variant="body2">Описание: {content.description}</Typography>
            <Typography variant="body2">Тип: {content.type_id}</Typography>
            <Typography variant="body2">Рейтинг: {content.rating}</Typography>
          </Box>
        )}
      </Card>
      <AuthModal open={openModal} onClose={() => setOpenModal(false)} />
    </>
  );
};

export default ContentCard;
