import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

// List of specific recipes we know have issues
const knownIssueRecipes = [
  'Fabada Asturiana',
  'Lasagna alla Bolognese',
  'Pizza Margherita',
  'Vitello Tonnato',
  'Rfissa',
  'Shakshuka'
];

async function fixAllMissingImages() {
  try {
    // Get all recipes from the database
    const recipes = await prisma.recipe.findMany({
      select: {
        id: true,
        title: true,
        imageUrl: true
      }
    });
    
    console.log(`Found ${recipes.length} total recipes`);

    // Get a list of all available images in the public/images/recipes directory
    const imagesDirectory = path.join(process.cwd(), 'public', 'images', 'recipes');
    const availableImages = fs.readdirSync(imagesDirectory);
    console.log(`Found ${availableImages.length} available images in directory`);

    // Let's build a mapping of recipe names to image filenames
    const imageMapping: Record<string, string> = {};
    
    // First, handle the known issue recipes
    for (const recipe of knownIssueRecipes) {
      const matchingImages = findMatchingImages(recipe, availableImages);
      if (matchingImages.length > 0) {
        // Prefer the underscore version if available
        const preferredImage = matchingImages.find(img => img.includes('_')) || matchingImages[0];
        imageMapping[recipe.toLowerCase()] = preferredImage;
      }
    }

    // Add mappings for specific recipes that might not match by name pattern
    const specialCases: Record<string, string> = {
      'Fabada Asturiana': 'fabada-asturiana.jpg',
      'Lasagna alla Bolognese': 'lasagna-alla-bolognese.jpg',
      'Pizza Margherita': 'pizza-margherita-12.jpg',
      'Vitello Tonnato': 'vitello_tonnato.jpg',
      'Rfissa': 'rfissa.webp',
      'Shakshuka': 'shakshuka.jpg',
      'Shakshuka (North African Poached Eggs in Spiced Tomato Sauce)': 'shakshuka.jpg',
      'Caponata': 'caponata.jpg',
      'Mhadjeb (Algerian Stuffed Pancakes)': 'mhadjeb_algerian-stuffed_pancakes.jpg',
      'Pastilla (Moroccan Sweet and Savory Chicken Pie)': 'pastilla_moroccan_sweet_and_savory_chicken_pie.jpg',
      'Shorba Libiya (Libyan Spiced Lamb Soup)': 'shorba_libiya_libyan_spiced_lamb_soup.jpg',
      'Zaalook': 'zaalook.jpg',
      'Maaqouda': 'maaqouda.jpg'
    };

    // Merge special cases into the mapping
    Object.keys(specialCases).forEach(key => {
      imageMapping[key.toLowerCase()] = specialCases[key];
    });

    // Now process each recipe
    const updatedRecipes: string[] = [];
    const failedRecipes: string[] = [];

    for (const recipe of recipes) {
      if (!recipe.imageUrl || recipe.imageUrl.includes('?') || 
          !fs.existsSync(path.join(process.cwd(), 'public', recipe.imageUrl?.startsWith('/') ? recipe.imageUrl.substring(1) : recipe.imageUrl || ''))) {
        
        // Try to find a matching image
        let newImagePath = '';
        
        // Check if we have a direct mapping
        const recipeKey = recipe.title.toLowerCase();
        if (imageMapping[recipeKey]) {
          newImagePath = `/images/recipes/${imageMapping[recipeKey]}`;
        } else {
          // Try to find a matching image by name pattern
          const recipeNameWithoutSpecialChars = recipe.title
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-');
          
          // Try different variations of the name
          const nameVariations = [
            recipeNameWithoutSpecialChars,
            recipeNameWithoutSpecialChars.replace(/-/g, '_'),
            recipe.title.toLowerCase().replace(/\s+/g, '_')
          ];
          
          for (const nameVariation of nameVariations) {
            const matchingImages = availableImages.filter(img => 
              img.toLowerCase().includes(nameVariation) || nameVariation.includes(img.toLowerCase().replace(/\.[^/.]+$/, ""))
            );
            
            if (matchingImages.length > 0) {
              newImagePath = `/images/recipes/${matchingImages[0]}`;
              break;
            }
          }
        }
        
        if (newImagePath) {
          try {
            // Update the recipe with the new image path
            await prisma.recipe.update({
              where: { id: recipe.id },
              data: { imageUrl: newImagePath }
            });
            
            updatedRecipes.push(`${recipe.title} => ${newImagePath}`);
          } catch (error) {
            console.error(`Error updating recipe ${recipe.title}:`, error);
            failedRecipes.push(recipe.title);
          }
        } else {
          console.log(`Could not find matching image for recipe: ${recipe.title}`);
          failedRecipes.push(recipe.title);
        }
      }
    }

    console.log('\nUpdated Recipes:');
    updatedRecipes.forEach(recipe => console.log(recipe));
    
    console.log(`\nSuccessfully updated ${updatedRecipes.length} recipes`);
    
    if (failedRecipes.length > 0) {
      console.log('\nFailed to update these recipes:');
      failedRecipes.forEach(recipe => console.log(recipe));
    }

  } catch (error) {
    console.error('Error fixing missing images:', error);
  } finally {
    await prisma.$disconnect();
  }
}

function findMatchingImages(recipeName: string, availableImages: string[]): string[] {
  const searchName = recipeName.toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');
  
  return availableImages.filter(img => 
    img.toLowerCase().includes(searchName) || 
    img.toLowerCase().includes(searchName.replace(/-/g, '_'))
  );
}

fixAllMissingImages(); 