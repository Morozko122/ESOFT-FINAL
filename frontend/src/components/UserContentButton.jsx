import React, { useState, useEffect } from 'react';
import { Button, Modal, Box, Typography, List, ListItem, ListItemText } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const StyledButton = styled(Button)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '8px 16px',
  borderRadius: '4px',
});

const StyledModal = styled(Modal)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const Paper = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[5],
  padding: theme.spacing(2, 4, 3),
  width: '80%',
  maxWidth: '500px',
  maxHeight: '80%',
  overflowY: 'auto',
}));

const UserContentButton = ({ userId, url, token }) => {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState([]);
  const navigate = useNavigate();

  const handleClick = (content_id) => {
    console.log(content);
      navigate(`/content/${content_id}`);
  }
  useEffect(() => {
    const fetchUserContent = async () => {
      try {
        const response = await axios.get(`${url}/content/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setContent(response.data);
      } catch (error) {
        console.error('Error fetching user content:', error);
      }
    };

    if (open) {
      fetchUserContent();
    }
  }, [open, url]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <StyledButton variant="contained" color='secondary' onClick={handleOpen} sx={{marginBottom:1}}>
        <span>Контент пользователя</span>
        <span>🎥</span>
      </StyledButton>
      <StyledModal
        open={open}
        onClose={handleClose}
        aria-labelledby="user-content-modal-title"
        aria-describedby="user-content-modal-description"
      >
        <Paper>
          <Typography variant="h6" id="user-content-modal-title">
            Пользовательский контент
          </Typography>
          <List id="user-content-modal-description">
            {content.map((item) => (
              <ListItem key={item.id}>
                <ListItemText primary={item.title} secondary={item.description} />
                <Button onClick={()=>handleClick(item.content_id)}>Перейти</Button>
              </ListItem>
            ))}
          </List>
        </Paper>
      </StyledModal>
    </>
  );
};

export default UserContentButton;