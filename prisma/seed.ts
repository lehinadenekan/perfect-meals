import { PrismaClient } from '@prisma/client';
import { recipes } from './seed-data/recipes';
import { cuisineData } from './seed/cuisines';
import { RecipeGenerator } from '../app/services/recipeGenerator';

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
  await prisma.cuisine.deleteMany();

  // Create cuisines first
  console.log('Creating cuisines...');
  const cuisineMap = new Map();
  
  // Create default cuisine first
  const defaultCuisine = await prisma.cuisine.create({
    data: {
      name: 'Traditional',
      region: 'Global',
      difficultyLevel: 'MEDIUM',
      averagePreparationTime: 30
    }
  });
  cuisineMap.set('Traditional', defaultCuisine.id);
  
  for (const cuisine of cuisineData) {
    const { subCuisines, ...mainCuisineData } = cuisine;
    
    const createdCuisine = await prisma.cuisine.create({
      data: mainCuisineData
    });
    
    cuisineMap.set(createdCuisine.name, createdCuisine.id);

    if (subCuisines) {
      for (const subCuisine of subCuisines) {
        const createdSubCuisine = await prisma.cuisine.create({
          data: {
            ...subCuisine,
            parentCuisine: {
              connect: { id: createdCuisine.id }
            }
          }
        });
        cuisineMap.set(createdSubCuisine.name, createdSubCuisine.id);
      }
    }
  }

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
    // Get cuisine ID or use default
    const cuisineId = cuisineMap.get(recipe.cuisineType) || cuisineMap.get('Traditional');
    if (!cuisineId) {
      console.warn(`No cuisine found for ${recipe.cuisineType}, using default`);
    }
    
    const createdRecipe = await prisma.recipe.create({
      data: {
        title: recipe.title,
        description: recipe.description,
        cookingTime: recipe.cookingTime,
        servings: recipe.servings,
        difficulty: recipe.difficulty,
        cuisineType: recipe.cuisineType,
        regionOfOrigin: recipe.regionOfOrigin,
        cuisine: {
          connect: {
            id: cuisineId || defaultCuisine.id
          }
        },
        imageUrl: recipe.imageUrl,
        calories: recipe.calories,
        type: recipe.type,
        isVegetarian: recipe.isVegetarian,
        isVegan: recipe.isVegan,
        isGlutenFree: recipe.isGlutenFree,
        isDairyFree: recipe.isDairyFree,
        isNutFree: recipe.isNutFree,
        author: {
          connect: { id: defaultUser.id }
        },
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

  console.log('Seeding initial recipes completed!');
  
  // Generate additional recipes using RecipeGenerator
  console.log('Starting to generate additional recipes...');
  const recipeGenerator = new RecipeGenerator();
  
  // Get all cuisine IDs
  const cuisines = await prisma.cuisine.findMany();
  
  // Generate 20 recipes for each cuisine
  for (const cuisine of cuisines) {
    console.log(`Generating recipes for cuisine: ${cuisine.name}`);
    
    // Different meal types to ensure variety
    const mealTypes = ['BREAKFAST', 'LUNCH', 'DINNER', 'SNACK'];
    const difficulties = ['EASY', 'MEDIUM', 'HARD'];
    const servingSizes = [2, 4, 6, 8];
    
    for (let i = 0; i < 20; i++) {
      try {
        const params = {
          cuisineId: cuisine.id,
          difficulty: difficulties[i % difficulties.length],
          cookingTime: Math.floor(Math.random() * 120) + 15, // 15-135 minutes
          servings: servingSizes[i % servingSizes.length],
          mealType: mealTypes[i % mealTypes.length],
          spiceLevel: ['MILD', 'MEDIUM', 'HOT'][Math.floor(Math.random() * 3)],
          isFusion: Math.random() < 0.2, // 20% chance of fusion recipes
        };
        
        const recipe = await recipeGenerator.generateRecipe(params);
        console.log(`Generated recipe: ${recipe.title}`);
      } catch (error) {
        console.error(`Failed to generate recipe for ${cuisine.name}:`, error);
        continue;
      }
    }
  }

  console.log('Additional recipe generation completed!');
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