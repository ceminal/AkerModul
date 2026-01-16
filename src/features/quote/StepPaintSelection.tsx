import React from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { PaintQuality } from '../../types';

interface Props {
  selectedQuality: PaintQuality;
  onSelect: (quality: PaintQuality) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const StepPaintSelection: React.FC<Props> = ({ selectedQuality, onSelect, onNext, onPrev }) => {
  const options = [
    { id: 'Economic', title: 'Ekonomik', features: ['Mat Bitiş', 'Silinebilir', 'Standart Renkler'], desc: 'Uygun fiyatlı.' },
    { id: 'Standard', title: 'Standard', features: ['İpek Mat', 'Tam Silinebilir', 'Küf Karşıtı'], desc: 'En popüler.' },
    { id: 'Premium', title: 'Premium', features: ['Kadifemsi', 'Antibakteriyel', 'Leke Tutmaz'], desc: 'Lüks seçim.' }
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Boya Kalitesi</h2>
        <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">Bütçenize uygun kaliteyi seçin.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {options.map(item => (
          <button
            key={item.id}
            onClick={() => onSelect(item.id as PaintQuality)}
            className={`relative p-5 rounded-2xl border-2 transition-all text-left flex flex-col active:scale-[1.01] ${
              selectedQuality === item.id
                ? 'border-blue-600 bg-white dark:bg-slate-800 ring-2 ring-blue-50 dark:ring-blue-900/30 shadow-md scale-[1.02]'
                : 'border-gray-50 dark:border-slate-800 bg-white dark:bg-slate-800/40 opacity-80 hover:opacity-100'
            }`}
          >
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-0.5">{item.title}</h3>
            <p className="text-[10px] font-bold text-blue-500 dark:text-blue-400 uppercase tracking-widest mb-3">{item.desc}</p>
            <ul className="space-y-1.5 mb-6 flex-grow">
              {item.features.map(f => (
                <li key={f} className="text-[11px] text-gray-500 dark:text-slate-400 flex items-center gap-1.5">
                  <div className="w-1 h-1 rounded-full bg-blue-300 dark:bg-blue-600" /> {f}
                </li>
              ))}
            </ul>
            <div className={`text-xs font-bold ${selectedQuality === item.id ? 'text-blue-600 dark:text-blue-400' : 'text-gray-300 dark:text-slate-600'}`}>
              Seçildi
            </div>
          </button>
        ))}
      </div>

      <div className="flex justify-between items-center pt-6">
        <button onClick={onPrev} className="flex items-center gap-1.5 text-gray-400 dark:text-slate-500 font-bold hover:text-gray-700 dark:hover:text-slate-300 text-sm">
          <ChevronLeft size={18} /> Geri
        </button>
        <button onClick={onNext} className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold shadow-md hover:bg-blue-700 flex items-center gap-1.5 text-sm transition-all active:scale-95">
          Teklifi Gör <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};