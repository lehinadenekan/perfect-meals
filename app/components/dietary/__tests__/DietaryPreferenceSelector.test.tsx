import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { axe } from 'jest-axe';
import DietaryPreferenceSelector from '../DietaryPreferenceSelector';
import { server } from '@/src/mocks/server';
import { rest } from 'msw';
import { useSession } from 'next-auth/react';
import { usePreferenceUpdates } from '@/app/hooks/usePreferenceUpdates';
import {
  mockLocalStorage,
  mockSession,
  mockPreferences,
  resetMocks,
  setupLocalStorage,
  DietaryPreferences
} from './test-utils';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';

// Mock next-auth
jest.mock('next-auth/react', () => ({
  useSession: jest.fn(() => mockSession.unauthenticated),
  signIn: jest.fn(),
  signOut: jest.fn(),
}));

// Mock the hooks
jest.mock('@/app/hooks/usePreferenceUpdates', () => ({
  usePreferenceUpdates: jest.fn(() => ({
    updatePreferences: jest.fn()
  }))
}));

// Mock child components
jest.mock('../GeographicFilter', () => ({
  __esModule: true,
  default: jest.fn(() => (
    <div data-testid="mock-geographic-filter">
      <button onClick={() => {}}>Select US</button>
    </div>
  ))
}));

jest.mock('../recipe/MealCarousel', () => ({
  __esModule: true,
  default: jest.fn(() => <div data-testid="mock-meal-carousel" />)
}));

// Setup localStorage mock
Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });

interface PreferenceResponse {
  dietTypes: string[];
  excludedFoods: string[];
  selectedRegions: string[];
  searchInput: string;
}

