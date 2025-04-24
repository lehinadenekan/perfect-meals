import { Prisma } from '@prisma/client';

// Define the structure for calculated daily totals
export interface DailyMacroTotals {
  date: Date;
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
}

// Define a type for the input data (PlannerDay with nested meals/recipe/customFood)
// This should match the structure returned by GET /api/planner
type PlannerDayWithMeals = Prisma.PlannerDayGetPayload<{
  include: {
    meals: {
      include: {
        recipe: {
          select: {
            id: true;
            title: true;
            imageUrl: true;
            nutritionFacts: true;
            servings: true; // Recipe's default servings
          };
        };
        customFoodEntry: {
          select: {
            id: true;
            name: true;
            servingSize: true;
            calories: true;
            protein: true;
            carbs: true;
            fat: true;
          };
        };
      };
    };
  };
}>;

/**
 * Calculates the total macronutrients for each day based on planned meals.
 * @param plannerDays - Array of PlannerDay objects with included meals, recipes, and custom foods.
 * @returns An array of DailyMacroTotals objects.
 */
export function calculateDailyMacros(plannerDays: PlannerDayWithMeals[]): DailyMacroTotals[] {
  const dailyTotals: DailyMacroTotals[] = [];

  for (const day of plannerDays) {
    let todaysCalories = 0;
    let todaysProtein = 0;
    let todaysCarbs = 0;
    let todaysFat = 0;

    for (const meal of day.meals) {
      const plannedServings = meal.servings ?? 1.0; // Default to 1 serving if not specified

      if (meal.recipe && meal.recipe.nutritionFacts) {
        const recipe = meal.recipe;
        const nutrition = recipe.nutritionFacts;
        const recipeBaseServings = recipe.servings ?? 1; // Default base servings to 1 if not set
        const servingsMultiplier = recipeBaseServings > 0 ? plannedServings / recipeBaseServings : 0;

        // Calculate macros based on planned servings relative to recipe's base servings
        // Estimate calories from macros (P*4 + C*4 + F*9) as NutritionFacts lacks a calories field
        todaysCalories += ((nutrition?.protein ?? 0) * 4 + (nutrition?.carbs ?? 0) * 4 + (nutrition?.fat ?? 0) * 9) * servingsMultiplier;
        todaysProtein += (nutrition?.protein ?? 0) * servingsMultiplier;
        todaysCarbs += (nutrition?.carbs ?? 0) * servingsMultiplier;
        todaysFat += (nutrition?.fat ?? 0) * servingsMultiplier;

      } else if (meal.customFoodEntry) {
        const customFood = meal.customFoodEntry;

        // Calculate macros based on planned servings (assuming custom food macros are per single serving)
        todaysCalories += (customFood.calories ?? 0) * plannedServings;
        todaysProtein += (customFood.protein ?? 0) * plannedServings;
        todaysCarbs += (customFood.carbs ?? 0) * plannedServings;
        todaysFat += (customFood.fat ?? 0) * plannedServings;
      }
    }

    dailyTotals.push({
      date: day.date,
      totalCalories: Math.round(todaysCalories),
      totalProtein: Math.round(todaysProtein),
      totalCarbs: Math.round(todaysCarbs),
      totalFat: Math.round(todaysFat),
    });
  }

  return dailyTotals;
} 