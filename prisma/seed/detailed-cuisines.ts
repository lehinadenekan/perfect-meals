import { CuisineType } from '@prisma/client';

export const detailedCuisineData = [
  {
    name: 'Japanese',
    region: 'East Asia',
    description: 'Japanese cuisine emphasizes seasonal ingredients, meticulous preparation, and beautiful presentation. It focuses on bringing out the natural flavors of ingredients.',
    commonIngredients: [
      'dashi',
      'miso',
      'soy sauce',
      'sake',
      'mirin',
      'rice',
      'nori',
      'wasabi',
      'tofu',
      'bonito flakes'
    ],
    cookingMethods: [
      'grilling (yakimono)',
      'simmering (nimono)',
      'steaming (mushimono)',
      'deep-frying (agemono)',
      'raw preparation (sashimi)',
      'rice cooking (gohanmono)',
      'noodle making (menrui)',
      'fermentation (hakko)'
    ],
    spiceProfile: [
      'wasabi',
      'sansho pepper',
      'shichimi togarashi',
      'yuzu kosho',
      'ginger'
    ],
    dietaryConsiderations: [
      'seafood-rich',
      'low-dairy',
      'umami-focused',
      'gluten-options-available'
    ],
    mealTypes: [
      'washoku (traditional meal)',
      'kaiseki (formal dining)',
      'bento (boxed lunch)',
      'izakaya (pub food)',
      'street food'
    ],
    difficultyLevel: 'HARD',
    averagePreparationTime: 60,
    culturalContext: 'Japanese cuisine is deeply rooted in the philosophy of washoku, which emphasizes balance, seasonality, and mindful eating. Each dish is crafted to appeal to all senses, including sight, as presentation is considered crucial.',
    subCuisines: [
      {
        name: 'Washoku',
        description: 'Traditional Japanese cuisine based on "rules of five"',
        commonIngredients: ['rice', 'miso soup', 'pickled vegetables', 'fish', 'vegetables'],
        cookingMethods: ['grilling', 'simmering', 'steaming'],
        spiceProfile: ['wasabi', 'sansho'],
        difficultyLevel: 'HARD',
        averagePreparationTime: 90
      },
      {
        name: 'Kaiseki',
        description: 'Formal multi-course haute cuisine',
        commonIngredients: ['seasonal ingredients', 'premium fish', 'premium meat', 'seasonal vegetables'],
        cookingMethods: ['precise cutting', 'gentle simmering', 'careful grilling'],
        spiceProfile: ['minimal spicing', 'wasabi', 'yuzu'],
        difficultyLevel: 'EXPERT',
        averagePreparationTime: 120
      }
    ]
  },
  {
    name: 'Thai',
    region: 'Southeast Asia',
    description: 'Thai cuisine is known for its balance of five fundamental flavors: hot (spicy), sour, sweet, salty, and bitter. Each dish aims to combine these elements harmoniously.',
    commonIngredients: [
      'rice',
      'rice noodles',
      'coconut milk',
      'fish sauce',
      'palm sugar',
      'Thai basil',
      'lemongrass',
      'galangal',
      'kaffir lime leaves',
      'chilies'
    ],
    cookingMethods: [
      'stir-frying',
      'grilling',
      'steaming',
      'curry making',
      'pounding (som tam)',
      'soup making',
      'wok cooking',
      'mortar and pestle preparation'
    ],
    spiceProfile: [
      'Thai chilies',
      'white pepper',
      'turmeric',
      'galangal',
      'coriander',
      'cumin',
      'lemongrass',
      'kaffir lime'
    ],
    dietaryConsiderations: [
      'gluten-free-friendly',
      'dairy-free',
      'vegetarian-adaptable',
      'seafood-rich'
    ],
    mealTypes: [
      'curry dishes',
      'noodle dishes',
      'stir-fries',
      'salads (yam)',
      'soups (tom)',
      'grilled dishes',
      'street food'
    ],
    difficultyLevel: 'MEDIUM',
    averagePreparationTime: 45,
    culturalContext: 'Thai cuisine reflects the country\'s history as a crossroads of cultural influences, while maintaining its unique identity. Food is typically eaten family-style, with rice as the centerpiece.',
    subCuisines: [
      {
        name: 'Northern Thai',
        description: 'Milder, more herbs, influenced by Burma and Laos',
        commonIngredients: ['sticky rice', 'herbs', 'pork', 'tomatoes'],
        cookingMethods: ['grilling', 'pounding', 'steaming'],
        spiceProfile: ['mild chilies', 'turmeric', 'ginger'],
        difficultyLevel: 'MEDIUM',
        averagePreparationTime: 50
      },
      {
        name: 'Southern Thai',
        description: 'Spicier, more coconut milk, influenced by Malay cuisine',
        commonIngredients: ['coconut milk', 'seafood', 'turmeric', 'fresh chilies'],
        cookingMethods: ['curry making', 'grilling', 'frying'],
        spiceProfile: ['hot chilies', 'turmeric', 'black pepper'],
        difficultyLevel: 'HARD',
        averagePreparationTime: 55
      }
    ]
  }
];

export default detailedCuisineData; 