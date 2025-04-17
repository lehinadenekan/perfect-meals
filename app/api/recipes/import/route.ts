// app/api/recipes/import/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { Prisma } from '@prisma/client'; // Import Prisma types
import { getServerSession } from 'next-auth/next'; // Or your auth provider's method
import { authOptions } from '@/lib/auth'; // Adjust path to your auth options
import { prisma } from '@/lib/prisma'; // Adjust path to your prisma client instance

// Define the expected input schema for saving an imported recipe
const SaveImportedRecipeSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters." }),
  ingredients: z.array(z.string().min(1)).min(1, { message: "At least one ingredient is required." }),
  instructions: z.array(z.string().min(1)).min(1, { message: "At least one instruction step is required." }),
  description: z.string().nullable().optional(), // Allow string, null, or undefined
  imageUrl: z.string().url({ message: "Invalid Image URL" }).nullable().optional().or(z.literal('')), // Allow string, null, undefined, or ""
  servings: z.string().nullable().optional(), // Allow string, null, or undefined
  totalTime: z.string().nullable().optional(), // Allow string, null, or undefined
});

// --- Helper: Attempt to parse servings string to integer ---
// Updated to accept null as input
const parseServings = (servingsStr: string | null | undefined): number | undefined => {
  if (!servingsStr) return undefined; // Handles null and undefined
  const match = servingsStr.match(/^\d+/);
  return match ? parseInt(match[0], 10) : undefined;
};

// --- Helper: Attempt to parse ingredient string ---
const parseIngredient = (ingredientStr: string): { name: string; amount: number | null; unit: string | null; notes: string | null } => {
    const quantityRegex = /^(\d+\s*\d*\/\d+|\d+\.\d+|\d+)\s*/;
    const unitRegex = /^(cup|cups|oz|ounce|ounces|g|gram|grams|kg|kilogram|kilograms|lb|lbs|pound|pounds|tsp|teaspoon|teaspoons|tbsp|tablespoon|tablespoons|ml|milliliter|milliliters|l|liter|liters|pinch|dash|to taste|clove|cloves)/i;

    let remainingStr = ingredientStr.trim();
    let amountStr: string | null = null;
    let unit: string | null = null;
    let notes: string | null = null;

    const quantityMatch = remainingStr.match(quantityRegex);
    if (quantityMatch) {
        amountStr = quantityMatch[1].trim();
        remainingStr = remainingStr.substring(quantityMatch[0].length).trim();
    }

    const unitMatch = remainingStr.match(unitRegex);
     if (unitMatch) {
         unit = unitMatch[0].trim();
         remainingStr = remainingStr.substring(unitMatch[0].length).trim();
         // Standardize units if needed (optional)
         // Example: if (unit.endsWith('s') && unit.length > 1 && !['gas'].includes(unit.toLowerCase())) { unit = unit.slice(0, -1); }
     }

     // Extract notes in parentheses
     const notesMatch = remainingStr.match(/\(([^)]+)\)/);
     if (notesMatch) {
         notes = notesMatch[1].trim();
         remainingStr = remainingStr.replace(notesMatch[0], '').trim();
     }

     // Clean up ingredient name
     const name = remainingStr.replace(/^,/, '').replace(/\s+/g, ' ').trim();

    // Parse amount string
    let amount: number | null = null;
    if (amountStr) {
        try {
            if (amountStr.includes('/')) {
                const parts = amountStr.split(/[\s/]+/); // Split on space or /
                if (parts.length === 3 && parts[1] && parts[2]) { // Mixed fraction e.g., "1 1/2"
                    amount = parseInt(parts[0]) + parseInt(parts[1]) / parseInt(parts[2]);
                } else if (parts.length === 2 && parts[0] && parts[1]) { // Simple fraction e.g., "1/2"
                    amount = parseInt(parts[0]) / parseInt(parts[1]);
                } else { // Just a number with a slash? Treat as invalid for now
                     amount = null;
                }
            } else { // Whole or decimal number
                amount = parseFloat(amountStr);
            }
            // Ensure valid number
            if (amount !== null && (isNaN(amount) || !isFinite(amount))) {
                 amount = null;
            }
        } catch {
            amount = null; // Reset on parsing error
        }
    }

    // If name is empty after parsing, use original string
    return {
        name: name || ingredientStr,
        amount,
        unit,
        notes
    };
};


