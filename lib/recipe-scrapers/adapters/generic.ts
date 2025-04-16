// lib/recipe-scrapers/adapters/generic.ts
import * as cheerio from 'cheerio';
import type { RecipeScraperAdapter, ImportedRecipeData } from '../types';
import { cleanText, resolveImageUrl } from '../utils'; // Assuming utils file is created (see step 4)

export class GenericAdapter implements RecipeScraperAdapter {
  parse($: cheerio.Root, url: string): ImportedRecipeData {
    console.log(`[IMPORT_RECIPE] Using GenericAdapter for: ${url}`);

    // --- Mandatory Fields ---
    const title =
      cleanText($('[itemprop="name"]').first().text()) ||
      cleanText($('h1').first().text()) ||
      cleanText($('.recipe-title').first().text()) ||
      cleanText($('title').first().text());

    if (!title) throw new Error("Could not extract mandatory field: title.");

    const ingredients: string[] = [];
    $('[itemprop="recipeIngredient"]').each((i, el) => {
      const ingredientText = cleanText($(el).text());
      if (ingredientText) ingredients.push(ingredientText);
    });
    if (ingredients.length === 0) {
      $('.recipe-ingredients li, .ingredients li').each((i, el) => {
         const ingredientText = cleanText($(el).text());
         if (ingredientText) ingredients.push(ingredientText);
      });
    }
    if (ingredients.length === 0) throw new Error("Could not extract mandatory field: ingredients.");

    const instructions: string[] = [];
    const instructionsContainer = $('[itemprop="recipeInstructions"]');
    if (instructionsContainer.length > 0) {
       instructionsContainer.find('li, p').each((i, el) => {
          const instructionText = cleanText($(el).text());
          if (instructionText) instructions.push(instructionText);
       });
    }
    if (instructions.length === 0) {
       $('.recipe-instructions li, .instructions li, .directions li').each((i, el) => {
          const instructionText = cleanText($(el).text());
          if (instructionText) instructions.push(instructionText);
       });
    }
    if (instructions.length === 0) throw new Error("Could not extract mandatory field: instructions.");

    // --- Optional Fields ---
    const description =
       cleanText($('[itemprop="description"]').first().text()) ||
       cleanText($('meta[property="og:description"]').attr('content')) ||
       cleanText($('meta[name="description"]').attr('content'));
    if (!description) console.warn(`[GenericAdapter] Optional field 'description' not found for: ${url}`);

    let imageUrl =
       $('[itemprop="image"]').first().attr('src') ||
       $('img[itemprop="image"]').first().attr('src') ||
       $('.recipe-image img').first().attr('src') ||
       $('meta[property="og:image"]').attr('content');
    imageUrl = resolveImageUrl(url, imageUrl); // Use helper
     if (!imageUrl) console.warn(`[GenericAdapter] Optional field 'imageUrl' not found for: ${url}`);

    const servings =
       cleanText($('[itemprop="recipeYield"]').first().text()) ||
       cleanText($('.yield').first().text()) ||
       cleanText($('.servings').first().text());
      if (!servings) console.warn(`[GenericAdapter] Optional field 'servings' not found for: ${url}`);

    const totalTime =
      $('[itemprop="totalTime"]').first().attr('datetime') ||
      cleanText($('[itemprop="totalTime"]').first().text()) ||
      cleanText($('[itemprop="cookTime"]').first().attr('datetime')) ||
      cleanText($('[itemprop="cookTime"]').first().text()) ||
      cleanText($('.total-time').first().text()) ||
      cleanText($('.cook-time').first().text());
      if (!totalTime) console.warn(`[GenericAdapter] Optional field 'totalTime' not found for: ${url}`);

    // Construct the response data
    const extractedRecipeData: ImportedRecipeData = {
      title,
      ingredients,
      instructions,
      ...(description && { description }),
      ...(imageUrl && { imageUrl }),
      ...(servings && { servings }),
      ...(totalTime && { totalTime }),
    };

    return extractedRecipeData;
  }
}