// __tests__/api/generateRecipes.test.ts

import { testApiHandler } from 'next-test-api-route-handler';
import * as recipesGenerateRoute from '@/app/api/recipes/generate/route'; // Import all exports
import { prismaMock } from '@/src/test/utils/prisma-mock'; // Adjust path if needed
import { createMockRecipe } from '@/src/test/utils/test-utils'; // Adjust path if needed

describe('POST /api/recipes/generate', () => {

  beforeEach(() => {
    // Reset mocks before each test
    prismaMock.recipe.findMany.mockClear();
  });

  it('should generate recipes based on diet types', async () => {
    const mockVeganRecipes = [
      createMockRecipe({ id: 'v1', title: 'Vegan Pasta', isVegan: true }),
      createMockRecipe({ id: 'v2', title: 'Vegan Curry', isVegan: true }),
    ];
    prismaMock.recipe.findMany.mockResolvedValue(mockVeganRecipes);

    await testApiHandler({
      appHandler: recipesGenerateRoute,
      // url: '/api/recipes/generate', // Optional: For logging/clarity
      test: async ({ fetch }) => {
        const res = await fetch({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            dietTypes: ['vegan'], // Example input
            excludedFoods: [],
            selectedRegions: [],
           }),
        });

        await expect(res.json()).resolves.toEqual({
          success: true,
          recipes: expect.arrayContaining([
            expect.objectContaining({ id: 'v1', title: 'Vegan Pasta' }),
            expect.objectContaining({ id: 'v2', title: 'Vegan Curry' }),
          ]),
        });
        expect(res.status).toBe(200);

        // Check if Prisma was called with expected filters
        expect(prismaMock.recipe.findMany).toHaveBeenCalledWith(
          expect.objectContaining({
            where: expect.objectContaining({
              AND: expect.arrayContaining([ { isVegan: true } ])
            }),
          })
        );
      },
    });
  });

  it('should return 400 if input validation fails (e.g., missing dietTypes)', async () => {
    await testApiHandler({
      appHandler: recipesGenerateRoute,
      test: async ({ fetch }) => {
        const res = await fetch({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            // Missing dietTypes 
            excludedFoods: [],
            selectedRegions: [],
           }),
        });
        
        expect(res.status).toBe(400);
        await expect(res.json()).resolves.toEqual(expect.objectContaining({ error: expect.any(String) }));
      },
    });
  });

  it('should return 500 if database query fails', async () => {
    prismaMock.recipe.findMany.mockRejectedValue(new Error('Database Error'));

    await testApiHandler({
      appHandler: recipesGenerateRoute,
      test: async ({ fetch }) => {
        const res = await fetch({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            dietTypes: ['vegan'],
            excludedFoods: [],
            selectedRegions: [],
           }),
        });
        
        expect(res.status).toBe(500);
        await expect(res.json()).resolves.toEqual(expect.objectContaining({ error: 'Database Error' }));
      },
    });
  });

  // Add more tests:
  // - Test with excludedFoods
  // - Test with selectedRegions
  // - Test combination of filters
  // - Test case where no recipes are found
}); 