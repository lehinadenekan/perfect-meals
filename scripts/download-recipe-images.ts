const fs = require('fs');
const path = require('path');
const https = require('https');
const { recipes } = require('../prisma/seed-data/recipes');

const IMAGES_DIR = path.join(process.cwd(), 'public', 'images', 'recipes');

// Ensure the images directory exists
if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

// Function to download an image
function downloadImage(url: string, filename: string): Promise<void> {
  return new Promise((resolve, reject) => {
    https.get(url, (response: any) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download image: ${response.statusCode}`));
        return;
      }

      const filePath = path.join(IMAGES_DIR, filename);
      const fileStream = fs.createWriteStream(filePath);

      response.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close();
        resolve();
      });

      fileStream.on('error', (err: Error) => {
        fs.unlink(filePath, () => reject(err));
      });
    }).on('error', reject);
  });
}

// Function to convert title to filename
function titleToFilename(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '') + '.jpg';
}

// Function to update recipe data
function updateRecipeData(recipes: any[]): void {
  const updatedRecipes = recipes.map(recipe => ({
    ...recipe,
    imageUrl: `/images/recipes/${titleToFilename(recipe.title)}`
  }));

  const recipeDataPath = path.join(process.cwd(), 'prisma', 'seed-data', 'recipes.ts');
  const recipeData = `// Sample recipe data\nexport const recipes = ${JSON.stringify(updatedRecipes, null, 2)};\n`;
  fs.writeFileSync(recipeDataPath, recipeData);
}

// Main function to process all recipes
async function main() {
  console.log('Starting image download process...');
  
  for (const recipe of recipes) {
    if (!recipe.imageUrl || !recipe.imageUrl.startsWith('https://')) {
      console.log(`Skipping ${recipe.title}: No external image URL`);
      continue;
    }

    const filename = titleToFilename(recipe.title);
    console.log(`Downloading image for ${recipe.title}...`);
    
    try {
      await downloadImage(recipe.imageUrl, filename);
      console.log(`Successfully downloaded ${filename}`);
    } catch (error) {
      console.error(`Failed to download image for ${recipe.title}:`, error);
    }
  }

  console.log('Updating recipe data...');
  updateRecipeData(recipes);
  console.log('Done!');
}

main().catch(console.error); 