// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { TextField, Button, Box, Typography, Input } from '@mui/material';
// import { createContent } from '../store/contentSlice';

// const CreateContentForm = () => {
//   const dispatch = useDispatch();
//   const { token } = useSelector((state) => state.auth);

//   const [label, setLabel] = useState('');
//   const [description, setDescription] = useState('');
//   const [ratingId, setRatingId] = useState('');
//   const [mediaFile, setMediaFile] = useState(null);
//   const [previewFile, setPreviewFile] = useState(null); // State for preview file
//   const [error, setError] = useState(null);

//   const handleMediaFileChange = (e) => {
//     setMediaFile(e.target.files[0]);
//   };

//   const handlePreviewFileChange = (e) => {
//     setPreviewFile(e.target.files[0]);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!token) {
//       setError('Unauthorized');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('label', label);
//     formData.append('description', description);
//     formData.append('rating_id', parseInt(ratingId));
//     if (mediaFile) {
//       formData.append('mediaFile', mediaFile);
//     }
//     if (previewFile) {
//       formData.append('previewFile', previewFile);
//     }

//     dispatch(createContent({ formData, token }))
//       .unwrap()
//       .then(() => {
//         setLabel('');
//         setDescription('');
//         setRatingId('');
//         setMediaFile(null);
//         setPreviewFile(null);
//         setError(null);
//       })
//       .catch((err) => {
//         setError(err.message);
//       });
//   };

//   return (
//     <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
//       <TextField label="Название" value={label} onChange={(e) => setLabel(e.target.value)} required />
//       <TextField label="Описание" value={description} onChange={(e) => setDescription(e.target.value)} />
//       <TextField label="Возрастной рейтинг ID" value={ratingId} onChange={(e) => setRatingId(e.target.value)} required />
//       <Input type="file" onChange={handleMediaFileChange} />
//       <Input type="file" onChange={handlePreviewFileChange} /> 
//       {error && <Typography color="error">{error}</Typography>}
//       <Button type="submit" variant="contained" color="primary">Создать</Button>
//     </Box>
//   );
// };

// export default CreateContentForm;
// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { TextField, Button, Box, Typography, Input, Card, CardMedia, CardContent } from '@mui/material';
// import { createContent } from '../store/contentSlice';

// const CreateContentForm = () => {
//   const dispatch = useDispatch();
//   const { token } = useSelector((state) => state.auth);

//   const [label, setLabel] = useState('');
//   const [description, setDescription] = useState('');
//   const [ratingId, setRatingId] = useState('');
//   const [mediaFile, setMediaFile] = useState(null);
//   const [previewFile, setPreviewFile] = useState(null);
//   const [error, setError] = useState(null);

//   const handleMediaFileChange = (e) => {
//     setMediaFile(e.target.files[0]);
//   };

//   const handlePreviewFileChange = (e) => {
//     setPreviewFile(e.target.files[0]);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!token) {
//       setError('Unauthorized');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('label', label);
//     formData.append('description', description);
//     formData.append('rating_id', parseInt(ratingId));
//     if (mediaFile) {
//       formData.append('mediaFile', mediaFile);
//     }
//     if (previewFile) {
//       formData.append('previewFile', previewFile);
//     }

//     dispatch(createContent({ formData, token }))
//       .unwrap()
//       .then(() => {
//         setLabel('');
//         setDescription('');
//         setRatingId('');
//         setMediaFile(null);
//         setPreviewFile(null);
//         setError(null);
//       })
//       .catch((err) => {
//         setError(err.message);
//       });
//   };

//   return (
//     <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 2 }}>
//       <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
//         <TextField sx={{ marginTop: '10px' }} label="Название" value={label} onChange={(e) => setLabel(e.target.value)} required />
//         <TextField label="Описание" value={description} onChange={(e) => setDescription(e.target.value)} />
//         <TextField label="Возрастной рейтинг ID" value={ratingId} onChange={(e) => setRatingId(e.target.value)} required />
//         <Input type="file" onChange={handleMediaFileChange} />
//         <Input type="file" onChange={handlePreviewFileChange} />
//         {error && <Typography color="error">{error}</Typography>}
//         <Button type="submit" variant="contained" color="primary">Создать</Button>
//       </Box>
//       <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
//         <Card sx={{ width: 800, height: 600, border: '1px solid #c4c4c4' }}>
//           <CardContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
//             {mediaFile ? (
//               <CardMedia
//                 component={mediaFile.type.startsWith('image/') ? 'img' : mediaFile.type.startsWith('video/') ? 'video' : 'div'}
//                 controls={mediaFile.type.startsWith('video/')}
//                 image={mediaFile.type.startsWith('image/') ? URL.createObjectURL(mediaFile) : undefined}
//                 src={mediaFile.type.startsWith('video/') ? URL.createObjectURL(mediaFile) : undefined}
//                 sx={{ width: '100%', height: '100%', objectFit: 'contain' }}
//               />
//             ) : (
//               <Typography>Файл не выбран</Typography>
//             )}
//           </CardContent>
//         </Card>
//         <Card sx={{ maxWidth: 300, maxHeight: 300, border: '1px solid #c4c4c4' }}>
//           <CardContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
//             {previewFile ? (
//               <CardMedia
//                 component="img"
//                 image={URL.createObjectURL(previewFile)}
//                 sx={{ width: '100%', height: '100%', objectFit: 'contain' }}
//               />
//             ) : (
//               <Typography>Файл не выбран</Typography>
//             )}
//           </CardContent>
//         </Card>
//       </Box>
//     </Box>
//   );
// };

// export default CreateContentForm;
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
