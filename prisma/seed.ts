// prisma/seed.ts
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
    where: { email: 'admin@recipe-ideas.online' },
    update: {},
    create: {
      email: 'admin@recipe-ideas.online',
      name: 'Admin',
    },
  });

  console.log('Admin user created/found:', adminUser.id);

  // --- Seed Cuisines ---
  console.log('Seeding cuisines...');
  const cuisineMap = new Map<string, { id: string }>(); // Map "name|region" to cuisine ID
  // NOTE: Still reading recipeData.continent here to populate the Cuisine model
  for (const recipeData of seedRecipes) {
    if (recipeData.continent && recipeData.regionOfOrigin) {
        const mapKey = `${recipeData.continent}|${recipeData.regionOfOrigin}`;
        if (!cuisineMap.has(mapKey)) {
            try {
                const cuisine = await prisma.cuisine.upsert({
                    where: { name: recipeData.continent },
                    update: { region: recipeData.regionOfOrigin },
                    create: {
                        name: recipeData.continent,
                        region: recipeData.regionOfOrigin,
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
                 console.error(`Error upserting cuisine ${recipeData.continent}:`, error);
            }
        }
    }
  }
  console.log('Cuisine seeding finished.');
  // --- End Seed Cuisines ---

  // --- Create/Update Recipes ---
  console.log('Seeding recipes...');
  for (const recipeData of seedRecipes) {
    console.log(`Processing recipe: ${recipeData.title}`);
    try {
      // Determine the correct category name based on the type
      // Assuming Category names are title-cased: 'Main', 'Dessert', 'Beverage'
      const categoryNameToConnect = recipeData.type === 'MAIN' ? 'Main' : 
                                   recipeData.type === 'DESSERT' ? 'Dessert' : 
                                   recipeData.type === 'BEVERAGE' ? 'Beverage' :
                                   'Main'; // Default fallback, adjust if needed

      const isRecipeVegetarian = recipeData.isVegetarian ?? false;
      const isRecipePescatarian = checkPescatarian(recipeData.ingredients, isRecipeVegetarian);
      // NOTE: Still reading recipeData.continent & regionOfOrigin to find the Cuisine relation
      const cuisineMapKey = (recipeData.continent && recipeData.regionOfOrigin) ? `${recipeData.continent}|${recipeData.regionOfOrigin}` : null;
      const cuisineInfo = cuisineMapKey ? cuisineMap.get(cuisineMapKey) : null;

      // --- Start of Upsert Block ---
      await prisma.recipe.upsert({
        where: { title: recipeData.title },
        // --- UPDATE part of upsert ---
        update: {
          description: recipeData.description,
          cookingTime: recipeData.cookingTime,
          servings: recipeData.servings,
          difficulty: recipeData.difficulty,
          regionOfOrigin: recipeData.regionOfOrigin,
          continent: recipeData.continent,
          imageUrl: recipeData.imageUrl,
          calories: recipeData.calories,
          cookingStyles: recipeData.cookingStyles ?? [],
          isVegetarian: isRecipeVegetarian,
          isVegan: recipeData.isVegan ?? false,
          isGlutenFree: recipeData.isGlutenFree ?? false,
          isLactoseFree: recipeData.isLactoseFree ?? false,
          isNutFree: recipeData.isNutFree ?? false,
          isFermented: recipeData.isFermented ?? false,
          isLowFodmap: recipeData.isLowFodmap ?? false,
          isPescatarian: isRecipePescatarian,
          source: 'ADMIN',
          authorId: null, // Keep as null for ADMIN recipes
          notes: recipeData.notes,

          // --- Dietary Notes (Update - Upsert if exists, do nothing if missing) ---
          dietaryNotes: recipeData.dietaryNotes
            ? { // If seed data HAS dietary notes:
                upsert: { // Use upsert for the related record
                  create: { // Data for creating if it doesn't exist
                    fodmapInfo: recipeData.dietaryNotes.fodmapInfo,
                    keyNutrients: recipeData.dietaryNotes.keyNutrients,
                    antiInflammatoryInfo: recipeData.dietaryNotes.antiInflammatoryInfo,
                    // Add other fields if needed
                  },
                  update: { // Data for updating if it *does* exist
                    fodmapInfo: recipeData.dietaryNotes.fodmapInfo,
                    keyNutrients: recipeData.dietaryNotes.keyNutrients,
                    antiInflammatoryInfo: recipeData.dietaryNotes.antiInflammatoryInfo,
                    // Add other fields if needed
                  },
                },
              }
            : undefined, // If seed data is missing, DO NOTHING to the relation

          // --- Ingredients (Update - Replace) ---
          ingredients: {
            deleteMany: {}, // Delete all existing ingredients for this recipe
            create: recipeData.ingredients.map(ing => ({ // Create the new set
              name: ing.name,
              amount: ing.amount,
              unit: ing.unit,
              notes: ing.notes,
              isFermented: isIngredientFermented(ing.name)
            })),
          },

          // --- Instructions (Update - Replace) ---
          instructions: {
            deleteMany: {}, // Delete all existing instructions for this recipe
            create: recipeData.instructions.map(inst => ({ // Create the new set
              stepNumber: inst.stepNumber,
              description: inst.description,
              imageUrl: inst.imageUrl, // <-- Included imageUrl
            })),
          },

          // --- Nutrition Facts (Update - Upsert if exists, do nothing if missing) ---
          nutritionFacts: recipeData.nutritionFacts
            ? {
                upsert: {
                  create: recipeData.nutritionFacts,
                  update: recipeData.nutritionFacts,
                },
              }
            : undefined, // If seed data is missing, DO NOTHING to the relation

          // --- Categories (Update) --- Keep set:[] before connectOrCreate
          categories: {
            set: [],
            connectOrCreate: {
              where: { name: categoryNameToConnect },
              create: { name: categoryNameToConnect },
            },
          },
          // --- Cuisines (Update) --- Keep set:[] before connect
          cuisines: cuisineInfo ? {
              set: [],
              connect: { id: cuisineInfo.id }
          } : { set: [] } // Explicitly disconnect all if no cuisine info

        },
        // --- CREATE part of upsert --- (Remains largely the same)
        create: {
          title: recipeData.title,
          description: recipeData.description,
          cookingTime: recipeData.cookingTime,
          servings: recipeData.servings,
          difficulty: recipeData.difficulty,
          regionOfOrigin: recipeData.regionOfOrigin,
          continent: recipeData.continent,
          imageUrl: recipeData.imageUrl,
          calories: recipeData.calories,
          cookingStyles: recipeData.cookingStyles ?? [],
          isVegetarian: isRecipeVegetarian,
          isVegan: recipeData.isVegan ?? false,
          isGlutenFree: recipeData.isGlutenFree ?? false,
          isLactoseFree: recipeData.isLactoseFree ?? false,
          isNutFree: recipeData.isNutFree ?? false,
          isFermented: recipeData.isFermented ?? false,
          isLowFodmap: recipeData.isLowFodmap ?? false,
          isPescatarian: isRecipePescatarian,
          source: 'ADMIN',
          authorId: null, // Keep as null for ADMIN recipes
          notes: recipeData.notes,

          // --- Dietary Notes (Create) ---
          dietaryNotes: recipeData.dietaryNotes
            ? {
                create: {
                  fodmapInfo: recipeData.dietaryNotes.fodmapInfo,
                  keyNutrients: recipeData.dietaryNotes.keyNutrients,
                  antiInflammatoryInfo: recipeData.dietaryNotes.antiInflammatoryInfo,
                  // Add other fields if needed
                },
              }
            : undefined, // Don't create if no data

          // --- Ingredients (Create) ---
          ingredients: {
            create: recipeData.ingredients.map(ing => ({
              name: ing.name,
              amount: ing.amount,
              unit: ing.unit,
              notes: ing.notes,
              isFermented: isIngredientFermented(ing.name)
            })),
          },

          // --- Instructions (Create) ---
          instructions: {
            create: recipeData.instructions.map(inst => ({
              stepNumber: inst.stepNumber,
              description: inst.description,
              imageUrl: inst.imageUrl, // <-- Included imageUrl
            })),
          },

          // --- Nutrition Facts (Create) ---
          nutritionFacts: recipeData.nutritionFacts
            ? { create: recipeData.nutritionFacts }
            : undefined,

          // --- Categories (Create) ---
          categories: {
            connectOrCreate: {
              where: { name: categoryNameToConnect },
              create: { name: categoryNameToConnect },
            },
          },
           // --- Cuisines (Create) ---
          cuisines: cuisineInfo ? {
              connect: { id: cuisineInfo.id }
          } : undefined

        },
      });
      // --- End of Upsert Block ---

      console.log(`Upserted recipe: ${recipeData.title}`);
    } catch (error) {
      console.error(`Error upserting recipe ${recipeData.title}:`, error);
      // Optional: Re-throw error if you want the seed to stop on first failure
      // throw error;
    }
  }
  console.log('Recipe seeding finished.');
  // --- End Create/Update Recipes ---


  // ================================================
  // --- Seed Ingredient Mappings (NEW SECTION) ---
  // ================================================
  console.log('Seeding Ingredient Mappings...');

  const ingredientMappings = [
    // --- Onion Mappings ---
    { ingredientQuery: 'onion',         amazonSearchTerm: 'by Amazon Brown Onions' },
    { ingredientQuery: 'large onion',   amazonSearchTerm: 'by Amazon Brown Onions' },
    { ingredientQuery: 'medium onion',  amazonSearchTerm: 'by Amazon Brown Onions' },
    { ingredientQuery: 'small onion',   amazonSearchTerm: 'by Amazon Brown Onions' },
    { ingredientQuery: 'yellow onion',  amazonSearchTerm: 'by Amazon Brown Onions' },
    { ingredientQuery: 'brown onion',   amazonSearchTerm: 'by Amazon Brown Onions' },
    { ingredientQuery: 'white onion',   amazonSearchTerm: 'white onions' }, // Assuming 'white onions' is the best term on Amazon Fresh UK
    { ingredientQuery: 'red onion',     amazonSearchTerm: 'by Amazon Red Onions' },
    { ingredientQuery: 'shallot',       amazonSearchTerm: 'shallots' },
    { ingredientQuery: 'spring onion',  amazonSearchTerm: 'by Amazon Spring Onions' },
    { ingredientQuery: 'green onion',   amazonSearchTerm: 'by Amazon Spring Onions' },
    { ingredientQuery: 'salad onion',   amazonSearchTerm: 'by Amazon Spring Onions' },
    // --- Garlic Mappings ---
    { ingredientQuery: 'garlic',        amazonSearchTerm: 'by Amazon Fresh Garlic' },
    { ingredientQuery: 'garlic clove',  amazonSearchTerm: 'by Amazon Fresh Garlic' },
    { ingredientQuery: 'clove of garlic', amazonSearchTerm: 'by Amazon Fresh Garlic' },
    // --- Olive Oil Mappings ---
    { ingredientQuery: 'olive oil',     amazonSearchTerm: 'by Amazon Extra Virgin Olive Oil' },
    { ingredientQuery: 'extra virgin olive oil', amazonSearchTerm: 'by Amazon Extra Virgin Olive Oil' },
    // --- Salt & Pepper Mappings ---
    { ingredientQuery: 'salt',          amazonSearchTerm: 'table salt' },
    { ingredientQuery: 'sea salt',      amazonSearchTerm: 'sea salt flakes' },
    { ingredientQuery: 'kosher salt',   amazonSearchTerm: 'kosher salt' },
    { ingredientQuery: 'black pepper',  amazonSearchTerm: 'black peppercorns grinder' },
    { ingredientQuery: 'ground black pepper', amazonSearchTerm: 'ground black pepper' },
    // --- Flour & Sugar Mappings ---
    { ingredientQuery: 'flour',         amazonSearchTerm: 'plain flour' },
    { ingredientQuery: 'plain flour',   amazonSearchTerm: 'plain flour' },
    { ingredientQuery: 'all-purpose flour', amazonSearchTerm: 'plain flour' },
    { ingredientQuery: 'self-raising flour', amazonSearchTerm: 'self raising flour' },
    { ingredientQuery: 'sugar',         amazonSearchTerm: 'granulated sugar' },
    { ingredientQuery: 'granulated sugar', amazonSearchTerm: 'granulated sugar' },
    { ingredientQuery: 'caster sugar',  amazonSearchTerm: 'caster sugar' },
    // --- Butter & Eggs Mappings ---
    { ingredientQuery: 'butter',        amazonSearchTerm: 'unsalted butter block' },
    { ingredientQuery: 'unsalted butter', amazonSearchTerm: 'unsalted butter block' },
    { ingredientQuery: 'salted butter', amazonSearchTerm: 'salted butter block' },
    { ingredientQuery: 'egg',           amazonSearchTerm: 'free range eggs large' },
    { ingredientQuery: 'large egg',     amazonSearchTerm: 'free range eggs large' },
    // --- Chicken Mappings ---
    { ingredientQuery: 'chicken breast', amazonSearchTerm: 'chicken breast fillets' },
    { ingredientQuery: 'boneless skinless chicken breast', amazonSearchTerm: 'chicken breast fillets' },
    { ingredientQuery: 'chicken thigh', amazonSearchTerm: 'chicken thigh fillets boneless skinless' },
    // --- Tomato Mappings ---
    { ingredientQuery: 'tomato',        amazonSearchTerm: 'classic round tomatoes' },
    { ingredientQuery: 'tomatoes on the vine', amazonSearchTerm: 'tomatoes on the vine' },
    { ingredientQuery: 'cherry tomato', amazonSearchTerm: 'cherry tomatoes' },
    { ingredientQuery: 'roma tomato',   amazonSearchTerm: 'plum tomatoes' },
    { ingredientQuery: 'plum tomato',   amazonSearchTerm: 'plum tomatoes' },
    { ingredientQuery: 'diced tomatoes', amazonSearchTerm: 'chopped tomatoes canned' },
    { ingredientQuery: 'canned diced tomatoes', amazonSearchTerm: 'chopped tomatoes canned' },
    { ingredientQuery: 'chopped tomatoes', amazonSearchTerm: 'chopped tomatoes canned' },
    { ingredientQuery: 'tomato paste',  amazonSearchTerm: 'tomato puree double concentrate' },
    { ingredientQuery: 'tomato puree',  amazonSearchTerm: 'tomato puree double concentrate' },
    // Add more mappings as needed
  ];

  // Delete existing mappings first for a clean slate
  console.log(`Deleting existing IngredientMapping records...`);
  await prisma.ingredientMapping.deleteMany({});
  console.log(`Existing IngredientMapping records deleted.`);

  // Create new mappings
  console.log(`Creating ${ingredientMappings.length} IngredientMapping records...`);
  const mappingResult = await prisma.ingredientMapping.createMany({
      data: ingredientMappings,
  });
  console.log(`IngredientMapping seeding finished. Created ${mappingResult.count} records.`);
  // ================================================
  // --- End Ingredient Mapping Seeding ---
  // ================================================


  console.log('Seeding finished overall.'); // Final overall message
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    console.log("Disconnecting Prisma Client...");
    await prisma.$disconnect();
  });