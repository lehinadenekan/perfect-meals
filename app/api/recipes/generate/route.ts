import { NextResponse } from 'next/server';
import { PrismaClient, Prisma, Instruction, NutritionFacts } from '@prisma/client';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth";
import type { Session } from 'next-auth';
import { FOOD_VARIATIONS } from '@/app/config/foodVariations';

const prisma = new PrismaClient();

// --- START: Continent to Country Mapping ---
// Note: This map is used for filtering. Ensure it aligns with your seeded Region names.
const REGION_MAP: Record<string, string[]> = {
  europe: [
    "Albania", "Andorra", "Armenia", "Austria", "Belarus", "Belgium", "Bosnia and Herzegovina",
    "Bulgaria", "Croatia", "Cyprus", "Czech Republic", "Denmark", "England",
    "Estonia", "Finland", "France", "Georgia", "Germany", "Greece", "Hungary", "Iceland",
    "Ireland", "Italy", "Kosovo", "Latvia", "Liechtenstein", "Lithuania", "Luxembourg", "Malta",
    "Moldova", "Monaco", "Montenegro", "Netherlands", "North Macedonia", "Norway", "Poland",
    "Portugal", "Romania", "Russia", "San Marino", "Serbia", "Slovakia", "Slovenia",
    "Spain", "Sweden", "Switzerland", "Turkey", "Ukraine", "United Kingdom", "Vatican City"
  ],
  africa: [
    "Algeria", "Angola", "Benin", "Botswana", "Burkina Faso", "Burundi", "Cabo Verde",
    "Cameroon", "Central African Republic", "Chad", "Comoros", "Congo, Democratic Republic of the",
    "Congo, Republic of the", "Cote d'Ivoire", "Djibouti", "Egypt", "Equatorial Guinea",
    "Eritrea", "Eswatini", "Ethiopia", "Gabon", "Gambia", "Ghana", "Guinea", "Guinea-Bissau",
    "Kenya", "Lesotho", "Liberia", "Libya", "Madagascar", "Malawi", "Mali", "Mauritania",
    "Mauritius", "Morocco", "Mozambique", "Namibia", "Niger", "Nigeria", "Rwanda",
    "Sao Tome and Principe", "Senegal", "Seychelles", "Sierra Leone", "Somalia", "South Africa",
    "South Sudan", "Sudan", "Tanzania", "Togo", "Tunisia", "Uganda", "Zambia", "Zimbabwe"
  ],
  asia: [
    "Afghanistan", "Armenia", "Azerbaijan", "Bahrain", "Bangladesh", "Bhutan", "Brunei",
    "Cambodia", "China", "Cyprus", "Georgia", "India", "Indonesia", "Iran", "Iraq", "Israel",
    "Japan", "Jordan", "Kazakhstan", "Kuwait", "Kyrgyzstan", "Laos", "Lebanon", "Malaysia",
    "Maldives", "Mongolia", "Myanmar", "Nepal", "North Korea", "Oman", "Pakistan", "Palestine",
    "Philippines", "Qatar", "Russia", "Saudi Arabia", "Singapore", "South Korea", "Sri Lanka",
    "Syria", "Taiwan", "Tajikistan", "Thailand", "Timor-Leste", "Turkey", "Turkmenistan",
    "United Arab Emirates", "Uzbekistan", "Vietnam", "Yemen"
  ],
  'north america': [
    "Antigua and Barbuda", "Bahamas", "Barbados", "Belize", "Canada", "Costa Rica", "Cuba",
    "Dominica", "Dominican Republic", "El Salvador", "Grenada", "Guatemala", "Haiti",
    "Honduras", "Jamaica", "Mexico", "Nicaragua", "Panama", "Saint Kitts and Nevis",
    "Saint Lucia", "Saint Vincent and the Grenadines", "Trinidad and Tobago", "United States"
  ],
  'south america': [
    "Argentina", "Bolivia", "Brazil", "Chile", "Colombia", "Ecuador", "Guyana", "Paraguay",
    "Peru", "Suriname", "Uruguay", "Venezuela"
  ],
  oceania: [
    "Australia", "Fiji", "Kiribati", "Marshall Islands", "Micronesia", "Nauru", "New Zealand",
    "Palau", "Papua New Guinea", "Samoa", "Solomon Islands", "Tonga", "Tuvalu", "Vanuatu"
  ]
};
// --- END: Continent to Country Mapping ---


