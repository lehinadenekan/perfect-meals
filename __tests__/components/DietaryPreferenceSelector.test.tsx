import React, { useState } from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import { SessionProvider, SessionProviderProps } from 'next-auth/react';
import DietaryPreferenceSelector, { DietaryPreferenceSelectorProps } from '@/app/components/dietary/DietaryPreferenceSelector';
import { server } from '@/src/mocks/server';
import { rest } from 'msw';
import { Recipe } from '@/app/types/recipe';
import { DietType, DIET_TYPES } from '@/types/diet';

// Mock sub-components
jest.mock('@/app/components/dietary/GeographicFilter', () => {
  return function MockGeographicFilter({ selectedRegions, onRegionsChange }: { selectedRegions: string[], onRegionsChange: (regions: string[]) => void }) {
    return <div data-testid="mock-geographic-filter" onClick={() => onRegionsChange(selectedRegions)} />;
  };
});

jest.mock('@/app/components/recipe/MealCarousel', () => {
  return function MockMealCarousel({ recipes }: { recipes: Recipe[] }) {
    return <div data-testid="mock-meal-carousel">{recipes.length} recipes</div>;
  };
});

jest.mock('@/app/components/dietary/ExcludedFoodsInput', () => {
  return function MockExcludedFoodsInput({ excludedFoods, onExcludedFoodsChange }: { excludedFoods: string[], onExcludedFoodsChange: (foods: string[]) => void }) {
    return <div data-testid="mock-excluded-foods" onClick={() => onExcludedFoodsChange(excludedFoods)} />;
  };
});

jest.mock('@/app/components/dietary/SearchInput', () => {
  return function MockSearchInput({ searchTerm, onSearchChange }: { searchTerm: string, onSearchChange: (term: string) => void }) {
    return <div data-testid="mock-search-input" onClick={() => onSearchChange(searchTerm)} />;
  };
});

// Mock next/router
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Mock hooks
jest.mock('@/app/hooks/usePreferenceUpdates', () => ({
  usePreferenceUpdates: () => ({
    updatePreferences: jest.fn(),
  }),
}));

// Helper component to provide props and context
const TestWrapper: React.FC<{ 
    session?: SessionProviderProps['session']; 
    children?: React.ReactNode;
}> = ({ session, children }) => {
  const [selectedDiets, setSelectedDiets] = useState<DietType[]>([]);
  const [excludedFoods, setExcludedFoods] = useState<string[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(1);
  
  // Define only the props that DietaryPreferenceSelector actually uses
  const propsToPass: DietaryPreferenceSelectorProps = {
    selectedDiets,
    setSelectedDiets,
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
  const mockDietTypes: DietType[] = ['vegan', 'gluten-free'];
  
  beforeEach(() => {
    // Reset MSW handlers before each test
    server.resetHandlers();
  });

  it('renders all dietary preference options', async () => {
    await act(async () => {
      render(<TestWrapper session={null} />); // Use TestWrapper
    });

    expect(screen.getByText('Choose Your Dietary Preferences')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: DIET_TYPES['gluten-free'].title })).toHaveAttribute('aria-pressed', 'false');
  });

  it('allows selection of multiple dietary preferences', async () => {
    await act(async () => {
      render(<TestWrapper session={null} />); // Use TestWrapper
    });

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
      rest.post('http://localhost:3000/api/recipes/generate', (_req, res, ctx) => {
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

    const veganButton = screen.getByRole('button', { name: DIET_TYPES['vegan'].title });
    await act(async () => {
      veganButton.click();
    });

    const generateButton = screen.getByRole('button', { name: /generate recipes/i });
    await act(async () => {
      generateButton.click();
    });

    await waitFor(() => {
      expect(screen.getByText('Vegan Pasta')).toBeInTheDocument();
    });
  });

  it('clears all preferences when clear button is clicked', async () => {
    await act(async () => {
      render(<TestWrapper session={null} />); // Use TestWrapper
    });

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

    // Setup MSW to return specific preferences
    server.use(
      rest.get('http://localhost:3000/api/preferences', (_req, res, ctx) => {
        return res(
          ctx.json({
            dietTypes: mockDietTypes,
            excludedFoods: ['peanuts'],
            selectedRegions: [],
            searchInput: ''
          })
        );
      })
    );

    await act(async () => {
      render(<TestWrapper session={mockSession} />); // Use TestWrapper with session
    });

    await waitFor(() => {
      expect(screen.getByRole('button', { name: DIET_TYPES['vegan'].title })).toHaveAttribute('aria-pressed', 'true');
      expect(screen.getByRole('button', { name: DIET_TYPES['gluten-free'].title })).toHaveAttribute('aria-pressed', 'true');
    });
  });
}); 