// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import axios from 'axios';
// import { Container, Box, Typography, Button } from '@mui/material';
// import { logout } from '../store/authSlice';
// import { useNavigate } from 'react-router-dom';

// const ProtectedPage = () => {
//   const { user, token } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [protectedData, setProtectedData] = useState('');

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/api/protected', {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         setProtectedData(response.data.message);
//       } catch (error) {
//         console.error(error);
//         if (error.response && error.response.status === 401) {
//           dispatch(logout());
//           navigate('/login');
//         }
//       }
//     };

//     if (token) {
//       fetchData();
//     }
//   }, [token, dispatch, navigate]);

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate('/login');
//   };

//   if (!token) {
//     return <Typography variant="h6">Unauthorized</Typography>;
//   }

//   return (
//     <Container maxWidth="sm">
//       <Box sx={{ mt: 8 }}>
//         <Typography variant="h4">Protected Content</Typography>
//         <Typography variant="h6">Welcome, {user?.username}!</Typography>
//         <Typography>{protectedData}</Typography>
//         <Button variant="contained" color="primary" onClick={handleLogout}>Logout</Button>
//       </Box>
//     </Container>
//   );
// };

// export default ProtectedPage;
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { Container, Box, Typography, Button } from '@mui/material';
import { logout } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';
import CreateContentForm from '../components/CreateContentForm';

const ProtectedPage = () => {
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [protectedData, setProtectedData] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/protected', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProtectedData(response.data.message);
      } catch (error) {
        console.error(error);
        if (error.response && error.response.status === 401) {
          dispatch(logout());
          navigate('/login');
        }
      }
    };

    if (token) {
      fetchData();
    }
  }, [token, dispatch, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  if (!token) {
    return <Typography variant="h6">Unauthorized</Typography>;
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4">Protected Content</Typography>
        <Typography variant="h6">Welcome, {user?.username}!</Typography>
        <Typography>{protectedData}</Typography>
        <CreateContentForm />
        <Button variant="contained" color="primary" onClick={handleLogout}>Logout</Button>
      </Box>
    </Container>
  );
};

export default ProtectedPage;
