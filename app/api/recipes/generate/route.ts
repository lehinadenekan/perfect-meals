import { NextResponse } from 'next/server';
import { PrismaClient, Prisma, Instruction, NutritionFacts } from '@prisma/client';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import type { Session } from 'next-auth';
import { FOOD_VARIATIONS } from '@/app/config/foodVariations';

const prisma = new PrismaClient();

// --- START: Continent to Country Mapping ---
const REGION_MAP: Record<string, string[]> = {
  europe: [
    "Albania", "Andorra", "Armenia", "Austria", "Belarus", "Belgium", "Bosnia and Herzegovina",
    "Bulgaria", "Croatia", "Cyprus", "Czech Republic", "Denmark", "England", // Added England
    "Estonia", "Finland", "France", "Georgia", "Germany", "Greece", "Hungary", "Iceland",
    "Ireland", "Italy", "Kosovo", "Latvia", "Liechtenstein", "Lithuania", "Luxembourg", "Malta",
    "Moldova", "Monaco", "Montenegro", "Netherlands", "North Macedonia", "Norway", "Poland",
    "Portugal", "Romania", "Russia", "San Marino", "Serbia", "Slovakia", "Slovenia",
    "Spain", "Sweden", "Switzerland", "Turkey", "Ukraine", "United Kingdom", "Vatican City"
    // Add other countries as needed for "Europe" based on your data
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
    // Add other African countries as needed
  ],
  asia: [
    "Afghanistan", "Armenia", "Azerbaijan", "Bahrain", "Bangladesh", "Bhutan", "Brunei",
    "Cambodia", "China", "Cyprus", "Georgia", "India", "Indonesia", "Iran", "Iraq", "Israel",
    "Japan", "Jordan", "Kazakhstan", "Kuwait", "Kyrgyzstan", "Laos", "Lebanon", "Malaysia",
    "Maldives", "Mongolia", "Myanmar", "Nepal", "North Korea", "Oman", "Pakistan", "Palestine",
    "Philippines", "Qatar", "Russia", "Saudi Arabia", "Singapore", "South Korea", "Sri Lanka",
    "Syria", "Taiwan", "Tajikistan", "Thailand", "Timor-Leste", "Turkey", "Turkmenistan",
    "United Arab Emirates", "Uzbekistan", "Vietnam", "Yemen"
     // Add other Asian countries as needed
  ],
  'north america': [ // Use lowercase for keys if comparing lowercase input
    "Antigua and Barbuda", "Bahamas", "Barbados", "Belize", "Canada", "Costa Rica", "Cuba",
    "Dominica", "Dominican Republic", "El Salvador", "Grenada", "Guatemala", "Haiti",
    "Honduras", "Jamaica", "Mexico", "Nicaragua", "Panama", "Saint Kitts and Nevis",
    "Saint Lucia", "Saint Vincent and the Grenadines", "Trinidad and Tobago", "United States"
     // Add other North American countries as needed
  ],
  'south america': [
    "Argentina", "Bolivia", "Brazil", "Chile", "Colombia", "Ecuador", "Guyana", "Paraguay",
    "Peru", "Suriname", "Uruguay", "Venezuela"
     // Add other South American countries as needed
  ],
  oceania: [
    "Australia", "Fiji", "Kiribati", "Marshall Islands", "Micronesia", "Nauru", "New Zealand",
    "Palau", "Papua New Guinea", "Samoa", "Solomon Islands", "Tonga", "Tuvalu", "Vanuatu"
     // Add other Oceanian countries as needed
  ]
  // Add other continents/regions as needed by your frontend filters
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
  cuisineType?: string;
  regionOfOrigin?: string;
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
    isFermented: boolean;
  }[];
  instructions: Instruction[];
  type?: string;
  cuisineId?: string;
  tags: string[];
  isVegetarian: boolean;
  isVegan: boolean;
  isGlutenFree: boolean;
  isNutFree: boolean;
  isLowFodmap: boolean;
  isLactoseFree: boolean;
  isPescatarian: boolean;
  isFermented: boolean;
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

