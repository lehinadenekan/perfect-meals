import { Recipe, Ingredient } from '../types/recipe';

export interface FodmapIngredient {
  name: string;
  threshold: number;
}

export interface FermentedIngredient {
  name: string;
  role: 'main' | 'flavoring';
}

// FODMAP classification data with thresholds (in grams)
export const HIGH_FODMAP_INGREDIENTS: { [key: string]: FodmapIngredient[] } = {
  fruits: [
    { name: 'apple', threshold: 35 },
    { name: 'pear', threshold: 30 },
    { name: 'mango', threshold: 40 },
    { name: 'watermelon', threshold: 50 },
    { name: 'cherry', threshold: 25 },
    { name: 'nectarine', threshold: 30 },
    { name: 'peach', threshold: 30 },
    { name: 'plum', threshold: 30 },
    { name: 'prune', threshold: 15 },
    { name: 'persimmon', threshold: 25 },
    { name: 'blackberry', threshold: 20 }
  ],
  vegetables: [
    { name: 'onion', threshold: 15 },
    { name: 'garlic', threshold: 5 },
    { name: 'shallot', threshold: 10 },
    { name: 'leek', threshold: 15 },
    { name: 'mushroom', threshold: 20 },
    { name: 'cauliflower', threshold: 25 },
    { name: 'artichoke', threshold: 30 },
    { name: 'asparagus', threshold: 20 },
    { name: 'beetroot', threshold: 25 },
    { name: 'celery', threshold: 20 },
    { name: 'sweet corn', threshold: 30 }
  ],
  legumes: [
    { name: 'beans', threshold: 40 },
    { name: 'lentils', threshold: 35 },
    { name: 'chickpea', threshold: 40 },
    { name: 'kidney bean', threshold: 35 },
    { name: 'black bean', threshold: 35 },
    { name: 'pinto bean', threshold: 35 },
    { name: 'soybean', threshold: 35 },
    { name: 'split pea', threshold: 35 }
  ],
  grains: [
    { name: 'wheat', threshold: 30 },
    { name: 'rye', threshold: 30 },
    { name: 'barley', threshold: 30 },
    { name: 'couscous', threshold: 30 },
    { name: 'spelt', threshold: 30 }
  ],
  dairy: [
    { name: 'milk', threshold: 250 },
    { name: 'cream', threshold: 50 },
    { name: 'ice cream', threshold: 100 },
    { name: 'yogurt', threshold: 150 },
    { name: 'soft cheese', threshold: 40 },
    { name: 'ricotta', threshold: 40 },
    { name: 'cottage cheese', threshold: 40 },
    { name: 'mascarpone', threshold: 40 }
  ],
  sweeteners: [
    { name: 'honey', threshold: 15 },
    { name: 'high-fructose corn syrup', threshold: 15 },
    { name: 'agave', threshold: 15 },
    { name: 'molasses', threshold: 15 }
  ],
  nuts: [
    { name: 'cashew', threshold: 30 },
    { name: 'pistachio', threshold: 30 }
  ]
};

// Fermented foods classification with role indicators
export const FERMENTED_FOODS: { [key: string]: FermentedIngredient[] } = {
  dairy: [
    { name: 'yogurt', role: 'main' },
    { name: 'kefir', role: 'main' },
    { name: 'buttermilk', role: 'main' },
    { name: 'aged cheese', role: 'main' },
    { name: 'blue cheese', role: 'main' },
    { name: 'fermented milk', role: 'main' },
    { name: 'cultured cream', role: 'main' },
    { name: 'crème fraîche', role: 'main' }
  ],
  vegetables: [
    { name: 'sauerkraut', role: 'main' },
    { name: 'kimchi', role: 'main' },
    { name: 'pickled', role: 'main' },
    { name: 'fermented vegetables', role: 'main' },
    { name: 'preserved vegetables', role: 'main' },
    { name: 'tsukemono', role: 'main' }
  ],
  soy: [
    { name: 'miso', role: 'main' },
    { name: 'tempeh', role: 'main' },
    { name: 'natto', role: 'main' },
    { name: 'fermented tofu', role: 'main' },
    { name: 'soy sauce', role: 'flavoring' },
    { name: 'tamari', role: 'flavoring' },
    { name: 'doenjang', role: 'flavoring' }
  ],
  grains: [
    { name: 'sourdough', role: 'main' },
    { name: 'koji', role: 'main' },
    { name: 'amazake', role: 'main' },
    { name: 'fermented rice', role: 'main' }
  ],
  beverages: [
    { name: 'kombucha', role: 'main' },
    { name: 'kefir', role: 'main' },
    { name: 'beer', role: 'main' },
    { name: 'wine', role: 'main' },
    { name: 'sake', role: 'main' }
  ],
  condiments: [
    { name: 'fish sauce', role: 'flavoring' },
    { name: 'worcestershire sauce', role: 'flavoring' },
    { name: 'vinegar', role: 'flavoring' },
    { name: 'fermented shrimp paste', role: 'flavoring' },
    { name: 'gochujang', role: 'flavoring' },
    { name: 'doubanjiang', role: 'flavoring' }
  ]
};

