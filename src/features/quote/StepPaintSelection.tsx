import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Search, Check, PackageOpen, X, Plus } from 'lucide-react';
import { PAINT_PRODUCTS } from '../../constants';

interface Props {
  selectedPaintIds: string[]; // Çoğul oldu
  onSelect: (ids: string[]) => void; // Çoğul oldu
  onNext: () => void;
  onPrev: () => void;
}

export const StepPaintSelection: React.FC<Props> = ({ selectedPaintIds, onSelect, onNext, onPrev }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(PAINT_PRODUCTS);

  // Arama Mantığı
  useEffect(() => {
    const results = PAINT_PRODUCTS.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(results);
  }, [searchTerm]);

  // Seçim Yapma / Kaldırma (Toggle)
  const toggleSelection = (id: string) => {
    if (selectedPaintIds.includes(id)) {
      // Varsa çıkar
      onSelect(selectedPaintIds.filter(pid => pid !== id));
    } else {
      // Yoksa ekle
      onSelect([...selectedPaintIds, id]);
    }
  };

  // Seçilen Ürün Objelerini Bul (Göstermek için)
  const selectedProductsList = PAINT_PRODUCTS.filter(p => selectedPaintIds.includes(p.id));

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500 h-full flex flex-col">

      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Boya Seçimi</h2>
        <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">
          Birden fazla alternatif seçebilirsiniz.
        </p>
      </div>

      {/* --- SEÇİLENLER ALANI (TAGS / CHIPS) --- */}
      {selectedPaintIds.length > 0 && (
        <div className="bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800 p-3 rounded-xl animate-in slide-in-from-top-2">
          <div className="text-[10px] font-bold text-blue-400 uppercase tracking-wider mb-2">Seçilen Ürünler ({selectedPaintIds.length})</div>
          <div className="flex flex-wrap gap-2 overflow-y-auto max-h-[90px] custom-scrollbar pr-1">
            {selectedProductsList.map(product => (
              <div key={product.id} className="flex items-center gap-2 bg-white dark:bg-slate-800 border border-blue-200 dark:border-blue-900/50 rounded-lg px-2 py-1.5 shadow-sm">
                <div className={`w-2 h-2 rounded-full ${product.colorCode}`} />
                <span className="text-xs font-bold text-gray-700 dark:text-slate-200">
                  {product.brand} <span className="font-normal opacity-70">- {product.name}</span>
                </span>
                <button
                  onClick={() => toggleSelection(product.id)}
                  className="ml-1 p-0.5 hover:bg-red-100 dark:hover:bg-red-900/50 text-gray-400 hover:text-red-500 rounded transition-colors"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
            <button
              onClick={() => onSelect([])} // Hepsini temizle
              className="text-[10px] font-bold text-red-500 hover:underline px-2"
            >
              Temizle
            </button>
          </div>
        </div>
      )}

      {/* --- ARAMA ÇUBUĞU --- */}
      <div className="relative w-full z-20">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          <Search size={20} />
        </div>
        <input
          type="text"
          placeholder="Marka veya özellik ara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-12 py-3 bg-white dark:bg-slate-800 border-2 border-gray-100 dark:border-slate-700 rounded-xl shadow-sm focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none font-medium text-gray-700 dark:text-white transition-all"
        />
      </div>

      {/* --- LİSTE (SCROLLABLE) --- */}
      <div className="flex-1 min-h-[200px] max-h-[300px] overflow-y-auto custom-scrollbar bg-gray-50/50 dark:bg-slate-900/50 rounded-2xl border border-gray-100 dark:border-slate-800 p-2">
        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <PackageOpen size={48} className="mb-2 opacity-50" />
            <p>Sonuç bulunamadı.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {filteredProducts.map(product => {
              const isSelected = selectedPaintIds.includes(product.id);

              return (
                <button
                  key={product.id}
                  onClick={() => toggleSelection(product.id)}
                  className={`flex items-center gap-3 p-3 rounded-xl border transition-all text-left group relative overflow-hidden
                    ${isSelected
                      ? 'bg-white dark:bg-slate-800 border-blue-500 ring-1 ring-blue-500 shadow-md'
                      : 'bg-white dark:bg-slate-800 border-gray-100 dark:border-slate-700 hover:border-blue-300 dark:hover:border-slate-600'
                    }`}
                >
                  {/* Seçili Efekti (Arka Plan) */}
                  {isSelected && <div className="absolute inset-0 bg-blue-50/50 dark:bg-blue-900/10 pointer-events-none" />}

                  {/* Marka Logo/Harf */}
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-black text-sm shadow-sm shrink-0 z-10 ${product.colorCode}`}>
                    {product.brand.charAt(0)}
                  </div>

                  {/* İçerik */}
                  <div className="flex-1 min-w-0 z-10">
                    <div className="flex justify-between items-center">
                      <h4 className="text-sm font-bold text-gray-900 dark:text-white truncate pr-2">
                        {product.brand} - {product.name}
                      </h4>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-slate-400">₺{product.pricePerLiter}/Lt</div>
                  </div>

                  {/* Checkbox / Action */}
                  <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all z-10
                    ${isSelected
                      ? 'bg-blue-600 border-blue-600 text-white scale-110'
                      : 'border-gray-300 dark:border-slate-600 text-transparent group-hover:border-blue-400'
                    }
                  `}>
                    {isSelected ? <Check size={14} strokeWidth={3} /> : <Plus size={14} className="text-gray-400 group-hover:text-blue-500" />}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Navigasyon */}
      <div className="flex justify-between items-center pt-2">
        <button onClick={onPrev} className="flex items-center gap-1.5 text-gray-400 hover:text-gray-600 dark:text-slate-500 dark:hover:text-slate-300 font-bold text-sm transition-colors">
          <ChevronLeft size={18} /> Geri
        </button>
        <button
          onClick={onNext}
          disabled={selectedPaintIds.length === 0}
          className="bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-blue-500/30 hover:bg-blue-700 flex items-center gap-2 text-sm transition-all active:scale-95"
        >
          Teklifi Oluştur ({selectedPaintIds.length}) <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};