export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const userIdentifier = session?.user?.id;
    if (!userIdentifier) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const validation = SaveImportedRecipeSchema.safeParse(body);

    if (!validation.success) {
      console.error("[SAVE_IMPORTED_RECIPE] Validation failed:", validation.error.flatten());
      return NextResponse.json(
        { error: 'Invalid recipe data provided', details: validation.error.flatten().fieldErrors },
        { status: 422 }
      );
    }

    const recipeData = validation.data;
    console.log(`[SAVE_IMPORTED_RECIPE] Received request from user ${userIdentifier} to save: ${recipeData.title}`);

    // Use transaction for atomicity
    const createdRecipe = await prisma.$transaction(async (tx) => {
        // Pass recipeData.servings (string | null | undefined) directly
        const servingsInt = parseServings(recipeData.servings);

        const newRecipe = await tx.recipe.create({
            data: {
                title: recipeData.title,
                description: recipeData.description, // Already handles null/undefined from Zod
                imageUrl: recipeData.imageUrl || null, // Ensure empty string becomes null
                servings: servingsInt, // Parsed integer or undefined
                authorId: userIdentifier,
            },
        });

        // --- Ingredient Processing ---
        const ingredientsToCreate = recipeData.ingredients.map(ingStr => {
          const parsed = parseIngredient(ingStr);
          // Prisma expects non-null values for non-optional fields, use defaults
          return {
              name: parsed.name,
              amount: parsed.amount ?? 0, // Default amount if parsing fails or is 0/null
              unit: parsed.unit ?? '',     // Default unit if parsing fails or is null
              notes: parsed.notes, // Nullable
              recipeId: newRecipe.id,
          };
        }).filter(ing => ing.name); // Filter out any potentially empty ingredients

        if (ingredientsToCreate.length > 0) {
          await tx.ingredient.createMany({ data: ingredientsToCreate });
        }

        // --- Instruction Processing ---
        const instructionsToCreate = recipeData.instructions
          .map((instStr, index) => ({
            stepNumber: index + 1,
            description: instStr.trim(), // Trim whitespace
            recipeId: newRecipe.id,
          }))
          .filter(inst => inst.description); // Filter out empty instructions

        if (instructionsToCreate.length > 0) {
           await tx.instruction.createMany({ data: instructionsToCreate });
        }

        return newRecipe; // Return the created recipe object
    });

    console.log(`[SAVE_IMPORTED_RECIPE] Successfully saved recipe ${createdRecipe.id} for user ${userIdentifier}`);

    // Return only essential data to the client
    return NextResponse.json({ data: { id: createdRecipe.id, title: createdRecipe.title } }, { status: 201 });

  } catch (error: unknown) {
     console.error('[SAVE_IMPORTED_RECIPE_API_ERROR]', error);
     let message = 'Failed to save imported recipe.';
     let status = 500;

     // Handle known Prisma errors more specifically
     if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // Unique constraint violation (e.g., duplicate title)
        if (error.code === 'P2002') {
             // Attempt to get the field name from meta if available
             const field = (error.meta as { target?: string[] })?.target?.[0] ?? 'field';
             message = `A recipe with this ${field} might already exist.`;
             status = 409; // Conflict
        }
        // Add other specific Prisma error codes if needed
     } else if (error instanceof Prisma.PrismaClientValidationError) {
         // Data failed Prisma's internal validation (e.g., wrong type before DB)
         message = 'Invalid data format for saving recipe.';
         status = 400; // Bad Request
     } else if (error instanceof z.ZodError) {
         // Catch Zod errors specifically if safeParse somehow misses them (unlikely here)
         message = 'Invalid recipe data provided.';
         status = 422;
     }
     // Consider adding more specific error handling if needed

     return NextResponse.json({ error: message }, { status });
  }
}