import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/material';
import { createContent } from '../store/contentSlice';
import FormInputs from './CreateFormInputs';
import MediaPreview from './MediaPreview';

const CreateContentForm = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const [label, setLabel] = useState('');
  const [description, setDescription] = useState('');
  const [ratingId, setRatingId] = useState('');
  const [mediaFile, setMediaFile] = useState(null);
  const [previewFile, setPreviewFile] = useState(null);
  const [error, setError] = useState(null);

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

    dispatch(createContent({ formData, token }))
      .unwrap()
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
  }, [token, label, description, ratingId, mediaFile, previewFile, dispatch]);

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

export default CreateContentForm;
