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
exports.GenericAdapter = void 0;
var utils_1 = require("../utils"); // Assuming utils file is created (see step 4)
var GenericAdapter = /** @class */ (function () {
    function GenericAdapter() {
    }
    GenericAdapter.prototype.parse = function ($, url) {
        console.log("[IMPORT_RECIPE] Using GenericAdapter for: ".concat(url));
        // --- Mandatory Fields ---
        var title = (0, utils_1.cleanText)($('[itemprop="name"]').first().text()) ||
            (0, utils_1.cleanText)($('h1').first().text()) ||
            (0, utils_1.cleanText)($('.recipe-title').first().text()) ||
            (0, utils_1.cleanText)($('title').first().text());
        if (!title)
            throw new Error("Could not extract mandatory field: title.");
        var ingredients = [];
        $('[itemprop="recipeIngredient"]').each(function (i, el) {
            var ingredientText = (0, utils_1.cleanText)($(el).text());
            if (ingredientText)
                ingredients.push(ingredientText);
        });
        if (ingredients.length === 0) {
            $('.recipe-ingredients li, .ingredients li').each(function (i, el) {
                var ingredientText = (0, utils_1.cleanText)($(el).text());
                if (ingredientText)
                    ingredients.push(ingredientText);
            });
        }
        if (ingredients.length === 0)
            throw new Error("Could not extract mandatory field: ingredients.");
        var instructions = [];
        var instructionsContainer = $('[itemprop="recipeInstructions"]');
        if (instructionsContainer.length > 0) {
            instructionsContainer.find('li, p').each(function (i, el) {
                var instructionText = (0, utils_1.cleanText)($(el).text());
                if (instructionText)
                    instructions.push(instructionText);
            });
        }
        if (instructions.length === 0) {
            $('.recipe-instructions li, .instructions li, .directions li').each(function (i, el) {
                var instructionText = (0, utils_1.cleanText)($(el).text());
                if (instructionText)
                    instructions.push(instructionText);
            });
        }
        if (instructions.length === 0)
            throw new Error("Could not extract mandatory field: instructions.");
        // --- Optional Fields ---
        var description = (0, utils_1.cleanText)($('[itemprop="description"]').first().text()) ||
            (0, utils_1.cleanText)($('meta[property="og:description"]').attr('content')) ||
            (0, utils_1.cleanText)($('meta[name="description"]').attr('content'));
        if (!description)
            console.warn("[GenericAdapter] Optional field 'description' not found for: ".concat(url));
        var imageUrl = $('[itemprop="image"]').first().attr('src') ||
            $('img[itemprop="image"]').first().attr('src') ||
            $('.recipe-image img').first().attr('src') ||
            $('meta[property="og:image"]').attr('content');
        imageUrl = (0, utils_1.resolveImageUrl)(url, imageUrl); // Use helper
        if (!imageUrl)
            console.warn("[GenericAdapter] Optional field 'imageUrl' not found for: ".concat(url));
        var servings = (0, utils_1.cleanText)($('[itemprop="recipeYield"]').first().text()) ||
            (0, utils_1.cleanText)($('.yield').first().text()) ||
            (0, utils_1.cleanText)($('.servings').first().text());
        if (!servings)
            console.warn("[GenericAdapter] Optional field 'servings' not found for: ".concat(url));
        var totalTime = $('[itemprop="totalTime"]').first().attr('datetime') ||
            (0, utils_1.cleanText)($('[itemprop="totalTime"]').first().text()) ||
            (0, utils_1.cleanText)($('[itemprop="cookTime"]').first().attr('datetime')) ||
            (0, utils_1.cleanText)($('[itemprop="cookTime"]').first().text()) ||
            (0, utils_1.cleanText)($('.total-time').first().text()) ||
            (0, utils_1.cleanText)($('.cook-time').first().text());
        if (!totalTime)
            console.warn("[GenericAdapter] Optional field 'totalTime' not found for: ".concat(url));
        // Construct the response data
        var extractedRecipeData = __assign(__assign(__assign(__assign({ title: title, ingredients: ingredients, instructions: instructions }, (description && { description: description })), (imageUrl && { imageUrl: imageUrl })), (servings && { servings: servings })), (totalTime && { totalTime: totalTime }));
        return extractedRecipeData;
    };
    return GenericAdapter;
}());
exports.GenericAdapter = GenericAdapter;
