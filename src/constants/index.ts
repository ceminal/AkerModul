import { 
  Home, 
  Building2, 
  LayoutPanelLeft, 
  Paintbrush, 
  CheckCircle2 
} from 'lucide-react';
import { Room } from '../types';

// --- EKLENEN KISIM BAŞLANGIÇ ---
export const STEPS = [
  { id: 0, title: 'Proje', icon: Home },
  { id: 1, title: 'Detay', icon: Building2 },
  { id: 2, title: 'Kapsam', icon: LayoutPanelLeft },
  { id: 3, title: 'Boya', icon: Paintbrush },
  { id: 4, title: 'Teklif', icon: CheckCircle2 },
];
// --- EKLENEN KISIM BİTİŞ ---

export const INITIAL_ROOMS: Room[] = [
  { id: 'living', name: 'Salon', walls: false, ceiling: false },
  { id: 'kitchen', name: 'Mutfak', walls: false, ceiling: false },
  { id: 'hall', name: 'Antre / Koridor', walls: false, ceiling: false },
  { id: 'bedroom1', name: 'Yatak Odası', walls: false, ceiling: false },
  { id: 'bedroom2', name: 'Çocuk Odası', walls: false, ceiling: false },
  { id: 'bath', name: 'Banyo', walls: false, ceiling: false },
];

export const PRICING = {
  base: { Residential: 5000, Commercial: 7000 },
  roomMultiplier: {
    '1+0': 1, '1+1': 1.5, '2+1': 2, '3+1': 2.5, '4+1': 3, '5+1+': 3.5,
  },
  furnishingMarkup: 1.25,
  paintMultiplier: { Economic: 1, Standard: 1.4, Premium: 2.0 },
  regionalRates: { wall: 1500, ceiling: 800 },
};