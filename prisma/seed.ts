import { PrismaClient } from '@prisma/client';
import { recipes } from './seed-data/recipes';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');
  
  // Clear existing data
  await prisma.ingredient.deleteMany();
  await prisma.instruction.deleteMany();
  await prisma.nutritionFacts.deleteMany();
  await prisma.recipe.deleteMany();
  await prisma.user.deleteMany();
  await prisma.cuisine.deleteMany();
  
  // Create a default user and cuisine
  const defaultUser = await prisma.user.create({
    data: {
      email: 'chef@perfectmeals.com',
      name: 'Chef Perfect'
    }
  });

  const defaultCuisine = await prisma.cuisine.create({
    data: {
      name: 'Traditional',
      region: 'Global',
      difficultyLevel: 'MEDIUM',
      averagePreparationTime: 30
    }
  });
  
  // Add all recipes
  for (const recipe of recipes) {
    const { ingredients, instructions, nutritionFacts, ...recipeData } = recipe;
    
    const result = await prisma.recipe.create({
      data: {
        ...recipeData,
        author: {
          connect: { id: defaultUser.id }
        },
        cuisine: {
          connect: { id: defaultCuisine.id }
        },
        ingredients: {
          create: ingredients
        },
        instructions: {
          create: instructions
        },
        nutritionFacts: {
          create: nutritionFacts
        }
      }
    });
    console.log(`Created recipe with id: ${result.id}`);
  }
  
  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 