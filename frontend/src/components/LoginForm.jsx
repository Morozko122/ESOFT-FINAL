import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../store/authSlice';
import { TextField, Button, Box, Typography } from '@mui/material';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, status, error } = useSelector((state) => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField label="Почта" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <TextField label="Пароль" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      {status === 'failed' && <Typography color="error">{error}</Typography>}
      <Button type="submit" variant="contained" color="primary">Войти</Button>
    </Box>
  );
};

export default LoginForm;
