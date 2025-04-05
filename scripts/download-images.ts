import fs from 'fs';
import path from 'path';
import axios from 'axios';
import { seedRecipes } from '../prisma/seed-data/recipes';

const PUBLIC_IMAGES_DIR = path.join(process.cwd(), 'public', 'images', 'recipes');

async function downloadImage(url: string, filename: string): Promise<boolean> {
  try {
    const response = await axios({
      url,
      method: 'GET',
      responseType: 'arraybuffer'
    });

    // Check if content type is an image
    const contentType = response.headers['content-type'];
    if (!contentType?.startsWith('image/')) {
      console.error(`Invalid content type for ${url}: ${contentType}`);
      return false;
    }

    // Ensure directory exists
    if (!fs.existsSync(PUBLIC_IMAGES_DIR)) {
      fs.mkdirSync(PUBLIC_IMAGES_DIR, { recursive: true });
    }

    const filepath = path.join(PUBLIC_IMAGES_DIR, filename);
    fs.writeFileSync(filepath, response.data as Buffer);
    console.log(`✓ Downloaded: ${filename}`);
    return true;
  } catch (error) {
    // Type check the error before accessing message
    let errorMessage = 'Unknown error';
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === 'string') {
      errorMessage = error;
    }
    console.error(`✗ Failed to download ${url}:`, errorMessage);
    return false;
  }
}

async function main() {
  console.log('Starting image download...');
  console.log(`Saving to: ${PUBLIC_IMAGES_DIR}`);

  const results = {
    success: 0,
    failed: 0,
    skipped: 0
  };

  console.log(`🔍 Found ${seedRecipes.length} recipes to process.`);

  for (const recipe of seedRecipes) {
    if (!recipe.imageUrl) {
      console.log(`⚠ No image URL for recipe: ${recipe.title}`);
      results.skipped++;
      continue;
    }

    // Skip if already a local path
    if (recipe.imageUrl.startsWith('/')) {
      console.log(`→ Already local: ${recipe.title}`);
      results.skipped++;
      continue;
    }

    // Generate filename from recipe title
    const filename = `${recipe.title.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')}.jpg`;

    const success = await downloadImage(recipe.imageUrl, filename);
    if (success) {
      results.success++;
    } else {
      results.failed++;
    }
  }

  console.log('\nDownload Summary:');
  console.log(`✓ Successfully downloaded: ${results.success}`);
  console.log(`✗ Failed to download: ${results.failed}`);
  console.log(`→ Skipped: ${results.skipped}`);

  console.log('✅ Image download process completed.');
}

main().catch(error => {
  console.error('❌ Error during image download:', error);
  process.exit(1);
}); 