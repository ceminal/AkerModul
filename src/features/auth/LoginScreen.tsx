import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Globe, User } from 'lucide-react';
import logoDarkImg from '../../assets/akerlogosiyah.png'
import logoLightImg from '../../assets/akerlogobeyaz.png'



interface Props {
    onLoginSuccess: () => void;
}

export const LoginScreen: React.FC<Props> = ({ onLoginSuccess }) => {
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const commonCardClass = `bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-white dark:border-slate-800 transition-all duration-500 shadow-xl`;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            onLoginSuccess();
            setLoading(false);
        }, 1200);
    };

    return (
        <div className="w-full max-w-sm animate-in fade-in zoom-in duration-700 mx-auto">
            {/* Logo */}
            <div className="text-center mb-6">
                {/* <div className="inline-flex w-12 h-12 bg-blue-600 rounded-xl items-center justify-center text-white shadow-lg shadow-blue-200 dark:shadow-blue-900/20 mb-3 rotate-3">
                    <Paintbrush size={24} />
                </div> */}
                <div className="flex justify-center mb-4 relative h-20">
                    <img
                        src={logoDarkImg}
                        alt="ProTeklif Logo"
                        className="h-full w-auto object-contain block dark:hidden drop-shadow-xl transition-opacity duration-300"
                    />

                    <img
                        src={logoLightImg}
                        alt="ProTeklif Logo"
                        className="h-full w-auto object-contain hidden dark:block drop-shadow-xl transition-opacity duration-300 absolute inset-0 mx-auto"
                    />
                </div>
                {/* <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">AKER GROUP</h1> */}
                <p className="text-[10px] font-bold text-gray-400 dark:text-slate-500 mt-1 uppercase tracking-widest">Giriş Yap</p>
            </div>

            <div className={`${commonCardClass} rounded-3xl p-8`}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-5">Hoş Geldiniz</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest ml-1">E-Posta</label>
                        <div className="relative group">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-600 group-focus-within:text-blue-500 transition-colors" size={16} />
                            <input required type="text" placeholder="Kullanıcı adı" className="w-full pl-10 pr-4 py-2.5 bg-gray-50/50 dark:bg-slate-800/50 border border-gray-100 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/20 focus:border-blue-500 outline-none transition-all font-medium text-sm dark:text-white" />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <div className="flex justify-between items-center ml-1">
                            <label className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest">Şifre</label>
                            <button type="button" className="text-[10px] font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700">Unuttum?</button>
                        </div>
                        <div className="relative group">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-600 group-focus-within:text-blue-500 transition-colors" size={16} />
                            <input required type={showPassword ? "text" : "password"} placeholder="••••••••" className="w-full pl-10 pr-10 py-2.5 bg-gray-50/50 dark:bg-slate-800/50 border border-gray-100 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/20 focus:border-blue-500 outline-none transition-all font-medium text-sm dark:text-white" />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-600 hover:text-gray-600 dark:hover:text-slate-300 transition-colors">
                                {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 ml-1">
                        <input type="checkbox" id="remember" className="w-3.5 h-3.5 rounded border-gray-300 dark:border-slate-700 text-blue-600 focus:ring-blue-500 dark:bg-slate-800" />
                        <label htmlFor="remember" className="text-xs font-medium text-gray-500 dark:text-slate-400 cursor-pointer select-none">Beni Hatırla</label>
                    </div>

                    <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 group disabled:opacity-70 text-sm active:scale-[0.98]">
                        {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <>Giriş Yap <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></>}
                    </button>
                </form>

                <div className="mt-6">
                    <div className="relative flex items-center justify-center mb-4">
                        <div className="absolute w-full h-px bg-gray-100 dark:bg-slate-800"></div>
                        <span className="relative px-3 bg-white dark:bg-slate-900 text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest">Veya</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <button className="flex items-center justify-center gap-2 py-2 border border-gray-100 dark:border-slate-800 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors text-[11px] font-bold text-gray-600 dark:text-slate-300"><Globe size={14} /> Google</button>
                        <button className="flex items-center justify-center gap-2 py-2 border border-gray-100 dark:border-slate-800 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors text-[11px] font-bold text-gray-600 dark:text-slate-300">Apple</button>
                    </div>
                </div>
            </div>

            <p className="text-center mt-6 text-xs font-medium text-gray-500 dark:text-slate-400">
                Hesabınız yok mu? <Link to="/kayit" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">Kaydolun</Link>
            </p>
        </div>
    );
};