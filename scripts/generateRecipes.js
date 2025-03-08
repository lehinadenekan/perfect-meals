const { PrismaClient } = require('@prisma/client');
const { SpoonacularService } = require('../app/services/spoonacularService');

const prisma = new PrismaClient();
const spoonacular = new SpoonacularService();

async function generateRecipes() {
  try {
    console.log('Starting recipe generation...');

    // Get random recipes from Spoonacular
    const recipes = await spoonacular.getRandomRecipes({ number: 20 });
    
    console.log(`Successfully added ${recipes.length} new recipes to the database!`);
    
    // Log some details about the new recipes
    recipes.forEach(recipe => {
      console.log(`- ${recipe.title} (${recipe.cuisineType} cuisine)`);
    });

  } catch (error) {
    console.error('Error generating recipes:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the script
generateRecipes()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  }); 