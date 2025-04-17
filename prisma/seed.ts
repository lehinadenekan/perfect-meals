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
    where: { email: 'admin@perfect-meals.com' },
    update: {},
    create: {
      email: 'admin@perfect-meals.com',
      name: 'Admin',
    },
  });

  console.log('Admin user created/found:', adminUser.id);

  // --- Seed Cuisines ---
  console.log('Seeding cuisines...');
  const cuisineMap = new Map<string, { id: string }>(); // Map "name|region" to cuisine ID
  for (const recipeData of seedRecipes) {
    if (recipeData.cuisineType && recipeData.regionOfOrigin) {
        const mapKey = `${recipeData.cuisineType}|${recipeData.regionOfOrigin}`;
        if (!cuisineMap.has(mapKey)) {
            try {
                const cuisine = await prisma.cuisine.upsert({
                    where: { name: recipeData.cuisineType },
                    update: { region: recipeData.regionOfOrigin },
                    create: {
                        name: recipeData.cuisineType,
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
                 console.error(`Error upserting cuisine ${recipeData.cuisineType}:`, error);
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
      const cuisineMapKey = (recipeData.cuisineType && recipeData.regionOfOrigin) ? `${recipeData.cuisineType}|${recipeData.regionOfOrigin}` : null;
      const cuisineInfo = cuisineMapKey ? cuisineMap.get(cuisineMapKey) : null;

      const recipeInputData = {
          title: recipeData.title,
          description: recipeData.description,
          cookingTime: recipeData.cookingTime,
          servings: recipeData.servings,
          difficulty: recipeData.difficulty,
          regionOfOrigin: recipeData.regionOfOrigin || null,
          imageUrl: recipeData.imageUrl,
          author: { connect: { id: adminUser.id } },
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
          ...(cuisineInfo && { cuisines: { connect: { id: cuisineInfo.id } } }),
      };

      const recipe = await prisma.recipe.upsert({
        where: { title: recipeData.title }, // Assuming title is unique for upsert
        create: {
          ...recipeInputData,
          ingredients: {
            create: recipeData.ingredients.map(ingredient => ({
              name: ingredient.name, amount: ingredient.amount, unit: ingredient.unit, notes: ingredient.notes, isFermented: isIngredientFermented(ingredient.name),
            })),
          },
          instructions: {
            create: recipeData.instructions.map(instruction => ({
              stepNumber: instruction.stepNumber, description: instruction.description,
            })),
          },
          ...(recipeData.nutritionFacts && {
             nutritionFacts: {
                create: { protein: recipeData.nutritionFacts.protein, carbs: recipeData.nutritionFacts.carbs, fat: recipeData.nutritionFacts.fat, fiber: recipeData.nutritionFacts.fiber, sugar: recipeData.nutritionFacts.sugar, sodium: recipeData.nutritionFacts.sodium },
            }
          }),
        },
        update: {
          ...recipeInputData,
          // Handle updating relations if needed (e.g., cuisines, ingredients, instructions)
          // Example (simple replacement, adjust if needed):
          // cuisines: cuisineInfo ? { set: [{ id: cuisineInfo.id }] } : { set: [] },
        },
      });
      console.log(`Upserted recipe: ${recipe.title}`);
    } catch (error) {
      console.error(`Error upserting recipe ${recipeData.title}:`, error);
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