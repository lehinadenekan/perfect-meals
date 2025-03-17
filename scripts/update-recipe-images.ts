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

    // Update Shakshuka recipe
    await prisma.recipe.updateMany({
      where: { title: 'Shakshuka (North African Poached Eggs in Spiced Tomato Sauce)' },
      data: {
        imageUrl: 'https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2023/12/Shakshuka-3-2.jpg'
      }
    });

    // Update Pastilla recipe
    await prisma.recipe.updateMany({
      where: { title: 'Pastilla (Moroccan Sweet and Savory Chicken Pie)' },
      data: {
        imageUrl: 'https://silkroadrecipes.com/wp-content/uploads/2022/08/Moroccan-Pastilla-square.jpg'
      }
    });

    // Update Shorba Libiya recipe
    await prisma.recipe.updateMany({
      where: { title: 'Shorba Libiya (Libyan Spiced Lamb Soup)' },
      data: {
        imageUrl: 'https://addictedtotahini.com/wp-content/uploads/2019/12/LIbya-Lamb-soup-348.jpg'
      }
    });

    // Update Duqqa recipe
    await prisma.recipe.updateMany({
      where: { title: 'Duqqa (Egyptian Spiced Nut and Seed Blend)' },
      data: {
        imageUrl: 'https://i0.wp.com/veredguttman.com/wp-content/uploads/2023/01/Dukkah.jpg?w=1280&ssl=1'
      }
    });

    // Update Zaalook recipe
    await prisma.recipe.updateMany({
      where: { title: 'Zaalook' },
      data: {
        imageUrl: 'https://www.pantsdownapronson.com/wp-content/uploads/moroccan-zaalouk-roasted-eggplant-and-tomato-dip-3.jpg'
      }
    });

    // Update Maaqouda recipe
    await prisma.recipe.updateMany({
      where: { title: 'Maaqouda' },
      data: {
        imageUrl: 'https://o-yummy.com/wp-content/uploads/2023/10/maakouda-40-scaled.jpg'
      }
    });

    // Update Rfissa recipe
    await prisma.recipe.updateMany({
      where: { title: 'Rfissa' },
      data: {
        imageUrl: 'https://tasteofmaroc.com/wp-content/uploads/2018/04/bormache-halimah-3-960-x-1280.jpg.webp'
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