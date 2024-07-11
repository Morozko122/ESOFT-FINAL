import React from 'react';
import { Dialog, DialogContent, DialogTitle, Button, Divider, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const AuthModal = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Требуется авторизация</DialogTitle>
      <DialogContent>
        <Button component={Link} to="/login" variant="contained" color="primary" fullWidth>
          Войти
        </Button>
        <Divider sx={{ my: 2 }}>
          <Typography variant="body2">или</Typography>
        </Divider>
        <Button component={Link} to="/register" variant="outlined" color="primary" fullWidth>
          Зарегистрироваться
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;