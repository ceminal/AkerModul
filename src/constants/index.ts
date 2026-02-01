import {
  Home,
  Building2,
  LayoutPanelLeft,
  Paintbrush,
  CheckCircle2,
  Briefcase
} from 'lucide-react';
import { Room, RoomCount } from '../types';

// --- ADIMLAR ---
export const STEPS = [
  { id: 0, title: 'Kategori', icon: Briefcase },
  { id: 1, title: 'Proje', icon: Home },
  { id: 2, title: 'Detay', icon: Building2 },
  { id: 3, title: 'Kapsam', icon: LayoutPanelLeft },
  { id: 4, title: 'Ürün', icon: Paintbrush },
  { id: 5, title: 'Teklif', icon: CheckCircle2 },
];

// --- EKSİK OLAN KISIM EKLENDİ: ODA SEÇENEKLERİ ---
export const ROOM_OPTIONS: { id: RoomCount; label: string; area: number }[] = [
  { id: '1+0', label: '1+0', area: 40 },
  { id: '1+1', label: '1+1', area: 65 },
  { id: '2+1', label: '2+1', area: 95 },
  { id: '3+1', label: '3+1', area: 125 },
  { id: '4+1', label: '4+1', area: 160 },
  { id: 'Villa', label: 'Villa', area: 250 },
];

// --- VARSAYILAN ODALAR ---
export const INITIAL_ROOMS: Room[] = [
  { id: 'living', name: 'Salon', walls: false, ceiling: false },
  { id: 'kitchen', name: 'Mutfak', walls: false, ceiling: false },
  { id: 'hall', name: 'Antre / Koridor', walls: false, ceiling: false },
  { id: 'bedroom1', name: 'Yatak Odası', walls: false, ceiling: false },
  { id: 'bedroom2', name: 'Çocuk Odası', walls: false, ceiling: false },
  { id: 'bath', name: 'Banyo', walls: false, ceiling: false },
];

// --- BOYA ÜRÜNLERİ ---
export const PAINT_PRODUCTS = [
  // MARSHALL GRUBU
  { id: 'mar-001', brand: 'Marshall', name: 'Sil-Pak', pricePerLiter: 280, features: ['Tam Silinebilir', 'Leke Tutmaz'], colorCode: 'bg-orange-500' },
  { id: 'mar-002', brand: 'Marshall', name: 'Maximum', pricePerLiter: 260, features: ['2 Kat Örtücülük', 'Silikonlu'], colorCode: 'bg-orange-500' },
  { id: 'mar-003', brand: 'Marshall', name: 'Antibakteriyel', pricePerLiter: 310, features: ['Hijyenik', 'Kokusuz'], colorCode: 'bg-orange-500' },
  { id: 'mar-004', brand: 'Marshall', name: 'Fit İç Cephe', pricePerLiter: 220, features: ['Ekonomik', 'Mat'], colorCode: 'bg-orange-500' },

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
  // NOT: Buradaki anahtarlar (keys) ROOM_OPTIONS içindeki id'ler ile aynı olmalı.
  roomSizes: {
    '1+0': 120,
    '1+1': 160,
    '2+1': 220,
    '3+1': 280,
    '4+1': 340,
    'Villa': 500 // '5+1+' yerine 'Villa' olarak güncelledim ki ROOM_OPTIONS ile uyuşsun
  } as Record<RoomCount, number>
};