import React, { useState } from 'react';
// Lock ve ShieldCheck ikonlarını ekledik
import { Plus, User, Mail, Shield, Trash2, Edit2, Lock, ShieldCheck } from 'lucide-react';
import { Modal } from '../../components/Modal';

interface UserData {
    id: number;
    name: string;
    email: string;
    role: string;
    status: 'Aktif' | 'Pasif';
}

export const UsersPage: React.FC = () => {
    const [users, setUsers] = useState<UserData[]>([
        { id: 1, name: 'Ahmet Yılmaz', email: 'ahmet@mail.com', role: 'Admin', status: 'Aktif' },
        { id: 2, name: 'Ayşe Demir', email: 'ayse@mail.com', role: 'Editör', status: 'Aktif' },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: 'Müşteri',
        password: '',
        confirmPassword: ''
    });

    const [error, setError] = useState<string | null>(null);

    const handleAddUser = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (formData.password !== formData.confirmPassword) {
            setError('Şifreler birbiriyle uyuşmuyor!');
            return;
        }

        if (formData.password.length < 6) {
            setError('Şifre en az 6 karakter olmalıdır.');
            return;
        }

        const newUser: UserData = {
            id: users.length + 1,
            name: formData.name,
            email: formData.email,
            role: formData.role,
            status: 'Aktif'
        };

        setUsers([...users, newUser]);

        setFormData({ name: '', email: '', role: 'Admin', password: '', confirmPassword: '' });
        setIsModalOpen(false);
    };

    const handleDelete = (id: number) => {
        if (window.confirm('Bu kullanıcıyı silmek istediğinize emin misiniz?')) {
            setUsers(users.filter(u => u.id !== id));
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

            {/* --- BAŞLIK VE LİSTELEME KISMI (AYNI) --- */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">Kullanıcılar</h1>
                    <p className="text-sm text-gray-500 dark:text-slate-400 font-medium">Yönetici ve müşteri listesi</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-blue-500/30 flex items-center gap-2 transition-all active:scale-95 text-sm"
                >
                    <Plus size={18} /> Kullanıcı Ekle
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {users.map(user => (
                    <div key={user.id} className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all group">
                        <div className="flex items-start justify-between mb-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900 dark:to-indigo-900 flex items-center justify-center text-blue-600 dark:text-blue-300 font-bold text-lg">
                                {user.name.charAt(0)}
                            </div>
                            <span className="px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400">
                                {user.status}
                            </span>
                        </div>

                        <h3 className="font-bold text-gray-900 dark:text-white text-lg">{user.name}</h3>
                        <div className="mt-4 space-y-2">
                            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-slate-400"><Mail size={14} /> {user.email}</div>
                            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-slate-400"><Shield size={14} /> {user.role}</div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-gray-50 dark:border-slate-800 flex gap-2">
                            <button className="flex-1 py-2 bg-gray-50 dark:bg-slate-800 rounded-lg text-xs font-bold text-gray-600 dark:text-slate-300 hover:bg-blue-50 hover:text-blue-600 transition-colors flex items-center justify-center gap-1">
                                <Edit2 size={14} /> Düzenle
                            </button>
                            <button onClick={() => handleDelete(user.id)} className="flex-1 py-2 bg-gray-50 dark:bg-slate-800 rounded-lg text-xs font-bold text-red-500 hover:bg-red-50 transition-colors flex items-center justify-center gap-1">
                                <Trash2 size={14} /> Sil
                            </button>
                        </div>
                    </div>
                ))}
            </div>


            {/* --- GÜNCELLENMİŞ MODAL --- */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Yeni Kullanıcı Ekle">

                {/* Hata Mesajı Gösterimi */}
                {error && (
                    <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-xs font-bold animate-in slide-in-from-top-2">
                        {error}
                    </div>
                )}

                <form onSubmit={handleAddUser} className="space-y-4">

                    {/* Ad Soyad */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-500 dark:text-slate-400">Ad Soyad</label>
                        <div className="relative group">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500" size={16} />
                            <input
                                required
                                type="text"
                                placeholder="Örn: Mehmet Yılmaz"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none dark:text-white text-sm"
                            />
                        </div>
                    </div>

                    {/* E-Posta */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-500 dark:text-slate-400">E-Posta</label>
                        <div className="relative group">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500" size={16} />
                            <input
                                required
                                type="email"
                                placeholder="mail@ornek.com"
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none dark:text-white text-sm"
                            />
                        </div>
                    </div>

                    {/* Rol Seçimi */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-500 dark:text-slate-400">Rol</label>
                        <div className="relative group">
                            <Shield className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500" size={16} />
                            <select
                                value={formData.role}
                                onChange={e => setFormData({ ...formData, role: e.target.value })}
                                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none dark:text-white text-sm appearance-none"
                            >
                                <option value="Admin">Admin</option>
                                <option value="Editör">Editör</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-2">
                        {/* Şifre */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-gray-500 dark:text-slate-400">Şifre</label>
                            <div className="relative group">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500" size={16} />
                                <input
                                    required
                                    type="password"
                                    placeholder="******"
                                    value={formData.password}
                                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none dark:text-white text-sm"
                                />
                            </div>
                        </div>

                        {/* Şifre Tekrar */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-gray-500 dark:text-slate-400">Şifre Tekrar</label>
                            <div className="relative group">
                                <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500" size={16} />
                                <input
                                    required
                                    type="password"
                                    placeholder="******"
                                    value={formData.confirmPassword}
                                    onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}
                                    className={`w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-slate-800 border rounded-xl focus:ring-2 outline-none dark:text-white text-sm transition-colors
                    ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-100' : 'border-gray-200 dark:border-slate-700 focus:ring-blue-500'}
                  `}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="pt-4">
                        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-md transition-all active:scale-[0.98]">
                            Kullanıcıyı Oluştur
                        </button>
                    </div>
                </form>
            </Modal>

        </div>
    );
};