import React from 'react'
import { render as rtlRender } from '@testing-library/react'
import { screen, fireEvent } from '@testing-library/dom'
import { SessionProvider } from 'next-auth/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Create a custom render function that includes providers
function render(ui: React.ReactElement, { session = null, ...options } = {}) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })

  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </SessionProvider>
    )
  }

  return rtlRender(ui, { wrapper: Wrapper, ...options })
}

// Helper to create mock recipe data
export const createMockRecipe = (overrides = {}) => ({
  id: 'recipe-1',
  title: 'Test Recipe',
  description: 'A test recipe description',
  instructions: ['Step 1', 'Step 2'],
  ingredients: ['Ingredient 1', 'Ingredient 2'],
  cookingTime: 30,
  servings: 4,
  difficulty: 'MEDIUM',
  cuisine: 'ITALIAN',
  dietaryPreferences: ['VEGETARIAN'],
  imageUrl: 'https://example.com/image.jpg',
  authorId: 'user-1',
  createdAt: new Date(),
  updatedAt: new Date(),
  ...overrides,
})

// Helper to create mock user data
export const createMockUser = (overrides = {}) => ({
  id: 'user-1',
  email: 'test@example.com',
  name: 'Test User',
  image: 'https://example.com/avatar.jpg',
  emailVerified: new Date(),
  preferences: {
    dietaryPreferences: ['VEGETARIAN'],
    allergies: ['NUTS'],
    cuisinePreferences: ['ITALIAN', 'MEXICAN'],
  },
  ...overrides,
})

export { render, screen, fireEvent } 