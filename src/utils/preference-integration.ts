import { filterIngredients } from './dietary-filters';

export type DietaryPreference = 
  | 'Gluten-Free'
  | 'Fermented'
  | 'Low-FODMAP'
  | 'Lactose-Free'
  | 'Pescatarian'
  | 'Nut-Free'
  | 'Vegan'
  | 'Vegetarian';

interface Ingredient {
  name: string;
  category: string;
  variations?: string[];
  notes?: string;
}

/**
 * Maps UI dietary preferences to filtering functions and criteria
 * @param selectedPreferences - Array of dietary preferences selected in the UI
 * @returns Filtered ingredients based on all selected preferences
 */
export function getFilteredIngredientsByPreferences(selectedPreferences: DietaryPreference[]) {
  // Start with all ingredients
  let filteredIngredients: Ingredient[] = [];
  
  // Apply each preference filter
  for (const preference of selectedPreferences) {
    switch (preference) {
      case 'Gluten-Free':
        // Filter out ingredients containing gluten
        filteredIngredients = filteredIngredients.filter(ingredient => 
          !['wheat', 'barley', 'rye'].some(glutenGrain => 
            ingredient.name.toLowerCase().includes(glutenGrain) || 
            (ingredient.variations?.some(v => v.toLowerCase().includes(glutenGrain)) ?? false)
          )
        );
        break;
        
      case 'Fermented':
        // Only include fermented foods
        filteredIngredients = filteredIngredients.filter(ingredient => 
          ingredient.category.includes('fermented') || 
          (ingredient.notes?.toLowerCase().includes('ferment') ?? false)
        );
        break;
        
      case 'Low-FODMAP':
        // Implementation for Low-FODMAP would require additional data about FODMAP content
        // For now, using a simplified approach - this should be enhanced with proper FODMAP data
        const highFodmapFoods = ['onion', 'garlic', 'wheat', 'rye', 'barley', 'dairy'];
        filteredIngredients = filteredIngredients.filter(ingredient => 
          !highFodmapFoods.some(fodmap => 
            ingredient.name.toLowerCase().includes(fodmap) || 
            (ingredient.variations?.some(v => v.toLowerCase().includes(fodmap)) ?? false)
          )
        );
        break;
        
      case 'Pescatarian':
        // Filter out all meats except fish and seafood
        filteredIngredients = filteredIngredients.filter(ingredient => {
          // Keep if it's not meat/processed meat OR if it's fish/seafood
          if (ingredient.category === 'fish' || ingredient.category === 'seafood') {
            return true;
          }
          return ingredient.category !== 'meat' && ingredient.category !== 'processed meat';
        });
        break;
        
      case 'Vegan':
        // Filter out all animal products
        const animalCategories = ['meat', 'processed meat', 'fish', 'seafood', 'dairy', 'protein'];
        filteredIngredients = filteredIngredients.filter(ingredient => 
          !animalCategories.includes(ingredient.category) &&
          // Check for egg specifically since eggs might be in 'protein' category
          !ingredient.name.toLowerCase().includes('egg')
        );
        break;
        
      case 'Vegetarian':
        // Filter out meat, fish, and seafood
        const meatCategories = ['meat', 'processed meat', 'fish', 'seafood'];
        filteredIngredients = filteredIngredients.filter(ingredient => 
          !meatCategories.includes(ingredient.category)
        );
        break;
        
      case 'Nut-Free':
        // Filter out nuts
        filteredIngredients = filteredIngredients.filter(ingredient => 
          !ingredient.category.toLowerCase().includes('nut')
        );
        break;
        
      case 'Lactose-Free':
        // Filter out dairy
        filteredIngredients = filteredIngredients.filter(ingredient => 
          !ingredient.category.toLowerCase().includes('dairy')
        );
        break;
    }
  }
  
  return filteredIngredients;
}

/**
 * Applies dietary preferences to filter ingredients
 * @param selectedPreferences - Array of dietary preference strings
 * @returns Filtered ingredients based on preferences
 */
export function applyDietaryPreferences(selectedPreferences: string[]) {
  // Apply dietary filters based on preferences
  const preferences = {
    vegan: selectedPreferences.includes('Vegan'),
    vegetarian: selectedPreferences.includes('Vegetarian'),
    glutenFree: selectedPreferences.includes('Gluten-Free'),
    nutFree: selectedPreferences.includes('Nut-Free'),
    lowFodmap: selectedPreferences.includes('Low-FODMAP'),
    lactoseFree: selectedPreferences.includes('Lactose-Free'),
    pescatarian: selectedPreferences.includes('Pescatarian'),
    fermented: selectedPreferences.includes('Fermented'),
    excludeCategories: [],
    includeOnlyCategories: []
  };

  // Apply filters based on preferences
  return filterIngredients(preferences);
} 