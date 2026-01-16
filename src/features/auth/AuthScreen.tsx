import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  Paintbrush, 
  ArrowRight, 
  Globe 
} from 'lucide-react';

type AuthView = 'login' | 'register';

interface Props {
  onLoginSuccess: () => void;
}

export const AuthScreen: React.FC<Props> = ({ onLoginSuccess }) => {
  const [authView, setAuthView] = useState<AuthView>('login');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Kart tasarımı için ortak stil (App.tsx'ten alındı)
  const commonCardClass = `bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-white dark:border-slate-800 transition-all duration-500 shadow-xl`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simüle edilmiş giriş isteği
    setTimeout(() => {
        onLoginSuccess();
        setLoading(false);
    }, 1200);
  };

  return (
    <div className="w-full max-w-sm animate-in fade-in zoom-in duration-700 mx-auto">
      
      {/* Logo Alanı */}
      <div className="text-center mb-6">
        <div className="inline-flex w-12 h-12 bg-blue-600 rounded-xl items-center justify-center text-white shadow-lg shadow-blue-200 dark:shadow-blue-900/20 mb-3 rotate-3">
          <Paintbrush size={24} />
        </div>
        <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">ProTeklif</h1>
        <p className="text-[10px] font-bold text-gray-400 dark:text-slate-500 mt-1 uppercase tracking-widest">Akıllı Boyama Sistemi</p>
      </div>

      {/* Ana Kart */}
      <div className={`${commonCardClass} rounded-3xl p-8`}>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-5">
          {authView === 'login' ? 'Hoş Geldiniz' : 'Hesap Oluşturun'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* İsim Soyisim (Sadece Kayıt) */}
          {authView === 'register' && (
            <div className="space-y-1.5 animate-in slide-in-from-top-2 duration-300">
              <label className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest ml-1">Ad Soyad</label>
              <div className="relative group">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-600 group-focus-within:text-blue-500 transition-colors" size={16} />
                <input
                  required
                  type="text"
                  placeholder="Adınız Soyadınız"
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50/50 dark:bg-slate-800/50 border border-gray-100 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/20 focus:border-blue-500 outline-none transition-all font-medium text-sm dark:text-white"
                />
              </div>
            </div>
          )}

          {/* E-Posta */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest ml-1">E-Posta</label>
            <div className="relative group">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-600 group-focus-within:text-blue-500 transition-colors" size={16} />
              <input
                required
                type="email"
                placeholder="ornek@mail.com"
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50/50 dark:bg-slate-800/50 border border-gray-100 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/20 focus:border-blue-500 outline-none transition-all font-medium text-sm dark:text-white"
              />
            </div>
          </div>

          {/* Şifre */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center ml-1">
              <label className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest">Şifre</label>
              {authView === 'login' && (
                <button type="button" className="text-[10px] font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700">Unuttum?</button>
              )}
            </div>
            <div className="relative group">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-600 group-focus-within:text-blue-500 transition-colors" size={16} />
              <input
                required
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-2.5 bg-gray-50/50 dark:bg-slate-800/50 border border-gray-100 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/20 focus:border-blue-500 outline-none transition-all font-medium text-sm dark:text-white"
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-600 hover:text-gray-600 dark:hover:text-slate-300 transition-colors"
              >
                {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
              </button>
            </div>
          </div>

          {/* Şifre Tekrar (Sadece Kayıt) */}
          {authView === 'register' && (
            <div className="space-y-1.5 animate-in slide-in-from-top-2 duration-300">
              <label className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest ml-1">Şifre Tekrar</label>
              <div className="relative group">
                <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-600 group-focus-within:text-blue-500 transition-colors" size={16} />
                <input
                  required
                  type="password"
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 bg-gray-50/50 dark:bg-slate-800/50 border border-gray-100 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/20 focus:border-blue-500 outline-none transition-all font-medium text-sm dark:text-white"
                />
              </div>
            </div>
          )}

          {/* Checkbox */}
          <div className="flex items-center gap-2 ml-1">
            <input type="checkbox" id="terms" className="w-3.5 h-3.5 rounded border-gray-300 dark:border-slate-700 text-blue-600 focus:ring-blue-500 dark:bg-slate-800" />
            <label htmlFor="terms" className="text-xs font-medium text-gray-500 dark:text-slate-400 cursor-pointer select-none">
              {authView === 'login' ? 'Beni Hatırla' : 'Kullanım Koşullarını Kabul Ediyorum'}
            </label>
          </div>

          {/* Submit Butonu */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 group disabled:opacity-70 text-sm active:scale-[0.98]"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                {authView === 'login' ? 'Giriş Yap' : 'Kayıt Ol'} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        {/* Sosyal Medya İle Giriş */}
        <div className="mt-6">
          <div className="relative flex items-center justify-center mb-4">
            <div className="absolute w-full h-px bg-gray-100 dark:bg-slate-800"></div>
            <span className="relative px-3 bg-white dark:bg-slate-900 text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest">Veya</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 py-2 border border-gray-100 dark:border-slate-800 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors text-[11px] font-bold text-gray-600 dark:text-slate-300">
              <Globe size={14} /> Google
            </button>
            <button className="flex items-center justify-center gap-2 py-2 border border-gray-100 dark:border-slate-800 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors text-[11px] font-bold text-gray-600 dark:text-slate-300">
              Apple
            </button>
          </div>
        </div>
      </div>

      {/* Alt Bilgi / Geçiş */}
      <p className="text-center mt-6 text-xs font-medium text-gray-500 dark:text-slate-400">
        {authView === 'login' ? (
          <>Hesabınız yok mu? <button onClick={() => setAuthView('register')} className="text-blue-600 dark:text-blue-400 font-bold hover:underline">Kaydolun</button></>
        ) : (
          <>Zaten üye misiniz? <button onClick={() => setAuthView('login')} className="text-blue-600 dark:text-blue-400 font-bold hover:underline">Giriş Yapın</button></>
        )}
      </p>
    </div>
  );
};