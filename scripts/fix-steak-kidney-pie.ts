import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

async function fixSteakKidneyPieImage() {
  try {
    // Local image path
    const localImageFilename = 'steak_and_kidney_pie.webp';
    const localImagePath = `/images/recipes/${localImageFilename}`;
    const fullImagePath = path.join(process.cwd(), 'public', 'images', 'recipes', localImageFilename);
    
    // Check if the image file exists
    if (!fs.existsSync(fullImagePath)) {
      console.error(`Error: The image file does not exist at ${fullImagePath}`);
      return;
    }
    
    console.log(`Using local image at ${fullImagePath}`);
    
    // Update the recipe in the database
    const result = await prisma.recipe.updateMany({
      where: {
        title: {
          contains: 'Steak and Kidney Pie'
        }
      },
      data: {
        imageUrl: localImagePath
      }
    });
    
    console.log(`Updated database for "Steak and Kidney Pie" - ${result.count} recipes affected`);
  } catch (error) {
    console.error('Error updating Steak and Kidney Pie image:', error);
  } finally {
    await prisma.$disconnect();
  }
}

fixSteakKidneyPieImage(); 