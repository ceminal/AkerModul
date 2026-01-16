import React from 'react';
import { Home, Building2 } from 'lucide-react';
import { ProjectType } from '../../types';

interface Props {
  selectedType: ProjectType;
  onSelect: (type: ProjectType) => void;
  onNext: () => void;
}

export const StepProjectType: React.FC<Props> = ({ selectedType, onSelect, onNext }) => {
  const options = [
    { id: 'Residential', title: 'Konut / Ev', desc: 'Daire, villa veya müstakil ev projeleri.', icon: <Home className="text-blue-600 dark:text-blue-400" size={32} /> },
    { id: 'Commercial', title: 'Ticari / Ofis', desc: 'Mağaza, ofis veya endüstriyel alanlar.', icon: <Building2 className="text-blue-600 dark:text-blue-400" size={32} /> }
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Proje Tipini Seçin</h2>
        <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">Hangi tür alanı boyatmak istiyorsunuz?</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {options.map(item => (
          <button
            key={item.id}
            onClick={() => { onSelect(item.id as ProjectType); onNext(); }}
            className={`p-6 rounded-2xl border-2 transition-all duration-300 text-left hover:shadow-lg active:scale-[0.98] ${
              selectedType === item.id 
              ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-900/20 ring-2 ring-blue-100 dark:ring-blue-900/40' 
              : 'border-gray-50 dark:border-slate-800 bg-white dark:bg-slate-800/50'
            }`}
          >
            <div className="mb-4">{item.icon}</div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{item.title}</h3>
            <p className="text-gray-500 dark:text-slate-400 text-xs leading-relaxed">{item.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
};