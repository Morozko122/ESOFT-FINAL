// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Box, Typography, CircularProgress, Card, CardContent, CardMedia, Button, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem, ListItemText } from '@mui/material';
// import { useSelector } from 'react-redux';
// const ContentDetails = ({id, url}) => {
//   const [content, setContent] = useState(null);
//   const [mediaUrl, setMediaUrl] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [playlists, setPlaylists] = useState([]);
//   const { token } = useSelector((state) => state.auth);
//   const [open, setOpen] = useState(false);
//   useEffect(() => {
//     const fetchContentDetails = async () => {
//       try {
//         const response = await axios.get(`${url}/content/get/${id}`, {    
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           });
//         setContent(response.data.content);
//         setMediaUrl(response.data.mediaUrl);
//       } catch (error) {
//         console.error('Error fetching content details:', error);
//       }
//       setLoading(false);
//     };

//     fetchContentDetails();
//   }, [id]);
//   const fetchPlaylists = async () => {
//     try {
//       const response = await axios.get(`${url}/playlists/userPlaylists`, {    
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setPlaylists(response.data);
//     } catch (error) {
//       console.error('Error fetching playlists:', error);
//     }
//   };
//   const handleClickOpen = () => {
//     fetchPlaylists();
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleAddToPlaylist = async (playlistId) => {
//     try {
//       await axios.post(`${url}/playlists/addContent`, {    
//         playlistId, contentId: id }, {headers: {
//           Authorization: `Bearer ${token}`,
//         }
//       } );
//       setOpen(false);
//     } catch (error) {
//       console.error('Error adding content to playlist:', error);
//     }
//   };
//   if (loading) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (!content) {
//     return <Typography>Content not found</Typography>;
//   }

//   return (
//     <Box sx={{ padding: 2 }}>
//     <Card>
//       <CardMedia
//         component={content.typeLabel === 'Image' ? 'img' : 'video'}
//         image={mediaUrl}
//         title={content.label}
//         sx={{ height: 400 }}
//         controls={content.typeLabel === 'Video' ? true : undefined}
//       />
//       <CardContent>
//         <Typography variant="h4" gutterBottom>
//           {content.label}
//         </Typography>
//         <Typography variant="body1" gutterBottom>
//           {content.description}
//         </Typography>
//         <Typography variant="body2" color="textSecondary">
//           Создатель: {content.username}
//         </Typography>
//         <Typography variant="body2" color="textSecondary">
//           Возрастной рейтинг: {content.age}
//         </Typography>
//         <Typography variant="body2" color="textSecondary">
//           Тип: {content.typeLabel}
//         </Typography>
//         <Typography variant="body2" color="textSecondary">
//           В избранном: {content.favorite_count}
//         </Typography>
//         <Typography variant="body2" color="textSecondary">
//           Рейтинг: {content.rating}
//         </Typography>
//         <Typography variant="body2" color="textSecondary">
//           Создано: {content.upload_date}
//         </Typography>
//         <Button variant="outlined" onClick={handleClickOpen}>
//             Добавить в плейлист
//           </Button>
//           <Dialog open={open} onClose={handleClose}>
//             <DialogTitle>Выберите плейлист</DialogTitle>
//             <DialogContent>
//               <List>
//                 {playlists.map((playlist) => (
//                   <ListItem button key={playlist.Playlist.playlist_id} onClick={() => handleAddToPlaylist(playlist.Playlist.playlist_id)}>
//                     <ListItemText primary={playlist.Playlist.label} />
//                   </ListItem>
//                 ))}
//               </List>
//             </DialogContent>
//             <DialogActions>
//               <Button onClick={handleClose}>Cancel</Button>
//             </DialogActions>
//           </Dialog>
//       </CardContent>
//     </Card>
//   </Box>
//   );
// };

// export default ContentDetails;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, CircularProgress, Card, CardContent, CardMedia, Button, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem, ListItemText } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ContentDetails = ({ id, url }) => {
  const [content, setContent] = useState(null);
  const [mediaUrl, setMediaUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [playlists, setPlaylists] = useState([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openAddDialog, setOpenAddModalDialog] = useState(false);
  const { token, user } = useSelector((state) => state.auth);  

  const navigate = useNavigate();

  useEffect(() => {
    const fetchContentDetails = async () => {
      try {
        const response = await axios.get(`${url}/content/get/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setContent(response.data.content);
        setMediaUrl(response.data.mediaUrl);
      } catch (error) {
        console.error('Ошибка получения данных о контенте:', error);
      }
      setLoading(false);
    };

    fetchContentDetails();
  }, [id, url, token]);

  const fetchPlaylists = async () => {
    try {
      const response = await axios.get(`${url}/playlists/userPlaylists`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPlaylists(response.data);
    } catch (error) {
      console.error('Ошибка получения плейлиста:', error);
    }
  };

  const handleDeleteModalClose = () => {
    setOpenDeleteDialog(false);
  };

  const handleAddModalClickOpen = () => {
    fetchPlaylists();
    setOpenAddModalDialog(true);
  };

  const handleAddModalClose = () => {
    setOpenAddModalDialog(false);
  };

  const handleAddToPlaylist = async (playlistId) => {
    try {
      await axios.post(`${url}/playlists/addContent`, {
        playlistId, contentId: id
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      setOpenAddModalDialog(false);
    } catch (error) {
      console.error('Ошибка добавления контента в плейлист:', error);
    }
  };

  const handleEdit = () => {
    navigate(`/content/${id}/edit`);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${url}/content/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      navigate('/');
    } catch (error) {
      console.error('Ошибка удаления контента:', error);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!content) {
    return <Typography>Не найдено</Typography>;
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Card>
        <CardMedia
          component={content.typeLabel === 'Image' ? 'img' : 'video'}
          image={mediaUrl}
          title={content.label}
          sx={{ height: 400 }}
          controls={content.typeLabel === 'Video' ? true : undefined}
        />
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {content.label}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {content.description}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Создатель: {content.username}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Возрастной рейтинг: {content.age}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Тип: {content.typeLabel}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            В избранном: {content.favorite_count}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Рейтинг: {content.rating}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Создано: {content.upload_date}
          </Typography>
          <Button variant="outlined" onClick={handleAddModalClickOpen}>
            Добавить в плейлист
          </Button>
          <Dialog open={openAddDialog} onClose={handleAddModalClose}>
            <DialogTitle>Выберите плейлист</DialogTitle>
            <DialogContent>
              <List>
                {playlists.map((playlist) => (
                  <ListItem button key={playlist.Playlist.playlist_id} onClick={() => handleAddToPlaylist(playlist.Playlist.playlist_id)}>
                    <ListItemText primary={playlist.Playlist.label} />
                  </ListItem>
                ))}
              </List>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleAddModalClose}>Отмена</Button>
            </DialogActions>
          </Dialog>
          {user.user.userId === content.user_id && (
            <>
              <Button variant="outlined" color="primary" onClick={handleEdit}>
                Редактировать
              </Button>
              <Button variant="outlined" color="secondary" onClick={() => setOpenDeleteDialog(true)}>
                Удалить
              </Button>
              <Dialog open={openDeleteDialog} onClose={handleDeleteModalClose}>
                <DialogTitle>Подтвердите удаление</DialogTitle>
                <DialogContent>
                  <Typography>Вы уверены, что хотите удалить этот контент?</Typography>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleDeleteModalClose}>Отмена</Button>
                  <Button onClick={handleDelete} color="secondary">
                    Удалить
                  </Button>
                </DialogActions>
              </Dialog>
            </>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default ContentDetails;