// import React from 'react';
// import { AppBar, Toolbar, IconButton, Typography, InputBase, Button, Menu, MenuItem, Box, Avatar } from '@mui/material';
// import { Search as SearchIcon} from '@mui/icons-material';
// import { Link } from 'react-router-dom';
// import { styled, alpha } from '@mui/material/styles';
// import {useDispatch } from 'react-redux';
// import { logout } from '../store/authSlice';
// import { useNavigate } from 'react-router-dom';
// const Search = styled('div')(({ theme }) => ({
//   position: 'relative',
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: alpha(theme.palette.common.white, 0.15),
//   '&:hover': {
//     backgroundColor: alpha(theme.palette.common.white, 0.25),
//   },
//   marginRight: theme.spacing(2),
//   marginLeft: 0,
//   width: '100%',
//   [theme.breakpoints.up('sm')]: {
//     marginLeft: theme.spacing(3),
//     width: 'auto',
//   },
// }));

// const SearchIconWrapper = styled('div')(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: '100%',
//   position: 'absolute',
//   pointerEvents: 'none',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: 'inherit',
//   '& .MuiInputBase-input': {
//     padding: theme.spacing(1, 1, 1, 0),
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create('width'),
//     width: '100%',
//     [theme.breakpoints.up('md')]: {
//       width: '20ch',
//     },
//   },
// }));

// const Header = () => {
//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
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
//       <Toolbar>
//         <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
//           <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
//             <Typography variant="h6" noWrap>
//               ПОКА НЕ ЗНАЮ
//             </Typography>
//           </Link>
//           <Search>
//             <SearchIconWrapper>
//               <SearchIcon />
//             </SearchIconWrapper>
//             <StyledInputBase
//               placeholder="Поиск…"
//               inputProps={{ 'aria-label': 'search' }}
//             />
//           </Search>
//         </Box>
//         <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//           <IconButton
//             size="large"
//             edge="end"
//             aria-label="account of current user"
//             aria-controls="menu-appbar"
//             aria-haspopup="true"
//             onClick={handleMenu}
//             color="inherit"
//           >
//             <Avatar alt="Profile Picture" />
//           </IconButton>
//           <Menu
//             id="menu-appbar"
//             anchorEl={anchorEl}
//             anchorOrigin={{
//               vertical: 'top',
//               horizontal: 'right',
//             }}
//             keepMounted
//             transformOrigin={{
//               vertical: 'top',
//               horizontal: 'right',
//             }}
//             open={Boolean(anchorEl)}
//             onClose={handleClose}
//           >
//             <MenuItem onClick={handleClose} component={Link} to="/profile">Профиль</MenuItem>
//             <MenuItem onClick={handleLogout}>Выйти</MenuItem>
//           </Menu>
//           <Button component={Link} to="/create" variant="contained" color="secondary">
//             СОЗДАТЬ МЕМ
//           </Button>
//         </Box>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Header;
import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, Menu, MenuItem, Box, Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
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

  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography variant="h6" noWrap>
              ПОКА НЕ ЗНАЮ
            </Typography>
          </Link>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {token ? (
            <>
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
                <Avatar alt="Profile Picture" />
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
          <Button component={Link} to="/create" variant="contained" color="secondary">
            СОЗДАТЬ МЕМ
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;