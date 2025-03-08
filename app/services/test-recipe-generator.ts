import { PrismaClient } from '@prisma/client';
import recipeGenerator from './recipeGenerator';

const prisma = new PrismaClient();

async function testRecipeGeneration() {
  try {
    console.log('Testing Enhanced Recipe Generator...\n');

    // 1. Generate a traditional Japanese recipe
    console.log('1. Generating traditional Japanese recipe...');
    const japaneseCuisine = await prisma.cuisine.findFirst({
      where: { name: 'Japanese' }
    });
    
    if (japaneseCuisine) {
      const traditionalRecipe = await recipeGenerator.generateRecipe({
        cuisineId: japaneseCuisine.id,
        difficulty: 'MEDIUM',
        mealType: 'main course',
        spiceLevel: 'MILD'
      });
      console.log('Generated Traditional Japanese Recipe:', traditionalRecipe.title);
      console.log('Description:', traditionalRecipe.description);
      console.log('\n');
    }

    // 2. Generate a spicy Thai recipe
    console.log('2. Generating spicy Thai recipe...');
    const thaiCuisine = await prisma.cuisine.findFirst({
      where: { name: 'Thai' }
    });
    
    if (thaiCuisine) {
      const spicyRecipe = await recipeGenerator.generateRecipe({
        cuisineId: thaiCuisine.id,
        spiceLevel: 'HOT',
        mealType: 'curry',
        dietaryPreferences: ['vegetarian']
      });
      console.log('Generated Spicy Thai Recipe:', spicyRecipe.title);
      console.log('Description:', spicyRecipe.description);
      console.log('\n');
    }

    // 3. Generate a Japanese-Thai fusion recipe
    console.log('3. Generating Japanese-Thai fusion recipe...');
    if (japaneseCuisine && thaiCuisine) {
      const fusionRecipe = await recipeGenerator.generateRecipe({
        cuisineId: japaneseCuisine.id,
        fusionCuisineIds: [thaiCuisine.id],
        isFusion: true,
        difficulty: 'HARD',
        spiceLevel: 'MEDIUM'
      });
      console.log('Generated Fusion Recipe:', fusionRecipe.title);
      console.log('Description:', fusionRecipe.description);
      console.log('\n');
    }

  } catch (error) {
    console.error('Error testing recipe generator:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the test
testRecipeGeneration()
  .then(() => console.log('Test completed!'))
  .catch(console.error); 