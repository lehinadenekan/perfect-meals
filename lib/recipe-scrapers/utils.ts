// lib/recipe-scrapers/utils.ts

// Helper function to clean text extracted by Cheerio
export const cleanText = (text: string | undefined | null): string => {
  return text?.replace(/\s\s+/g, ' ').replace(/[\r\n]+/g, ' ').trim() || '';
};

// Helper function to resolve relative URLs
export const resolveImageUrl = (baseUrl: string, imageUrl: string | undefined | null): string | undefined => {
   if (!imageUrl) return undefined;
   if (imageUrl.startsWith('http')) {
     return imageUrl;
   }
   try {
     const base = new URL(baseUrl);
     return new URL(imageUrl, base.origin).href;
   } catch (urlError) {
     console.warn(`[resolveImageUrl] Failed to resolve relative image URL: ${imageUrl} against base: ${baseUrl}`, urlError);
     return undefined; // Clear if invalid
   }
};