import React from 'react';
import { 
  Home, Building2, Factory, HardHat, 
  Check, ChevronRight, Briefcase, Zap, Wrench, BrickWall, Ruler
} from 'lucide-react';
import { ProjectType } from '../../types';

interface Props {
  selectedType: ProjectType;
  selectedDetails: string[]; // YENİ: Seçilen detaylar
  onSelectType: (type: ProjectType) => void;
  onToggleDetail: (detail: string) => void; // YENİ: Detay ekle/çıkar
  onNext: () => void;
}

export const StepProjectType: React.FC<Props> = ({ 
  selectedType, 
  selectedDetails = [], 
  onSelectType, 
  onToggleDetail,
  onNext 
}) => {

  // 1. Standart Seçenekler (Ev, Ofis, Fabrika)
  const standardOptions = [
    'Yoklama boya uygulamaları',
    'Tadilat dekorasyon',
    'Efekt uygulamaları'
  ];

  // 2. İnşai İşler Grupları (Karmaşık Yapı)
  const constructionGroups = [
    {
      title: 'Mekanik',
      icon: Wrench,
      items: ['VRF', 'Klima', 'Temiz su & Pis su', 'Isıtma', 'Yangın']
    },
    {
      title: 'Elektrik',
      icon: Zap,
      items: ['Zayıf akım', 'Güçlü akım', 'Aydınlatma', 'Güvenlik ve Data']
    },
    {
      title: 'İnce Yapı',
      icon: Ruler,
      items: ['Duvar', 'Zemin', 'Tavan']
    },
    {
      title: 'Kaba Yapı',
      icon: BrickWall,
      items: ['Kalıp', 'Beton', 'Demir', 'Duvar örme', 'Çatı']
    }
  ];

  // Ana Kartlar
  const mainTypes: { id: ProjectType; label: string; icon: any }[] = [
    { id: 'Residential', label: 'Ev / Konut', icon: Home },
    { id: 'Commercial', label: 'Ofis / İşyeri', icon: Building2 },
    { id: 'Industrial', label: 'Fabrika', icon: Factory },
    { id: 'Construction', label: 'İnşai İşler', icon: HardHat },
  ];

  // Ana Tip Değişince Detayları Sıfırlama Mantığı
  const handleTypeChange = (type: ProjectType) => {
    onSelectType(type);
    // Tip değişirse detayları sıfırlamak isteyebilirsin, 
    // ama kullanıcı yanlışlıkla tıkladıysa kaybolmasın diye şimdilik ellemiyoruz.
    // İstersen buraya: onToggleDetail('RESET_ALL') gibi bir mantık eklenebilir.
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-4">
      
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Proje Tipi</h2>
        <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">
          Çalışma yapılacak alanın türünü ve kapsamını belirleyin.
        </p>
      </div>

      {/* 1. SEVİYE: ANA TİP SEÇİMİ */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {mainTypes.map((t) => {
          const isSelected = selectedType === t.id;
          return (
            <button
              key={t.id}
              onClick={() => handleTypeChange(t.id)}
              className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 text-center
                ${isSelected 
                  ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 shadow-md' 
                  : 'border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-200 dark:hover:border-slate-700 text-gray-500 dark:text-slate-400'
                }
              `}
            >
              <t.icon size={28} strokeWidth={1.5} />
              <span className="font-bold text-sm">{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* 2. SEVİYE: DETAY SEÇİMLERİ */}
      <div className="animate-in slide-in-from-top-4 fade-in duration-300 border-t border-dashed border-gray-200 dark:border-slate-700 pt-6">
        <h3 className="text-sm font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-4 pl-1">
          {selectedType === 'Construction' ? 'İnşai İş Kalemleri' : 'Uygulama Seçenekleri'}
        </h3>

        {/* --- DURUM A: EV, OFİS VEYA FABRİKA İSE --- */}
        {selectedType !== 'Construction' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {standardOptions.map((item) => {
              const isSelected = selectedDetails.includes(item);
              return (
                <button
                  key={item}
                  onClick={() => onToggleDetail(item)}
                  className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-all
                    ${isSelected
                      ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/30'
                      : 'bg-white dark:bg-slate-800 border-gray-100 dark:border-slate-700 hover:border-blue-300 dark:hover:border-slate-600 text-gray-700 dark:text-slate-200'
                    }
                  `}
                >
                  <div className={`w-5 h-5 rounded flex items-center justify-center border transition-colors
                    ${isSelected ? 'bg-white border-white text-blue-600' : 'border-gray-300 dark:border-slate-600'}
                  `}>
                    {isSelected && <Check size={12} strokeWidth={4} />}
                  </div>
                  <span className="font-semibold text-sm">{item}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* --- DURUM B: İNŞAİ İŞLER İSE (GRUP YAPISI) --- */}
        {selectedType === 'Construction' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {constructionGroups.map((group) => (
              <div key={group.title} className="bg-gray-50/50 dark:bg-slate-900/50 p-4 rounded-2xl border border-gray-100 dark:border-slate-800">
                <div className="flex items-center gap-2 mb-3 text-blue-600 dark:text-blue-400 font-bold border-b border-gray-200 dark:border-slate-700 pb-2">
                  <group.icon size={18} />
                  <span>{group.title}</span>
                </div>
                
                <div className="space-y-2">
                  {group.items.map((item) => {
                    const isSelected = selectedDetails.includes(item);
                    return (
                      <button
                        key={item}
                        onClick={() => onToggleDetail(item)}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-all
                          ${isSelected
                            ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-bold'
                            : 'bg-white dark:bg-slate-800 text-gray-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700'
                          }
                        `}
                      >
                        <span>{item}</span>
                        {isSelected && <Check size={14} />}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      <div className="flex justify-end pt-2">
        <button
          onClick={onNext}
          disabled={!selectedType || selectedDetails.length === 0} // En az 1 detay ve proje tipi seçilmeli
          className="bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-blue-500/30 hover:bg-blue-700 flex items-center gap-2 transition-all active:scale-95"
        >
          Devam Et <ChevronRight size={18} />
        </button>
      </div>

    </div>
  );
};