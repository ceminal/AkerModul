export enum AppStep {
  PROJECT_TYPE = 0,
  HOME_DETAILS = 1,
  SCOPE = 2,
  PAINT_SELECTION = 3,
  QUOTE = 4,
}

export type ProjectType = 'Residential' | 'Commercial';
export type RoomCount = '1+0' | '1+1' | '2+1' | '3+1' | '4+1' | '5+1+';
export type FurnishingStatus = 'Empty' | 'Furnished';
export type ScopeType = 'Whole' | 'Regional';

export interface Room {
  id: string;
  name: string;
  walls: boolean;
  ceiling: boolean;
}

export interface SelectedPaint {
  id: string;
  quantity: number;
}

export interface AppState {
  step: AppStep;
  projectType: ProjectType;
  roomCount: RoomCount;
  furnishingStatus: FurnishingStatus;
  scope: ScopeType;
  selectedRooms: Room[];
  // DEĞİŞİKLİK: ID dizisi yerine obje dizisi
  selectedPaints: SelectedPaint[];
}