type DbRecipe = Prisma.RecipeGetPayload<{
    include: {
        ingredients: true;
        instructions: true;
        nutritionFacts: true;
        categories: true;
        cuisines: true;
        tags: true;
        author: true;
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

  if (params.dietTypes?.length > 0) {
    const dietConditions: Prisma.RecipeWhereInput[] = [];
    console.log(`[Filter] Adding dietary conditions for: ${params.dietTypes.join(', ')}`);
    params.dietTypes.forEach(diet => {
      const normalizedDiet = diet.toLowerCase();
      switch (normalizedDiet) {
        case 'vegetarian': dietConditions.push({ isVegetarian: true }); break;
        case 'vegan': dietConditions.push({ isVegan: true }); break;
        case 'gluten-free': dietConditions.push({ isGlutenFree: true }); break;
        case 'lactose-free': dietConditions.push({ isLactoseFree: true }); break;
        case 'nut-free': dietConditions.push({ isNutFree: true }); break;
        case 'fermented': dietConditions.push({ OR: [{ isFermented: true }, { ingredients: { some: { isFermented: true } } }] }); break;
        case 'low-fodmap': dietConditions.push({ isLowFodmap: true }); break;
        case 'pescatarian': dietConditions.push({ isPescatarian: true }); break;
      }
    });
    if (dietConditions.length > 0) {
      conditions.push({ AND: dietConditions });
    }
  }

  // --- START: Modified Region Filtering ---
  if (params.selectedRegions?.length > 0) {
    const targetCountries: string[] = [];
    console.log(`[Filter] Processing selected regions: ${params.selectedRegions.join(', ')}`);

    params.selectedRegions.forEach(regionInput => {
      const regionLower = regionInput.toLowerCase();
      const countries = REGION_MAP[regionLower]; // Look up in the map

      if (countries) {
        console.log(`[Filter] Mapping region "${regionInput}" to countries: ${countries.length} found.`);
        targetCountries.push(...countries);
      } else {
        // Optional: Handle if it's already a country or unknown region
        // For now, we assume frontend only sends mapped continents/regions
        // If it could be a country, you might add: targetCountries.push(regionInput);
        console.warn(`[Filter] Region "${regionInput}" not found in REGION_MAP. Ignoring.`);
      }
    });

    // Only add the filter if we found corresponding countries
    if (targetCountries.length > 0) {
       // Use Set to remove duplicate countries if multiple regions map to the same country
      const uniqueTargetCountries = Array.from(new Set(targetCountries));
      console.log(`[Filter] Adding regionOfOrigin condition for countries: ${uniqueTargetCountries.join(', ')}`);
      conditions.push({
        regionOfOrigin: {
          in: uniqueTargetCountries, // Filter using the mapped list of countries
          mode: 'insensitive'
        }
      });
    } else {
        console.warn(`[Filter] No target countries identified for selected regions: ${params.selectedRegions.join(', ')}. Region filter not applied.`);
    }
  }
  // --- END: Modified Region Filtering ---


  const baseWhereClause: Prisma.RecipeWhereInput = {
    AND: conditions.length > 0 ? conditions : undefined
  };

  try {
    const initialFetchLimit = 100;
    console.log(`[DB Query] Fetching up to ${initialFetchLimit} recipes with base filters: ${JSON.stringify(baseWhereClause)}`);

    let dbRecipes: DbRecipe[] = await prisma.recipe.findMany({
      where: baseWhereClause,
      include: {
        ingredients: true, instructions: true, nutritionFacts: true,
        categories: true, cuisines: true, tags: true, author: true
      },
      take: initialFetchLimit,
    });

    console.log(`[DB Result] Initial fetch count (after base filters): ${dbRecipes.length}`);

    if (params.searchInput && dbRecipes.length > 0) {
      const searchTerm = params.searchInput.toLowerCase();
      const searchTerms = [searchTerm];
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

    if (params.excludedFoods?.length > 0 && dbRecipes.length > 0) {
      console.log(`[Post-Filter] Applying excluded foods filter for: ${params.excludedFoods.join(', ')}`);

      const termsToExclude = params.excludedFoods.reduce((acc: string[], food) => {
        const foodLower = food.toLowerCase();
        const variations = FOOD_VARIATIONS[foodLower] || [];
        return [...acc, foodLower, ...variations];
      }, []);

      console.log(`[Post-Filter] All terms being excluded: ${termsToExclude.join(', ')}`);

      const initialCountBeforeExclusion = dbRecipes.length;
      dbRecipes = dbRecipes.filter(recipe => {
        const hasExcludedFood = termsToExclude.some(term => {
          const titleContainsTerm = recipe.title.toLowerCase().includes(term);
          const ingredientsContainTerm = recipe.ingredients.some(i => i.name.toLowerCase().includes(term));
          const descriptionContainsTerm = recipe.description?.toLowerCase().includes(term) || false;
          return titleContainsTerm || ingredientsContainTerm || descriptionContainsTerm;
        });
        return !hasExcludedFood;
      });

      console.log(`[Post-Filter] Count after exclusion filter: ${dbRecipes.length} (excluded ${initialCountBeforeExclusion - dbRecipes.length})`);
    }

    if (dbRecipes.length === 0) {
      console.warn('[Result] No recipes found after all filters.');
      return [];
    }

    const count = 8;
    const randomSelection = dbRecipes.sort(() => 0.5 - Math.random()).slice(0, count);

    console.log(`[Result] Selected ${randomSelection.length} random recipes from ${dbRecipes.length} potential matches.`);

    const transformedRecipes: TransformedRecipe[] = randomSelection.map(recipe => {
      const region = recipe.regionOfOrigin || undefined;
      const relevantCuisine = recipe.cuisines?.find(c => c.name);
      const cuisineType = relevantCuisine?.name || recipe.cuisines?.[0]?.name || undefined;
      const cuisineId = relevantCuisine?.id || recipe.cuisines?.[0]?.id || undefined;
      const author = recipe.author ? {
        id: recipe.author.id, name: recipe.author.name || undefined,
        email: recipe.author.email || undefined, image: recipe.author.image || undefined,
      } : undefined;
      const calories = recipe.nutritionFacts ? Math.round(
          (recipe.nutritionFacts.protein || 0) * 4 +
          (recipe.nutritionFacts.carbs || 0) * 4 +
          (recipe.nutritionFacts.fat || 0) * 9
      ) : undefined;

      return {
        id: recipe.id, title: recipe.title, description: recipe.description || undefined,
        cookingTime: recipe.cookingTime || undefined, servings: recipe.servings || undefined,
        difficulty: recipe.difficulty || undefined, cuisineType: cuisineType,
        regionOfOrigin: region, imageUrl: recipe.imageUrl || undefined,
        createdAt: recipe.createdAt, updatedAt: recipe.updatedAt, authorId: recipe.authorId,
        author: author, ingredients: recipe.ingredients.map(i => ({ ...i, notes: i.notes || null })),
        instructions: recipe.instructions, type: recipe.categories?.[0]?.name || undefined,
        cuisineId: cuisineId, tags: recipe.tags?.map(t => t.name) || [],
        isVegetarian: recipe.isVegetarian ?? false, isVegan: recipe.isVegan ?? false,
        isGlutenFree: recipe.isGlutenFree ?? false, isNutFree: recipe.isNutFree ?? false,
        isLowFodmap: recipe.isLowFodmap ?? false, isLactoseFree: recipe.isLactoseFree ?? false,
        isPescatarian: recipe.isPescatarian ?? false, isFermented: recipe.isFermented ?? false,
        calories: calories, nutritionFacts: recipe.nutritionFacts || null,
      };
    });

    console.log(`[Generate Fn Result] Returning ${transformedRecipes.length} transformed recipes.`);
    return transformedRecipes;

  } catch (error: unknown) {
    console.error('[Generate Fn Error] Recipe generation failed in getRandomRecipesFromDB:', {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      query: JSON.stringify(baseWhereClause),
      params: params,
      timestamp: new Date().toISOString()
    });
    return [];
  }
}

export async function POST(request: Request) {
  const session: Session | null = await getServerSession(authOptions);
  const userId = session?.user?.id;

  console.log(`[API Start] /api/recipes/generate POST request by user: ${userId || 'anonymous'}`);

  try {
    const reqBody: RecipeParams = await request.json();

    console.log('[API Request Body]', reqBody);

    const recipes = await getRandomRecipesFromDB(reqBody, userId);

    if (!recipes || recipes.length === 0) {
      console.warn('[API Response] No recipes found matching criteria. Returning 200 OK with empty list.');
      const totalRecipes = await prisma.recipe.count();
      console.log(`[API Diagnostics] Total recipes in DB: ${totalRecipes}`);
      if (reqBody.selectedRegions?.length > 0) {
         try {
            // Attempt to count countries matching the mapped regions
            const targetCountries = reqBody.selectedRegions.flatMap(region => REGION_MAP[region.toLowerCase()] || []);
            const uniqueTargetCountries = Array.from(new Set(targetCountries));
             if (uniqueTargetCountries.length > 0) {
                 const countryCounts = await prisma.recipe.groupBy({
                     by: ['regionOfOrigin'],
                     _count: { regionOfOrigin: true },
                     where: { regionOfOrigin: { in: uniqueTargetCountries, mode: 'insensitive' } }
                 });
                 console.log(`[API Diagnostics] Counts for target countries:`, countryCounts);
             } else {
                console.log(`[API Diagnostics] No countries mapped for selected regions: ${reqBody.selectedRegions.join(', ')}`)
             }
         } catch (regionCountError) {
             console.error("[API Diagnostics] Error fetching country counts:", regionCountError);
         }
      }

      return NextResponse.json(
        {
          recipes: [],
          success: true,
          message: 'No recipes found matching your criteria. Try adjusting your preferences.',
        },
        { status: 200 }
      );
    }

    console.log(`[API Response] Returning ${recipes.length} recipes. Success. Status 200.`);
    return NextResponse.json({
      recipes,
      success: true
    });

  } catch (error) {
    console.error('[API Error] Unhandled error in POST /api/recipes/generate:', error);
    return NextResponse.json(
      {
        error: 'Failed to generate recipes due to a server error.',
        success: false,
        details: process.env.NODE_ENV === 'development' ? String(error) : undefined
      },
      { status: 500 }
    );
  } finally {
      console.log(`[API End] /api/recipes/generate POST request finished.`);
      // await prisma.$disconnect();
  }
}