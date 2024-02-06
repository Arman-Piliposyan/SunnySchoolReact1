import { Navigate, Outlet } from 'react-router-dom';
import React from 'react';

export const PublicRoute = () => {
  const token = localStorage.getItem('token');
  return !token ? <Outlet /> : <Navigate to={'/dashboard'} />;
};
