import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const cuisineData = [
  {
    name: 'Chinese',
    region: 'East Asia',
    description: 'One of the world\'s oldest and most diverse cuisines, characterized by its emphasis on seasonal ingredients, precise knife work, and cooking methods like stir-frying and steaming.',
    commonIngredients: ['soy sauce', 'ginger', 'garlic', 'scallions', 'rice wine'],
    cookingMethods: ['stir-frying', 'steaming', 'braising', 'deep-frying'],
    spiceProfile: ['star anise', 'Sichuan peppercorn', 'five-spice powder', 'white pepper'],
    dietaryConsiderations: ['vegetarian-friendly', 'seafood-rich'],
    mealTypes: ['dim sum', 'main course', 'street food', 'banquet'],
    difficultyLevel: 'MEDIUM',
    averagePreparationTime: 45,
    culturalContext: 'Chinese cuisine emphasizes the balance of flavors, textures, and the medicinal properties of ingredients.',
    subCuisines: [
      {
        name: 'Sichuan',
        region: 'East Asia',
        subRegion: 'Sichuan Province',
        description: 'Known for bold flavors, particularly the combination of spicy and numbing (málà).',
        commonIngredients: ['Sichuan peppercorn', 'chili oil', 'doubanjiang'],
        cookingMethods: ['dry-frying', 'twice-cooking', 'mala'],
        spiceProfile: ['Sichuan peppercorn', 'dried chilies', 'garlic', 'ginger'],
        difficultyLevel: 'HARD',
        averagePreparationTime: 60
      }
      // Add more regional Chinese cuisines
    ]
  },
  {
    name: 'Indian',
    region: 'South Asia',
    description: 'Rich and diverse cuisine known for its sophisticated use of spices, vegetarian traditions, and regional variations.',
    commonIngredients: ['rice', 'lentils', 'ghee', 'yogurt', 'garam masala'],
    cookingMethods: ['tandoor', 'tawa', 'kadai', 'dum'],
    spiceProfile: ['turmeric', 'cumin', 'coriander', 'cardamom', 'cinnamon'],
    dietaryConsiderations: ['vegetarian', 'vegan-friendly', 'halal'],
    mealTypes: ['thali', 'street food', 'curry', 'bread'],
    difficultyLevel: 'MEDIUM',
    averagePreparationTime: 60,
    culturalContext: 'Indian cuisine is deeply rooted in Ayurvedic principles and religious dietary practices.',
    subCuisines: [
      {
        name: 'Punjab',
        region: 'South Asia',
        subRegion: 'Punjab',
        description: 'Rich, hearty cuisine known for its tandoor dishes and dairy products.',
        commonIngredients: ['wheat flour', 'butter', 'cream', 'chicken'],
        cookingMethods: ['tandoor', 'tawa'],
        spiceProfile: ['garam masala', 'dried fenugreek', 'cumin'],
        difficultyLevel: 'MEDIUM',
        averagePreparationTime: 45
      }
      // Add more regional Indian cuisines
    ]
  }
  // Add more major cuisines
];

async function seedCuisines() {
  for (const cuisine of cuisineData) {
    const { subCuisines, ...mainCuisine } = cuisine;
    
    const createdCuisine = await prisma.cuisine.create({
      data: mainCuisine
    });

    if (subCuisines) {
      for (const subCuisine of subCuisines) {
        await prisma.cuisine.create({
          data: {
            ...subCuisine,
            parentCuisine: {
              connect: { id: createdCuisine.id }
            }
          }
        });
      }
    }
  }
}

export default seedCuisines; 