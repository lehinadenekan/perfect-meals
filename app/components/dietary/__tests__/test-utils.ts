import { DietType } from '@/types/diet';

export interface DietaryPreferences {
  dietTypes: DietType[];
  excludedFoods: string[];
  selectedRegions: string[];
  searchInput: string;
}

export const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn()
};

export const mockSession = {
  authenticated: {
    data: { user: { email: 'test@example.com' } },
    status: 'authenticated' as const
  },
  unauthenticated: {
    data: null,
    status: 'unauthenticated' as const
  }
};

export const mockPreferences: DietaryPreferences = {
  dietTypes: ['vegan', 'gluten-free'],
  excludedFoods: ['peanuts'],
  selectedRegions: ['asian'],
  searchInput: ''
};

export const resetMocks = () => {
  mockLocalStorage.getItem.mockClear();
  mockLocalStorage.setItem.mockClear();
  mockLocalStorage.removeItem.mockClear();
  mockLocalStorage.clear.mockClear();
};

export const setupLocalStorage = (preferences?: Partial<DietaryPreferences>) => {
  const stored = preferences ?? mockPreferences;
  mockLocalStorage.getItem.mockImplementation((key: string) => {
    switch (key) {
      case 'dietary-preferences-selected-diets':
        return JSON.stringify(stored.dietTypes);
      case 'dietary-preferences-excluded-foods':
        return JSON.stringify(stored.excludedFoods);
      case 'dietary-preferences-selected-regions':
        return JSON.stringify(stored.selectedRegions);
      case 'dietary-preferences-search-input':
        return stored.searchInput;
      default:
        return null;
    }
  });
}; 