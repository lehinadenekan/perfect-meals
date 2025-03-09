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
  },
  {
    name: 'Yoruba',
    region: 'West Africa',
    description: 'Traditional Yoruba cuisine from Nigeria, known for its rich flavors, use of fresh ingredients, and cultural significance in celebrations and daily life.',
    commonIngredients: ['yam', 'cassava', 'plantains', 'palm oil', 'egusi', 'stockfish', 'locust beans'],
    cookingMethods: ['stewing', 'frying', 'steaming', 'pounding', 'grinding'],
    spiceProfile: ['scotch bonnet peppers', 'ginger', 'garlic', 'African nutmeg', 'calabash nutmeg'],
    dietaryConsiderations: ['halal-friendly', 'seafood-rich'],
    mealTypes: ['main course', 'soups', 'swallows', 'street food'],
    difficultyLevel: 'MEDIUM',
    averagePreparationTime: 90,
    culturalContext: 'Yoruba cuisine is deeply rooted in tradition, with many dishes having cultural and ceremonial significance.',
    subCuisines: [
      {
        name: 'Lagos-Style',
        region: 'West Africa',
        subRegion: 'Lagos State',
        description: 'Urban interpretation of Yoruba cuisine, known for its street food and fusion elements.',
        commonIngredients: ['rice', 'beans', 'fish', 'meat', 'palm oil'],
        cookingMethods: ['frying', 'grilling', 'stewing'],
        spiceProfile: ['scotch bonnet peppers', 'curry powder', 'thyme'],
        difficultyLevel: 'MEDIUM',
        averagePreparationTime: 60
      }
    ]
  },
  {
    name: 'Mediterranean',
    region: 'Mediterranean Basin',
    description: 'Healthy and diverse cuisine emphasizing fresh ingredients, olive oil, and simple preparation methods.',
    commonIngredients: ['olive oil', 'tomatoes', 'garlic', 'herbs', 'seafood'],
    cookingMethods: ['grilling', 'baking', 'braising', 'slow-cooking'],
    spiceProfile: ['oregano', 'basil', 'thyme', 'rosemary', 'sage'],
    dietaryConsiderations: ['vegetarian-friendly', 'seafood-rich', 'heart-healthy'],
    mealTypes: ['mezze', 'main course', 'salads', 'street food'],
    difficultyLevel: 'EASY',
    averagePreparationTime: 45,
    culturalContext: 'Mediterranean cuisine is known for its health benefits and social dining culture.',
    subCuisines: [
      {
        name: 'Greek',
        region: 'Mediterranean Basin',
        subRegion: 'Greece',
        description: 'Fresh ingredients and simple preparation methods characterize Greek cuisine.',
        commonIngredients: ['feta cheese', 'olives', 'lamb', 'yogurt'],
        cookingMethods: ['grilling', 'baking'],
        spiceProfile: ['oregano', 'dill', 'mint'],
        difficultyLevel: 'EASY',
        averagePreparationTime: 40
      }
    ]
  },
  {
    name: 'Mexican',
    region: 'North America',
    description: 'Vibrant cuisine with a rich history, known for its use of corn, beans, and diverse chilies.',
    commonIngredients: ['corn', 'beans', 'chilies', 'tomatoes', 'avocado'],
    cookingMethods: ['grilling', 'frying', 'steaming', 'braising'],
    spiceProfile: ['chipotle', 'ancho chile', 'cumin', 'Mexican oregano'],
    dietaryConsiderations: ['vegetarian-adaptable', 'gluten-free-friendly'],
    mealTypes: ['tacos', 'main course', 'street food', 'soups'],
    difficultyLevel: 'MEDIUM',
    averagePreparationTime: 60,
    culturalContext: 'Mexican cuisine reflects its pre-Hispanic roots and colonial influences.',
    subCuisines: [
      {
        name: 'Oaxacan',
        region: 'North America',
        subRegion: 'Oaxaca',
        description: 'Known as the land of seven moles, featuring complex sauce preparations.',
        commonIngredients: ['chocolate', 'chilies', 'corn', 'beans'],
        cookingMethods: ['grinding', 'roasting', 'simmering'],
        spiceProfile: ['chile negro', 'Mexican oregano', 'cloves'],
        difficultyLevel: 'HARD',
        averagePreparationTime: 120
      }
    ]
  },
  {
    name: 'Japanese',
    region: 'East Asia',
    description: 'Refined cuisine focusing on seasonal ingredients, precise preparation, and aesthetic presentation.',
    commonIngredients: ['rice', 'nori', 'miso', 'dashi', 'soy sauce'],
    cookingMethods: ['grilling', 'steaming', 'raw preparation', 'simmering'],
    spiceProfile: ['wasabi', 'shichimi togarashi', 'sansho pepper'],
    dietaryConsiderations: ['seafood-rich', 'umami-focused'],
    mealTypes: ['washoku', 'bento', 'street food', 'noodles'],
    difficultyLevel: 'MEDIUM',
    averagePreparationTime: 45,
    culturalContext: 'Japanese cuisine emphasizes seasonal ingredients and mindful eating.',
    subCuisines: [
      {
        name: 'Kaiseki',
        region: 'East Asia',
        subRegion: 'Kyoto',
        description: 'Traditional multi-course Japanese dinner emphasizing seasonal ingredients.',
        commonIngredients: ['seasonal vegetables', 'seafood', 'rice', 'tea'],
        cookingMethods: ['grilling', 'steaming', 'simmering'],
        spiceProfile: ['wasabi', 'yuzu', 'sansho'],
        difficultyLevel: 'HARD',
        averagePreparationTime: 120
      }
    ]
  },
  {
    name: 'Thai',
    region: 'Southeast Asia',
    description: 'Complex cuisine balancing sweet, sour, salty, and spicy flavors.',
    commonIngredients: ['rice', 'fish sauce', 'coconut milk', 'chilies', 'lemongrass'],
    cookingMethods: ['stir-frying', 'grilling', 'steaming', 'pounding'],
    spiceProfile: ['Thai chilies', 'galangal', 'kaffir lime', 'Thai basil'],
    dietaryConsiderations: ['gluten-free-friendly', 'seafood-rich'],
    mealTypes: ['curry', 'noodles', 'salads', 'street food'],
    difficultyLevel: 'MEDIUM',
    averagePreparationTime: 45,
    culturalContext: 'Thai cuisine is known for its complex flavor combinations and use of fresh herbs.',
    subCuisines: [
      {
        name: 'Northern Thai',
        region: 'Southeast Asia',
        subRegion: 'Chiang Mai',
        description: 'Milder and more herbs-focused than central Thai cuisine.',
        commonIngredients: ['sticky rice', 'herbs', 'pork', 'tomatoes'],
        cookingMethods: ['grilling', 'steaming'],
        spiceProfile: ['turmeric', 'ginger', 'chilies'],
        difficultyLevel: 'MEDIUM',
        averagePreparationTime: 60
      }
    ]
  },
  {
    name: 'Italian',
    region: 'Southern Europe',
    description: 'Regional cuisine emphasizing fresh ingredients and traditional preparation methods.',
    commonIngredients: ['pasta', 'olive oil', 'tomatoes', 'garlic', 'herbs'],
    cookingMethods: ['sautéing', 'baking', 'braising', 'grilling'],
    spiceProfile: ['basil', 'oregano', 'rosemary', 'sage', 'thyme'],
    dietaryConsiderations: ['vegetarian-friendly'],
    mealTypes: ['pasta', 'pizza', 'antipasti', 'main course'],
    difficultyLevel: 'MEDIUM',
    averagePreparationTime: 60,
    culturalContext: 'Italian cuisine celebrates regional diversity and family traditions.',
    subCuisines: [
      {
        name: 'Sicilian',
        region: 'Southern Europe',
        subRegion: 'Sicily',
        description: 'Bold flavors influenced by Greek, Arab, and Spanish cuisines.',
        commonIngredients: ['eggplant', 'pistachios', 'seafood', 'citrus'],
        cookingMethods: ['frying', 'grilling', 'baking'],
        spiceProfile: ['saffron', 'chili', 'wild fennel'],
        difficultyLevel: 'MEDIUM',
        averagePreparationTime: 75
      }
    ]
  }
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