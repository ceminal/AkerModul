import React from 'react';
import { Outlet } from 'react-router-dom';
import { ThemeToggle } from '../components/ThemeToggle';

interface Props {
    isDarkMode: boolean;
    toggleDarkMode: () => void;
}

export const PublicLayout: React.FC<Props> = ({ isDarkMode, toggleDarkMode }) => {
    return (
        <div className="min-h-screen py-8 px-4 md:px-8 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-950 dark:to-slate-900 transition-colors duration-500 flex flex-col relative">
            <ThemeToggle
                isDarkMode={isDarkMode}
                toggle={toggleDarkMode}
                className="absolute top-6 right-6 z-50 shadow-xl"
            />

            <div className="flex-1 flex flex-col justify-center">
                <Outlet />
            </div>
        </div>
    );
};