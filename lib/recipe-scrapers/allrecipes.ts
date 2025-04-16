// lib/recipe-scrapers/adapters/allrecipes.ts
import * as cheerio from 'cheerio';
import type { RecipeScraperAdapter, ImportedRecipeData } from './types';
import { cleanText, resolveImageUrl } from './utils'; // Assuming utils file is created

export class AllRecipesAdapter implements RecipeScraperAdapter {
  parse($: cheerio.Root, url: string): ImportedRecipeData {
    console.log(`[IMPORT_RECIPE] Using AllRecipesAdapter for: ${url}`);

    // --- Allrecipes Specific Parsing Logic ---

    // Example: Replace with actual selectors for allrecipes.com
    const title = cleanText($('h1.headline.heading-content').first().text());
    if (!title) throw new Error("Could not extract mandatory field: title (Allrecipes).");

    const ingredients: string[] = [];
    $('li.ingredients-item span.ingredients-item-name').each((i, el) => {
      const ingredientText = cleanText($(el).text());
      if (ingredientText) ingredients.push(ingredientText);
    });
     if (ingredients.length === 0) throw new Error("Could not extract mandatory field: ingredients (Allrecipes).");

    const instructions: string[] = [];
     $('.instructions-section-item .paragraph p').each((i, el) => {
         const instructionText = cleanText($(el).text());
         if (instructionText) instructions.push(instructionText);
     });
     if (instructions.length === 0) throw new Error("Could not extract mandatory field: instructions (Allrecipes).");

    // --- Optional fields for Allrecipes ---
     const description = cleanText($('meta[property="og:description"]').attr('content')); // Often in meta tags
     let imageUrl = $('meta[property="og:image"]').attr('content'); // Often in meta tags
     imageUrl = resolveImageUrl(url, imageUrl);
     const servings = cleanText($('.recipe-meta-item-body[itemprop="recipeYield"]').first().text());
     const totalTime = cleanText($('.recipe-meta-item-body[itemprop="totalTime"]').first().text()); // Might need datetime attr parsing

    console.warn("[AllRecipesAdapter] Parsing logic is an example and may need refinement.");

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