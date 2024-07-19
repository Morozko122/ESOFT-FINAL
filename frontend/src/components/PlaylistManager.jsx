import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Card, CardContent, Typography, CardActions, Divider } from '@mui/material';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const PlaylistManager = ({ url }) => {
  const [playlists, setPlaylists] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [playlistContent, setPlaylistContent] = useState([]);
  const [sub, setSub] = useState(false);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    fetchPlaylists();
    fetchSubscriptions();
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

  const fetchSubscriptions = async () => {
    try {
      const response = await axios.get(`${url}/playlists/subscriptions`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSubscriptions(response.data);
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
    }
  };

  const handleCreatePlaylist = async () => {
    if (newPlaylistName.trim() === '') {
      console.error('Название плейлиста не может быть пустым');
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

  const handlePlaylistClick = async (playlist, sub) => {
    setSelectedPlaylist(playlist);
    try {
      const response = await axios.get(`${url}/playlists/content/${playlist.Playlist.playlist_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPlaylistContent(response.data)
      setSub(sub);
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

  const handleUnsubscribe = async (playlistId) => {
    try {
      await axios.delete(`${url}/playlists/unsubscribe/${playlistId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      setSubscriptions(subscriptions.filter(subscription => subscription.Playlist.playlist_id !== playlistId));
    } catch (error) {
      console.error('Error unsubscribing from playlist:', error);
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" marginBottom={'10px'}>Мои плейлисты</Typography>
      <Button variant="outlined" onClick={handleClickOpen} sx={{ marginBottom: 2 }}>
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
      {playlists.length > 0 ? playlists.map((playlist) => (
        <Card key={playlist.Playlist.playlist_id} sx={{ marginBottom: 2, borderRadius: 2, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h5" component="div" sx={{ marginBottom: 1, marginLeft: 1 }}>
              {playlist.Playlist.label}
            </Typography>
            <CardActions>
              <Button variant="outlined" size="small" onClick={() => handlePlaylistClick(playlist, false)} sx={{ marginRight: 1 }}>
                Посмотреть
              </Button>
              <Button variant="outlined" size="small" color="error" onClick={() => handleDeletePlaylist(playlist.Playlist.playlist_id)}>
                Удалить
              </Button>
            </CardActions>
          </CardContent>
        </Card>
      )) : <Typography variant="h5" component="div" sx={{ marginBottom: 1, marginLeft: 1 }}>
        Пусто
      </Typography>}
      <Divider sx={{ margin: '20px 0' }} />
      <Typography variant="h4" marginBottom={'10px'}>Подписки</Typography>
      {subscriptions.length > 0 ? subscriptions.map((subscription) => (
        <Card key={subscription.Playlist.playlist_id} sx={{ marginBottom: 2, borderRadius: 2, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h5" component="div" sx={{ marginBottom: 1, marginLeft: 1 }}>
              {subscription.Playlist.label}
            </Typography>
            <CardActions>
              <Button variant="outlined" size="small" onClick={() => handlePlaylistClick(subscription, true)}sx={{ marginRight: 1 }}>
                Посмотреть
              </Button>
              <Button variant="outlined" size="small" color="error" onClick={() => handleUnsubscribe(subscription.Playlist.playlist_id)}>
                Отписаться
              </Button>
            </CardActions>
          </CardContent>
        </Card>
      )) : <Typography variant="h5" component="div" sx={{ marginBottom: 1, marginLeft: 1 }}>
        Пусто
      </Typography>}
      <Dialog open={selectedPlaylist !== null} onClose={() => setSelectedPlaylist(null)}>
        <DialogTitle>{selectedPlaylist?.Playlist.label}</DialogTitle>
        <DialogContent>
          {playlistContent.length > 0 ? (
            <Box color={'#fafafa'}>
              {playlistContent.map((content) => (
                <Card key={content.content_id} sx={{ marginBottom: 1, borderRadius: 2, boxShadow: 1, backgroundColor: "#f5f7f7", minWidth: "400px" }}>
                  <CardContent>
                    <Typography>{content.label}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button component={Link} size="small" to={`/content/${content.content_id}`} sx={{ marginRight: 1, marginTop: 1 }}>Перейти</Button>
                    {!sub ? <Button size="small" color="error" onClick={() => handleRemoveContent(selectedPlaylist.Playlist.playlist_id, content.content_id)} sx={{ marginTop: 1 }}>Убрать из плейлиста</Button> : <Typography></Typography>}
                  </CardActions>
                </Card>
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