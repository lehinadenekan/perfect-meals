import { Recipe } from '@prisma/client'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

export { render, screen, fireEvent, userEvent }

export function createMockRecipe(overrides: Partial<Recipe> = {}): Recipe {
  return {
    id: 'mock-recipe-id',
    title: 'Mock Recipe',
    description: 'A delicious mock recipe',
    cookingTime: 30,
    servings: 4,
    difficulty: 'MEDIUM',
    cuisineType: 'ITALIAN',
    regionOfOrigin: 'Italy',
    imageUrl: 'https://example.com/image.jpg',
    videoUrl: null,
    calories: 500,
    authorId: 'mock-author-id',
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: false,
    isLactoseFree: false,
    isNutFree: false,
    averageRating: null,
    type: 'DINNER',
    cuisineId: 'mock-cuisine-id',
    authenticity: 'TRADITIONAL',
    cookingMethods: ['BAKING', 'ROASTING'],
    spiceLevel: 'MEDIUM',
    subCuisineType: null,
    jobId: null,
    showCount: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides
  }
} 