describe('DietaryPreferenceSelector', () => {
  beforeAll(() => {
    server.listen();
  });

  beforeEach(() => {
    resetMocks();
    (useSession as jest.Mock).mockClear();
    (usePreferenceUpdates as jest.Mock).mockClear();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  describe('Accessibility', () => {
    it('should not have any accessibility violations', async () => {
      const { container } = render(<DietaryPreferenceSelector />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('supports keyboard navigation', async () => {
      render(<DietaryPreferenceSelector />);
      const buttons = screen.getAllByRole('button');
      
      // Focus first button
      buttons[0].focus();
      expect(document.activeElement).toBe(buttons[0]);

      // Test arrow key navigation
      await userEvent.keyboard('{ArrowRight}');
      expect(document.activeElement).toBe(buttons[1]);
      
      await userEvent.keyboard('{ArrowDown}');
      const bottomRowIndex = buttons.length / 2;
      expect(document.activeElement).toBe(buttons[bottomRowIndex]);
    });
  });

  describe('Loading States', () => {
    it('shows loading state while fetching preferences', async () => {
      server.use(
        rest.get('http://localhost:3000/api/preferences', (req, res, ctx) => {
          return res(ctx.delay(100), ctx.json(mockPreferences));
        })
      );

      render(<DietaryPreferenceSelector />);
      expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
      
      await waitFor(() => {
        expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
      });
    });

    it('shows error state when preferences fetch fails', async () => {
      server.use(
        rest.get('http://localhost:3000/api/preferences', (req, res, ctx) => {
          return res(ctx.status(500));
        })
      );

      render(<DietaryPreferenceSelector />);
      
      await waitFor(() => {
        expect(screen.getByText(/error loading preferences/i)).toBeInTheDocument();
      });
    });
  });

  describe('Preference Management', () => {
    it('loads and displays dietary preferences', async () => {
      setupLocalStorage();
      render(<DietaryPreferenceSelector />);

      await waitFor(() => {
        expect(screen.getByText('Vegan')).toBeInTheDocument();
        expect(screen.getByText('Gluten-free')).toBeInTheDocument();
      });
    });

    it('allows selecting dietary preferences', async () => {
      render(<DietaryPreferenceSelector />);

      await waitFor(() => {
        const veganButton = screen.getByText('Vegan');
        expect(veganButton).toBeInTheDocument();
        fireEvent.click(veganButton);
        expect(veganButton.closest('[role="button"]')).toHaveClass('border-yellow-400');
      });
    });

    it('saves preferences when user is logged in', async () => {
      (useSession as jest.Mock).mockReturnValue(mockSession.authenticated);

      let savedPreferences: DietaryPreferences | null = null;
      server.use(
        rest.post('http://localhost:3000/api/preferences', async (req, res, ctx) => {
          savedPreferences = await req.json();
          return res(ctx.json({ success: true }));
        })
      );

      render(<DietaryPreferenceSelector />);

      await waitFor(() => {
        const veganButton = screen.getByText('Vegan');
        fireEvent.click(veganButton);
      });

      await waitFor(() => {
        expect(savedPreferences).toHaveProperty('dietTypes', ['vegan']);
      });
    });

    it('saves preferences to localStorage when user is not logged in', async () => {
      render(<DietaryPreferenceSelector />);

      await waitFor(() => {
        const veganButton = screen.getByText('Vegan');
        fireEvent.click(veganButton);
      });

      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        'dietary-preferences-selected-diets',
        JSON.stringify(['vegan'])
      );
    });

    it('clears all preferences when clear button is clicked', async () => {
      setupLocalStorage();
      render(<DietaryPreferenceSelector />);

      const clearButton = screen.getByRole('button', { name: /clear/i });
      await userEvent.click(clearButton);

      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('dietary-preferences-selected-diets');
      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('dietary-preferences-excluded-foods');
      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('dietary-preferences-selected-regions');
      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('dietary-preferences-search-input');
    });
  });

  describe('Recipe Generation', () => {
    it('generates recipes based on selected preferences', async () => {
      setupLocalStorage();
      render(<DietaryPreferenceSelector />);

      const generateButton = screen.getByRole('button', { name: /generate recipes/i });
      await userEvent.click(generateButton);

      await waitFor(() => {
        expect(screen.getByTestId('mock-meal-carousel')).toBeInTheDocument();
      });
    });

    it('handles recipe generation errors', async () => {
      server.use(
        rest.post('http://localhost:3000/api/recipes/generate', (req, res, ctx) => {
          return res(ctx.status(500));
        })
      );

      render(<DietaryPreferenceSelector />);

      const generateButton = screen.getByRole('button', { name: /generate recipes/i });
      await userEvent.click(generateButton);

      await waitFor(() => {
        expect(screen.getByText(/error generating recipes/i)).toBeInTheDocument();
      });
    });
  });

  describe('Preference Combinations', () => {
    it('handles multiple diet selections', async () => {
      render(<DietaryPreferenceSelector />);

      const veganButton = screen.getByText('Vegan');
      const glutenFreeButton = screen.getByText('Gluten-free');

      await userEvent.click(veganButton);
      await userEvent.click(glutenFreeButton);

      expect(mockLocalStorage.setItem).toHaveBeenLastCalledWith(
        'dietary-preferences-selected-diets',
        JSON.stringify(['vegan', 'gluten-free'])
      );
    });

    it('handles diet and region combinations', async () => {
      render(<DietaryPreferenceSelector />);

      const veganButton = screen.getByText('Vegan');
      await userEvent.click(veganButton);

      const regionButton = screen.getByText('Select US');
      await userEvent.click(regionButton);

      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        'dietary-preferences-selected-diets',
        JSON.stringify(['vegan'])
      );
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        'dietary-preferences-selected-regions',
        JSON.stringify(['US'])
      );
    });

    it('handles excluded foods with diet types', async () => {
      render(<DietaryPreferenceSelector />);
      
      // Select diet type
      const veganButton = screen.getByText('Vegan');
      await userEvent.click(veganButton);

      // Add excluded food
      const excludedFoodInput = screen.getByPlaceholderText(/enter foods to exclude/i);
      await userEvent.type(excludedFoodInput, 'mushrooms{enter}');

      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        'dietary-preferences-selected-diets',
        JSON.stringify(['vegan'])
      );
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        'dietary-preferences-excluded-foods',
        JSON.stringify(['mushrooms'])
      );
    });
  });

  describe('Concurrent Updates', () => {
    it('handles rapid preference updates correctly', async () => {
      const updatePreferences = jest.fn().mockResolvedValue({ success: true });
      (usePreferenceUpdates as jest.Mock).mockReturnValue({
        updatePreferences
      });

      render(<DietaryPreferenceSelector />);

      // Simulate rapid updates
      const veganButton = screen.getByText('Vegan');
      const glutenFreeButton = screen.getByText('Gluten-free');

      await Promise.all([
        userEvent.click(veganButton),
        userEvent.click(glutenFreeButton)
      ]);

      // Should batch the updates
      await waitFor(() => {
        expect(updatePreferences).toHaveBeenCalledTimes(2);
      });
    });

    it('handles concurrent API responses correctly', async () => {
      let requestCount = 0;
      server.use(
        rest.post('http://localhost:3000/api/preferences', async (req, res, ctx) => {
          requestCount++;
          // Simulate varying response times
          await new Promise(resolve => setTimeout(resolve, requestCount * 100));
          return res(ctx.json({ success: true }));
        })
      );

      render(<DietaryPreferenceSelector />);

      const veganButton = screen.getByText('Vegan');
      const glutenFreeButton = screen.getByText('Gluten-free');

      // Click buttons in quick succession
      await userEvent.click(veganButton);
      await userEvent.click(glutenFreeButton);

      // Wait for all updates to complete
      await waitFor(() => {
        expect(requestCount).toBe(2);
      });

      // Last state should be correct
      expect(mockLocalStorage.setItem).toHaveBeenLastCalledWith(
        'dietary-preferences-selected-diets',
        JSON.stringify(['vegan', 'gluten-free'])
      );
    });

    it('maintains consistency during rapid region changes', async () => {
      render(<DietaryPreferenceSelector />);

      // Simulate rapid region selections
      const regionButton = screen.getByText('Select US');
      
      for (let i = 0; i < 5; i++) {
        await userEvent.click(regionButton);
      }

      // Should maintain consistent state
      await waitFor(() => {
        const lastCall = mockLocalStorage.setItem.mock.calls.slice(-1)[0];
        expect(lastCall[0]).toBe('dietary-preferences-selected-regions');
        const regions = JSON.parse(lastCall[1]);
        expect(regions).toHaveLength(1); // Should not have duplicates
        expect(regions).toContain('US');
      });
    });
  });

  describe('Snapshot Testing', () => {
    it('renders correctly in initial state', () => {
      const tree = renderer
        .create(<DietaryPreferenceSelector />)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('renders correctly with preferences loaded', () => {
      setupLocalStorage(mockPreferences);
      const tree = renderer
        .create(<DietaryPreferenceSelector />)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('renders correctly in error state', () => {
      server.use(
        rest.get('http://localhost:3000/api/preferences', (req, res, ctx) => {
          return res(ctx.status(500));
        })
      );
      const tree = renderer
        .create(<DietaryPreferenceSelector />)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('Performance', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('debounces preference updates', async () => {
      const updatePreferences = jest.fn().mockResolvedValue({ success: true });
      (usePreferenceUpdates as jest.Mock).mockReturnValue({
        updatePreferences
      });

      render(<DietaryPreferenceSelector />);

      // Simulate multiple rapid updates
      const veganButton = screen.getByText('Vegan');
      
      for (let i = 0; i < 5; i++) {
        await userEvent.click(veganButton);
        jest.advanceTimersByTime(100); // Advance time by 100ms
      }

      jest.runAllTimers();

      // Should have debounced the updates
      expect(updatePreferences).toHaveBeenCalledTimes(1);
    });

    it('optimizes recipe generation for large preference sets', async () => {
      setupLocalStorage({
        ...mockPreferences,
        dietTypes: ['vegan', 'gluten-free', 'lactose-free', 'nut-free'],
        excludedFoods: ['mushrooms', 'soy', 'corn', 'wheat'],
        selectedRegions: ['asian', 'mediterranean', 'mexican']
      });

      const startTime = performance.now();
      render(<DietaryPreferenceSelector />);
      
      const generateButton = screen.getByRole('button', { name: /generate recipes/i });
      await userEvent.click(generateButton);

      const endTime = performance.now();
      const renderTime = endTime - startTime;

      // Rendering with many preferences should still be fast
      expect(renderTime).toBeLessThan(1000); // 1 second threshold
    });

    it('handles large numbers of excluded foods efficiently', async () => {
      const manyExcludedFoods = Array.from({ length: 100 }, (_, i) => `food-${i}`);
      
      setupLocalStorage({
        ...mockPreferences,
        excludedFoods: manyExcludedFoods
      });

      const startTime = performance.now();
      render(<DietaryPreferenceSelector />);
      const endTime = performance.now();

      expect(endTime - startTime).toBeLessThan(500); // 500ms threshold
    });
  });

  describe('API Integration', () => {
    it('integrates with preferences API correctly', async () => {
      const responses: PreferenceResponse[] = [];
      server.use(
        rest.post('http://localhost:3000/api/preferences', async (req, res, ctx) => {
          const body = await req.json();
          responses.push(body);
          return res(ctx.json({ success: true }));
        })
      );

      (useSession as jest.Mock).mockReturnValue(mockSession.authenticated);
      render(<DietaryPreferenceSelector />);

      // Make multiple preference changes
      const veganButton = screen.getByText('Vegan');
      const glutenFreeButton = screen.getByText('Gluten-free');
      const excludedFoodInput = screen.getByPlaceholderText(/enter foods to exclude/i);

      await userEvent.click(veganButton);
      await userEvent.click(glutenFreeButton);
      await userEvent.type(excludedFoodInput, 'mushrooms{enter}');

      await waitFor(() => {
        expect(responses).toHaveLength(3);
        expect(responses[responses.length - 1]).toEqual({
          dietTypes: ['vegan', 'gluten-free'],
          excludedFoods: ['mushrooms'],
          selectedRegions: [],
          searchInput: ''
        });
      });
    });

    it('handles API errors gracefully', async () => {
      server.use(
        rest.post('http://localhost:3000/api/preferences', (req, res, ctx) => {
          return res(ctx.status(500), ctx.json({ error: 'Internal Server Error' }));
        })
      );

      (useSession as jest.Mock).mockReturnValue(mockSession.authenticated);
      render(<DietaryPreferenceSelector />);

      const veganButton = screen.getByText('Vegan');
      await userEvent.click(veganButton);

      await waitFor(() => {
        expect(screen.getByText(/error saving preferences/i)).toBeInTheDocument();
      });

      // Should fall back to localStorage
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        'dietary-preferences-selected-diets',
        JSON.stringify(['vegan'])
      );
    });

    it('retries failed API calls with exponential backoff', async () => {
      let attempts = 0;
      server.use(
        rest.post('http://localhost:3000/api/preferences', (req, res, ctx) => {
          attempts++;
          if (attempts <= 2) {
            return res(ctx.status(503), ctx.json({ error: 'Service Unavailable' }));
          }
          return res(ctx.json({ success: true }));
        })
      );

      (useSession as jest.Mock).mockReturnValue(mockSession.authenticated);
      render(<DietaryPreferenceSelector />);

      const veganButton = screen.getByText('Vegan');
      await userEvent.click(veganButton);

      await waitFor(() => {
        expect(attempts).toBe(3);
      }, { timeout: 5000 });
    });

    it('maintains data consistency across API calls', async () => {
      const savedState: Partial<PreferenceResponse> = {};
      server.use(
        rest.post('http://localhost:3000/api/preferences', async (req, res, ctx) => {
          const body = await req.json();
          Object.assign(savedState, body);
          return res(ctx.json({ success: true }));
        }),
        rest.get('http://localhost:3000/api/preferences', (req, res, ctx) => {
          return res(ctx.json(savedState));
        })
      );

      (useSession as jest.Mock).mockReturnValue(mockSession.authenticated);
      const { rerender } = render(<DietaryPreferenceSelector />);

      // Make changes
      const veganButton = screen.getByText('Vegan');
      await userEvent.click(veganButton);

      // Unmount and remount to test persistence
      rerender(<></>);
      rerender(<DietaryPreferenceSelector />);

      await waitFor(() => {
        const veganButtonAfterRerender = screen.getByText('Vegan');
        expect(veganButtonAfterRerender.closest('[role="button"]')).toHaveClass('border-yellow-400');
      });
    });
  });
});