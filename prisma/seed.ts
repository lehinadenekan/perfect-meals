import { PrismaClient } from '@prisma/client';
import { seedRecipes } from './seed-data/recipes';
import { FERMENTED_FOODS, FermentedIngredient } from '../lib/utils/dietary-classification';

const prisma = new PrismaClient();

// --- Helper Lists for Pescatarian Check ---
const FISH_SEAFOOD_KEYWORDS = [
  'fish', 'salmon', 'tuna', 'cod', 'haddock', 'trout', 'sardine', 'mackerel', 
  'anchovy', 'halibut', 'seabass', 'snapper', 'tilapia', 'catfish',
  'shrimp', 'prawn', 'crab', 'lobster', 'scallop', 'oyster', 'mussel', 'clam',
  'squid', 'octopus', 'calamari', 'caviar', 'roe', 'seafood', 'hilsa', 'kapenta', 'bacalhau'
];

const OTHER_MEAT_KEYWORDS = [
  'beef', 'pork', 'lamb', 'chicken', 'turkey', 'duck', 'goose', 'veal', 'venison',
  'bacon', 'ham', 'sausage', 'mince', 'steak', 'belly', 'liver', 'kidney', 'heart',
  'tripe', 'galinha' // Added galinha for Muamba de Galinha
];

// --- Helper Functions ---
function isIngredientFermented(ingredientName: string): boolean {
  const normalizedName = ingredientName.toLowerCase();
  return Object.values(FERMENTED_FOODS).some((category: FermentedIngredient[]) =>
    category.some((item: FermentedIngredient) => normalizedName.includes(item.name.toLowerCase()))
  );
}

function checkPescatarian(ingredients: { name: string }[], isVegetarian: boolean): boolean {
  if (isVegetarian) return false;

  const lowerCaseIngredients = ingredients.map(ing => ing.name.toLowerCase());
  let hasFishOrSeafood = false;
  let hasOtherMeat = false;

  for (const ingredientName of lowerCaseIngredients) {
    if (FISH_SEAFOOD_KEYWORDS.some(keyword => ingredientName.includes(keyword))) {
      hasFishOrSeafood = true;
    }
    if (OTHER_MEAT_KEYWORDS.some(keyword => ingredientName.includes(keyword))) {
      hasOtherMeat = true;
      break; // Found other meat, no need to check further
    }
  }

  return hasFishOrSeafood && !hasOtherMeat;
}

// --- Main Seeding Logic ---
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
  for (const recipeData of seedRecipes) {
    try {
      const isRecipeVegetarian = recipeData.isVegetarian ?? false; // Determine vegetarian status first
      const isRecipePescatarian = checkPescatarian(recipeData.ingredients, isRecipeVegetarian);
      
      const existingRecipe = await prisma.recipe.findFirst({
        where: { title: recipeData.title }
      });

      const recipe = await prisma.recipe.upsert({
        where: {
          id: existingRecipe?.id ?? 'new-recipe'
        },
        create: {
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
          isVegetarian: isRecipeVegetarian,
          isVegan: recipeData.isVegan ?? false,
          isGlutenFree: recipeData.isGlutenFree ?? false,
          isLactoseFree: recipeData.isLactoseFree ?? false,
          isNutFree: recipeData.isNutFree ?? false,
          isFermented: recipeData.isFermented ?? false,
          isLowFodmap: recipeData.isLowFodmap ?? false,
          isPescatarian: isRecipePescatarian,
          calories: recipeData.calories,
          notes: recipeData.notes,
          ingredients: {
            create: recipeData.ingredients.map(ingredient => ({
              name: ingredient.name,
              amount: ingredient.amount,
              unit: ingredient.unit,
              notes: ingredient.notes,
              isFermented: isIngredientFermented(ingredient.name),
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
        },
        update: {
          description: recipeData.description,
          cookingTime: recipeData.cookingTime,
          servings: recipeData.servings,
          difficulty: recipeData.difficulty,
          cuisineType: recipeData.cuisineType,
          regionOfOrigin: recipeData.regionOfOrigin || null,
          imageUrl: recipeData.imageUrl,
          isVegetarian: isRecipeVegetarian,
          isVegan: recipeData.isVegan ?? false,
          isGlutenFree: recipeData.isGlutenFree ?? false,
          isLactoseFree: recipeData.isLactoseFree ?? false,
          isNutFree: recipeData.isNutFree ?? false,
          isFermented: recipeData.isFermented ?? false,
          isLowFodmap: recipeData.isLowFodmap ?? false,
          isPescatarian: isRecipePescatarian,
          calories: recipeData.calories,
          notes: recipeData.notes,
        },
      });

      console.log(`Upserted recipe: ${recipe.title}${isRecipePescatarian ? ' (Pescatarian)' : ''}`);
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