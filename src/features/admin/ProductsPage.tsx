import React, { useState, useEffect, useRef } from 'react';
import { Plus, Search, MoreHorizontal, Package, Edit2, Trash2, X } from 'lucide-react';
import { Modal } from '../../components/Modal';

// Tip Tanımlaması
interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
}

export const ProductsPage: React.FC = () => {
  // --- STATE ---
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: 'Marshall Silikonlu Mat', category: 'İç Cephe', price: 2500, stock: 45 },
    { id: 2, name: 'Filli Boya Momento', category: 'İç Cephe', price: 2800, stock: 32 },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Hangi ürünün menüsü (3 nokta) açık?
  const [activeMenuId, setActiveMenuId] = useState<number | null>(null);

  // Hangi ürün düzenleniyor?
  const [editingId, setEditingId] = useState<number | null>(null);

  const [formData, setFormData] = useState({ name: '', category: 'İç Cephe', price: '', stock: '' });

  // --- YARDIMCI FONKSİYONLAR ---

  const resetForm = () => {
    setFormData({ name: '', category: 'İç Cephe', price: '', stock: '' });
    setEditingId(null);
    setActiveMenuId(null); // Menüyü kapat
  };

  const openAddModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  // Menüyü aç/kapa
  const toggleMenu = (id: number) => {
    if (activeMenuId === id) {
      setActiveMenuId(null);
    } else {
      setActiveMenuId(id);
    }
  };

  // Düzenle Butonuna Basınca
  const handleEditClick = (product: Product) => {
    setEditingId(product.id);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      stock: product.stock.toString(),
    });
    setActiveMenuId(null); // Menüyü kapat
    setIsModalOpen(true); // Modalı aç
  };

  // Sil Butonuna Basınca
  const handleDeleteClick = (id: number) => {
    if (window.confirm('Bu ürünü silmek istediğinize emin misiniz?')) {
      setProducts(products.filter(p => p.id !== id));
    }
    setActiveMenuId(null);
  };

  // Form Gönderimi (Ekleme veya Güncelleme)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Güncelleme Modu
    if (editingId) {
      setProducts(products.map(p =>
        p.id === editingId
          ? {
            ...p,
            name: formData.name,
            category: formData.category,
            price: Number(formData.price),
            stock: Number(formData.stock)
          }
          : p
      ));
    }
    // 2. Yeni Ekleme Modu
    else {
      const newProduct: Product = {
        id: products.length + 1,
        name: formData.name,
        category: formData.category,
        price: Number(formData.price),
        stock: Number(formData.stock),
      };
      setProducts([...products, newProduct]);
    }

    setIsModalOpen(false);
    resetForm();
  };

  // Sayfanın herhangi bir yerine tıklayınca menüyü kapatmak için
  useEffect(() => {
    const handleClickOutside = () => setActiveMenuId(null);
    if (activeMenuId !== null) {
      // Tıklama olayını biraz gecikmeli ekleyelim ki butonun kendi click'i ile çakışmasın
      window.addEventListener('click', handleClickOutside);
    }
    return () => window.removeEventListener('click', handleClickOutside);
  }, [activeMenuId]);


  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">

      {/* Başlık */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">Ürünler</h1>
          <p className="text-sm text-gray-500 dark:text-slate-400 font-medium">Stok ve fiyat yönetimi</p>
        </div>
        <button
          onClick={openAddModal}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-blue-500/30 flex items-center gap-2 transition-all active:scale-95 text-sm"
        >
          <Plus size={18} /> Yeni Ürün Ekle
        </button>
      </div>

      {/* Tablo Container */}
      <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl shadow-xl overflow-visible"> {/* overflow-hidden yerine overflow-visible yaptık ki menü kesilmesin */}

        {/* Arama Barı (Opsiyonel buraya eklenebilir) */}
        <div className="p-4 border-b border-gray-100 dark:border-slate-800">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input type="text" placeholder="Ürün ara..." className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none dark:text-white" />
          </div>
        </div>

        <div className="overflow-x-auto min-h-[300px]">
          <table className="w-full text-left text-sm text-gray-600 dark:text-slate-300">
            <thead className="bg-gray-50 dark:bg-slate-800/50 text-xs uppercase font-bold text-gray-400 dark:text-slate-500">
              <tr>
                <th className="px-6 py-4">Ürün Adı</th>
                <th className="px-6 py-4">Kategori</th>
                <th className="px-6 py-4">Fiyat</th>
                <th className="px-6 py-4">Stok</th>
                <th className="px-6 py-4 text-right">İşlem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-blue-50/50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-900 dark:text-white flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                      <Package size={16} />
                    </div>
                    {product.name}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded-md bg-gray-100 dark:bg-slate-800 text-xs font-bold text-gray-500 dark:text-slate-400 border border-gray-200 dark:border-slate-700">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">₺{product.price}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${product.stock > 20 ? 'bg-green-500' : 'bg-red-500'}`} />
                      {product.stock} Adet
                    </div>
                  </td>

                  {/* --- İŞLEM MENÜSÜ --- */}
                  <td className="px-6 py-4 text-right relative">
                    {/* 3 Nokta Butonu */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Sayfa tıklamasını engelle
                        toggleMenu(product.id);
                      }}
                      className={`p-2 rounded-lg transition-colors ${activeMenuId === product.id ? 'bg-blue-100 text-blue-600 dark:bg-slate-700' : 'hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-400 hover:text-gray-600'}`}
                    >
                      <MoreHorizontal size={18} />
                    </button>

                    {/* Dropdown Menü */}
                    {activeMenuId === product.id && (
                      <div className="absolute right-8 top-8 w-36 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-gray-100 dark:border-slate-700 z-50 animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
                        <button
                          onClick={() => handleEditClick(product)}
                          className="w-full text-left px-4 py-2.5 text-xs font-bold text-gray-600 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-700 hover:text-blue-600 flex items-center gap-2"
                        >
                          <Edit2 size={14} /> Düzenle
                        </button>
                        <button
                          onClick={() => handleDeleteClick(product.id)}
                          className="w-full text-left px-4 py-2.5 text-xs font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2"
                        >
                          <Trash2 size={14} /> Sil
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Liste boşsa boşluk bırakalım ki tablo çökmesin */}
          {products.length === 0 && (
            <div className="p-8 text-center text-gray-400 text-sm">Hiç ürün bulunamadı.</div>
          )}
        </div>
      </div>

      {/* --- MODAL --- */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingId ? "Ürünü Düzenle" : "Yeni Ürün Ekle"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-500 dark:text-slate-400">Ürün Adı</label>
            <input
              required
              type="text"
              placeholder="Örn: Marshall Silikonlu"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none dark:text-white text-sm"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-500 dark:text-slate-400">Kategori</label>
            <select
              value={formData.category}
              onChange={e => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none dark:text-white text-sm"
            >
              <option value="İç Cephe">İç Cephe</option>
              <option value="Dış Cephe">Dış Cephe</option>
              <option value="Tavan">Tavan</option>
              <option value="Astarlar">Astarlar</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-500 dark:text-slate-400">Fiyat (₺)</label>
              <input
                required
                type="number"
                placeholder="0.00"
                value={formData.price}
                onChange={e => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none dark:text-white text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-500 dark:text-slate-400">Stok Adedi</label>
              <input
                required
                type="number"
                placeholder="0"
                value={formData.stock}
                onChange={e => setFormData({ ...formData, stock: e.target.value })}
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none dark:text-white text-sm"
              />
            </div>
          </div>

          <div className="pt-4">
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-md transition-all active:scale-[0.98]">
              {editingId ? "Değişiklikleri Kaydet" : "Ürünü Kaydet"}
            </button>
          </div>
        </form>
      </Modal>

    </div>
  );
};