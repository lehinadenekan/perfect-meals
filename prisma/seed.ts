// prisma/seed.ts
import { PrismaClient, RegionType, RecipeSource, Prisma } from '@prisma/client';
import { seedRecipes, SeedRecipeRecipe, Ingredient, Instruction } from './seed-data/recipes';
import { regions as regionsSeedData } from './seed-data/regions';
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

// Define a type for the seed data including parentName
type RegionSeedInput = {
  name: string;
  type: RegionType | null;
  continent: string | null;
  parentName?: string; // Temporary field for seeding
};

// --- Helper Functions ---
function _isIngredientFermented(ingredientName: string): boolean {
  const normalizedName = ingredientName.toLowerCase();
  return Object.values(FERMENTED_FOODS).some((category: FermentedIngredient[]) =>
    category.some((item: FermentedIngredient) => normalizedName.includes(item.name.toLowerCase()))
  );
}

function _checkPescatarian(ingredients: { name: string }[], isVegetarian: boolean): boolean {
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

  // --- Seed Regions Stage 1: Upsert all regions to ensure they exist and get IDs ---
  console.log('Seeding regions (Stage 1: Upsert basic info)...');
  const regionNameMap = new Map<string, { id: string, parentName?: string }>();
  const regionsToProcess = regionsSeedData as RegionSeedInput[]; // Cast to our input type

  for (const regionData of regionsToProcess) {
    try {
      const region = await prisma.region.upsert({
        where: { name: regionData.name },
        update: {
          continent: regionData.continent,
          type: regionData.type as RegionType,
        },
        create: {
          name: regionData.name,
          continent: regionData.continent,
          type: regionData.type as RegionType,
        },
        select: { id: true }, // Select only the ID
      });
      regionNameMap.set(regionData.name, { id: region.id, parentName: regionData.parentName });
      // console.log(`Upserted region (Stage 1): ${regionData.name}`);
    } catch (error) {
      console.error(`Error upserting region (Stage 1) ${regionData.name}:`, error);
    }
  }
  console.log('Region seeding (Stage 1) finished.');

  // --- Seed Regions Stage 2: Update parentSubRegionId for countries AND sub-regions ---
  console.log('Seeding regions (Stage 2: Linking hierarchies)...');
  for (const regionData of regionsToProcess) {
    const currentRegionInfo = regionNameMap.get(regionData.name);
    if (!currentRegionInfo) {
      console.warn(`Warning: Could not find current region named '${regionData.name}' in map for Stage 2 linking.`);
      continue;
    }

    if (regionData.type === 'COUNTRY' && regionData.parentName) {
      const parentSubRegionInfo = regionNameMap.get(regionData.parentName);
      if (parentSubRegionInfo) {
        try {
          await prisma.region.update({
            where: { id: currentRegionInfo.id },
            data: { parentSubRegionId: parentSubRegionInfo.id },
          });
        } catch (error) {
          console.error(`Error linking country ${regionData.name} to ${regionData.parentName}:`, error);
        }
      } else {
        console.warn(`Warning: Could not find parent sub-region named '${regionData.parentName}' for country '${regionData.name}'.`);
      }
    } else if (regionData.type === 'SUB_REGION' && regionData.continent) {
      // Link SUB_REGION to its CONTINENT
      const parentContinentInfo = regionNameMap.get(regionData.continent); // regionData.continent holds the name of the continent
      if (parentContinentInfo) {
        try {
          await prisma.region.update({
            where: { id: currentRegionInfo.id },
            data: { parentSubRegionId: parentContinentInfo.id }, // Use the same parentSubRegionId field
          });
        } catch (error) {
          console.error(`Error linking sub-region ${regionData.name} to continent ${regionData.continent}:`, error);
        }
      } else {
        console.warn(`Warning: Could not find parent continent named '${regionData.continent}' for sub-region '${regionData.name}'.`);
      }
    }
  }
  console.log('Region seeding (Stage 2) finished.');

  // --- Seed Recipes (Modified) ---
  console.log('Seeding recipes...');
  for (const recipeData of seedRecipes as SeedRecipeRecipe[]) {
    console.log(`Processing recipe: ${recipeData.title}`);
    try {
      // Find Region IDs based on names provided in seed data
      const regionNames: string[] = recipeData.regionNames || [];
      const foundRegions = await prisma.region.findMany({
        where: { name: { in: regionNames } },
        select: { id: true }, // Select only the IDs
      });

      if (foundRegions.length !== regionNames.length) {
        console.warn(`Warning: Could not find all regions for recipe ${recipeData.title}. Expected: ${regionNames.join(', ')}. Found IDs: ${foundRegions.map((r: { id: string }) => r.id).join(', ')}`);
      }

      // Prepare create payload
      const createData: Prisma.RecipeCreateInput = {
        title: recipeData.title,
        description: recipeData.description,
        servings: recipeData.servings ?? 0,
        cookingTime: recipeData.cookingTime ?? 0,
        difficulty: recipeData.difficulty,
        imageUrl: recipeData.imageUrl,
        source: (recipeData.source || 'ADMIN') as RecipeSource,
        isPublic: recipeData.isPublic ?? true,
        calories: recipeData.calories ?? 0,
        type: recipeData.type,
        isVegetarian: recipeData.isVegetarian ?? false,
        isVegan: recipeData.isVegan ?? false,
        isGlutenFree: recipeData.isGlutenFree ?? false,
        isDairyFree: recipeData.isDairyFree ?? false,
        isNutFree: recipeData.isNutFree ?? false,
        isPescatarian: recipeData.isPescatarian ?? false,
        isLactoseFree: recipeData.isLactoseFree ?? false,
        isLowFodmap: recipeData.isLowFodmap ?? false,
        isSpicy: recipeData.isSpicy ?? false,
        isFermented: recipeData.isFermented ?? false,
        cookingStyles: recipeData.cookingStyles || [],
        mealCategories: recipeData.mealCategories || [],
        regions: {
          connect: foundRegions.map((r: { id: string }) => ({ id: r.id })),
        },
        ingredients: {
          create: recipeData.ingredients?.map((ing: Ingredient) => ({
            name: ing.name,
            amount: ing.amount,
            unit: ing.unit,
            notes: ing.notes,
          })) || [],
        },
        instructions: {
          create: recipeData.instructions?.map((inst: Instruction) => ({
            stepNumber: inst.stepNumber,
            description: inst.description,
            imageUrl: inst.imageUrl,
          })) || [],
        },
        nutritionFacts: recipeData.nutritionFacts ? { create: { ...recipeData.nutritionFacts } } : undefined,
        dietaryNotes: recipeData.dietaryNotes ? { create: { ...recipeData.dietaryNotes } } : undefined,
        notes: recipeData.notes || [],
      };

      if (recipeData.cuisineId) {
        createData.cuisine = { connect: { id: recipeData.cuisineId } };
      }

      // Prepare update payload
      const updateData: Prisma.RecipeUpdateInput = {
        description: recipeData.description,
        servings: recipeData.servings ?? 0,
        cookingTime: recipeData.cookingTime ?? 0,
        difficulty: recipeData.difficulty,
        imageUrl: recipeData.imageUrl,
        source: (recipeData.source || 'ADMIN') as RecipeSource,
        isPublic: recipeData.isPublic ?? true,
        calories: recipeData.calories ?? 0,
        type: recipeData.type,
        isVegetarian: recipeData.isVegetarian ?? false,
        isVegan: recipeData.isVegan ?? false,
        isGlutenFree: recipeData.isGlutenFree ?? false,
        isDairyFree: recipeData.isDairyFree ?? false,
        isNutFree: recipeData.isNutFree ?? false,
        isPescatarian: recipeData.isPescatarian ?? false,
        isLactoseFree: recipeData.isLactoseFree ?? false,
        isLowFodmap: recipeData.isLowFodmap ?? false,
        isSpicy: recipeData.isSpicy ?? false,
        isFermented: recipeData.isFermented ?? false,
        cookingStyles: recipeData.cookingStyles || [],
        mealCategories: recipeData.mealCategories || [],
        regions: {
          set: foundRegions.map((r: { id: string }) => ({ id: r.id })),
        },
        ingredients: {
          deleteMany: {},
          create: recipeData.ingredients?.map((ing: Ingredient) => ({
            name: ing.name,
            amount: ing.amount,
            unit: ing.unit,
            notes: ing.notes,
          })) || [],
        },
        instructions: {
          deleteMany: {},
          create: recipeData.instructions?.map((inst: Instruction) => ({
            stepNumber: inst.stepNumber,
            description: inst.description,
            imageUrl: inst.imageUrl,
          })) || [],
        },
        nutritionFacts: recipeData.nutritionFacts ? {
          upsert: {
            create: { ...recipeData.nutritionFacts },
            update: { ...recipeData.nutritionFacts },
          }
        } : undefined,
        dietaryNotes: recipeData.dietaryNotes ? {
          upsert: {
            create: { ...recipeData.dietaryNotes },
            update: { ...recipeData.dietaryNotes },
          }
        } : undefined,
        notes: recipeData.notes || [],
      };

      if (recipeData.cuisineId) {
        updateData.cuisine = { connect: { id: recipeData.cuisineId } };
      }

      const recipe = await prisma.recipe.upsert({
        where: { title: recipeData.title },
        create: createData,
        update: updateData,
        include: {
          ingredients: true,
          instructions: true,
          regions: true,
          nutritionFacts: true,
          dietaryNotes: true,
        },
      });
      console.log(`Upserted recipe: ${recipe.title}`);
    } catch (error) {
      console.error(`Error upserting recipe ${recipeData.title}:`, error);
    }
  }
  console.log('Recipe seeding finished.');

  console.log('Seeding finished overall.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    console.log('Disconnecting Prisma Client...');
    await prisma.$disconnect();
  });