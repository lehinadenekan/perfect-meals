export interface Ingredient {
  name: string;
  category: string;
  variations?: string[];
  notes?: string;
}

const ingredients: Ingredient[] = [];

/**
 * Filters ingredients by specific dietary preferences
 * @param preferences - Object containing various filter preferences
 */
export function filterIngredients(preferences: {
  vegan?: boolean;
  vegetarian?: boolean;
  glutenFree?: boolean;
  nutFree?: boolean;
  lowFodmap?: boolean;
  lactoseFree?: boolean;
  pescatarian?: boolean;
  fermented?: boolean;
  excludeCategories?: string[];
  includeOnlyCategories?: string[];
}): Ingredient[] {
  let filteredIngredients = [...ingredients];

  if (preferences.vegan) {
    const excludedCategories = ['meat', 'fish', 'seafood', 'dairy', 'egg'];
    filteredIngredients = filteredIngredients.filter(
      ingredient => !excludedCategories.includes(ingredient.category.toLowerCase())
    );
  } else if (preferences.vegetarian) {
    const excludedCategories = ['meat', 'fish', 'seafood'];
    filteredIngredients = filteredIngredients.filter(
      ingredient => !excludedCategories.includes(ingredient.category.toLowerCase())
    );
  }

  if (preferences.glutenFree) {
    filteredIngredients = filteredIngredients.filter(ingredient => {
      const glutenSources = ['wheat', 'barley', 'rye'];
      return !glutenSources.some(source => 
        ingredient.name.toLowerCase().includes(source) ||
        ingredient.variations?.some(v => v.toLowerCase().includes(source))
      );
    });
  }

  if (preferences.nutFree) {
    filteredIngredients = filteredIngredients.filter(
      ingredient => !ingredient.category.toLowerCase().includes('nut')
    );
  }

  if (preferences.lowFodmap) {
    const highFodmapFoods = ['onion', 'garlic', 'wheat', 'rye', 'dairy'];
    filteredIngredients = filteredIngredients.filter(ingredient => 
      !highFodmapFoods.some(food => 
        ingredient.name.toLowerCase().includes(food) ||
        ingredient.variations?.some(v => v.toLowerCase().includes(food))
      )
    );
  }

  if (preferences.lactoseFree) {
    filteredIngredients = filteredIngredients.filter(
      ingredient => !ingredient.category.toLowerCase().includes('dairy')
    );
  }

  if (preferences.pescatarian) {
    const excludedCategories = ['meat'];
    filteredIngredients = filteredIngredients.filter(
      ingredient => !excludedCategories.includes(ingredient.category.toLowerCase())
    );
  }

  if (preferences.fermented) {
    filteredIngredients = filteredIngredients.filter(ingredient => 
      ingredient.category.toLowerCase().includes('fermented') ||
      ingredient.notes?.toLowerCase().includes('ferment')
    );
  }
  
  // Exclude certain categories if specified
  if (preferences.excludeCategories?.length) {
    filteredIngredients = filteredIngredients.filter(
      ingredient => !preferences.excludeCategories?.includes(ingredient.category)
    );
  }
  
  // Include only certain categories if specified
  if (preferences.includeOnlyCategories?.length) {
    filteredIngredients = filteredIngredients.filter(
      ingredient => preferences.includeOnlyCategories?.includes(ingredient.category)
    );
  }
  
  return filteredIngredients;
} 