// Define the structure of the transformed recipe object
type TransformedRecipe = {
  id: string;
  title: string;
  description?: string;
  cookingTime?: number;
  servings?: number;
  difficulty?: string;
  cuisineType?: string; // Name of the cuisine
  cuisineId?: string; // ID of the cuisine
  regions?: { id: string; name: string; type: string | null; continent: string | null }[]; // Allow null for type
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  authorId?: string | null;
  author?: {
    id: string;
    name?: string;
    email?: string;
    image?: string;
  };
  ingredients: {
    id: string;
    name: string;
    amount: number;
    unit: string;
    notes?: string | null;
    recipeId: string;
    isFermented?: boolean; // Assuming this might exist on ingredient level too
  }[];
  instructions: Instruction[];
  type?: string; // Consider using specific MealType enum if defined
  tags: string[];
  isVegetarian: boolean;
  isVegan: boolean;
  isGlutenFree: boolean;
  isNutFree: boolean;
  isLowFodmap: boolean;
  isLactoseFree: boolean;
  isPescatarian: boolean;
  isFermented: boolean; // Top-level flag
  calories?: number;
  nutritionFacts?: NutritionFacts | null;
};


type RecipeParams = {
  dietTypes: string[];
  selectedRegions: string[];
  excludedFoods: string[];
  allowPartialMatch: boolean;
  searchInput?: string;
};

// Correct DbRecipe type to use 'cuisine' and include 'regions'
type DbRecipe = Prisma.RecipeGetPayload<{
    include: {
        ingredients: true;
        instructions: true;
        nutritionFacts: true;
        categories: true; // Assuming categories relation exists
        cuisine: true; // Singular cuisine
        author: true;
        regions: true; // Include the regions relation
    };
}>;

