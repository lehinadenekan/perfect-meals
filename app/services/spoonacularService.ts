import { PrismaClient, Recipe, Prisma } from '@prisma/client';
import imageService from './imageService';

const prisma = new PrismaClient();

interface SpoonacularRecipe {
  id: number;
  title: string;
  summary: string;
  readyInMinutes: number;
  servings: number;
  image: string;
  imageType: string;
  cuisines: string[];
  dishTypes: string[];
  diets: string[];
  occasions: string[];
  instructions: string;
  analyzedInstructions: {
    name: string;
    steps: {
      number: number;
      step: string;
      ingredients: { id: number; name: string; }[];
      equipment: { id: number; name: string; }[];
    }[];
  }[];
  extendedIngredients: {
    id: number;
    name: string;
    amount: number;
    unit: string;
    originalString: string;
  }[];
  nutrition: {
    nutrients: {
      name: string;
      amount: number;
      unit: string;
    }[];
  };
}

interface SpoonacularNutrient {
  name: string;
  amount: number;
  unit: string;
}

interface DietMapping {
  diet?: string;
  tags?: string;
  intolerances?: string[];
}

export class SpoonacularService {
  private apiKey: string;
  private baseUrl: string = 'https://api.spoonacular.com/recipes';

  // Map our dietary preferences to Spoonacular's format
  private readonly DIET_MAPPING: Record<string, DietMapping> = {
    'gluten-free': { diet: 'gluten free' },
    'vegetarian': { diet: 'vegetarian' },
    'vegan': { diet: 'vegan' },
    'keto': { diet: 'ketogenic' },
    'paleo': { diet: 'paleo' },
    'halal': { tags: 'halal' },
    'kosher': { tags: 'kosher' },
    'alkaline': { tags: 'alkaline' }
  };

  constructor() {
    this.apiKey = process.env.SPOONACULAR_API_KEY || '';
    if (!this.apiKey) {
      throw new Error('Spoonacular API key is not configured');
    }
  }

  private mapPreferencesToApiParams(preferences: string[]): { diet?: string; tags?: string[]; intolerances?: string[] } {
    const result = {
      diet: undefined as string | undefined,
      tags: [] as string[],
      intolerances: [] as string[]
    };

    preferences.forEach(pref => {
      const mapping = this.DIET_MAPPING[pref as keyof typeof this.DIET_MAPPING];
      if (mapping) {
        if (mapping.diet) {
          result.diet = mapping.diet;
        }
        if (mapping.tags) {
          result.tags.push(mapping.tags);
        }
        if (mapping.intolerances) {
          result.intolerances.push(...mapping.intolerances);
        }
      }
    });

    return result;
  }

