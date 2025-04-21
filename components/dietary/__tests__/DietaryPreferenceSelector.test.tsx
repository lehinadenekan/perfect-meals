import { render, screen, waitFor } from '@testing-library/react';
import { axe } from 'jest-axe';
import DietaryPreferenceSelector, { DietaryPreferenceSelectorProps } from '../DietaryPreferenceSelector';
import { server } from '@/src/mocks/server';
import { rest } from 'msw';
import { useSession } from 'next-auth/react';
import { usePreferenceUpdates } from '@/app/hooks/usePreferenceUpdates';
import {
  mockLocalStorage,
  mockSession,
  // mockPreferences, // Assuming this might use DietType[], remove if unused or update
  resetMocks,
  setupLocalStorage,
  // DietaryPreferences // Assuming this might use DietType[], remove if unused or update
} from './test-utils'; // Check test-utils for DietType usage if errors persist
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';
import React, { useState, Dispatch, SetStateAction } from 'react'; // Import Dispatch, SetStateAction
// Removed DietType import: import { DietType } from '@/types/diet';
import { Recipe } from '@/lib/types/recipe';
import { DIET_TYPES } from '@/types/diet'; // Keep this for mapping titles

// Mock next-auth (remains the same)
jest.mock('next-auth/react', () => ({
  useSession: jest.fn(() => mockSession.unauthenticated),
  signIn: jest.fn(),
  signOut: jest.fn(),
}));

// Mock the hooks (remains the same)
jest.mock('@/app/hooks/usePreferenceUpdates', () => ({
  usePreferenceUpdates: jest.fn(() => ({
    updatePreferences: jest.fn()
  }))
}));

// Mock child components (remain the same)
jest.mock('../GeographicFilter', () => ({
  __esModule: true,
  default: jest.fn(() => (
    <div data-testid="mock-geographic-filter">
      <button onClick={() => {}}>Select US</button> {/* Example interaction */}
    </div>
  ))
}));

jest.mock('../recipe/MealCarousel', () => ({
  __esModule: true,
  default: jest.fn(({ recipes }: { recipes: Recipe[] }) => ( // Accept recipes prop
    <div data-testid="mock-meal-carousel">{recipes.length} recipes</div>
  ))
}));

jest.mock('../ExcludedFoodsInput', () => ({ // Ensure mock name matches component
  __esModule: true,
  default: jest.fn(({ onExcludedFoodsChange }: { onExcludedFoodsChange: (foods: string[]) => void }) => (
    <div data-testid="mock-excluded-foods-input">
      <input placeholder="Enter foods to exclude" onChange={(e) => onExcludedFoodsChange(e.target.value.split(','))} />
    </div>
  ))
}));


// Setup localStorage mock (remains the same)
Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });

// Helper component to provide props
// --- Updated MockProvider ---
const MockProvider: React.FC<Partial<Omit<DietaryPreferenceSelectorProps, 'setSelectedDiets'> & { initialDiets?: string[] }>> = ({
  initialDiets = [], // Allow passing initial diets for testing
  excludedFoods: initialExcludedFoods = [],
  selectedRegions: initialSelectedRegions = [],
  recipes: initialRecipes = [],
  currentStep: initialCurrentStep = 1,
}) => {
  // --- CHANGE HERE: Use string[] for selectedDiets state ---
  const [selectedDiets, setSelectedDiets] = useState<string[]>(initialDiets);
  const [excludedFoods, setExcludedFoods] = useState<string[]>(initialExcludedFoods);
  const [selectedRegions, setSelectedRegions] = useState<string[]>(initialSelectedRegions);
  const [recipes, setRecipes] = useState<Recipe[]>(initialRecipes);
  const [currentStep, setCurrentStep] = useState<number>(initialCurrentStep);

  // --- Ensure props passed match the component's expected types ---
  const propsToPass: DietaryPreferenceSelectorProps = {
    selectedDiets,
    setSelectedDiets: setSelectedDiets as Dispatch<SetStateAction<string[]>>, // Cast if needed, but types should match now
    excludedFoods,
    setExcludedFoods,
    selectedRegions,
    setSelectedRegions,
    recipes,
    setRecipes,
    currentStep,
    setCurrentStep,
  };

  return <DietaryPreferenceSelector {...propsToPass} />;
};
// --- End Updated MockProvider ---


