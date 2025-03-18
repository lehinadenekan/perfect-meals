import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Updating Caponata recipe image...');

  try {
    // Find the Caponata recipe
    const caponata = await prisma.recipe.findFirst({
      where: {
        title: {
          contains: 'Caponata',
          mode: 'insensitive'
        }
      }
    });

    if (caponata) {
      // Update the recipe with the new image path
      const updated = await prisma.recipe.update({
        where: { id: caponata.id },
        data: { 
          imageUrl: '/images/recipes/caponata.jpg' 
        }
      });
      
      console.log('✅ Successfully updated Caponata recipe:');
      console.log({
        id: updated.id,
        title: updated.title,
        imageUrl: updated.imageUrl
      });
    } else {
      console.log('❌ Caponata recipe not found in the database');
    }
  } catch (error) {
    console.error('Error updating Caponata recipe:', error);
  }
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });