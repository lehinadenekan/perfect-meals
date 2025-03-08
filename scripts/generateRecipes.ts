import { BulkRecipeGenerator } from '../app/services/bulkRecipeGenerator';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function generateRecipes() {
  try {
    // Create a new generation job
    const job = await prisma.recipeGenerationJob.create({
      data: {
        status: 'PENDING',
        totalRecipes: 50,
        completed: 0,
        failed: 0
      }
    });

    console.log('Starting recipe generation...');
    console.log('Job ID:', job.id);

    const generator = new BulkRecipeGenerator();
    await generator.generateRecipes(job.id);

    console.log('Recipe generation completed!');
    
    // Get final job status
    const finalJob = await prisma.recipeGenerationJob.findUnique({
      where: { id: job.id }
    });

    if (finalJob) {
      console.log(`Generated ${finalJob.completed} recipes successfully`);
      if (finalJob.failed > 0) {
        console.log(`Failed to generate ${finalJob.failed} recipes`);
      }
    }

  } catch (error) {
    console.error('Error generating recipes:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the script
generateRecipes()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  }); 