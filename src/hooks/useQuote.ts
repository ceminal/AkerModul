import { useState } from 'react';
import { AppState, AppStep, ProjectType, SelectedPaint } from '../types';
import { INITIAL_ROOMS, PAINT_PRODUCTS, PRICING_PARAMS } from '../constants';

const INITIAL_STATE: AppState = {
  step: AppStep.CUSTOMER_INFO,
  customer: {
    name: '',
    surname: '',
    companyName: '',
    // projectName (interface definition check needed? Assuming it's not strictly required by AppState based on previous context, but usage showed it)
  },
  projectType: null as unknown as ProjectType,
  mainCategory: null,
  subCategory: [],
  roomCount: '2+1',
  furnishingStatus: 'Empty',
  scope: 'Whole',
  // Deep copy for initial rooms to prevent reference issues on reset
  selectedRooms: INITIAL_ROOMS.map(r => ({ ...r })),
  selectedPaints: [],
  projectDetails: [],
  squareMeter: null,
};

export const useQuote = () => {
  const [state, setState] = useState<AppState>(INITIAL_STATE);

  const nextStep = () => setState(prev => ({ ...prev, step: Math.min(prev.step + 1, AppStep.QUOTE) }));
  const prevStep = () => setState(prev => ({ ...prev, step: Math.max(prev.step - 1, AppStep.CUSTOMER_INFO) }));
  const goToStep = (step: AppStep) => setState(prev => ({ ...prev, step }));

  // Reset function
  const resetState = () => {
    setState({
      ...INITIAL_STATE,
      selectedRooms: INITIAL_ROOMS.map(r => ({ ...r })) // Fresh copy of rooms
    });
  };

  const updateState = <K extends keyof AppState>(key: K, value: AppState[K]) => {
    setState(prev => ({ ...prev, [key]: value }));
  };

  const calculatePrice = () => {
    // 1. Seçilen Boyaların Fiyatlarını ve Miktarlarını Bul
    let totalPaintPrice = 0;
    let totalQuantity = 0;

    if (state.selectedPaints.length === 0) {
      // Hiçbiri seçilmediyse varsayılan
      totalPaintPrice = 250;
      totalQuantity = 1;
    } else {
      state.selectedPaints.forEach(item => {
        const product = PAINT_PRODUCTS.find(p => p.id === item.id);
        if (product) {
          totalPaintPrice += product.pricePerLiter * item.quantity;
          totalQuantity += item.quantity;
        }
      });
    }

    // Ağırlıklı Ortalama Litre Fiyatı
    const averagePricePerLiter = totalPaintPrice / totalQuantity;

    // 2. Alan Hesabı
    const totalWallArea = PRICING_PARAMS.roomSizes[state.roomCount];

    // 3. Malzeme Maliyeti
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

  return { state, nextStep, prevStep, goToStep, updateState, resetState, calculatePrice };
};