"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FERMENTED_FOODS = exports.HIGH_FODMAP_INGREDIENTS = void 0;
exports.analyzeDietary = analyzeDietary;
exports.calculateDietaryFlags = calculateDietaryFlags;
// FODMAP classification data with thresholds (in grams)
exports.HIGH_FODMAP_INGREDIENTS = {
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
exports.FERMENTED_FOODS = {
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
var NUT_INGREDIENTS = [
    // Tree nuts
    'almond', 'cashew', 'pecan', 'walnut', 'macadamia', 'pistachio', 'hazelnut', 'brazil nut',
    // Nut-derived ingredients
    'almond milk', 'almond flour', 'cashew milk', 'cashew cream',
    // Exclude peanut butter and seeds
    // 'peanut butter', 'sunflower seeds', 'pumpkin seeds', 'sesame seeds', 'chia seeds', 'flax seeds'
];
function analyzeIngredient(ingredient, targetItems) {
    var normalizedName = ingredient.name.toLowerCase();
    for (var _i = 0, targetItems_1 = targetItems; _i < targetItems_1.length; _i++) {
        var item = targetItems_1[_i];
        if (typeof item === 'string' && normalizedName.includes(item.toLowerCase())) {
            return { found: true, score: 1 };
        }
        if (typeof item === 'object') {
            if (normalizedName.includes(item.name.toLowerCase())) {
                // Convert amount to grams if needed
                var amountInGrams = ingredient.amount;
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
                var details = {
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
                    details: details
                };
            }
        }
    }
    return { found: false, score: 0 };
}
function analyzeDietary(recipe) {
    var fodmapDetails = [];
    var fermentedMainIngredients = [];
    var fermentedFlavorings = [];
    var fodmapScore = 0;
    var fermentationScore = 0;
    var hasNuts = false;
    recipe.ingredients.forEach(function (ingredient) {
        // FODMAP analysis
        for (var _i = 0, _a = Object.values(exports.HIGH_FODMAP_INGREDIENTS); _i < _a.length; _i++) {
            var category = _a[_i];
            var analysis = analyzeIngredient(ingredient, category);
            if (analysis.found && analysis.details) {
                fodmapDetails.push(analysis.details);
                fodmapScore += analysis.score;
            }
        }
        // Fermentation analysis
        for (var _b = 0, _c = Object.values(exports.FERMENTED_FOODS); _b < _c.length; _b++) {
            var category = _c[_b];
            var analysis = analyzeIngredient(ingredient, category);
            if (analysis.found && analysis.details) {
                if (analysis.details.role === 'main') {
                    fermentedMainIngredients.push(analysis.details.name);
                }
                else {
                    fermentedFlavorings.push(analysis.details.name);
                }
                fermentationScore += analysis.score;
            }
        }
        // Nut analysis
        var nutAnalysis = analyzeIngredient(ingredient, NUT_INGREDIENTS);
        if (nutAnalysis.found) {
            hasNuts = true;
        }
    });
    return {
        isLowFodmap: fodmapScore < 1,
        fodmapScore: fodmapScore,
        fodmapDetails: fodmapDetails,
        isFermented: fermentationScore > 0,
        fermentationScore: fermentationScore,
        fermentationDetails: {
            mainIngredients: fermentedMainIngredients,
            flavorings: fermentedFlavorings,
            preparationMethod: false
        },
        hasNuts: hasNuts,
        isPescatarian: recipe.isPescatarian
    };
}
// For backward compatibility
function calculateDietaryFlags(recipe) {
    var analysis = analyzeDietary(recipe);
    return {
        isLowFodmap: analysis.isLowFodmap,
        isFermented: analysis.isFermented,
        hasNuts: analysis.hasNuts,
        isPescatarian: analysis.isPescatarian
    };
}
