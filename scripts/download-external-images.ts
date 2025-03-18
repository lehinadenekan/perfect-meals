import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

interface RecipeImage {
  title: string;
  imageUrl: string;
}

// These are the recipes that were fixed with external URLs
const recipesWithExternalUrls: RecipeImage[] = [
  {
    title: 'Bak Kut Teh',
    imageUrl: 'https://imageproxy.icook.network/fit?background=255%2C255%2C255&height=1080&nocrop=true&stripmeta=true&type=auto&url=http%3A%2F%2Ftokyo-kitchen.icook.tw.s3.amazonaws.com%2Fuploads%2Frecipe%2Fcover%2F445174%2Ffa461a7893caddae.jpg&width=1080'
  },
  {
    title: 'Khanom Jeen Nam Ya Pa',
    imageUrl: 'http://farm8.staticflickr.com/7034/6492052957_d4879d8728_o.jpg'
  },
  {
    title: 'Ogokbap',
    imageUrl: 'https://recipe1.ezmember.co.kr/cache/recipe/2015/06/07/b33c1b674942e3b5877cebce525ddfe81.jpg'
  },
  {
    title: 'Duqqa (Egyptian Spiced Nut and Seed Blend)',
    imageUrl: 'https://i0.wp.com/veredguttman.com/wp-content/uploads/2023/01/Dukkah.jpg?w=1280&ssl=1'
  },
  {
    title: 'Steak and Kidney Pie',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d4/Traditional_steak_and_kidney_pie.jpg'
  },
  {
    title: 'Kimchi Sundubu Jjigae',
    imageUrl: 'https://omnivorescookbook.com/wp-content/uploads/2020/09/200806_Soondubu-Jjigae_3.jpg'
  },
  {
    title: 'Ugali na Sukuma Wiki',
    imageUrl: 'https://d2uqlwridla7kt.cloudfront.net/recipe-media/recipe-8ll9tjifm/1ahas38ll9tmry7/img-9638-jpg'
  },
  {
    title: 'Injera be Doro Wat',
    imageUrl: 'https://images.squarespace-cdn.com/content/v1/580a73c320099eeb9bb90e68/1479324980364-FEJHR6FBI4PEZFHGNIZ5/image-asset.jpeg?format=2500w'
  },
  {
    title: 'Mandazi',
    imageUrl: 'https://www.jocooks.com/wp-content/uploads/2012/09/mandazi-1-20.jpg'
  },
  {
    title: 'Pilau ya Nyama',
    imageUrl: 'https://www.malindikenya.net/images/uploads/articoli/1163_l.jpg'
  }
];

// Function to sanitize filenames
function sanitizeFilename(filename: string): string {
  return filename
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');
}

// Function to get file extension from URL or MIME type
function getFileExtension(url: string, contentType: string): string {
  // Try to get extension from URL first
  const urlExtension = path.extname(url).toLowerCase();
  if (urlExtension && urlExtension.length > 1 && urlExtension.length < 6) {
    return urlExtension;
  }

  // Fall back to content-type
  const mimeToExt: Record<string, string> = {
    'image/jpeg': '.jpg',
    'image/jpg': '.jpg',
    'image/png': '.png',
    'image/gif': '.gif',
    'image/webp': '.webp',
    'image/svg+xml': '.svg'
  };

  return mimeToExt[contentType] || '.jpg'; // Default to jpg if unknown
}

async function downloadExternalImages() {
  try {
    const imagesDirectory = path.join(process.cwd(), 'public', 'images', 'recipes');
    
    // Ensure directory exists
    if (!fs.existsSync(imagesDirectory)) {
      fs.mkdirSync(imagesDirectory, { recursive: true });
    }

    for (const recipe of recipesWithExternalUrls) {
      try {
        console.log(`Downloading image for "${recipe.title}" from ${recipe.imageUrl}`);
        
        // Get content type, default to image/jpeg
        let contentType = 'image/jpeg';
        
        try {
          // Make a HEAD request to get content type
          const headResponse = await axios.head(recipe.imageUrl, {
            headers: { 'User-Agent': 'Mozilla/5.0' }
          });
          
          contentType = headResponse.headers['content-type'] || 'image/jpeg';
        } catch (error) {
          console.warn(`Could not get content type for ${recipe.imageUrl}, using default`);
        }
        
        // Download the image
        const response = await axios({
          method: 'GET',
          url: recipe.imageUrl,
          responseType: 'arraybuffer',
          headers: { 'User-Agent': 'Mozilla/5.0' }
        });

        // Create filename from recipe title
        const sanitizedTitle = sanitizeFilename(recipe.title);
        const fileExtension = getFileExtension(recipe.imageUrl, contentType);
        const filename = `${sanitizedTitle}${fileExtension}`;
        const filePath = path.join(imagesDirectory, filename);
        
        // Save the image - TypeScript needs explicit type assertion for Buffer
        fs.writeFileSync(filePath, Buffer.from(response.data as ArrayBuffer));
        
        console.log(`Downloaded image to ${filePath}`);
        
        // Update the recipe in the database to use the local path
        const localImagePath = `/images/recipes/${filename}`;
        
        const result = await prisma.recipe.updateMany({
          where: {
            title: {
              contains: recipe.title
            }
          },
          data: {
            imageUrl: localImagePath
          }
        });
        
        console.log(`Updated database for "${recipe.title}" - ${result.count} recipes affected`);
      } catch (error) {
        console.error(`Error downloading image for "${recipe.title}":`, error);
      }
    }

    console.log('Successfully downloaded and updated all external images');
  } catch (error) {
    console.error('Error downloading external images:', error);
  } finally {
    await prisma.$disconnect();
  }
}

downloadExternalImages(); 