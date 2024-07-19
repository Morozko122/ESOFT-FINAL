import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../store/authSlice';
import { TextField, Button, Box, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register({ username, email, password }));
    navigate('/login');
  };
  const handleNavigate = (e) => {
    navigate('/login')
  };
  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField label="Имя пользователя (username)" value={username} onChange={(e) => setUsername(e.target.value)} required />
      <TextField label="Почта" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <TextField label="Пароль" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <Button type="submit" variant="contained" color="primary">Зарегистрироваться</Button>
      <Divider/>
      <Button onClick={handleNavigate}>Войти</Button>
    </Box>
  );
};

export default RegisterForm;
