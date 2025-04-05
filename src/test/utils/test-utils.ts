import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Recipe } from '@/app/types/recipe'

export { render, screen, fireEvent, userEvent }

export const createMockRecipe = (overrides: Partial<Recipe> = {}): Recipe => {
  const defaults: Recipe = {
    id: 'mock-recipe-id',
    title: 'Mock Recipe Title',
    description: 'Mock description here.',
    cookingTime: 30,
    servings: 4,
    difficulty: 'Medium',
    cuisineType: 'Mock Cuisine',
    regionOfOrigin: 'Mock Region',
    imageUrl: 'https://example.com/mock.jpg',
    videoUrl: undefined,
    calories: 500,
    authorId: 'mock-author-123',
    author: { name: 'Mock Author' },
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: false,
    isNutFree: false,
    isLowFodmap: false,
    isLactoseFree: false,
    isPescatarian: false,
    isFermented: false,
    averageRating: 4.5,
    type: 'Dinner',
    cuisineId: 'mock-cuisine-id-456',
    authenticity: 'Traditional',
    cookingMethods: ['Bake', 'Fry'],
    spiceLevel: 'Mild',
    subCuisineType: undefined,
    jobId: undefined,
    showCount: 10,
    hasFeatureFermented: false,
    hasFermentedIngredients: false,
    hasFish: false,
    ingredients: [],
    instructions: [],
    createdAt: new Date('2023-01-01T10:00:00Z'),
    updatedAt: new Date('2023-01-01T11:00:00Z'),
  }

  return { ...defaults, ...overrides }
} 