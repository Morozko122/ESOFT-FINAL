import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, List, ListItem, ListItemText, Card, CardContent, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const PlaylistManager = ({ url }) => {
  const [playlists, setPlaylists] = useState([]);
  const [newPlaylistName, setNewPlaylistName] = useState('');
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
    <Box>
      <Button variant="outlined" onClick={handleClickOpen}>
        Create Playlist
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create a new Playlist</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Playlist Name"
            type="text"
            fullWidth
            value={newPlaylistName}
            onChange={(e) => setNewPlaylistName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleCreatePlaylist}>Create</Button>
        </DialogActions>
      </Dialog>
      <List>
        {playlists.map((playlist) => (
          <ListItem key={playlist.Playlist.playlist_id}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  {playlist.Playlist.label}
                </Typography>
                <Button variant="outlined" onClick={() => handlePlaylistClick(playlist)}>
                  View Content
                </Button>
                <Button variant="outlined" component={Link} to={`/playlists/${playlist.Playlist.playlist_id}`}>
                  View Details
                </Button>
                <Button variant="outlined" color="secondary" onClick={() => handleDeletePlaylist(playlist.Playlist.playlist_id)}>
                  Delete
                </Button>
              </CardContent>
            </Card>
          </ListItem>
        ))}
      </List>
      <Dialog open={selectedPlaylist !== null} onClose={() => setSelectedPlaylist(null)}>
        <DialogTitle>{selectedPlaylist?.Playlist.label}</DialogTitle>
        <DialogContent>
          <List>
            {playlistContent.map((content) => (
              <ListItem key={content.content_id}>
                <ListItemText primary={content.label} />
                <Button variant="outlined" component={Link} to={`/content/${content.content_id}`}>
                  View Content
                </Button>
                <Button variant="outlined" color="secondary" onClick={() => handleRemoveContent(selectedPlaylist.Playlist.playlist_id, content.content_id)}>
                  Remove
                </Button>
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectedPlaylist(null)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PlaylistManager;