import { Recipe } from '@/app/types/recipe';

interface FodmapIngredient {
  name: string;
  threshold: number;
}

interface FermentedIngredient {
  name: string;
  role: 'main' | 'flavoring';
}

// FODMAP classification data with thresholds (in grams)
const HIGH_FODMAP_INGREDIENTS: { [key: string]: FodmapIngredient[] } = {
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
const FERMENTED_FOODS: { [key: string]: FermentedIngredient[] } = {
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

// Enhanced non-pescatarian ingredients with categories
const NON_PESCATARIAN_INGREDIENTS: { [key: string]: string[] } = {
  meats: [
    'beef', 'pork', 'lamb', 'chicken', 'turkey', 'duck', 'goose',
    'veal', 'venison', 'rabbit', 'goat', 'mutton'
  ],
  processedMeats: [
    'bacon', 'ham', 'sausage', 'salami', 'prosciutto', 'pepperoni',
    'chorizo', 'hot dog', 'bratwurst', 'jerky'
  ],
  animalByproducts: [
    'lard', 'tallow', 'gelatin', 'animal shortening', 'schmaltz',
    'bone broth', 'beef stock', 'chicken stock'
  ],
  additives: [
    'carmine', 'cochineal', 'isinglass', 'rennet', 'shellac',
    'lanolin', 'oleic acid', 'capric acid', 'glycerin'
  ]
};

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

// Flatten and process ingredient lists
const allHighFodmapIngredients = Object.values(HIGH_FODMAP_INGREDIENTS).flat();
const allFermentedFoods = Object.values(FERMENTED_FOODS).flat();
const allNonPescatarianFoods = Object.values(NON_PESCATARIAN_INGREDIENTS).flat();

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
  isPescatarian: boolean;
  pescatarianScore: number;
  nonPescatarianIngredients: string[];
}

export function analyzeDietary(recipe: Recipe): DietaryAnalysis {
  // FODMAP analysis
  let fodmapScore = 0;
  const fodmapDetails: IngredientAnalysisDetails[] = [];
  
  recipe.ingredients.forEach(ingredient => {
    const analysis = analyzeIngredient(ingredient, allHighFodmapIngredients);
    if (analysis.found && analysis.details) {
      fodmapScore += analysis.score;
      fodmapDetails.push(analysis.details);
    }
  });

  // Fermentation analysis
  let fermentationScore = 0;
  const mainFermentedIngredients: string[] = [];
  const fermentedFlavorings: string[] = [];
  
  recipe.ingredients.forEach(ingredient => {
    const analysis = analyzeIngredient(ingredient, allFermentedFoods);
    if (analysis.found && analysis.details && analysis.details.role) {
      fermentationScore += analysis.details.role === 'main' ? 1 : 0.5;
      if (analysis.details.role === 'main') {
        mainFermentedIngredients.push(analysis.details.name);
      } else {
        fermentedFlavorings.push(analysis.details.name);
      }
    }
  });

  // Check for fermentation in preparation
  const hasFementation = recipe.description?.toLowerCase().includes('ferment') || false;
  if (hasFementation) {
    fermentationScore += 1;
  }

  // Pescatarian analysis
  let pescatarianScore = 0;
  const nonPescatarianFound: string[] = [];
  
  recipe.ingredients.forEach(ingredient => {
    const analysis = analyzeIngredient(ingredient, allNonPescatarianFoods);
    if (analysis.found) {
      pescatarianScore += analysis.score;
      nonPescatarianFound.push(ingredient.name);
    }
  });

  return {
    isLowFodmap: fodmapScore < 1,
    fodmapScore,
    fodmapDetails,
    isFermented: fermentationScore > 0,
    fermentationScore,
    fermentationDetails: {
      mainIngredients: mainFermentedIngredients,
      flavorings: fermentedFlavorings,
      preparationMethod: hasFementation
    },
    isPescatarian: pescatarianScore === 0,
    pescatarianScore,
    nonPescatarianIngredients: nonPescatarianFound
  };
}

// For backward compatibility
export function calculateDietaryFlags(recipe: Recipe): {
  isLowFodmap: boolean;
  isFermented: boolean;
  isPescatarian: boolean;
} {
  const analysis = analyzeDietary(recipe);
  return {
    isLowFodmap: analysis.isLowFodmap,
    isFermented: analysis.isFermented,
    isPescatarian: analysis.isPescatarian
  };
} 