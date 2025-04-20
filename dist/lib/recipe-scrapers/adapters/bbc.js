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
exports.BbcAdapter = void 0;
var utils_1 = require("../utils");
var BbcAdapter = /** @class */ (function () {
    function BbcAdapter() {
    }
    BbcAdapter.prototype.parse = function ($, url) {
        console.log("[IMPORT_RECIPE] Using BbcAdapter for: ".concat(url));
        // --- BBC Food Specific Parsing Logic ---
        // Updated Title Selector to use ID based on inspection
        var title = (0, utils_1.cleanText)($('h1#main-heading').first().text()); // Use ID selector
        if (!title)
            throw new Error("Could not extract mandatory field: title (BBC).");
        // Ingredients (Selector based on common BBC Food structure)
        var ingredients = [];
        $('.recipe-ingredients__list-item').each(function (i, el) {
            var ingredientText = (0, utils_1.cleanText)($(el).text());
            if (ingredientText)
                ingredients.push(ingredientText);
        });
        if (ingredients.length === 0)
            throw new Error("Could not extract mandatory field: ingredients (BBC).");
        // Instructions (Selector based on common BBC Food structure)
        var instructions = [];
        $('.recipe-method__list-item-text').each(function (i, el) {
            var instructionText = (0, utils_1.cleanText)($(el).text());
            if (instructionText)
                instructions.push(instructionText);
        });
        if (instructions.length === 0)
            throw new Error("Could not extract mandatory field: instructions (BBC).");
        // --- Optional fields for BBC Food ---
        var description = (0, utils_1.cleanText)($('meta[property="og:description"]').attr('content')) || (0, utils_1.cleanText)($('.recipe-description__text').first().text());
        var imageUrl = $('meta[property="og:image"]').attr('content') || $('.recipe-media__image img').first().attr('src');
        imageUrl = (0, utils_1.resolveImageUrl)(url, imageUrl);
        var servings = (0, utils_1.cleanText)($('.recipe-metadata__serving .recipe-metadata__value').first().text());
        var totalTime = (0, utils_1.cleanText)($('.recipe-metadata__total-time .recipe-metadata__value').first().text());
        console.log("[BbcAdapter] Parsed Title: ".concat(title));
        console.log("[BbcAdapter] Parsed Ingredients: ".concat(ingredients.length));
        console.log("[BbcAdapter] Parsed Instructions: ".concat(instructions.length));
        return __assign(__assign(__assign(__assign({ title: title, ingredients: ingredients, instructions: instructions }, (description && { description: description })), (imageUrl && { imageUrl: imageUrl })), (servings && { servings: servings })), (totalTime && { totalTime: totalTime }));
    };
    return BbcAdapter;
}());
exports.BbcAdapter = BbcAdapter;
