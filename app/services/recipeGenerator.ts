import { PrismaClient, Cuisine, Recipe, Prisma } from '@prisma/client';
import OpenAI from 'openai';

const prisma = new PrismaClient();
const openai = new OpenAI();

interface RecipeGenerationParams {
  cuisineId: string;
  dietaryPreferences?: string[];
  difficulty?: string;
  cookingTime?: number;
  servings?: number;
  isFusion?: boolean;
  fusionCuisineIds?: string[];
  spiceLevel?: string;
  mealType?: string;
}

interface GeneratedRecipeData {
  title: string;
  description: string;
  cookingTime: number;
  servings: number;
  difficulty: string;
  cookingMethods: string[];
  calories: number;
  ingredients: {
    name: string;
    amount: number;
    unit: string;
    notes?: string;
  }[];
  instructions: string[];
  nutritionFacts: {
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
    sugar: number;
    sodium: number;
  };
}

export class RecipeGenerator {
  private async getCuisineDetails(cuisineId: string): Promise<Cuisine | null> {
    return prisma.cuisine.findUnique({
      where: { id: cuisineId },
    });
  }

  private async buildPrompt(cuisine: Cuisine, params: RecipeGenerationParams): Promise<string> {
    const prompt = `Generate a recipe for ${cuisine.name} cuisine with the following requirements:
    
    ${params.difficulty ? `- Difficulty level: ${params.difficulty}` : ''}
    ${params.cookingTime ? `- Cooking time: around ${params.cookingTime} minutes` : ''}
    ${params.servings ? `- Servings: ${params.servings}` : ''}
    ${params.spiceLevel ? `- Spice level: ${params.spiceLevel}` : ''}
    ${params.mealType ? `- Meal type: ${params.mealType}` : ''}
    ${params.isFusion ? `- Create a fusion dish combining ${cuisine.name} with modern techniques` : '- Create a traditional dish'}
    
    The recipe should be authentic to the ${cuisine.region} region and include:
    - A descriptive title
    - A brief description
    - Cooking time in minutes
    - Number of servings
    - Difficulty level (EASY, MEDIUM, or HARD)
    - A list of cooking methods used
    - A list of ingredients with amounts and units
    - Step-by-step instructions
    - Estimated calories per serving
    - Complete nutrition facts per serving
    
    Please format the response as a JSON object with the following structure:
    {
      "title": "string",
      "description": "string",
      "cookingTime": number,
      "servings": number,
      "difficulty": "string",
      "cookingMethods": ["string"],
      "calories": number,
      "ingredients": [{"name": "string", "amount": number, "unit": "string", "notes": "string"}],
      "instructions": ["string"],
      "nutritionFacts": {
        "protein": number,
        "carbs": number,
        "fat": number,
        "fiber": number,
        "sugar": number,
        "sodium": number
      }
    }

    Make sure to include all nutritional values in the nutritionFacts object, using reasonable estimates based on the ingredients.`;

    return prompt;
  }

  public async generateRecipe(params: RecipeGenerationParams): Promise<Recipe> {
    const cuisine = await this.getCuisineDetails(params.cuisineId);
    if (!cuisine) throw new Error('Cuisine not found');

    const prompt = await this.buildPrompt(cuisine, params);

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a master chef and nutritionist with deep knowledge of global cuisines. Generate authentic recipes that respect cultural traditions while accommodating modern dietary needs. Always include complete nutritional information."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) throw new Error('Failed to generate recipe');
    
    let recipeData: GeneratedRecipeData;
    try {
      const parsedData = JSON.parse(content);
      
      // Ensure nutritionFacts exists with default values if missing
      if (!parsedData.nutritionFacts) {
        parsedData.nutritionFacts = {
          protein: 0,
          carbs: 0,
          fat: 0,
          fiber: 0,
          sugar: 0,
          sodium: 0
        };
      }

      // Ensure all required nutritionFacts fields exist
      const requiredFields = ['protein', 'carbs', 'fat', 'fiber', 'sugar', 'sodium'];
      for (const field of requiredFields) {
        if (typeof parsedData.nutritionFacts[field] !== 'number') {
          parsedData.nutritionFacts[field] = 0;
        }
      }

      // Ensure calories exists
      if (typeof parsedData.calories !== 'number') {
        // Estimate calories from macronutrients if missing
        parsedData.calories = Math.round(
          (parsedData.nutritionFacts.protein * 4) +
          (parsedData.nutritionFacts.carbs * 4) +
          (parsedData.nutritionFacts.fat * 9)
        );
      }

      recipeData = parsedData as GeneratedRecipeData;
    } catch (error) {
      console.error('Failed to parse recipe data:', error);
      throw new Error('Failed to parse recipe data from OpenAI response');
    }

    // Create recipe in database
    const recipe = await prisma.recipe.create({
      data: {
        title: recipeData.title,
        description: recipeData.description,
        cookingTime: recipeData.cookingTime,
        servings: params.servings || recipeData.servings,
        difficulty: params.difficulty || recipeData.difficulty,
        cuisineType: cuisine.name,
        type: params.mealType || 'DINNER',
        regionOfOrigin: cuisine.region,
        cuisine: {
          connect: {
            id: params.cuisineId
          }
        },
        cookingMethods: recipeData.cookingMethods,
        spiceLevel: params.spiceLevel || 'MEDIUM',
        authenticity: 'TRADITIONAL',
        calories: recipeData.calories,
        isVegetarian: params.dietaryPreferences?.includes('vegetarian') || false,
        isVegan: params.dietaryPreferences?.includes('vegan') || false,
        isGlutenFree: params.dietaryPreferences?.includes('gluten-free') || false,
        isDairyFree: params.dietaryPreferences?.includes('dairy-free') || false,
        isNutFree: !recipeData.ingredients.some(ing => ing.name.toLowerCase().includes('nut')),
        author: {
          connect: {
            id: 'system'
          }
        },
        ingredients: {
          create: recipeData.ingredients.map((ing) => ({
            name: ing.name,
            amount: ing.amount,
            unit: ing.unit,
            notes: ing.notes
          }))
        },
        instructions: {
          create: recipeData.instructions.map((inst, index) => ({
            stepNumber: index + 1,
            description: inst
          }))
        },
        nutritionFacts: {
          create: {
            protein: recipeData.nutritionFacts.protein,
            carbs: recipeData.nutritionFacts.carbs,
            fat: recipeData.nutritionFacts.fat,
            fiber: recipeData.nutritionFacts.fiber,
            sugar: recipeData.nutritionFacts.sugar,
            sodium: recipeData.nutritionFacts.sodium
          }
        }
      } as Prisma.RecipeCreateInput,
      include: {
        ingredients: true,
        instructions: true,
        nutritionFacts: true
      }
    });

    return recipe;
  }
}

export default new RecipeGenerator(); 