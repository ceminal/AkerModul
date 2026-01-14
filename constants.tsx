
import React from 'react';
import { Home, Building2, Paintbrush, Layout, Calculator, CheckCircle2 } from 'lucide-react';
import { RoomDetails } from './types';

export const STEPS = [
  { id: 0, title: 'Proje Tipi', icon: <Home size={18} /> },
  { id: 1, title: 'Ev Detayları', icon: <Layout size={18} /> },
  { id: 2, title: 'Alanlar', icon: <Paintbrush size={18} /> },
  { id: 3, title: 'Boya Seçimi', icon: <Calculator size={18} /> },
  { id: 4, title: 'Teklif', icon: <CheckCircle2 size={18} /> },
];

export const INITIAL_ROOMS: RoomDetails[] = [
  { id: 'living', name: 'Salon', walls: true, ceiling: true },
  { id: 'kitchen', name: 'Mutfak', walls: true, ceiling: true },
  { id: 'bedroom', name: 'Yatak Odası', walls: true, ceiling: true },
  { id: 'bathroom', name: 'Banyo', walls: true, ceiling: false },
  { id: 'hallway', name: 'Antre / Koridor', walls: true, ceiling: true },
  { id: 'kids', name: 'Çocuk Odası', walls: true, ceiling: true },
];

export const PRICING = {
  base: {
    Residential: 1200,
    Commercial: 2000
  },
  roomMultiplier: {
    '1+0': 1,
    '1+1': 1.5,
    '2+1': 2.2,
    '3+1': 3,
    '4+1': 3.8,
    '5+1+': 5
  },
  furnishingMarkup: 1.2, // 20% extra for labor if furnished
  paintMultiplier: {
    Economic: 1,
    Standard: 1.3,
    Premium: 1.8
  },
  regionalRates: {
    wall: 450,
    ceiling: 300
  }
};
