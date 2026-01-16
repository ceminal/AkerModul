import React from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { AppState, RoomCount, FurnishingStatus } from '../../types';

interface Props {
  state: AppState;
  updateState: <K extends keyof AppState>(key: K, value: AppState[K]) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const StepHomeDetails: React.FC<Props> = ({ state, updateState, onNext, onPrev }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {state.projectType === 'Residential' ? 'Konut' : 'Ofis'} Detayları
        </h2>
        <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">Alanınızın büyüklüğünü ve durumunu belirtin.</p>
      </div>

      <div className="space-y-4">
        <label className="block text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest ml-1">Oda Sayısı</label>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          {['1+0', '1+1', '2+1', '3+1', '4+1', '5+1+'].map(count => (
            <button
              key={count}
              onClick={() => updateState('roomCount', count as RoomCount)}
              className={`py-3 px-2 rounded-xl border font-bold transition-all text-sm active:scale-95 ${
                state.roomCount === count
                  ? 'border-blue-600 bg-blue-600 text-white shadow-md'
                  : 'border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-800/50 text-gray-600 dark:text-slate-300 hover:border-blue-300 dark:hover:border-blue-800'
              }`}
            >
              {count}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <label className="block text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest ml-1">Eşya Durumu</label>
        <div className="flex gap-3">
          {[
            { id: 'Empty', label: 'Boş Daire', desc: 'Hızlı çalışma.' },
            { id: 'Furnished', label: 'Eşyalı', desc: 'Koruma gerektirir.' }
          ].map(item => (
            <button
              key={item.id}
              onClick={() => updateState('furnishingStatus', item.id as FurnishingStatus)}
              className={`flex-1 p-4 rounded-xl border-2 transition-all text-left active:scale-[0.98] ${
                state.furnishingStatus === item.id
                  ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-50 dark:border-slate-800 bg-white dark:bg-slate-800/50'
              }`}
            >
              <span className="block font-bold text-gray-900 dark:text-white text-sm">{item.label}</span>
              <span className="text-[10px] text-gray-500 dark:text-slate-400 uppercase font-medium">{item.desc}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center pt-2">
        <button onClick={onPrev} className="flex items-center gap-1.5 text-gray-400 dark:text-slate-500 font-bold hover:text-gray-700 dark:hover:text-slate-300 text-sm">
          <ChevronLeft size={18} /> Geri
        </button>
        <button onClick={onNext} className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold shadow-md hover:bg-blue-700 flex items-center gap-1.5 text-sm transition-all active:scale-95">
          Devam Et <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};