import { PrismaClient, User, UserPreference, Recipe, Ingredient, Instruction, NutritionFacts, Prisma } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';

export type MockPrismaClient = DeepMockProxy<PrismaClient>;

export const createMockPrismaClient = () => {
  const prisma = mockDeep<PrismaClient>();
  
  // Mock transaction behavior
  prisma.$transaction.mockImplementation((args) => {
    if (typeof args === 'function') {
      return args(prisma);
    }
    return Promise.all(args);
  });

  return prisma;
};

export const mockUserData: User = {
  id: '1',
  email: 'test@example.com',
  name: 'Test User',
  emailVerified: new Date(),
  image: null
};

export const mockUserPreference: UserPreference = {
  id: '1',
  userEmail: 'test@example.com',
  cookingTime: 'MEDIUM',
  mealPrep: false,
  servingSize: 2,
  dietTypes: ['vegan', 'gluten-free'],
  excludedFoods: ['mushrooms']
};

export const mockIngredients: Ingredient[] = [
  {
    id: '1',
    name: 'Coconut Milk',
    amount: 400,
    unit: 'ml',
    notes: 'Full fat',
    recipeId: '1'
  }
];

export const mockInstructions: Instruction[] = [
  {
    id: '1',
    stepNumber: 1,
    description: 'Cook vegetables',
    recipeId: '1'
  }
];

export const mockNutritionFacts: NutritionFacts = {
  id: '1',
  protein: 10,
  carbs: 45,
  fat: 15,
  fiber: 5,
  sugar: 3,
  sodium: 400,
  recipeId: '1'
};

export const mockRecipe: Recipe = {
  id: '1',
  title: 'Vegan Curry',
  description: 'A delicious vegan curry',
  cookingTime: 45,
  servings: 4,
  difficulty: 'MEDIUM',
  cuisineType: 'ASIAN',
  regionOfOrigin: 'Thailand',
  imageUrl: 'https://example.com/curry.jpg',
  videoUrl: null,
  calories: 450,
  authorId: '1',
  isVegetarian: true,
  isVegan: true,
  isGlutenFree: true,
  isLactoseFree: true,
  isNutFree: true,
  averageRating: 4.5,
  type: 'DINNER',
  cuisineId: '1',
  authenticity: 'TRADITIONAL',
  cookingMethods: ['STIR_FRY', 'SIMMER'],
  spiceLevel: 'MEDIUM',
  subCuisineType: 'THAI',
  jobId: null,
  showCount: 0,
  createdAt: new Date(),
  updatedAt: new Date()
};

export const setupPrismaMocks = (prisma: MockPrismaClient) => {
  // User operations
  prisma.user.findUnique.mockResolvedValue(mockUserData);
  prisma.user.findFirst.mockResolvedValue(mockUserData);
  prisma.user.create.mockResolvedValue(mockUserData);
  prisma.user.update.mockResolvedValue(mockUserData);

  // UserPreference operations
  prisma.userPreference.findUnique.mockResolvedValue(mockUserPreference);
  prisma.userPreference.findFirst.mockResolvedValue(mockUserPreference);
  prisma.userPreference.create.mockResolvedValue(mockUserPreference);
  prisma.userPreference.update.mockResolvedValue(mockUserPreference);
  prisma.userPreference.upsert.mockResolvedValue(mockUserPreference);

  // Recipe operations
  prisma.recipe.findMany.mockResolvedValue([mockRecipe]);
  prisma.recipe.create.mockResolvedValue(mockRecipe);
  prisma.recipe.findUnique.mockResolvedValue(mockRecipe);

  // Related model operations
  prisma.ingredient.findMany.mockResolvedValue(mockIngredients);
  prisma.instruction.findMany.mockResolvedValue(mockInstructions);
  prisma.nutritionFacts.findUnique.mockResolvedValue(mockNutritionFacts);

  return {
    clearMocks: () => {
      prisma.user.findUnique.mockClear();
      prisma.user.findFirst.mockClear();
      prisma.user.create.mockClear();
      prisma.user.update.mockClear();
      prisma.userPreference.findUnique.mockClear();
      prisma.userPreference.findFirst.mockClear();
      prisma.userPreference.create.mockClear();
      prisma.userPreference.update.mockClear();
      prisma.userPreference.upsert.mockClear();
      prisma.recipe.findMany.mockClear();
      prisma.recipe.create.mockClear();
      prisma.recipe.findUnique.mockClear();
      prisma.ingredient.findMany.mockClear();
      prisma.instruction.findMany.mockClear();
      prisma.nutritionFacts.findUnique.mockClear();
    }
  };
}; 