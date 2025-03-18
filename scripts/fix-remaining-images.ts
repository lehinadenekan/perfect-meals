import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function fixRemainingImages() {
  try {
    // These are the specific recipes that failed in the previous script
    const recipesToFix = [
      {
        title: 'Bak Kut Teh',
        imageUrl: 'https://imageproxy.icook.network/fit?background=255%2C255%2C255&height=1080&nocrop=true&stripmeta=true&type=auto&url=http%3A%2F%2Ftokyo-kitchen.icook.tw.s3.amazonaws.com%2Fuploads%2Frecipe%2Fcover%2F445174%2Ffa461a7893caddae.jpg&width=1080'
      },
      {
        title: 'Khanom Jeen Nam Ya Pa',
        imageUrl: 'http://farm8.staticflickr.com/7034/6492052957_d4879d8728_o.jpg'
      },
      {
        title: 'Ogokbap',
        imageUrl: 'https://recipe1.ezmember.co.kr/cache/recipe/2015/06/07/b33c1b674942e3b5877cebce525ddfe81.jpg'
      },
      {
        title: 'Duqqa (Egyptian Spiced Nut and Seed Blend)',
        imageUrl: 'https://i0.wp.com/veredguttman.com/wp-content/uploads/2023/01/Dukkah.jpg?w=1280&ssl=1'
      },
      {
        title: 'Steak and Kidney Pie',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d4/Traditional_steak_and_kidney_pie.jpg'
      },
      {
        title: 'Kimchi Sundubu Jjigae',
        imageUrl: 'https://omnivorescookbook.com/wp-content/uploads/2020/09/200806_Soondubu-Jjigae_3.jpg'
      }
    ];

    // Process each recipe
    for (const recipe of recipesToFix) {
      try {
        const result = await prisma.recipe.updateMany({
          where: {
            title: {
              contains: recipe.title
            }
          },
          data: {
            imageUrl: recipe.imageUrl
          }
        });
        
        console.log(`Updated image for "${recipe.title}" - ${result.count} recipes affected`);
      } catch (error) {
        console.error(`Error updating "${recipe.title}":`, error);
      }
    }

    console.log('Successfully updated remaining recipes with missing images');
  } catch (error) {
    console.error('Error fixing remaining images:', error);
  } finally {
    await prisma.$disconnect();
  }
}

fixRemainingImages(); 