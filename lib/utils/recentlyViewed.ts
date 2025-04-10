// utils/recentlyViewed.ts
import { Recipe } from '@/lib/types/recipe'; // Import the main Recipe type

// Use the full Recipe type for storage
// export interface RecentlyViewedRecipe { ... }

const STORAGE_KEY = 'recentlyViewedRecipes';
const MAX_RECENTLY_VIEWED = 12; // Change limit from 20 to 12

/**
 * Retrieves the list of recently viewed recipes from Local Storage.
 * Returns an empty array if nothing is found or if parsing fails.
 */
// Update return type to Recipe[]
export function getRecentlyViewed(): Recipe[] {
  try {
    if (typeof window === 'undefined' || typeof window.localStorage === 'undefined') {
        return [];
    }
    const storedValue = localStorage.getItem(STORAGE_KEY);
    if (!storedValue) {
      return [];
    }
    const parsedValue = JSON.parse(storedValue);
    // Add more robust validation if needed, but basic array check for now
    return Array.isArray(parsedValue) ? parsedValue : [];
  } catch (error) {
    console.error("Error reading recently viewed recipes from Local Storage:", error);
    return [];
  }
}

/**
 * Adds a recipe to the recently viewed list in Local Storage.
 * Ensures the recipe is at the top and the list size is limited.
 * @param recipe - The full recipe object to add.
 */
 // Update parameter type to Recipe
export function addRecentlyViewed(recipe: Recipe): void {
  if (!recipe || !recipe.id) return; // Need an ID

  try {
    if (typeof window === 'undefined' || typeof window.localStorage === 'undefined') {
        console.warn("LocalStorage not available, cannot save recently viewed recipe.");
        return;
    }
    const currentList = getRecentlyViewed();

    // Remove the recipe if it already exists to move it to the top
    const filteredList = currentList.filter(item => item.id !== recipe.id);

    // Add the full recipe object to the beginning
    const newList = [recipe, ...filteredList];

    // Limit the list size
    const limitedList = newList.slice(0, MAX_RECENTLY_VIEWED);

    // --- DEBUG: Log the data being saved ---
    console.log("Saving to LocalStorage:", limitedList);
    // ---------------------------------------

    localStorage.setItem(STORAGE_KEY, JSON.stringify(limitedList));

  } catch (error) {
    console.error("Error saving recently viewed recipe to Local Storage:", error);
  }
} 