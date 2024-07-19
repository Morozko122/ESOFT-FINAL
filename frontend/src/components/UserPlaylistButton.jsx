// import React, { useState, useEffect } from 'react';
// import { Button, Modal, Box, Typography, List, ListItem, ListItemText } from '@mui/material';
// import { styled } from '@mui/system';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const StyledButton = styled(Button)({
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'space-between',
//   padding: '8px 16px',
//   borderRadius: '20px',
//   backgroundColor: '#007bff',
//   '&:hover': {
//     backgroundColor: '#0056b3',
//   },
// });

// const StyledModal = styled(Modal)({
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
// });

// const Paper = styled(Box)(({ theme }) => ({
//   backgroundColor: theme.palette.background.paper,
//   boxShadow: theme.shadows[5],
//   padding: theme.spacing(2, 4, 3),
//   width: '80%',
//   maxWidth: '500px',
//   maxHeight: '80%',
//   overflowY: 'auto',
// }));

// const UserPlaylistButton = ({ userId, url, token }) => {
//   const [open, setOpen] = useState(false);
//   const [content, setContent] = useState([]);
//   const navigate = useNavigate();

//   const handleAddClick = async (playlist_id) => {
//         try {
//           const response = await axios.post(`${url}/playlists/subscribe`, {
//             playlistId: playlist_id
//           }, {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             }
//           });
//         } catch (error) {
//           console.error('Error creating playlist:', error);
//         }
//   }
//   useEffect(() => {
//     const fetchUserPlaylists = async () => {
//       try {
//         const response = await axios.get(`${url}/playlists/userplaylists/${userId}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setContent(response.data);
//       } catch (error) {
//         console.error('Error fetching user playlists:', error);
//       }
//     };

//     if (open) {
//         fetchUserPlaylists();
//     }
//   }, [open, url]);

//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   return (
//     <>
//       <StyledButton variant="contained" onClick={handleOpen}>
//         <span>Плейлисты пользователя</span>
//         <span>🎥</span>
//       </StyledButton>
//       <StyledModal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="user-content-modal-title"
//         aria-describedby="user-content-modal-description"
//       >
//         <Paper>
//           <Typography variant="h6" id="user-content-modal-title">
//             Пользовательские плейлисты
//           </Typography>
//           <List id="user-content-modal-description">
//             {content.map((item) => (
//               <ListItem key={item.id}>
//                 <ListItemText primary={item.label}/>
//                 <Button onClick={()=>handleAddClick(item.playlist_id)}>Добавить</Button>
//               </ListItem>
//             ))}
//           </List>
//         </Paper>
//       </StyledModal>
//     </>
//   );
// };

// export default UserPlaylistButton;
import React, { useState, useEffect } from 'react';
import { Button, Modal, Box, Typography, List, ListItem, ListItemText } from '@mui/material';
import { styled } from '@mui/system';
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

const UserPlaylistButton = ({ userId, url, token }) => {
  const [open, setOpen] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    const fetchUserPlaylists = async () => {
      try {
        const response = await axios.get(`${url}/playlists/userplaylists/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPlaylists(response.data);
      } catch (error) {
        console.error('Error fetching user playlists:', error);
      }
    };

    const fetchUserSubscriptions = async () => {
      try {
        const response = await axios.get(`${url}/playlists/subscriptions`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSubscriptions(response.data.map(sub => sub.PlaylistPlaylistId));
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching user subscriptions:', error);
      }
    };

    if (open) {
      fetchUserPlaylists();
      fetchUserSubscriptions();
    }
  }, [open, url, token, userId]);

  const handleSubscribe = async (playlistId) => {
    try {
      await axios.post(`${url}/playlists/subscribe`, { playlistId }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSubscriptions([...subscriptions, playlistId]);
    } catch (error) {
      console.error('Error subscribing to playlist:', error);
    }
  };

  const handleUnsubscribe = async (playlistId) => {
    try {
      await axios.delete(`${url}/playlists/unsubscribe/${playlistId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSubscriptions(subscriptions.filter(id => id !== playlistId));
    } catch (error) {
      console.error('Error unsubscribing from playlist:', error);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <StyledButton variant="contained" color='secondary' onClick={handleOpen}>
        <span>Плейлисты пользователя</span>
        <span>🎞️</span>
      </StyledButton>
      <StyledModal
        open={open}
        onClose={handleClose}
        aria-labelledby="user-content-modal-title"
        aria-describedby="user-content-modal-description"
      >
        <Paper>
          <Typography variant="h6" id="user-content-modal-title">
            Пользовательские плейлисты
          </Typography>
          <List id="user-content-modal-description">
            {playlists.map((item) => (
              <ListItem key={item.Playlist.playlist_id}>
                <ListItemText primary={item.Playlist.label} />
                {subscriptions.includes(item.Playlist.playlist_id) ? (
                  <Button onClick={() => handleUnsubscribe(item.Playlist.playlist_id)}>Отписаться</Button>
                ) : (
                  <Button onClick={() => handleSubscribe(item.Playlist.playlist_id)}>Подписаться</Button>
                )}
              </ListItem>
            ))}
          </List>
        </Paper>
      </StyledModal>
    </>
  );
};

export default UserPlaylistButton;