import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { refreshToken } from '../store/authSlice';
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children }) => {
  const { token, refreshToken: storedRefreshToken } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const isTokenExpired = (token) => {
    try {
      const decoded = jwtDecode(token);
      return decoded.exp * 1000 < Date.now();
    } catch (error) {
      return true;
    }
  };

  if (!token || isTokenExpired(token)) {
    if (storedRefreshToken && !isTokenExpired(storedRefreshToken)) {
      dispatch(refreshToken());
      return null;
    } else {
      return <Navigate to="/login" />;
    }
  }

  return children;
};

export default ProtectedRoute;