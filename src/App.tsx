import React, { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { ThemeToggle } from './components/ThemeToggle';
import { LoginScreen } from './features/auth/LoginScreen';       // İsmi değişti
import { RegisterScreen } from './features/auth/RegisterScreen'; // Yeni eklendi
import { QuoteWizard } from './features/quote/QuoteWizard';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const navigate = useNavigate();

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    navigate('/teklif-al');
  };

  return (
    <div className={`${isDarkMode ? 'dark' : ''}`}>
      <div className="min-h-screen py-8 px-4 md:px-8 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-950 dark:to-slate-900 transition-colors duration-500">

        <ThemeToggle isDarkMode={isDarkMode} toggle={toggleDarkMode} />

        <Routes>
          
          {/* 1. Giriş Sayfası (/) */}
          <Route 
            path="/" 
            element={
              !isLoggedIn ? (
                <LoginScreen onLoginSuccess={handleLoginSuccess} />
              ) : (
                <Navigate to="/teklif-al" replace />
              )
            } 
          />

          {/* 2. Kayıt Sayfası (/kayit) */}
          <Route 
            path="/kayit" 
            element={
              !isLoggedIn ? (
                <RegisterScreen onRegisterSuccess={handleLoginSuccess} />
              ) : (
                <Navigate to="/teklif-al" replace />
              )
            } 
          />

          {/* 3. Teklif Sihirbazı (/teklif-al) - Korumalı */}
          <Route 
            path="/teklif-al" 
            element={
              isLoggedIn ? (
                <QuoteWizard />
              ) : (
                <Navigate to="/" replace />
              )
            } 
          />

          {/* 404 - Bilinmeyen rota */}
          <Route path="*" element={<Navigate to="/" replace />} />
          
        </Routes>

      </div>
    </div>
  );
};

export default App;