import React from 'react';
import { Printer, Download, Share2, Edit3, CheckCircle2 } from 'lucide-react';
import { AppState } from '../../types';
import { PAINT_PRODUCTS } from '../../constants';
// Logonu import et (AdminLayout'taki gibi)
import logoImg from '../../assets/akerlogosiyah.png';

interface Props {
  state: AppState;
  totalPrice: number;
  onEdit: () => void;
}

export const StepQuote: React.FC<Props> = ({ state, totalPrice, onEdit }) => {
  const selectedPaint = PAINT_PRODUCTS.find(p => p.id === state.selectedPaintId);
  const dateStr = new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
  const selectedPaints = PAINT_PRODUCTS.filter(p => state.selectedPaintIds.includes(p.id));
  return (
    <div className="animate-in zoom-in-95 duration-500">

      {/* Aksiyon Butonları */}
      <div className="flex justify-end gap-2 mb-6">
        <button className="p-2 text-gray-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors" title="Yazdır">
          <Printer size={18} />
        </button>
        <button className="p-2 text-gray-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors" title="İndir">
          <Download size={18} />
        </button>
      </div>

      {/* --- TEKLİF KAĞIDI (A4 Görünümlü) --- */}
      <div className="bg-white text-gray-800 p-8 md:p-12 rounded-xl shadow-2xl relative overflow-hidden max-w-2xl mx-auto border border-gray-200">

        {/* Filigran (Opsiyonel) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[120px] font-black text-gray-100 -rotate-45 pointer-events-none select-none uppercase">
          TASLAK
        </div>

        {/* Header: Logo ve Tarih */}
        <div className="flex justify-between items-start border-b-2 border-gray-100 pb-8 mb-8">
          <div className="flex items-center gap-3">
            <img src={logoImg} alt="Logo" className="h-10 w-auto" />
            <div>
              <h1 className="text-xl font-bold text-gray-900 tracking-tight">Aker GROUP</h1>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest">Boya & Dekorasyon Hizmetleri</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Teklif Tarihi</p>
            <p className="text-sm font-semibold text-gray-700">{dateStr}</p>
            <p className="text-[10px] text-gray-400 mt-1">Teklif No: #TR-{Math.floor(Math.random() * 10000)}</p>
          </div>
        </div>

        {/* Müşteri Hitabı */}
        <div className="mb-8">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">Sayın Müşterimiz,</h2>
          <p className="text-xs text-gray-600 leading-relaxed">
            Talep etmiş olduğunuz <strong>{state.roomCount} {state.projectType === 'Residential' ? 'Konut' : 'İş Yeri'}</strong> boyama projesi için hazırladığımız fiyat teklifi ve detaylar aşağıda bilgilerinize sunulmuştur.
          </p>
        </div>

        {/* Tablo: Detaylar */}
        <div className="mb-8 border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full text-xs text-left">
            <thead className="bg-gray-50 text-gray-500 font-bold uppercase">
              <tr>
                <th className="px-4 py-3 border-b border-gray-200">Hizmet / Ürün</th>
                <th className="px-4 py-3 border-b border-gray-200">Açıklama</th>
                <th className="px-4 py-3 border-b border-gray-200 text-right">Durum</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="px-4 py-3 font-semibold">Proje Tipi</td>
                <td className="px-4 py-3 text-gray-600">{state.projectType === 'Residential' ? 'Ev Boyama' : 'Ofis Boyama'} ({state.roomCount})</td>
                <td className="px-4 py-3 text-right"><CheckCircle2 size={14} className="inline text-green-500" /></td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold">Uygulama Alanı</td>
                <td className="px-4 py-3 text-gray-600">
                  {state.scope === 'Whole'
                    ? 'Tüm Daire (Duvar + Tavan)'
                    : state.selectedRooms.filter(r => r.walls || r.ceiling).map(r => r.name).join(', ')}
                </td>
                <td className="px-4 py-3 text-right"><CheckCircle2 size={14} className="inline text-green-500" /></td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold">Eşya Durumu</td>
                <td className="px-4 py-3 text-gray-600">{state.furnishingStatus === 'Furnished' ? 'Eşyalı (Koruma Örtüsü Dahil)' : 'Boş Daire'}</td>
                <td className="px-4 py-3 text-right"><CheckCircle2 size={14} className="inline text-green-500" /></td>
              </tr>
              <tr className="bg-blue-50/50">
                <td className="px-4 py-3 font-bold text-blue-700">Seçilen Boya</td>
                <td className="px-4 py-3 font-bold text-blue-700">
                  {selectedPaint?.brand} - {selectedPaint?.name}
                </td>
                <td className="px-4 py-3 text-right"><CheckCircle2 size={14} className="inline text-blue-600" /></td>
              </tr>
              <tr className="bg-blue-50/50">
                <td className="px-4 py-3 font-bold text-blue-700 align-top">Seçilen Boyalar</td>
                <td className="px-4 py-3 font-bold text-blue-700">
                  <ul className="list-disc list-inside">
                    {selectedPaints.map(paint => (
                      <li key={paint.id}>
                        {paint.brand} - {paint.name} (₺{paint.pricePerLiter}/Lt)
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="px-4 py-3 text-right align-top"><CheckCircle2 size={14} className="inline text-blue-600" /></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Fiyat ve İmza Alanı */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 pt-4 border-t-2 border-gray-100">
          <div className="text-xs text-gray-400 max-w-[200px]">
            <p className="mb-4 font-semibold text-gray-500">Onay ve İmza</p>
            <div className="h-10 border-b border-gray-300 border-dashed w-full mb-1"></div>
            <p>Müşteri Adı Soyadı</p>
          </div>

          <div className="text-right">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Toplam Teklif Tutarı</p>
            <div className="text-3xl font-black text-blue-600 tracking-tight">
              ₺{totalPrice.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <p className="text-[10px] text-gray-400 mt-2 italic">* Fiyatlara KDV dahil değildir.</p>
          </div>
        </div>

      </div>

      {/* Alt Butonlar */}
      <div className="flex justify-center gap-4 mt-8">
        <button onClick={onEdit} className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-sm font-bold text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors shadow-sm">
          <Edit3 size={16} /> Düzenle
        </button>
        <button className="flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-500/30 transition-all active:scale-95">
          <CheckCircle2 size={18} /> Teklifi Onayla ve Gönder
        </button>
      </div>

    </div>
  );
};