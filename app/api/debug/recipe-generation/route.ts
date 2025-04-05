import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

interface DiagnosticLog {
  timestamp: string;
  step: string;
  details: Record<string, unknown>;
}

export async function POST(request: Request) {
  const logs: DiagnosticLog[] = [];
  const startTime = new Date();

  function log(step: string, details: Record<string, unknown>) {
    logs.push({
      timestamp: new Date().toISOString(),
      step,
      details: JSON.parse(JSON.stringify(details))
    });
  }

  try {
    // Log the incoming request
    const body = await request.json();
    log('request_received', { body });

    // Build query parameters
    const where: Record<string, unknown> = {};
    if (body.dietTypes?.length > 0) {
      const dietConditions: Record<string, unknown>[] = [];
      if (body.dietTypes.includes('vegetarian')) dietConditions.push({ isVegetarian: true });
      if (body.dietTypes.includes('vegan')) dietConditions.push({ isVegan: true });
      if (body.dietTypes.includes('gluten-free')) dietConditions.push({ isGlutenFree: true });
      if (body.dietTypes.includes('dairy-free')) dietConditions.push({ isLactoseFree: true });
      if (dietConditions.length > 0) {
        where.OR = dietConditions;
      }
    }

    // Attempt to get recipes from local database
    log('fetching_recipes_start', { where });
    const recipes = await prisma.recipe.findMany({
      where,
      include: {
        ingredients: true,
        instructions: true,
        nutritionFacts: true
      },
      take: 10,
      orderBy: {
        id: 'desc'
      }
    });
    log('fetching_recipes_complete', { 
      recipeCount: recipes.length
    });

    // Log recipe info
    const recipeInfo = recipes.map(r => ({
      id: r.id,
      title: r.title,
      cookingTime: r.cookingTime,
      servings: r.servings
    }));
    log('recipe_details', { recipes: recipeInfo });

    // Find a sample recipe to test generation logic
    const sampleRecipe = await prisma.recipe.findFirst({
      where: { title: { contains: "Steak", mode: 'insensitive' } },
      include: {
        ingredients: true,
        instructions: true,
        nutritionFacts: true,
        categories: true,
        cuisines: true,
        tags: true
      }
    });

    if (!sampleRecipe) {
      log('error', {
        message: "No suitable recipe found for debugging.",
        stack: null
      });
      return NextResponse.json({
        success: false,
        duration_ms: new Date().getTime() - startTime.getTime(),
        logs,
        error: "No suitable recipe found for debugging."
      }, { status: 404 });
    }

    log('sample_recipe_found', sampleRecipe);

    // Simulate a generation step (replace with actual logic if needed)
    // Removed unused generateStep function
    /*
    const generateStep = (inputData: Record<string, unknown>): Record<string, unknown> => {
      log('running_generation_step', inputData);
      // ... hypothetical generation logic ...
      const output = { generated: true, inputType: typeof inputData };
      log('generation_step_output', output);
      return output;
    };
    */

    const endTime = new Date();
    const duration = endTime.getTime() - startTime.getTime();
    
    return NextResponse.json({
      success: true,
      duration_ms: duration,
      logs,
      finalRecipes: recipeInfo
    });

  } catch (error: unknown) {
    const err = error as Error;
    log('error', {
      message: err.message,
      stack: err.stack
    });

    return NextResponse.json({
      success: false,
      duration_ms: new Date().getTime() - startTime.getTime(),
      logs,
      error: err.message
    });
  }
} 