// Define nut ingredients
const NUT_INGREDIENTS = [
  // Tree nuts
  'almond', 'cashew', 'pecan', 'walnut', 'macadamia', 'pistachio', 'hazelnut', 'brazil nut',
  // Nut-derived ingredients
  'almond milk', 'almond flour', 'cashew milk', 'cashew cream',
  // Exclude peanut butter and seeds
  // 'peanut butter', 'sunflower seeds', 'pumpkin seeds', 'sesame seeds', 'chia seeds', 'flax seeds'
];

interface IngredientAnalysisDetails {
  name: string;
  amount: number;
  threshold?: number;
  role?: 'main' | 'flavoring';
}

interface IngredientAnalysis {
  found: boolean;
  score: number;
  details?: IngredientAnalysisDetails;
}

type TargetItem = string | FodmapIngredient | FermentedIngredient;

function analyzeIngredient(
  ingredient: { name: string; amount: number; unit: string },
  targetItems: TargetItem[]
): IngredientAnalysis {
  const normalizedName = ingredient.name.toLowerCase();
  
  for (const item of targetItems) {
    if (typeof item === 'string' && normalizedName.includes(item.toLowerCase())) {
      return { found: true, score: 1 };
    }
    
    if (typeof item === 'object') {
      if (normalizedName.includes(item.name.toLowerCase())) {
        // Convert amount to grams if needed
        let amountInGrams = ingredient.amount;
        switch (ingredient.unit.toLowerCase()) {
          case 'kg':
            amountInGrams *= 1000;
            break;
          case 'mg':
            amountInGrams /= 1000;
            break;
          case 'oz':
            amountInGrams *= 28.35;
            break;
          case 'lb':
            amountInGrams *= 453.592;
            break;
        }
        
        const details: IngredientAnalysisDetails = {
          name: item.name,
          amount: amountInGrams,
        };

        if ('threshold' in item) {
          details.threshold = item.threshold;
        }
        if ('role' in item) {
          details.role = item.role;
        }

        return {
          found: true,
          score: 'threshold' in item ? (amountInGrams > item.threshold ? 1 : 0.5) : 1,
          details
        };
      }
    }
  }
  
  return { found: false, score: 0 };
}

export interface DietaryAnalysis {
  isLowFodmap: boolean;
  fodmapScore: number;
  fodmapDetails: IngredientAnalysisDetails[];
  isFermented: boolean;
  fermentationScore: number;
  fermentationDetails: {
    mainIngredients: string[];
    flavorings: string[];
    preparationMethod: boolean;
  };
  hasNuts: boolean;
  isPescatarian: boolean;
}

export function analyzeDietary(recipe: Recipe): DietaryAnalysis {
  const fodmapDetails: IngredientAnalysisDetails[] = [];
  const fermentedMainIngredients: string[] = [];
  const fermentedFlavorings: string[] = [];
  let fodmapScore = 0;
  let fermentationScore = 0;
  let hasNuts = false;

  recipe.ingredients.forEach((ingredient: Ingredient) => {
    // FODMAP analysis
    for (const category of Object.values(HIGH_FODMAP_INGREDIENTS)) {
      const analysis = analyzeIngredient(ingredient, category);
      if (analysis.found && analysis.details) {
        fodmapDetails.push(analysis.details);
        fodmapScore += analysis.score;
      }
    }

    // Fermentation analysis
    for (const category of Object.values(FERMENTED_FOODS)) {
      const analysis = analyzeIngredient(ingredient, category);
      if (analysis.found && analysis.details) {
        if (analysis.details.role === 'main') {
          fermentedMainIngredients.push(analysis.details.name);
        } else {
          fermentedFlavorings.push(analysis.details.name);
        }
        fermentationScore += analysis.score;
      }
    }

    // Nut analysis
    const nutAnalysis = analyzeIngredient(ingredient, NUT_INGREDIENTS);
    if (nutAnalysis.found) {
      hasNuts = true;
    }
  });

  return {
    isLowFodmap: fodmapScore < 1,
    fodmapScore,
    fodmapDetails,
    isFermented: fermentationScore > 0,
    fermentationScore,
    fermentationDetails: {
      mainIngredients: fermentedMainIngredients,
      flavorings: fermentedFlavorings,
      preparationMethod: false
    },
    hasNuts,
    isPescatarian: recipe.isPescatarian
  };
}

// For backward compatibility
export function calculateDietaryFlags(recipe: Recipe): {
  isLowFodmap: boolean;
  isFermented: boolean;
  hasNuts: boolean;
  isPescatarian: boolean;
} {
  const analysis = analyzeDietary(recipe);
  return {
    isLowFodmap: analysis.isLowFodmap,
    isFermented: analysis.isFermented,
    hasNuts: analysis.hasNuts,
    isPescatarian: analysis.isPescatarian
  };
} 