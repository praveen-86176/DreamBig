import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';

function App() {
  // Enhanced auth state management
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('nutriveda_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('nutriveda_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('nutriveda_user');
  };

  const isAuthenticated = !!user;

  return (
    <Router>
      <Routes>
        <Route
          path="/auth"
          element={
            !isAuthenticated ? (
              <Auth onLogin={handleLogin} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Dashboard user={user} onLogout={handleLogout} />
            ) : (
              <Navigate to="/auth" replace />
            )
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
