import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useSession } from 'next-auth/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import DietaryPreferenceSelector from '../DietaryPreferenceSelector';
import { server } from '../../../../mocks/server';

// Mock next-auth
jest.mock('next-auth/react');
const mockUseSession = useSession as jest.Mock;

// Mock local storage
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });

expect.extend(toHaveNoViolations);

describe('DietaryPreferenceSelector Component', () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
    jest.clearAllMocks();
    mockLocalStorage.clear();
  });

  afterAll(() => {
    server.close();
  });

  describe('Unauthenticated User', () => {
    beforeEach(() => {
      mockUseSession.mockReturnValue({
        data: null,
        status: 'unauthenticated',
      });
    });

    it('renders correctly for unauthenticated users', () => {
      render(<DietaryPreferenceSelector />);
      
      expect(screen.getByText('Choose Your Dietary Preferences')).toBeInTheDocument();
      expect(screen.getByText('Log in to save your preferences')).toBeInTheDocument();
    });

    it('loads preferences from local storage', () => {
      const storedPreferences = {
        selectedDiets: ['vegan', 'gluten-free'],
        excludedFoods: ['peanuts'],
        selectedRegions: ['asian'],
        searchInput: 'tofu',
      };

      type StorageKey = 'dietary-preferences-selected-diets' | 'dietary-preferences-excluded-foods' | 'dietary-preferences-selected-regions' | 'dietary-preferences-search-input';
      
      const storageData: Record<StorageKey, string> = {
        'dietary-preferences-selected-diets': JSON.stringify(storedPreferences.selectedDiets),
        'dietary-preferences-excluded-foods': JSON.stringify(storedPreferences.excludedFoods),
        'dietary-preferences-selected-regions': JSON.stringify(storedPreferences.selectedRegions),
        'dietary-preferences-search-input': storedPreferences.searchInput,
      };

      mockLocalStorage.getItem.mockImplementation((key: StorageKey) => storageData[key]);

      render(<DietaryPreferenceSelector />);
      
      expect(screen.getByText('Selected Diets: Vegan, Gluten-Free')).toBeInTheDocument();
      expect(screen.getByText('Excluded Foods: Peanuts')).toBeInTheDocument();
    });

    it('saves preferences to local storage when updated', async () => {
      render(<DietaryPreferenceSelector />);
      
      const veganCard = screen.getByRole('button', { name: /vegan/i });
      fireEvent.click(veganCard);

      await waitFor(() => {
        expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
          'dietary-preferences-selected-diets',
          JSON.stringify(['vegan'])
        );
      });
    });
  });

  describe('Authenticated User', () => {
    beforeEach(() => {
      mockUseSession.mockReturnValue({
        data: { user: { email: 'test@example.com' } },
        status: 'authenticated',
      });
    });

    it('loads preferences from API for authenticated users', async () => {
      render(<DietaryPreferenceSelector />);
      
      await waitFor(() => {
        expect(screen.getByText('Selected Diets: Vegan, Gluten-Free')).toBeInTheDocument();
      });
    });

    it('saves preferences to API when updated', async () => {
      render(<DietaryPreferenceSelector />);
      
      const veganCard = screen.getByRole('button', { name: /vegan/i });
      fireEvent.click(veganCard);

      await waitFor(() => {
        expect(screen.getByText('Saving preferences...')).toBeInTheDocument();
      });
    });

    it('clears preferences when clear button is clicked', async () => {
      render(<DietaryPreferenceSelector />);
      
      const clearButton = screen.getByRole('button', { name: /clear preferences/i });
      fireEvent.click(clearButton);

      await waitFor(() => {
        expect(screen.queryByText(/Selected Diets:/)).not.toBeInTheDocument();
      });
    });
  });

  describe('Recipe Generation', () => {
    it('generates recipes when button is clicked', async () => {
      render(<DietaryPreferenceSelector />);
      
      const generateButton = screen.getByRole('button', { name: /generate meals/i });
      fireEvent.click(generateButton);

      await waitFor(() => {
        expect(screen.getByText('Vegan Pasta')).toBeInTheDocument();
      });
    });

    it('shows loading state during recipe generation', async () => {
      render(<DietaryPreferenceSelector />);
      
      const generateButton = screen.getByRole('button', { name: /generate meals/i });
      fireEvent.click(generateButton);

      expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });
  });

  describe('Keyboard Navigation', () => {
    it('supports keyboard navigation through diet cards', async () => {
      render(<DietaryPreferenceSelector />);
      
      const firstCard = screen.getAllByRole('button')[0];
      firstCard.focus();

      // Navigate right
      fireEvent.keyDown(firstCard, { key: 'ArrowRight' });
      expect(document.activeElement).toBe(screen.getAllByRole('button')[1]);

      // Navigate down
      fireEvent.keyDown(document.activeElement!, { key: 'ArrowDown' });
      expect(document.activeElement).toBe(screen.getAllByRole('button')[5]);
    });
  });

  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<DietaryPreferenceSelector />);
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('provides proper ARIA labels and roles', () => {
      render(<DietaryPreferenceSelector />);
      
      expect(screen.getByRole('region', { name: /dietary preferences selection/i })).toBeInTheDocument();
      expect(screen.getByRole('search')).toBeInTheDocument();
      expect(screen.getByRole('group', { name: /preference actions/i })).toBeInTheDocument();
    });
  });
}); 