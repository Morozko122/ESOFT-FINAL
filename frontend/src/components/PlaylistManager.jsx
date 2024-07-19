import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, List, ListItem, ListItemText, Card, CardContent, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const PlaylistManager = ({ url }) => {
  const [playlists, setPlaylists] = useState([]);
  const [newPlaylistName, setNewPlaylistName] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [playlistContent, setPlaylistContent] = useState([]);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    fetchPlaylists();
  }, []);

  const fetchPlaylists = async () => {
    try {
      const response = await axios.get(`${url}/playlists/userPlaylists`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPlaylists(response.data);
    } catch (error) {
      console.error('Error fetching playlists:', error);
    }
  };

  const handleCreatePlaylist = async () => {
    if (newPlaylistName.trim() === '') {
      setError('Название плейлиста не может быть пустым');
      return;
    }
    try {
      const response = await axios.post(`${url}/playlists/create`, {
        label: newPlaylistName
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      setPlaylists([...playlists, response.data]);
      setNewPlaylistName('');
      setOpen(false);
    } catch (error) {
      console.error('Error creating playlist:', error);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePlaylistClick = async (playlist) => {
    setSelectedPlaylist(playlist);
    try {
      const response = await axios.get(`${url}/playlists/content/${playlist.Playlist.playlist_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPlaylistContent(response.data);
    } catch (error) {
      console.error('Error fetching playlist content:', error);
    }
  };

  const handleDeletePlaylist = async (playlistId) => {
    try {
      await axios.delete(`${url}/playlists/delete/${playlistId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      setPlaylists(playlists.filter(playlist => playlist.Playlist.playlist_id !== playlistId));
    } catch (error) {
      console.error('Error deleting playlist:', error);
    }
  };

  const handleRemoveContent = async (playlistId, contentId) => {
    try {
      await axios.delete(`${url}/playlists/removeContent/${playlistId}/${contentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      setPlaylistContent(playlistContent.filter(content => content.content_id !== contentId));
    } catch (error) {
      console.error('Error removing content from playlist:', error);
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Button variant="contained" onClick={handleClickOpen} sx={{ marginBottom: 2 }}>
        Создать плейлист
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Создать</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Название"
            type="text"
            fullWidth
            value={newPlaylistName}
            onChange={(e) => setNewPlaylistName(e.target.value)}
            sx={{ marginBottom: 2 }}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Отмена</Button>
          <Button onClick={handleCreatePlaylist}>Создать</Button>
        </DialogActions>
      </Dialog>
      <List>
        {playlists.map((playlist) => (
          <ListItem key={playlist.Playlist.playlist_id} sx={{ marginBottom: 2 }}>
            <Card sx={{ width: '100%' }}>
              <CardContent>
                <Typography variant="h5" component="div" sx={{ marginBottom: 1 }}>
                  {playlist.Playlist.label}
                </Typography>
                <Button variant="contained" onClick={() => handlePlaylistClick(playlist)} sx={{ marginRight: 1 }}>
                  Посмотреть
                </Button>
                <Button variant="contained" color="secondary" onClick={() => handleDeletePlaylist(playlist.Playlist.playlist_id)}>
                  Удалить
                </Button>
              </CardContent>
            </Card>
          </ListItem>
        ))}
      </List>
      <Dialog open={selectedPlaylist !== null} onClose={() => setSelectedPlaylist(null)}>
        <DialogTitle>{selectedPlaylist?.Playlist.label}</DialogTitle>
        <DialogContent>
          {playlistContent.length > 0 ? (
            <Box>
              {playlistContent.map((content) => (
                <Box key={content.content_id} sx={{ marginBottom: 1, backgroundColor: '#f2f2f2', padding: 1}}>
                  <Box>
                    <Typography>{content.label}</Typography>
                  </Box>
                  <Box>
                    <Button variant="contained" component={Link} to={`/content/${content.content_id}`} sx={{ marginRight: 1, marginTop: 1 }}>Перейти</Button>
                    <Button variant="contained" color="secondary" onClick={() => handleRemoveContent(selectedPlaylist.Playlist.playlist_id, content.content_id)} sx={{ marginTop: 1 }}>Убрать из плейлиста</Button>
                  </Box>
                </Box>
              ))}
            </Box>
          ) : (
            <DialogContentText>Плейлист пуст</DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectedPlaylist(null)}>Закрыть</Button>
        </DialogActions>
      </Dialog>

    </Box>
  );
};

export default PlaylistManager;
