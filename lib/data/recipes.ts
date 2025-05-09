// lib/data/recipes.ts
// Modify imports at the top
import { Recipe, Ingredient, NutritionFacts, Tag, Category, Cuisine, DietaryNotes } from '@prisma/client'; // Removed Prisma as it was unused
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
  dietaryNotes?: DietaryNotes | null; // <-- Changed from Prisma.JsonValue
  notes?: string[]; // Explicitly adding notes here
  // Ensure all fields selected below are potentially part of this type or the base Recipe type
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
      select: {
        id: true,
        title: true,
        description: true,
        servings: true,
        cookingTime: true,
        difficulty: true,
        imageUrl: true,
        authorId: true,
        source: true,
        createdAt: true,
        updatedAt: true,
        nutritionFactsId: true,
        dietaryNotesId: true,
        isPublic: true,
        calories: true,
        // Scalar fields that were in the API response but might be from direct Recipe model or relations
        // Check schema: protein, carbs, fat were direct on Recipe model in a previous version.
        // Assuming they are still direct for this select. If they were moved to NutritionFacts exclusively, remove from here.
        protein: true, 
        carbs: true,
        fat: true,
        type: true,
        isVegetarian: true,
        isVegan: true,
        isGlutenFree: true,
        isDairyFree: true,
        isNutFree: true,
        isPescatarian: true,
        isLactoseFree: true,
        isLowFodmap: true,
        isSpicy: true,
        isFermented: true,
        cookingStyles: true,
        mealCategories: true,
        notes: true, // Explicitly select notes
        cuisineId: true,

        // Relations (ensure these are correct based on RecipeDetailData needs)
        ingredients: true, // Selects all fields of related ingredients
        instructions: {
          orderBy: {
            stepNumber: 'asc',
          },
        },
        nutritionFacts: true, // Selects the full related NutritionFacts object
        author: {
          select: { id: true, name: true, image: true }
        },
        categories: true, // Selects related categories
        cuisine: true,    // Selects the full related Cuisine object
        dietaryNotes: true // Selects the full related DietaryNotes object
        // regions: true, // If regions are needed by RecipeDetailData
      },
    });

    if (!recipe) {
      console.warn(`[Server Data] Recipe not found for ID: ${id}`);
      return null;
    }
    
    // Now TypeScript should be happy because 'notes' is explicitly selected
    console.log(`[Server Data] Raw recipe.notes from Prisma for ID ${id}:`, recipe.notes);

    return recipe as RecipeDetailData;

  } catch (error) {
    console.error(`[Server Data] Failed to fetch recipe ${id}:`, error);
    return null;
  }
}

// Add other server-only data fetching functions here if needed