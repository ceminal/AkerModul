import React, { useState, useEffect, useRef } from 'react';
import { Plus, Search, MoreHorizontal, Package, Edit2, Trash2, X } from 'lucide-react';
import { Modal } from '../../components/Modal';
import axios from 'axios';

interface Product {
  id: number;
  name: string;
  categoryId: number;
  categoryName?: string;
  price: number;
  stock: number;
}

interface Category {
  id: number;
  name: string;
  parentCategoryId: number | null;
}

export const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMainCategory, setSelectedMainCategory] = useState<number>(0);
  const [selectedSubCategory, setSelectedSubCategory] = useState<number>(0); // NEW: Track mid-level selection

  const [activeMenuId, setActiveMenuId] = useState<number | null>(null);

  const [editingId, setEditingId] = useState<number | null>(null);

  const [formData, setFormData] = useState({ name: '', categoryId: 0, price: '', stock: '' });


  /* Helper to sort categories hierarchically */
  const sortedCategories = React.useMemo(() => {
    // Helper to normalize parentId for comparison (treat null, undefined, 0 as 'no parent')
    const getParentId = (cat: Category) => cat.parentCategoryId || 0;

    const buildHierarchy = (parentId: number = 0, level: number = 0): { category: Category, level: number }[] => {
      const children = categories.filter(c => getParentId(c) === parentId);

      return children.flatMap(c => [
        { category: c, level },
        ...buildHierarchy(c.id, level + 1)
      ]);
    };
    return buildHierarchy(0); // Start looking for roots (parent=0)
  }, [categories]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/Categories');

      const mappedData = response.data.map((item: any) => ({
        id: Number(item.id || item.Id),
        name: item.name || item.Name,
        // SİHİRLİ DOKUNUŞ BURADA:
        // Eğer null veya undefined ise 0 yap. Değilse sayıyı al.
        parentCategoryId: (item.parentCategoryId || item.ParentCategoryId) ? Number(item.parentCategoryId || item.ParentCategoryId) : 0
      }));

      setCategories(mappedData);
    } catch (err) {
      console.error("Hata:", err);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/Products');
      setProducts(response.data);
    } catch (err) {
      console.error("Ürünler yüklenirken hata:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const openAddModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const toggleMenu = (id: number) => {
    if (activeMenuId === id) {
      setActiveMenuId(null);
    } else {
      setActiveMenuId(id);
    }
  };

  const resetForm = () => {
    setFormData({ name: '', categoryId: 0, price: '', stock: '' });
    setEditingId(null);
    setActiveMenuId(null);
    setError(null);
    setSelectedMainCategory(0);
    setSelectedSubCategory(0); // Reset sub selection
  };

  const handleEditClick = (product: Product) => {
    setEditingId(product.id);
    setError(null);

    // --- REVERSE LOOKUP FOR HIERARCHY ---
    // 1. Find the assigned category
    const targetCat = categories.find(c => c.id === product.categoryId);

    if (targetCat) {
      const parentId = targetCat.parentCategoryId;

      if (!parentId || parentId === 0) {
        // Level 1: Assigned to Main Category
        setSelectedMainCategory(targetCat.id);
        setSelectedSubCategory(0);
      } else {
        // It has a parent. Find the parent.
        const parentCat = categories.find(c => c.id === parentId);

        if (parentCat) {
          const grandParentId = parentCat.parentCategoryId;

          if (!grandParentId || grandParentId === 0) {
            // Level 2: Parent is Main. Target is Sub.
            setSelectedMainCategory(parentCat.id);
            setSelectedSubCategory(targetCat.id);
          } else {
            // Level 3: Parent is Sub. Grandparent is Main.
            setSelectedMainCategory(grandParentId);
            setSelectedSubCategory(parentCat.id);
          }
        }
      }
    } else {
      // Fallback
      setSelectedMainCategory(0);
      setSelectedSubCategory(0);
    }
    // ---------------------------------------

    setFormData({
      name: product.name,
      categoryId: product.categoryId,
      price: product.price.toString(),
      stock: product.stock.toString(),
    });
    setActiveMenuId(null);
    setIsModalOpen(true);
  };

  const handleDeleteClick = async (id: number) => {
    if (window.confirm('Bu ürünü silmek istediğinize emin misiniz?')) {
      try {
        await axios.delete(`/Products/${id}`);
        fetchProducts();
      } catch (err) {
        alert("Silme işlemi başarısız oldu.");
      }
    }
    setActiveMenuId(null);
  };

  // Form Gönderimi (Ekleme veya Güncelleme)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const payload = {
        name: formData.name,
        image: null,
        categoryId: Number(formData.categoryId),
        details: null,
        price: Number(formData.price),
        stock: Number(formData.stock)
      };

      if (editingId) {
        await axios.put('/Products', { ...payload, id: editingId });
      } else {
        await axios.post('/Products', payload);
      }

      setIsModalOpen(false);
      resetForm();
      fetchProducts();
    } catch (err: any) {
      setError("İşlem sırasında bir hata oluştu.");
    }
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
          {loading ? (
            <div className="text-center py-20 text-gray-400">Yükleniyor...</div>
          ) : (
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
                        {product.categoryName}
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
          )}

          {/* Liste boşsa boşluk bırakalım ki tablo çökmesin */}
          {!loading && products.length === 0 && (
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
        {error && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-xs font-bold animate-in slide-in-from-top-2">
            {error}
          </div>
        )}
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

          {/* --- KATEGORİ SEÇİM ALANI (3 SEVİYE SİSTEMİ) --- */}
          <div className="space-y-4">

            {/* SEVİYE 1: ANA KATEGORİ SEÇİMİ (BUTONLAR) */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 dark:text-slate-400">Ürün Grubu (Marka)</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {categories
                  .filter(c => c.parentCategoryId === null || c.parentCategoryId === 0)
                  .map(cat => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => {
                        setSelectedMainCategory(cat.id);
                        setSelectedSubCategory(0); // Alt seçimleri sıfırla
                        setFormData({ ...formData, categoryId: cat.id }); // Formu güncelle
                      }}
                      className={`
                        px-2 py-3 rounded-xl text-sm font-bold border transition-all duration-200 active:scale-95 flex items-center justify-center text-center shadow-sm
                        ${selectedMainCategory === cat.id
                          ? 'bg-blue-600 text-white border-blue-600 ring-2 ring-blue-200 dark:ring-blue-900'
                          : 'bg-white dark:bg-slate-800 text-gray-600 dark:text-slate-300 border-gray-200 dark:border-slate-700 hover:border-blue-300 hover:bg-blue-50 dark:hover:bg-slate-700'
                        }
                      `}
                    >
                      {cat.name.toUpperCase()}
                    </button>
                  ))
                }
              </div>
            </div>

            {/* SEVİYE 2: ALT KATEGORİ SEÇİMİ */}
            {selectedMainCategory !== 0 && (
              <div className="space-y-1.5 animate-in slide-in-from-top-2 fade-in duration-300">
                <label className="text-xs font-bold text-gray-500 dark:text-slate-400">Alt Ürün Grubu</label>
                <select
                  value={selectedSubCategory}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setSelectedSubCategory(val);
                    setFormData({ ...formData, categoryId: val === 0 ? selectedMainCategory : val });
                  }}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none dark:text-white text-sm font-medium"
                >
                  <option value={0}>
                    {categories.some(c => c.parentCategoryId === selectedMainCategory)
                      ? "Seçiniz..."
                      : "Bu kategorinin alt grubu yoktur"
                    }
                  </option>
                  {categories
                    .filter(c => c.parentCategoryId === selectedMainCategory)
                    .map(cat => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))
                  }
                </select>
              </div>
            )}

            {/* SEVİYE 3: 2. ALT KATEGORİ SEÇİMİ (Grandchild) */}
            {/* Eğer SubCategory seçiliyse ve onun da çocukları varsa göster */}
            {selectedSubCategory !== 0 && categories.some(c => c.parentCategoryId === selectedSubCategory) && (
              <div className="space-y-1.5 animate-in slide-in-from-top-2 fade-in duration-300">
                <label className="text-xs font-bold text-gray-500 dark:text-slate-400">Model / Çeşit</label>
                <select
                  value={
                    // Eğer formdaki ID gerçekten bu seviyenin bir elemanıysa onu göster, yoksa 0 (Seçiniz)
                    (categories.find(c => c.id === formData.categoryId)?.parentCategoryId === selectedSubCategory)
                      ? formData.categoryId
                      : 0
                  }
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    // 0 seçerse bir üst seviyeye (selectedSubCategory) dön
                    setFormData({ ...formData, categoryId: val === 0 ? selectedSubCategory : val });
                  }}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none dark:text-white text-sm font-medium"
                >
                  <option value={0}>Model Seçiniz...</option>
                  {categories
                    .filter(c => c.parentCategoryId === selectedSubCategory)
                    .map(cat => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))
                  }
                </select>
              </div>
            )}

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