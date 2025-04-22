import { ImageService } from '../app/services/imageService';
import { seedRecipes } from '../prisma/seed-data/recipes';

async function downloadRecipeImages() {
  const imageService = new ImageService();
  const results: { recipe: string; success: boolean; error?: string }[] = [];

  console.log(`Starting download of ${seedRecipes.length} recipe images...`);

  for (const recipe of seedRecipes) {
    try {
      console.log(`Downloading image for ${recipe.title}...`);
      await imageService.downloadAndStoreImage(recipe.imageUrl, recipe.title);
      results.push({ recipe: recipe.title, success: true });
      console.log(`✓ Successfully downloaded image for ${recipe.title}`);
    } catch (error: unknown) {
      results.push({ 
        recipe: recipe.title, 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      });
      console.error(`✗ Failed to download image for ${recipe.title}:`, error);
    }
  }

  // Print summary
  console.log('\nDownload Summary:');
  console.log('----------------');
  console.log(`Total recipes: ${seedRecipes.length}`);
  console.log(`Successful downloads: ${results.filter(r => r.success).length}`);
  console.log(`Failed downloads: ${results.filter(r => !r.success).length}`);

  if (results.some((r: { success: boolean }) => !r.success)) {
    console.log('\nFailed Downloads:');
    results
      .filter((r: { success: boolean }) => !r.success)
      .forEach((r: { recipe: string; error?: string }) => console.log(`- ${r.recipe}: ${r.error}`));
  }
}

downloadRecipeImages().catch(console.error); 