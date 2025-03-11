const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function updateGreekSalad() {
  try {
    // First, let's find the recipe
    const recipe = await prisma.recipe.findFirst({
      where: {
        OR: [
          { title: { contains: 'Greek', mode: 'insensitive' } },
          { title: { contains: 'Horiatiki', mode: 'insensitive' } }
        ]
      }
    });

    if (!recipe) {
      console.log('Recipe not found');
      return;
    }

    console.log('Found recipe:', recipe);

    // Now update it
    const updatedRecipe = await prisma.recipe.update({
      where: {
        id: recipe.id
      },
      data: {
        title: 'Horiatiki (Greek Salad)',
        imageUrl: '/images/recipes/horiatiki-greek-salad.jpg'
      }
    });
    
    console.log('Successfully updated recipe:', updatedRecipe);
  } catch (error) {
    console.error('Error updating recipe:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateGreekSalad(); 