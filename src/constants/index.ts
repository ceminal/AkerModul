import {
  Home,
  Building2,
  LayoutPanelLeft,
  Paintbrush,
  CheckCircle2
} from 'lucide-react';
import { Room } from '../types';

export const STEPS = [
  { id: 0, title: 'Proje', icon: Home },
  { id: 1, title: 'Detay', icon: Building2 },
  { id: 2, title: 'Kapsam', icon: LayoutPanelLeft },
  { id: 3, title: 'Boya', icon: Paintbrush },
  { id: 4, title: 'Teklif', icon: CheckCircle2 },
];

export const INITIAL_ROOMS: Room[] = [
  { id: 'living', name: 'Salon', walls: false, ceiling: false },
  { id: 'kitchen', name: 'Mutfak', walls: false, ceiling: false },
  { id: 'hall', name: 'Antre / Koridor', walls: false, ceiling: false },
  { id: 'bedroom1', name: 'Yatak Odası', walls: false, ceiling: false },
  { id: 'bedroom2', name: 'Çocuk Odası', walls: false, ceiling: false },
  { id: 'bath', name: 'Banyo', walls: false, ceiling: false },
];

// --- YENİ EKLENEN KISIM: BOYA ÜRÜNLERİ ---
export const PAINT_PRODUCTS = [
  // MARSHALL GRUBU
  { id: 'mar-001', brand: 'Marshall', name: 'Sil-Pak', pricePerLiter: 280, features: ['Tam Silinebilir', 'Leke Tutmaz'], colorCode: 'bg-orange-500' },
  { id: 'mar-002', brand: 'Marshall', name: 'Maximum', pricePerLiter: 260, features: ['2 Kat Örtücülük', 'Silikonlu'], colorCode: 'bg-orange-500' },
  { id: 'mar-003', brand: 'Marshall', name: 'Antibakteriyel', pricePerLiter: 310, features: ['Hijyenik', 'Kokusuz'], colorCode: 'bg-orange-500' },
  { id: 'mar-004', brand: 'Marshall', name: 'Fit İç Cephe', pricePerLiter: 220, features: ['Ekonomik', 'Mat'], colorCode: 'bg-orange-500' },

  // FİLLİ BOYA GRUBU
  { id: 'fil-001', brand: 'Filli Boya', name: 'Momento Silan', pricePerLiter: 350, features: ['Yıkanabilir', 'İpeksi Mat'], colorCode: 'bg-cyan-600' },
  { id: 'fil-002', brand: 'Filli Boya', name: 'Momento Max', pricePerLiter: 330, features: ['Mat', 'Soft Doku'], colorCode: 'bg-cyan-600' },
  { id: 'fil-003', brand: 'Filli Boya', name: 'Alpina Teknos', pricePerLiter: 290, features: ['Dönüşüm Astarı', 'Silikonlu'], colorCode: 'bg-cyan-600' },
  { id: 'fil-004', brand: 'Filli Boya', name: 'Aqusto Silan', pricePerLiter: 360, features: ['Su Bazlı', 'Yarı Mat'], colorCode: 'bg-cyan-600' },

  // JOTUN GRUBU
  { id: 'jot-001', brand: 'Jotun', name: 'Fenomastic Güzel Evim', pricePerLiter: 680, features: ['Zengin Renk', 'Mat'], colorCode: 'bg-blue-900' },
  { id: 'jot-002', brand: 'Jotun', name: 'Fenomastic Zen', pricePerLiter: 720, features: ['Mat Doku', 'Silinebilir'], colorCode: 'bg-blue-900' },
  { id: 'jot-003', brand: 'Jotun', name: 'Lady Effects', pricePerLiter: 850, features: ['Dekoratif', 'Sedef'], colorCode: 'bg-blue-900' },

  // NIPPON PAINT
  { id: 'nip-001', brand: 'Nippon Paint', name: 'Leona İpek Mat', pricePerLiter: 550, features: ['Kadifemsi', 'Dayanıklı'], colorCode: 'bg-red-600' },
  { id: 'nip-002', brand: 'Nippon Paint', name: 'Moss', pricePerLiter: 480, features: ['İç Cephe', 'Mat'], colorCode: 'bg-red-600' },

  // POLİSAN
  { id: 'pol-001', brand: 'Polisan', name: 'Elegans', pricePerLiter: 300, features: ['Yarı Mat', 'Küf Önleyici'], colorCode: 'bg-purple-600' },
  { id: 'pol-002', brand: 'Polisan', name: 'Primera', pricePerLiter: 240, features: ['Ekonomik', 'Plastik'], colorCode: 'bg-purple-600' },
];

// --- HESAPLAMA PARAMETRELERİ ---
export const PRICING_PARAMS = {
  laborCostPerRoom: 1500, // Oda başı işçilik
  ceilingCostPerRoom: 600, // Oda başı tavan boyama
  paintConsumption: 0.3, // m2 başına litre sarfiyatı (çift kat)
  // Ortalama Oda Büyüklükleri (Duvar m2 olarak)
  roomSizes: {
    '1+0': 120,
    '1+1': 160,
    '2+1': 220,
    '3+1': 280,
    '4+1': 340,
    '5+1+': 400
  }
};