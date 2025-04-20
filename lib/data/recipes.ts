// lib/data/recipes.ts
// Modify imports at the top
import { Recipe, Ingredient, NutritionFacts, Tag, Category, Cuisine, Prisma } from '@prisma/client'; // Add Prisma
import { Instruction } from '@/lib/types/recipe'; // Import Instruction from our defined types
import 'server-only';
import { prisma } from '@/lib/prisma';

// Type definition will now use the correct Instruction type
export type RecipeDetailData = Recipe & {
  ingredients: Ingredient[];
  instructions: Instruction[]; // Uses Instruction from '@/lib/types/recipe'
  author: { // Replace {} with the actual author structure
    id: string;
    name?: string | null;
    image?: string | null;
  } | null;
  nutritionFacts?: NutritionFacts | null;
  tags?: Tag[];
  category?: Category | null;
  cuisine?: Cuisine | null;
  isFavourite?: boolean;
  dietaryNotes?: Prisma.JsonValue | null; // <-- Add this field
};


/**
 * Fetches a single recipe with its full details by ID.
 * Returns null if the recipe is not found or an error occurs.
 * @param id The CUID of the recipe.
 * @returns The detailed recipe data or null.
 */
export async function getRecipeById(id: string): Promise<RecipeDetailData | null> {
  console.log(`[Server Data] Fetching detailed recipe with ID: ${id}`);
  try {
    const recipe = await prisma.recipe.findUnique({
      where: { id },
      include: {
        ingredients: true,
        instructions: {
          orderBy: {
            stepNumber: 'asc',
          },
        },
        nutritionFacts: true,
        author: {
          select: { id: true, name: true, image: true }
        },
        tags: true,
        categories: true,
        cuisines: true,
      },
    });

    if (!recipe) {
      console.warn(`[Server Data] Recipe not found for ID: ${id}`);
      return null;
    }

    // Prisma's generated type with include should match RecipeDetailData if defined correctly
    // The cast might not be strictly necessary but provides an extra layer of type safety
    return recipe as RecipeDetailData;

  } catch (error) {
    console.error(`[Server Data] Failed to fetch recipe ${id}:`, error);
    // In production, consider more generic error handling or logging
    return null; // Return null on error to be handled by the API route/component
  }
  // Remove finally block if using a shared Prisma instance
  // finally {
  //   if (prisma && typeof prisma.$disconnect === 'function') {
  //     await prisma.$disconnect();
  //   }
  // }
}

// Add other server-only data fetching functions here if needed