"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRecentlyViewed = getRecentlyViewed;
exports.addRecentlyViewed = addRecentlyViewed;
// Use the full Recipe type for storage
// export interface RecentlyViewedRecipe { ... }
var STORAGE_KEY = 'recentlyViewedRecipes';
var MAX_RECENTLY_VIEWED = 12; // Change limit from 20 to 12
/**
 * Retrieves the list of recently viewed recipes from Local Storage.
 * Returns an empty array if nothing is found or if parsing fails.
 */
// Update return type to Recipe[]
function getRecentlyViewed() {
    try {
        if (typeof window === 'undefined' || typeof window.localStorage === 'undefined') {
            return [];
        }
        var storedValue = localStorage.getItem(STORAGE_KEY);
        if (!storedValue) {
            return [];
        }
        var parsedValue = JSON.parse(storedValue);
        // Add more robust validation if needed, but basic array check for now
        return Array.isArray(parsedValue) ? parsedValue : [];
    }
    catch (error) {
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
function addRecentlyViewed(recipe) {
    if (!recipe || !recipe.id)
        return; // Need an ID
    try {
        if (typeof window === 'undefined' || typeof window.localStorage === 'undefined') {
            console.warn("LocalStorage not available, cannot save recently viewed recipe.");
            return;
        }
        var currentList = getRecentlyViewed();
        // Remove the recipe if it already exists to move it to the top
        var filteredList = currentList.filter(function (item) { return item.id !== recipe.id; });
        // Add the full recipe object to the beginning
        var newList = __spreadArray([recipe], filteredList, true);
        // Limit the list size
        var limitedList = newList.slice(0, MAX_RECENTLY_VIEWED);
        // --- DEBUG: Log the data being saved ---
        console.log("Saving to LocalStorage:", limitedList);
        // ---------------------------------------
        localStorage.setItem(STORAGE_KEY, JSON.stringify(limitedList));
    }
    catch (error) {
        console.error("Error saving recently viewed recipe to Local Storage:", error);
    }
}
