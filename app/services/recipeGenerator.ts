import { PrismaClient, Cuisine, Recipe } from '@prisma/client';
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

interface RecipeIngredient {
  name: string;
  amount: number;
  unit: string;
  notes?: string;
}

interface RecipeInstruction {
  stepNumber: number;
  description: string;
}

interface GeneratedRecipeData {
  title: string;
  description: string;
  cookingTime: number;
  servings: number;
  difficulty: string;
  ingredients: RecipeIngredient[];
  instructions: string[];
  cookingMethods: string[];
  spiceLevel: string;
  tips: string[];
}

export class RecipeGenerator {
  private async getCuisineDetails(cuisineId: string) {
    const cuisine = await prisma.cuisine.findUnique({
      where: { id: cuisineId },
      include: {
        subCuisines: true,
        parentCuisine: true
      }
    });
    return cuisine;
  }

  private async buildPrompt(cuisine: Cuisine, params: RecipeGenerationParams): Promise<string> {
    let prompt = `Create a ${params.difficulty || cuisine.difficultyLevel} recipe that authentically represents ${cuisine.name} cuisine.\n\n`;
    
    // Add cuisine context
    prompt += `Cultural Context: ${cuisine.culturalContext}\n\n`;
    
    // Add ingredient guidance
    prompt += `Use these traditional ingredients:\n`;
    prompt += `Common ingredients: ${cuisine.commonIngredients.join(', ')}\n`;
    prompt += `Spice profile: ${cuisine.spiceProfile.join(', ')}\n\n`;
    
    // Add cooking method guidance
    prompt += `Utilize these traditional cooking methods: ${cuisine.cookingMethods.join(', ')}\n\n`;
    
    // Add dietary considerations
    if (params.dietaryPreferences?.length) {
      prompt += `Make this recipe suitable for these dietary preferences: ${params.dietaryPreferences.join(', ')}\n`;
      prompt += `Consider these cuisine-specific dietary patterns: ${cuisine.dietaryConsiderations.join(', ')}\n\n`;
    }

    // Add meal type context
    if (params.mealType) {
      prompt += `This should be a ${params.mealType} dish. Common ${cuisine.name} ${params.mealType}s include: ${
        cuisine.mealTypes.filter(type => type.toLowerCase().includes(params.mealType!.toLowerCase())).join(', ')
      }\n\n`;
    }

    // Add fusion guidance if needed
    if (params.isFusion && params.fusionCuisineIds?.length) {
      const fusionCuisines = await Promise.all(
        params.fusionCuisineIds.map(id => this.getCuisineDetails(id))
      );
      
      prompt += `Create a fusion recipe that combines elements of ${cuisine.name} cuisine with:\n`;
      for (const fusionCuisine of fusionCuisines) {
        if (!fusionCuisine) continue;
        prompt += `- ${fusionCuisine.name} cuisine (using: ${fusionCuisine.commonIngredients.slice(0, 3).join(', ')})\n`;
      }
      prompt += '\nEnsure the fusion is harmonious and respects both culinary traditions.\n';
    }

    // Add spice level guidance
    if (params.spiceLevel) {
      prompt += `Adjust spice level to ${params.spiceLevel}, considering the traditional spice profile.\n\n`;
    }

    prompt += `\nProvide the recipe in the following JSON format:
    {
      "title": "Recipe Name",
      "description": "Brief description including cultural context",
      "cookingTime": number (in minutes),
      "servings": number,
      "difficulty": "EASY/MEDIUM/HARD",
      "ingredients": [
        { "name": "ingredient", "amount": number, "unit": "unit", "notes": "optional notes" }
      ],
      "instructions": ["step 1", "step 2", ...],
      "cookingMethods": ["method1", "method2"],
      "spiceLevel": "MILD/MEDIUM/HOT",
      "tips": ["cultural or technique tips"]
    }`;

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
          content: "You are a master chef with deep knowledge of global cuisines. Generate authentic recipes that respect cultural traditions while accommodating modern dietary needs."
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
    
    const recipeData = JSON.parse(content) as GeneratedRecipeData;

    // Create recipe in database
    const recipe = await prisma.recipe.create({
      data: {
        title: recipeData.title,
        description: recipeData.description,
        cookingTime: recipeData.cookingTime,
        servings: params.servings || recipeData.servings,
        difficulty: params.difficulty || recipeData.difficulty,
        cuisineType: cuisine.name,
        cuisine: {
          connect: { id: params.cuisineId }
        },
        cookingMethods: recipeData.cookingMethods,
        spiceLevel: recipeData.spiceLevel,
        authenticity: params.isFusion ? 'FUSION' : 'TRADITIONAL',
        ingredients: {
          create: recipeData.ingredients.map((ing: RecipeIngredient) => ({
            name: ing.name,
            amount: ing.amount,
            unit: ing.unit,
            notes: ing.notes
          }))
        },
        instructions: {
          create: recipeData.instructions.map((inst: string, index: number) => ({
            stepNumber: index + 1,
            description: inst
          }))
        },
        author: {
          connect: { id: 'system' }
        }
      }
    });

    return recipe;
  }
}

export default new RecipeGenerator(); 