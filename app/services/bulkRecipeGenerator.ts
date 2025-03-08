import { PrismaClient, Prisma } from '@prisma/client';
import RecipeGenerator from './recipeGenerator';
import { Server as SocketIOServer } from 'socket.io';
import { getSocketIO } from '../lib/socket';

const prisma = new PrismaClient();
const BATCH_SIZE = 5; // Process 5 recipes at a time

export class BulkRecipeGenerator {
  private io: SocketIOServer;
  private recipeGenerator: typeof RecipeGenerator;

  constructor() {
    this.io = getSocketIO();
    this.recipeGenerator = RecipeGenerator;
  }

  private async updateJobProgress(jobId: string, completed: number, failed: number = 0, error?: string) {
    const job = await prisma.recipeGenerationJob.update({
      where: { id: jobId },
      data: {
        completed,
        failed,
        error,
        status: error ? 'FAILED' : completed === 50 ? 'COMPLETED' : 'IN_PROGRESS'
      }
    });

    // Emit progress update via WebSocket
    this.io.emit(`recipeGeneration:${jobId}`, {
      status: job.status,
      completed: job.completed,
      failed: job.failed,
      total: job.totalRecipes,
      error: job.error
    });

    return job;
  }

  public async generateRecipes(jobId: string) {
    let completed = 0;
    let failed = 0;

    try {
      // Get all cuisines
      const cuisines = await prisma.cuisine.findMany();
      if (!cuisines.length) {
        throw new Error('No cuisines found in the database');
      }

      const totalRecipes = 50;

      // Process in batches
      for (let i = 0; i < totalRecipes; i += BATCH_SIZE) {
        const batchPromises = [];
        const batchSize = Math.min(BATCH_SIZE, totalRecipes - i);

        for (let j = 0; j < batchSize; j++) {
          // Pick a random cuisine
          const randomCuisine = cuisines[Math.floor(Math.random() * cuisines.length)];
          if (!randomCuisine) continue;
          
          // Generate recipe parameters
          const params = {
            cuisineId: randomCuisine.id,
            difficulty: ['EASY', 'MEDIUM', 'HARD'][Math.floor(Math.random() * 3)],
            cookingTime: Math.floor(Math.random() * 120) + 15,
            servings: [2, 4, 6, 8][Math.floor(Math.random() * 4)],
            mealType: ['BREAKFAST', 'LUNCH', 'DINNER', 'SNACK'][Math.floor(Math.random() * 4)],
            spiceLevel: ['MILD', 'MEDIUM', 'HOT'][Math.floor(Math.random() * 3)],
            isFusion: Math.random() < 0.2
          };

          // Create promise for recipe generation
          const promise = this.recipeGenerator.generateRecipe(params)
            .then(async (recipe) => {
              // Update recipe with job ID
              await prisma.recipe.update({
                where: { id: recipe.id },
                data: {
                  generationJob: {
                    connect: { id: jobId }
                  }
                }
              });
              completed++;
              return recipe;
            })
            .catch((err) => {
              console.error('Failed to generate recipe:', err);
              failed++;
              return null;
            });

          batchPromises.push(promise);
        }

        // Wait for batch to complete
        await Promise.all(batchPromises);
        
        // Update progress
        await this.updateJobProgress(jobId, completed, failed);
      }

      // Final update
      await this.updateJobProgress(jobId, completed, failed);

    } catch (err) {
      const error = err as Error;
      console.error('Bulk generation failed:', error);
      await this.updateJobProgress(jobId, completed, failed, error.message);
      throw error;
    }
  }
}

export default new BulkRecipeGenerator(); 