// import { BulkRecipeGenerator } from '../app/services/bulkRecipeGenerator'; // Commented out due to missing file
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function generateRecipes() {
  try {
    // Create a new generation job - Also commented out as it's unused without the generator
    /* 
    const job = await prisma.recipeGenerationJob.create({
      data: {
        status: 'PENDING',
        totalRecipes: 50, // Example value
        completed: 0,
        failed: 0
      }
    });
    */

    // console.log('Starting recipe generation...'); // Can keep this if desired, or comment out
    // console.log('Job ID:', job.id); 

    // Commented out generator usage
    // const generator = new BulkRecipeGenerator(); 
    // await generator.generateRecipes(job.id); 

    // console.log('Recipe generation completed!'); 
    
    // Commented out final job status check
    /*
    const finalJob = await prisma.recipeGenerationJob.findUnique({
      where: { id: job.id }
    });

    if (finalJob) {
      console.log(`Generated ${finalJob.completed} recipes successfully`);
      if (finalJob.failed > 0) {
        console.log(`Failed to generate ${finalJob.failed} recipes`);
      }
    }
    */
    console.log('Recipe generation script temporarily disabled due to missing BulkRecipeGenerator.');

  } catch (error) {
    console.error('Error during recipe generation script execution (currently disabled):', error); 
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