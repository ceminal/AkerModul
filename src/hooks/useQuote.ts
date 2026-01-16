import { useState } from 'react';
import { AppState, AppStep, ProjectType } from '../types';
import { INITIAL_ROOMS, PRICING } from '../constants';

export const useQuote = () => {
  const [state, setState] = useState<AppState>({
    step: AppStep.PROJECT_TYPE,
    projectType: 'Residential',
    roomCount: '2+1',
    furnishingStatus: 'Empty',
    scope: 'Whole',
    selectedRooms: INITIAL_ROOMS.map(r => ({ ...r })),
    paintQuality: 'Standard',
  });

  const nextStep = () => setState(prev => ({ ...prev, step: Math.min(prev.step + 1, AppStep.QUOTE) }));
  const prevStep = () => setState(prev => ({ ...prev, step: Math.max(prev.step - 1, AppStep.PROJECT_TYPE) }));
  const goToStep = (step: AppStep) => setState(prev => ({ ...prev, step }));

  const updateState = <K extends keyof AppState>(key: K, value: AppState[K]) => {
    setState(prev => ({ ...prev, [key]: value }));
  };

  const calculatePrice = () => {
    let total = 0;
    if (state.scope === 'Whole') {
      const base = PRICING.base[state.projectType];
      const multiplier = PRICING.roomMultiplier[state.roomCount];
      total = base * multiplier;
      if (state.furnishingStatus === 'Furnished') total *= PRICING.furnishingMarkup;
    } else {
      state.selectedRooms.forEach(room => {
        if (room.walls) total += PRICING.regionalRates.wall;
        if (room.ceiling) total += PRICING.regionalRates.ceiling;
      });
      if (state.furnishingStatus === 'Furnished') total *= 1.15;
    }
    return total * PRICING.paintMultiplier[state.paintQuality];
  };

  return {
    state,
    nextStep,
    prevStep,
    goToStep,
    updateState,
    calculatePrice
  };
};