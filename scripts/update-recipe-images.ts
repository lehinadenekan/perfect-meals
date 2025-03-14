import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function updateRecipeImages() {
  try {
    // Update Suya recipe
    await prisma.recipe.updateMany({
      where: { title: 'Suya' },
      data: {
        imageUrl: 'https://i0.wp.com/evseats.com/wp-content/uploads/2017/04/Suya-Spicy-Shish-Kebab-3.jpg?resize=1080%2C720&ssl=1'
      }
    });

    // Update Waakye recipe
    await prisma.recipe.updateMany({
      where: { title: 'Waakye' },
      data: {
        imageUrl: 'https://eatwellabi.com/wp-content/uploads/2021/09/Waakye-13.jpg'
      }
    });

    // Update Yassa Poulet recipe
    await prisma.recipe.updateMany({
      where: { title: 'Yassa Poulet' },
      data: {
        imageUrl: 'https://i1.wp.com/louskitchencorner.freybors.com/wp-content/uploads/2022/10/Very-tasty-poulet-yassa.png?w=844&ssl=1'
      }
    });

    // Update Fufu and Egusi Soup recipe
    await prisma.recipe.updateMany({
      where: { title: 'Fufu and Egusi Soup' },
      data: {
        imageUrl: 'https://www.sugarcaneglasgow.co.uk/wp-content/uploads/2022/12/pounded-yam.jpg'
      }
    });

    console.log('Successfully updated recipe images');
  } catch (error) {
    console.error('Error updating recipe images:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateRecipeImages(); 