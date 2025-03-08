import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import BulkRecipeGenerator from '@/app/services/bulkRecipeGenerator';

const prisma = new PrismaClient();

export async function POST() {
  try {
    const session = await getServerSession(authOptions);
    
    // Create a new generation job
    const job = await prisma.recipeGenerationJob.create({
      data: {
        totalRecipes: 50,
        status: 'PENDING'
      }
    });

    // Start the generation process in the background
    BulkRecipeGenerator.generateRecipes(job.id).catch(console.error);

    // Return the job ID immediately
    return NextResponse.json({ 
      success: true, 
      jobId: job.id,
      message: 'Recipe generation started' 
    });

  } catch (error) {
    console.error('Failed to start recipe generation:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to start recipe generation' 
    }, { status: 500 });
  }
} 