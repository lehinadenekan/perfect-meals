import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Recipe } from '@prisma/client'

export { render, screen, fireEvent, userEvent }

export const createMockRecipe = (overrides: Partial<Recipe> = {}): Recipe => {
  const defaults: Recipe = {
    id: 'mock-recipe-id',
    createdAt: new Date('2023-01-01T10:00:00Z'),
    updatedAt: new Date('2023-01-01T11:00:00Z'),
    title: 'Mock Recipe Title',
    description: 'Mock description here.',
    cookingTime: 30,
    servings: 4,
    difficulty: 'Medium',
    cuisineType: 'Mock Cuisine',
    authorId: 'mock-author-123',
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: false,
    isNutFree: false,
    jobId: null,
    isFermented: false,
    isLactoseFree: false,
    isLowFodmap: false,
    isPescatarian: false,
    needsDietaryReview: false,
    imageUrl: 'https://example.com/mock.jpg',
    regionOfOrigin: 'Mock Region',
    calories: 500,
    notes: [],
  }

  return { ...defaults, ...overrides }
} 