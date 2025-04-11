import { createMockPrismaClient, setupPrismaMocks, mockUserData, mockUserPreference, mockRecipe } from './prisma-utils';

describe('Prisma Operations', () => {
  let prisma: ReturnType<typeof createMockPrismaClient>;
  let cleanup: () => void;

  beforeEach(() => {
    prisma = createMockPrismaClient();
    const mocks = setupPrismaMocks(prisma);
    cleanup = mocks.clearMocks;
  });

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  describe('User Operations', () => {
    it('should find a user by email', async () => {
      const user = await prisma.user.findUnique({
        where: { email: 'test@example.com' }
      });
      expect(user).toEqual(mockUserData);
      expect(prisma.user.findUnique).toHaveBeenCalledTimes(1);
    });

    it('should create a new user', async () => {
      const newUser = await prisma.user.create({
        data: {
          email: 'new@example.com',
          name: 'New User'
        }
      });
      expect(newUser).toBeDefined();
      expect(prisma.user.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('UserPreference Operations', () => {
    it('should find preferences by user email', async () => {
      const prefs = await prisma.userPreference.findUnique({
        where: { userEmail: 'test@example.com' }
      });
      expect(prefs).toEqual(mockUserPreference);
      expect(prisma.userPreference.findUnique).toHaveBeenCalledTimes(1);
    });

    it('should update user preferences', async () => {
      const updatedPrefs = await prisma.userPreference.update({
        where: { userEmail: 'test@example.com' },
        data: {
          dietTypes: ['vegetarian'],
          excludedFoods: ['nuts']
        }
      });
      expect(updatedPrefs).toBeDefined();
      expect(prisma.userPreference.update).toHaveBeenCalledTimes(1);
    });

    it('should upsert user preferences', async () => {
      const prefs = await prisma.userPreference.upsert({
        where: { userEmail: 'test@example.com' },
        create: {
          userEmail: 'test@example.com',
          dietTypes: ['vegan'],
          excludedFoods: []
        },
        update: {
          dietTypes: ['vegan'],
          excludedFoods: []
        }
      });
      expect(prefs).toBeDefined();
      expect(prisma.userPreference.upsert).toHaveBeenCalledTimes(1);
    });
  });

  describe('Recipe Operations', () => {
    it('should find recipes with filters', async () => {
      const recipes = await prisma.recipe.findMany({
        where: {
          isVegan: true,
          isGlutenFree: true
        },
        include: {
          ingredients: true,
          instructions: true,
          nutritionFacts: true
        }
      });
      expect(recipes).toHaveLength(1);
      expect(recipes[0]).toEqual(mockRecipe);
      expect(prisma.recipe.findMany).toHaveBeenCalledTimes(1);
    });

    it('should create a new recipe with related data', async () => {
      const recipe = await prisma.recipe.create({
        data: {
          title: 'New Recipe',
          description: 'Test recipe',
          cookingTime: 30,
          servings: 2,
          difficulty: 'EASY',
          cuisineType: 'ITALIAN',
          authorId: 'test-user-id',
          isVegetarian: false,
          isVegan: false,
          isGlutenFree: true,
          isLactoseFree: true,
          isNutFree: true,
          needsDietaryReview: false,
          regionOfOrigin: 'Italy',
          notes: [],
          calories: 500,
          isFermented: false,
          isLowFodmap: false,
          isPescatarian: false,
          cuisines: {
            connect: { id: '1' }
          }
        }
      });
      expect(recipe).toBeDefined();
      expect(prisma.recipe.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('Complex Operations', () => {
    it('should handle concurrent operations', async () => {
      const operations = [
        prisma.user.findUnique({ where: { email: 'test@example.com' } }),
        prisma.userPreference.findUnique({ where: { userEmail: 'test@example.com' } }),
        prisma.recipe.findMany({ where: { isVegan: true } })
      ];

      const [user, prefs, recipes] = await Promise.all(operations);
      
      expect(user).toBeDefined();
      expect(prefs).toBeDefined();
      expect(recipes).toBeDefined();
    });

    it('should handle nested transactions', async () => {
      const result = await prisma.$transaction(async (tx) => {
        const user = await tx.user.findUnique({
          where: { email: 'test@example.com' }
        });

        const prefs = await tx.userPreference.upsert({
          where: { userEmail: user!.email },
          create: {
            userEmail: user!.email,
            dietTypes: ['vegan'],
            excludedFoods: []
          },
          update: {
            dietTypes: ['vegan']
          }
        });

        return { user, prefs };
      });

      expect(result.user).toBeDefined();
      expect(result.prefs).toBeDefined();
    });
  });
}); 