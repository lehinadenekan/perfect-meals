// lib/data/recipes.ts
// Remove unused PrismaClient and User imports
// import { PrismaClient, Recipe, Ingredient, Instruction, User } from '@prisma/client';
import { Recipe, Ingredient, Instruction, NutritionFacts, Tag, Category, Cuisine } from '@prisma/client'; // Keep used types
import 'server-only'; // Ensures this module only runs on the server

// Assume a shared Prisma client instance if you have one in lib/prisma.ts
import { prisma } from '@/lib/prisma'; // Correct import for prisma client

// Define the detailed recipe data structure including related fields
export type RecipeDetailData = Recipe & {
  ingredients: Ingredient[];
  instructions: Instruction[];
  author: {
    id: string;
    name?: string | null;
    image?: string | null;
  } | null;
  nutritionFacts?: NutritionFacts | null; // Use the imported type
  tags?: Tag[]; // Use the imported type
  category?: Category | null; // Use the imported type
  cuisine?: Cuisine | null; // Use the imported type
  isFavourite?: boolean;
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
        // --- MODIFIED INCLUDE BLOCK ---
        ingredients: true,
        instructions: {
          orderBy: {
            stepNumber: 'asc',
          },
        },
        nutritionFacts: true, // Include related nutrition facts
        author: { // Include author details
          select: { // Select only necessary fields
             id: true,
             name: true,
             image: true,
          }
        },
        tags: true, // Include related tags
        categories: true, // Include related categories
        cuisines: true, // Include related cuisines
        // Include other relations as needed by RecipeDetailModal here
        // --- END MODIFIED INCLUDE BLOCK ---
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