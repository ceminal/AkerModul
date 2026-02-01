export enum AppStep {
  CUSTOMER_INFO = 0,
  CATEGORY = 1,
  PROJECT_TYPE = 2,
  HOME_DETAILS = 3,
  SCOPE = 4,
  PAINT_SELECTION = 5,
  QUOTE = 6,
}

export type SquareMeterRange = 
  | '0-50 m²' 
  | '50-100 m²' 
  | '100-200 m²' 
  | '200-500 m²' 
  | '500-1000 m²' 
  | '1000+ m²';

export type MainCategory = 'Malzeme' | 'Taahhüt';
export type MaterialSubCategory = 
  | 'İklimlendirme' 
  | 'Vitrifiye' 
  | 'Seramik' 
  | 'Boya' 
  | 'Diğer'
  | null;
export type ProjectType = 'Residential' | 'Commercial' | 'Industrial' | 'Construction';
export type RoomCount = '1+0' | '1+1' | '2+1' | '3+1' | '4+1' | 'Villa';
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
  customer: {
    name: string;
    surname: string;
    companyName: string;
  };
  projectType: ProjectType;
  projectDetails: string[];
  mainCategory: MainCategory | null; 
  subCategory: MaterialSubCategory[];
  roomCount: RoomCount;
  furnishingStatus: FurnishingStatus;
  scope: ScopeType;
  selectedRooms: Room[];
  squareMeter: SquareMeterRange | null;
  // DEĞİŞİKLİK: ID dizisi yerine obje dizisi
  selectedPaints: SelectedPaint[];
}