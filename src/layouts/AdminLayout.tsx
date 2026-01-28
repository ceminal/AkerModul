import React, { useState } from 'react'; // useState eklendi
import { Outlet, Link, useLocation } from 'react-router-dom';
// Menu ve X ikonlarını ekledik
import { LayoutDashboard, Users, Package, LogOut, Paintbrush, FilePlus, Bell, Search, Menu, X } from 'lucide-react';
import { ThemeToggle } from '../components/ThemeToggle';
import logoDarkImg from '../assets/akerlogosiyah.png'
import logoLightImg from '../assets/akerlogobeyaz.png'

interface Props {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  onLogout: () => void;
}

export const AdminLayout: React.FC<Props> = ({ isDarkMode, toggleDarkMode, onLogout }) => {
  const location = useLocation();
  // Mobil menü durumu için state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { path: '/admin/dashboard', label: 'Özet', icon: LayoutDashboard },
    { path: '/admin/quote', label: 'Teklif Hazırla', icon: FilePlus },
    { path: '/admin/users', label: 'Kullanıcılar', icon: Users },
    { path: '/admin/products', label: 'Ürünler & Fiyat', icon: Package },
  ];

  return (
    <div className={`${isDarkMode ? 'dark' : ''} flex h-screen bg-gray-50 dark:bg-slate-950 transition-colors duration-500 overflow-hidden`}>

      {/* --- MOBİL OVERLAY (Menü açılınca arka planı karartır) --- */}
      {isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 z-30 bg-gray-900/50 backdrop-blur-sm md:hidden animate-in fade-in duration-200"
        />
      )}

      {/* --- SIDEBAR --- */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-40 w-64
        bg-white/80 dark:bg-slate-900/90 backdrop-blur-xl
        border-r border-gray-100 dark:border-slate-800
        flex flex-col shadow-2xl transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="h-20 flex items-center justify-center px-6 border-b border-gray-100 dark:border-slate-800">

          <div className="relative h-20 w-20 flex items-center justify-center">
            {/* 1. Siyah Logo */}
            <img
              src={logoDarkImg}
              alt="Logo"
              className="h-20 w-auto object-contain block dark:hidden"
            />
            {/* 2. Beyaz Logo */}
            <img
              src={logoLightImg}
              alt="Logo"
              className="h-20 w-auto object-contain hidden dark:block absolute inset-0"
            />
          </div>

          {/* Mobilde Menü Kapatma Butonu (YENİ) */}
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="md:hidden p-1 text-gray-500 hover:text-red-500 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)} // Linke tıklayınca menüyü kapat
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group
                  ${isActive
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 translate-x-1'
                    : 'text-gray-500 dark:text-slate-400 hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400'
                  }`}
              >
                <item.icon size={20} className={isActive ? 'text-white' : 'group-hover:scale-110 transition-transform'} />
                <span className="font-bold text-sm tracking-wide">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-100 dark:border-slate-800">
          <button
            onClick={onLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors font-bold text-sm"
          >
            <LogOut size={20} />
            Çıkış Yap
          </button>
        </div>
      </aside>

      {/* --- ANA İÇERİK --- */}
      <main className="flex-1 flex flex-col relative overflow-hidden w-full">

        {/* Header */}
        <header className="h-20 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border-b border-gray-100 dark:border-slate-800 flex items-center justify-between px-4 md:px-8 z-10">

          {/* Sol Taraf: Hamburger + Başlık */}
          <div className="flex items-center gap-4">

            {/* Hamburger Butonu (Sadece Mobilde Görünür - YENİ) */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 -ml-2 text-gray-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              <Menu size={24} />
            </button>

            <div>
              <h2 className="text-lg font-bold text-gray-800 dark:text-white">Yönetim Paneli</h2>
              {/* Mobilde alt metni gizledik yer kaplamasın diye */}
              <p className="text-xs text-gray-400 dark:text-slate-500 hidden md:block">Hoş geldiniz, Admin</p>
            </div>
          </div>

          {/* Sağ Taraf: Araçlar */}
          <div className="flex items-center gap-2 md:gap-4">

            {/* Arama İkonu (Mobilde gizlenebilir veya kalabilir, şimdilik mobilde gizledim yer açmak için) */}
            <button className="p-2.5 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 hidden md:block">
              <Search size={20} />
            </button>

            <ThemeToggle isDarkMode={isDarkMode} toggle={toggleDarkMode} />

            <button className="relative p-2.5 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-slate-800">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
            </button>

            <div className="w-px h-8 bg-gray-200 dark:bg-slate-700 mx-1 hidden md:block"></div>

            <div className="flex items-center gap-3 pl-1 cursor-pointer hover:opacity-80 transition-opacity">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
                AD
              </div>
            </div>

          </div>
        </header>

        {/* İçerik Alanı (Padding mobilde biraz azaltıldı: p-4 md:p-8) */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 dark:from-slate-950 dark:to-slate-900">
          <Outlet />
        </div>
      </main>
    </div>
  );
};