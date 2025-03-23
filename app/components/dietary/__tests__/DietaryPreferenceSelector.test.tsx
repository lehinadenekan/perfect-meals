import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useSession } from 'next-auth/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import '@testing-library/jest-dom';
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
        status: 'unauthenticated'
      });
      mockLocalStorage.getItem.mockReturnValue(null);
    });

    it('renders correctly for unauthenticated users', async () => {
      render(<DietaryPreferenceSelector />);
      
      expect(screen.getByText('Choose Your Dietary Preferences')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Gluten-Free' })).toHaveAttribute('aria-pressed', 'false');
      expect(screen.getByRole('button', { name: 'Vegan' })).toHaveAttribute('aria-pressed', 'false');
    });

    it('loads preferences from local storage', async () => {
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
      
      await waitFor(() => {
        expect(screen.getByText('Selected Diets: Vegan, Gluten-free')).toBeInTheDocument();
        expect(screen.getByText('Excluded Foods: Peanuts')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Vegan' })).toHaveAttribute('aria-pressed', 'true');
        expect(screen.getByRole('button', { name: 'Gluten-Free' })).toHaveAttribute('aria-pressed', 'true');
      });
    });

    it('saves preferences to local storage when updated', async () => {
      mockLocalStorage.getItem.mockReturnValue(null);

      render(<DietaryPreferenceSelector />);
      
      const veganButton = screen.getByRole('button', { name: /vegan/i });
      fireEvent.click(veganButton);

      await waitFor(() => {
        expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
          'dietary-preferences-selected-diets',
          JSON.stringify(['vegan'])
        );
        expect(veganButton).toHaveAttribute('aria-pressed', 'true');
      });
    });
  });

  describe('Authenticated User', () => {
    beforeEach(() => {
      mockUseSession.mockReturnValue({
        data: {
          user: {
            id: 'test-user-id',
            email: 'test@example.com'
          }
        },
        status: 'authenticated'
      });
    });

    it('loads preferences from API for authenticated users', async () => {
      render(<DietaryPreferenceSelector />);
      
      await waitFor(() => {
        expect(screen.getByText('Selected Diets: Vegan, Gluten-free')).toBeInTheDocument();
        expect(screen.getByText('Excluded Foods: Peanuts')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Vegan' })).toHaveAttribute('aria-pressed', 'true');
        expect(screen.getByRole('button', { name: 'Gluten-Free' })).toHaveAttribute('aria-pressed', 'true');
      });
    });

    it('saves preferences to API when updated', async () => {
      render(<DietaryPreferenceSelector />);
      
      const veganButton = screen.getByRole('button', { name: /vegan/i });
      fireEvent.click(veganButton);

      await waitFor(() => {
        expect(screen.getByText('Saving preferences...')).toBeInTheDocument();
      });
    });

    it('clears preferences when clear button is clicked', async () => {
      render(<DietaryPreferenceSelector />);
      
      const clearButton = screen.getByRole('button', { name: /clear preferences/i });
      fireEvent.click(clearButton);

      await waitFor(() => {
        expect(screen.queryByText('Selected Diets: Vegan, Gluten-free')).not.toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Vegan' })).toHaveAttribute('aria-pressed', 'false');
        expect(screen.getByRole('button', { name: 'Gluten-Free' })).toHaveAttribute('aria-pressed', 'false');
      });
    });

    it('generates recipes when button is clicked', async () => {
      render(<DietaryPreferenceSelector />);

      // Wait for preferences to load
      await waitFor(() => {
        expect(screen.getByRole('button', { name: 'Vegan' })).toHaveAttribute('aria-pressed', 'true');
      });

      // Click the generate button
      const generateButton = screen.getByRole('button', { name: /Generate Meals/i });
      fireEvent.click(generateButton);

      // Check loading state
      expect(screen.getByText(/loading/i)).toBeInTheDocument();

      // Wait for recipe to appear
      await waitFor(() => {
        const recipeCard = screen.getByRole('article');
        expect(recipeCard).toBeInTheDocument();
        expect(recipeCard).toHaveTextContent('Vegan Pasta');
        expect(recipeCard).toHaveTextContent('A delicious vegan pasta dish');
      }, { timeout: 3000 });
    });
  });

  describe('Recipe Generation', () => {
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