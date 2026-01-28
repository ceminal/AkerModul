import React from 'react';
import { Sun, Moon } from 'lucide-react';

interface Props {
  isDarkMode: boolean;
  toggle: () => void;
  className?: string; // Dışarıdan stil alabilsin
}

export const ThemeToggle: React.FC<Props> = ({ isDarkMode, toggle, className = '' }) => (
  <button
    onClick={toggle}
    className={`p-2.5 rounded-full transition-all duration-300 active:scale-95 flex items-center justify-center
      ${isDarkMode
        ? 'bg-slate-800 text-yellow-400 hover:bg-slate-700 hover:shadow-lg hover:shadow-yellow-400/20'
        : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-blue-600 hover:shadow-lg hover:shadow-blue-500/10 border border-gray-200'
      }
      ${className} 
    `}
    title={isDarkMode ? "Aydınlık Mod" : "Karanlık Mod"}
  >
    {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
  </button>
);