import fs from 'fs';
import path from 'path';
import axios from 'axios';
import { recipes } from '../prisma/seed-data/recipes';

const PUBLIC_IMAGES_DIR = path.join(process.cwd(), 'public', 'images', 'recipes');

// Ensure the images directory exists
if (!fs.existsSync(PUBLIC_IMAGES_DIR)) {
  fs.mkdirSync(PUBLIC_IMAGES_DIR, { recursive: true });
}

function titleToFilename(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '') + '.jpg';
}

async function downloadImage(url: string, filename: string) {
  try {
    const response = await axios({
      url,
      responseType: 'arraybuffer'
    });
    
    const buffer = Buffer.from(response.data as ArrayBuffer);
    const filepath = path.join(PUBLIC_IMAGES_DIR, filename);
    fs.writeFileSync(filepath, buffer);
    console.log(`Downloaded: ${filename}`);
  } catch (error) {
    console.error(`Failed to download ${url}:`, error.message);
  }
}

async function main() {
  for (const recipe of recipes) {
    const filename = titleToFilename(recipe.title);
    
    // Skip if image already exists locally
    if (fs.existsSync(path.join(PUBLIC_IMAGES_DIR, filename))) {
      console.log(`Skipping ${filename} - already exists`);
      continue;
    }
    
    // Only download if it's an external URL
    if (recipe.imageUrl && recipe.imageUrl.startsWith('http')) {
      console.log(`Downloading ${recipe.title}...`);
      await downloadImage(recipe.imageUrl, filename);
    }
  }
}

main().catch(console.error); 