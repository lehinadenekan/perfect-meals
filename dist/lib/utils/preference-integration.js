"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFilteredIngredientsByPreferences = getFilteredIngredientsByPreferences;
exports.applyDietaryPreferences = applyDietaryPreferences;
var dietary_filters_1 = require("./dietary-filters");
/**
 * Maps UI dietary preferences to filtering functions and criteria
 * @param selectedPreferences - Array of dietary preferences selected in the UI
 * @returns Filtered ingredients based on all selected preferences
 */
function getFilteredIngredientsByPreferences(selectedPreferences) {
    // Start with all ingredients
    var filteredIngredients = [];
    var _loop_1 = function (preference) {
        switch (preference) {
            case 'Gluten-Free':
                // Filter out ingredients containing gluten
                filteredIngredients = filteredIngredients.filter(function (ingredient) {
                    return !['wheat', 'barley', 'rye'].some(function (glutenGrain) {
                        var _a, _b;
                        return ingredient.name.toLowerCase().includes(glutenGrain) ||
                            ((_b = (_a = ingredient.variations) === null || _a === void 0 ? void 0 : _a.some(function (v) { return v.toLowerCase().includes(glutenGrain); })) !== null && _b !== void 0 ? _b : false);
                    });
                });
                break;
            case 'Fermented':
                // Only include fermented foods
                filteredIngredients = filteredIngredients.filter(function (ingredient) {
                    var _a, _b;
                    return ingredient.category.includes('fermented') ||
                        ((_b = (_a = ingredient.notes) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes('ferment')) !== null && _b !== void 0 ? _b : false);
                });
                break;
            case 'Low-FODMAP':
                // Implementation for Low-FODMAP would require additional data about FODMAP content
                // For now, using a simplified approach - this should be enhanced with proper FODMAP data
                var highFodmapFoods_1 = ['onion', 'garlic', 'wheat', 'rye', 'barley', 'dairy'];
                filteredIngredients = filteredIngredients.filter(function (ingredient) {
                    return !highFodmapFoods_1.some(function (fodmap) {
                        var _a, _b;
                        return ingredient.name.toLowerCase().includes(fodmap) ||
                            ((_b = (_a = ingredient.variations) === null || _a === void 0 ? void 0 : _a.some(function (v) { return v.toLowerCase().includes(fodmap); })) !== null && _b !== void 0 ? _b : false);
                    });
                });
                break;
            case 'Pescatarian':
                // Filter out all meats except fish and seafood
                filteredIngredients = filteredIngredients.filter(function (ingredient) {
                    // Keep if it's not meat/processed meat OR if it's fish/seafood
                    if (ingredient.category === 'fish' || ingredient.category === 'seafood') {
                        return true;
                    }
                    return ingredient.category !== 'meat' && ingredient.category !== 'processed meat';
                });
                break;
            case 'Vegan':
                // Filter out all animal products
                var animalCategories_1 = ['meat', 'processed meat', 'fish', 'seafood', 'dairy', 'protein'];
                filteredIngredients = filteredIngredients.filter(function (ingredient) {
                    return !animalCategories_1.includes(ingredient.category) &&
                        // Check for egg specifically since eggs might be in 'protein' category
                        !ingredient.name.toLowerCase().includes('egg');
                });
                break;
            case 'Vegetarian':
                // Filter out meat, fish, and seafood
                var meatCategories_1 = ['meat', 'processed meat', 'fish', 'seafood'];
                filteredIngredients = filteredIngredients.filter(function (ingredient) {
                    return !meatCategories_1.includes(ingredient.category);
                });
                break;
            case 'Nut-Free':
                // Filter out nuts
                filteredIngredients = filteredIngredients.filter(function (ingredient) {
                    return !ingredient.category.toLowerCase().includes('nut');
                });
                break;
            case 'Lactose-Free':
                // Filter out dairy
                filteredIngredients = filteredIngredients.filter(function (ingredient) {
                    return !ingredient.category.toLowerCase().includes('dairy');
                });
                break;
        }
    };
    // Apply each preference filter
    for (var _i = 0, selectedPreferences_1 = selectedPreferences; _i < selectedPreferences_1.length; _i++) {
        var preference = selectedPreferences_1[_i];
        _loop_1(preference);
    }
    return filteredIngredients;
}
/**
 * Applies dietary preferences to filter ingredients
 * @param selectedPreferences - Array of dietary preference strings
 * @returns Filtered ingredients based on preferences
 */
function applyDietaryPreferences(selectedPreferences) {
    // Apply dietary filters based on preferences
    var preferences = {
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
    return (0, dietary_filters_1.filterIngredients)(preferences);
}