async function getRandomRecipesFromDB(
  params: RecipeParams,
  userId?: string,
): Promise<TransformedRecipe[]> {
  console.log('[Generate Fn Start] Starting recipe generation with params:', {
    dietTypes: params.dietTypes?.length || 0,
    selectedRegions: params.selectedRegions?.length || 0,
    excludedFoods: params.excludedFoods?.length || 0,
    searchInputProvided: !!params.searchInput,
    userId: userId || 'anonymous',
    timestamp: new Date().toISOString()
  });

  const conditions: Prisma.RecipeWhereInput[] = [];

  // --- Search Input Filter ---
  if (params.searchInput) {
    const searchTerm = params.searchInput.toLowerCase();
    console.log(`[Filter] Adding search term condition for: "${searchTerm}"`);
    conditions.push({
      OR: [
        { title: { contains: searchTerm, mode: 'insensitive' } },
        { description: { contains: searchTerm, mode: 'insensitive' } },
        { ingredients: { some: { name: { contains: searchTerm, mode: 'insensitive' } } } }
      ]
    });
  }

  // --- Diet Type Filter ---
  if (params.dietTypes?.length > 0) {
    const dietConditions: Prisma.RecipeWhereInput[] = [];
    console.log(`[Filter] Adding dietary conditions for: ${params.dietTypes.join(', ')}`);
    params.dietTypes.forEach(diet => {
      const normalizedDiet = diet.toLowerCase();
      switch (normalizedDiet) {
        case 'vegetarian': dietConditions.push({ isVegetarian: true }); break;
        case 'vegan': dietConditions.push({ isVegan: true }); break;
        case 'gluten-free': dietConditions.push({ isGlutenFree: true }); break;
        // Assuming isLactoseFree maps to dairy-free in your data
        case 'dairy-free': dietConditions.push({ isLactoseFree: true }); break;
        case 'lactose-free': dietConditions.push({ isLactoseFree: true }); break;
        case 'nut-free': dietConditions.push({ isNutFree: true }); break;
        // Fermented check might need refinement based on how it's stored
        case 'fermented': dietConditions.push({ OR: [{ isFermented: true }/*, { ingredients: { some: { isFermented: true } } }] */]}); break;
        case 'low-fodmap': dietConditions.push({ isLowFodmap: true }); break;
        case 'pescatarian': dietConditions.push({ isPescatarian: true }); break;
      }
    });
    if (dietConditions.length > 0) {
      conditions.push({ AND: dietConditions });
    }
  }

  // --- Region Filtering (Using 'regions' relation) ---
  if (params.selectedRegions?.length > 0) {
    const targetCountries: string[] = [];
    console.log(`[Filter] Processing selected regions: ${params.selectedRegions.join(', ')}`);

    params.selectedRegions.forEach(regionInput => {
      const regionLower = regionInput.toLowerCase();
      const countries = REGION_MAP[regionLower];

      if (countries) {
        console.log(`[Filter] Mapping region "${regionInput}" to countries: ${countries.length} found.`);
        targetCountries.push(...countries);
      } else {
         // If input could be a country name directly
         console.log(`[Filter] Assuming "${regionInput}" is a country/specific region name.`);
         targetCountries.push(regionInput); // Add directly if not found in map
        // console.warn(`[Filter] Region "${regionInput}" not found in REGION_MAP. Assuming it's a country name.`);
      }
    });

    if (targetCountries.length > 0) {
      const uniqueTargetCountries = Array.from(new Set(targetCountries));
      console.log(`[Filter] Adding regions filter for countries/regions: ${uniqueTargetCountries.join(', ')}`);
      // Filter recipes that have *at least one* region matching the names
      conditions.push({
        regions: {
          some: {
            name: {
              in: uniqueTargetCountries,
              mode: 'insensitive'
            }
          }
        }
      });
    } else {
        console.warn(`[Filter] No target countries/regions identified for selected regions: ${params.selectedRegions.join(', ')}. Region filter not applied.`);
    }
  }
  // --- END: Region Filtering ---


  const baseWhereClause: Prisma.RecipeWhereInput = {
    AND: conditions.length > 0 ? conditions : undefined
  };

  try {
    const initialFetchLimit = 100; // Fetch a larger pool initially
    console.log(`[DB Query] Fetching up to ${initialFetchLimit} recipes with base filters: ${JSON.stringify(baseWhereClause)}`);

    // Ensure include uses 'cuisine' (singular) and includes 'regions'
    let dbRecipes: DbRecipe[] = await prisma.recipe.findMany({
      where: baseWhereClause,
      include: {
        ingredients: true,
        instructions: true,
        nutritionFacts: true,
        categories: true, // Ensure this relation exists
        cuisine: true,    // Singular
        author: true,
        regions: true     // Include regions
      },
      take: initialFetchLimit,
    });

    console.log(`[DB Result] Initial fetch count (after base filters): ${dbRecipes.length}`);

    // --- Post-fetch Search Term Refinement (Optional) ---
    if (params.searchInput && dbRecipes.length > 0) {
      const searchTerm = params.searchInput.toLowerCase();
      const searchTerms = [searchTerm];
      // Add plural/singular variations if desired
      if (searchTerm.endsWith('s')) searchTerms.push(searchTerm.slice(0, -1));
      else searchTerms.push(`${searchTerm}s`);

      console.log(`[Post-Filter] Applying word boundary filter for terms: ${searchTerms.join(', ')}`);

      dbRecipes = dbRecipes.filter(recipe => {
        const titleMatch = searchTerms.some(term => new RegExp(`\\b${term}\\b`, 'i').test(recipe.title));
        const ingredientMatch = recipe.ingredients.some(ingredient => searchTerms.some(term => new RegExp(`\\b${term}\\b`, 'i').test(ingredient.name)));
        const descriptionMatch = recipe.description ? searchTerms.some(term => new RegExp(`\\b${term}\\b`, 'i').test(recipe.description || '')) : false;
        return titleMatch || ingredientMatch || descriptionMatch;
      });

      console.log(`[Post-Filter] Count after word boundary filter: ${dbRecipes.length}`);

      // Optional: Sort by relevance if search term provided
      dbRecipes = dbRecipes.sort((a, b) => {
        const getScore = (recipe: DbRecipe): number => {
          let score = 0;
          if (searchTerms.some(term => new RegExp(`\\b${term}\\b`, 'i').test(recipe.title))) score += 100;
          if (recipe.ingredients.some(i => searchTerms.some(term => new RegExp(`\\b${term}\\b`, 'i').test(i.name)))) score += 50;
          if (recipe.description && searchTerms.some(term => new RegExp(`\\b${term}\\b`, 'i').test(recipe.description || ''))) score += 25;
          return score;
        };
        return getScore(b) - getScore(a);
      });
      console.log(`[Post-Filter] Recipes sorted by search relevance.`);
    }

    // --- Excluded Foods Filter ---
    if (params.excludedFoods?.length > 0 && dbRecipes.length > 0) {
      console.log(`[Post-Filter] Applying exclusion filter for foods: ${params.excludedFoods.join(', ')}`);
      const excludedFoodLower = params.excludedFoods.map(f => f.toLowerCase());
      // Get variations for excluded foods
      const variations = excludedFoodLower.flatMap(food => FOOD_VARIATIONS[food] || [food]);
      const uniqueVariations = Array.from(new Set(variations)); // Ensure unique terms

      console.log(`[Post-Filter] All terms being excluded (incl. variations): ${uniqueVariations.join(', ')}`);

      dbRecipes = dbRecipes.filter(recipe => {
        const isExcluded = uniqueVariations.some(term => {
          // Check title, ingredients, description for the exclusion term
          const titleContainsTerm = recipe.title.toLowerCase().includes(term);
          const ingredientsContainTerm = recipe.ingredients.some(i => i.name.toLowerCase().includes(term));
          const descriptionContainsTerm = recipe.description?.toLowerCase().includes(term) || false;
          return titleContainsTerm || ingredientsContainTerm || descriptionContainsTerm;
        });
        // Keep the recipe only if it's *not* excluded
        return !isExcluded;
      });

      console.log(`[Post-Filter] Count after exclusion filter: ${dbRecipes.length}`);
    }

    // --- Final Selection ---
    if (dbRecipes.length === 0) {
      console.warn('[Result] No recipes found after all filters.');
      return []; // Return empty array if no recipes match
    }

    // Select a random subset
    const count = 8; // Number of recipes to return
    const randomSelection = dbRecipes.sort(() => 0.5 - Math.random()).slice(0, count);

    console.log(`[Result] Selected ${randomSelection.length} random recipes from ${dbRecipes.length} potential matches.`);

    // --- Transform Recipes ---
    const transformedRecipes: TransformedRecipe[] = randomSelection.map(recipe => {
      // Access cuisine safely (it's an object or null)
      const cuisine = recipe.cuisine;
      const cuisineType = cuisine?.name || undefined;
      const cuisineId = cuisine?.id || undefined;

      // Map regions to a simpler structure for the frontend if needed
      const recipeRegions = recipe.regions?.map(r => ({
        id: r.id,
        name: r.name,
        type: r.type, // Type can be RegionType or potentially null based on TS inference
        continent: r.continent
      })) || [];

      // Map author safely
      const author = recipe.author ? {
        id: recipe.author.id,
        name: recipe.author.name || undefined,
        email: recipe.author.email || undefined,
        image: recipe.author.image || undefined,
      } : undefined;

      // Calculate approximate calories if nutrition facts exist
      const calories = recipe.nutritionFacts ? Math.round(
          (recipe.nutritionFacts.protein || 0) * 4 +
          (recipe.nutritionFacts.carbs || 0) * 4 +
          (recipe.nutritionFacts.fat || 0) * 9
      ) : undefined;

      // Map ingredients, ensuring notes are handled
      const ingredients = recipe.ingredients.map(i => ({
         ...i,
         notes: i.notes || null, // Ensure notes is null if undefined
         isFermented: i.isFermented ?? false // Assuming isFermented might be on Ingredient model
      }));

      // Return the transformed recipe structure
      return {
        id: recipe.id,
        title: recipe.title,
        description: recipe.description || undefined,
        cookingTime: recipe.cookingTime || undefined,
        servings: recipe.servings || undefined,
        difficulty: recipe.difficulty || undefined,
        cuisineType, // Use derived cuisine name
        cuisineId,   // Use derived cuisine ID
        regions: recipeRegions, // Use mapped regions array
        imageUrl: recipe.imageUrl || undefined,
        createdAt: recipe.createdAt,
        updatedAt: recipe.updatedAt,
        authorId: recipe.authorId,
        author: author,
        ingredients: ingredients, // Use mapped ingredients
        instructions: recipe.instructions, // Assuming Instruction type matches
        type: recipe.type || undefined, // Use recipe's type field if it exists
        tags: [], // Assuming tags are handled differently or not included here
        isVegetarian: recipe.isVegetarian ?? false,
        isVegan: recipe.isVegan ?? false,
        isGlutenFree: recipe.isGlutenFree ?? false,
        isNutFree: recipe.isNutFree ?? false,
        isLowFodmap: recipe.isLowFodmap ?? false,
        isLactoseFree: recipe.isLactoseFree ?? false,
        isPescatarian: recipe.isPescatarian ?? false,
        isFermented: recipe.isFermented ?? false, // Top-level flag
        calories: calories,
        nutritionFacts: recipe.nutritionFacts || null, // Ensure null if undefined
      };
    });

    console.log(`[Generate Fn Result] Returning ${transformedRecipes.length} transformed recipes.`);
    return transformedRecipes;

  } catch (error: unknown) {
    // Log detailed error for internal debugging
    console.error('[Generate Fn Error] Recipe generation failed in getRandomRecipesFromDB:', {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      query: JSON.stringify(baseWhereClause), // Log the query that might have failed
      params: params,
      timestamp: new Date().toISOString()
    });
    // Return empty array or throw error based on desired API behavior
    return []; // Gracefully return empty list on error
    // throw error; // Or re-throw if the caller should handle it
  }
}

