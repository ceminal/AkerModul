import React, { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { LoginScreen } from './features/auth/LoginScreen';
import { RegisterScreen } from './features/auth/RegisterScreen';
import { QuoteWizard } from './features/quote/QuoteWizard';

import { AdminLayout } from './layouts/AdminLayout';
import { PublicLayout } from './layouts/PublicLayout';

import { UsersPage } from './features/admin/UsersPage';
import { ProductsPage } from './features/admin/ProductsPage';


const App: React.FC = () => {
  // App.tsx içinde
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!localStorage.getItem('token'));
  const [isDarkMode, setIsDarkMode] = useState(false);

  const navigate = useNavigate();
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    navigate('/admin/dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <div className={isDarkMode ? 'dark' : ''}>

      <Routes>

        <Route element={<PublicLayout isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />}>

          <Route
            path="/"
            element={!isLoggedIn ? <LoginScreen onLoginSuccess={handleLoginSuccess} /> : <Navigate to="/admin/dashboard" replace />}
          />

          <Route
            path="/kayit"
            element={!isLoggedIn ? <RegisterScreen onRegisterSuccess={handleLoginSuccess} /> : <Navigate to="/admin/dashboard" replace />}
          />
        </Route>

        <Route
          path="/admin"
          element={
            isLoggedIn ? (
              <AdminLayout
                isDarkMode={isDarkMode}
                toggleDarkMode={toggleDarkMode}
                onLogout={handleLogout}
              />
            ) : (
              <Navigate to="/" replace />
            )
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<div className="text-gray-500 p-8">Dashboard Özeti...</div>} />

          <Route path="quote" element={<QuoteWizard />} />

          <Route path="users" element={<UsersPage />} />
          <Route path="products" element={<ProductsPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </div>
  );
};

export default App;