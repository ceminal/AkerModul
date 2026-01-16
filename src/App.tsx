import React, { useState } from 'react';
import { ThemeToggle } from './components/ThemeToggle';
import { AuthScreen } from './features/auth/AuthScreen';
import { QuoteWizard } from './features/quote/QuoteWizard'; // Yeni oluşturduğumuz component

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <div className={`${isDarkMode ? 'dark' : ''}`}>
      <div className="min-h-screen py-8 px-4 md:px-8 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-950 dark:to-slate-900 transition-colors duration-500">

        {/* Global Tema Değiştirici */}
        <ThemeToggle isDarkMode={isDarkMode} toggle={toggleDarkMode} />

        {/* Ana Ekran Yönetimi */}
        {!isLoggedIn ? (
          <AuthScreen onLoginSuccess={() => setIsLoggedIn(true)} />
        ) : (
          <QuoteWizard />
        )}

      </div>
    </div>
  );
};

export default App;