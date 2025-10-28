import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import OrderDetail from './pages/OrderDetail';
import PublicUpdate from './pages/PublicUpdate';

export default function App() {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

  useEffect(() => {
    if (token) axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }, [token]);

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/orders/:id" element={<OrderDetail />} />
      <Route path="/public-update" element={<PublicUpdate />} />
    </Routes>
  );
}
