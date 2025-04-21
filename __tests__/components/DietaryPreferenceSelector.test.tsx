import React, { useState } from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import { SessionProvider, SessionProviderProps } from 'next-auth/react';
import DietaryPreferenceSelector, { DietaryPreferenceSelectorProps } from '@/components/dietary/DietaryPreferenceSelector';
import { server } from '@/src/mocks/server';
import { rest } from 'msw';
import { Recipe } from '@/lib/types/recipe';
// Remove DietType import if no longer needed directly, keep DIET_TYPES for mapping
import { DIET_TYPES } from '@/types/diet';

// Mock sub-components (remain the same)
jest.mock('@/components/dietary/GeographicFilter', () => {
  return function MockGeographicFilter({ selectedRegions, onRegionsChange }: { selectedRegions: string[], onRegionsChange: (regions: string[]) => void }) {
    return <div data-testid="mock-geographic-filter" onClick={() => onRegionsChange(selectedRegions)} />;
  };
});

jest.mock('@/components/recipe/MealCarousel', () => {
  return function MockMealCarousel({ recipes }: { recipes: Recipe[] }) {
    return <div data-testid="mock-meal-carousel">{recipes.length} recipes</div>;
  };
});

jest.mock('@/components/dietary/ExcludedFoodsInput', () => {
  return function MockExcludedFoodsInput({ excludedFoods, onExcludedFoodsChange }: { excludedFoods: string[], onExcludedFoodsChange: (foods: string[]) => void }) {
    return <div data-testid="mock-excluded-foods" onClick={() => onExcludedFoodsChange(excludedFoods)} />;
  };
});

jest.mock('@/components/dietary/SearchInput', () => {
  return function MockSearchInput({ searchTerm, onSearchChange }: { searchTerm: string, onSearchChange: (term: string) => void }) {
    return <div data-testid="mock-search-input" onClick={() => onSearchChange(searchTerm)} />;
  };
});

// Mock next/router (remain the same)
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Mock hooks (remain the same)
jest.mock('@/hooks/usePreferenceUpdates', () => ({
  usePreferenceUpdates: () => ({
    updatePreferences: jest.fn(),
  }),
}));

// Helper component to provide props and context
const TestWrapper: React.FC<{
    session?: SessionProviderProps['session'];
    children?: React.ReactNode;
}> = ({ session, children }) => {
  // --- CHANGE HERE: Use string[] for selectedDiets state ---
  const [selectedDiets, setSelectedDiets] = useState<string[]>([]);
  const [excludedFoods, setExcludedFoods] = useState<string[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Define only the props that DietaryPreferenceSelector actually uses
  const propsToPass: DietaryPreferenceSelectorProps = {
    selectedDiets,
    setSelectedDiets, // This should now correctly match the expected type
    excludedFoods,
    setExcludedFoods,
    selectedRegions,
    setSelectedRegions,
    recipes,
    setRecipes,
    currentStep,
    setCurrentStep,
  };

  return (
    <SessionProvider session={session}>
      {children || <DietaryPreferenceSelector {...propsToPass} />}
    </SessionProvider>
  );
};

describe('DietaryPreferenceSelector', () => {
  // --- CHANGE HERE: Use string[] for mockDietTypes ---
  // Use the keys (strings) from DIET_TYPES instead of the DietType values
  const mockDietTypesAsStrings: string[] = ['vegan', 'gluten-free'];

  beforeEach(() => {
    // Reset MSW handlers before each test
    server.resetHandlers();
  });

  it('renders all dietary preference options', async () => {
    await act(async () => {
      render(<TestWrapper session={null} />); // Use TestWrapper
    });

    expect(screen.getByText('Choose Your Dietary Preferences')).toBeInTheDocument();
    // Check button state using the title from DIET_TYPES mapping
    expect(screen.getByRole('button', { name: DIET_TYPES['gluten-free'].title })).toHaveAttribute('aria-pressed', 'false');
  });

  it('allows selection of multiple dietary preferences', async () => {
    await act(async () => {
      render(<TestWrapper session={null} />); // Use TestWrapper
    });

    // Use titles from DIET_TYPES mapping
    const veganButton = screen.getByRole('button', { name: DIET_TYPES['vegan'].title });
    const glutenFreeButton = screen.getByRole('button', { name: DIET_TYPES['gluten-free'].title });

    await act(async () => {
      veganButton.click();
      glutenFreeButton.click();
    });

    expect(veganButton).toHaveAttribute('aria-pressed', 'true');
    expect(glutenFreeButton).toHaveAttribute('aria-pressed', 'true');
  });

  it('generates recipes based on selected preferences', async () => {
    // Setup MSW to return specific recipes
    server.use(
      rest.post('/api/recipes/generate', (_req, res, ctx) => { // Use relative path for mock
        return res(
          ctx.json({
            recipes: [
              {
                id: '1',
                title: 'Vegan Pasta',
                isVegan: true,
                isGlutenFree: true
              }
            ]
          })
        );
      })
    );

    await act(async () => {
      render(<TestWrapper session={null} />); // Use TestWrapper
    });

    // Use title from DIET_TYPES mapping
    const veganButton = screen.getByRole('button', { name: DIET_TYPES['vegan'].title });
    await act(async () => {
      veganButton.click();
    });

    const generateButton = screen.getByRole('button', { name: /generate recipes/i });
    await act(async () => {
      generateButton.click();
    });

    // Use await waitFor for async state updates and rendering
    await waitFor(() => {
       // Check if MealCarousel mock received the recipe
       const carousel = screen.getByTestId('mock-meal-carousel');
       expect(carousel).toHaveTextContent('1 recipes');
       // You might need more specific checks depending on MealCarousel's mock implementation
    });
     // Optional: Check if the specific recipe title is handled if needed elsewhere
     // If MealCarousel rendered titles, you could check:
     // await screen.findByText('Vegan Pasta');
  });

  it('clears all preferences when clear button is clicked', async () => {
    await act(async () => {
      render(<TestWrapper session={null} />); // Use TestWrapper
    });

    // Use title from DIET_TYPES mapping
    const veganButton = screen.getByRole('button', { name: DIET_TYPES['vegan'].title });
    await act(async () => {
      veganButton.click();
    });

    expect(veganButton).toHaveAttribute('aria-pressed', 'true');

    const clearButton = screen.getByRole('button', { name: /clear/i });
    await act(async () => {
      clearButton.click();
    });

    expect(veganButton).toHaveAttribute('aria-pressed', 'false');
  });

  it('persists preferences for logged-in users', async () => {
    const mockSession = {
      user: { id: '123', email: 'test@example.com' },
      expires: new Date(Date.now() + 2 * 86400).toISOString()
    };

    // Setup MSW to return specific preferences using strings
    server.use(
      rest.get('/api/user/preferences', (_req, res, ctx) => { // Use relative path
        return res(
          ctx.json({
            success: true,
            // --- CHANGE HERE: Return strings ---
            preferences: {
              dietTypes: mockDietTypesAsStrings,
              excludedFoods: ['peanuts'],
              // Ensure other fields match UserPreference model if needed by component
              userEmail: 'test@example.com'
            }
          })
        );
      })
    );

    await act(async () => {
      render(<TestWrapper session={mockSession} />); // Use TestWrapper with session
    });

    // Check button states using titles from DIET_TYPES mapping
    await waitFor(() => {
      expect(screen.getByRole('button', { name: DIET_TYPES['vegan'].title })).toHaveAttribute('aria-pressed', 'true');
      expect(screen.getByRole('button', { name: DIET_TYPES['gluten-free'].title })).toHaveAttribute('aria-pressed', 'true');
    });
  });
});