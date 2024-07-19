// import React from 'react';
// import { AppBar, Toolbar, IconButton, Typography, Button, Menu, MenuItem, Box, Avatar } from '@mui/material';
// import { Link } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { logout } from '../store/authSlice';
// import { useNavigate } from 'react-router-dom';

// const Header = () => {
//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { token } = useSelector((state) => state.auth);

//   const handleMenu = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate('/login');
//   };

//   return (
//     <AppBar position="static">
//       <Toolbar sx={{backgroundColor: '#0D3F7C'}}>
//         <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
//           <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
//             <Typography variant="h6" noWrap>
//               МемоХаб
//             </Typography>
//           </Link>
//         </Box>
//         <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//           {token ? (
//             <>
//               <Button component={Link} to="/content" color="inherit">Мемы</Button>
//               <Button component={Link} to="/playlists" color="inherit">Мои плейлисты</Button>
//               <Button component={Link} to="/content/user" color="inherit">Мой контент</Button>
//               <IconButton
//                 size="large"
//                 edge="end"
//                 aria-label="account of current user"
//                 aria-controls="menu-appbar"
//                 aria-haspopup="true"
//                 onClick={handleMenu}
//                 color="inherit"
//               >
//               <Avatar variant="soft" alt="Profile Picture"/>
//               </IconButton>
//               <Menu
//                 id="menu-appbar"
//                 anchorEl={anchorEl}
//                 anchorOrigin={{
//                   vertical: 'top',
//                   horizontal: 'right',
//                 }}
//                 keepMounted
//                 transformOrigin={{
//                   vertical: 'top',
//                   horizontal: 'right',
//                 }}
//                 open={Boolean(anchorEl)}
//                 onClose={handleClose}
//               >
//                 <MenuItem onClick={handleClose} component={Link} to="/profile">Профиль</MenuItem>
//                 <MenuItem onClick={handleLogout}>Выйти</MenuItem>
//               </Menu>
//             </>
//           ) : (
//             <>
//               <Button component={Link} to="/login" color="inherit">Войти</Button>
//               <Button component={Link} to="/register" color="inherit">Зарегистрироваться</Button>
//             </>
//           )}
//           <Button component={Link} to="/create" variant="contained" color="secondary">
//             СОЗДАТЬ МЕМ
//           </Button>
//         </Box>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Header;
import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, Menu, MenuItem, Box, Avatar, TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/authSlice';
import axios from 'axios';

const Header = ({ url }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [searchValue, setSearchValue] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`${url}/users/byusername/${searchValue}`);
      const userId = response.data.user.userId;
      navigate(`/profile/${userId}`);
    } catch (error) {
      console.error('Error searching user:', error);
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography variant="h6" noWrap>
              МемоХаб
            </Typography>
          </Link>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {token ? (
            <>
              <TextField
                size="small"
                placeholder="Поиск по юзернейму"
                value={searchValue}
                sx={{ backgroundColor: 'white', borderRadius: 1, borderColor: '#04BBEC' }}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <Button color="inherit" onClick={handleSearch}>Найти</Button>
              <Button component={Link} to="/content" color="inherit">Мемы</Button>
              <Button component={Link} to="/playlists" color="inherit">Мои плейлисты</Button>
              <Button component={Link} to="/content/user" color="inherit">Мой контент</Button>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Avatar variant="soft" alt="Profile Picture" />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose} component={Link} to="/profile">Профиль</MenuItem>
                <MenuItem onClick={handleLogout}>Выйти</MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button component={Link} to="/login" color="inherit">Войти</Button>
              <Button component={Link} to="/register" color="inherit">Зарегистрироваться</Button>
            </>
          )}
          <Button component={Link} to="/create" variant="contained" color='secondary'>
            СОЗДАТЬ МЕМ
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;