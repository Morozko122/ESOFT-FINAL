import React, { useState, useEffect } from 'react';
import { Box, Grid, CircularProgress } from '@mui/material';
import PlaylistCard from './PlaylistCard';
import axios from 'axios';

const PlaylistList = ({ url, userId }) => {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPlaylists();
  }, [userId]);

  const fetchPlaylists = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${url}/playlists/user/${userId}`);
      setPlaylists(response.data);
    } catch (error) {
      console.error('Error fetching playlists:', error);
    }
    setLoading(false);
  };

  return (
    <Box>
      <Grid container spacing={2}>
        {playlists.map(playlist => (
          <Grid item key={playlist.playlist_id}>
            <PlaylistCard playlist={playlist} />
          </Grid>
        ))}
      </Grid>
      {loading && <CircularProgress />}
    </Box>
  );
};

export default PlaylistList;