import React from 'react';
import { Sun, Moon } from 'lucide-react';

interface Props {
  isDarkMode: boolean;
  toggle: () => void;
}

export const ThemeToggle: React.FC<Props> = ({ isDarkMode, toggle }) => (
  <button
    onClick={toggle}
    className="fixed top-6 right-6 p-3 rounded-2xl bg-white dark:bg-slate-800 shadow-xl text-gray-600 dark:text-yellow-400 hover:scale-110 active:scale-95 transition-all z-50 border border-gray-100 dark:border-slate-700"
    title={isDarkMode ? "Aydınlık Mod" : "Karanlık Mod"}
  >
    {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
  </button>
);