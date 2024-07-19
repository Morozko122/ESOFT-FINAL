import React, { memo } from 'react';
import { TextField, Button, Box, Typography, Input, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const FormInputs = ({ label, description, ratingId, error, onLabelChange, onDescriptionChange, onRatingIdChange, onMediaFileChange, onPreviewFileChange, onSubmit }) => (
  <Box component="form" onSubmit={onSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
    <TextField label="Название" value={label} onChange={onLabelChange} required />
    <TextField label="Описание" value={description} onChange={onDescriptionChange} />
    <FormControl required>
      <InputLabel>Возрастной рейтинг</InputLabel>
      <Select label="Возрастной рейтинг" value={ratingId} onChange={onRatingIdChange}>
        <MenuItem value={1}>0 лет</MenuItem>
        <MenuItem value={2}>6 лет</MenuItem>
        <MenuItem value={3}>12 лет</MenuItem>
        <MenuItem value={4}>16 лет</MenuItem>
        <MenuItem value={5}>18 лет</MenuItem>
      </Select>
    </FormControl>
    <Input type="file" onChange={onMediaFileChange} />
    <Input type="file" onChange={onPreviewFileChange} />
    {error && <Typography color="error">{error}</Typography>}
    <Button type="submit" variant="contained" color="primary">Создать</Button>
  </Box>
);

export default memo(FormInputs);