  private async fetchFromApi(endpoint: string, params: Record<string, string> = {}): Promise<any> {
    // Always add a timestamp parameter to prevent caching
    const timestamp = Date.now();
    const randomSalt = Math.floor(Math.random() * 10000);
    
    const queryParams = new URLSearchParams({
      ...params,
      apiKey: this.apiKey,
      _: `${timestamp}-${randomSalt}`, // Cache-busting parameter
    });

    const url = `${this.baseUrl}${endpoint}?${queryParams}`;
    console.log(`Fetching from Spoonacular API: ${endpoint}`);

    try {
      // Add retry logic (try up to 3 times)
      let response;
      let retries = 0;
      const maxRetries = 3;
      
      while (retries < maxRetries) {
        try {
          response = await fetch(url, { 
            cache: 'no-store',  // Ensure we never use cached responses
            headers: { 'Accept': 'application/json' }
          });
          
          if (response.ok) break;
          
          // If rate limited (status 429), wait and retry
          if (response.status === 429) {
            retries++;
            console.log(`Rate limited, retry ${retries}/${maxRetries}`);
            await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2s before retry
            continue;
          }
          
          // For other errors, don't retry
          break;
        } catch (e) {
          retries++;
          if (retries >= maxRetries) throw e;
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }
      
      if (!response || !response.ok) {
        const errorText = response ? await response.text() : 'No response';
        console.error(`Spoonacular API error: ${response?.status} ${response?.statusText} - ${errorText}`);
        throw new Error(`Spoonacular API error: ${response?.statusText || 'Failed to fetch'} (${response?.status || 'unknown status'})`);
      }

      const data = await response.json();
      return data;
    } catch (error: any) {
      console.error(`Error fetching from Spoonacular API: ${error.message || error}`);
      throw error;
    }
  }

  private mapDifficultyLevel(readyInMinutes: number): 'EASY' | 'MEDIUM' | 'HARD' {
    if (readyInMinutes <= 30) return 'EASY';
    if (readyInMinutes <= 60) return 'MEDIUM';
    return 'HARD';
  }

  private mapMealType(dishTypes: string[]): 'BREAKFAST' | 'LUNCH' | 'DINNER' | 'SNACK' {
    if (dishTypes.includes('breakfast')) return 'BREAKFAST';
    if (dishTypes.includes('lunch')) return 'LUNCH';
    if (dishTypes.includes('main course')) return 'DINNER';
    if (dishTypes.includes('snack')) return 'SNACK';
    return 'DINNER'; // default
  }

  private async ensureSystemUserExists(): Promise<void> {
    const systemUser = await prisma.user.findUnique({
      where: { id: 'system' }
    });

    if (!systemUser) {
      await prisma.user.create({
        data: {
          id: 'system',
          name: 'System',
          email: 'system@example.com',
          emailVerified: new Date(),
        }
      });
    }
  }

  private async transformToRecipe(spoonacularRecipe: SpoonacularRecipe): Promise<Prisma.RecipeCreateInput> {
    // Ensure system user exists
    await this.ensureSystemUserExists();

    // Find or create cuisine
    const cuisineName = spoonacularRecipe.cuisines[0] || 'International';
    let cuisine = await prisma.cuisine.findFirst({
      where: { name: cuisineName },
    });

    if (!cuisine) {
      const difficulty = this.mapDifficultyLevel(spoonacularRecipe.readyInMinutes);
      cuisine = await prisma.cuisine.create({
        data: {
          name: cuisineName,
          region: cuisineName,
          difficultyLevel: difficulty,
          averagePreparationTime: spoonacularRecipe.readyInMinutes,
          commonIngredients: [],
          cookingMethods: [],
          spiceProfile: [],
          dietaryConsiderations: [],
          mealTypes: [],
        } as Prisma.CuisineCreateInput,
      });
    }

    // Download and store the image locally
    let imageUrl = '/placeholder-recipe.jpg';
    if (spoonacularRecipe.image) {
      const localImageUrl = await imageService.downloadAndStoreImage(spoonacularRecipe.image);
      if (localImageUrl) {
        imageUrl = localImageUrl;
      }
    }

    // Extract nutrition facts
    const getNutrientValue = (name: string) => {
      if (!spoonacularRecipe.nutrition?.nutrients) {
        return 0;
      }
      const nutrient = spoonacularRecipe.nutrition.nutrients.find((n: SpoonacularNutrient) => n.name.toLowerCase() === name.toLowerCase());
      return nutrient ? nutrient.amount : 0;
    };

    const difficulty = this.mapDifficultyLevel(spoonacularRecipe.readyInMinutes);
    const type = this.mapMealType(spoonacularRecipe.dishTypes);

    // Map to our Recipe model
    return {
      title: spoonacularRecipe.title,
      description: spoonacularRecipe.summary,
      cookingTime: spoonacularRecipe.readyInMinutes,
      servings: spoonacularRecipe.servings,
      difficulty,
      cuisineType: cuisineName,
      type,
      regionOfOrigin: cuisineName,
      cuisine: {
        connect: {
          id: cuisine.id
        }
      },
      imageUrl: imageUrl,
      calories: Math.round(getNutrientValue('Calories')),
      isVegetarian: spoonacularRecipe.diets.includes('vegetarian'),
      isVegan: spoonacularRecipe.diets.includes('vegan'),
      isGlutenFree: spoonacularRecipe.diets.includes('gluten free'),
      isDairyFree: spoonacularRecipe.diets.includes('dairy free'),
      isNutFree: !spoonacularRecipe.extendedIngredients.some(i => i.name.toLowerCase().includes('nut')),
      author: {
        connect: {
          id: 'system'
        }
      },
      cookingMethods: [],
      spiceLevel: 'MEDIUM',
      authenticity: 'TRADITIONAL',
      ingredients: {
        create: spoonacularRecipe.extendedIngredients.map(ing => ({
          name: ing.name,
          amount: ing.amount,
          unit: ing.unit,
          notes: ing.originalString,
        })),
      },
      instructions: {
        create: spoonacularRecipe.analyzedInstructions[0]?.steps.map(step => ({
          stepNumber: step.number,
          description: step.step,
        })) || [],
      },
      nutritionFacts: {
        create: {
          protein: getNutrientValue('Protein'),
          carbs: getNutrientValue('Carbohydrates'),
          fat: getNutrientValue('Fat'),
          fiber: getNutrientValue('Fiber'),
          sugar: getNutrientValue('Sugar'),
          sodium: getNutrientValue('Sodium'),
        },
      },
    } as Prisma.RecipeCreateInput;
  }

  public async searchRecipes(params: {
    query?: string;
    cuisine?: string;
    diet?: string;
    intolerances?: string;
    type?: string;
    maxReadyTime?: number;
    number?: number;
  }): Promise<Recipe[]> {
    const searchParams: Record<string, string> = {
      addRecipeInformation: 'true',
      addRecipeNutrition: 'true',
      number: String(params.number || 10),
    };

    if (params.query) searchParams.query = params.query;
    if (params.cuisine) searchParams.cuisine = params.cuisine;
    if (params.diet) searchParams.diet = params.diet;
    if (params.intolerances) searchParams.intolerances = params.intolerances;
    if (params.type) searchParams.type = params.type;
    if (params.maxReadyTime) searchParams.maxReadyTime = String(params.maxReadyTime);

    const response = await this.fetchFromApi('/complexSearch', searchParams);
    const recipes: Recipe[] = [];

    for (const result of response.results) {
      const recipeData = await this.transformToRecipe(result);
      const recipe = await prisma.recipe.create({
        data: recipeData,
        include: {
          ingredients: true,
          instructions: true,
          nutritionFacts: true,
        },
      });
      recipes.push(recipe);
    }

    return recipes;
  }

  public async getRandomRecipes(params: {
    preferences?: string[];
    number?: number;
    forceRefresh?: boolean;
  } = {}): Promise<Recipe[]> {
    try {
      console.log('Getting random recipes with params:', JSON.stringify(params));
      
      // Map preferences to Spoonacular parameters
      const mappedPreferences = params.preferences ? this.mapPreferencesToApiParams(params.preferences) : {};
      
      // Generate unique cache-busting parameters
      const timestamp = Date.now();
      const randomOffset = Math.floor(Math.random() * 1000);
      const uniqueId = `${timestamp}-${randomOffset}-${Math.random().toString(36).substring(7)}`;
      
      const searchParams: Record<string, string> = {
        number: String(params.number || 10),
        addRecipeInformation: 'true',
        addRecipeNutrition: 'true',
        limitLicense: 'false',
        instructionsRequired: 'true',
        fillIngredients: 'true',
        // Add multiple cache-busting parameters
        _: uniqueId,
        offset: String(randomOffset),
        random: 'true'
      };

      // Add mapped preferences to search params
      if (mappedPreferences.diet) {
        searchParams.diet = mappedPreferences.diet;
      }
      if (mappedPreferences.tags && mappedPreferences.tags.length > 0) {
        searchParams.tags = mappedPreferences.tags.join(',');
      }
      if (mappedPreferences.intolerances && mappedPreferences.intolerances.length > 0) {
        searchParams.intolerances = mappedPreferences.intolerances.join(',');
      }

      console.log('Calling random endpoint with params:', JSON.stringify(searchParams));
      
      // Try the random endpoint first
      let response = await this.fetchFromApi('/random', searchParams);
      
      // If no results, try complex search as fallback
      if (!response.recipes || response.recipes.length === 0) {
        console.log('No recipes from random endpoint, trying complex search...');
        response = await this.fetchFromApi('/complexSearch', {
          ...searchParams,
          sort: 'random',
          number: String(Math.min((params.number || 10) * 2, 100)) // Request more recipes to increase chances of finding matches
        });
        
        // Transform complex search results to match random endpoint format
        if (response.results) {
          const detailedRecipes = await Promise.all(
            response.results.map((result: any) =>
              this.fetchFromApi(`/${result.id}/information`, {
                addRecipeNutrition: 'true',
                _: uniqueId
              })
            )
          );
          response.recipes = detailedRecipes;
        }
      }

      if (!response.recipes || response.recipes.length === 0) {
        console.warn('No recipes found even after fallback');
        return [];
      }

      console.log(`Found ${response.recipes.length} recipes`);
      
      // Transform and return the recipes
      const recipes = await Promise.all(
        response.recipes.map(async (recipe: SpoonacularRecipe) => {
          try {
            const recipeData = await this.transformToRecipe(recipe);
            return await prisma.recipe.create({
              data: recipeData,
              include: {
                ingredients: true,
                instructions: true,
                nutritionFacts: true,
              },
            });
          } catch (error) {
            console.error(`Error transforming recipe ${recipe.title}:`, error);
            return null;
          }
        })
      );

      // Filter out any null results from failed transformations
      return recipes.filter((recipe): recipe is Recipe => recipe !== null);

    } catch (error) {
      console.error('Error fetching random recipes:', error);
      return [];
    }
  }

  // Get random recipes directly from Spoonacular without saving to database
  public async getRandomRecipesRaw(params: {
    number?: number;
    tags?: string[];
    diet?: string;
    cuisine?: string;
    intolerances?: string;
  } = {}): Promise<any[]> {
    try {
      console.log('Getting raw random recipes with params:', JSON.stringify(params));
      
      // Generate unique cache-busting parameters
      const timestamp = Date.now();
      const randomOffset = Math.floor(Math.random() * 1000);
      const uniqueId = `${timestamp}-${randomOffset}-${Math.random().toString(36).substring(7)}`;
      
      const searchParams: Record<string, string> = {
        number: String(params.number || 10),
        addRecipeInformation: 'true',
        addRecipeNutrition: 'true',
        limitLicense: 'false',
        // Add multiple cache-busting parameters
        _: uniqueId,
        offset: String(randomOffset),
        random: 'true'
      };

      if (params.tags && params.tags.length > 0) {
        searchParams.tags = params.tags.join(',');
      }
      if (params.diet) {
        searchParams.diet = params.diet;
      }
      if (params.cuisine) {
        searchParams.cuisine = params.cuisine;
      }
      if (params.intolerances) {
        searchParams.intolerances = params.intolerances;
      }

      console.log('Calling random endpoint for raw recipes with params:', JSON.stringify(searchParams));
      
      // Use the random endpoint
      const response = await this.fetchFromApi('/random', searchParams);
      console.log(`Random endpoint returned ${response.recipes?.length || 0} raw recipes`);
      
      // Return raw recipes from API without storing in DB
      if (!response.recipes || response.recipes.length === 0) {
        console.warn('No raw recipes returned from Spoonacular API');
        return [];
      }
      
      // Transform the recipes into a more usable format but don't save to DB
      const transformedRecipes = response.recipes.map((recipe: SpoonacularRecipe) => {
        // Extract nutrition facts
        const getNutrientValue = (name: string) => {
          const nutrient = recipe.nutrition?.nutrients?.find((n: any) => n.name.toLowerCase() === name.toLowerCase());
          return nutrient ? nutrient.amount : 0;
        };

        return {
          id: recipe.id.toString(),
          title: recipe.title,
          description: recipe.summary,
          cookingTime: recipe.readyInMinutes,
          servings: recipe.servings,
          difficulty: this.mapDifficultyLevel(recipe.readyInMinutes),
          cuisineType: recipe.cuisines[0] || 'International',
          type: this.mapMealType(recipe.dishTypes),
          regionOfOrigin: recipe.cuisines[0] || 'International',
          imageUrl: recipe.image,
          calories: Math.round(getNutrientValue('Calories')),
          isVegetarian: recipe.diets.includes('vegetarian'),
          isVegan: recipe.diets.includes('vegan'),
          isGlutenFree: recipe.diets.includes('gluten free'),
          isDairyFree: recipe.diets.includes('dairy free'),
          isNutFree: !recipe.extendedIngredients.some(i => i.name.toLowerCase().includes('nut')),
          ingredients: recipe.extendedIngredients.map(ing => ({
            id: `temp-${ing.id}`,
            name: ing.name,
            amount: ing.amount,
            unit: ing.unit,
            notes: ing.originalString,
          })),
          instructions: recipe.analyzedInstructions[0]?.steps.map(step => ({
            id: `temp-${step.number}`,
            stepNumber: step.number,
            description: step.step,
          })) || [],
          nutritionFacts: {
            id: `temp-${recipe.id}`,
            protein: getNutrientValue('Protein'),
            carbs: getNutrientValue('Carbohydrates'),
            fat: getNutrientValue('Fat'),
            fiber: getNutrientValue('Fiber'),
            sugar: getNutrientValue('Sugar'),
            sodium: getNutrientValue('Sodium'),
          },
        };
      });

      return transformedRecipes;
    } catch (error) {
      console.error('Error fetching raw random recipes:', error);
      return [];
    }
  }
}

export default new SpoonacularService(); 