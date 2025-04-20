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
exports.filterIngredients = filterIngredients;
var ingredients = [];
/**
 * Filters ingredients by specific dietary preferences
 * @param preferences - Object containing various filter preferences
 */
function filterIngredients(preferences) {
    var _a, _b;
    var filteredIngredients = __spreadArray([], ingredients, true);
    if (preferences.vegan) {
        var excludedCategories_1 = ['meat', 'fish', 'seafood', 'dairy', 'egg'];
        filteredIngredients = filteredIngredients.filter(function (ingredient) { return !excludedCategories_1.includes(ingredient.category.toLowerCase()); });
    }
    else if (preferences.vegetarian) {
        var excludedCategories_2 = ['meat', 'fish', 'seafood'];
        filteredIngredients = filteredIngredients.filter(function (ingredient) { return !excludedCategories_2.includes(ingredient.category.toLowerCase()); });
    }
    if (preferences.glutenFree) {
        filteredIngredients = filteredIngredients.filter(function (ingredient) {
            var glutenSources = ['wheat', 'barley', 'rye'];
            return !glutenSources.some(function (source) {
                var _a;
                return ingredient.name.toLowerCase().includes(source) ||
                    ((_a = ingredient.variations) === null || _a === void 0 ? void 0 : _a.some(function (v) { return v.toLowerCase().includes(source); }));
            });
        });
    }
    if (preferences.nutFree) {
        filteredIngredients = filteredIngredients.filter(function (ingredient) { return !ingredient.category.toLowerCase().includes('nut'); });
    }
    if (preferences.lowFodmap) {
        var highFodmapFoods_1 = ['onion', 'garlic', 'wheat', 'rye', 'dairy'];
        filteredIngredients = filteredIngredients.filter(function (ingredient) {
            return !highFodmapFoods_1.some(function (food) {
                var _a;
                return ingredient.name.toLowerCase().includes(food) ||
                    ((_a = ingredient.variations) === null || _a === void 0 ? void 0 : _a.some(function (v) { return v.toLowerCase().includes(food); }));
            });
        });
    }
    if (preferences.lactoseFree) {
        filteredIngredients = filteredIngredients.filter(function (ingredient) { return !ingredient.category.toLowerCase().includes('dairy'); });
    }
    if (preferences.pescatarian) {
        var excludedCategories_3 = ['meat'];
        filteredIngredients = filteredIngredients.filter(function (ingredient) { return !excludedCategories_3.includes(ingredient.category.toLowerCase()); });
    }
    if (preferences.fermented) {
        filteredIngredients = filteredIngredients.filter(function (ingredient) {
            var _a;
            return ingredient.category.toLowerCase().includes('fermented') ||
                ((_a = ingredient.notes) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes('ferment'));
        });
    }
    // Exclude certain categories if specified
    if ((_a = preferences.excludeCategories) === null || _a === void 0 ? void 0 : _a.length) {
        filteredIngredients = filteredIngredients.filter(function (ingredient) { var _a; return !((_a = preferences.excludeCategories) === null || _a === void 0 ? void 0 : _a.includes(ingredient.category)); });
    }
    // Include only certain categories if specified
    if ((_b = preferences.includeOnlyCategories) === null || _b === void 0 ? void 0 : _b.length) {
        filteredIngredients = filteredIngredients.filter(function (ingredient) { var _a; return (_a = preferences.includeOnlyCategories) === null || _a === void 0 ? void 0 : _a.includes(ingredient.category); });
    }
    return filteredIngredients;
}
