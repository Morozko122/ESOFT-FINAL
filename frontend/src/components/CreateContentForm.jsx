// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { TextField, Button, Box, Typography, Input } from '@mui/material';
// import { createContent } from '../store/contentSlice';

// const CreateContentForm = () => {
//   const dispatch = useDispatch();
//   const { token } = useSelector((state) => state.auth);

//   const [label, setLabel] = useState('');
//   const [typeId, setTypeId] = useState('');
//   const [description, setDescription] = useState('');
//   const [rating, setRating] = useState('');
//   const [ratingId, setRatingId] = useState('');
//   const [mediaFile, setMediaFile] = useState(null);
//   const [error, setError] = useState(null);

//   const handleFileChange = (e) => {
//     setMediaFile(e.target.files[0]);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!token) {
//       setError('Unauthorized');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('label', label);
//     formData.append('type_id', parseInt(typeId));
//     formData.append('description', description);
//     formData.append('rating', parseFloat(rating));
//     formData.append('rating_id', parseInt(ratingId));
//     if (mediaFile) {
//       formData.append('mediaFile', mediaFile);
//     }

//     dispatch(createContent({ formData, token }))
//       .unwrap()
//       .then(() => {
//         setLabel('');
//         setTypeId('');
//         setDescription('');
//         setRating('');
//         setRatingId('');
//         setMediaFile(null);
//         setError(null);
//       })
//       .catch((err) => {
//         setError(err.message);
//       });
//   };

//   return (
//     <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
//       <TextField label="Название" value={label} onChange={(e) => setLabel(e.target.value)} required />
//       <TextField label="Тип ID" value={typeId} onChange={(e) => setTypeId(e.target.value)} required />
//       <TextField label="Описание" value={description} onChange={(e) => setDescription(e.target.value)} />
//       <TextField label="Рейтинг" value={rating} onChange={(e) => setRating(e.target.value)} required />
//       <TextField label="Возрастной рейтинг ID" value={ratingId} onChange={(e) => setRatingId(e.target.value)} required />
//       <Input type="file" onChange={handleFileChange} />
//       {error && <Typography color="error">{error}</Typography>}
//       <Button type="submit" variant="contained" color="primary">Создать</Button>
//     </Box>
//   );
// };

// export default CreateContentForm;
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Box, Typography, Input } from '@mui/material';
import { createContent } from '../store/contentSlice';

const CreateContentForm = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const [label, setLabel] = useState('');
  const [typeId, setTypeId] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState('');
  const [ratingId, setRatingId] = useState('');
  const [mediaFile, setMediaFile] = useState(null);
  const [previewFile, setPreviewFile] = useState(null); // State for preview file
  const [error, setError] = useState(null);

  const handleMediaFileChange = (e) => {
    setMediaFile(e.target.files[0]);
  };

  const handlePreviewFileChange = (e) => {
    setPreviewFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!token) {
      setError('Unauthorized');
      return;
    }

    const formData = new FormData();
    formData.append('label', label);
    formData.append('type_id', parseInt(typeId));
    formData.append('description', description);
    formData.append('rating', parseFloat(rating));
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
        setTypeId('');
        setDescription('');
        setRating('');
        setRatingId('');
        setMediaFile(null);
        setPreviewFile(null);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField label="Название" value={label} onChange={(e) => setLabel(e.target.value)} required />
      <TextField label="Тип ID" value={typeId} onChange={(e) => setTypeId(e.target.value)} required />
      <TextField label="Описание" value={description} onChange={(e) => setDescription(e.target.value)} />
      <TextField label="Рейтинг" value={rating} onChange={(e) => setRating(e.target.value)} required />
      <TextField label="Возрастной рейтинг ID" value={ratingId} onChange={(e) => setRatingId(e.target.value)} required />
      <Input type="file" onChange={handleMediaFileChange} />
      <Input type="file" onChange={handlePreviewFileChange} /> 
      {error && <Typography color="error">{error}</Typography>}
      <Button type="submit" variant="contained" color="primary">Создать</Button>
    </Box>
  );
};

export default CreateContentForm;
