import { PrismaClient } from '@prisma/client';
import { recipes } from './seed-data/recipes';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting to seed database...');

  // Clear existing data in the correct order
  await prisma.review.deleteMany();
  await prisma.nutritionFacts.deleteMany();
  await prisma.instruction.deleteMany();
  await prisma.ingredient.deleteMany();
  await prisma.recipe.deleteMany();
  await prisma.userCuisinePreference.deleteMany();
  await prisma.userPreference.deleteMany();
  await prisma.user.deleteMany();

  // Create a default user for recipes
  const defaultUser = await prisma.user.create({
    data: {
      email: 'chef@perfectmeals.com',
      name: 'Chef Perfect',
      preferences: {
        create: {
          cookingTime: 'MEDIUM',
          servingSize: 4,
          mealPrep: true,
          isVegetarian: false,
          isVegan: false,
          isGlutenFree: false,
          isDairyFree: false,
          isKosher: false,
          isHalal: false,
          isLowCarb: false,
        },
      },
    },
  });

  // Create recipes
  for (const recipe of recipes) {
    const createdRecipe = await prisma.recipe.create({
      data: {
        title: recipe.title,
        description: recipe.description,
        cookingTime: recipe.cookingTime,
        servings: recipe.servings,
        difficulty: recipe.difficulty,
        cuisineType: recipe.cuisineType,
        regionOfOrigin: recipe.regionOfOrigin,
        imageUrl: recipe.imageUrl,
        calories: recipe.calories,
        type: recipe.type,
        isVegetarian: recipe.isVegetarian,
        isVegan: recipe.isVegan,
        isGlutenFree: recipe.isGlutenFree,
        isDairyFree: recipe.isDairyFree,
        isNutFree: recipe.isNutFree,
        authorId: defaultUser.id,
        ingredients: {
          create: recipe.ingredients,
        },
        instructions: {
          create: recipe.instructions,
        },
        nutritionFacts: {
          create: recipe.nutritionFacts,
        },
        // Add some sample reviews
        reviews: {
          create: Array.from({ length: Math.floor(Math.random() * 10) + 1 }, () => ({
            rating: Math.floor(Math.random() * 3) + 3, // Ratings between 3-5
            comment: 'Great recipe!',
          })),
        },
      },
    });

    console.log(`Created recipe: ${createdRecipe.title}`);
  }

  console.log('Database seeding completed!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 