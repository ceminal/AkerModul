import React, { useState } from 'react';
import { Plus, Search, MoreHorizontal, Package } from 'lucide-react';
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
  // State
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: 'Marshall Silikonlu Mat', category: 'İç Cephe', price: 2500, stock: 45 },
    { id: 2, name: 'Filli Boya Momento', category: 'İç Cephe', price: 2800, stock: 32 },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', category: 'İç Cephe', price: '', stock: '' });

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct: Product = {
      id: products.length + 1,
      name: formData.name,
      category: formData.category,
      price: Number(formData.price),
      stock: Number(formData.stock),
    };

    setProducts([...products, newProduct]);
    setFormData({ name: '', category: 'İç Cephe', price: '', stock: '' });
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* Başlık */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">Ürünler</h1>
          <p className="text-sm text-gray-500 dark:text-slate-400 font-medium">Stok ve fiyat yönetimi</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-blue-500/30 flex items-center gap-2 transition-all active:scale-95 text-sm"
        >
          <Plus size={18} /> Yeni Ürün Ekle
        </button>
      </div>

      {/* Tablo Container (Aynı Kalacak) */}
      <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl shadow-xl overflow-hidden">
        {/* ... Arama Barı ve Tablo içeriği aynı, sadece map fonksiyonu products state'ini kullanacak ... */}
        {/* Burayı kod tekrarı olmasın diye kısa tutuyorum, önceki kodun aynısı */}
        <div className="overflow-x-auto">
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
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg text-gray-400 hover:text-gray-600 transition-colors">
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- MODAL --- */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Yeni Ürün Ekle">
        <form onSubmit={handleAddProduct} className="space-y-4">

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
              Ürünü Kaydet
            </button>
          </div>
        </form>
      </Modal>

    </div>
  );
};