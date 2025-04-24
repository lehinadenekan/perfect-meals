import { Ingredient, MealType, Recipe, CustomFoodEntry, NutritionFacts, Instruction } from '@prisma/client';
// import { PlannerMealData, PlannerApiResponseDay } from './types'; // Remove potentially incorrect import

// Define necessary types locally if not available from a shared types file
// Mirroring structure from app/meal-planner/page.tsx
type PlannerMealData = {
    id: string;
    plannerDayId: string;
    mealType: MealType;
    mealTime: string | null;
    servings: number | null;
    recipeId: string | null;
    customFoodEntryId: string | null;
    isCompleted: boolean;
    recipe: (Omit<Recipe, 'dietaryNotes' | 'dietaryFeedback' | 'albums' | 'reviews' | 'recipeHistory' | 'categories' | 'cuisines' | 'savedBy' | 'plannedMeals' | 'search_vector'> & {
        nutritionFacts: NutritionFacts | null;
        ingredients: Ingredient[];
        instructions: Instruction[]; 
    }) | null;
    customFoodEntry: CustomFoodEntry | null;
};

// Type for the aggregated shopping list item
export interface ShoppingListItem {
    name: string;
    amount: number;
    unit: string;
    // category?: string; // Optional for future grouping
}

/**
 * Aggregates ingredients from selected meals into a shopping list.
 * @param selectedMeals - An array of PlannerMealData objects for the selected meals.
 * @returns An array of ShoppingListItem objects.
 */
export function generateShoppingList(selectedMeals: PlannerMealData[]): ShoppingListItem[] {
    const aggregatedIngredients: Record<string, ShoppingListItem> = {}; // Use Record for easier aggregation

    // Flatten meals from all selected days - No longer needed, input is already flat meals
    // const allMeals = plannerDays.flatMap(day => day.meals);

    selectedMeals.forEach(meal => {
        // Only process meals linked to a recipe with ingredients
        if (meal.recipe && meal.recipe.ingredients && meal.recipe.ingredients.length > 0) {
            const plannedServings = meal.servings ?? 1.0; // Default to 1 if planned servings not set
            const baseServings = meal.recipe.servings ?? 1.0; // Default to 1 if recipe servings not set
            // Avoid division by zero if baseServings is somehow 0 or null/undefined
            const servingMultiplier = baseServings > 0 ? plannedServings / baseServings : 1.0;

            meal.recipe.ingredients.forEach(ingredient => {
                const key = `${ingredient.name.toLowerCase()}_${ingredient.unit.toLowerCase()}`;
                const existingItem = aggregatedIngredients[key]; // Check if item exists
                
                const amountToAdd = (ingredient.amount ?? 0) * servingMultiplier;

                if (existingItem) {
                    // If item exists, add the amount
                    existingItem.amount += amountToAdd;
                } else {
                    // If item doesn't exist, create it
                    if (amountToAdd > 0) { // Only add if there's an actual amount
                        aggregatedIngredients[key] = {
                            name: ingredient.name, // Use original casing for display name
                            amount: amountToAdd,
                            unit: ingredient.unit,
                        };
                    }
                }
            });
        }
    });

    // Convert the aggregated record back to an array
    return Object.values(aggregatedIngredients);
}

// --- Helper function to normalize units (Example - needs expansion) ---
// Potential future helper function, not strictly needed for basic aggregation
/*
function normalizeUnit(unit: string): string {
    const lowerUnit = unit.toLowerCase();
    if ([ 'ml', 'milliliter', 'milliliters'].includes(lowerUnit)) return 'ml';
    if ([ 'g', 'gram', 'grams'].includes(lowerUnit)) return 'g';
    if ([ 'l', 'liter', 'liters'].includes(lowerUnit)) return 'l';
    // ... add more conversions
    return unit; // Return original if no match
}
*/

// --- Potential Enhancements ---
// - Unit Conversion: Implement logic to convert units (e.g., tbsp to cups, ml to L).
// - Ingredient Categorization: Map ingredients to categories (produce, dairy, pantry) for better organization.
// - Handling Optional Ingredients: Decide how to handle ingredients marked as optional in recipes. 