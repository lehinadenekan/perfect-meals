import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function fixRecipeImages() {
  try {
    // Fix Caponata recipe
    await prisma.recipe.updateMany({
      where: { title: 'Caponata' },
      data: {
        imageUrl: '/images/recipes/caponata.jpg'
      }
    });
    console.log('Updated Caponata image');

    // Fix Vitello Tonnato recipe
    await prisma.recipe.updateMany({
      where: { title: 'Vitello Tonnato' },
      data: {
        imageUrl: '/images/recipes/vitello_tonnato.jpg'
      }
    });
    console.log('Updated Vitello Tonnato image');

    // Fix Mhadjeb recipe
    await prisma.recipe.updateMany({
      where: { title: { contains: 'Mhadjeb' } },
      data: {
        imageUrl: '/images/recipes/mhadjeb-algerian-stuffed-pancakes-54.webp'
      }
    });
    console.log('Updated Mhadjeb image');

    // Fix Shakshuka recipe
    await prisma.recipe.updateMany({
      where: { 
        OR: [
          { title: 'Shakshuka' },
          { title: { contains: 'Shakshuka (North African Poached Eggs' } }
        ]
      },
      data: {
        imageUrl: '/images/recipes/shakshuka.jpg'
      }
    });
    console.log('Updated Shakshuka image');

    // Fix Pastilla recipe
    await prisma.recipe.updateMany({
      where: { 
        OR: [
          { title: 'Pastilla' },
          { title: { contains: 'Pastilla (Moroccan Sweet and Savory Chicken Pie)' } }
        ]
      },
      data: {
        imageUrl: '/images/recipes/pastilla_moroccan_sweet_and_savory_chicken_pie.jpg'
      }
    });
    console.log('Updated Pastilla image');

    // Fix Shorba Libiya recipe
    await prisma.recipe.updateMany({
      where: { 
        OR: [
          { title: 'Shorba Libiya' },
          { title: { contains: 'Shorba Libiya (Libyan Spiced Lamb Soup)' } }
        ]
      },
      data: {
        imageUrl: '/images/recipes/shorba_libiya_libyan_spiced_lamb_soup.jpg'
      }
    });
    console.log('Updated Shorba Libiya image');

    // Fix Zaalook recipe
    await prisma.recipe.updateMany({
      where: { title: 'Zaalook' },
      data: {
        imageUrl: '/images/recipes/zaalook.jpg'
      }
    });
    console.log('Updated Zaalook image');

    // Fix Maaqouda recipe
    await prisma.recipe.updateMany({
      where: { title: 'Maaqouda' },
      data: {
        imageUrl: '/images/recipes/maaqouda.jpg'
      }
    });
    console.log('Updated Maaqouda image');

    // Fix Rfissa recipe
    await prisma.recipe.updateMany({
      where: { title: 'Rfissa' },
      data: {
        imageUrl: '/images/recipes/rfissa.webp'
      }
    });
    console.log('Updated Rfissa image');

    console.log('Successfully updated all recipe images');
  } catch (error) {
    console.error('Error updating recipe images:', error);
  } finally {
    await prisma.$disconnect();
  }
}

fixRecipeImages(); 