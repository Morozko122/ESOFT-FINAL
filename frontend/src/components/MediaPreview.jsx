import React, { memo } from 'react';
import { Box, Card, CardMedia, CardContent, Typography } from '@mui/material';

const MediaPreview = ({ file, width, height }) => (
  <Card sx={{ width, height, border: '1px solid #c4c4c4' }}>
    <CardContent sx={{ padding: 0, height: '100%' }}>
      {file ? (
        <CardMedia
          component={file.type.startsWith('image/') ? 'img' : file.type.startsWith('video/') ? 'video' : 'div'}
          controls={file.type.startsWith('video/')}
          image={file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined}
          src={file.type.startsWith('video/') ? URL.createObjectURL(file) : undefined}
          sx={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <Typography>Файл не выбран</Typography>
        </Box>
      )}
    </CardContent>
  </Card>
);

export default memo(MediaPreview);