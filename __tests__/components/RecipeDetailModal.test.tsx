import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // For extended matchers like .toBeInTheDocument()
import RecipeDetailModal from '@/components/recipe/RecipeDetailModal';
import { Recipe } from '@/lib/types/recipe'; // Assuming this path is correct

// Mock data for a recipe - adjust as needed for tests
const mockRecipe: Recipe = {
  id: 'test-recipe-1',
  title: 'Test Recipe Title',
  description: 'A delicious test recipe.',
  cookingTime: 30,
  servings: 4,
  difficulty: 'EASY',
  cuisineType: 'Test Cuisine',
  regionOfOrigin: 'Test Region',
  imageUrl: '/images/recipes/test.jpg',
  calories: 500,
  type: 'MAIN',
  isVegetarian: false,
  isVegan: false,
  isGlutenFree: true,
  isLactoseFree: true,
  isNutFree: true,
  isFermented: false,
  isLowFodmap: false,
  isPescatarian: false,
  authorId: 'test-author-id', // Add missing mandatory fields
  ingredients: [
    { id: 'ing1', name: 'Test Ingredient 1', amount: 2, unit: 'cups', recipeId: 'test-recipe-1' },
    { id: 'ing2', name: 'Test Ingredient 2', amount: 100, unit: 'g', recipeId: 'test-recipe-1', notes: 'chopped' },
    { id: 'ing3', name: 'Test Ingredient 3', amount: 1, unit: 'tsp', recipeId: 'test-recipe-1' },
  ],
  instructions: [
    { id: 'inst1', stepNumber: 1, description: 'Do the first thing.', recipeId: 'test-recipe-1' },
    { id: 'inst2', stepNumber: 2, description: 'Do the second thing.', recipeId: 'test-recipe-1' },
  ],
  // Corrected NutritionFacts structure
  nutritionFacts: { protein: 20, carbs: 50, fat: 15 }, 
  notes: ['A helpful note.'],
  cuisineId: 'test-cuisine',
  authenticity: 'Verified',
  cookingMethods: ['Bake'],
  spiceLevel: 'Mild',
  averageRating: 4.5,
  createdAt: new Date(),
  updatedAt: new Date(),
  showCount: 10,
  hasFish: false,
  hasFermentedIngredients: false,
  hasFeatureFermented: false, 
};

// Mock the FlagSubmission component as it's likely complex and not needed for this unit test
jest.mock('@/app/components/recipe/FlagSubmission', () => () => <div>Mock Flag Submission</div>);
// Mock FavoriteButton if it causes issues (e.g., needs context)
jest.mock('../shared/FavoriteButton', () => () => <button>Mock Favorite</button>);
// Mock addRecentlyViewed utility function
jest.mock('@/lib/utils/recentlyViewed', () => ({
  addRecentlyViewed: jest.fn(),
}));


describe('RecipeDetailModal', () => {
  // Basic render test
  it('renders the modal with basic recipe information', () => {
    render(
      <RecipeDetailModal
        recipe={mockRecipe}
        isOpen={true}
        onClose={jest.fn()} // Mock function for onClose
      />
    );

    // Check if the title is rendered
    expect(screen.getByText(mockRecipe.title)).toBeInTheDocument();
    // Check if description is rendered
    expect(screen.getByText(mockRecipe.description!)).toBeInTheDocument(); // Add non-null assertion if description is optional but expected here
    // Check for Ingredients heading
    expect(screen.getByRole('heading', { name: /ingredients/i })).toBeInTheDocument();
     // Check for Instructions heading
    expect(screen.getByRole('heading', { name: /instructions/i })).toBeInTheDocument();
  });

  it('renders the list of ingredients correctly', () => {
    render(
      <RecipeDetailModal
        recipe={mockRecipe}
        isOpen={true}
        onClose={jest.fn()}
      />
    );

    mockRecipe.ingredients.forEach(ingredient => {
      // Construct the regex string safely
      const regexString = `${ingredient.amount}\s*${ingredient.unit || ''}\s*${ingredient.name}`;
      try {
        const regex = new RegExp(regexString, 'i');
        // Use queryByText which returns null if not found, preventing errors
        expect(screen.queryByText(regex)).toBeInTheDocument(); 
      } catch (e) {
        // Fail the test if regex creation fails
        throw new Error(`Failed to create or match regex: /${regexString}/i. Error: ${e}`);
      }

      if (ingredient.notes) {
         // Similar safe check for notes
         const noteRegexString = `\(${ingredient.notes}\)`;
         try {
           const noteRegex = new RegExp(noteRegexString, 'i');
           expect(screen.queryByText(noteRegex)).toBeInTheDocument();
         } catch (e) {
            throw new Error(`Failed to create or match regex for notes: /${noteRegexString}/i. Error: ${e}`);
         }
      }
    });
  });

  // Add more tests here for:
  // - Ingredient amounts adjusting with serving multiplier
  // - Instructions rendering
  // - Timer functionality (requires more complex setup/mocks)
  // - Interaction with buttons (Favorite, Print, Export, Share, Flag)
  // - Closing the modal via button or backdrop
  // - Navigation buttons (if canGoPrevious/canGoNext are true)
}); 