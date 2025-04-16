// lib/recipe-scrapers/adapters/bbc.ts
import * as cheerio from 'cheerio';
import type { RecipeScraperAdapter, ImportedRecipeData } from '../types';
import { cleanText, resolveImageUrl } from '../utils';

export class BbcAdapter implements RecipeScraperAdapter {
  parse($: cheerio.Root, url: string): ImportedRecipeData {
    console.log(`[IMPORT_RECIPE] Using BbcAdapter for: ${url}`);

    // --- BBC Food Specific Parsing Logic ---

    // Updated Title Selector to use ID based on inspection
    const title = cleanText($('h1#main-heading').first().text()); // Use ID selector
    if (!title) throw new Error("Could not extract mandatory field: title (BBC).");

    // Ingredients (Selector based on common BBC Food structure)
    const ingredients: string[] = [];
    $('.recipe-ingredients__list-item').each((i, el) => {
      const ingredientText = cleanText($(el).text());
      if (ingredientText) ingredients.push(ingredientText);
    });
     if (ingredients.length === 0) throw new Error("Could not extract mandatory field: ingredients (BBC).");

    // Instructions (Selector based on common BBC Food structure)
    const instructions: string[] = [];
     $('.recipe-method__list-item-text').each((i, el) => {
         const instructionText = cleanText($(el).text());
         if (instructionText) instructions.push(instructionText);
     });
     if (instructions.length === 0) throw new Error("Could not extract mandatory field: instructions (BBC).");

    // --- Optional fields for BBC Food ---
     const description = cleanText($('meta[property="og:description"]').attr('content')) || cleanText($('.recipe-description__text').first().text());
     let imageUrl = $('meta[property="og:image"]').attr('content') || $('.recipe-media__image img').first().attr('src');
     imageUrl = resolveImageUrl(url, imageUrl);

     const servings = cleanText($('.recipe-metadata__serving .recipe-metadata__value').first().text());
     const totalTime = cleanText($('.recipe-metadata__total-time .recipe-metadata__value').first().text());

    console.log(`[BbcAdapter] Parsed Title: ${title}`);
    console.log(`[BbcAdapter] Parsed Ingredients: ${ingredients.length}`);
    console.log(`[BbcAdapter] Parsed Instructions: ${instructions.length}`);

    return {
      title,
      ingredients,
      instructions,
      ...(description && { description }),
      ...(imageUrl && { imageUrl }),
      ...(servings && { servings }),
      ...(totalTime && { totalTime }),
    };
  }
}