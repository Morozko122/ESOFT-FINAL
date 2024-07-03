import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Box, Typography } from '@mui/material';
import { createContent } from '../store/contentSlice';

const CreateContentForm = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const [label, setLabel] = useState('');
  const [typeId, setTypeId] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState('');
  const [ratingId, setRatingId] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!token) {
      setError('Unauthorized');
      return;
    }

    const contentData = {
      label,
      type_id: parseInt(typeId),
      description,
      rating: parseFloat(rating),
      rating_id: parseInt(ratingId)
    };

    dispatch(createContent({ contentData, token }))
      .unwrap()
      .then(() => {
        setLabel('');
        setTypeId('');
        setDescription('');
        setRating('');
        setRatingId('');
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField label="Label" value={label} onChange={(e) => setLabel(e.target.value)} required />
      <TextField label="Type ID" value={typeId} onChange={(e) => setTypeId(e.target.value)} required />
      <TextField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <TextField label="Rating" value={rating} onChange={(e) => setRating(e.target.value)} required />
      <TextField label="Age Rating ID" value={ratingId} onChange={(e) => setRatingId(e.target.value)} required />
      {error && <Typography color="error">{error}</Typography>}
      <Button type="submit" variant="contained" color="primary">Create Content</Button>
    </Box>
  );
};

export default CreateContentForm;
