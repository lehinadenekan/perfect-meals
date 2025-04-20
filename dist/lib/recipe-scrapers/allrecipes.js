"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllRecipesAdapter = void 0;
var utils_1 = require("./utils"); // Assuming utils file is created
var AllRecipesAdapter = /** @class */ (function () {
    function AllRecipesAdapter() {
    }
    AllRecipesAdapter.prototype.parse = function ($, url) {
        console.log("[IMPORT_RECIPE] Using AllRecipesAdapter for: ".concat(url));
        // --- Allrecipes Specific Parsing Logic ---
        // Example: Replace with actual selectors for allrecipes.com
        var title = (0, utils_1.cleanText)($('h1.headline.heading-content').first().text());
        if (!title)
            throw new Error("Could not extract mandatory field: title (Allrecipes).");
        var ingredients = [];
        $('li.ingredients-item span.ingredients-item-name').each(function (i, el) {
            var ingredientText = (0, utils_1.cleanText)($(el).text());
            if (ingredientText)
                ingredients.push(ingredientText);
        });
        if (ingredients.length === 0)
            throw new Error("Could not extract mandatory field: ingredients (Allrecipes).");
        var instructions = [];
        $('.instructions-section-item .paragraph p').each(function (i, el) {
            var instructionText = (0, utils_1.cleanText)($(el).text());
            if (instructionText)
                instructions.push(instructionText);
        });
        if (instructions.length === 0)
            throw new Error("Could not extract mandatory field: instructions (Allrecipes).");
        // --- Optional fields for Allrecipes ---
        var description = (0, utils_1.cleanText)($('meta[property="og:description"]').attr('content')); // Often in meta tags
        var imageUrl = $('meta[property="og:image"]').attr('content'); // Often in meta tags
        imageUrl = (0, utils_1.resolveImageUrl)(url, imageUrl);
        var servings = (0, utils_1.cleanText)($('.recipe-meta-item-body[itemprop="recipeYield"]').first().text());
        var totalTime = (0, utils_1.cleanText)($('.recipe-meta-item-body[itemprop="totalTime"]').first().text()); // Might need datetime attr parsing
        console.warn("[AllRecipesAdapter] Parsing logic is an example and may need refinement.");
        return __assign(__assign(__assign(__assign({ title: title, ingredients: ingredients, instructions: instructions }, (description && { description: description })), (imageUrl && { imageUrl: imageUrl })), (servings && { servings: servings })), (totalTime && { totalTime: totalTime }));
    };
    return AllRecipesAdapter;
}());
exports.AllRecipesAdapter = AllRecipesAdapter;
