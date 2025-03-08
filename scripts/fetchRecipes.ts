import { PrismaClient, Prisma } from '@prisma/client';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();
const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY;

interface SpoonacularRecipe {
  id: number;
  title: string;
  image: string;
  readyInMinutes: number;
  servings: number;
  summary: string;
  instructions: string;
  cuisines: string[];
  dishTypes: string[];
  diets: string[];
}

async function fetchAndSaveRecipes(numberOfRecipes: number = 10) {
  try {
    console.log('Fetching recipes from Spoonacular...');
    
    const response = await axios.get<{ recipes: SpoonacularRecipe[] }>(`https://api.spoonacular.com/recipes/random`, {
      params: {
        apiKey: SPOONACULAR_API_KEY,
        number: numberOfRecipes,
        addRecipeInformation: true,
      }
    });

    const recipes = response.data.recipes;
    console.log(`Fetched ${recipes.length} recipes`);

    // Get admin user
    const admin = await prisma.user.findUnique({
      where: { email: 'admin@perfectmeals.com' }
    });

    if (!admin) {
      throw new Error('Admin user not found');
    }

    for (const recipe of recipes) {
      try {
        // Create default cuisine
        const cuisineName = recipe.cuisines[0] || 'International';
        const defaultCuisine = await prisma.cuisine.upsert({
          where: { name: cuisineName },
          update: {},
          create: {
            name: cuisineName,
            region: 'International',
            difficultyLevel: 'MEDIUM',
            averagePreparationTime: recipe.readyInMinutes,
            spiceProfile: [],
            mealTypes: ['DINNER'],
            cookingMethods: [],
            dietaryConsiderations: recipe.diets
          }
        });

        // Split instructions into steps
        const instructionSteps = recipe.instructions
          .split(/\n|\./)
          .map(step => step.trim())
          .filter(step => step.length > 0);

        const recipeData: Prisma.RecipeCreateInput = {
          title: recipe.title,
          description: recipe.summary,
          imageUrl: recipe.image,
          cookingTime: recipe.readyInMinutes,
          servings: recipe.servings,
          difficulty: 'MEDIUM',
          cuisineType: cuisineName,
          type: 'DINNER',
          author: {
            connect: { id: admin.id }
          },
          cuisine: {
            connect: { id: defaultCuisine.id }
          },
          instructions: {
            create: instructionSteps.map((step, index) => ({
              stepNumber: index + 1,
              description: step
            }))
          },
          isVegetarian: recipe.diets.includes('vegetarian'),
          isVegan: recipe.diets.includes('vegan'),
          isGlutenFree: recipe.diets.includes('gluten free'),
          isDairyFree: recipe.diets.includes('dairy free'),
          isNutFree: false,
          nutritionFacts: {
            create: {
              protein: Math.floor(Math.random() * 30) + 10,
              carbs: Math.floor(Math.random() * 50) + 20,
              fat: Math.floor(Math.random() * 30) + 5,
              fiber: Math.floor(Math.random() * 10) + 2,
              sugar: Math.floor(Math.random() * 20) + 5,
              sodium: Math.floor(Math.random() * 1000) + 200
            }
          }
        };

        await prisma.recipe.create({
          data: recipeData
        });
        console.log(`Saved recipe: ${recipe.title}`);
      } catch (error) {
        console.error(`Error saving recipe ${recipe.title}:`, error);
      }
    }

    console.log('Finished saving recipes');
  } catch (error) {
    console.error('Error fetching recipes:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Fetch 10 recipes
fetchAndSaveRecipes(10); 