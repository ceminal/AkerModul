import React from 'react';
import { ChevronRight, ChevronLeft, LayoutPanelLeft, Box } from 'lucide-react';
import { AppState, ScopeType } from '../../types';

interface Props {
  state: AppState;
  updateState: <K extends keyof AppState>(key: K, value: AppState[K]) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const StepScope: React.FC<Props> = ({ state, updateState, onNext, onPrev }) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Alan Seçimi</h2>
        <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">Hangi alanlarda çalışmak istiyorsunuz?</p>
      </div>

      <div className="flex p-1 bg-gray-50 dark:bg-slate-800 rounded-xl w-full max-w-xs mx-auto">
        <button
          onClick={() => updateState('scope', 'Whole')}
          className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all ${
            state.scope === 'Whole' ? 'bg-white dark:bg-slate-700 shadow text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-slate-400 hover:text-gray-700'
          }`}
        >
          Tüm Alan
        </button>
        <button
          onClick={() => updateState('scope', 'Regional')}
          className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all ${
            state.scope === 'Regional' ? 'bg-white dark:bg-slate-700 shadow text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-slate-400 hover:text-gray-700'
          }`}
        >
          Bölgesel
        </button>
      </div>

      {state.scope === 'Regional' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {state.selectedRooms.map(room => (
            <div key={room.id} className="bg-white dark:bg-slate-800/50 p-4 rounded-xl border border-gray-50 dark:border-slate-700 shadow-sm transition-all hover:border-blue-100 dark:hover:border-blue-900/40">
              <h4 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2 text-sm">
                <LayoutPanelLeft size={14} className="text-blue-500 dark:text-blue-400" />
                {room.name}
              </h4>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={room.walls}
                    onChange={e => {
                      const newRooms = state.selectedRooms.map(r => r.id === room.id ? { ...r, walls: e.target.checked } : r);
                      updateState('selectedRooms', newRooms);
                    }}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-slate-600 dark:bg-slate-700"
                  />
                  <span className="text-xs text-gray-600 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 font-medium transition-colors">Duvarlar</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={room.ceiling}
                    onChange={e => {
                      const newRooms = state.selectedRooms.map(r => r.id === room.id ? { ...r, ceiling: e.target.checked } : r);
                      updateState('selectedRooms', newRooms);
                    }}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-slate-600 dark:bg-slate-700"
                  />
                  <span className="text-xs text-gray-600 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 font-medium transition-colors">Tavan</span>
                </label>
              </div>
            </div>
          ))}
        </div>
      )}

      {state.scope === 'Whole' && (
        <div className="bg-blue-50/50 dark:bg-blue-900/10 p-6 rounded-2xl border border-blue-100/50 dark:border-blue-900/30 text-center max-w-sm mx-auto">
          <Box size={32} className="mx-auto text-blue-600 dark:text-blue-400 mb-3 opacity-80" />
          <h3 className="text-md font-bold text-blue-900 dark:text-blue-200 mb-1">Hızlı Paket</h3>
          <p className="text-xs text-blue-700/70 dark:text-blue-300/60">Tüm alanlar dahildir.</p>
        </div>
      )}

      <div className="flex justify-between items-center pt-4">
        <button onClick={onPrev} className="flex items-center gap-1.5 text-gray-400 dark:text-slate-500 font-bold hover:text-gray-700 dark:hover:text-slate-300 text-sm">
          <ChevronLeft size={18} /> Geri
        </button>
        <button onClick={onNext} className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold shadow-md hover:bg-blue-700 flex items-center gap-1.5 text-sm transition-all active:scale-95">
          Ürün Seçimi <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};