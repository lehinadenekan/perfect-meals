import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

interface DiagnosticLog {
  timestamp: string;
  step: string;
  details: any;
}

export async function POST(request: Request) {
  const logs: DiagnosticLog[] = [];
  const startTime = new Date();

  function log(step: string, details: any) {
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
    const where: any = {};
    if (body.dietTypes?.length > 0) {
      const dietConditions: any[] = [];
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