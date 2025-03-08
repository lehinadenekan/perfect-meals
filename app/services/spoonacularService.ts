import { PrismaClient, Recipe, Prisma } from '@prisma/client';

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

export class SpoonacularService {
  private apiKey: string;
  private baseUrl: string = 'https://api.spoonacular.com/recipes';

  constructor() {
    this.apiKey = process.env.SPOONACULAR_API_KEY || '';
    if (!this.apiKey) {
      throw new Error('Spoonacular API key is not configured');
    }
  }

  private async fetchFromApi(endpoint: string, params: Record<string, string> = {}): Promise<any> {
    const queryParams = new URLSearchParams({
      ...params,
      apiKey: this.apiKey,
    });

    const response = await fetch(`${this.baseUrl}${endpoint}?${queryParams}`);
    if (!response.ok) {
      throw new Error(`Spoonacular API error: ${response.statusText}`);
    }

    return response.json();
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

  private async transformToRecipe(spoonacularRecipe: SpoonacularRecipe): Promise<Prisma.RecipeCreateInput> {
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

    // Extract nutrition facts
    const getNutrientValue = (name: string) => {
      const nutrient = spoonacularRecipe.nutrition.nutrients.find(n => n.name.toLowerCase() === name.toLowerCase());
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
      imageUrl: spoonacularRecipe.image,
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
      totalReviews: 0,
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
    number?: number;
    tags?: string[];
  } = {}): Promise<Recipe[]> {
    const searchParams: Record<string, string> = {
      number: String(params.number || 10),
      addRecipeInformation: 'true',
      addRecipeNutrition: 'true',
    };

    if (params.tags && params.tags.length > 0) {
      searchParams.tags = params.tags.join(',');
    }

    const response = await this.fetchFromApi('/random', searchParams);
    const recipes: Recipe[] = [];

    for (const result of response.recipes) {
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
}

export default new SpoonacularService(); 