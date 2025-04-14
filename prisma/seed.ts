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

  // --- Seed Cuisines --- 
  console.log('Seeding cuisines...');
  const cuisineMap = new Map<string, { id: string }>(); // Map "name|region" to cuisine ID
  for (const recipeData of seedRecipes) {
    if (recipeData.cuisineType && recipeData.regionOfOrigin) {
        const mapKey = `${recipeData.cuisineType}|${recipeData.regionOfOrigin}`;
        if (!cuisineMap.has(mapKey)) {
            try {
                const cuisine = await prisma.cuisine.upsert({
                    where: { name: recipeData.cuisineType }, // Use name as unique identifier for upsert
                    update: { region: recipeData.regionOfOrigin }, // Update region if name exists
                    create: {
                        name: recipeData.cuisineType,
                        region: recipeData.regionOfOrigin,
                        // Add default values for any other required Cuisine fields if necessary
                        // Example defaults (adjust as needed based on your Cuisine model):
                        averagePreparationTime: 30, 
                        commonIngredients: [],
                        cookingMethods: [],
                        dietaryConsiderations: [],
                        difficultyLevel: "Medium",
                        mealTypes: [],
                        spiceProfile: [],
                    },
                });
                cuisineMap.set(mapKey, { id: cuisine.id });
                console.log(`Upserted cuisine: ${cuisine.name} (${cuisine.region})`);
            } catch (error) {
                 console.error(`Error upserting cuisine ${recipeData.cuisineType}:`, error);
                 // Decide if you want to stop seeding or continue
            }
        }
    }
  }
  console.log('Cuisine seeding finished.');
  // --- End Seed Cuisines ---

  // --- Create/Update Recipes --- 
  console.log('Seeding recipes...');
  for (const recipeData of seedRecipes) {
    try {
      const isRecipeVegetarian = recipeData.isVegetarian ?? false;
      const isRecipePescatarian = checkPescatarian(recipeData.ingredients, isRecipeVegetarian);
      
      // Find corresponding Cuisine ID
      const cuisineMapKey = (recipeData.cuisineType && recipeData.regionOfOrigin) 
          ? `${recipeData.cuisineType}|${recipeData.regionOfOrigin}` 
          : null;
      const cuisineInfo = cuisineMapKey ? cuisineMap.get(cuisineMapKey) : null;

      const recipeInputData = {
          title: recipeData.title,
          description: recipeData.description,
          cookingTime: recipeData.cookingTime,
          servings: recipeData.servings,
          difficulty: recipeData.difficulty,
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
          // Connect to Cuisine if found
          ...(cuisineInfo && { cuisines: { connect: { id: cuisineInfo.id } } }),
      };

      const recipe = await prisma.recipe.upsert({
        where: {
          // Use a truly unique identifier for the where clause in upsert
          // If title is unique: 
          title: recipeData.title, 
          // If not, consider adding a unique slug or using the ID if you know it beforehand
          // id: existingRecipe?.id ?? 'placeholder-for-create' // Using ID is safer if available
        },
        create: {
          ...recipeInputData,
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
          // Conditionally create nutritionFacts only if data exists
          ...(recipeData.nutritionFacts && {
             nutritionFacts: {
                create: {
                    protein: recipeData.nutritionFacts.protein,
                    carbs: recipeData.nutritionFacts.carbs,
                    fat: recipeData.nutritionFacts.fat,
                    fiber: recipeData.nutritionFacts.fiber,
                    sugar: recipeData.nutritionFacts.sugar,
                    sodium: recipeData.nutritionFacts.sodium,
                },
            }
          }),
        },
        update: {
          ...recipeInputData, // Reuse input data for update
          // Clear existing relations before connecting new ones if needed for update
          // cuisines: cuisineInfo ? { set: [{ id: cuisineInfo.id }] } : { set: [] }, 
          // Note: Updating relations might require more complex logic depending on needs
          // For simplicity, this example focuses on create; update only modifies scalar fields here.
          // If ingredients/instructions need updating, add logic here too.
        },
      });

      console.log(`Upserted recipe: ${recipe.title}`);
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