describe('DietaryPreferenceSelector', () => {
  beforeAll(() => {
    server.listen();
  });

  beforeEach(() => {
    resetMocks();
    (useSession as jest.Mock).mockClear();
    (usePreferenceUpdates as jest.Mock).mockClear();
    // Clear localStorage mock before each test
    mockLocalStorage.clear();
    jest.clearAllMocks(); // Clear all mocks
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  describe('Accessibility', () => {
    it('should not have any accessibility violations', async () => {
      const { container } = render(<MockProvider />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    // Keyboard navigation test seems complex and might need adjustments based on actual component structure
    // it('supports keyboard navigation', async () => { ... });
  });

  describe('Loading States', () => {
    // These tests need implementation based on how loading/error states are handled
    // it('shows loading state while fetching preferences', async () => { ... });
    // it('shows error state when preferences fetch fails', async () => { ... });
  });

  describe('Preference Management', () => {
    it('loads and displays initial dietary preferences if provided', async () => {
      // Example using DIET_TYPES keys directly
      render(<MockProvider initialDiets={['vegan', 'gluten-free']} />);

      await waitFor(() => {
        // Use titles from DIET_TYPES mapping for checking visibility/state
        expect(screen.getByRole('button', { name: DIET_TYPES['vegan'].title })).toHaveAttribute('aria-pressed', 'true');
        expect(screen.getByRole('button', { name: DIET_TYPES['gluten-free'].title })).toHaveAttribute('aria-pressed', 'true');
      });
    });

    it('allows selecting dietary preferences', async () => {
      render(<MockProvider />);
      const user = userEvent.setup();

      const veganButton = screen.getByRole('button', { name: DIET_TYPES['vegan'].title });
      expect(veganButton).toHaveAttribute('aria-pressed', 'false'); // Check initial state

      await user.click(veganButton);

      expect(veganButton).toHaveAttribute('aria-pressed', 'true'); // Check state after click
    });

    it('saves preferences when user is logged in', async () => {
        (useSession as jest.Mock).mockReturnValue(mockSession.authenticated);
        const updatePrefsMock = jest.fn();
        (usePreferenceUpdates as jest.Mock).mockReturnValue({
          updatePreferences: updatePrefsMock
        });

        render(<MockProvider />);
        const user = userEvent.setup();

        const veganButton = screen.getByRole('button', { name: DIET_TYPES['vegan'].title });
        await user.click(veganButton);

        // Wait for debounce/API call (adjust timing if needed)
        await waitFor(() => {
          expect(updatePrefsMock).toHaveBeenCalledWith(expect.objectContaining({
            dietTypes: ['vegan']
          }));
        });
      });


    it('saves preferences to localStorage when user is not logged in', async () => {
        (useSession as jest.Mock).mockReturnValue(mockSession.unauthenticated); // Ensure unauthenticated
        render(<MockProvider />);
        const user = userEvent.setup();


        const veganButton = screen.getByRole('button', { name: DIET_TYPES['vegan'].title });
        await user.click(veganButton);


        // Wait for potential debounce or state update
        await waitFor(() => {
          expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
            'dietary-preferences-selected-diets',
            JSON.stringify(['vegan']) // Expect array of strings
          );
        });
      });


    it('clears all preferences when clear button is clicked', async () => {
      // Setup initial state in mock localStorage
      setupLocalStorage({ dietTypes: ['vegan'], excludedFoods: ['nuts'], selectedRegions: ['US'], searchInput: 'test' });
      render(<MockProvider initialDiets={['vegan']} excludedFoods={['nuts']} selectedRegions={['US']} />); // Reflect initial state in component
      const user = userEvent.setup();

      // Verify initial state (optional)
      expect(screen.getByRole('button', { name: DIET_TYPES['vegan'].title })).toHaveAttribute('aria-pressed', 'true');

      const clearButton = screen.getByRole('button', { name: /clear all/i }); // Adjust text if needed
      await user.click(clearButton);

      // Check that relevant localStorage items are removed
      await waitFor(() => {
          expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('dietary-preferences-selected-diets');
          expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('dietary-preferences-excluded-foods');
          expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('dietary-preferences-selected-regions');
         // expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('dietary-preferences-search-input'); // If search is cleared
      });

       // Check that button state is reset visually
      expect(screen.getByRole('button', { name: DIET_TYPES['vegan'].title })).toHaveAttribute('aria-pressed', 'false');


    });
  });

  describe('Recipe Generation', () => {
     it('generates recipes based on selected preferences', async () => {
          // Mock the API response
         const mockRecipes: Partial<Recipe>[] = [{ id: '1', title: 'Test Recipe 1', description: 'Desc 1', ingredients: [], instructions: [] }];
         server.use(
           rest.post('/api/recipes/generate', (req, res, ctx) => {
             return res(ctx.json({ recipes: mockRecipes }));
           })
         );

         render(<MockProvider initialDiets={['vegan']} />); // Start with a diet selected
         const user = userEvent.setup();

         const generateButton = screen.getByRole('button', { name: /generate recipes/i }); // Use regex for flexibility
         await user.click(generateButton);

         // Wait for the mocked MealCarousel to receive the recipes
         await waitFor(() => {
           const carousel = screen.getByTestId('mock-meal-carousel');
           expect(carousel).toHaveTextContent(`${mockRecipes.length} recipes`);
         });
       });


     it('handles recipe generation errors', async () => {
         server.use(
           rest.post('/api/recipes/generate', (req, res, ctx) => {
             return res(ctx.status(500), ctx.json({ error: 'Generation failed' }));
           })
         );

         render(<MockProvider />);
         const user = userEvent.setup();

         const generateButton = screen.getByRole('button', { name: /generate recipes/i });
         await user.click(generateButton);

         // Check for error message display (update selector if needed)
         await waitFor(() => {
            // This depends on how your component shows errors.
            // Assuming it might show an alert or a specific element:
            // Option 1: Check for alert (if using window.alert)
            // expect(window.alert).toHaveBeenCalledWith(expect.stringContaining('Error generating recipes'));
            // Option 2: Check for an error message element
             expect(screen.getByText(/error generating recipes/i)).toBeInTheDocument();
         });
       });

  });

  // --- Other test suites remain largely the same, ensure they use string[] for diets ---

  describe('Preference Combinations', () => {
    it('handles multiple diet selections', async () => {
      render(<MockProvider />);
      const user = userEvent.setup();

      const veganButton = screen.getByRole('button', { name: DIET_TYPES['vegan'].title });
      const glutenFreeButton = screen.getByRole('button', { name: DIET_TYPES['gluten-free'].title });

      await user.click(veganButton);
      await user.click(glutenFreeButton);

      await waitFor(() => {
          expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
            'dietary-preferences-selected-diets',
            JSON.stringify(['vegan', 'gluten-free']) // Expect strings
          );
      });
    });

    // Add tests for other combinations (diet/region, diet/excluded) ensuring string[] is used
  });

  describe('Snapshot Testing', () => {
    it('matches snapshot', () => {
      const tree = renderer.create(<MockProvider />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  // ... other test suites ...

});