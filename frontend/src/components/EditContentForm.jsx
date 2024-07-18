import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import FormInputs from './CreateFormInputs';
import MediaPreview from './MediaPreview';
import axios from 'axios';

const EditContentForm = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { token } = useSelector((state) => state.auth);

  const [label, setLabel] = useState('');
  const [description, setDescription] = useState('');
  const [ratingId, setRatingId] = useState('');
  const [mediaFile, setMediaFile] = useState(null);
  const [previewFile, setPreviewFile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContentDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/content/get/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const content = response.data.content;
        setLabel(content.label);
        setDescription(content.description);
        setRatingId(content.rating_id);
      } catch (error) {
        console.error('Error fetching content details:', error);
      }
    };

    fetchContentDetails();
  }, [id, token]);

  const handleLabelChange = useCallback((e) => setLabel(e.target.value), []);
  const handleDescriptionChange = useCallback((e) => setDescription(e.target.value), []);
  const handleRatingIdChange = useCallback((e) => setRatingId(e.target.value), []);
  const handleMediaFileChange = useCallback((e) => setMediaFile(e.target.files[0]), []);
  const handlePreviewFileChange = useCallback((e) => setPreviewFile(e.target.files[0]), []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (!token) {
      setError('Unauthorized');
      return;
    }

    const formData = new FormData();
    formData.append('label', label);
    formData.append('description', description);
    formData.append('rating_id', parseInt(ratingId));
    if (mediaFile) {
      formData.append('mediaFile', mediaFile);
    }
    if (previewFile) {
      formData.append('previewFile', previewFile);
    }

    axios.put(`http://localhost:3000/api/content/update/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(() => {
      setLabel('');
      setDescription('');
      setRatingId('');
      setMediaFile(null);
      setPreviewFile(null);
      setError(null);
    })
    .catch((err) => {
      setError(err.message);
    });
  }, [token, label, description, ratingId, mediaFile, previewFile, id]);

  return (
    <Box sx={{ display: 'flex', gap: 2, marginTop: '10px' }}>
      <FormInputs
        label={label}
        description={description}
        ratingId={ratingId}
        error={error}
        onLabelChange={handleLabelChange}
        onDescriptionChange={handleDescriptionChange}
        onRatingIdChange={handleRatingIdChange}
        onMediaFileChange={handleMediaFileChange}
        onPreviewFileChange={handlePreviewFileChange}
        onSubmit={handleSubmit}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <MediaPreview file={mediaFile} width={800} height={600} />
        <MediaPreview file={previewFile} width={200} height={200} />
      </Box>
    </Box>
  );
};

export default EditContentForm;