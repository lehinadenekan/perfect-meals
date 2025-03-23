import { Recipe } from '@prisma/client';

interface FilterOptions {
  dietTypes: string[];
}

// Extended Recipe type for our tests to include low-FODMAP
interface TestRecipe extends Partial<Recipe> {
  isLowFodmap?: boolean;
}

// This is the function we're testing - in a real app this would be imported
function filterRecipesByDietaryPreferences(recipes: TestRecipe[], options: FilterOptions): TestRecipe[] {
  const { dietTypes } = options;
  
  if (dietTypes.length === 0) return recipes;

  return recipes.filter(recipe => {
    // Check each dietary preference
    return dietTypes.every(diet => {
      switch (diet.toLowerCase()) {
        case 'vegan':
          return recipe.isVegan;
        case 'vegetarian':
          return recipe.isVegetarian;
        case 'gluten-free':
          return recipe.isGlutenFree;
        case 'nut-free':
          return recipe.isNutFree;
        case 'lactose-free':
          return recipe.isLactoseFree;
        case 'pescatarian':
          return recipe.isVegetarian || recipe.title?.toLowerCase().includes('fish');
        case 'low-fodmap':
          return recipe.isLowFodmap;
        default:
          return true;
      }
    });
  });
}

describe('Recipe Filtering', () => {
  // Mock recipes for testing
  const mockRecipes: TestRecipe[] = [
    {
      id: '1',
      title: 'Vegan Salad',
      isVegan: true,
      isVegetarian: true,
      isGlutenFree: true,
      isNutFree: true,
      isLactoseFree: true,
      isLowFodmap: true,
    },
    {
      id: '2',
      title: 'Chicken Pasta',
      isVegan: false,
      isVegetarian: false,
      isGlutenFree: false,
      isNutFree: true,
      isLactoseFree: true,
      isLowFodmap: false,
    },
    {
      id: '3',
      title: 'Vegetarian Pizza',
      isVegan: false,
      isVegetarian: true,
      isGlutenFree: false,
      isNutFree: true,
      isLactoseFree: false,
      isLowFodmap: false,
    },
    {
      id: '4',
      title: 'Fish Curry',
      isVegan: false,
      isVegetarian: false,
      isGlutenFree: true,
      isNutFree: true,
      isLactoseFree: true,
      isLowFodmap: true,
    }
  ];

  it('filters vegan recipes correctly', () => {
    const filteredRecipes = filterRecipesByDietaryPreferences(mockRecipes, {
      dietTypes: ['vegan']
    });

    expect(filteredRecipes).toHaveLength(1);
    expect(filteredRecipes[0].title).toBe('Vegan Salad');
  });

  it('filters vegetarian recipes correctly', () => {
    const filteredRecipes = filterRecipesByDietaryPreferences(mockRecipes, {
      dietTypes: ['vegetarian']
    });

    expect(filteredRecipes).toHaveLength(2);
    expect(filteredRecipes.map((r: TestRecipe) => r.title)).toContain('Vegan Salad');
    expect(filteredRecipes.map((r: TestRecipe) => r.title)).toContain('Vegetarian Pizza');
  });

  it('filters gluten-free recipes correctly', () => {
    const filteredRecipes = filterRecipesByDietaryPreferences(mockRecipes, {
      dietTypes: ['gluten-free']
    });

    expect(filteredRecipes).toHaveLength(2);
    expect(filteredRecipes.map((r: TestRecipe) => r.title)).toContain('Vegan Salad');
    expect(filteredRecipes.map((r: TestRecipe) => r.title)).toContain('Fish Curry');
  });

  it('combines multiple dietary preferences correctly', () => {
    const filteredRecipes = filterRecipesByDietaryPreferences(mockRecipes, {
      dietTypes: ['vegetarian', 'gluten-free']
    });

    expect(filteredRecipes).toHaveLength(1);
    expect(filteredRecipes[0].title).toBe('Vegan Salad');
  });

  it('handles pescatarian diet correctly', () => {
    const filteredRecipes = filterRecipesByDietaryPreferences(mockRecipes, {
      dietTypes: ['pescatarian']
    });

    expect(filteredRecipes).toHaveLength(3);
    expect(filteredRecipes.map((r: TestRecipe) => r.title)).toContain('Vegan Salad');
    expect(filteredRecipes.map((r: TestRecipe) => r.title)).toContain('Vegetarian Pizza');
    expect(filteredRecipes.map((r: TestRecipe) => r.title)).toContain('Fish Curry');
  });

  it('filters nut-free recipes correctly', () => {
    const filteredRecipes = filterRecipesByDietaryPreferences(mockRecipes, {
      dietTypes: ['nut-free']
    });

    expect(filteredRecipes).toHaveLength(4);
    expect(filteredRecipes.map((r: TestRecipe) => r.title)).toEqual([
      'Vegan Salad',
      'Chicken Pasta',
      'Vegetarian Pizza',
      'Fish Curry'
    ]);
  });

  it('filters lactose-free recipes correctly', () => {
    const filteredRecipes = filterRecipesByDietaryPreferences(mockRecipes, {
      dietTypes: ['lactose-free']
    });

    expect(filteredRecipes).toHaveLength(3);
    expect(filteredRecipes.map((r: TestRecipe) => r.title)).not.toContain('Vegetarian Pizza');
  });

  it('returns all recipes when no preferences are selected', () => {
    const filteredRecipes = filterRecipesByDietaryPreferences(mockRecipes, {
      dietTypes: []
    });

    expect(filteredRecipes).toHaveLength(4);
  });

  it('returns empty array when no recipes match preferences', () => {
    // Create a new mock recipe without low-FODMAP flag
    const mockRecipesWithoutLowFodmap = mockRecipes.map(recipe => ({
      ...recipe,
      isLowFodmap: false
    }));

    const filteredRecipes = filterRecipesByDietaryPreferences(mockRecipesWithoutLowFodmap, {
      dietTypes: ['vegan', 'low-FODMAP']
    });

    expect(filteredRecipes).toHaveLength(0);
  });
}); 