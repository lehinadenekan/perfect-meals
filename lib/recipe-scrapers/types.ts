// lib/recipe-scrapers/types.ts

// Re-defined here for clarity and potential sharing
export interface ImportedRecipeData {
  title: string;
  ingredients: string[];
  instructions: string[];
  description?: string;
  imageUrl?: string;
  servings?: string;
  totalTime?: string;
}

// Interface for all recipe scrapers
export interface RecipeScraperAdapter {
  // Takes cheerio instance and the original URL
  parse: (
    $: cheerio.Root,
    url: string
  ) => Promise<ImportedRecipeData> | ImportedRecipeData;
}