import { PrismaClient } from '@prisma/client';
import { DeepMockProxy, mockDeep, mockReset } from 'jest-mock-extended';
import { createMockRecipe } from '@/src/test/utils/test-utils'; // Import the utility

export type MockPrismaClient = DeepMockProxy<PrismaClient>;

export const createMockPrismaClient = (): DeepMockProxy<PrismaClient> => {
  return mockDeep<PrismaClient>();
};

// --- Define Base Mock Data --- 
// User
export const mockUserData = { id: '1', email: 'test@example.com', name: 'Test User', emailVerified: null, image: null };

// UserPreference
export const mockUserPreference = { 
  id: '1', 
  userEmail: 'test@example.com', 
  dietTypes: ['vegan'], 
  excludedFoods: ['nuts'], 
  cookingTime: 'MEDIUM', 
  mealPrep: false, 
  servingSize: 2 
};

// Recipe (using the utility)
// We might need overrides if the base mock doesn't fit all test cases
export const mockRecipe = createMockRecipe({ 
  id: '1', 
  title: 'Vegan Delight Test Util', 
  authorId: mockUserData.id, // Link to mock user
  // Add specific overrides needed for tests here
  isVegan: true,
  isVegetarian: true,
  isGlutenFree: true,
});

// Ingredient
export const mockIngredient = {
  id: 'ing1',
  name: 'Tomato',
  amount: 1,
  unit: 'cup',
  notes: 'diced',
  recipeId: mockRecipe.id,
  isFermented: false, // Ensure field is present
};

// Instruction
export const mockInstruction = {
  id: 'inst1',
  stepNumber: 1,
  description: 'Dice tomatoes',
  recipeId: mockRecipe.id
};

// NutritionFacts
export const mockNutrition = {
  id: 'nut1',
  protein: 5,
  carbs: 10,
  fat: 2,
  fiber: 3,
  sugar: 5,
  sodium: 100,
  recipeId: mockRecipe.id
};
// --- End Base Mock Data ---


// Setup mock implementations
export const setupPrismaMocks = (prisma: DeepMockProxy<PrismaClient>) => {
  // Mock transaction implementation
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prisma.$transaction.mockImplementation(async (args: any) => { // Keep any, disable lint rule for this line
    if (typeof args === 'function') {
      return await args(prisma); 
    } 
    throw new Error('Mock transaction only supports callback function');
  });

  // Mock user data
  prisma.user.findUnique.mockResolvedValue(mockUserData);
  // @ts-expect-error Mock return type doesn't fully match Prisma client type
  prisma.user.create.mockImplementation(async (args) => ({ 
      ...mockUserData, 
      id: `new-user-${Date.now()}`,
      ...(args.data) 
  }));

  // Mock user preference data
  prisma.userPreference.findUnique.mockResolvedValue(mockUserPreference);
  // @ts-expect-error Mock return type doesn't fully match Prisma client type
  prisma.userPreference.update.mockImplementation(async (args) => ({ 
      ...mockUserPreference, 
      ...(args.data)
  }));
  // @ts-expect-error Mock return type doesn't fully match Prisma client type
  prisma.userPreference.upsert.mockImplementation(async (args) => ({ 
      ...mockUserPreference, 
      ...(args.update)
  }));

  // Mock recipe data
  prisma.recipe.findMany.mockResolvedValue([mockRecipe]); 
  prisma.recipe.findUnique.mockResolvedValue(mockRecipe);
  // @ts-expect-error Mock return type doesn't fully match Prisma client type
  prisma.recipe.create.mockImplementation(async (args) => ({ 
      ...mockRecipe, 
      id: `new-recipe-${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
      ...(args.data)
  }));
  
  // Mock related data lookups if needed by tests
  prisma.ingredient.findMany.mockResolvedValue([mockIngredient]);
  prisma.instruction.findMany.mockResolvedValue([mockInstruction]);
  prisma.nutritionFacts.findUnique.mockResolvedValue(mockNutrition);

  // Function to clear mocks between tests
  const clearMocks = () => {
    mockReset(prisma); // Use mockReset from jest-mock-extended
  };

  return { prisma, clearMocks };
}; 