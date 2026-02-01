// src/features/quote/StepServiceCategory.tsx (veya dosya adın neyse)

import React from 'react';
import { 
  Package, HardHat, Snowflake, Bath, Droplets, Paintbrush, MoreHorizontal, ChevronRight, Check
} from 'lucide-react';
import { MainCategory, MaterialSubCategory } from '../../types';

interface Props {
  selectedMain: MainCategory | null;
  selectedSubs: MaterialSubCategory[]; 
  onSelectMain: (val: MainCategory) => void;
  onSelectSub: (val: MaterialSubCategory[]) => void;
  onNext: () => void;
}

export const StepServiceCategory: React.FC<Props> = ({ 
  selectedMain, 
  
  // --- DÜZELTME BURADA ---
  // Eğer selectedSubs undefined veya null gelirse, otomatik olarak boş dizi [] olsun.
  // Bu sayede .length veya .includes asla hata vermez.
  selectedSubs = [], 
  
  onSelectMain, 
  onSelectSub, 
  onNext 
}) => {
  
  const materialSubCategories: { id: MaterialSubCategory; label: string; icon: any }[] = [
    { id: 'İklimlendirme', label: 'İklimlendirme & Soğutma', icon: Snowflake },
    { id: 'Vitrifiye', label: 'Vitrifiye Armatür', icon: Bath },
    { id: 'Seramik', label: 'Seramik & Yardımcı', icon: Droplets },
    { id: 'Boya', label: 'Boya', icon: Paintbrush },
    { id: 'Diğer', label: 'Diğer', icon: MoreHorizontal },
  ];

  // Ana kategori seçimi
  const handleMainSelect = (category: MainCategory) => {
    onSelectMain(category);
    // Taahhüt seçilirse alt seçimleri temizle (Boş dizi gönderiyoruz)
    if (category === 'Taahhüt') {
      onSelectSub([]);
    }
  };

  // Alt kategori ÇOKLU seçim/kaldırma mantığı
  const toggleSubCategory = (id: MaterialSubCategory) => {
    // selectedSubs artık kesinlikle bir dizi olduğu için güvendeyiz
    if (selectedSubs.includes(id)) {
      // Varsa çıkar
      onSelectSub(selectedSubs.filter(item => item !== id));
    } else {
      // Yoksa ekle
      onSelectSub([...selectedSubs, id]);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 h-full flex flex-col">
      
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">İş Tanımı</h2>
        <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">
          İşlem yapmak istediğiniz kategorileri seçiniz.
        </p>
      </div>

      <div className="flex-1 flex flex-col gap-6">
        
        {/* LEVEL 1: ANA KATEGORİLER */}
        <div className="grid grid-cols-2 gap-4">
          {/* Malzeme */}
          <button
            onClick={() => handleMainSelect('Malzeme')}
            className={`p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 text-center relative overflow-hidden
              ${selectedMain === 'Malzeme'
                ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 ring-2 ring-blue-600 ring-offset-2 dark:ring-offset-slate-900' 
                : 'border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-200 dark:hover:border-slate-700 text-gray-600 dark:text-slate-300'
              }
            `}
          >
            <Package size={40} strokeWidth={1.5} />
            <span className="font-bold text-lg">Malzeme</span>
          </button>

          {/* Taahhüt */}
          <button
            onClick={() => handleMainSelect('Taahhüt')}
            className={`p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 text-center relative overflow-hidden
              ${selectedMain === 'Taahhüt'
                ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 ring-2 ring-blue-600 ring-offset-2 dark:ring-offset-slate-900' 
                : 'border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-200 dark:hover:border-slate-700 text-gray-600 dark:text-slate-300'
              }
            `}
          >
            <HardHat size={40} strokeWidth={1.5} />
            <span className="font-bold text-lg">Taahhüt</span>
          </button>
        </div>

        {/* LEVEL 2: ALT KATEGORİLER (ÇOKLU SEÇİM) */}
        {selectedMain === 'Malzeme' && (
          <div className="animate-in slide-in-from-top-4 fade-in duration-300 border-t border-dashed border-gray-200 dark:border-slate-700 pt-6">
            <div className="flex justify-between items-center mb-3 px-1">
              <h3 className="text-sm font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                 Ürün Grupları
              </h3>
              {/* selectedSubs.length artık güvenli */}
              {selectedSubs.length > 0 && (
                 <span className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded-full">
                   {selectedSubs.length} Seçildi
                 </span>
              )}
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {materialSubCategories.map((sub) => {
                // Burada da hata vermez
                const isSelected = selectedSubs.includes(sub.id);
                return (
                  <button
                    key={sub.id as string}
                    onClick={() => toggleSubCategory(sub.id)}
                    className={`p-4 rounded-xl border transition-all flex flex-col items-center justify-center gap-2 text-center h-28 relative group
                      ${isSelected 
                        ? 'border-blue-500 bg-white dark:bg-slate-800 shadow-md text-blue-600 dark:text-blue-400 ring-1 ring-blue-500' 
                        : 'border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-900/50 hover:bg-white dark:hover:bg-slate-800 hover:shadow-sm text-gray-500 dark:text-slate-400'
                      }
                    `}
                  >
                    {/* Seçili Tik İkonu */}
                    {isSelected && (
                      <div className="absolute top-2 right-2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-white shadow-sm">
                        <Check size={12} strokeWidth={3} />
                      </div>
                    )}
                    
                    <sub.icon size={24} className={isSelected ? 'scale-110 transition-transform' : 'group-hover:scale-110 transition-transform'} />
                    <span className="font-semibold text-xs leading-tight">{sub.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-end pt-2">
        <button
          onClick={onNext}
          disabled={!selectedMain || (selectedMain === 'Malzeme' && selectedSubs.length === 0)}
          className="bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-blue-500/30 hover:bg-blue-700 flex items-center gap-2 transition-all active:scale-95"
        >
          Devam Et <ChevronRight size={18} />
        </button>
      </div>

    </div>
  );
};