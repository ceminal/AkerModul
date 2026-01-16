import React from 'react';
import { CheckCircle2, Paintbrush } from 'lucide-react';
import { AppState } from '../../types';

interface Props {
  state: AppState;
  totalPrice: number;
  onEdit: () => void;
}

export const StepQuote: React.FC<Props> = ({ state, totalPrice, onEdit }) => {
  return (
    <div className="space-y-6 animate-in zoom-in-95 duration-500">
      <div className="text-center">
        <div className="w-14 h-14 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
          <CheckCircle2 size={28} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Teklifiniz Hazır!</h2>
        <p className="text-xs text-gray-500 dark:text-slate-400 mt-1 uppercase tracking-widest">Detaylı boyama özeti</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white dark:bg-slate-800/80 p-6 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm space-y-4">
            <h3 className="text-md font-bold text-gray-900 dark:text-white border-b border-gray-50 dark:border-slate-700 pb-3">Proje Özeti</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-[9px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest block mb-0.5">Tip</span>
                <span className="text-sm font-semibold text-gray-700 dark:text-slate-200">{state.projectType === 'Residential' ? 'Konut' : 'Ticari'}</span>
              </div>
              <div>
                <span className="text-[9px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest block mb-0.5">Oda</span>
                <span className="text-sm font-semibold text-gray-700 dark:text-slate-200">{state.roomCount}</span>
              </div>
              <div>
                <span className="text-[9px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest block mb-0.5">Eşya</span>
                <span className="text-sm font-semibold text-gray-700 dark:text-slate-200">{state.furnishingStatus === 'Empty' ? 'Boş' : 'Eşyalı'}</span>
              </div>
              <div>
                <span className="text-[9px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest block mb-0.5">Kalite</span>
                <span className="text-sm font-semibold text-gray-700 dark:text-slate-200">{state.paintQuality}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-50 dark:border-slate-700">
              <span className="text-[9px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest block mb-2">Kapsam</span>
              {state.scope === 'Whole' ? (
                <span className="text-[10px] font-bold bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-md uppercase tracking-wider">Tüm Alan (Hızlı Paket)</span>
              ) : (
                <div className="flex flex-wrap gap-1.5">
                  {state.selectedRooms.filter(r => r.walls || r.ceiling).map(r => (
                    <span key={r.id} className="text-[10px] font-medium bg-gray-50 dark:bg-slate-700 text-gray-500 dark:text-slate-400 px-2 py-0.5 rounded border border-gray-100 dark:border-slate-600">
                      {r.name}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800/80 p-4 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm">
            <h4 className="text-xs font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <Paintbrush size={14} className="text-blue-500 dark:text-blue-400" /> Dahil Hizmetler
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {['Boya & Malzeme', 'İşçilik', 'Eşya Koruma', 'Temizlik'].map(service => (
                <div key={service} className="flex items-center gap-1.5 text-[11px] text-gray-500 dark:text-slate-400">
                  <CheckCircle2 size={12} className="text-green-500 dark:text-green-400" /> {service}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-6 bg-blue-600 dark:bg-blue-700 text-white p-6 rounded-3xl shadow-lg space-y-6">
            <div>
              <h3 className="text-lg font-bold mb-0.5">Toplam Tutar</h3>
              <p className="text-blue-200 text-[10px] font-medium">Tahmini Uygulama Bedeli</p>
            </div>

            <div className="text-3xl font-black tracking-tight">
              ₺{totalPrice.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>

            <div className="space-y-2.5">
              <button className="w-full bg-white text-blue-600 font-bold py-3 rounded-xl shadow-md hover:bg-blue-50 transition-all text-sm uppercase tracking-wider active:scale-95">
                Teklifi Onayla
              </button>
              <button onClick={onEdit} className="w-full bg-blue-500/50 text-white font-bold py-2.5 rounded-xl hover:bg-blue-400/50 transition-all text-xs active:scale-95">
                Düzenle
              </button>
            </div>

            <p className="text-[9px] text-blue-100/60 text-center leading-relaxed font-medium italic">
              * Yerinde keşif sonrası kesin fiyat verilecektir. KDV hariçtir.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};