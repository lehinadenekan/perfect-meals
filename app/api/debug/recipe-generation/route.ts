import { NextResponse } from 'next/server';
import { SpoonacularService } from '@/app/services/spoonacularService';
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

    // Check Spoonacular service initialization
    const spoonacular = new SpoonacularService();
    log('spoonacular_service_initialized', { 
      apiKey: process.env.SPOONACULAR_API_KEY ? 'present' : 'missing'
    });

    // Attempt to get recipes directly
    log('fetching_recipes_start', { params: body });
    const recipesResponse = await spoonacular.getRandomRecipes({
      ...body,
      forceRefresh: true
    });
    log('fetching_recipes_complete', { 
      responseStatus: recipesResponse ? 'success' : 'failed',
      recipeCount: recipesResponse?.recipes?.length || 0
    });

    // Log recipe IDs and basic info
    const recipeInfo = recipesResponse?.recipes?.map((r: any) => ({
      id: r.id,
      title: r.title,
      readyInMinutes: r.readyInMinutes,
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