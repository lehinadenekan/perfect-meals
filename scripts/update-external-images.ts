import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function updateExternalRecipeImages() {
  try {
    // East African
    await updateRecipe('Ugali na Sukuma Wiki', 
      'https://d2uqlwridla7kt.cloudfront.net/recipe-media/recipe-8ll9tjifm/1ahas38ll9tmry7/img-9638-jpg');
    
    await updateRecipe('Injera be Doro Wat', 
      'https://images.squarespace-cdn.com/content/v1/580a73c320099eeb9bb90e68/1479324980364-FEJHR6FBI4PEZFHGNIZ5/image-asset.jpeg?format=2500w');
    
    await updateRecipe('Mandazi', 
      'https://www.jocooks.com/wp-content/uploads/2012/09/mandazi-1-20.jpg');
    
    await updateRecipe('Pilau ya Nyama', 
      'https://www.malindikenya.net/images/uploads/articoli/1163_l.jpg');
    
    await updateRecipe('Samaki wa Kupaka', 
      'http://sheenaskitchen.com/wp-content/uploads/2018/08/20180813_173858_hdr-01-011394284101-819x1024.jpeg');
    
    await updateRecipe('Maharagwe ya Nazi', 
      'https://binnyjs.wordpress.com/wp-content/uploads/2016/04/img_4510.jpg?w=620');
    
    await updateRecipe('Kaimati', 
      'https://www.chefadora.com/_next/image?url=https%3A%2F%2Fchefadora.b-cdn.net%2FKaimati_edited_50d46346b2.jpg&w=2048&q=75');
    
    // North African
    await updateRecipe('Shakshuka', 
      'https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2023/12/Shakshuka-3-2.jpg');
    
    await updateRecipe('Pastilla', 
      'https://silkroadrecipes.com/wp-content/uploads/2022/08/Moroccan-Pastilla-square.jpg');
    
    await updateRecipe('Shorba Libiya', 
      'https://addictedtotahini.com/wp-content/uploads/2019/12/LIbya-Lamb-soup-348.jpg');
    
    await updateRecipe('Duqqa', 
      'https://i0.wp.com/veredguttman.com/wp-content/uploads/2023/01/Dukkah.jpg?w=1280&ssl=1');
    
    await updateRecipe('Zaalook', 
      'https://www.pantsdownapronson.com/wp-content/uploads/moroccan-zaalouk-roasted-eggplant-and-tomato-dip-3.jpg');
    
    await updateRecipe('Maaqouda', 
      'https://o-yummy.com/wp-content/uploads/2023/10/maakouda-40-scaled.jpg');
    
    await updateRecipe('Rfissa', 
      'https://tasteofmaroc.com/wp-content/uploads/2018/04/bormache-halimah-3-960-x-1280.jpg.webp');
    
    // Asian
    await updateRecipe('Sundubu Jjigae', 
      'https://omnivorescookbook.com/wp-content/uploads/2020/09/200806_Soondubu-Jjigae_3.jpg');
    
    await updateRecipe('Bak Kut Teh', 
      'https://imageproxy.icook.network/fit?background=255%2C255%2C255&height=1080&nocrop=true&stripmeta=true&type=auto&url=http%3A%2F%2Ftokyo-kitchen.icook.tw.s3.amazonaws.com%2Fuploads%2Frecipe%2Fcover%2F445174%2Ffa461a7893caddae.jpg&width=1080');
    
    await updateRecipe('Ogokbap', 
      'https://recipe1.ezmember.co.kr/cache/recipe/2015/06/07/b33c1b674942e3b5877cebce525ddfe81.jpg');
    
    await updateRecipe('Chao Dao Xiao Mian', 
      'https://upload.wikimedia.org/wikipedia/commons/b/b6/Sliced_noodles.jpg');
    
    await updateRecipe('Khanom Jeen Nam Ya Pa', 
      'http://farm8.staticflickr.com/7034/6492052957_d4879d8728_o.jpg');
    
    await updateRecipe('Oyakodon', 
      'https://www.justonecookbook.com/wp-content/uploads/2022/10/Oyakodon-0595-II.jpg');
    
    await updateRecipe('Mapo Doufu', 
      'https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fill,g_auto,w_1456,h_1092/k%2F2023-05-mapo-tofu%2Fmapo-tofu-017');

    console.log('Successfully updated all recipe images with external URLs');
  } catch (error) {
    console.error('Error updating recipe images:', error);
  } finally {
    await prisma.$disconnect();
  }
}

async function updateRecipe(title: string, imageUrl: string) {
  try {
    // Use partial matching to handle variations in titles
    const result = await prisma.recipe.updateMany({
      where: {
        title: {
          contains: title
        }
      },
      data: {
        imageUrl
      }
    });
    
    if (result.count > 0) {
      console.log(`Updated image for "${title}" - ${result.count} recipes affected`);
    } else {
      console.log(`No recipes found matching title "${title}"`);
    }
  } catch (error) {
    console.error(`Error updating "${title}":`, error);
  }
}

updateExternalRecipeImages(); 