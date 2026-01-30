import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Search, PackageOpen, X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { PAINT_PRODUCTS } from '../../constants';
import { SelectedPaint } from '../../types';

interface Props {
  selectedPaints: SelectedPaint[]; // Yeni tip
  onSelect: (paints: SelectedPaint[]) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const StepPaintSelection: React.FC<Props> = ({ selectedPaints, onSelect, onNext, onPrev }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(PAINT_PRODUCTS);

  useEffect(() => {
    const results = PAINT_PRODUCTS.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(results);
  }, [searchTerm]);

  // Miktar Güncelleme Fonksiyonu
  const updateQuantity = (id: string, delta: number) => {
    const existingIndex = selectedPaints.findIndex(p => p.id === id);

    // Eğer ürün listede yoksa ve artırılıyorsa ekle
    if (existingIndex === -1 && delta > 0) {
      onSelect([...selectedPaints, { id, quantity: 1 }]);
      return;
    }

    // Ürün varsa miktarını güncelle
    if (existingIndex !== -1) {
      const newPaints = [...selectedPaints];
      const newQuantity = newPaints[existingIndex].quantity + delta;

      if (newQuantity <= 0) {
        // Miktar 0'a düştüyse listeden çıkar
        newPaints.splice(existingIndex, 1);
      } else {
        newPaints[existingIndex].quantity = newQuantity;
      }
      onSelect(newPaints);
    }
  };

  // Bir ürünün şu anki miktarını bulmak için yardımcı
  const getQuantity = (id: string) => {
    return selectedPaints.find(p => p.id === id)?.quantity || 0;
  };

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500 h-full flex flex-col">

      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Boya Seçimi</h2>
        <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">
          Kullanmak istediğiniz ürünleri ve adetlerini belirleyin.
        </p>
      </div>

      {/* --- SEÇİLENLER ALANI (Artık Adet Gösteriyor) --- */}
      {selectedPaints.length > 0 && (
        <div className="bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800 p-3 rounded-xl animate-in slide-in-from-top-2 flex flex-col gap-2">
          <div className="text-[10px] font-bold text-blue-400 uppercase tracking-wider flex-shrink-0 flex justify-between items-center">
            <span>Seçilen Ürünler</span>
            <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 px-2 py-0.5 rounded-full text-[9px]">
              Toplam: {selectedPaints.reduce((acc, curr) => acc + curr.quantity, 0)} Adet
            </span>
          </div>

          <div className="flex flex-wrap gap-2 max-h-[90px] overflow-y-auto custom-scrollbar pr-1">
            {selectedPaints.map(item => {
              const product = PAINT_PRODUCTS.find(p => p.id === item.id);
              if (!product) return null;

              return (
                <div key={item.id} className="flex items-center gap-2 bg-white dark:bg-slate-800 border border-blue-200 dark:border-blue-900/50 rounded-lg px-2 py-1.5 shadow-sm shrink-0">
                  <div className={`w-2 h-2 rounded-full ${product.colorCode}`} />
                  <span className="text-xs font-bold text-gray-700 dark:text-slate-200">
                    {product.brand} <span className="opacity-70 font-normal">- {product.name}</span>
                  </span>
                  {/* Miktar Badge */}
                  <span className="bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-300 text-[10px] font-black px-1.5 rounded ml-1">
                    x{item.quantity}
                  </span>

                  <button
                    onClick={() => updateQuantity(item.id, -item.quantity)} // Hepsini sil (0'a çek)
                    className="ml-1 p-0.5 hover:bg-red-100 dark:hover:bg-red-900/50 text-gray-400 hover:text-red-500 rounded transition-colors"
                  >
                    <X size={12} />
                  </button>
                </div>
              );
            })}

            <button
              onClick={() => onSelect([])}
              className="text-[10px] font-bold text-red-500 hover:underline px-2 h-7 flex items-center shrink-0"
            >
              Temizle
            </button>
          </div>
        </div>
      )}

      {/* --- ARAMA --- */}
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

      {/* --- LİSTE --- */}
      <div className="flex-1 min-h-[200px] max-h-[250px] overflow-y-auto custom-scrollbar bg-gray-50/50 dark:bg-slate-900/50 rounded-2xl border border-gray-100 dark:border-slate-800 p-2">
        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <PackageOpen size={48} className="mb-2 opacity-50" />
            <p>Sonuç bulunamadı.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {filteredProducts.map(product => {
              const quantity = getQuantity(product.id);
              const isSelected = quantity > 0;

              return (
                <div
                  key={product.id}
                  className={`flex items-center gap-3 p-3 rounded-xl border transition-all relative overflow-hidden group
                    ${isSelected
                      ? 'bg-white dark:bg-slate-800 border-blue-500 ring-1 ring-blue-500 shadow-md'
                      : 'bg-white dark:bg-slate-800 border-gray-100 dark:border-slate-700 hover:border-blue-300 dark:hover:border-slate-600'
                    }`}
                >
                  {/* Seçili Arka Plan */}
                  {isSelected && <div className="absolute inset-0 bg-blue-50/50 dark:bg-blue-900/10 pointer-events-none" />}

                  {/* Marka Logo */}
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-black text-sm shadow-sm shrink-0 z-10 ${product.colorCode}`}>
                    {product.brand.charAt(0)}
                  </div>

                  {/* İçerik */}
                  <div className="flex-1 min-w-0 z-10">
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white truncate pr-2">
                      {product.brand} - {product.name}
                    </h4>
                    <div className="text-xs text-gray-500 dark:text-slate-400">₺{product.pricePerLiter}/Lt</div>
                  </div>

                  {/* Miktar Kontrolleri (Stepper) */}
                  <div className="flex items-center bg-gray-100 dark:bg-slate-700 rounded-lg p-0.5 z-10 shrink-0">

                    {/* Azalt Butonu */}
                    <button
                      onClick={() => updateQuantity(product.id, -1)}
                      className={`w-7 h-7 flex items-center justify-center rounded-md transition-colors ${quantity > 0 ? 'bg-white dark:bg-slate-600 text-red-500 hover:bg-red-50 shadow-sm' : 'text-gray-400 hover:bg-gray-200 dark:hover:bg-slate-600'}`}
                    >
                      {quantity > 0 ? <Minus size={14} /> : <span className="opacity-0"><Minus size={14} /></span> /* Hizalama bozulmasın diye görünmez ikon */}
                    </button>

                    {/* Miktar Göstergesi */}
                    <div className="w-8 text-center font-bold text-sm text-gray-900 dark:text-white select-none">
                      {quantity > 0 ? quantity : <span className="text-gray-300 dark:text-slate-600">-</span>}
                    </div>

                    {/* Artır Butonu */}
                    <button
                      onClick={() => updateQuantity(product.id, 1)}
                      className="w-7 h-7 flex items-center justify-center rounded-md bg-white dark:bg-slate-600 text-blue-600 hover:bg-blue-50 shadow-sm transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                </div>
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
          disabled={selectedPaints.length === 0}
          className="bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-blue-500/30 hover:bg-blue-700 flex items-center gap-2 text-sm transition-all active:scale-95"
        >
          Teklifi Oluştur <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};