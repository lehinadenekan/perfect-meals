"use strict";
// lib/recipe-scrapers/utils.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveImageUrl = exports.cleanText = void 0;
// Helper function to clean text extracted by Cheerio
var cleanText = function (text) {
    return (text === null || text === void 0 ? void 0 : text.replace(/\s\s+/g, ' ').replace(/[\r\n]+/g, ' ').trim()) || '';
};
exports.cleanText = cleanText;
// Helper function to resolve relative URLs
var resolveImageUrl = function (baseUrl, imageUrl) {
    if (!imageUrl)
        return undefined;
    if (imageUrl.startsWith('http')) {
        return imageUrl;
    }
    try {
        var base = new URL(baseUrl);
        return new URL(imageUrl, base.origin).href;
    }
    catch (urlError) {
        console.warn("[resolveImageUrl] Failed to resolve relative image URL: ".concat(imageUrl, " against base: ").concat(baseUrl), urlError);
        return undefined; // Clear if invalid
    }
};
exports.resolveImageUrl = resolveImageUrl;