// Main POST handler for the API route
export async function POST(request: Request) {
  const session: Session | null = await getServerSession(authOptions);
  const userId = session?.user?.id;

  console.log(`[API Start] /api/recipes/generate POST request by user: ${userId || 'anonymous'}`);

  try {
    // Validate and parse request body
    const reqBody: RecipeParams = await request.json();
    // Add validation for reqBody properties if needed

    console.log('[API Request Body]', reqBody);

    // Call the main logic function
    const recipes = await getRandomRecipesFromDB(reqBody, userId);

    // Handle case where no recipes are found
    if (!recipes || recipes.length === 0) {
      console.warn('[API Response] No recipes found matching criteria. Returning 200 OK with empty list.');
      // Optional: Add diagnostics if needed
      // const totalRecipes = await prisma.recipe.count();
      // console.log(`[API Diagnostics] Total recipes in DB: ${totalRecipes}`);
      return NextResponse.json(
        {
          recipes: [],
          success: true,
          message: 'No recipes found matching your criteria. Try adjusting your preferences.',
        },
        { status: 200 }
      );
    }

    // Return successful response
    console.log(`[API Response] Returning ${recipes.length} recipes. Success. Status 200.`);
    return NextResponse.json({
      recipes,
      success: true
    });

  } catch (error) {
    // Handle unexpected errors
    console.error('[API Error] Unhandled error in POST /api/recipes/generate:', error);
    return NextResponse.json(
      {
        error: 'Failed to generate recipes due to a server error.',
        success: false,
        // Avoid sending detailed error messages in production
        details: process.env.NODE_ENV === 'development' ? String(error) : undefined
      },
      { status: 500 }
    );
  } finally {
      console.log(`[API End] /api/recipes/generate POST request finished.`);
      // Disconnecting Prisma client might not be necessary depending on deployment strategy
      // await prisma.$disconnect();
  }
}
