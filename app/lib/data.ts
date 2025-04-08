import { PrismaClient, Recipe } from '@prisma/client';
import 'server-only'; // Ensures this module only runs on the server

const prisma = new PrismaClient();

// Define the shape of the detailed recipe we expect
// Ensure this includes all relations needed by the display component
export type RecipeDetailData = Recipe & {
  ingredients: { 
      id: string; 
      amount: number; 
      unit: string; 
      name: string; 
      notes: string | null;
  }[];
  instructions: { id: string; stepNumber: number; description: string }[];
  // Add other relations if needed, e.g., author, reviews, nutritionFacts
  // author: { name: string | null }; 
};

/**
 * Fetches a single recipe with its ingredients and instructions by ID.
 * Throws an error if the recipe is not found.
 * @param id The CUID of the recipe.
 * @returns The recipe data including ingredients and instructions.
 */
export async function getRecipeById(id: string): Promise<RecipeDetailData | null> {
  console.log(`[Server Data] Fetching recipe with ID: ${id}`);
  try {
    const recipe = await prisma.recipe.findUnique({
      where: { id },
      include: {
        ingredients: true, // This should include the scalar 'notes' field
        instructions: { 
          orderBy: {
            stepNumber: 'asc',
          },
        },
        // author: { select: { name: true } }, 
      },
    });

    if (!recipe) {
      console.warn(`[Server Data] Recipe not found for ID: ${id}`);
      return null; 
    }

    // Explicitly cast to RecipeDetailData after fetch if needed, 
    // but Prisma's generated types with include should align if the type definition is correct.
    return {
      ...recipe,
      ingredients: recipe.ingredients || [],
      instructions: recipe.instructions || [],
    } as RecipeDetailData; // Added cast for type safety assurance

  } catch (error) {
    console.error(`[Server Data] Failed to fetch recipe ${id}:`, error);
    return null;
  }
}

// Add other server-only data fetching functions here if needed 