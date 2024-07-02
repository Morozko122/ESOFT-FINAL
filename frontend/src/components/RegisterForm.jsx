import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../store/authSlice';
import { TextField, Button, Box } from '@mui/material';

const RegisterForm = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register({ username, email, password }));
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField label="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
      <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <Button type="submit" variant="contained" color="primary">Register</Button>
    </Box>
  );
};

export default RegisterForm;
