import { PrismaClient, Prisma } from '@prisma/client';
import { recipes } from './seed-data/recipes';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  // Create a default admin user if it doesn't exist
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@perfect-meals.com' },
    update: {},
    create: {
      email: 'admin@perfect-meals.com',
      name: 'Admin',
    },
  });

  console.log('Admin user created:', adminUser.id);

  // Create recipes
  for (const recipeData of recipes) {
    try {
      const recipeInput: Prisma.RecipeCreateInput = {
        title: recipeData.title,
        description: recipeData.description,
        cookingTime: recipeData.cookingTime,
        servings: recipeData.servings,
        difficulty: recipeData.difficulty,
        cuisineType: recipeData.cuisineType,
        regionOfOrigin: recipeData.regionOfOrigin || null,
        imageUrl: recipeData.imageUrl,
        author: {
          connect: { id: adminUser.id }
        },
        isVegetarian: recipeData.isVegetarian ?? false,
        isVegan: recipeData.isVegan ?? false,
        isGlutenFree: recipeData.isGlutenFree ?? false,
        isLactoseFree: recipeData.isLactoseFree ?? false,
        isNutFree: recipeData.isNutFree ?? false,
        ingredients: {
          create: recipeData.ingredients.map(ingredient => ({
            name: ingredient.name,
            amount: ingredient.amount,
            unit: ingredient.unit,
            notes: ingredient.notes,
            isFermented: false, // Default value since it's not in our seed data
          })),
        },
        instructions: {
          create: recipeData.instructions.map(instruction => ({
            stepNumber: instruction.stepNumber,
            description: instruction.description,
          })),
        },
        nutritionFacts: {
          create: {
            protein: recipeData.nutritionFacts.protein,
            carbs: recipeData.nutritionFacts.carbs,
            fat: recipeData.nutritionFacts.fat,
            fiber: recipeData.nutritionFacts.fiber,
            sugar: recipeData.nutritionFacts.sugar,
            sodium: recipeData.nutritionFacts.sodium,
          },
        },
      };

      const recipe = await prisma.recipe.create({
        data: recipeInput,
      });

      console.log(`Created recipe: ${recipe.title}`);
    } catch (error) {
      console.error(`Error creating recipe ${recipeData.title}:`, error);
    }
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