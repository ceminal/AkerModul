// c:\Users\Cem\Desktop\Projeler\AkerModulV2\src\features\quote\StepCustomerInfo.tsx
import React from 'react';
import { User, ChevronRight, Building2 } from 'lucide-react';

interface Props {
  customer?: {
    name: string;
    surname: string;
    companyName: string;
    projectName: string;
  };
  onChange: (key: string, value: string) => void;
  onNext: () => void;
}

export const StepCustomerInfo: React.FC<Props> = ({ customer = { name: '', surname: '', companyName: '', projectName: '' }, onChange, onNext }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Müşteri Bilgileri</h2>
        <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">
          Teklif hazırlamaya başlamadan önce müşteri adını giriniz.
        </p>
      </div>

      <div className="max-w-md mx-auto">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-2 ml-1">
                Ad
              </label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                  <User size={20} />
                </div>
                <input
                  type="text"
                  value={customer.name}
                  onChange={(e) => onChange('name', e.target.value)}
                  placeholder="Ahmet"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-slate-800 border-2 border-gray-100 dark:border-slate-700 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none font-bold text-gray-900 dark:text-white transition-all"
                  autoFocus
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-2 ml-1">
                Soyad
              </label>
              <input
                type="text"
                value={customer.surname}
                onChange={(e) => onChange('surname', e.target.value)}
                placeholder="Yılmaz"
                className="w-full px-4 py-4 bg-gray-50 dark:bg-slate-800 border-2 border-gray-100 dark:border-slate-700 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none font-bold text-gray-900 dark:text-white transition-all"
              />
            </div>
          </div>

          <div className="space-y-4">
            <label className="block text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-2 ml-1">
              Şirket Adı (Varsa)
            </label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                <Building2 size={20} />
              </div>
              <input
                type="text"
                value={customer.companyName}
                onChange={(e) => onChange('companyName', e.target.value)}
                placeholder="Örn: Aker Group"
                className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-slate-800 border-2 border-gray-100 dark:border-slate-700 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none font-bold text-gray-900 dark:text-white transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-2 ml-1">
                Proje Adı
              </label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                  <Building2 size={20} />
                </div>
                <input
                  type="text"
                  value={customer.projectName}
                  onChange={(e) => onChange('projectName', e.target.value)}
                  placeholder="Örn: X Şantiyesi"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-slate-800 border-2 border-gray-100 dark:border-slate-700 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none font-bold text-gray-900 dark:text-white transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 max-w-md mx-auto">
          <button
            onClick={onNext}
            disabled={!customer.name.trim() || !customer.surname.trim()}
            className="w-full bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-blue-500/30 hover:bg-blue-700 flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            Devam Et <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
