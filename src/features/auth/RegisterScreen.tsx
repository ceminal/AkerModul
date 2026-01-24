import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Lock, ShieldCheck, Paintbrush, ArrowRight } from 'lucide-react';

interface Props {
    onRegisterSuccess: () => void;
}

export const RegisterScreen: React.FC<Props> = ({ onRegisterSuccess }) => {
    const [loading, setLoading] = useState(false);

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const commonCardClass = `bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-white dark:border-slate-800 transition-all duration-500 shadow-xl`;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (password !== confirmPassword) {
            setError('Şifreler birbiriyle eşleşmiyor!');
            return;
        }

        if (password.length < 6) {
            setError('Şifre en az 6 karakter olmalıdır.');
            return;
        }

        setLoading(true);

        setTimeout(() => {
            onRegisterSuccess();
            setLoading(false);
        }, 1200);
    };

    return (
        <div className="w-full max-w-sm animate-in fade-in zoom-in duration-700 mx-auto">
            <div className="text-center mb-6">
                <div className="inline-flex w-12 h-12 bg-blue-600 rounded-xl items-center justify-center text-white shadow-lg shadow-blue-200 dark:shadow-blue-900/20 mb-3 rotate-3">
                    <Paintbrush size={24} />
                </div>
                <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">ProTeklif</h1>
                <p className="text-[10px] font-bold text-gray-400 dark:text-slate-500 mt-1 uppercase tracking-widest">Hesap Oluştur</p>
            </div>

            <div className={`${commonCardClass} rounded-3xl p-8`}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Kayıt Olun</h2>

                {/* Hata Mesajı Alanı */}
                {error && (
                    <div className="mb-4 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 text-red-600 dark:text-red-400 text-xs font-bold animate-in slide-in-from-top-2">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Ad Soyad */}
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest ml-1">Ad Soyad</label>
                        <div className="relative group">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-600 group-focus-within:text-blue-500 transition-colors" size={16} />
                            <input required type="text" placeholder="Adınız Soyadınız" className="w-full pl-10 pr-4 py-2.5 bg-gray-50/50 dark:bg-slate-800/50 border border-gray-100 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/20 focus:border-blue-500 outline-none transition-all font-medium text-sm dark:text-white" />
                        </div>
                    </div>

                    {/* E-Posta */}
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest ml-1">E-Posta</label>
                        <div className="relative group">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-600 group-focus-within:text-blue-500 transition-colors" size={16} />
                            <input required type="email" placeholder="ornek@mail.com" className="w-full pl-10 pr-4 py-2.5 bg-gray-50/50 dark:bg-slate-800/50 border border-gray-100 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/20 focus:border-blue-500 outline-none transition-all font-medium text-sm dark:text-white" />
                        </div>
                    </div>

                    {/* Şifre 1 */}
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest ml-1">Şifre</label>
                        <div className="relative group">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-600 group-focus-within:text-blue-500 transition-colors" size={16} />
                            <input
                                required
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 bg-gray-50/50 dark:bg-slate-800/50 border border-gray-100 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/20 focus:border-blue-500 outline-none transition-all font-medium text-sm dark:text-white"
                            />
                        </div>
                    </div>

                    {/* Şifre 2 (Tekrar) */}
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest ml-1">Şifre Tekrar</label>
                        <div className="relative group">
                            <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-600 group-focus-within:text-blue-500 transition-colors" size={16} />
                            <input
                                required
                                type="password"
                                placeholder="••••••••"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className={`w-full pl-10 pr-4 py-2.5 bg-gray-50/50 dark:bg-slate-800/50 border rounded-xl focus:ring-2 outline-none transition-all font-medium text-sm dark:text-white
                    ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-100' : 'border-gray-100 dark:border-slate-700 focus:border-blue-500 focus:ring-blue-100 dark:focus:ring-blue-900/20'}
                  `}
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-2 ml-1">
                        <input type="checkbox" id="terms" required className="w-3.5 h-3.5 rounded border-gray-300 dark:border-slate-700 text-blue-600 focus:ring-blue-500 dark:bg-slate-800" />
                        <label htmlFor="terms" className="text-xs font-medium text-gray-500 dark:text-slate-400 cursor-pointer select-none">Kullanım Koşullarını Kabul Ediyorum</label>
                    </div>

                    <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 group disabled:opacity-70 text-sm active:scale-[0.98]">
                        {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <>Kayıt Ol <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></>}
                    </button>
                </form>
            </div>

            <p className="text-center mt-6 text-xs font-medium text-gray-500 dark:text-slate-400">
                Zaten üye misiniz? <Link to="/" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">Giriş Yapın</Link>
            </p>
        </div>
    );
};