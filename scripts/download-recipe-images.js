const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const { promisify } = require('util');

// Path to the recipes file
const recipesFilePath = path.join(process.cwd(), 'prisma', 'seed-data', 'recipes.ts');

// Read and parse recipes file content
const recipesFileContent = fs.readFileSync(recipesFilePath, 'utf8');

// Extract recipes array from the file content
// This is a simplified parser that assumes recipes are defined as an array in the file
function extractRecipesFromFile(content) {
  try {
    // Find the beginning of the recipes array
    // This is a very simplified approach and may need adjustments based on the actual file structure
    const recipes = [];
    
    // Use regex to extract individual recipe objects
    const recipeRegex = /\{\s*title:\s*['"]([^'"]+)['"]/g;
    let match;
    let currentIndex = 0;
    
    while ((match = recipeRegex.exec(content)) !== null) {
      const recipeTitle = match[1];
      
      // Find image URL for this recipe
      const imageUrlRegex = new RegExp(`title:\\s*['"]${recipeTitle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}['"].*?imageUrl:\\s*['"]([^'"]+)['"]`, 's');
      const imageUrlMatch = content.match(imageUrlRegex);
      
      if (imageUrlMatch && imageUrlMatch[1]) {
        recipes.push({
          title: recipeTitle,
          imageUrl: imageUrlMatch[1]
        });
        console.log(`Found recipe: ${recipeTitle}`);
      }
    }
    
    return recipes;
  } catch (error) {
    console.error('Error parsing recipes file:', error);
    return [];
  }
}

const recipes = extractRecipesFromFile(recipesFileContent);
console.log(`Found ${recipes.length} recipes in the file.`);

const writeFileAsync = promisify(fs.writeFile);
const mkdirAsync = promisify(fs.mkdir);
const readFileAsync = promisify(fs.readFile);
const copyFileAsync = promisify(fs.copyFile);
const existsAsync = promisify(fs.exists);

// Create directory if it doesn't exist
const imageDir = path.join(process.cwd(), 'public', 'images', 'recipes');

// Function to sanitize a filename
const sanitizeFilename = (name) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '_') // Replace non-alphanumeric with underscore
    .replace(/_+/g, '_') // Replace multiple underscores with one
    .replace(/^_|_$/g, ''); // Remove leading and trailing underscores
};

// Function to get file extension from URL or default to .jpg
const getExtension = (url) => {
  try {
    const parsedUrl = new URL(url);
    const pathname = parsedUrl.pathname;
    const ext = path.extname(pathname);
    return ext || '.jpg';
  } catch (error) {
    // If URL parsing fails, try to extract extension from the string
    const matches = url.match(/\.(jpg|jpeg|png|gif|webp)(\?|$)/i);
    return matches ? `.${matches[1].toLowerCase()}` : '.jpg';
  }
};

// Function to copy a local file to the output directory
const copyLocalImage = async (sourcePath, outputPath) => {
  try {
    // Remove query parameters if any
    const cleanSourcePath = sourcePath.split('?')[0];
    
    // Calculate full source path
    const fullSourcePath = path.join(process.cwd(), 'public', cleanSourcePath);
    
    if (await existsAsync(fullSourcePath)) {
      await copyFileAsync(fullSourcePath, outputPath);
      console.log(`Copied local file: ${outputPath}`);
      return true;
    } else {
      console.log(`Local file not found: ${fullSourcePath}`);
      return false;
    }
  } catch (error) {
    console.error(`Error copying local file: ${error.message}`);
    return false;
  }
};

// Function to download an image from a URL
const downloadImage = (url, outputPath) => {
  return new Promise((resolve, reject) => {
    // Handle special case for Maharagwe ya Nazi recipe
    if (url.includes('maharagwe-ya-nazi') && url.includes('?w=620')) {
      url = 'https://binnyjs.wordpress.com/wp-content/uploads/2016/04/img_4510.jpg?w=620';
    }

    // If URL doesn't have protocol, assume https
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https:' + (url.startsWith('//') ? url : '//' + url);
    }

    // Determine if we should use http or https
    const protocol = url.startsWith('https:') ? https : http;
    
    protocol.get(url, (response) => {
      // Handle redirects
      if (response.statusCode === 301 || response.statusCode === 302) {
        const redirectUrl = response.headers.location;
        console.log(`Redirecting to: ${redirectUrl}`);
        return downloadImage(redirectUrl, outputPath)
          .then(resolve)
          .catch(reject);
      }
      
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download image, status code: ${response.statusCode}, URL: ${url}`));
        return;
      }

      const data = [];
      response.on('data', (chunk) => {
        data.push(chunk);
      });

      response.on('end', () => {
        const buffer = Buffer.concat(data);
        writeFileAsync(outputPath, buffer)
          .then(() => {
            console.log(`Downloaded: ${outputPath}`);
            resolve();
          })
          .catch(reject);
      });
    }).on('error', (err) => {
      console.error(`Error downloading ${url}: ${err.message}`);
      reject(err);
    });
  });
};

// Map of recipe titles to their external image URLs (for recipes where we need a custom URL)
const specialRecipeUrls = {
  'Maharagwe ya Nazi': 'https://binnyjs.wordpress.com/wp-content/uploads/2016/04/img_4510.jpg?w=620'
};

// Main function to download all images
async function downloadAllImages() {
  try {
    // Ensure the directory exists
    await mkdirAsync(imageDir, { recursive: true });
    
    const downloadPromises = [];
    let skippedCount = 0;
    let downloadCount = 0;
    let copyCount = 0;

    // Loop through all recipes
    for (const recipe of recipes) {
      if (recipe.title) {
        let imageUrl = recipe.imageUrl;
        
        // Use special URL if it exists for this recipe
        if (specialRecipeUrls[recipe.title]) {
          imageUrl = specialRecipeUrls[recipe.title];
        }
        
        // If no image URL, skip this recipe
        if (!imageUrl) {
          console.log(`No image URL for recipe: ${recipe.title}`);
          continue;
        }
        
        const filename = sanitizeFilename(recipe.title);
        const ext = getExtension(imageUrl);
        const outputPath = path.join(imageDir, `${filename}${ext}`);
        
        if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
          // External URL - download it
          downloadCount++;
          downloadPromises.push(downloadImage(imageUrl, outputPath));
        } else if (imageUrl.startsWith('/')) {
          // Local path - try to copy it first
          const copied = await copyLocalImage(imageUrl, outputPath);
          if (copied) {
            copyCount++;
          } else if (specialRecipeUrls[recipe.title]) {
            // If copy failed and we have a special URL, use that instead
            downloadCount++;
            downloadPromises.push(downloadImage(specialRecipeUrls[recipe.title], outputPath));
          } else {
            // Otherwise skip it
            skippedCount++;
          }
        } else {
          // Other path format, try to download it
          downloadCount++;
          downloadPromises.push(downloadImage(imageUrl, outputPath));
        }
      }
    }
    
    if (downloadPromises.length === 0 && copyCount === 0) {
      console.log('No images found to download or copy.');
      return;
    }
    
    console.log(`Starting to download ${downloadPromises.length} images...`);
    console.log(`Already copied ${copyCount} local images.`);
    console.log(`Skipped ${skippedCount} images that couldn't be processed.`);
    
    await Promise.all(downloadPromises);
    console.log(`Successfully downloaded ${downloadPromises.length} images.`);
    console.log(`Total: ${downloadCount + copyCount} images processed.`);
  } catch (error) {
    console.error('Error processing images:', error);
  }
}

// Run the main function
downloadAllImages(); 