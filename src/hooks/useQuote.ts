import { useState } from 'react';
import { AppState, AppStep } from '../types';
import { INITIAL_ROOMS, PAINT_PRODUCTS, PRICING_PARAMS } from '../constants';

export const useQuote = () => {
  const [state, setState] = useState<AppState>({
    step: AppStep.PROJECT_TYPE,
    projectType: 'Residential',
    roomCount: '2+1',
    furnishingStatus: 'Empty',
    scope: 'Whole',
    selectedRooms: INITIAL_ROOMS.map(r => ({ ...r })),
    selectedPaintIds: [], // Başlangıçta boş dizi
  });

  const nextStep = () => setState(prev => ({ ...prev, step: Math.min(prev.step + 1, AppStep.QUOTE) }));
  const prevStep = () => setState(prev => ({ ...prev, step: Math.max(prev.step - 1, AppStep.PROJECT_TYPE) }));
  const goToStep = (step: AppStep) => setState(prev => ({ ...prev, step }));

  const updateState = <K extends keyof AppState>(key: K, value: AppState[K]) => {
    setState(prev => ({ ...prev, [key]: value }));
  };

  const calculatePrice = () => {
    // 1. Seçilen Boyaları Bul
    const selectedPaints = PAINT_PRODUCTS.filter(p => state.selectedPaintIds.includes(p.id));
    
    // Eğer hiç boya seçilmediyse varsayılan bir fiyat al (Hata vermemesi için)
    const averagePricePerLiter = selectedPaints.length > 0
      ? selectedPaints.reduce((acc, curr) => acc + curr.pricePerLiter, 0) / selectedPaints.length
      : 250; // Varsayılan ortalama

    // 2. Alan Hesabı
    const totalWallArea = PRICING_PARAMS.roomSizes[state.roomCount];
    
    // 3. Malzeme Maliyeti (Ortalama litre fiyatına göre)
    const materialCost = totalWallArea * PRICING_PARAMS.paintConsumption * averagePricePerLiter;

    // 4. İşçilik
    let laborCost = 0;
    const estimatedRooms = parseInt(state.roomCount.split('+')[0]) + 1;

    if (state.scope === 'Whole') {
      laborCost = estimatedRooms * PRICING_PARAMS.laborCostPerRoom;
      laborCost += estimatedRooms * PRICING_PARAMS.ceilingCostPerRoom;
    } else {
      state.selectedRooms.forEach(room => {
        if (room.walls) laborCost += PRICING_PARAMS.laborCostPerRoom;
        if (room.ceiling) laborCost += PRICING_PARAMS.ceilingCostPerRoom;
      });
    }

    if (state.furnishingStatus === 'Furnished') {
      laborCost *= 1.30;
    }

    return Math.round(materialCost + laborCost);
  };

  return { state, nextStep, prevStep, goToStep, updateState, calculatePrice };
};