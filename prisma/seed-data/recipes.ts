// Recipe type definitions
type Difficulty = 'EASY' | 'MEDIUM' | 'HARD';
type MealType = 'BREAKFAST' | 'LUNCH' | 'DINNER' | 'SNACK' | 'DESSERT' | 'BEVERAGE' | 'SIDE' | 'MAIN';

interface Ingredient {
  name: string;
  amount: number;
  unit: string;
  notes?: string;
}

interface Instruction {
  stepNumber: number;
  description: string;
  imageUrl?: string | null; // Added optional imageUrl
}

interface NutritionFacts {
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
  sodium: number;
}

interface SeedRecipeRecipe {
  title: string;
  description: string;
  cookingTime: number;
  servings: number;
  difficulty: Difficulty;
  cuisineType: string;
  regionOfOrigin: string;
  imageUrl: string;
  calories: number;
  type: MealType;
  isVegetarian: boolean;
  isVegan: boolean;
  isGlutenFree: boolean;
  isLactoseFree: boolean;
  isNutFree: boolean;
  isFermented: boolean;
  isLowFodmap: boolean;
  ingredients: Ingredient[];
  instructions: Instruction[];
  nutritionFacts: NutritionFacts;
  notes?: string[];
  dietaryNotes?: {
    fermentationInfo?: string;
    fodmapInfo?: string;
    keyNutrients?: string;
    antiInflammatoryInfo?: string;
    fodmapModificationTips?: string;
    // Add any other potential keys within dietaryNotes if they exist
};
}
export type { SeedRecipeRecipe };
export const seedRecipes: SeedRecipeRecipe[] = [
  {
    "title": "Quinoa Buddha Bowl",
    "description": "A vibrant and nutritious bowl featuring protein-rich quinoa, roasted sweet potatoes, crispy chickpeas, fresh kale, sweetcorn, avocado, tomato, cucumber, and parsley, all drizzled with a creamy tahini dressing. This balanced meal combines different textures and flavors for a satisfying and healthy dining experience.",
    "cookingTime": 45,
    "servings": 2,
    "difficulty": "EASY",
    "cuisineType": "South America", // Or "Global Fusion" if you prefer the previous update
    "regionOfOrigin": "Peru", // Or "Various" if you prefer the previous update
    "imageUrl": "/images/recipes/quinoa_buddha_bowl2.jpg",
    "calories": 550,
    "type": "LUNCH",
    "isVegetarian": true,
    "isVegan": true,
    "isGlutenFree": true,
    "isPescatarian": false,
    "isLactoseFree": true,
    "isNutFree": true,
    "isFermented": false,
    "isLowFodmap": false,
    "ingredients": [
      { "name": "Quinoa", "amount": 170, "unit": "g", "notes": "approx 1 cup, rinsed and drained" },
      { "name": "Water", "amount": 474, "unit": "g", "notes": "approx 2 cups, for cooking quinoa" },
      { "name": "Sweet Potato", "amount": 1, "unit": "medium", "notes": "peeled and cut into 1-inch cubes" },
      { "name": "Chickpeas", "amount": 1, "unit": "can", "notes": "15 oz can, drained, rinsed, and patted dry" },
      { "name": "Kale", "amount": 134, "unit": "g", "notes": "approx 2 cups, stems removed, leaves torn" },
      { "name": "Olive Oil", "amount": 3, "unit": "tablespoons", "notes": "divided (2 for roasting, 1 for kale)" },
      { "name": "Tahini", "amount": 3, "unit": "tablespoons", "notes": "well-stirred" },
      { "name": "Lemon Juice", "amount": 2, "unit": "tablespoons", "notes": "freshly squeezed" },
      { "name": "Garlic", "amount": 1, "unit": "clove", "notes": "minced" },
      { "name": "Maple Syrup", "amount": 1, "unit": "teaspoon", "notes": "adjust to taste" },
      { "name": "Sea Salt", "amount": 1.25, "unit": "teaspoon", "notes": "divided (1/4 for quinoa, 1/2 for roasting, pinch for kale, 1/4 for dressing)" },
      { "name": "Black Pepper", "amount": 0.5, "unit": "teaspoon", "notes": "freshly ground" },
      { "name": "Cumin", "amount": 1, "unit": "teaspoon", "notes": "ground, divided" },
      { "name": "Paprika", "amount": 0.5, "unit": "teaspoon", "notes": "smoked or sweet" },
      { "name": "Warm Water", "amount": 3, "unit": "tablespoons", "notes": "for thinning tahini dressing" },
      { "name": "Sweetcorn", "amount": 150, "unit": "g", "notes": "approx 1 cup, frozen or canned (drained)" },
      { "name": "Avocado", "amount": 1, "unit": "medium", "notes": "sliced or cubed" },
      { "name": "Tomato", "amount": 1, "unit": "medium", "notes": "diced" },
      { "name": "Cucumber", "amount": 0.5, "unit": "medium", "notes": "diced" },
      { "name": "Parsley", "amount": 2, "unit": "tablespoons", "notes": "fresh, chopped" }
    ],
    "instructions": [
      {
        "stepNumber": 1,
        "description": "Preheat oven to 400°F (200°C). Line two baking sheets with parchment paper.",
        "imageUrl": "/recipe_step_images/quinoa_buddha_bowl/quinoa_buddha_bowl_1.png"
      },
      {
        "stepNumber": 2,
        "description": "Rinse the Quinoa thoroughly. In a saucepan, combine quinoa, cooking Water, and 1/4 teaspoon Sea Salt. Bring to a boil, then reduce heat, cover, and simmer for 15-20 minutes until water is absorbed. Fluff with a fork.",
        "imageUrl": "/recipe_step_images/quinoa_buddha_bowl/quinoa_buddha_bowl_2.png"
      },
      {
        "stepNumber": 3,
        "description": "On one baking sheet, toss cubed Sweet Potato with 1 tablespoon Olive Oil, 1/4 teaspoon Sea Salt, half the Cumin, and the Paprika. On the second sheet, toss rinsed Chickpeas with 1 tablespoon Olive Oil, 1/4 teaspoon Sea Salt, and the remaining Cumin. Roast both sheets for 20-25 minutes until sweet potato is tender and chickpeas are crispy.",
        "imageUrl": "/recipe_step_images/quinoa_buddha_bowl/quinoa_buddha_bowl_3.png"
      },
      {
        "stepNumber": 4,
        "description": "Prepare the dressing: In a small bowl, whisk together Tahini, fresh Lemon Juice, minced Garlic, Maple Syrup, 1/4 teaspoon Sea Salt, and Black Pepper. Gradually whisk in Warm Water until the dressing is smooth and pourable.",
        "imageUrl": "/recipe_step_images/quinoa_buddha_bowl/quinoa_buddha_bowl_4.png"
      },
      {
        "stepNumber": 5,
        "description": "Prepare the fresh components: Place torn Kale in a bowl, drizzle with 1 teaspoon Olive Oil and a pinch of Sea Salt, then massage until tender. Dice the Tomato and Cucumber. Slice or cube the Avocado. Chop the fresh Parsley. Ensure Sweetcorn is ready (thawed if frozen, drained if canned).",
        "imageUrl": "/recipe_step_images/quinoa_buddha_bowl/quinoa_buddha_bowl_5.png"
      },
      {
        "stepNumber": 6,
        "description": "Assemble the bowls: Divide the cooked Quinoa between two bowls. Top with roasted Sweet Potato, crispy Chickpeas, massaged Kale, Sweetcorn, diced Tomato, diced Cucumber, and Avocado slices. Drizzle generously with the prepared tahini dressing.",
        "imageUrl": "/recipe_step_images/quinoa_buddha_bowl/quinoa_buddha_bowl_6.png"
      },
      {
        "stepNumber": 7,
        "description": "Garnish the bowls with chopped fresh Parsley before serving."
        // "imageUrl": "/recipe_step_images/quinoa_buddha_bowl/quinoa_buddha_bowl_7.png" // Uncomment if you have an image for step 7
      }
    ],
    "notes": [
      "Ensure all vegetables like Tomato, Cucumber, and Avocado are fresh.",
      "Chopped Parsley adds brightness to the final dish.",
      "Adjust seasoning (Sea Salt, Black Pepper) to your preference.",
      "If using frozen Sweetcorn, thaw it first.",
      "The amount of Warm Water needed for the dressing may vary based on tahini consistency.",
      "Make sure Garlic is finely minced for the dressing."
    ],
    "dietaryNotes": {
      "fodmapInfo": "This bowl contains several ingredients that are moderate-to-high in FODMAPs, which may trigger symptoms in sensitive individuals. Key ingredients to be mindful of include: Chickpeas (GOS), Sweet Potato (Mannitol in servings > ~1/2 cup/75g), Garlic (Fructans), Avocado (Sorbitol, limit to ~1/8 per serving), Sweetcorn** (Sorbitol/Fructans, limit to ~1/4 cup/38g), and potentially Tahini (Fructans/GOS in servings > 2 tbsp). Many components are low-FODMAP, such as Quinoa, Kale, Olive Oil, Lemon Juice, Maple Syrup, Tomato, Cucumber, Parsley, Cumin, Paprika, Salt, and Peppe*.\n    *   Low-FODMAP Modifications: Replace garlic with garlic-infused olive oil. Swap chickpeas for canned lentils (rinsed, limit to 1/2 cup per serving) or firm tofu. Limit sweet potato, avocado, sweetcorn, and tahini to low-FODMAP portion sizes as indicated above, or omit them.",
      "keyNutrients": "Quinoa and Chickpeas provide complete plant-based protein and significant fiber. Sweet Potato is rich in Vitamin A (beta-carotene) and Vitamin C. Kale is an excellent source of Vitamin K, Vitamin A, and Vitamin C. Healthy monounsaturated fats come from Olive Oil, Avocado, and Tahini. You'll also get a good range of B vitamins (like Folate from chickpeas, quinoa, avocado, and Thiamin from quinoa, tahini) and minerals including Manganese (quinoa, sweet potato, chickpeas, kale), Magnesium, and Phosphorus (quinoa).",
      "antiInflammatoryInfo": "The Extra Virgin Olive Oil and Avocado provide healthy monounsaturated fats and beneficial compounds. Kale, Sweet Potato, Tomato, and other colourful vegetables contribute antioxidants and phytonutrients. **Quinoa** contains flavonoids like quercetin. Spices like Cumin, Paprika, and Black Pepper also possess anti-inflammatory potential. Overall, the combination of healthy fats, high fiber, antioxidants, vitamins, and minerals supports an anti-inflammatory eating pattern."
    },
    "nutritionFacts": {
      "protein": 18,
      "carbs": 75,
      "fat": 20,
      "fiber": 15,
      "sugar": 10,
      "sodium": 550
    }
  },
  {
    "title": "味噌汁 (Misoshiru)",
    "description": "A soul-warming traditional Japanese soup featuring a delicate dashi broth enriched with umami-rich miso paste, silky soft tofu, tender wakame seaweed, and fresh green onions. This nourishing soup is a cornerstone of Japanese cuisine, traditionally served for breakfast but perfect for any time of day.",
    "cookingTime": 20,
    "servings": 4,
    "difficulty": "EASY",
    "cuisineType": "Asia",
    "regionOfOrigin": "Japan",
    "imageUrl": "/images/recipes/misoshiru.jpg",
    "calories": 120,
    "type": "BREAKFAST",
    "isVegetarian": true,
    "isVegan": true,
    "isGlutenFree": true,
    "isPescatarian": false,
    "isLactoseFree": true,
    "isNutFree": true,
    "isFermented": true,
    "isLowFodmap": false,
    "ingredients": [
      { "name": "Dashi Stock", "amount": 948, "unit": "g", "notes": "approx 4 cups, kombu and shiitake based for vegan version" },
      { "name": "Kombu (Dried Kelp)", "amount": 1, "unit": "piece", "notes": "4-inch square piece" },
      { "name": "Dried Shiitake Mushrooms", "amount": 2, "unit": "pieces" },
      { "name": "White Miso Paste", "amount": 4, "unit": "tablespoons", "notes": "or mix white and yellow miso" },
      { "name": "Soft Tofu", "amount": 14, "unit": "ounces", "notes": "cut into 1/2-inch cubes" },
      { "name": "Dried Wakame Seaweed", "amount": 2, "unit": "tablespoons", "notes": "rehydrated" },
      { "name": "Green Onions", "amount": 3, "unit": "stalks", "notes": "finely chopped" },
      { "name": "Fresh Shiitake Mushrooms", "amount": 4, "unit": "pieces", "notes": "thinly sliced (optional)" },
      { "name": "Water", "amount": 948, "unit": "g", "notes": "approx 4 cups, filtered, for dashi" }
    ],
    "instructions": [
      { "stepNumber": 1, "description": "To make dashi: Wipe the kombu piece with a damp cloth (do not wash). Place kombu and dried shiitake in 948 grams cold water in a medium saucepan. Let steep for 30 minutes.", "imageUrl": "/recipe_step_images/Misoshiru/1.png" },
      { "stepNumber": 2, "description": "Place the saucepan over medium heat. Remove the kombu just before the water comes to a boil (this prevents bitterness). Let shiitake simmer for 5 minutes, then remove. This is your dashi stock.", "imageUrl": "/recipe_step_images/Misoshiru/2.png" },
      { "stepNumber": 3, "description": "While making dashi, place wakame in a small bowl with cold water. Soak for 5-10 minutes until rehydrated. Drain and set aside.", "imageUrl": "/recipe_step_images/Misoshiru/3.png" },
      { "stepNumber": 4, "description": "Reduce heat to low. Place miso paste in a small bowl. Add about 119 grams of the warm dashi and whisk until the miso is completely dissolved with no lumps.", "imageUrl": "/recipe_step_images/Misoshiru/4.png" },
      { "stepNumber": 5, "description": "Add the dissolved miso back to the pot with the remaining dashi. Keep the soup below a simmer to preserve the probiotics in the miso.", "imageUrl": "/recipe_step_images/Misoshiru/5.png" },
      { "stepNumber": 6, "description": "Gently add the cubed tofu and rehydrated wakame. If using fresh shiitake, add them now. Heat until the tofu is warmed through, about 2-3 minutes.", "imageUrl": "/recipe_step_images/Misoshiru/6.png" },
      { "stepNumber": 7, "description": "Taste and adjust the miso seasoning if needed. Different types of miso have varying levels of saltiness.", "imageUrl": "/recipe_step_images/Misoshiru/7.png" },
      { "stepNumber": 8, "description": "Divide into serving bowls and garnish with chopped green onions. Serve immediately while hot.", "imageUrl": "/recipe_step_images/Misoshiru/8.png" }
    ],
    "notes": [
      "For non-vegan version, use bonito-based dashi instead of kombu-shiitake dashi.",
      "Don't boil the soup after adding miso to preserve its probiotic benefits.",
      "Store any leftover dashi stock in the refrigerator for up to 3 days.",
      "You can add other vegetables like spinach or daikon radish.",
      "The type of miso used will affect the flavor - white miso is milder, while darker miso is stronger.",
      "To save time, you can use instant dashi, though homemade has better flavor."
    ],
    "dietaryNotes": {
      "fermentationInfo": "Contains Miso Paste, a traditional Japanese seasoning produced by fermenting soybeans with salt and kōji (a fungus, Aspergillus oryzae) and sometimes rice, barley, or other ingredients.",
      "fodmapInfo": "High-FODMAP ingredients include Shiitake Mushrooms (mannitol) and Soft/Silken Tofu (fructans/GOS). Low-FODMAP ingredients include Kombu, Wakame, Green Onions (green parts only), and Dashi (check instant versions for additives like onion/garlic powder). Miso paste is low FODMAP in servings up to 2 tablespoons.",
      "fodmapModificationTips": "Use firm or extra-firm tofu instead of soft/silken. Use only the green parts of the green onions. Omit shiitake mushrooms or limit intake to a very small amount (e.g., 1-2 slices per serving). Ensure dashi is homemade or certified low FODMAP.",
      "keyNutrients": "Miso paste offers manganese, vitamin K, copper, and zinc. Tofu is a good source of calcium, manganese, selenium, protein, and iron. Wakame seaweed provides iodine, manganese, folate (B9), and magnesium. Kombu is rich in iodine and calcium. Shiitake mushrooms contain selenium, copper, zinc, and vitamin B5 (pantothenic acid). Green onions contribute vitamin K and vitamin C.",
      "antiInflammatoryInfo": "Several ingredients possess anti-inflammatory potential. Miso paste (fermented, isoflavones) and the probiotics it may contain support gut health. Seaweeds like Wakame and Kombu provide unique antioxidants (e.g., fucoxanthin). Shiitake mushrooms offer immune-modulating polysaccharides and antioxidants like selenium. Tofu adds isoflavones, and Green Onions contribute antioxidants like quercetin and vitamin C. The combination of these ingredients provides minerals and compounds that support overall immune function and antioxidant systems."
    },
    "nutritionFacts": {
      "protein": 8,
      "carbs": 12,
      "fat": 4,
      "fiber": 2,
      "sugar": 1,
      "sodium": 800
    }
  },
    {
      "title": "Kimchi Sundubu Jjigae (Soft Tofu Stew with Kimchi)",
      "description": "A rich and spicy Korean stew featuring soft silken tofu (sundubu) and fermented kimchi, often cooked with pork belly for extra flavor, and finished with a fresh egg cracked directly into the bubbling pot.",
      "cookingTime": 25,
      "servings": 2,
      "difficulty": "MEDIUM",
      "cuisineType": "Asia",
      "regionOfOrigin": "South Korea",
      "imageUrl": "/images/recipes/Kimchi Sundubu Jjigae.webp",
      "calories": 450,
      "type": "MAIN",
      "isVegetarian": false,
      "isVegan": false,
      "isGlutenFree": false,
      "isPescatarian": false,
      "isLactoseFree": true,
      "isNutFree": true,
      "isFermented": true,
      "isLowFodmap": false,
      "ingredients": [
        { "name": "Neutral Oil", "amount": 14, "unit": "g", "notes": "e.g., vegetable, canola (approx 1 tbsp)" },
        { "name": "Onion", "amount": 40, "unit": "g", "notes": "finely chopped (approx 1/4 cup)" },
        { "name": "Garlic", "amount": 1, "unit": "clove", "notes": "minced" },
        { "name": "Pork Belly", "amount": 70, "unit": "g", "notes": "thinly sliced (optional)" },
        { "name": "Kimchi", "amount": 165, "unit": "g", "notes": "chopped, preferably aged/sour (approx 1 cup)" },
        { "name": "Gochugaru", "amount": 9, "unit": "g", "notes": "Korean chili flakes, adjust to taste (approx 1 tbsp)" },
        { "name": "Fish Sauce", "amount": 15, "unit": "g", "notes": "or soy sauce (use tamari for GF) (approx 1 tbsp)" },
        { "name": "Gochujang", "amount": 9, "unit": "g", "notes": "Korean chili paste (approx 1/2 tbsp)" },
        { "name": "Sugar", "amount": 4, "unit": "g", "notes": "(approx 1 tsp)" },
        { "name": "Water", "amount": 120, "unit": "g", "notes": "or anchovy/kelp stock (approx 120ml or 1/2 cup)" },
        { "name": "Sundubu (Silken Tofu)", "amount": 350, "unit": "g", "notes": "1 tube, Korean soft silken tofu" },
        { "name": "Egg", "amount": 1, "unit": "large", "notes": "room temperature" },
        { "name": "Green Onion", "amount": 0.5, "unit": "stalk", "notes": "chopped, for garnish" },
        { "name": "Sesame Oil", "amount": 2, "unit": "g", "notes": "for finishing (approx 1/2 tsp)" }
      ],
      "instructions": [
        { "stepNumber": 1, "description": "Heat neutral oil in a Korean earthenware pot (ttukbaegi) or a small heavy-bottomed pot over medium heat.", "imageUrl": "/recipe_step_images/Kimchi_Sundubu_Jjigae/1.png" },
        { "stepNumber": 2, "description": "Add chopped onion, minced garlic, and sliced pork belly (if using). Sauté until the pork is mostly cooked through, about 3-4 minutes.", "imageUrl": "/recipe_step_images/Kimchi_Sundubu_Jjigae/2.png" },
        { "stepNumber": 3, "description": "Add the chopped kimchi and cook, stirring occasionally, until it softens slightly, about 2-3 minutes.", "imageUrl": "/recipe_step_images/Kimchi_Sundubu_Jjigae/3.png" },
        { "stepNumber": 4, "description": "Stir in gochugaru, fish sauce (or soy sauce), gochujang, and sugar. Cook for about 30 seconds, stirring constantly, until fragrant.", "imageUrl": "/recipe_step_images/Kimchi_Sundubu_Jjigae/4.png" },
        { "stepNumber": 5, "description": "Pour in the water (or stock) and bring the mixture to a boil.", "imageUrl": "/recipe_step_images/Kimchi_Sundubu_Jjigae/5.png" },
        { "stepNumber": 6, "description": "Cut the sundubu tube package in half and carefully squeeze the tofu directly into the boiling stew. Use a spoon to gently break it into large, soft curds.", "imageUrl": "/recipe_step_images/Kimchi_Sundubu_Jjigae/6.png" },
        { "stepNumber": 7, "description": "Let the stew boil gently for another 3-4 minutes to allow the flavors to meld and the tofu to heat through.", "imageUrl": "/recipe_step_images/Kimchi_Sundubu_Jjigae/7.png" },
        { "stepNumber": 8, "description": "Reduce the heat to low. Make a small well in the center of the stew and carefully crack the egg into it.", "imageUrl": "/recipe_step_images/Kimchi_Sundubu_Jjigae/8.png" },
        { "stepNumber": 9, "description": "Garnish with chopped green onions and drizzle with sesame oil.", "imageUrl": "/recipe_step_images/Kimchi_Sundubu_Jjigae/9.png" },
        { "stepNumber": 10, "description": "Serve immediately while bubbling hot, typically with a bowl of steamed rice on the side.", "imageUrl": "/recipe_step_images/Kimchi_Sundubu_Jjigae/10.png" }
      ],
      "notes": [
        "Using well-fermented, sour kimchi yields the best flavor for this stew.",
        "The earthenware pot (ttukbaegi) retains heat well, keeping the stew bubbling hot at the table.",
        "Adjust the amount of gochugaru (approx 9g/tbsp) and gochujang (approx 18g/tbsp) to control the spice level.",
        "Pork belly (70g) is optional; you can substitute with thinly sliced beef, seafood (like shrimp or clams), or mushrooms for a vegetarian option (also omit fish sauce).",
        "Be gentle when breaking up the tofu to maintain large, soft curds.",
        "Serve piping hot with rice and potentially other Korean side dishes (banchan).",
        "Weight conversions for tbsp/tsp are approximate."
      ],
      "dietaryNotes": {
        "fermentationInfo": "Contains Kimchi (fermented Napa cabbage and vegetables), Gochujang (fermented chili paste), and Fish Sauce (fermented fish).",
        "fodmapInfo": "High-FODMAP ingredients include Kimchi (fructans/mannitol), Garlic (fructans), Onion (fructans), Gochujang (fructans), Silken Tofu (fructans/GOS), and potentially Fish Sauce/Soy Sauce (check ingredients). Low-FODMAP ingredients include Neutral Oil, Pork Belly, Sugar, Water, Egg, Green Onion (green parts only), Sesame Oil.",
        "fodmapModificationTips": "This dish is generally high FODMAP and requires significant changes. Consider using garlic/onion-free kimchi (if available) or limit portion to low-FODMAP amount (check Monash app). Omit garlic and onion (use garlic/onion-infused oil instead). Replace silken tofu with firm or extra-firm tofu. Use low-FODMAP gochujang substitute or omit. Ensure sauces (fish/soy) are low FODMAP. Use only green parts of green onions.",
        "keyNutrients": "Kimchi is rich in probiotics, vitamin K, vitamin C, and vitamin A. Pork belly provides B vitamins and selenium. Tofu offers calcium, manganese, selenium, protein and iron. Gochugaru is rich in Vitamin A (capsanthin) and Vitamin C. Gochujang adds some vitamins/minerals depending on ingredients. Fish sauce provides sodium and B vitamins. Eggs provide protein, vitamin D, vitamin B12, choline, and selenium. Green onion adds Vitamin K, C. Sesame oil offers Vitamin E, K.",
        "antiInflammatoryInfo": "This stew contains several ingredients with anti-inflammatory potential. Kimchi and Gochujang, being fermented, support gut health. Gochugaru and Gochujang provide capsaicin, known for its anti-inflammatory effects. Garlic and onions contribute beneficial sulfur compounds and antioxidants like quercetin. Tofu adds isoflavones, and sesame oil contains antioxidants like sesamol and Vitamin E.",
      },
      "nutritionFacts": {
        "protein": 25,
        "carbs": 15,
        "fat": 30,
        "fiber": 4,
        "sugar": 5,
        "sodium": 1200
      }
    },
  {
    "title": "肉骨茶 (Bak Kut Teh)",
    "description": "A nourishing pork rib soup that originated from Singapore and Malaysia, featuring tender pork ribs simmered in a rich, aromatic broth infused with garlic, white pepper, and Chinese herbs. Despite its name meaning \"meat bone tea\", the dish contains no tea - it was traditionally served with Chinese tea on the side.",
    "cookingTime": 120,
    "servings": 4,
    "difficulty": "MEDIUM",
    "cuisineType": "Asia",
    "regionOfOrigin": "Singapore",
    "imageUrl": "/images/recipes/bak-kut-teh.jpg",
    "calories": 450,
    "type": "MAIN",
    "isVegetarian": false,
    "isVegan": false,
    "isGlutenFree": true,
    "isPescatarian": false,
    "isLactoseFree": true,
    "isNutFree": true,
    "isFermented": true,
    "isLowFodmap": false,
    "ingredients": [
      { "name": "Pork Ribs", "amount": 1, "unit": "kg", "notes": "preferably meaty prime ribs, cut into individual pieces" },
      { "name": "Garlic", "amount": 20, "unit": "cloves", "notes": "whole, lightly smashed" },
      { "name": "White Peppercorns", "amount": 2, "unit": "tbsp", "notes": "lightly crushed" },
      { "name": "Star Anise", "amount": 3, "unit": "pieces", "notes": "whole" },
      { "name": "Cinnamon Stick", "amount": 1, "unit": "piece", "notes": "2-inch length" },
      { "name": "Light Soy Sauce", "amount": 3, "unit": "tbsp", "notes": "or to taste" },
      { "name": "Dark Soy Sauce", "amount": 1, "unit": "tbsp", "notes": "for color" },
      { "name": "White Pepper Powder", "amount": 1, "unit": "tsp", "notes": "for seasoning" },
      { "name": "Salt", "amount": 1, "unit": "tsp", "notes": "or to taste" },
      { "name": "Water", "amount": 2.5, "unit": "liters", "notes": "approx 2500g for cooking" },
      { "name": "Shiitake Mushrooms", "amount": 6, "unit": "pieces", "notes": "dried, soaked and halved (optional)" },
      { "name": "Chinese Cooking Wine", "amount": 1, "unit": "tbsp", "notes": "optional" }
    ],
    "instructions": [
      { "stepNumber": 1, "description": "Clean the pork ribs thoroughly and blanch in boiling water for 5 minutes to remove impurities. Drain and rinse with cold water." },
      { "stepNumber": 2, "description": "In a large pot, bring 2.5 liters (approx 2500 grams) of water to a boil. Add blanched pork ribs, garlic cloves, white peppercorns, star anise, and cinnamon stick." },
      { "stepNumber": 3, "description": "Once boiling, reduce heat to low, cover, and simmer for 1 hour, occasionally skimming off any foam that rises to the surface." },
      { "stepNumber": 4, "description": "Add both soy sauces, white pepper powder, and salt. If using, add shiitake mushrooms and Chinese cooking wine." },
      { "stepNumber": 5, "description": "Continue simmering for another 30-45 minutes until the meat is very tender and easily falls off the bone." },
      { "stepNumber": 6, "description": "Taste and adjust seasoning with additional soy sauce, white pepper, or salt if needed." },
      { "stepNumber": 7, "description": "Serve hot in individual bowls with the broth and garlic cloves. Traditionally accompanied by rice, Chinese tea, and youtiao (Chinese crullers)." }
    ],
    "notes": [
      "The key to a clear broth is proper blanching of the meat and gentle simmering",
      "Don't skip the blanching step - it removes impurities and results in a cleaner-tasting soup",
      "The garlic cloves should be left whole and lightly smashed - they will become soft and sweet during cooking",
      "Traditional accompaniments include youtiao (Chinese crullers), rice, and Chinese tea",
      "Leftovers can be stored in the refrigerator for up to 3 days - the flavor often improves the next day",
      "For additional flavor, you can add other herbs like dong gui (angelica root) or dang shen (codonopsis root)",
      "Fermented Ingredients: Contains **Light Soy Sauce** and **Dark Soy Sauce** (made from fermented soybeans), and optionally **Chinese Cooking Wine** (Shaoxing wine or similar, made from fermented rice).",
      "FODMAP Information: High-FODMAP ingredients include Garlic (fructans, large quantity). Shiitake Mushrooms (mannitol) are moderate-to-high depending on portion size. Soy Sauce is high FODMAP in servings > 2 teaspoons. Low-FODMAP ingredients include Pork Ribs, White Peppercorns, Star Anise, Cinnamon Stick, Salt, and Water. Chinese Cooking Wine is generally low FODMAP in 1 tbsp servings.",
      "Low-FODMAP Modification Tips: Omit garlic cloves entirely (the large quantity makes infused oil insufficient). Omit or strictly limit shiitake mushrooms (e.g., 1-2 small mushrooms per serving). Limit total soy sauce to 2 teaspoons per serving.",
      "Vitamins & Minerals: Pork Ribs provide protein, selenium, phosphorus, zinc, and B vitamins (especially B1, B3, B6, B12). Garlic contains manganese, vitamin B6, and vitamin C. Soy Sauce contributes sodium and manganese. Shiitake mushrooms offer selenium, copper, zinc, and vitamin B5. White Peppercorns contain manganese and iron. Star Anise and Cinnamon provide antioxidants and trace minerals."
    ],
    "nutritionFacts": {
      "protein": 35,
      "carbs": 10,
      "fat": 30,
      "fiber": 2,
      "sugar": 1,
      "sodium": 600
    }
  },
  {
    "title": "Ogokbap: 오곡밥 (Ogokbap)",
    "description": "A traditional Korean mixed grain rice dish that symbolizes abundance and good fortune. Made with five different grains, this nutritious dish is traditionally eaten during Korean holidays, especially Lunar New Year, but is now enjoyed year-round for its health benefits and nutty flavor.",
    "cookingTime": 60,
    "servings": 6,
    "difficulty": "MEDIUM",
    "cuisineType": "Asia",
    "regionOfOrigin": "South Korea",
    "imageUrl": "/images/recipes/ogokbap.jpg",
    "calories": 250,
    "type": "MAIN",
    "isVegetarian": true,
    "isVegan": true,
    "isGlutenFree": true,
    "isPescatarian": false,
    "isLactoseFree": true,
    "isNutFree": true,
    "isFermented": false,
    "isLowFodmap": false,
    "ingredients": [
      { "name": "Short Grain Rice", "amount": 380, "unit": "g", "notes": "approx 2 cups, pref Korean, rinsed" },
      { "name": "Millet", "amount": 100, "unit": "g", "notes": "approx 0.5 cup, rinsed" },
      { "name": "Black Rice", "amount": 90, "unit": "g", "notes": "approx 0.5 cup, forbidden rice, rinsed" },
      { "name": "Red Beans", "amount": 93, "unit": "g", "notes": "approx 0.5 cup adzuki/pat beans, soaked" },
      { "name": "Sorghum", "amount": 48, "unit": "g", "notes": "approx 0.25 cup, rinsed" },
      { "name": "Glutinous Rice", "amount": 46, "unit": "g", "notes": "approx 0.25 cup, sweet rice, rinsed" },
      { "name": "Salt", "amount": 1, "unit": "tsp", "notes": "or to taste" },
      { "name": "Water", "amount": 1067, "unit": "g", "notes": "approx 4.5 cups, adjust based on grain freshness" }
    ],
    "instructions": [
      { "stepNumber": 1, "description": "The night before, wash all grains separately. Soak the red beans and black rice overnight in separate bowls. Soak the remaining grains for at least 3 hours before cooking." },
      { "stepNumber": 2, "description": "Drain the red beans and place in a pot with 474 grams of water. Bring to a boil, then reduce heat and simmer for about 30 minutes or until tender but not mushy. Drain and set aside." },
      { "stepNumber": 3, "description": "Drain all the soaked grains. Combine the short grain rice, millet, black rice, sorghum, and glutinous rice in a heavy-bottomed pot or rice cooker." },
      { "stepNumber": 4, "description": "Add the cooked red beans and 1067 grams of water. Add salt and gently stir to combine." },
      { "stepNumber": 5, "description": "If using a rice cooker: Select the mixed grain setting and cook. If using a pot: Bring to a boil over high heat, then reduce to low, cover tightly, and simmer for 20 minutes." },
      { "stepNumber": 6, "description": "Once cooking is complete, let the rice rest for 10 minutes without opening the lid." },
      { "stepNumber": 7, "description": "Gently fluff the rice with a rice paddle or wooden spoon, ensuring the grains are well mixed." },
      { "stepNumber": 8, "description": "Serve hot, traditionally with various banchan (Korean side dishes)." }
    ],
    "notes": [
      "The ratio of grains can be adjusted to preference, but maintain the total grain amount",
      "Proper soaking is crucial for even cooking and the best texture",
      "The cooking time may vary depending on the age of the grains and the specific rice cooker",
      "For extra nutrition, you can add other grains like quinoa or barley",
      "Leftover ogokbap can be refrigerated for up to 3 days and reheated in the microwave with a sprinkle of water",
      "Traditional Korean holidays like Lunar New Year (Seollal) and Harvest Festival (Chuseok) always feature this dish",
      "FODMAP Information: High-FODMAP ingredients include Red Beans (GOS - galacto-oligosaccharides) and Black Rice (GOS - moderate/high depending on portion size). Low-FODMAP ingredients include Millet, Sorghum, Short Grain Rice, and Glutinous Rice (in typical serving sizes, but large combined portions might stack FODMAPs). Salt and water are low FODMAP.",
      "Low-FODMAP Modification Tips: Replace red beans with canned, rinsed lentils (limit to 1/4 cup cooked per serving) or omit entirely. Limit the portion size of black rice or omit. Carefully monitor overall portion size of the final dish to avoid FODMAP stacking.",
      "Vitamins & Minerals: Short Grain Rice provides manganese and selenium. Millet is a good source of phosphorus, magnesium, and manganese. Black Rice offers anthocyanins (antioxidants), iron, vitamin E, and fiber. Red Beans (Adzuki beans) are rich in folate (B9), manganese, phosphorus, iron, copper, and potassium. Sorghum contains magnesium, phosphorus, iron, B vitamins and antioxidants. Glutinous Rice mainly provides carbohydrates and some manganese."
    ],
    "nutritionFacts": {
      "protein": 8,
      "carbs": 45,
      "fat": 2,
      "fiber": 5,
      "sugar": 1,
      "sodium": 10
    }
  },
  {
    "title": "炒刀削面 (Chao Dao Xiao Mian)",
    "description": "A traditional Shanxi noodle dish where thin slices of dough are skillfully shaved directly into boiling soup, creating fresh, tender noodles with a unique texture. This knife-cut noodle technique requires special skill, making each bowl a demonstration of culinary craftsmanship.",
    "cookingTime": 45,
    "servings": 2,
    "difficulty": "HARD",
    "cuisineType": "Asia",
    "regionOfOrigin": "China",
    "imageUrl": "/images/recipes/chao-dao-xiao-mian-5.jpg",
    "calories": 400,
    "type": "MAIN",
    "isVegetarian": false,
    "isVegan": false,
    "isGlutenFree": false,
    "isPescatarian": false,
    "isLactoseFree": true,
    "isNutFree": true,
    "isFermented": false,
    "isLowFodmap": false,
    "ingredients": [
      { "name": "Flour", "amount": 300, "unit": "g" },
      { "name": "Water", "amount": 150, "unit": "ml", "notes": "approx 150g" },
      { "name": "Beef", "amount": 200, "unit": "g", "notes": "sliced" },
      { "name": "Beef Broth", "amount": 1, "unit": "liter", "notes": "approx 1000g" }
    ],
    "instructions": [
      { "stepNumber": 1, "description": "Make a stiff dough with flour and water." },
      { "stepNumber": 2, "description": "Rest dough for 30 minutes." },
      { "stepNumber": 3, "description": "Prepare boiling broth with beef." },
      { "stepNumber": 4, "description": "Shave dough directly into boiling broth." }
    ],
    "notes": [
      "Requires special knife technique",
      "Can be served with various toppings",
      "FODMAP Information: High-FODMAP ingredient is wheat Flour (fructans). Beef Broth is often high FODMAP due to added onion and garlic. Low-FODMAP ingredients are Beef and Water.",
      "Low-FODMAP Modification Tips: Use a gluten-free flour blend suitable for noodles (texture will differ significantly). Ensure the beef broth is certified low FODMAP or homemade without onion/garlic.",
      "Vitamins & Minerals: Flour (if enriched) provides iron and B vitamins (thiamin, riboflavin, niacin, folate); whole wheat flour adds fiber and manganese. Beef is an excellent source of protein, iron, zinc, selenium, and Vitamin B12. Beef Broth can provide sodium and potentially collagen and minerals if made from bones."
    ],
    "nutritionFacts": {
      "protein": 25,
      "carbs": 50,
      "fat": 15,
      "fiber": 2,
      "sugar": 1,
      "sodium": 500
    }
  },
  {
    "title": "ขนมจีนน้ำยาป่า (Khanom Jeen Nam Ya Pa)",
    "description": "A beloved Southern Thai dish featuring fermented rice noodles (khanom jeen) served with a rich, spicy fish curry sauce. This complex dish combines the subtle tang of fermented noodles with an aromatic curry made from fresh fish and a blend of Thai herbs and spices.",
    "cookingTime": 90,
    "servings": 4,
    "difficulty": "MEDIUM",
    "cuisineType": "Asia",
    "regionOfOrigin": "Thailand",
    "imageUrl": "/images/recipes/Khanom Jeen Nam Ya Pa .jpg",
    "calories": 380,
    "type": "MAIN",
    "isVegetarian": false,
    "isVegan": false,
    "isGlutenFree": false,
    "isPescatarian": true,
    "isLactoseFree": true,
    "isNutFree": true,
    "isFermented": true,
    "isLowFodmap": false,
    "ingredients": [
      { "name": "Khanom Jeen Noodles", "amount": 500, "unit": "g", "notes": "fresh or dried fermented rice noodles" },
      { "name": "White Fish Fillets", "amount": 400, "unit": "g", "notes": "firm white fish like sea bass or snapper, deboned" },
      { "name": "Coconut Milk", "amount": 400, "unit": "ml", "notes": "approx 400g, full-fat" },
      { "name": "Thai Red Curry Paste", "amount": 3, "unit": "tbsp", "notes": "preferably homemade" },
      { "name": "Lemongrass", "amount": 2, "unit": "stalks", "notes": "white part only, finely minced" },
      { "name": "Galangal", "amount": 2, "unit": "inches", "notes": "peeled and finely minced" },
      { "name": "Kaffir Lime Leaves", "amount": 4, "unit": "pieces", "notes": "finely sliced" },
      { "name": "Fish Sauce", "amount": 2, "unit": "tbsp", "notes": "or to taste" },
      { "name": "Palm Sugar", "amount": 1, "unit": "tbsp", "notes": "or to taste" },
      { "name": "Turmeric", "amount": 1, "unit": "tsp", "notes": "fresh, grated" },
      { "name": "Shrimp Paste", "amount": 1, "unit": "tsp", "notes": "roasted" },
      { "name": "Bean Sprouts", "amount": 200, "unit": "g", "notes": "fresh" },
      { "name": "Long Beans", "amount": 100, "unit": "g", "notes": "cut into 2-inch lengths" },
      { "name": "Thai Basil", "amount": 25, "unit": "g", "notes": "approx 1 cup, leaves only" },
      { "name": "Lime Wedges", "amount": 4, "unit": "pieces", "notes": "for serving" }
    ],
    "instructions": [
      { "stepNumber": 1, "description": "If using dried khanom jeen noodles, soak in room temperature water for 15 minutes, then cook in boiling water until tender. If using fresh noodles, simply warm them up." },
      { "stepNumber": 2, "description": "Clean the fish thoroughly and cut into large chunks. Poach gently in simmering water until just cooked through, about 5 minutes. Remove, let cool slightly, and flake the meat, discarding any bones." },
      { "stepNumber": 3, "description": "In a mortar and pestle or food processor, combine curry paste, lemongrass, galangal, and turmeric. Pound or process until a fine paste forms." },
      { "stepNumber": 4, "description": "In a large pot, heat half the coconut milk over medium heat until it starts to split (the oil separates). Add the curry paste mixture and fry until fragrant, about 5 minutes." },
      { "stepNumber": 5, "description": "Add the remaining coconut milk, fish sauce, palm sugar, and shrimp paste. Stir well and bring to a simmer." },
      { "stepNumber": 6, "description": "Add the flaked fish and simmer for 5 minutes. Taste and adjust seasoning with additional fish sauce or palm sugar if needed." },
      { "stepNumber": 7, "description": "Add the kaffir lime leaves and stir gently. Cook for another minute." },
      { "stepNumber": 8, "description": "Serve the curry over warm noodles. Garnish with bean sprouts, long beans, Thai basil, and lime wedges." }
    ],
    "notes": [
      "Can be made spicier to taste",
      "Traditionally served with vegetables",
      "Fermented Ingredients: Contains **Khanom Jeen noodles** (traditionally made from fermented rice, though commercial versions vary), **Fish Sauce** (made from fermented fish, usually anchovies), and **Shrimp Paste** (made from fermented ground shrimp).",
      "FODMAP Information: High-FODMAP ingredients typically include Thai Red Curry Paste (contains garlic/onion - fructans), Lemongrass (fructans - moderate/high), Galangal (fructans - moderate/high), Shrimp Paste (check ingredients/portion), and Coconut Milk (sorbitol in servings > 60g / 1/4 cup). Fish sauce can be high (check ingredients). Khanom Jeen noodles themselves may be high FODMAP. Low-FODMAP ingredients include White Fish, Kaffir Lime Leaves, Palm Sugar (pure glucose/sucrose is low, check type), Turmeric, Bean Sprouts, Long Beans (limit portion), Thai Basil, and Lime.",
      "Low-FODMAP Modification Tips: Use homemade low-FODMAP curry paste (without onion/garlic, using infused oils). Strictly limit lemongrass and galangal portions. Check fish sauce/shrimp paste for additives and limit portions. Limit coconut milk to 60g (1/4 cup) per serving. Substitute Khanom Jeen with plain rice vermicelli. Limit long beans to ~15 beans per serving.",
      "Vitamins & Minerals: White Fish provides protein, Omega-3 fatty acids (depending on type), Vitamin D, selenium, and iodine. Coconut Milk offers manganese, copper, iron, and medium-chain triglycerides. Thai Red Curry Paste components contribute Vitamin A & C (chilies), antioxidants (herbs/spices). Lemongrass and Galangal contain antioxidants. Fish Sauce provides sodium and niacin (B3). Shrimp Paste is high in sodium and calcium. Turmeric contains curcumin (antioxidant). Bean Sprouts offer Vitamin K and C. Long Beans provide Vitamin K, C, and fiber. Thai Basil contains Vitamin K. Lime Wedges supply Vitamin C."
    ],
    "nutritionFacts": {
      "protein": 22,
      "carbs": 45,
      "fat": 18,
      "fiber": 3,
      "sugar": 2,
      "sodium": 600
    }
  },
  {
    "title": "親子丼 (Oyakodon)",
    "description": "A classic Japanese comfort food dish where chicken and egg are simmered in a sweet and savory dashi-based sauce and served over steaming rice. The name \"oyako\" means parent-and-child, referring to the combination of chicken and egg in the dish.",
    "cookingTime": 20,
    "servings": 2,
    "difficulty": "EASY",
    "cuisineType": "Asia",
    "regionOfOrigin": "Japan",
    "imageUrl": "/images/recipes/oyakodon.jpg",
    "calories": 550,
    "type": "MAIN",
    "isVegetarian": false,
    "isVegan": false,
    "isGlutenFree": false,
    "isPescatarian": false,
    "isLactoseFree": true,
    "isNutFree": true,
    "isFermented": true,
    "isLowFodmap": false,
    "ingredients": [
      { "name": "Chicken Thigh", "amount": 300, "unit": "g", "notes": "skinless, cut into bite-sized pieces" },
      { "name": "Eggs", "amount": 3, "unit": "large", "notes": "room temperature, lightly beaten" },
      { "name": "Onion", "amount": 1, "unit": "medium", "notes": "thinly sliced" },
      { "name": "Dashi Stock", "amount": 200, "unit": "ml", "notes": "approx 200g, freshly made or instant" },
      { "name": "Soy Sauce", "amount": 2, "unit": "tbsp", "notes": "Japanese dark soy sauce (koikuchi)" },
      { "name": "Mirin", "amount": 2, "unit": "tbsp", "notes": "sweet rice wine" },
      { "name": "Sake", "amount": 1, "unit": "tbsp", "notes": "Japanese rice wine" },
      { "name": "Sugar", "amount": 1, "unit": "tsp", "notes": "or to taste" },
      { "name": "Green Onion", "amount": 2, "unit": "stalks", "notes": "finely chopped for garnish" },
      { "name": "Steamed Rice", "amount": 370, "unit": "g", "notes": "approx 2 cups, hot, Japanese short-grain rice" },
      { "name": "Shichimi Togarashi", "amount": 1, "unit": "pinch", "notes": "Japanese seven spice, optional for serving" }
    ],
    "instructions": [
      { "stepNumber": 1, "description": "Combine dashi, soy sauce, mirin, sake, and sugar in a small bowl. Mix well and set aside." },
      { "stepNumber": 2, "description": "Heat a small donburi pan or small skillet over medium heat. Add half of the dashi mixture and bring to a simmer." },
      { "stepNumber": 3, "description": "Add half of the sliced onions in a single layer and simmer for 1 minute until slightly softened." },
      { "stepNumber": 4, "description": "Add half of the chicken pieces in a single layer over the onions. Cook for 3-4 minutes until the chicken is nearly cooked through." },
      { "stepNumber": 5, "description": "Pour half of the beaten eggs evenly over the chicken and onions. Cover and cook for 1-2 minutes until the eggs are barely set but still slightly runny." },
      { "stepNumber": 6, "description": "Serve immediately over hot steamed rice in a donburi bowl. Garnish with green onions and shichimi togarashi if desired." },
      { "stepNumber": 7, "description": "Repeat the process with remaining ingredients for the second serving." }
    ],
    "notes": [
      "Use a small pan to ensure the egg and chicken layer is thick enough",
      "Don't overcook the eggs - they should still be slightly runny when served",
      "Traditional donburi bowls help maintain the temperature of the dish",
      "Fresh dashi makes a significant difference in flavor, but instant is acceptable",
      "The dish should be served immediately while the eggs are still creamy",
      "You can adjust the sauce sweetness by varying the amount of sugar",
      "Fermented Ingredients: Contains **Soy Sauce** (fermented soybeans), **Mirin** (fermented glutinous rice, sugar, kōji), and **Sake** (fermented rice).",
      "FODMAP Information: High-FODMAP ingredient is Onion (fructans). Mirin can be high in fructose/fructans in servings > 1 tsp. Soy Sauce is high FODMAP in servings > 2 tsp. Low-FODMAP ingredients include Chicken Thigh, Eggs, Dashi (check ingredients for additives), Sake (limit to 1 tbsp), Sugar, Green Onion (green parts only), and Rice.",
      "Low-FODMAP Modification Tips: Omit onion. Use only the green parts of green onions for garnish and flavor. Limit Mirin to 1 tsp per serving. Limit Soy Sauce to 2 tsp per serving. Ensure dashi stock is homemade or certified low FODMAP.",
      "Vitamins & Minerals: Chicken Thigh is rich in protein, selenium, niacin (B3), and Vitamin B6. Eggs provide high-quality protein, Vitamin D, Vitamin B12, choline, and selenium. Onion offers Vitamin C and Vitamin B6. Dashi (if kombu-based) supplies iodine. Soy Sauce contributes sodium and manganese. Mirin and Sake provide trace nutrients from fermentation. Rice offers manganese and selenium. Green Onion contains Vitamin K and C. Shichimi Togarashi adds trace minerals and antioxidants from spices."
    ],
    "nutritionFacts": {
      "protein": 35,
      "carbs": 45,
      "fat": 25,
      "fiber": 2,
      "sugar": 5,
      "sodium": 700
    }
  },
  {
    "title": "麻婆豆腐 (Mapo Doufu)",
    "description": "A beloved Sichuan dish featuring soft tofu cubes in a spicy, numbing sauce with ground pork. The combination of doubanjiang (fermented broad bean paste) and Sichuan peppercorns creates the signature mala flavor that makes this dish iconic.",
    "cookingTime": 30,
    "servings": 4,
    "difficulty": "MEDIUM",
    "cuisineType": "Asia",
    "regionOfOrigin": "China",
    "imageUrl": "/images/recipes/mapo-doufu-8.jpg",
    "calories": 300,
    "type": "MAIN",
    "isVegetarian": false,
    "isVegan": false,
    "isGlutenFree": true,
    "isPescatarian": false,
    "isLactoseFree": true,
    "isNutFree": true,
    "isFermented": true,
    "isLowFodmap": false,
    "ingredients": [
      { "name": "Soft Tofu", "amount": 400, "unit": "g", "notes": "cut into 1-inch cubes" },
      { "name": "Ground Pork", "amount": 200, "unit": "g", "notes": "80% lean" },
      { "name": "Doubanjiang", "amount": 2, "unit": "tbsp", "notes": "Sichuan fermented broad bean paste" },
      { "name": "Sichuan Peppercorns", "amount": 1, "unit": "tbsp", "notes": "half ground, half whole" },
      { "name": "Garlic", "amount": 3, "unit": "cloves", "notes": "minced" },
      { "name": "Ginger", "amount": 1, "unit": "tbsp", "notes": "minced" },
      { "name": "Green Onions", "amount": 3, "unit": "stalks", "notes": "white parts minced, green parts sliced" },
      { "name": "Chicken Stock", "amount": 237, "unit": "g", "notes": "approx 1 cup, or water" },
      { "name": "Light Soy Sauce", "amount": 1, "unit": "tbsp", "notes": "or to taste" },
      { "name": "Shaoxing Wine", "amount": 1, "unit": "tbsp", "notes": "Chinese cooking wine" },
      { "name": "Cornstarch", "amount": 2, "unit": "tsp", "notes": "mixed with 2 tbsp water" },
      { "name": "Chili Oil", "amount": 2, "unit": "tbsp", "notes": "preferably Sichuan style" }
    ],
    "instructions": [
      { "stepNumber": 1, "description": "Gently drain and cube the tofu. Bring a pot of water to a simmer and carefully add the tofu cubes. Simmer for 2-3 minutes to heat through, then drain and set aside." },
      { "stepNumber": 2, "description": "Heat a wok or large skillet over high heat. Add 2 tablespoons of oil and the whole Sichuan peppercorns. Fry briefly until fragrant, then remove the peppercorns, leaving the flavored oil." },
      { "stepNumber": 3, "description": "Add ground pork to the hot oil, breaking it up into small pieces. Cook until the meat is no longer pink." },
      { "stepNumber": 4, "description": "Reduce heat to medium and add doubanjiang. Stir-fry for 1-2 minutes until the oil turns red." },
      { "stepNumber": 5, "description": "Add garlic, ginger, and white parts of green onions. Stir-fry for another minute until fragrant." },
      { "stepNumber": 6, "description": "Pour in chicken stock, soy sauce, and Shaoxing wine. Bring to a simmer." },
      { "stepNumber": 7, "description": "Carefully add the drained tofu cubes. Gently push them down into the sauce without breaking them." },
      { "stepNumber": 8, "description": "Simmer for 3-4 minutes, then add the cornstarch slurry while gently stirring to thicken the sauce." },
      { "stepNumber": 9, "description": "Finish with chili oil, ground Sichuan peppercorns, and green onion tops. Serve hot with steamed rice." }
    ],
    "notes": [
      "Handle the tofu gently to prevent it from breaking",
      "The dish should be quite oily - this is traditional and carries the flavors",
      "Authentic doubanjiang is key to the proper flavor - look for Pixian brand",
      "Can be made vegetarian by omitting pork and using mushrooms instead",
      "The sauce should be thick enough to coat the tofu but still be silky",
      "Leftovers can be stored for up to 2 days but the tofu will continue to absorb the sauce",
      "Fermented Ingredients: Contains **Doubanjiang** (fermented broad beans and chili), **Light Soy Sauce** (fermented soybeans), and **Shaoxing Wine** (fermented rice).",
      "FODMAP Information: High-FODMAP ingredients include Doubanjiang (fructans/GOS), Garlic (fructans), Green Onions (white parts - fructans), and Soft Tofu (fructans/GOS). Ginger is moderate FODMAP in servings > 1 tsp. Low-FODMAP ingredients include Ground Pork, Sichuan Peppercorns, Green Onions (green parts only), Chicken Stock (check ingredients), Soy Sauce (limit to 2 tsp), Shaoxing Wine (limit to 1 tbsp), Cornstarch, and Chili Oil (pure oil, check additives).",
      "Low-FODMAP Modification Tips: Replace soft tofu with firm or extra-firm tofu. Use only green parts of green onions. Omit garlic and ginger or use garlic/ginger-infused oils. Replace Doubanjiang with a low FODMAP chili paste/blend (challenging to replicate flavor). Ensure chicken stock is low FODMAP. Limit soy sauce and wine.",
      "Vitamins & Minerals: Tofu provides calcium, manganese, selenium, protein and iron. Ground Pork is rich in protein, selenium, phosphorus, zinc, and B vitamins. Doubanjiang contributes sodium and capsaicin. Sichuan Peppercorns offer unique flavor compounds and some antioxidants. Garlic contains manganese, vitamin B6, and vitamin C. Ginger provides gingerol (antioxidant). Green Onions contribute vitamin K and C. Chicken Stock adds sodium. Soy Sauce gives sodium and manganese. Shaoxing Wine offers trace fermentation nutrients. Chili Oil adds Vitamin E and capsaicin."
    ],
    "nutritionFacts": {
      "protein": 20,
      "carbs": 8,
      "fat": 22,
      "fiber": 2,
      "sugar": 1,
      "sodium": 800
    }
  },
  {
    "title": "Pasta alla Carbonara",
    "description": "A classic Roman pasta dish made with eggs, Pecorino Romano, guanciale, and black pepper. This creamy pasta dish originated in Rome and has become one of the most beloved Italian recipes worldwide, known for its silky sauce and rich flavors.",
    "cookingTime": 25,
    "servings": 4,
    "difficulty": "MEDIUM",
    "cuisineType": "Europe",
    "regionOfOrigin": "Italy",
    "imageUrl": "/images/recipes/pasta-alla-carbonara-10.jpg",
    "calories": 650,
    "type": "MAIN",
    "isVegetarian": false,
    "isVegan": false,
    "isGlutenFree": false,
    "isPescatarian": false,
    "isLactoseFree": false,
    "isNutFree": true,
    "isFermented": true,
    "isLowFodmap": false,
    "ingredients": [
      { "name": "Spaghetti", "amount": 400, "unit": "g", "notes": "high-quality durum wheat" },
      { "name": "Guanciale", "amount": 150, "unit": "g", "notes": "cut into small cubes" },
      { "name": "Pecorino Romano", "amount": 100, "unit": "g", "notes": "freshly grated" },
      { "name": "Eggs", "amount": 4, "unit": "large", "notes": "room temperature" },
      { "name": "Egg Yolks", "amount": 2, "unit": "large", "notes": "room temperature" },
      { "name": "Black Pepper", "amount": 2, "unit": "teaspoons", "notes": "freshly ground" },
      { "name": "Salt", "amount": 1, "unit": "tablespoon", "notes": "for pasta water" }
    ],
    "instructions": [
      { "stepNumber": 1, "description": "Bring a large pot of water to boil. Add salt when water is boiling." },
      { "stepNumber": 2, "description": "In a large bowl, whisk together whole eggs, egg yolks, and 3/4 of the grated Pecorino Romano. Season with black pepper." },
      { "stepNumber": 3, "description": "In a large pan, cook guanciale over medium heat until crispy and the fat has rendered, about 5-7 minutes. Turn off heat and set aside." },
      { "stepNumber": 4, "description": "Cook spaghetti in the boiling water according to package instructions until al dente." },
      { "stepNumber": 5, "description": "Reserve 237 grams of pasta cooking water before draining the pasta." },
      { "stepNumber": 6, "description": "Working quickly, add the hot pasta to the pan with guanciale and toss to combine." },
      { "stepNumber": 7, "description": "Remove pan from heat, add the egg mixture and toss quickly to create a creamy sauce. Add pasta water as needed to achieve desired consistency." },
      { "stepNumber": 8, "description": "Serve immediately with remaining Pecorino Romano and additional black pepper." }
    ],
    "notes": [
      "Never add cream - authentic carbonara doesn't use it.",
      "Ensure eggs are at room temperature to prevent them from scrambling.",
      "Guanciale can be substituted with pancetta if unavailable, though it won't be as authentic.",
      "The key to silky carbonara is working quickly and tossing constantly when adding the egg mixture.",
      "Traditional Roman restaurants often use rigatoni instead of spaghetti.",
      "Fermented Ingredient: Contains **Pecorino Romano** cheese, made from sheep's milk that undergoes lactic acid fermentation and aging.",
      "FODMAP Information: High-FODMAP ingredients include Spaghetti (wheat - fructans). Pecorino Romano cheese is high in lactose, but due to aging, the lactose content is often low enough to be tolerated in small portions (e.g., up to 40g) by many on a low FODMAP diet; individual tolerance varies. Low-FODMAP ingredients include Guanciale (cured, not fermented - check for additives), Eggs, Black Pepper, and Salt.",
      "Low-FODMAP Modification Tips: Use gluten-free spaghetti. Test tolerance to Pecorino Romano or use a lactose-free hard cheese like aged Parmesan (in moderation) or specific lactose-free varieties.",
      "Vitamins & Minerals: Spaghetti (enriched) provides carbohydrates, iron, and B vitamins. Guanciale is high in fat (including saturated) and sodium, providing some protein. Pecorino Romano offers protein, calcium, phosphorus, and sodium. Eggs are excellent sources of protein, Vitamin D, Vitamin B12, choline, and selenium. Black Pepper contains piperine and manganese."
    ],
    "nutritionFacts": {
      "protein": 28,
      "carbs": 65,
      "fat": 32,
      "fiber": 3,
      "sugar": 2,
      "sodium": 890
    }
  },
  {
    "title": "Risotto alla Milanese",
    "description": "A luxurious saffron-infused risotto that originated in Milan. This golden-hued dish is a testament to Lombardy's refined cuisine and is traditionally served as a primo piatto or alongside Osso Buco.",
    "cookingTime": 35,
    "servings": 4,
    "difficulty": "MEDIUM",
    "cuisineType": "Europe",
    "regionOfOrigin": "Italy",
    "imageUrl": "/images/recipes/risotto-alla-milanese.jpg",
    "calories": 450,
    "type": "MAIN",
    "isVegetarian": true,
    "isVegan": false,
    "isGlutenFree": true,
    "isPescatarian": false,
    "isLactoseFree": false,
    "isNutFree": true,
    "isFermented": true,
    "isLowFodmap": false,
    "ingredients": [
      { "name": "Carnaroli Rice", "amount": 320, "unit": "g", "notes": "or Vialone Nano" },
      { "name": "Saffron Threads", "amount": 0.5, "unit": "g", "notes": "high-quality" },
      { "name": "White Wine", "amount": 120, "unit": "ml", "notes": "approx 120g, dry" },
      { "name": "Onion", "amount": 1, "unit": "medium", "notes": "finely chopped" },
      { "name": "Butter", "amount": 80, "unit": "g", "notes": "divided" },
      { "name": "Parmesan Cheese", "amount": 80, "unit": "g", "notes": "freshly grated" },
      { "name": "Vegetable Stock", "amount": 1.2, "unit": "liters", "notes": "approx 1200g, hot" },
      { "name": "Olive Oil", "amount": 2, "unit": "tablespoons" },
      { "name": "Salt", "amount": 1, "unit": "teaspoon" },
      { "name": "Black Pepper", "amount": 0.5, "unit": "teaspoon", "notes": "freshly ground" }
    ],
    "instructions": [
      { "stepNumber": 1, "description": "In a small bowl, steep saffron threads in 2-3 tablespoons of hot stock for 15 minutes." },
      { "stepNumber": 2, "description": "Keep remaining stock simmering in a pot." },
      { "stepNumber": 3, "description": "In a large saucepan, heat olive oil and half the butter. Add onion and cook until soft and translucent." },
      { "stepNumber": 4, "description": "Add rice and toast for 2-3 minutes until grains are hot and coated with oil." },
      { "stepNumber": 5, "description": "Add wine and stir until completely absorbed." },
      { "stepNumber": 6, "description": "Begin adding hot stock one ladle at a time (approx 120 grams or 1/2 cup), stirring constantly and waiting for each addition to be absorbed before adding more." },
      { "stepNumber": 7, "description": "Halfway through cooking (about 8-9 minutes), add the saffron-infused stock." },
      { "stepNumber": 8, "description": "Continue cooking and adding stock until rice is al dente (about 18-20 minutes total)." },
      { "stepNumber": 9, "description": "Remove from heat, add remaining butter and Parmesan. Stir vigorously to create a creamy texture ('mantecare')." }
    ],
    "notes": [
      "Carnaroli rice gives the creamiest result, but Arborio can be used as a substitute.",
      "The final texture should be 'all'onda' - waves that slowly spread when you shake the pan.",
      "Some Milanese families add bone marrow for extra richness, though this is optional.",
      "Never wash the rice as it removes the starch needed for creaminess.",
      "The quality of saffron greatly affects the final dish - invest in good Spanish or Italian saffron.",
      "Fermented Ingredients: Contains **White Wine** (fermented grapes) and **Parmesan Cheese** (aged, fermented cow's milk).",
      "FODMAP Information: High-FODMAP ingredients include Onion (fructans) and White Wine (excess fructose in servings > 1 glass, but usually okay in cooking amounts). Parmesan cheese is high in lactose, but usually low enough in typical portions (e.g., up to 40g) due to aging; test tolerance. Butter contains lactose but is typically low FODMAP in usual amounts. Low-FODMAP ingredients include Carnaroli Rice, Saffron, Vegetable Stock (ensure onion/garlic free), Olive Oil, Salt, and Pepper.",
      "Low-FODMAP Modification Tips: Omit onion or replace with the green parts of leeks or spring onions (sautéed gently). Ensure stock is low FODMAP certified or homemade without high FODMAP ingredients. Test tolerance to Parmesan or use lactose-free hard cheese. Use olive oil instead of butter if needed.",
      "Vitamins & Minerals: Carnaroli Rice primarily provides carbohydrates. Saffron contains antioxidants like crocin and safranal, plus manganese. White Wine offers some antioxidants. Onion provides Vitamin C and B6. Butter contributes Vitamin A and D. Parmesan Cheese is rich in calcium, protein, and phosphorus. Vegetable Stock adds sodium and trace minerals depending on ingredients. Olive Oil contains Vitamin E and K. Black Pepper provides manganese."
    ],
    "nutritionFacts": {
      "protein": 12,
      "carbs": 65,
      "fat": 18,
      "fiber": 2,
      "sugar": 2,
      "sodium": 680
    }
  },
  {
    "title": "Pizza Margherita",
    "description": "The quintessential Neapolitan pizza, created in 1889 in honor of Queen Margherita of Italy. This pizza represents the colors of the Italian flag with red tomatoes, white mozzarella, and green basil.",
    "cookingTime": 20,
    "servings": 4,
    "difficulty": "MEDIUM",
    "cuisineType": "Europe",
    "regionOfOrigin": "Italy",
    "imageUrl": "/images/recipes/pizza_margherita.jpg",
    "calories": 250,
    "type": "MAIN",
    "isVegetarian": true,
    "isVegan": false,
    "isGlutenFree": false,
    "isLactoseFree": false,
    "isNutFree": true,
    "isFermented": true,
    "isLowFodmap": false,
    "ingredients": [
      { "name": "00 Flour", "amount": 500, "unit": "g", "notes": "plus extra for dusting" },
      { "name": "Fresh Yeast", "amount": 7, "unit": "g", "notes": "or 2g instant dry yeast" },
      { "name": "Water", "amount": 325, "unit": "ml", "notes": "approx 325g, lukewarm" },
      { "name": "Salt", "amount": 10, "unit": "g" },
      { "name": "San Marzano Tomatoes", "amount": 400, "unit": "g", "notes": "whole, peeled" },
      { "name": "Buffalo Mozzarella", "amount": 250, "unit": "g", "notes": "torn into pieces" },
      { "name": "Fresh Basil", "amount": 10, "unit": "leaves" },
      { "name": "Extra Virgin Olive Oil", "amount": 2, "unit": "tablespoons" }
    ],
    "instructions": [
      { "stepNumber": 1, "description": "Dissolve yeast in lukewarm water. In a large bowl, mix flour and salt." },
      { "stepNumber": 2, "description": "Gradually add the yeast mixture to the flour, mixing until a shaggy dough forms." },
      { "stepNumber": 3, "description": "Knead dough for 10-15 minutes until smooth and elastic." },
      { "stepNumber": 4, "description": "Place in a lightly oiled bowl, cover, and let rise for 4-6 hours at room temperature." },
      { "stepNumber": 5, "description": "Divide dough into 4 balls and let rest for 30 minutes." },
      { "stepNumber": 6, "description": "Crush tomatoes by hand and drain excess liquid." },
      { "stepNumber": 7, "description": "Preheat oven with pizza stone to highest temperature (ideally 450-500°C / 840-930°F) for at least 30 minutes." },
      { "stepNumber": 8, "description": "Stretch each dough ball into a 10-inch circle, leaving a slightly thicker border." },
      { "stepNumber": 9, "description": "Top with crushed tomatoes (thin layer), drizzle with olive oil, and bake for 60-90 seconds directly on the hot stone/steel." },
      { "stepNumber": 10, "description": "Quickly add torn mozzarella pieces and fresh basil leaves." },
      { "stepNumber": 11, "description": "Bake for another 30-60 seconds, until crust is blistered and cheese is melted and bubbly. Finish with another drizzle of olive oil if desired." }
    ],
    "notes": [
      "True Neapolitan pizza should be soft and elastic, not crispy.",
      "The dough can be cold-fermented in the fridge for up to 72 hours for better flavor development.",
      "If you can't find 00 flour, bread flour is an acceptable substitute, but texture may differ.",
      "Traditional Neapolitan pizza is cooked in a wood-fired oven at ~485°C (905°F).",
      "For home ovens, use a pizza stone or steel preheated at the highest possible temperature for the best result.",
      "Fermented Ingredients: Contains **Pizza Dough** (leavened by yeast fermentation) and **Buffalo Mozzarella** (fresh cheese produced via lactic acid fermentation).",
      "FODMAP Information: High-FODMAP ingredients include Flour (wheat - fructans), Yeast (can be a trigger for some individuals), Tomatoes (fructose content increases with concentration/amount; limit sauce), and Mozzarella (lactose). Low-FODMAP ingredients include Fresh Basil, Olive Oil, and Salt.",
      "Low-FODMAP Modification Tips: Use a gluten-free pizza base recipe. Use a slow-rise or sourdough method for the dough (may reduce fructans, test tolerance). Limit tomato sauce quantity (e.g., 2 tbsp per pizza) and ensure no added onion/garlic. Use lactose-free mozzarella or small amounts of aged, low-lactose cheese like Parmesan (test tolerance).",
      "Vitamins & Minerals: Flour (enriched) provides iron and B vitamins. Yeast offers B vitamins. Tomatoes are a source of Vitamin C, potassium, and lycopene (antioxidant). Buffalo Mozzarella contributes protein, calcium, and phosphorus. Fresh Basil provides Vitamin K. Extra Virgin Olive Oil offers Vitamin E, K, and healthy fats."
    ],
    "nutritionFacts": {
      "protein": 12,
      "carbs": 42,
      "fat": 8,
      "fiber": 2,
      "sugar": 3,
      "sodium": 520
    }
  },
  {
    "title": "Osso Buco alla Milanese",
    "description": "A hearty Milanese dish of braised veal shanks in white wine and broth, traditionally served with gremolata and risotto alla Milanese. This dish showcases the rich culinary heritage of Lombardy.",
    "cookingTime": 150,
    "servings": 4,
    "difficulty": "MEDIUM",
    "cuisineType": "Europe",
    "regionOfOrigin": "Italy",
    "imageUrl": "/images/recipes/osso-buco-alla-milanese-13.jpg",
    "calories": 580,
    "type": "MAIN",
    "isVegetarian": false,
    "isVegan": false,
    "isGlutenFree": true,
    "isPescatarian": false,
    "isLactoseFree": true,
    "isNutFree": true,
    "isFermented": true,
    "isLowFodmap": false,
    "ingredients": [
      { "name": "Veal Shanks", "amount": 4, "unit": "pieces", "notes": "about 3 inches thick" },
      { "name": "Onion", "amount": 1, "unit": "large", "notes": "finely diced" },
      { "name": "Carrots", "amount": 2, "unit": "medium", "notes": "finely diced" },
      { "name": "Celery", "amount": 2, "unit": "stalks", "notes": "finely diced" },
      { "name": "White Wine", "amount": 250, "unit": "ml", "notes": "approx 250g, dry" },
      { "name": "Chicken Stock", "amount": 500, "unit": "ml", "notes": "approx 500g" },
      { "name": "Tomatoes", "amount": 400, "unit": "g", "notes": "canned, crushed" },
      { "name": "Flour", "amount": 60, "unit": "g", "notes": "for dredging (use GF if needed)" },
      { "name": "Olive Oil", "amount": 4, "unit": "tablespoons" },
      { "name": "Garlic", "amount": 3, "unit": "cloves", "notes": "minced (for braise) + 1 clove minced for gremolata" },
      { "name": "Lemon Zest", "amount": 1, "unit": "lemon", "notes": "for gremolata" },
      { "name": "Parsley", "amount": 30, "unit": "g", "notes": "approx 0.5 cup, finely chopped" }
    ],
    "instructions": [
      { "stepNumber": 1, "description": "Tie each veal shank around the middle with kitchen twine to help maintain their shape." },
      { "stepNumber": 2, "description": "Season veal shanks generously with salt and pepper, then dredge lightly in flour, shaking off excess." },
      { "stepNumber": 3, "description": "Heat olive oil in a large Dutch oven or heavy-bottomed pot over medium-high heat. Brown shanks well on all sides, about 8-10 minutes total. Remove and set aside." },
      { "stepNumber": 4, "description": "In the same pot, add onion, carrots, and celery (the soffritto). Cook over medium heat until softened and lightly golden, about 10 minutes." },
      { "stepNumber": 5, "description": "Add minced garlic (for the braise) and cook for another minute until fragrant." },
      { "stepNumber": 6, "description": "Pour in white wine, increase heat, and scrape up any brown bits (deglaze). Simmer until wine is reduced by about half." },
      { "stepNumber": 7, "description": "Add crushed tomatoes and stock. Bring to a simmer. Return shanks to the pot, ensuring they are mostly submerged (add more stock or water if needed)." },
      { "stepNumber": 8, "description": "Cover the pot, reduce heat to low, and braise gently for 2 to 2.5 hours, or until the meat is very tender and falling off the bone." },
      { "stepNumber": 9, "description": "For the gremolata: Just before serving, combine lemon zest, finely chopped parsley, and the remaining minced garlic clove." },
      { "stepNumber": 10, "description": "Serve shanks hot with plenty of their sauce, spooning some over the top. Sprinkle generously with gremolata." }
    ],
    "notes": [
      "The marrow in the bones is considered a delicacy - provide small spoons for scooping it out.",
      "Traditional accompaniment is risotto alla Milanese, but creamy polenta also works well.",
      "Look for hind shanks cut about 2.5-3 inches thick with plenty of marrow.",
      "The dish can be made a day ahead - gently reheat before serving. The flavor often improves.",
      "Some traditional versions ('in bianco') omit tomatoes entirely.",
      "Fermented Ingredient: Contains **White Wine** (fermented grapes).",
      "FODMAP Information: High-FODMAP ingredients include Onion (fructans), Celery (mannitol > 1/2 stalk), White Wine (excess fructose in large amounts), and Garlic (fructans). Canned Tomatoes are moderate FODMAP for fructose in servings > 1/2 cup. Flour (if wheat) is high (fructans). Low-FODMAP ingredients include Veal Shanks, Carrots, Chicken/Beef Stock (ensure low FODMAP version - no onion/garlic), Olive Oil, Lemon Zest, and Parsley.",
      "Low-FODMAP Modification Tips: Omit onion, celery, and garlic (use garlic/onion-infused oil and green parts of leek/spring onion for aromatics). Omit or strictly limit white wine. Use gluten-free flour for dredging. Ensure stock is low FODMAP. Limit canned tomato portion to 1/2 cup per serving.",
      "Vitamins & Minerals: Veal Shanks are rich in protein, collagen, zinc, iron, phosphorus, and Vitamin B12. Onion provides Vitamin C and B6. Carrots are high in Vitamin A (beta-carotene) and K. Celery offers Vitamin K. White Wine contains some antioxidants. Stock adds sodium. Tomatoes supply Vitamin C, potassium, and lycopene. Flour (enriched) adds iron and B vitamins. Olive Oil gives Vitamin E and K. Garlic has manganese, B6, and C. Lemon Zest is rich in Vitamin C and bioflavonoids. Parsley provides significant amounts of Vitamin K, C, and A."
    ],
    "nutritionFacts": {
      "protein": 45,
      "carbs": 18,
      "fat": 32,
      "fiber": 3,
      "sugar": 5,
      "sodium": 780
    }
  },
  {
    title: "Ribollita",
    description: "A hearty Tuscan soup made with bread, vegetables, and beans. Originally a peasant dish, ribollita literally means \"reboiled,\" as it was traditionally made by reheating leftover vegetable soup with day-old bread.",
    cookingTime: 90, // Plus soaking time for beans
    servings: 6,
    difficulty: "EASY",
    cuisineType: "Europe",
    regionOfOrigin: "Italy",
    imageUrl: "/images/recipes/ribollita-14.jpg",
    calories: 380,
    type: "MAIN",
    isVegetarian: true,
    isVegan: true,
    isGlutenFree: false,
    isPescatarian: false,
    isLactoseFree: true,
    isNutFree: true,
    isFermented: false, // Wine sometimes added, but not listed here.
    isLowFodmap: false, // Very high in FODMAPs
    ingredients: [
      { name: "Cannellini Beans", amount: 400, unit: "g", notes: "dried, soaked overnight, or use 2x 15oz cans, rinsed" },
      { name: "Tuscan Kale", amount: 300, unit: "g", notes: "lacinato or cavolo nero, stems removed, roughly chopped" },
      { name: "Savoy Cabbage", amount: 1, unit: "small head", notes: "shredded" },
      { name: "Carrots", amount: 2, unit: "large", notes: "diced" },
      { name: "Celery", amount: 3, unit: "stalks", notes: "diced" },
      { name: "Onions", amount: 2, unit: "medium", notes: "diced" },
      { name: "Potatoes", amount: 2, unit: "medium", notes: "peeled and cubed" },
      { name: "Tomatoes", amount: 400, unit: "g", notes: "canned, crushed or diced" },
      { name: "Day-Old Bread", amount: 300, unit: "g", notes: "stale, crusty Tuscan bread, torn or cubed" },
      { name: "Garlic", amount: 4, unit: "cloves", notes: "minced" },
      { name: "Olive Oil", amount: 6, unit: "tablespoons", notes: "extra virgin" },
      { name: "Rosemary", amount: 2, unit: "sprigs", notes: "fresh" },
      { name: "Thyme", amount: 2, unit: "sprigs", notes: "fresh" },
      { name: "Water or Vegetable Broth", amount: 1.5, unit: "liters", notes: "approx 1500g, as needed"} // Added gram equivalent
    ],
    instructions: [
      { stepNumber: 1, description: "If using dried beans: Cook soaked beans in fresh water with a sprig of rosemary until tender, about 1-1.5 hours. Reserve beans and cooking liquid. If using canned beans, rinse well." },
      { stepNumber: 2, description: "In a large pot or Dutch oven, heat olive oil over medium heat. Add onions, carrots, and celery (soffritto) and cook until softened, about 10 minutes." },
      { stepNumber: 3, description: "Add minced garlic, leaves from remaining rosemary sprig, and thyme leaves. Cook for 1-2 minutes until fragrant." },
      { stepNumber: 4, description: "Add crushed tomatoes and cook for 5 minutes, stirring occasionally." },
      { stepNumber: 5, description: "Add potatoes, savoy cabbage, and Tuscan kale. Stir well and cook for 5-10 minutes until vegetables start to wilt." },
      { stepNumber: 6, description: "Add the cooked cannellini beans (and their cooking liquid if using dried) or rinsed canned beans. Add enough water or vegetable broth to cover everything generously. Bring to a simmer, season with salt and pepper, reduce heat, cover partially, and cook for at least 30-45 minutes, until all vegetables are very tender." },
      { stepNumber: 7, description: "Stir in the torn bread chunks. Cook for another 10-15 minutes, stirring occasionally, until the bread breaks down and thickens the soup significantly." },
      { stepNumber: 8, description: "Remove from heat. Let the soup rest for at least 30 minutes (or ideally, cool completely and reheat the next day - 'ribollita' means reboiled)." },
      { stepNumber: 9, description: "Serve hot in bowls, drizzled generously with good quality extra virgin olive oil." }
    ],
    notes: [
      "Traditional Tuscan bread is unsalted - if using regular bread, adjust salt accordingly.",
      "The soup should be very thick, almost like a stew - add more bread if needed.",
      "Ribollita famously tastes better the next day after being gently 'reboiled' (reheated).",
      "In Tuscany, this is often considered 'cucina povera' (peasant cooking), using leftover vegetables and stale bread.",
      "For authentic flavor, use only high-quality extra virgin olive oil, especially for drizzling.",
      "FODMAP notes: This soup is inherently very high in FODMAPs. High FODMAP ingredients include Cannellini Beans (GOS), Tuscan Kale (fructans - moderate/high), Savoy Cabbage (fructans/sorbitol), Celery (mannitol), Onions (fructans), Garlic (fructans), and Bread (wheat - fructans). Potatoes and Tomatoes are moderate in larger servings. Low FODMAP ingredients include Olive Oil, Rosemary, and Thyme. Recommendations for strictly Low FODMAP: This recipe requires extensive modification. Substitute beans with canned lentils (rinsed, limit portion), use low FODMAP greens like spinach/chard, omit cabbage/onion/celery/garlic (use infused oils, leek/fennel greens limited), limit potato/carrot/tomato portions, use gluten-free bread. It will result in a very different soup.",
      "Vitamins & Minerals: Cannellini Beans provide protein, fiber, folate (B9), iron, and potassium. Tuscan Kale is packed with Vitamin K, A, and C. Savoy Cabbage offers Vitamin K and C. Carrots supply Vitamin A (beta-carotene). Celery gives Vitamin K. Onions contain Vitamin C and B6. Potatoes offer potassium and Vitamin C. Tomatoes provide Vitamin C, potassium, and lycopene. Bread (whole wheat) adds fiber, B vitamins. Garlic has manganese, B6, C. Olive Oil supplies Vitamin E, K. Rosemary and Thyme provide antioxidants."
    ],
    nutritionFacts: {
      protein: 15,
      carbs: 52,
      fat: 12,
      fiber: 12,
      sugar: 6,
      sodium: 480 // Highly dependent on broth/salt added
    }
  },
  {
    title: "Pasta al Pesto alla Genovese",
    description: "The authentic basil pesto from Genoa, traditionally served with trofie pasta. This bright green sauce captures the essence of Ligurian cuisine, combining the region's finest basil with pine nuts, garlic, and aged cheese.",
    cookingTime: 25,
    servings: 4,
    difficulty: "EASY",
    cuisineType: "Europe",
    regionOfOrigin: "Italy",
    imageUrl: "/images/recipes/pasta-al-pesto-alla-genovese-15.jpg",
    calories: 450, // Highly variable based on oil/cheese/nuts amount
    type: "MAIN",
    isVegetarian: true,
    isVegan: false,
    isGlutenFree: false,
    isPescatarian: false,
    isLactoseFree: false,
    isNutFree: false,
    isFermented: true,
    isLowFodmap: false,
    ingredients: [
      { name: "Basil Leaves", amount: 100, unit: "g", notes: "fresh, young Genovese basil if possible" },
      { name: "Pine Nuts", amount: 50, unit: "g" },
      { name: "Garlic", amount: 2, unit: "cloves" },
      { name: "Parmigiano-Reggiano", amount: 50, unit: "g", notes: "freshly grated" },
      { name: "Pecorino Sardo", amount: 25, unit: "g", notes: "freshly grated (or use more Parmigiano)" },
      { name: "Olive Oil", amount: 120, unit: "ml", notes: "approx 110g, good quality extra virgin" }, // Added gram equivalent
      { name: "Salt", amount: 1, unit: "teaspoon", notes: "coarse sea salt, adjust to taste" },
      { name: "Trofie Pasta", amount: 400, unit: "g", notes: "or Trenette, Linguine" },
      { name: "Potatoes", amount: 1, unit: "medium", notes: "peeled and diced small (optional, traditional)" },
      { name: "Green Beans", amount: 150, unit: "g", notes: "trimmed and cut (optional, traditional)" }
    ],
    instructions: [
      { stepNumber: 1, description: "Gently wash basil leaves and pat completely dry - excess water can darken the pesto." },
      { stepNumber: 2, description: "Optional: Lightly toast pine nuts in a dry pan over low heat until just fragrant (do not brown)." },
      { stepNumber: 3, description: "Ideally use a mortar and pestle: Crush garlic cloves with coarse salt into a paste." },
      { stepNumber: 4, description: "Add pine nuts and crush/grind until creamy." },
      { stepNumber: 5, description: "Add basil leaves a handful at a time, crushing with a circular grinding motion against the sides of the mortar until finely processed and releases liquid." },
      { stepNumber: 6, description: "Gradually incorporate the grated cheeses, mixing well." },
      { stepNumber: 7, description: "Slowly drizzle in the extra virgin olive oil while stirring continuously with the pestle or a spoon to create a smooth emulsion. Taste and adjust salt if needed. (Alternatively, use a food processor, pulsing garlic/nuts first, then adding basil/cheeses, and finally streaming in oil - avoid over-processing)." },
      { stepNumber: 8, description: "Bring a large pot of salted water to a vigorous boil. If using potatoes and green beans, add them first." },
      { stepNumber: 9, description: "Cook potatoes/beans for about 5 minutes, then add the trofie pasta to the same pot. Cook until the pasta is al dente according to package directions." },
      { stepNumber: 10, description: "Just before draining, reserve about 237 grams of the starchy pasta cooking water. Drain the pasta and vegetables." }, // Converted cups to grams
      { stepNumber: 11, description: "Return the pasta/veg to the pot or a large serving bowl. Add the pesto and toss gently to coat, adding a few tablespoons of the reserved pasta water as needed to loosen the sauce and make it creamy. Serve immediately." }
    ],
    notes: [
      "Traditional pesto is best made with a mortar and pestle for optimal texture and flavor - food processors can overheat the basil.",
      "Using young, small basil leaves yields a sweeter, less bitter pesto.",
      "The traditional pasta shapes are Trofie or Trenette, but Linguine or Fettuccine also work well.",
      "Cooking small-diced potatoes and green beans in the pasta water is classic in Liguria.",
      "Never cook pesto sauce – the heat from the pasta is enough. Add it off the heat.",
      "Fermented Ingredients: Parmigiano-Reggiano and Pecorino Sardo are aged cheeses made from fermented milk.",
      "FODMAP notes: High FODMAP ingredients include Garlic (fructans), Pasta (wheat - fructans), Pine Nuts (fructans - moderate > 1 tbsp), Parmigiano/Pecorino (lactose - often low in small portions). Potatoes and Green Beans are low FODMAP in limited portions but can become moderate. Low FODMAP ingredients include Basil Leaves, Olive Oil, and Salt. Recommendations for strictly Low FODMAP: Omit garlic or use garlic-infused oil. Use gluten-free pasta. Limit pine nuts to 1 tbsp per serving. Test tolerance to aged cheeses or use lactose-free alternatives. Limit potato (~1/2 medium) and green bean (~15 beans) portions per serving.",
      "Vitamins & Minerals: Basil Leaves provide Vitamin K and A. Pine Nuts offer manganese, Vitamin E, magnesium, copper, zinc, and phosphorus. Garlic contains manganese, B6, C. Parmigiano/Pecorino are excellent sources of calcium, protein, and phosphorus. Olive Oil gives Vitamin E, K, and monounsaturated fats. Pasta (enriched) adds iron, B vitamins. Potatoes provide potassium and Vitamin C. Green Beans offer Vitamin K, C, and fiber."
    ],
    nutritionFacts: {
      protein: 18,
      carbs: 58,
      fat: 22,
      fiber: 4,
      sugar: 2,
      sodium: 580
    }
  },
  {
    title: "Tiramisù",
    description: "A beloved Italian dessert of coffee-soaked ladyfingers layered with mascarpone cream. While both Veneto and Friuli-Venezia Giulia claim its origin, this dessert has become an icon of Italian cuisine worldwide.",
    cookingTime: 30, // Plus chilling time (at least 4 hours)
    servings: 8,
    difficulty: "MEDIUM",
    cuisineType: "Europe",
    regionOfOrigin: "Italy",
    imageUrl: "/images/recipes/tiramisu.jpg",
    calories: 380, // Approximate per serving
    type: "DESSERT",
    isVegetarian: true,
    isVegan: false,
    isGlutenFree: false,
    isPescatarian: false,
    isLactoseFree: false,
    isNutFree: true,
    isFermented: true,
    isLowFodmap: false,
    ingredients: [
      { name: "Mascarpone Cheese", amount: 500, unit: "g", notes: "good quality, full fat, room temperature" },
      { name: "Egg Yolks", amount: 6, unit: "large", notes: "fresh, pasteurized recommended, room temperature" },
      { name: "Egg Whites", amount: 3, unit: "large", notes: "fresh, pasteurized recommended, room temperature" },
      { name: "Sugar", amount: 120, unit: "g", notes: "granulated or caster" },
      { name: "Ladyfingers", amount: 24-30, unit: "pieces", notes: "Savoiardi type" },
      { name: "Espresso", amount: 350, unit: "ml", notes: "approx 350g, strong brewed, cooled completely" }, // Added gram equivalent
      { name: "Cocoa Powder", amount: 30, unit: "g", notes: "unsweetened, for dusting" },
      { name: "Marsala Wine", amount: 60, unit: "ml", notes: "approx 60g, sweet, optional (or dark rum, brandy)" } // Added gram equivalent
    ],
    instructions: [
      { stepNumber: 1, description: "Prepare strong espresso and let it cool completely. If using, stir in the Marsala wine (or other liquor)." },
      { stepNumber: 2, description: "In a large bowl, beat the egg yolks with half the sugar using an electric mixer until very pale yellow, thick, and tripled in volume (ribbon stage)." },
      { stepNumber: 3, description: "Add the room temperature mascarpone cheese to the yolk mixture and beat on low speed until just combined and smooth. Do not overmix." },
      { stepNumber: 4, description: "In a separate, meticulously clean, grease-free bowl, beat the egg whites with an electric mixer until soft peaks form. Gradually add the remaining sugar and continue beating until stiff, glossy peaks form." },
      { stepNumber: 5, description: "Gently fold the beaten egg whites into the mascarpone mixture in thirds, using a spatula, being careful not to deflate the mixture too much." },
      { stepNumber: 6, description: "Pour the cooled coffee mixture into a shallow dish. Quickly dip each ladyfinger into the coffee for just 1-2 seconds per side – they should be moistened but not soggy." },
      { stepNumber: 7, description: "Arrange a single layer of dipped ladyfingers in the bottom of a rectangular dish (approx. 9x13 inch or similar)." },
      { stepNumber: 8, description: "Spread half of the mascarpone cream mixture evenly over the ladyfinger layer." },
      { stepNumber: 9, description: "Repeat with another layer of quickly-dipped ladyfingers and top with the remaining mascarpone cream mixture, smoothing the top." },
      { stepNumber: 10, description: "Cover the dish tightly with plastic wrap." },
      { stepNumber: 11, description: "Refrigerate for at least 4 hours, or preferably overnight, to allow the flavors to meld and the dessert to set." },
      { stepNumber: 12, description: "Just before serving, dust the top generously and evenly with unsweetened cocoa powder using a fine-mesh sieve." }
    ],
    notes: [
      "Using fresh, high-quality eggs is crucial. Consider using pasteurized eggs if concerned about raw eggs.",
      "Do not oversoak the ladyfingers, or the tiramisù will be watery.",
      "Ensure mascarpone is at room temperature for smooth incorporation without lumps.",
      "The addition of alcohol like Marsala, rum, or brandy is traditional but optional.",
      "Chilling is essential for the dessert to set properly and flavors to develop.",
      "Fermented Ingredients: Mascarpone (lactic acid fermentation), Espresso (coffee beans undergo fermentation post-harvest), Marsala Wine (fermented grapes, fortified).",
      "FODMAP notes: High FODMAP ingredients include Mascarpone (lactose), Ladyfingers (wheat - fructans), and potentially Marsala Wine (fructose content). Espresso/coffee can be a gut irritant for some. Low FODMAP ingredients include Egg Yolks, Egg Whites, Sugar, and Cocoa Powder. Recommendations for strictly Low FODMAP: Use lactose-free mascarpone or a suitable alternative. Use gluten-free ladyfingers. Omit the Marsala wine or use a small amount of low FODMAP alcohol like brandy (check portion limits). Limit serving size.",
      "Vitamins & Minerals: Mascarpone provides fat (mostly saturated) and some calcium. Eggs are rich in protein, Vitamin D, B12, and choline. Sugar offers carbohydrates. Ladyfingers (enriched) contribute carbohydrates, iron, B vitamins. Espresso contains caffeine and antioxidants. Cocoa Powder is a source of iron, magnesium, copper, manganese, and antioxidants (flavonoids). Marsala Wine adds trace nutrients."
    ],
    nutritionFacts: {
      protein: 8,
      carbs: 35,
      fat: 22,
      fiber: 1,
      sugar: 18,
      sodium: 120
    }
  },
  {
    title: "Lasagna alla Bolognese",
    description: "The classic lasagna from Bologna, featuring fresh pasta sheets layered with rich meat ragù, creamy béchamel, and Parmigiano-Reggiano. This version follows the official recipe registered with the Bologna Chamber of Commerce.",
    cookingTime: 240, // Includes ~3 hours ragù simmering time
    servings: 8,
    difficulty: "HARD",
    cuisineType: "Europe",
    regionOfOrigin: "Italy",
    imageUrl: "/images/recipes/lasagna-alla-bolognese.jpg",
    calories: 580, // Approximate per serving
    type: "MAIN",
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: false,
    isPescatarian: false,
    isLactoseFree: false,
    isNutFree: true,
    isFermented: true,
    isLowFodmap: false, // Very high in FODMAPs
    ingredients: [
      // Ragù Bolognese
      { name: "Ground Beef", amount: 500, unit: "g", notes: "coarsely ground, moderate fat content" },
      { name: "Ground Pork", amount: 300, unit: "g", notes: "can use pancetta instead or mix" },
      { name: "Pancetta", amount: 150, unit: "g", notes: "finely diced" },
      { name: "Carrots", amount: 1, unit: "large", notes: "finely diced" },
      { name: "Celery", amount: 2, unit: "stalks", notes: "finely diced" },
      { name: "Onion", amount: 1, unit: "large", notes: "finely diced" },
      { name: "Tomato Paste", amount: 3, unit: "tablespoons" },
      { name: "Red Wine", amount: 240, unit: "ml", notes: "approx 240g, dry (Sangiovese typical)" }, // Added gram equivalent
      { name: "Whole Milk", amount: 240, unit: "ml", notes: "approx 245g" }, // Added gram equivalent
      { name: "Beef Broth", amount: 240, unit: "ml", notes: "approx 240g, low sodium, optional, or water" }, // Added gram equivalent
      { name: "Salt", amount: 1, unit: "tsp", notes: "to taste" },
      { name: "Black Pepper", amount: 0.5, unit: "tsp", notes: "to taste" },
      // Béchamel Sauce
      { name: "Butter", amount: 100, unit: "g" },
      { name: "All-Purpose Flour", amount: 100, unit: "g" },
      { name: "Whole Milk", amount: 1, unit: "liter", notes: "approx 1000g, warmed" }, // Added gram equivalent
      { name: "Nutmeg", amount: 0.25, unit: "teaspoon", notes: "freshly grated" },
      { name: "Salt", amount: 0.5, unit: "tsp", notes: "to taste" },
      // Assembly
      { name: "Fresh Egg Pasta Sheets", amount: 500, unit: "g", notes: "ideally spinach pasta (Lasagne Verdi)" },
      { name: "Parmigiano-Reggiano", amount: 200, unit: "g", notes: "freshly grated" }
    ],
    instructions: [
      // Make the Ragù
      { stepNumber: 1, description: "In a large heavy-bottomed pot or Dutch oven, cook the diced pancetta over medium heat until fat renders and pancetta is lightly crispy. Add a knob of butter if needed." },
      { stepNumber: 2, description: "Add the finely diced carrots, celery, and onion (soffritto). Cook gently over medium-low heat until vegetables are very soft and translucent, about 15-20 minutes. Do not brown." },
      { stepNumber: 3, description: "Increase heat slightly, add the ground beef and ground pork. Cook, breaking up the meat with a spoon, until it loses its raw color. Drain excess fat if desired." },
      { stepNumber: 4, description: "Pour in the red wine. Bring to a simmer and cook until the wine has almost completely evaporated, scraping the bottom of the pot." },
      { stepNumber: 5, description: "Stir in the tomato paste and cook for 1-2 minutes." },
      { stepNumber: 6, description: "Pour in the milk. Simmer gently until it has mostly evaporated. Season lightly with salt, pepper, and a tiny pinch of nutmeg if desired (optional in ragù)." },
      { stepNumber: 7, description: "Add the beef broth or water (enough to barely cover the meat). Bring to a bare simmer, then reduce heat to the lowest possible setting. Partially cover the pot." },
      { stepNumber: 8, description: "Cook the ragù very slowly for at least 2.5 - 3 hours, stirring occasionally. Add small amounts of hot water or broth if it becomes too dry. The sauce should be thick and rich. Adjust seasoning at the end." },
      // Make the Béchamel
      { stepNumber: 9, description: "While ragù simmers (or near the end): Melt butter in a medium saucepan over medium-low heat. Whisk in the flour and cook, whisking constantly, for 1-2 minutes (making a roux). Do not brown." },
      { stepNumber: 10, description: "Gradually whisk in the warm milk, a little at a time, ensuring no lumps form. Bring to a gentle simmer, whisking constantly." },
      { stepNumber: 11, description: "Reduce heat and cook gently, whisking often, for 5-10 minutes, until the sauce has thickened enough to coat the back of a spoon. Season with salt and freshly grated nutmeg." },
      // Assemble and Bake
      { stepNumber: 12, description: "Preheat oven to 180°C (350°F). Lightly grease a rectangular baking dish (approx. 9x13 inch)." },
      { stepNumber: 13, description: "Spread a thin layer of béchamel sauce on the bottom of the dish." },
      { stepNumber: 14, description: "Arrange a layer of fresh pasta sheets over the béchamel (trim if needed). If using dried, cook briefly first." },
      { stepNumber: 15, description: "Spread a layer of ragù over the pasta, followed by a layer of béchamel, and a sprinkle of grated Parmigiano-Reggiano." },
      { stepNumber: 16, description: "Repeat the layers (pasta, ragù, béchamel, Parmigiano) 4-5 times, ending with a final layer of pasta topped generously with béchamel and a final sprinkle of Parmigiano-Reggiano." },
      { stepNumber: 17, description: "Bake for 30-40 minutes, or until the top is golden brown and bubbly." },
      { stepNumber: 18, description: "Let the lasagna rest for at least 10-15 minutes before cutting and serving. This helps the layers set." }
    ],
    notes: [
      "Authentic Bolognese ragù emphasizes meat flavor; garlic and herbs are generally not included.",
      "Using fresh spinach pasta sheets (Lasagne Verdi) is traditional in Bologna.",
      "The very slow, long cooking of the ragù is essential for deep flavor development.",
      "Aim for thin, delicate layers rather than thick, heavy ones.",
      "Resting the lasagna after baking is crucial for clean slicing.",
      "Fermented Ingredients: Red Wine (fermented grapes), Parmigiano-Reggiano (aged, fermented cow's milk).",
      "FODMAP notes: This dish is very high in FODMAPs. High FODMAP ingredients include Pancetta (check processing/additives), Celery (mannitol), Onion (fructans), Tomato Paste (fructans/fructose - limit portion), Red Wine (fructose), Milk (lactose), Pasta Sheets (wheat - fructans), Flour (wheat - fructans), Nutmeg (>2 tsp is high), and Parmigiano (lactose - low in small portions). Carrots are moderate in larger amounts. Low FODMAP ingredients: Ground Beef, Ground Pork, Butter, Salt, Pepper. Recommendations for strictly Low FODMAP: Extensive modifications needed. Omit onion/celery (use infused oils, leek/fennel greens limited), use lactose-free milk, gluten-free pasta/flour, limit tomato paste/wine, check pancetta, use lactose-free hard cheese.",
      "Vitamins & Minerals: Ground Beef/Pork/Pancetta provide protein, iron, zinc, selenium, B vitamins. Carrots offer Vitamin A. Celery gives Vitamin K. Onion provides Vitamin C, B6. Tomato Paste supplies lycopene, potassium. Red Wine adds antioxidants. Milk/Béchamel contribute calcium, Vitamin D (if fortified). Pasta/Flour (enriched) give iron, B vitamins. Butter adds Vitamin A, D. Nutmeg has trace minerals. Parmigiano-Reggiano is rich in calcium, protein, phosphorus."
    ],
    nutritionFacts: {
      protein: 42,
      carbs: 45,
      fat: 38,
      fiber: 3,
      sugar: 6,
      sodium: 890 // Highly variable
    }
  },
  {
    title: 'Caponata',
    description: 'A sweet and sour Sicilian eggplant dish that embodies the island\'s Arabic influences. This versatile antipasto can be served hot or cold and improves in flavor over time.',
    cookingTime: 60,
    servings: 6,
    difficulty: 'MEDIUM',
    cuisineType: 'Europe',
    regionOfOrigin: 'Italy',
    imageUrl: '/images/recipes/caponata.jpg',
    calories: 220,
    type: 'SIDE',
    isVegetarian: true,
    isVegan: true,
    isGlutenFree: true,
    isPescatarian: false,
    isLactoseFree: true,
    isNutFree: true, // Note: Pine Nuts are seeds, generally okay for tree nut allergies but check individual sensitivities.
    isFermented: true,
    isLowFodmap: false,
    ingredients: [
      { name: 'Eggplants', amount: 1000, unit: 'g', notes: 'cut into 2.5cm cubes' },
      { name: 'Celery', amount: 4, unit: 'stalks', notes: 'cut into 1cm pieces' },
      { name: 'Onions', amount: 2, unit: 'medium', notes: 'chopped' },
      { name: 'Tomatoes', amount: 400, unit: 'g', notes: 'ripe, chopped' },
      { name: 'Green Olives', amount: 100, unit: 'g', notes: 'pitted' },
      { name: 'Capers', amount: 50, unit: 'g', notes: 'rinsed' },
      { name: 'Pine Nuts', amount: 50, unit: 'g', notes: 'toasted' },
      { name: 'Vinegar', amount: 60, unit: 'ml', notes: 'white wine vinegar' },
      { name: 'Sugar', amount: 2, unit: 'tablespoons' },
      { name: 'Olive Oil', amount: 120, unit: 'ml', notes: 'extra virgin' },
      { name: 'Basil', amount: 1, unit: 'bunch', notes: 'fresh leaves' }
    ],
    instructions: [
      { stepNumber: 1, description: 'Salt the eggplant cubes and let drain in a colander for 1 hour.' },
      { stepNumber: 2, description: 'Rinse eggplant and pat thoroughly dry with paper towels.' },
      { stepNumber: 3, description: 'Heat oil in a large pan and fry eggplant in batches until golden. Remove and drain.' },
      { stepNumber: 4, description: 'In the same pan, cook celery until tender-crisp. Remove and set aside.' },
      { stepNumber: 5, description: 'Cook onions until soft and translucent.' },
      { stepNumber: 6, description: 'Add tomatoes and cook until they start to break down.' },
      { stepNumber: 7, description: 'Return celery to the pan, add olives and capers.' },
      { stepNumber: 8, description: 'Mix vinegar with sugar and add to the pan.' },
      { stepNumber: 9, description: 'Return eggplant to the pan and simmer gently for 15 minutes.' },
      { stepNumber: 10, description: 'Add pine nuts and torn basil leaves.' },
      { stepNumber: 11, description: 'Let cool to room temperature before serving.' }
    ],
    notes: [
      "Each Sicilian family has their own version - some add raisins or chocolate.",
      "Salting the eggplant prevents it from absorbing too much oil.",
      "The sweet and sour flavor should be balanced - adjust vinegar and sugar to taste.",
      "Caponata tastes better the next day after flavors have melded.",
      "Traditionally served as an antipasto with bread, but also works as a side dish.",
      "Contains fermented ingredients: Green Olives and Capers (typically preserved through lactic acid fermentation in brine), White Wine Vinegar (acetic acid fermentation of ethanol).",
      "High-FODMAP ingredients include: Onions. Celery can be high-FODMAP in larger servings (more than 1 medium stalk per person).",
      "Low-FODMAP ingredients include: Eggplant, Tomatoes (moderate amounts are low-FODMAP), Green Olives, Capers (in moderation), Pine Nuts (in moderation), Vinegar, Sugar, Olive Oil, Basil.",
      "To make this strictly low-FODMAP: Replace onions with the green tops of spring onions (scallions) or use garlic-infused oil for flavour instead of onion. Limit celery to a low-FODMAP serving size (approx. 10g or less than half a small stalk per serving) or omit. Ensure tomatoes do not exceed the recommended serving size (e.g., half a medium tomato per person). Limit pine nuts to 1 tablespoon per serving.",
      "Nutrient Profile: Eggplants provide fiber, manganese, folate, potassium, and Vitamin K. Celery offers Vitamin K, Vitamin A, folate, and potassium. Onions contain Vitamin C, B6, folate, and manganese. Tomatoes are rich in Vitamin C, potassium, folate, and Vitamin K, plus the antioxidant lycopene. Green Olives provide Vitamin E, iron, copper, and calcium, along with healthy fats. Capers offer Vitamin K, sodium, and antioxidants. Pine Nuts contribute Vitamin E, Vitamin K, magnesium, phosphorus, and zinc. Vinegar is primarily acetic acid. Sugar provides carbohydrates. Olive Oil is high in monounsaturated fats and Vitamin E. Basil contains Vitamin K and antioxidants."
    ],
    nutritionFacts: {
      protein: 5,
      carbs: 18,
      fat: 16,
      fiber: 7,
      sugar: 10,
      sodium: 380
    }
  },
  {
    title: 'Vitello Tonnato',
    description: 'A classic Piedmontese dish of thinly sliced poached veal served with a creamy tuna-flavored sauce. Popular as a summer dish, it\'s traditionally served on Ferragosto (August 15th).',
    cookingTime: 180,
    servings: 6,
    difficulty: 'MEDIUM',
    cuisineType: 'Europe',
    regionOfOrigin: 'Italy',
    imageUrl: '/images/recipes/vitello_tonnato.jpg',
    calories: 320,
    type: 'MAIN',
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: true,
    isPescatarian: false, // Contains veal
    isLactoseFree: true,
    isNutFree: true,
    isFermented: true,
    isLowFodmap: false,
    ingredients: [
      { name: 'Veal', amount: 1000, unit: 'g', notes: 'girello/eye round' },
      { name: 'Tuna', amount: 200, unit: 'g', notes: 'oil-packed' },
      { name: 'Anchovies', amount: 4, unit: 'fillets' },
      { name: 'Capers', amount: 2, unit: 'tablespoons', notes: 'rinsed' },
      { name: 'Egg Yolks', amount: 3, unit: 'large', notes: 'hard-boiled' },
      { name: 'Lemon Juice', amount: 2, unit: 'tablespoons', notes: 'fresh' },
      { name: 'Olive Oil', amount: 120, unit: 'ml', notes: 'extra virgin' },
      { name: 'White Wine', amount: 250, unit: 'ml', notes: 'dry' },
      { name: 'Carrots', amount: 2, unit: 'medium' },
      { name: 'Celery', amount: 2, unit: 'stalks' },
      { name: 'Onion', amount: 1, unit: 'large' },
      { name: 'Bay Leaves', amount: 2, unit: 'pieces' },
      { name: 'Black Peppercorns', amount: 1, unit: 'tablespoon' }
    ],
    instructions: [
      { stepNumber: 1, description: 'Tie the veal with kitchen twine to maintain shape.' },
      { stepNumber: 2, description: 'Place veal in a pot with vegetables, wine, bay leaves, and peppercorns.' },
      { stepNumber: 3, description: 'Add water to cover, bring to simmer, and cook for 1.5 hours or until tender.' },
      { stepNumber: 4, description: 'Let meat cool completely in its cooking liquid.' },
      { stepNumber: 5, description: 'For the sauce: blend tuna, anchovies, capers, and egg yolks until smooth.' },
      { stepNumber: 6, description: 'Gradually blend in olive oil and lemon juice until creamy.' },
      { stepNumber: 7, description: 'Thin sauce with a few tablespoons of the meat cooking liquid if needed.' },
      { stepNumber: 8, description: 'Slice the cooled veal very thinly against the grain.' },
      { stepNumber: 9, description: 'Arrange veal slices on a serving platter.' },
      { stepNumber: 10, description: 'Cover completely with the tuna sauce.' },
      { stepNumber: 11, description: 'Refrigerate for at least 24 hours before serving.' },
      { stepNumber: 12, description: 'Garnish with capers and lemon wedges before serving.' }
    ],
    notes: [
      "The success of this dish depends on very thin slicing of the veal.",
      "The sauce should be creamy but not too thick - it should coat the meat like a thick mayonnaise.",
      "Traditional recipes use veal girello, but other lean cuts can work.",
      "The dish must rest overnight for flavors to develop.",
      "Serve chilled but not ice-cold to appreciate the flavors.",
      "Contains fermented ingredients: Anchovies (salt-cured, involving enzymatic fermentation), Capers (lactic acid fermentation in brine), White Wine (alcoholic fermentation).",
      "High-FODMAP ingredients include: Onion. Celery can be high-FODMAP in larger servings.",
      "Low-FODMAP ingredients include: Veal, Tuna, Anchovies (in moderation), Capers (in moderation), Egg Yolks, Lemon Juice, Olive Oil, Carrots, Bay Leaves, Black Peppercorns.",
      "To make this strictly low-FODMAP: Replace onion with green tops of spring onions or omit. Use garlic-infused oil if garlic is typically added (though not listed). Limit celery to low-FODMAP serving size or omit. Ensure the cooking liquid used for thinning the sauce doesn't concentrate FODMAPs from onion/celery.",
      "Nutrient Profile: Veal is rich in protein, B vitamins (B12, niacin, B6), phosphorus, zinc, and selenium. Tuna provides protein, omega-3 fatty acids, Vitamin D, B12, and selenium. Anchovies offer omega-3s, calcium, selenium, and niacin. Capers contain Vitamin K and sodium. Egg Yolks are sources of Vitamin D, B12, choline, selenium, and fat. Lemon Juice provides Vitamin C. Olive Oil offers monounsaturated fats and Vitamin E. White Wine contains antioxidants. Carrots are high in Vitamin A (beta-carotene), biotin, Vitamin K, and potassium. Celery gives Vitamin K, A, folate, and potassium. Onion contains Vitamin C, B6, folate, and manganese. Bay leaves and Peppercorns add trace minerals and antioxidants."
    ],
    nutritionFacts: {
      protein: 35,
      carbs: 3,
      fat: 22,
      fiber: 1,
      sugar: 2,
      sodium: 450
    }
  },
  
  {
    title: "Dolmades",
    description: "Grape leaves stuffed with a savory rice mixture, often served as a meze. While found throughout the Mediterranean and Middle East, Greek dolmades are distinctive for their use of fresh herbs and lemon. The dish dates back to the time of Alexander the Great and was a way to preserve grape leaves after the harvest.",
    cookingTime: 90,
    servings: 6,
    difficulty: "MEDIUM",
    cuisineType: "Europe",
    regionOfOrigin: "Greece",
    imageUrl: "/images/recipes/dolmades.jpg",
    calories: 220,
    type: "SNACK",
    isVegetarian: true,
    isVegan: true,
    isGlutenFree: true,
    isPescatarian: false,
    isLactoseFree: true,
    isNutFree: true,
    isFermented: true,
    isLowFodmap: false,
    ingredients: [
      { name: "Grape Leaves", amount: 50, unit: "pieces", notes: "preserved" },
      { name: "Rice", amount: 2, unit: "cups", notes: "short grain" },
      { name: "Onion", amount: 1, unit: "large", notes: "finely chopped" },
      { name: "Fresh Dill", amount: 0.5, unit: "cup", notes: "chopped" },
      { name: "Fresh Mint", amount: 0.25, unit: "cup", notes: "chopped" },
      { name: "Lemon Juice", amount: 0.25, unit: "cup" },
      { name: "Olive Oil", amount: 0.5, unit: "cup" }
    ],
    instructions: [
      { stepNumber: 1, description: "Rinse grape leaves and soak in hot water" },
      { stepNumber: 2, description: "Mix rice with herbs, onion, and seasonings" },
      { stepNumber: 3, description: "Place a small amount of filling on each leaf" },
      { stepNumber: 4, description: "Roll leaves tightly, tucking in sides" },
      { stepNumber: 5, description: "Layer in pot and cook with lemon-water mixture" }
    ],
    notes: [
      "Can be served hot or cold",
      "Keeps well in refrigerator for several days",
      "Traditional meze dish",
      "Contains fermented ingredients: Preserved Grape Leaves (typically brined, involving lactic acid fermentation).",
      "High-FODMAP ingredients include: Onion.",
      "Low-FODMAP ingredients include: Grape Leaves (in moderation), Rice, Dill, Mint, Lemon Juice, Olive Oil.",
      "To make this strictly low-FODMAP: Replace onion with the green tops of spring onions (scallions) or use garlic-infused oil for flavour (if garlic is typically added, though not listed). Limit serving size according to grape leaf FODMAP content if necessary (consult Monash app for specific limits).",
      "Nutrient Profile: Grape Leaves provide Vitamin K, Vitamin A, calcium, iron, and fiber. Rice is a source of carbohydrates, manganese, and selenium. Onion offers Vitamin C, B6, folate, and manganese. Dill contains Vitamin C, manganese, and Vitamin A. Mint provides antioxidants and trace minerals. Lemon Juice is rich in Vitamin C. Olive Oil contributes monounsaturated fats and Vitamin E."
    ],
    nutritionFacts: { // Nutrition facts seem high for protein/low carbs for a rice dish, might need review.
      protein: 35, // Likely overestimated for a vegan rice dish
      carbs: 8,   // Likely underestimated
      fat: 3,    // Likely underestimated due to olive oil
      fiber: 2,
      sugar: 2,
      sodium: 400
    }
  },
  {
    title: "Pastitsio",
    description: "A hearty baked pasta dish layered with ground meat, tubular pasta, and topped with béchamel sauce. Often called 'Greek lasagna,' this dish shows the influence of Italian cuisine on Greek cooking, particularly in regions like the Ionian Islands, which were under Venetian rule.",
    cookingTime: 90,
    servings: 8,
    difficulty: "MEDIUM",
    cuisineType: "Europe",
    regionOfOrigin: "Greece",
    imageUrl: "/images/recipes/pastitsio.jpg",
    calories: 550,
    type: "MAIN",
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: false, // Contains wheat pasta and flour
    isPescatarian: false,
    isLactoseFree: false, // Contains milk and butter
    isNutFree: true, // Note: Nutmeg is a seed, not a nut.
    isFermented: false, // Main ingredients are not typically fermented.
    isLowFodmap: false,
    ingredients: [
      { name: "Penne or Bucatini", amount: 500, unit: "grams" }, // Wheat-based
      { name: "Ground Beef", amount: 750, unit: "grams" },
      { name: "Onion", amount: 1, unit: "large", notes: "chopped" },
      { name: "Garlic", amount: 3, unit: "cloves", notes: "minced" },
      { name: "Tomato Paste", amount: 2, unit: "tablespoons" },
      { name: "Milk", amount: 1, unit: "liter" }, // Contains lactose
      { name: "Flour", amount: 100, unit: "grams" }, // Wheat-based
      { name: "Butter", amount: 100, unit: "grams" }, // Contains lactose
      { name: "Nutmeg", amount: 0.5, unit: "teaspoon" },
      { name: "Eggs", amount: 2, unit: "large" }
    ],
    instructions: [
      { stepNumber: 1, description: "Cook pasta and prepare meat sauce with tomatoes and spices" },
      { stepNumber: 2, description: "Make béchamel sauce with butter, flour, and milk" },
      { stepNumber: 3, description: "Layer pasta, meat sauce in baking dish" },
      { stepNumber: 4, description: "Top with béchamel sauce" },
      { stepNumber: 5, description: "Bake until golden brown" }
    ],
    notes: [
      "Can be made ahead and reheated",
      "Traditional Sunday dinner dish",
      "Freezes well",
      "High-FODMAP ingredients include: Pasta (wheat), Onion, Garlic, Milk (lactose), Flour (wheat). Butter contains lactose but is often low-FODMAP in typical serving sizes.",
      "Low-FODMAP ingredients include: Ground Beef, Tomato Paste (in moderation), Nutmeg, Eggs.",
      "To make this strictly low-FODMAP: Use gluten-free pasta. Replace onion and garlic with green tops of spring onions and garlic-infused oil. For the béchamel, use lactose-free milk, a low-FODMAP fat source (like olive oil or more butter if tolerated), and gluten-free flour blend (check ingredients for high-FODMAP items like soy or bean flours).",
      "Nutrient Profile: Pasta provides carbohydrates and B vitamins. Ground Beef is rich in protein, iron, zinc, selenium, and B vitamins (B12, B6, niacin). Onion offers Vitamin C, B6, folate, manganese. Garlic provides manganese, Vitamin B6, C, selenium, and allicin. Tomato Paste is a concentrated source of lycopene, Vitamin C, and potassium. Milk is high in calcium, Vitamin D (if fortified), protein, B12, and riboflavin. Flour provides carbohydrates. Butter contributes fat, Vitamin A, and D. Nutmeg adds trace minerals. Eggs offer high-quality protein, Vitamin D, B12, selenium, and choline."
    ],
    nutritionFacts: { // Fat seems low given beef, butter, eggs, milk. Carbs seem low for pasta amount.
      protein: 45,
      carbs: 28,
      fat: 2,
      fiber: 6,
      sugar: 6,
      sodium: 700
    }
  },
  {
    title: "Avgolemono",
    description: "A silky, citrus-scented soup made with chicken broth, rice or orzo, and finished with eggs and lemon juice. This comforting soup is considered a national dish of Greece and is often served during winter months or to those feeling under the weather. While common throughout Greece, each region has its own variation.",
    cookingTime: 45,
    servings: 6,
    difficulty: "MEDIUM",
    cuisineType: "Europe",
    regionOfOrigin: "Greece",
    imageUrl: "/images/recipes/avgolemono.jpg",
    calories: 280,
    type: "MAIN",
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: true, // If using rice, ensure stock is GF
    isPescatarian: false,
    isLactoseFree: true,
    isNutFree: true,
    isFermented: false, // Core ingredients are not fermented. Stock might contain fermented elements (yeast extract).
    isLowFodmap: false, // Depends on stock and choice of rice/orzo
    ingredients: [
      { name: "Chicken Stock", amount: 2, unit: "liters" }, // Check for onion/garlic
      { name: "Rice or Orzo", amount: 1, unit: "cup" }, // Orzo contains wheat (high-FODMAP)
      { name: "Eggs", amount: 3, unit: "large" },
      { name: "Lemons", amount: 2, unit: "whole", notes: "juiced" },
      { name: "Chicken Breast", amount: 500, unit: "grams", notes: "cooked and shredded" },
      { name: "Salt", amount: 1, unit: "teaspoon" },
      { name: "Black Pepper", amount: 0.5, unit: "teaspoon" }
    ],
    instructions: [
      { stepNumber: 1, description: "Bring stock to boil and cook rice until tender" },
      { stepNumber: 2, description: "Whisk eggs with lemon juice until frothy" },
      { stepNumber: 3, description: "Slowly temper hot broth into egg mixture" },
      { stepNumber: 4, description: "Return mixture to pot and heat gently" },
      { stepNumber: 5, description: "Add shredded chicken and season" }
    ],
    notes: [
      "Never let soup boil after adding egg mixture",
      "Can be made with turkey or just vegetables",
      "Traditional remedy for colds",
      "High-FODMAP ingredients: Orzo (contains wheat). Chicken Stock often contains onion and garlic.",
      "Low-FODMAP ingredients: Rice, Eggs, Lemons, Chicken Breast, Salt, Black Pepper.",
      "To make this strictly low-FODMAP: Use rice instead of orzo. Use a certified low-FODMAP chicken stock or make your own without onion and garlic (using green onion tops/leek tops and garlic-infused oil for flavour if desired).",
      "Nutrient Profile: Chicken Stock provides hydration, electrolytes, and collagen (if bone broth). Rice offers carbohydrates, manganese, selenium. Orzo (wheat) provides carbohydrates, fiber, B vitamins. Eggs are rich in protein, Vitamin D, B12, selenium, choline. Lemons contribute Vitamin C. Chicken Breast is high in lean protein, B vitamins (niacin, B6, B12), phosphorus, and selenium. Salt provides sodium. Black Pepper contains piperine and trace minerals."
    ],
    nutritionFacts: { // Fat seems low for a recipe with eggs and potentially fatty stock. Carbs low for 1 cup rice/orzo.
      protein: 35,
      carbs: 8,
      fat: 2,
      fiber: 2,
      sugar: 3,
      sodium: 480
    }
  },
  {
    title: 'Jollof Rice',
    description: 'A beloved West African dish of fragrant rice cooked in a rich tomato and pepper sauce with aromatic spices. This iconic dish is a staple at celebrations and gatherings across West Africa, particularly in Nigeria, Ghana, Senegal, and other neighboring countries. Each region has its own unique twist, leading to friendly rivalries about which country makes it best.',
    cookingTime: 75,
    servings: 6,
    difficulty: 'MEDIUM',
    cuisineType: 'Africa',
    regionOfOrigin: 'Nigeria',
    imageUrl: '/images/recipes/jollof_rice.jpg',
    calories: 380,
    type: 'MAIN',
    isVegetarian: true, // If using vegetable stock cubes
    isVegan: true, // If using vegetable stock cubes
    isGlutenFree: true, // Ensure stock cubes are GF
    isPescatarian: false,
    isLactoseFree: true,
    isNutFree: true,
    isFermented: true, // Stock cubes often contain yeast extract.
    isLowFodmap: false,
    ingredients: [
      { name: 'Long Grain Rice', amount: 3, unit: 'cups', notes: 'rinsed until water runs clear' },
      { name: 'Plum Tomatoes', amount: 6, unit: 'large', notes: 'roughly chopped' },
      { name: 'Red Bell Peppers', amount: 3, unit: 'medium', notes: 'roughly chopped' },
      { name: 'Scotch Bonnet Pepper', amount: 1, unit: 'piece', notes: 'deseeded (adjust to taste)' },
      { name: 'Onions', amount: 2, unit: 'large', notes: '1 roughly chopped, 1 finely diced' },
      { name: 'Tomato Paste', amount: 3, unit: 'tablespoons' },
      { name: 'Vegetable Oil', amount: 0.5, unit: 'cup' },
      { name: 'Bay Leaves', amount: 2, unit: 'pieces' },
      { name: 'Curry Powder', amount: 1, unit: 'tablespoon' }, // Check ingredients for FODMAPs
      { name: 'Thyme', amount: 1, unit: 'teaspoon', notes: 'dried' },
      { name: 'Garlic', amount: 4, unit: 'cloves', notes: 'minced' },
      { name: 'Ginger', amount: 2, unit: 'inches', notes: 'peeled and minced' },
      { name: 'Stock Cubes', amount: 2, unit: 'pieces', notes: 'use vegetable stock for a vegan recipe' }, // Check for onion/garlic/gluten
      { name: 'Salt', amount: 1, unit: 'teaspoon', notes: 'to taste' },
      { name: 'White Pepper', amount: 0.5, unit: 'teaspoon' }
    ],
    instructions: [
      // ... (instructions remain the same)
       { stepNumber: 1, description: 'Blend tomatoes, red bell peppers, scotch bonnet, and the roughly chopped onion into a smooth paste using a food processor.' },
      { stepNumber: 2, description: 'Heat vegetable oil in a large, heavy-bottomed pot over medium heat. Add the finely diced onion and sauté until golden brown, about 5-7 minutes.' },
      { stepNumber: 3, description: 'Add tomato paste and fry for 3-4 minutes until the oil slightly separates from the paste.' },
      { stepNumber: 4, description: 'Pour in the blended tomato-pepper mixture. Cook on medium-high heat, stirring occasionally, until the water evaporates and the sauce thickens (about 20-25 minutes).' },
      { stepNumber: 5, description: 'Add minced garlic, ginger, curry powder, thyme, bay leaves, stock cubes, salt, and white pepper. Stir well and cook for another 5 minutes.' },
      { stepNumber: 6, description: 'Add the washed rice and stir until well coated with the sauce. Add 2.5 cups of hot water, stir once, and cover with foil and a tight-fitting lid.' },
      { stepNumber: 7, description: 'Reduce heat to low and cook for 30-35 minutes, or until rice is tender. Do not stir while cooking.' },
      { stepNumber: 8, description: 'After 30 minutes, check if rice is cooked. If needed, add a little more hot water and continue cooking.' },
      { stepNumber: 9, description: 'Once done, let it rest for 10 minutes, then fluff with a fork before serving.' }
    ],
    notes: [
      "The characteristic smoky flavor comes from allowing the bottom layer to crisp slightly (but not burn) - this is called 'socarat' in some regions.",
      "Different regions have variations: Ghanaian Jollof often uses jasmine rice and additional spices, while Nigerian Jollof typically uses long-grain rice.",
      "For extra flavor, you can use chicken or beef stock instead of water.",
      "The scotch bonnet pepper adds authentic heat - adjust amount based on preference.",
      "Party Jollof is often cooked over firewood for an extra smoky flavor.",
      "Contains fermented ingredients: Stock Cubes often contain yeast extract or other fermented flavor enhancers.",
      "High-FODMAP ingredients include: Onions, Garlic. Stock cubes and curry powder may also contain high-FODMAP ingredients.",
      "Low-FODMAP ingredients include: Rice, Tomatoes (in moderation), Red Bell Peppers (in moderation), Scotch Bonnet Pepper, Tomato Paste (in moderation), Vegetable Oil, Bay Leaves, Thyme, Ginger, Salt, White Pepper.",
      "To make this strictly low-FODMAP: Replace onions and garlic with green tops of spring onions and garlic-infused oil. Use a certified low-FODMAP stock cube/powder or homemade low-FODMAP broth. Check curry powder ingredients carefully or make your own blend using low-FODMAP spices. Limit tomato and red bell pepper amounts per serving according to low-FODMAP guidelines.",
      "Nutrient Profile: Rice provides carbohydrates, manganese, selenium. Tomatoes offer Vitamin C, potassium, folate, lycopene. Red Bell Peppers are high in Vitamin C, Vitamin A, and B6. Scotch Bonnet Peppers provide Vitamin C and capsaicin. Onions contain Vitamin C, B6, folate, manganese. Tomato Paste is concentrated in lycopene, Vitamin C, potassium. Vegetable Oil provides fat. Bay leaves, Thyme, Ginger, Curry Powder, White Pepper add flavor, antioxidants and trace minerals. Garlic contributes manganese, B6, C, selenium, allicin. Stock Cubes add sodium and flavor compounds."
    ],
    nutritionFacts: {
      protein: 6,
      carbs: 65,
      fat: 12,
      fiber: 3,
      sugar: 4,
      sodium: 380 // Likely higher with stock cubes and added salt
    }
  },
   {
    title: 'Fufu ati Egusi Soup',
    description: 'A classic West African combination featuring smooth, pounded fufu (made from cassava and plantains) served with a rich, nutty soup made from ground melon seeds (egusi) and filled with leafy greens and protein. This hearty dish is particularly popular in Nigeria, Ghana, and Cameroon, with each region adding its own unique blend of ingredients and spices.',
    cookingTime: 90,
    servings: 6,
    difficulty: 'HARD',
    cuisineType: 'Africa',
    regionOfOrigin: 'Nigeria',
    imageUrl: '/images/recipes/fufu-egusi.jpg',
    calories: 450, // Highly variable based on fufu portion and oil/meat
    type: 'MAIN',
    isVegetarian: false, // Contains beef, dried fish, stock fish
    isVegan: false,
    isGlutenFree: true, // Ensure stock cubes are GF
    isPescatarian: false, // Contains beef
    isLactoseFree: true,
    isNutFree: true, // Egusi are seeds, not nuts. Check cross-contamination if allergic.
    isFermented: true,
    isLowFodmap: false,
    ingredients: [
      // For Fufu
      { name: 'Cassava Flour', amount: 2, unit: 'cups', notes: 'or pounded cassava' },
      { name: 'Plantain Flour', amount: 1, unit: 'cup', notes: 'optional, for mixed fufu' },
      { name: 'Hot Water', amount: 2, unit: 'cups', notes: 'approximately, adjust as needed' },
      // For Egusi Soup
      { name: 'Egusi (Ground Melon Seeds)', amount: 2, unit: 'cups' },
      { name: 'Palm Oil', amount: 0.5, unit: 'cup' },
      { name: 'Beef', amount: 500, unit: 'grams', notes: 'cut into bite-sized pieces' },
      { name: 'Dried Fish', amount: 100, unit: 'grams', notes: 'soaked and deboned' }, // Often fermented/smoked
      { name: 'Stock Fish', amount: 100, unit: 'grams', notes: 'soaked and cleaned' }, // Often air-dried/fermented
      { name: 'Spinach', amount: 2, unit: 'bunches', notes: 'chopped (or bitter leaf)' },
      { name: 'Onions', amount: 2, unit: 'medium', notes: 'chopped' },
      { name: 'Habanero Peppers', amount: 2, unit: 'pieces', notes: 'chopped (adjust to taste)' },
      { name: 'Locust Beans', amount: 2, unit: 'tablespoons', notes: 'iru or ogiri' }, // Fermented
      { name: 'Stock Cubes', amount: 2, unit: 'pieces' }, // Check ingredients
      { name: 'Salt', amount: 1, unit: 'teaspoon', notes: 'to taste' }
    ],
    instructions: [
      // ... (instructions remain the same)
      // Fufu Instructions
      { stepNumber: 1, description: 'For fufu: Gradually add hot water to cassava flour (and plantain flour if using) in a large bowl, stirring vigorously with a wooden spoon.' },
      { stepNumber: 2, description: 'Knead the mixture until it becomes smooth and forms a dough-like consistency. The fufu should be firm but pliable.' },
      { stepNumber: 3, description: 'Shape into smooth balls and keep warm by covering with plastic wrap.' },
      // Egusi Soup Instructions
      { stepNumber: 4, description: 'Season beef with onions, stock cube, and salt. Cook until tender, about 30 minutes. Reserve the stock.' },
      { stepNumber: 5, description: 'Mix ground egusi with chopped onions to form a paste. Heat palm oil in a large pot until hot.' },
      { stepNumber: 6, description: 'Add the egusi paste in small portions, stirring to form lumps. Fry until golden brown, about 10 minutes.' },
      { stepNumber: 7, description: 'Add the meat stock, cooked beef, dried fish, and stock fish. Simmer for 10 minutes.' },
      { stepNumber: 8, description: 'Add locust beans, remaining onions, and peppers. Cook for 5 minutes.' },
      { stepNumber: 9, description: 'Add chopped spinach, adjust seasoning, and simmer for 5 more minutes.' },
      { stepNumber: 10, description: 'Serve hot with prepared fufu balls.' }
    ],
    notes: [
      "The consistency of fufu is crucial - it should be smooth and slightly elastic.",
      "Different regions use various leafy greens: bitter leaf in Nigeria, spinach or collard greens elsewhere.",
      "The soup should be thick enough to coat the back of a spoon.",
      "Traditional eating method is to pinch off a small piece of fufu, make an indentation, and use it to scoop up the soup.",
      "Egusi seeds can be ground at home or bought pre-ground from African markets.",
      "Contains fermented ingredients: Locust Beans (iru/ogiri), Dried Fish, Stock Fish (often involve fermentation/drying processes), Stock Cubes (may contain yeast extract).",
      "High-FODMAP ingredients include: Onions, Locust Beans. Cassava flour and Plantain flour can be high in larger servings. Stock cubes may contain onion/garlic.",
      "Low-FODMAP ingredients include: Egusi seeds (check portion size), Palm Oil, Beef, Spinach (common), Habanero Peppers, Salt.",
      "To make this strictly low-FODMAP: Replace onions with green tops of spring onions/leeks. Omit locust beans (or use a tiny amount of asafoetida powder if tolerated). Use certified low-FODMAP stock. Control portion sizes of fufu (cassava/plantain). Choose low-FODMAP greens like spinach or kale.",
      "Nutrient Profile: Cassava Flour provides carbohydrates. Plantain Flour offers carbs, potassium, Vitamin A, C. Egusi Seeds are rich in protein, healthy fats, phosphorus, magnesium, zinc. Palm Oil is high in saturated fat and Vitamin E (red palm oil also has beta-carotene). Beef offers protein, iron, zinc, B12. Dried/Stock Fish are concentrated sources of protein, calcium, omega-3s (varies). Spinach provides Vitamin K, A, C, folate, iron, magnesium. Onions give C, B6, folate, manganese. Habaneros provide Vitamin C, capsaicin. Locust Beans add umami and some protein/fiber. Stock Cubes add sodium/flavor."
    ],
    nutritionFacts: {
      protein: 25,
      carbs: 45, // Primarily from Fufu
      fat: 28, // Primarily from Palm Oil and Egusi
      fiber: 6,
      sugar: 3,
      sodium: 450 // Likely higher from stock/salt/dried fish
    }
  },
  {
    title: 'Yassa Poulet',
    description: 'A tangy and savory Senegalese dish of marinated chicken cooked with caramelized onions, lemon, and dijon mustard. This dish originated from the Casamance region of Senegal but has become popular throughout West Africa and beyond. The unique combination of citrus, onions, and mustard creates a delightfully complex flavor profile.',
    cookingTime: 90, // Plus marination time
    servings: 6,
    difficulty: 'MEDIUM',
    cuisineType: 'Africa',
    regionOfOrigin: 'Senegal',
    imageUrl: '/images/recipes/yassa-poulet.jpg',
    calories: 420,
    type: 'MAIN',
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: true, // Ensure stock cube and mustard are GF
    isPescatarian: false,
    isLactoseFree: true,
    isNutFree: true,
    isFermented: true,
    isLowFodmap: false,
    ingredients: [
      { name: 'Chicken', amount: 1.5, unit: 'kg', notes: 'whole chicken cut into pieces' },
      { name: 'Onions', amount: 8, unit: 'large', notes: 'thinly sliced' }, // Very high quantity
      { name: 'Lemons', amount: 4, unit: 'whole', notes: 'juiced' },
      { name: 'Dijon Mustard', amount: 4, unit: 'tablespoons' }, // Contains vinegar (fermented)
      { name: 'Garlic', amount: 6, unit: 'cloves', notes: 'minced' },
      { name: 'Vegetable Oil', amount: 0.5, unit: 'cup' },
      { name: 'Bay Leaves', amount: 3, unit: 'pieces' },
      { name: 'Habanero Pepper', amount: 1, unit: 'piece', notes: 'whole (optional)' },
      { name: 'White Vinegar', amount: 2, unit: 'tablespoons' }, // Fermented
      { name: 'Stock Cube', amount: 2, unit: 'pieces', notes: 'chicken flavor' }, // Check ingredients
      { name: 'Black Pepper', amount: 1, unit: 'teaspoon' },
      { name: 'Salt', amount: 1, unit: 'tablespoon', notes: 'to taste' }
    ],
    instructions: [
      // ... (instructions remain the same)
        { stepNumber: 1, description: 'Make the marinade: combine lemon juice, mustard, minced garlic, 1 stock cube, black pepper, and half the salt.' },
      { stepNumber: 2, description: 'Place chicken pieces in a large bowl, pour marinade over them, and massage well. Cover and refrigerate for 4-8 hours or overnight.' },
      { stepNumber: 3, description: 'Remove chicken from marinade (reserve the marinade) and pat dry. Grill or broil until browned on both sides, about 10-15 minutes. Set aside.' },
      { stepNumber: 4, description: 'In a large pot, heat oil over medium heat. Add sliced onions, bay leaves, and remaining salt. Cook until onions are soft and caramelized, about 20-25 minutes.' },
      { stepNumber: 5, description: 'Add reserved marinade, vinegar, remaining stock cube, and 1 cup of water. Bring to a simmer.' },
      { stepNumber: 6, description: 'Add the grilled chicken pieces and whole habanero pepper (if using). Cover and simmer on low heat for 30-40 minutes.' },
      { stepNumber: 7, description: 'Adjust seasoning to taste. The sauce should be tangy and savory, with caramelized onions soft and abundant.' },
      { stepNumber: 8, description: 'Serve hot over rice, removing bay leaves and whole habanero before serving.' }
    ],
    notes: [
      "The key to great Yassa is properly caramelized onions - take your time with this step.",
      "Traditional versions often grill the chicken over charcoal for added smoky flavor.",
      "Some regions add carrots or olives to the dish for extra flavor and color.",
      "The dish can also be made with fish (Yassa Poisson) or lamb.",
      "Overnight marination yields the best results.",
      "Contains fermented ingredients: Dijon Mustard (contains vinegar), White Vinegar (acetic acid fermentation), Stock Cube (may contain yeast extract).",
      "High-FODMAP ingredients include: Onions (in very large quantity), Garlic. Stock cubes may contain onion/garlic.",
      "Low-FODMAP ingredients include: Chicken, Lemons, Dijon Mustard (in moderation), Vegetable Oil, Bay Leaves, Habanero Pepper, White Vinegar, Black Pepper, Salt.",
      "To make this strictly low-FODMAP: This recipe is challenging due to the central role of caramelized onions. A low-FODMAP version would require significant adaptation, perhaps using a large amount of leek green tops instead of onions and garlic-infused oil instead of garlic cloves. Use certified low-FODMAP stock. Check mustard ingredients. Portion size would need to be carefully managed.",
      "Nutrient Profile: Chicken provides protein, B vitamins, selenium, phosphorus. Onions offer Vitamin C, B6, folate, manganese, and fructans (fiber). Lemons are high in Vitamin C. Dijon Mustard adds flavor, trace minerals, and isothiocyanates. Garlic contains manganese, B6, C, selenium, allicin. Vegetable Oil provides fat. Bay Leaves & Black Pepper add trace elements/antioxidants. Habanero gives Vitamin C, capsaicin. Vinegar is mainly acetic acid. Stock Cubes add sodium/flavor."
    ],
    nutritionFacts: {
      protein: 35,
      carbs: 20, // Mostly from onions
      fat: 25,
      fiber: 4, // Mostly from onions
      sugar: 8, // Mostly from onions
      sodium: 580 // Likely higher from stock/salt/mustard
    }
  },
  {
    title: 'Waakye',
    description: 'A beloved Ghanaian dish of rice and beans cooked together with waakye leaves or sorghum stalks, giving it its characteristic reddish-brown color. This complete meal is typically served with a variety of accompaniments and is a popular street food as well as a household staple throughout Ghana.',
    cookingTime: 60, // Plus soaking time for beans
    servings: 6,
    difficulty: 'MEDIUM',
    cuisineType: 'Africa',
    regionOfOrigin: 'Ghana',
    imageUrl: '/images/recipes/waakye.jpg',
    calories: 400, // Base waakye; calories increase significantly with accompaniments
    type: 'MAIN',
    isVegetarian: false, // Often served with non-veg accompaniments like fish or meat stew, Shito contains fish/shrimp
    isVegan: false, // See above; eggs are common too
    isGlutenFree: true, // Base is GF; spaghetti accompaniment is not
    isPescatarian: true, // Shito contains fish/shrimp; often served with fish
    isLactoseFree: true,
    isNutFree: true,
    isFermented: true, // Shito (common accompaniment) is fermented.
    isLowFodmap: false,
    ingredients: [
      { name: 'Long Grain Rice', amount: 2, unit: 'cups', notes: 'rinsed' },
      { name: 'Black-Eyed Peas', amount: 1, unit: 'cup', notes: 'soaked overnight' }, // Moderate-High FODMAP
      { name: 'Waakye Leaves', amount: 6, unit: 'pieces', notes: 'or dried sorghum leaves' },
      { name: 'Baking Soda', amount: 0.5, unit: 'teaspoon' },
      { name: 'Onion', amount: 1, unit: 'medium', notes: 'chopped' }, // High-FODMAP
      { name: 'Garlic', amount: 3, unit: 'cloves', notes: 'minced' }, // High-FODMAP
      { name: 'Salt', amount: 1, unit: 'teaspoon', notes: 'to taste' },
      // Traditional Accompaniments (Often High-FODMAP)
      { name: 'Shito (Black Pepper Sauce)', amount: 0.5, unit: 'cup', notes: 'for serving' }, // Often contains onion/garlic/fermented fish
      { name: 'Gari', amount: 1, unit: 'cup', notes: 'for serving' }, // Cassava, can be high FODMAP
      { name: 'Spaghetti', amount: 200, unit: 'grams', notes: 'cooked, for serving' }, // Wheat, high-FODMAP
      { name: 'Fried Plantains', amount: 2, unit: 'medium', notes: 'sliced and fried, for serving' }, // Ripe plantains are high-FODMAP
      { name: 'Boiled Eggs', amount: 6, unit: 'pieces', notes: 'for serving' } // Low-FODMAP
    ],
    instructions: [
      // ... (instructions remain the same)
       { stepNumber: 1, description: 'Rinse the soaked black-eyed peas and place in a large pot. Add enough water to cover by 2 inches.' },
      { stepNumber: 2, description: 'Add waakye leaves (or sorghum leaves) and baking soda. Bring to a boil, then reduce heat and simmer until peas are almost tender, about 25-30 minutes.' },
      { stepNumber: 3, description: 'Add rice, chopped onion, minced garlic, and salt to the pot. Add more water if needed to cover everything by about 1 inch.' },
      { stepNumber: 4, description: 'Cover and cook on low heat until rice is tender and has absorbed the colored water, about 20-25 minutes.' },
      { stepNumber: 5, description: 'Remove waakye leaves. Fluff the rice and beans mixture with a fork.' },
      { stepNumber: 6, description: 'While the waakye cooks, prepare the accompaniments: fry plantains, boil eggs, and warm the shito sauce.' },
      { stepNumber: 7, description: 'Serve hot waakye with your choice of accompaniments: shito, gari, spaghetti, fried plantains, and boiled eggs.' }
    ],
    notes: [
      "Waakye leaves can be substituted with dried sorghum stalks or leaves - both give the characteristic color.",
      "The baking soda helps soften the beans faster and enhance the color from the leaves.",
      "Traditional street vendors serve waakye in banana leaves.",
      "Each region in Ghana has its preferred combination of accompaniments.",
      "Leftover waakye can be reheated with a splash of water to maintain moisture.",
      "Contains fermented ingredients: Shito, a common accompaniment, is made with fermented fish or shrimp.",
      "High-FODMAP ingredients include: Black-Eyed Peas, Onion, Garlic. Common accompaniments like Shito, Gari, Spaghetti, and ripe Fried Plantains are also typically high-FODMAP.",
      "Low-FODMAP ingredients include: Rice, Waakye Leaves, Baking Soda, Salt, Boiled Eggs. Unripe plantains fried would be low-FODMAP.",
      "To make this strictly low-FODMAP: This is very difficult due to core ingredients and accompaniments. For the base: replace onion/garlic with green onion tops/garlic-infused oil. Limit black-eyed peas to a small portion (e.g., 1/4 cup cooked per person). Avoid high-FODMAP accompaniments: use gluten-free pasta, unripe plantains, avoid Shito/Gari or find certified low-FODMAP versions (unlikely). Stick to boiled eggs and potentially a simple low-FODMAP tomato-based stew.",
      "Nutrient Profile: Rice provides carbs. Black-Eyed Peas offer protein, fiber, folate, iron, potassium. Waakye Leaves add color. Baking Soda is sodium bicarbonate. Onion gives C, B6, folate, manganese. Garlic has manganese, B6, C, selenium, allicin. Salt is sodium chloride. Shito adds spice, umami, fat, sodium. Gari provides carbs. Spaghetti (wheat) gives carbs, B vitamins. Plantains offer carbs, Vitamin C, B6, potassium. Eggs give protein, Vitamin D, B12, choline."
    ],
    nutritionFacts: { // Base Waakye only
      protein: 15,
      carbs: 70,
      fat: 8,
      fiber: 12,
      sugar: 5,
      sodium: 400 // Higher with added salt
    }
  },
   {
    title: 'Suya',
    description: 'A popular Nigerian street food of spiced, skewered beef grilled over open flames. This dish originated from the Hausa people of northern Nigeria but has become a beloved street food throughout West Africa. The distinctive taste comes from a complex spice mixture called yaji or suya spice.',
    cookingTime: 45, // Plus resting time
    servings: 4,
    difficulty: 'MEDIUM',
    cuisineType: 'Africa',
    regionOfOrigin: 'Nigeria',
    imageUrl: '/images/recipes/suya.jpg',
    calories: 320, // Meat & spice only; higher with oil/garnish
    type: 'MAIN', // Often eaten as snack/street food but substantial
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: true, // Ensure bouillon powder is GF
    isPescatarian: false,
    isLactoseFree: true,
    isNutFree: false, // Contains peanuts
    isFermented: true, // Bouillon powder may contain yeast extract.
    isLowFodmap: false,
    ingredients: [
      { name: 'Beef Sirloin', amount: 1, unit: 'kg', notes: 'thinly sliced against the grain' },
      // Suya Spice (Yaji)
      { name: 'Ground Peanuts', amount: 1, unit: 'cup', notes: 'roasted and finely ground' }, // High FODMAP in large amounts
      { name: 'Ground Ginger', amount: 2, unit: 'tablespoons' }, // Low FODMAP
      { name: 'Garlic Powder', amount: 1, unit: 'tablespoon' }, // High FODMAP
      { name: 'Onion Powder', amount: 1, unit: 'tablespoon' }, // High FODMAP
      { name: 'Cayenne Pepper', amount: 1, unit: 'tablespoon', notes: 'adjust to taste' }, // Low FODMAP
      { name: 'Paprika', amount: 1, unit: 'tablespoon' }, // Low FODMAP
      { name: 'Ground Cloves', amount: 0.5, unit: 'teaspoon' }, // Low FODMAP
      { name: 'Bouillon Powder', amount: 1, unit: 'tablespoon' }, // Check ingredients for FODMAPs
      { name: 'Salt', amount: 1, unit: 'teaspoon' }, // Low FODMAP
      // Serving
      { name: 'Red Onions', amount: 2, unit: 'medium', notes: 'sliced' }, // High FODMAP garnish
      { name: 'Tomatoes', amount: 2, unit: 'medium', notes: 'sliced' }, // Low FODMAP garnish (moderate)
      { name: 'Fresh Cabbage', amount: 0.25, unit: 'head', notes: 'shredded' } // Low FODMAP garnish (common cabbage)
    ],
    instructions: [
      // ... (instructions remain the same)
       { stepNumber: 1, description: 'Make the suya spice (yaji): Combine ground peanuts with all the ground spices, bouillon powder, and salt. Mix well.' },
      { stepNumber: 2, description: 'Thread the thinly sliced beef onto skewers, making sure not to pack the meat too tightly.' },
      { stepNumber: 3, description: 'Drizzle the skewered meat with a little oil, then coat generously with the suya spice mixture, pressing to adhere.' },
      { stepNumber: 4, description: 'Let the seasoned meat rest for at least 30 minutes to allow flavors to penetrate.' },
      { stepNumber: 5, description: 'Preheat your grill to high heat. Oil the grates to prevent sticking.' },
      { stepNumber: 6, description: 'Grill the skewers for 3-4 minutes per side for medium doneness, or adjust to your preference.' },
      { stepNumber: 7, description: 'While grilling, sprinkle additional suya spice on the meat for extra flavor.' },
      { stepNumber: 8, description: 'Serve hot with sliced onions, tomatoes, and cabbage. Sprinkle extra suya spice on top if desired.' }
    ],
    notes: [
      "Traditional suya is made with kuli-kuli (ground peanut paste) instead of ground peanuts.",
      "The meat should be sliced very thinly for authentic texture - partially freezing the meat makes this easier.",
      "Suya can also be made with chicken, goat, or lamb.",
      "The spice mixture can be stored in an airtight container for future use.",
      "In Nigeria, suya is often wrapped in newspaper and served with extra spice on the side.",
      "Contains fermented ingredients: Bouillon powder may contain yeast extract or other fermented flavor enhancers.",
      "High-FODMAP ingredients include: Ground Peanuts (in large quantity), Garlic Powder, Onion Powder. Bouillon powder may contain FODMAPs. Red onion garnish is high-FODMAP.",
      "Low-FODMAP ingredients include: Beef Sirloin, Ground Ginger, Cayenne Pepper, Paprika, Ground Cloves, Salt. Tomato and Cabbage garnishes are low-FODMAP in moderation.",
      "To make this strictly low-FODMAP: Omit garlic and onion powders. Significantly reduce the amount of ground peanuts in the spice mix. Use a certified low-FODMAP bouillon powder or omit. Serve without red onion garnish, using only tomato and cabbage in moderation.",
      "Nutrient Profile: Beef Sirloin provides protein, iron, zinc, B12, B6, niacin. Ground Peanuts offer protein, healthy fats, niacin, folate, Vitamin E, magnesium. Ginger contains gingerol (antioxidant). Garlic/Onion Powders are concentrated sources of flavor compounds. Cayenne/Paprika provide Vitamin A, C, capsaicin/antioxidants. Cloves contain eugenol (antioxidant). Bouillon adds sodium/flavor. Salt is sodium chloride. Red Onions give C, B6, folate. Tomatoes offer C, potassium, folate, lycopene. Cabbage provides Vitamin K, C, fiber."
    ],
    nutritionFacts: { // Fat seems low for sirloin + 1 cup peanuts.
      protein: 45,
      carbs: 12, // Primarily from peanuts
      fat: 18,
      fiber: 3,
      sugar: 2,
      sodium: 480 // Higher with bouillon/salt
    }
  },
   {
    title: 'Thieboudienne',
    description: 'The national dish of Senegal, this flavorful one-pot meal combines fish, rice, and vegetables in a rich tomato sauce. Also known as ceebu jen, this dish originated from Saint-Louis, Senegal, and has become a staple throughout West Africa, particularly in Senegal, Gambia, and Mali.',
    cookingTime: 120,
    servings: 8,
    difficulty: 'HARD',
    cuisineType: 'Africa',
    regionOfOrigin: 'Senegal',
    imageUrl: '/images/recipes/thieboudienne.jpg',
    calories: 520,
    type: 'MAIN',
    isVegetarian: false, // Contains fish
    isVegan: false,
    isGlutenFree: true, // Ensure stock cubes are GF
    isPescatarian: true,
    isLactoseFree: true,
    isNutFree: true,
    isFermented: true,
    isLowFodmap: false,
    ingredients: [
      { name: 'Whole Fish', amount: 2, unit: 'kg', notes: 'grouper or sea bass, cleaned and cut into steaks' },
      { name: 'Broken Rice', amount: 4, unit: 'cups', notes: 'or regular rice' },
      { name: 'Tomato Paste', amount: 3, unit: 'tablespoons' },
      { name: 'Fresh Tomatoes', amount: 3, unit: 'large', notes: 'chopped' },
      { name: 'Onions', amount: 3, unit: 'large', notes: '2 chopped, 1 sliced' }, // High FODMAP
      { name: 'Garlic', amount: 6, unit: 'cloves', notes: 'minced' }, // High FODMAP
      { name: 'Parsley', amount: 1, unit: 'bunch', notes: 'chopped' }, // Low FODMAP
      { name: 'Scotch Bonnet Pepper', amount: 1, unit: 'piece', notes: 'whole' }, // Low FODMAP
      { name: 'Dried Fish', amount: 100, unit: 'grams', notes: 'cleaned and soaked' }, // Often fermented/smoked
      // Vegetables (Check FODMAP content - many are moderate/high in larger servings)
      { name: 'Cassava', amount: 2, unit: 'medium', notes: 'peeled and chunked' }, // Moderate FODMAP
      { name: 'Carrots', amount: 4, unit: 'large', notes: 'cut into large pieces' }, // Low FODMAP
      { name: 'Cabbage', amount: 0.5, unit: 'head', notes: 'cut into wedges' }, // Low/Moderate FODMAP depending on type/amount
      { name: 'Eggplant', amount: 2, unit: 'medium', notes: 'quartered' }, // Low FODMAP
      { name: 'Sweet Potatoes', amount: 2, unit: 'medium', notes: 'peeled and chunked' }, // Moderate FODMAP
      // Seasonings
      { name: 'Fish Stock Cubes', amount: 2, unit: 'pieces' }, // Check ingredients for FODMAPs
      { name: 'Bay Leaves', amount: 2, unit: 'pieces' }, // Low FODMAP
      { name: 'Tamarind Paste', amount: 2, unit: 'tablespoons', notes: 'soaked in water' }, // Often fermented, Low FODMAP in moderation
      { name: 'Salt', amount: 1, unit: 'tablespoon', notes: 'to taste' } // Low FODMAP
    ],
    instructions: [
     // ... (instructions remain the same)
       { stepNumber: 1, description: 'Make the stuffing: Combine chopped onions, garlic, parsley, stock cube, and salt. Make slits in fish pieces and stuff with this mixture.' },
      { stepNumber: 2, description: 'Heat oil in a large pot. Fry the fish pieces until golden brown on both sides. Remove and set aside.' },
      { stepNumber: 3, description: 'In the same pot, sauté remaining onions until translucent. Add tomato paste and cook until oil separates.' },
      { stepNumber: 4, description: 'Add fresh tomatoes, bay leaves, and tamarind water. Simmer for 10 minutes.' },
      { stepNumber: 5, description: 'Add 8 cups of water, dried fish, and bring to a boil. Add vegetables in order of cooking time: cassava and carrots first.' },
      { stepNumber: 6, description: 'After 10 minutes, add cabbage, eggplant, and sweet potatoes. Cook until vegetables are almost tender.' },
      { stepNumber: 7, description: 'Remove vegetables and set aside. Add rice to the pot with the cooking liquid. Add fried fish on top.' },
      { stepNumber: 8, description: 'Cover and cook on low heat until rice is done and has absorbed the flavorful liquid, about 20-25 minutes.' },
      { stepNumber: 9, description: 'Arrange rice on a large platter, topped with fish and vegetables. Serve hot.' }
    ],
    notes: [
      "Traditional recipes use broken rice, which absorbs flavors better and yields the right texture.",
      "The vegetables can vary by season and availability.",
      "Some regions add fermented fish paste (guedj) for extra umami.",
      "The bottom of the rice (called xoon) often gets crispy - this is considered a delicacy.",
      "Leftovers taste even better the next day as flavors continue to develop.",
      "Contains fermented ingredients: Dried Fish (often fermented/smoked), Tamarind Paste (can be fermented), Fish Stock Cubes (may contain yeast extract). Guedj (if used) is fermented fish.",
      "High-FODMAP ingredients include: Onions, Garlic. Cassava and Sweet Potatoes are moderate-high in larger servings. Cabbage can be high depending on type/amount. Stock cubes may contain FODMAPs.",
      "Low-FODMAP ingredients include: Fish, Rice, Tomato Paste (moderate), Fresh Tomatoes (moderate), Parsley, Scotch Bonnet Pepper, Carrots, Eggplant, Bay Leaves, Tamarind Paste (moderate), Salt.",
      "To make this strictly low-FODMAP: Replace onion/garlic with green onion/leek tops and garlic-infused oil. Use certified low-FODMAP stock. Carefully portion moderate-FODMAP vegetables like cassava, sweet potato, and cabbage per serving. Omit dried fish or ensure it doesn't add FODMAPs.",
      "Nutrient Profile: Fish (varies by type, e.g., Grouper/Bass) offers protein, B12, selenium, omega-3s. Rice provides carbs. Tomato Paste/Tomatoes give lycopene, C, potassium. Onions/Garlic add flavor, C, B6, manganese, fructans/allicin. Parsley provides K, C, A. Scotch Bonnet gives C, capsaicin. Dried Fish is concentrated protein, calcium. Vegetables (Cassava, Carrots, Cabbage, Eggplant, Sweet Potato) offer a mix of carbs, fiber, vitamins (A, C, K), minerals (potassium, manganese). Stock Cubes add sodium/flavor. Bay Leaves/Tamarind add trace elements/antioxidants."
    ],
    nutritionFacts: {
      protein: 35,
      carbs: 65,
      fat: 18,
      fiber: 8,
      sugar: 6,
      sodium: 600 // Likely higher from stock/salt/dried fish
    }
  },
  {
    title: 'Sadza neNyama (Cornmeal Porridge with Beef Stew)',
    description: 'A traditional Zimbabwean dish made with cornmeal porridge served with a flavorful beef stew. This hearty meal is a staple in Zimbabwean cuisine and is often enjoyed during special occasions.',
    cookingTime: 90, // Can be longer for tender beef
    servings: 6,
    difficulty: 'MEDIUM',
    cuisineType: 'Africa',
    regionOfOrigin: 'Zimbabwe',
    imageUrl: '/images/recipes/sadza-nenyama.jpg',
    calories: 450,
    type: 'MAIN',
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: true, // Ensure stock/Worcestershire are GF
    isPescatarian: false,
    isLactoseFree: true,
    isNutFree: true,
    isFermented: true,
    isLowFodmap: false,
    ingredients: [
      { name: 'Cornmeal', amount: 2, unit: 'cups', notes: 'finely ground' }, // Sadza
      { name: 'Water', amount: 4, unit: 'cups', notes: 'for porridge' }, // Sadza
      // Stew (Nyama)
      { name: 'Beef', amount: 500, unit: 'grams', notes: 'cut into bite-sized pieces' },
      { name: 'Onions', amount: 2, unit: 'large', notes: 'finely chopped' }, // High FODMAP
      { name: 'Garlic', amount: 4, unit: 'cloves', notes: 'minced' }, // High FODMAP
      { name: 'Tomatoes', amount: 2, unit: 'medium', notes: 'finely diced' }, // Low FODMAP (moderate)
      { name: 'Carrots', amount: 2, unit: 'medium', notes: 'finely diced' }, // Low FODMAP
      { name: 'Celery', amount: 2, unit: 'stalks', notes: 'finely diced' }, // Moderate/High FODMAP
      { name: 'Bay Leaves', amount: 2, unit: 'pieces' }, // Low FODMAP
      { name: 'Beef Stock', amount: 1, unit: 'liter', notes: 'for stew' }, // Check ingredients for FODMAPs
      { name: 'Tomato Paste', amount: 2, unit: 'tablespoons', notes: 'for stew' }, // Low FODMAP (moderate)
      { name: 'Worcestershire Sauce', amount: 1, unit: 'tablespoon', notes: 'for stew' }, // Contains fermented anchovies/tamarind
      { name: 'Salt', amount: 1, unit: 'teaspoon', notes: 'for stew' }, // Low FODMAP
      { name: 'Black Pepper', amount: 0.5, unit: 'teaspoon', notes: 'for stew' }, // Low FODMAP
      { name: 'Olive Oil', amount: 2, unit: 'tablespoons', notes: 'for stew' } // Low FODMAP
    ],
    instructions: [
      { stepNumber: 1, description: 'Prepare the porridge (Sadza): In a pot, mix some cornmeal with cold water to form a paste. Bring remaining water to boil, add paste, stir well. Gradually add rest of cornmeal, stirring vigorously until very thick. Reduce heat, cover, steam for 15-20 mins.' }, // Corrected Sadza method
      { stepNumber: 2, description: 'Meanwhile, prepare the stew (Nyama): Heat oil in a large pot. Brown beef pieces. Remove and set aside.' },
      { stepNumber: 3, description: 'In the same pot, sauté onions, garlic, and celery until softened.' },
      { stepNumber: 4, description: 'Add carrots and diced tomatoes, cook for a few minutes.'},
      { stepNumber: 5, description: 'Return beef to pot. Add beef stock, tomato paste, Worcestershire sauce, bay leaves, salt, and pepper.'},
      { stepNumber: 6, description: 'Bring to a simmer, cover, and cook on low heat for 1.5 - 2 hours, or until beef is very tender.'},
      { stepNumber: 7, description: 'Adjust seasoning. Serve the stew alongside or over the sadza.' }
    ],
    notes: [
      "Sadza consistency is key - it should be thick and hold its shape.",
      "The stew develops more flavor with long, slow cooking.",
      "This dish is best served hot.",
       "Contains fermented ingredients: Worcestershire Sauce (contains fermented anchovies/tamarind), Beef Stock (may contain yeast extract).",
      "High-FODMAP ingredients include: Onions, Garlic, Celery. Beef stock and Worcestershire sauce may contain FODMAPs.",
      "Low-FODMAP ingredients include: Cornmeal, Water, Beef, Tomatoes (moderate), Carrots, Bay Leaves, Tomato Paste (moderate), Salt, Black Pepper, Olive Oil. Worcestershire sauce is low-FODMAP in small servings (like 1 tbsp spread over 6 servings).",
      "To make this strictly low-FODMAP: Replace onion/garlic with green onion/leek tops and garlic-infused oil. Limit celery to a small amount or omit. Use certified low-FODMAP beef stock. Ensure cornmeal is pure corn without added high-FODMAP flours.",
      "Nutrient Profile: Cornmeal provides carbohydrates, some fiber, magnesium. Beef is rich in protein, iron, zinc, B12. Onions/Garlic offer flavor, C, B6, manganese. Tomatoes give C, potassium, lycopene. Carrots provide Vitamin A. Celery gives K, A, folate. Bay Leaves/Pepper add trace elements. Beef Stock adds minerals, collagen (if bone broth). Tomato Paste concentrates lycopene, C, potassium. Worcestershire adds umami, sodium. Olive Oil provides monounsaturated fats, E."
    ],
    nutritionFacts: {
      protein: 25, // Seems low for 500g beef / 6 servings
      carbs: 40, // Mainly from cornmeal
      fat: 12,
      fiber: 4,
      sugar: 6,
      sodium: 480 // Higher with stock/Worcestershire/salt
    }
  },
  {
    title: 'Bobotie (Spiced Mince Casserole)',
    description: 'A South African dish made with a mixture of ground beef, lamb, and spices, topped with a creamy egg custard and baked until golden. This flavorful dish is a popular comfort food in South Africa.', // Corrected description - no sauce separate
    cookingTime: 60, // Plus baking time
    servings: 6,
    difficulty: 'MEDIUM',
    cuisineType: 'Africa',
    regionOfOrigin: 'South Africa',
    imageUrl: '/images/recipes/bobotie.jpg',
    calories: 450, // Seems low for meat/egg/cream dish
    type: 'MAIN',
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: true, // Traditionally includes bread soaked in milk (omit/use GF bread for GF) - This version omits bread. Ensure Worcestershire/stock are GF.
    isPescatarian: false,
    isLactoseFree: true, // Contains Cream/Milk - changed flag to false.
    isNutFree: true, // Traditionally includes almonds (omit for nut-free) - This version omits almonds. Ensure Worcestershire is nut-free.
    isFermented: true,
    isLowFodmap: false,
    ingredients: [ // Simplified and corrected typical Bobotie ingredients
      { name: 'Ground Beef', amount: 500, unit: 'grams', notes: 'lean' },
      { name: 'Ground Lamb', amount: 250, unit: 'grams', notes: 'lean (optional, can use all beef)' },
      { name: 'Onions', amount: 2, unit: 'large', notes: 'finely chopped' }, // High FODMAP
      { name: 'Garlic', amount: 4, unit: 'cloves', notes: 'minced' }, // High FODMAP
      { name: 'Curry Powder', amount: 2, unit: 'tablespoons' }, // Check FODMAPs
      { name: 'Turmeric', amount: 1, unit: 'teaspoon' }, // Low FODMAP
      { name: 'Apricot Jam', amount: 2, unit: 'tablespoons' }, // Moderate/High FODMAP (fructose)
      { name: 'Worcestershire Sauce', amount: 1, unit: 'tablespoon' }, // Contains fermented ingredients
      { name: 'Vinegar', amount: 1, unit: 'tablespoon', notes:'cider or white wine'}, // Fermented
      { name: 'Bay Leaves', amount: 2, unit: 'pieces' }, // Low FODMAP
      { name: 'Salt', amount: 1, unit: 'teaspoon' }, // Low FODMAP
      { name: 'Black Pepper', amount: 0.5, unit: 'teaspoon' }, // Low FODMAP
      { name: 'Olive Oil', amount: 2, unit: 'tablespoons' }, // Low FODMAP
      // For Topping (Custard)
      { name: 'Milk', amount: 1, unit: 'cup' }, // High FODMAP (lactose)
      { name: 'Eggs', amount: 2, unit: 'large' }, // Low FODMAP
      { name: 'Salt', amount: 0.25, unit: 'teaspoon' }, // Low FODMAP
      { name: 'Turmeric', amount: 0.25, unit: 'teaspoon' } // Low FODMAP
    ],
    instructions: [ // Simplified and corrected Bobotie instructions
      { stepNumber: 1, description: 'Preheat oven to 180°C (350°F). Grease a baking dish.' },
      { stepNumber: 2, description: 'Heat oil in a large pan. Sauté onions and garlic until softened.' },
      { stepNumber: 3, description: 'Add ground meats and cook until browned, breaking up lumps.' },
      { stepNumber: 4, description: 'Stir in curry powder, turmeric, apricot jam, Worcestershire sauce, vinegar, salt, and pepper. Simmer for 10 minutes.' },
      { stepNumber: 5, description: 'Remove from heat. Discard bay leaves if desired (or leave for baking). Transfer meat mixture to the prepared baking dish.' },
      { stepNumber: 6, description: 'Make the topping: Whisk together milk, eggs, salt, and turmeric.' },
      { stepNumber: 7, description: 'Pour the egg mixture evenly over the meat.' },
      { stepNumber: 8, description: 'Place bay leaves on top if removed earlier. Bake for 30-35 minutes, until the topping is set and golden brown.'}
    ],
    notes: [
      "Traditionally served with yellow rice and chutney.",
      "Adding soaked bread (squeezed dry) to the meat mixture is traditional but omitted here for simplicity/GF option.",
      "Sultanas or raisins are often added to the meat mixture.",
      "Almonds are a common garnish but omitted here for nut-free option.",
       "Contains fermented ingredients: Worcestershire Sauce, Vinegar.",
      "High-FODMAP ingredients include: Onions, Garlic, Milk (lactose), Apricot Jam (fructose). Curry powder and Worcestershire sauce may contain FODMAPs.",
      "Low-FODMAP ingredients include: Ground Beef, Ground Lamb, Turmeric, Bay Leaves, Salt, Black Pepper, Olive Oil, Eggs.",
      "To make this strictly low-FODMAP: Replace onion/garlic with green onion/leek tops and garlic-infused oil. Replace milk with lactose-free milk. Replace apricot jam with a low-FODMAP alternative like strawberry jam (check ingredients) or a small amount of maple syrup/sugar. Use certified low-FODMAP curry powder or make your own blend. Ensure Worcestershire sauce is low-FODMAP in the amount used. Omit raisins/sultanas if typically added.",
      "Nutrient Profile: Ground Meats provide protein, iron, zinc, B12. Onions/Garlic add flavor, C, B6, manganese. Curry Powder/Turmeric offer antioxidants (curcumin). Apricot Jam provides sugar. Worcestershire/Vinegar add flavor. Bay Leaves/Pepper give trace elements. Olive Oil provides fat, E. Milk offers calcium, D (if fortified), protein. Eggs give protein, D, B12, choline."
    ],
    nutritionFacts: { // Original facts likely based on a different ingredient list
      protein: 30, // Seems more plausible with meat/egg/milk
      carbs: 20, // Plausible with jam/milk sugars
      fat: 25, // Plausible with meat/oil/egg yolk
      fiber: 4,
      sugar: 6, // Higher with jam
      sodium: 580 // Plausible with salt/Worcestershire
    }
  },
   {
    title: "Kapenta, Sadza, and Muriwo uneDovi",
    description: "A traditional Zimbabwean meal featuring dried kapenta (matemba), sadza (cornmeal porridge), and muriwo unedovi (African greens in peanut butter sauce). This authentic combination represents the heart of Zimbabwean cuisine, offering a perfect balance of protein, starch, and vegetables.",
    cookingTime: 60,
    servings: 4,
    difficulty: "MEDIUM",
    cuisineType: "Africa",
    regionOfOrigin: "Zimbabwe",
    imageUrl: "/images/recipes/kapenta-sadza-muriwo.jpg",
    calories: 520,
    type: "MAIN",
    isVegetarian: false, // Contains Kapenta (fish)
    isVegan: false,
    isGlutenFree: true, // Ensure curry powder/peanut butter are GF
    isPescatarian: true,
    isLactoseFree: true,
    isNutFree: false, // Contains Peanut Butter
    isFermented: false, // Kapenta drying isn't typically fermentation; Peanut butter isn't typically fermented.
    isLowFodmap: false,
    ingredients: [
      // Kapenta
      { name: "Dried Kapenta", amount: 250, unit: "grams", notes: "matemba, cleaned and sorted" },
      { name: "Onions", amount: 1, unit: "medium", notes: "for kapenta, finely chopped" }, // High FODMAP
      { name: "Tomatoes", amount: 2, unit: "medium", notes: "for kapenta, chopped" }, // Low FODMAP (moderate)
      { name: "Garlic", amount: 1, unit: "clove", notes: "minced, for kapenta" }, // High FODMAP
      { name: "Curry Powder", amount: 0.5, unit: "teaspoon", notes: "for kapenta" }, // Check FODMAPs
      { name: "Tomato Paste", amount: 2, unit: "teaspoons", notes: "for kapenta sauce" }, // Low FODMAP (moderate)
      { name: "Cooking Oil", amount: 2, unit: "tablespoons", notes: "for kapenta" }, // Low FODMAP
      // Sadza
      { name: "Mealie Meal", amount: 3, unit: "cups", notes: "white cornmeal for sadza" }, // Low FODMAP
      { name: "Water", amount: 5, unit: "cups", notes: "for sadza (approx)" }, // Low FODMAP
      // Muriwo uneDovi
      { name: "African Greens", amount: 8, unit: "cups", notes: "rape, kale, or collard greens, finely chopped" }, // Check FODMAPs (Kale/Collards low)
      { name: "Onions", amount: 1, unit: "medium", notes: "for muriwo, finely chopped" }, // High FODMAP
      { name: "Bell Pepper", amount: 1, unit: "medium", notes: "for muriwo, chopped" }, // Low FODMAP (moderate)
      { name: "Garlic", amount: 2, unit: "cloves", notes: "minced, for muriwo" }, // High FODMAP
      { name: 'Ginger', amount: 1, unit: 'inch', notes: 'fresh, minced' }, // Low FODMAP
      { name: 'Smoked Paprika', amount: 1, unit: 'teaspoon', notes: 'for muriwo' }, // Low FODMAP
      { name: "Natural Peanut Butter", amount: 0.25, unit: "cup", notes: "for muriwo sauce" }, // Moderate FODMAP
      { name: "Cooking Oil", amount: 2, unit: "tablespoons", notes: "for muriwo" }, // Low FODMAP
      { name: "Water", amount: 0.25, unit: "cup", notes: "for muriwo sauce" }, // Low FODMAP
      { name: "Salt", amount: 1, unit: "teaspoon", notes: "or to taste, divided" } // Low FODMAP
    ],
    instructions: [ // Slightly adjusted structure for clarity
      { stepNumber: 1, description: "Prepare Kapenta: Soak dried kapenta in hot water for 10 minutes. Drain and pat dry." },
      { stepNumber: 2, description: "Heat 2 tbsp oil for kapenta, fry until lightly browned. Remove." },
      { stepNumber: 3, description: "In same pan, sauté 1 chopped onion and 1 minced garlic clove. Add curry powder." },
      { stepNumber: 4, description: "Add chopped tomatoes and tomato paste. Cook for 3 minutes." },
      { stepNumber: 5, description: "Return kapenta to pan, add a little water, salt to taste. Cover and simmer 10 minutes until sauce thickens." },
      { stepNumber: 6, description: "Prepare Sadza: Bring 4 cups water to boil. Mix 1 cup mealie meal with 1 cup cold water into a paste. Add paste to boiling water, stir constantly. Cook 5 mins." },
      { stepNumber: 7, description: "Gradually add remaining mealie meal, stirring vigorously until very thick. Reduce heat, cover, steam 15-20 mins." },
      { stepNumber: 8, description: "Prepare Muriwo: Heat 2 tbsp oil for muriwo. Sauté 1 chopped onion, bell pepper, and ginger until softened." },
      { stepNumber: 9, description: "Add 2 minced garlic cloves and smoked paprika, cook 1 minute." },
      { stepNumber: 10, description: "Add greens and cook until wilted, about 5 minutes. Salt to taste." },
      { stepNumber: 11, description: "Mix peanut butter with 1/4 cup hot water until smooth. Add to the greens, stir well, simmer 5 minutes." },
      { stepNumber: 12, description: "Serve hot: Plate sadza, top with kapenta stew, and serve muriwo unedovi alongside." }
    ],
    notes: [
      "Kapenta should be cleaned thoroughly before cooking to remove any sand or debris",
      "For best sadza, maintain constant stirring to achieve smooth consistency",
      "The peanut butter sauce for muriwo should be smooth and not too thick",
      "Traditional muriwo uses rape (covo) but kale or collards work well as substitutes",
      "Adjust the thickness of sadza by adding more water or mealie meal as needed",
       "High-FODMAP ingredients include: Onions, Garlic. Peanut Butter is moderate-FODMAP and can become high in larger servings. Some African greens (like rape/covo) haven't been tested; use tested low-FODMAP greens like kale or collard greens. Curry powder may contain FODMAPs.",
      "Low-FODMAP ingredients include: Dried Kapenta, Mealie Meal, Water, Tomatoes (moderate), Tomato Paste (moderate), Cooking Oil, Kale/Collard Greens, Bell Pepper (moderate), Ginger, Smoked Paprika, Salt.",
      "To make this strictly low-FODMAP: Replace onion/garlic with green onion/leek tops and garlic-infused oil in both Kapenta and Muriwo preparations. Use low-FODMAP greens (kale, collards). Limit peanut butter to the low-FODMAP serving size (max 2 tbsp per person). Check curry powder ingredients or use low-FODMAP spices.",
      "Nutrient Profile: Dried Kapenta is very rich in protein, calcium, iron, zinc. Mealie Meal provides carbs, magnesium. Greens (Kale/Collards) offer Vitamin K, A, C, fiber. Peanut Butter gives protein, healthy fats, niacin. Onions/Garlic add flavor, C, B6, manganese. Tomatoes give C, potassium, lycopene. Bell Pepper provides C, A. Ginger contains gingerol. Paprika adds color/antioxidants. Oil provides fat."
    ],
    nutritionFacts: {
      protein: 28, // Plausible with Kapenta + Peanut Butter
      carbs: 65, // Plausible with Sadza
      fat: 18, // Plausible with oil + Peanut Butter
      fiber: 12, // Plausible with greens/cornmeal/PB
      sugar: 4,
      sodium: 520 // Plausible with salt
    }
  },
  {
    title: "Umngqusho (Samp and Beans)",
    description: "A traditional South African dish made with samp (crushed dried corn) and beans, prepared in the vegetarian style common in daily South African cooking. This hearty meal is a staple in South African cuisine, known to be Nelson Mandela's favorite dish, and is often enjoyed during both everyday meals and special occasions.",
    cookingTime: 60, // Plus soaking time, actual cooking often 2-3 hours
    servings: 6,
    difficulty: "MEDIUM",
    cuisineType: "Africa",
    regionOfOrigin: "South Africa",
    imageUrl: "/images/recipes/umngqusho.jpeg",
    calories: 400,
    type: "MAIN",
    isVegetarian: true,
    isVegan: true,
    isGlutenFree: true, // Ensure stock/curry powder/nutritional yeast are GF
    isPescatarian: false,
    isLactoseFree: true,
    isNutFree: true,
    isFermented: true, // Nutritional Yeast is produced via fermentation. Stock may contain yeast extract.
    isLowFodmap: false,
    ingredients: [
      { name: "Samp", amount: 2, unit: "cups", notes: "crushed dried corn" }, // Moderate FODMAP
      { name: "Sugar Beans", amount: 1, unit: "cup", notes: "dried, soaked overnight" }, // High FODMAP
      { name: "Water", amount: 8, unit: "cups", notes: "approx, for cooking samp/beans" }, // Low FODMAP
      { name: "Onions", amount: 2, unit: "large", notes: "finely chopped" }, // High FODMAP
      { name: "Garlic", amount: 4, unit: "cloves", notes: "minced" }, // High FODMAP
      { name: "Carrots", amount: 2, unit: "medium", notes: "finely diced" }, // Low FODMAP
      { name: "Celery", amount: 2, unit: "stalks", notes: "finely diced" }, // Moderate/High FODMAP
      { name: "Tomatoes", amount: 2, unit: "medium", notes: "finely diced" }, // Low FODMAP (moderate)
      { name: "Bay Leaves", amount: 2, unit: "pieces" }, // Low FODMAP
      { name: "Vegetable Stock", amount: 1, unit: "liter", notes: "for stew" }, // Check FODMAPs
      { name: "Tomato Paste", amount: 2, unit: "tablespoons", notes: "for richness" }, // Low FODMAP (moderate)
      { name: "Curry Powder", amount: 1, unit: "tablespoon", notes: "traditional spicing" }, // Check FODMAPs
      { name: "Paprika", amount: 1, unit: "teaspoon", notes: "for flavor and color" }, // Low FODMAP
      { name: "Nutritional Yeast", amount: 2, unit: "tablespoons", notes: "optional, for umami" }, // Low FODMAP
      { name: "Salt", amount: 1, unit: "teaspoon", notes: "or to taste" }, // Low FODMAP
      { name: "Black Pepper", amount: 0.5, unit: "teaspoon", notes: "freshly ground" }, // Low FODMAP
      { name: "Olive Oil", amount: 2, unit: "tablespoons", notes: "for cooking" } // Low FODMAP
    ],
    instructions: [ // Adjusted instructions for typical Umngqusho method
      { stepNumber: 1, description: "Soak samp and beans separately overnight. Drain and rinse." },
      { stepNumber: 2, description: "In a large pot, combine soaked samp and beans. Cover generously with water (about 8 cups). Bring to boil, then reduce heat and simmer for 2-3 hours, or until tender, adding more hot water if needed." },
      { stepNumber: 3, description: "When samp/beans are almost tender, heat oil in a separate pan. Sauté onions, garlic, celery, and carrots until softened." },
      { stepNumber: 4, description: "Add tomatoes, tomato paste, curry powder, paprika, bay leaves, salt, and pepper to the vegetables. Cook for 5-10 minutes." },
      { stepNumber: 5, description: "Add the sautéed vegetable mixture and vegetable stock to the pot with the samp and beans." },
      { stepNumber: 6, description: "Stir in nutritional yeast (if using). Simmer for another 30 minutes, or until desired consistency is reached and flavors meld. Ensure it doesn't dry out." },
      { stepNumber: 7, description: "Remove bay leaves. Adjust seasoning and serve hot." }
    ],
    notes: [
      "Soak samp and beans overnight for best results and shorter cooking time (though still long).",
      "The consistency should be thick and hearty, but not dry; add water/stock as needed.",
      "Can be made in advance and reheated, as flavors improve over time.",
      "Traditional versions vary; some add potatoes or meat.",
      "Nutritional yeast is a modern addition for umami flavor but can be omitted.",
       "Contains fermented ingredients: Nutritional Yeast (produced via fermentation), Vegetable Stock (may contain yeast extract).",
      "High-FODMAP ingredients include: Sugar Beans, Onions, Garlic, Celery. Samp is moderate-FODMAP. Stock and curry powder may contain FODMAPs.",
      "Low-FODMAP ingredients include: Water, Carrots, Tomatoes (moderate), Bay Leaves, Tomato Paste (moderate), Paprika, Nutritional Yeast, Salt, Black Pepper, Olive Oil.",
      "To make this strictly low-FODMAP: This is very difficult as beans and samp are core ingredients. Replace onion/garlic with green onion/leek tops and garlic-infused oil. Limit celery or omit. Use certified low-FODMAP stock and curry powder. The main strategy would be strict portion control of the finished dish due to beans and samp.",
      "Nutrient Profile: Samp provides carbs, fiber, magnesium. Sugar Beans are high in protein, fiber, folate, iron, potassium. Onions/Garlic add flavor, C, B6, manganese. Carrots give Vitamin A. Celery provides K, A, folate. Tomatoes offer C, potassium, lycopene. Bay Leaves/Paprika/Pepper add trace elements. Veg Stock adds minerals/flavor. Tomato Paste concentrates lycopene, C, K. Curry Powder adds antioxidants. Nutritional Yeast provides B vitamins (often fortified B12), protein. Olive Oil gives fat, E."
    ],
    nutritionFacts: {
      protein: 15, // Plausible from beans
      carbs: 45, // Plausible from samp/beans
      fat: 8, // Plausible with oil
      fiber: 12, // Plausible from beans/samp/veg
      sugar: 6,
      sodium: 480 // Plausible with stock/salt
    }
  },
  {
    title: 'Caponata',
    description: 'A sweet and sour Sicilian eggplant dish that embodies the island\'s Arabic influences. This versatile antipasto can be served hot or cold and improves in flavor over time.',
    cookingTime: 60,
    servings: 6,
    difficulty: 'MEDIUM',
    cuisineType: 'Europe',
    regionOfOrigin: 'Italy',
    imageUrl: '/images/recipes/caponata.jpg',
    calories: 220,
    type: 'SIDE',
    isVegetarian: true,
    isVegan: true,
    isGlutenFree: true,
    isPescatarian: false,
    isLactoseFree: true,
    isNutFree: true, // Note: Pine Nuts are seeds, generally okay for tree nut allergies but check individual sensitivities.
    isFermented: true,
    isLowFodmap: false,
    ingredients: [
      { name: 'Eggplants', amount: 1000, unit: 'g', notes: 'cut into 2.5cm cubes' },
      { name: 'Celery', amount: 4, unit: 'stalks', notes: 'cut into 1cm pieces' },
      { name: 'Onions', amount: 2, unit: 'medium', notes: 'chopped' },
      { name: 'Tomatoes', amount: 400, unit: 'g', notes: 'ripe, chopped' },
      { name: 'Green Olives', amount: 100, unit: 'g', notes: 'pitted' },
      { name: 'Capers', amount: 50, unit: 'g', notes: 'rinsed' },
      { name: 'Pine Nuts', amount: 50, unit: 'g', notes: 'toasted' },
      { name: 'Vinegar', amount: 60, unit: 'ml', notes: 'white wine vinegar' },
      { name: 'Sugar', amount: 2, unit: 'tablespoons' },
      { name: 'Olive Oil', amount: 120, unit: 'ml', notes: 'extra virgin' },
      { name: 'Basil', amount: 1, unit: 'bunch', notes: 'fresh leaves' }
    ],
    instructions: [
      { stepNumber: 1, description: 'Salt the eggplant cubes and let drain in a colander for 1 hour.' },
      { stepNumber: 2, description: 'Rinse eggplant and pat thoroughly dry with paper towels.' },
      { stepNumber: 3, description: 'Heat oil in a large pan and fry eggplant in batches until golden. Remove and drain.' },
      { stepNumber: 4, description: 'In the same pan, cook celery until tender-crisp. Remove and set aside.' },
      { stepNumber: 5, description: 'Cook onions until soft and translucent.' },
      { stepNumber: 6, description: 'Add tomatoes and cook until they start to break down.' },
      { stepNumber: 7, description: 'Return celery to the pan, add olives and capers.' },
      { stepNumber: 8, description: 'Mix vinegar with sugar and add to the pan.' },
      { stepNumber: 9, description: 'Return eggplant to the pan and simmer gently for 15 minutes.' },
      { stepNumber: 10, description: 'Add pine nuts and torn basil leaves.' },
      { stepNumber: 11, description: 'Let cool to room temperature before serving.' }
    ],
    notes: [
      "Each Sicilian family has their own version - some add raisins or chocolate.",
      "Salting the eggplant prevents it from absorbing too much oil.",
      "The sweet and sour flavor should be balanced - adjust vinegar and sugar to taste.",
      "Caponata tastes better the next day after flavors have melded.",
      "Traditionally served as an antipasto with bread, but also works as a side dish.",
      "Contains fermented ingredients: Green Olives and Capers (typically preserved through lactic acid fermentation in brine), White Wine Vinegar (acetic acid fermentation of ethanol).",
      "High-FODMAP ingredients include: Onions. Celery can be high-FODMAP in larger servings (more than 1 medium stalk per person).",
      "Low-FODMAP ingredients include: Eggplant, Tomatoes (moderate amounts are low-FODMAP), Green Olives, Capers (in moderation), Pine Nuts (in moderation), Vinegar, Sugar, Olive Oil, Basil.",
      "To make this strictly low-FODMAP: Replace onions with the green tops of spring onions (scallions) or use garlic-infused oil for flavour instead of onion. Limit celery to a low-FODMAP serving size (approx. 10g or less than half a small stalk per serving) or omit. Ensure tomatoes do not exceed the recommended serving size (e.g., half a medium tomato per person). Limit pine nuts to 1 tablespoon per serving.",
      "Nutrient Profile: Eggplants provide fiber, manganese, folate, potassium, and Vitamin K. Celery offers Vitamin K, Vitamin A, folate, and potassium. Onions contain Vitamin C, B6, folate, and manganese. Tomatoes are rich in Vitamin C, potassium, folate, and Vitamin K, plus the antioxidant lycopene. Green Olives provide Vitamin E, iron, copper, and calcium, along with healthy fats. Capers offer Vitamin K, sodium, and antioxidants. Pine Nuts contribute Vitamin E, Vitamin K, magnesium, phosphorus, and zinc. Vinegar is primarily acetic acid. Sugar provides carbohydrates. Olive Oil is high in monounsaturated fats and Vitamin E. Basil contains Vitamin K and antioxidants."
    ],
    nutritionFacts: {
      protein: 5,
      carbs: 18,
      fat: 16,
      fiber: 7,
      sugar: 10,
      sodium: 380
    }
  },
  {
    title: 'Vitello Tonnato',
    description: 'A classic Piedmontese dish of thinly sliced poached veal served with a creamy tuna-flavored sauce. Popular as a summer dish, it\'s traditionally served on Ferragosto (August 15th).',
    cookingTime: 180,
    servings: 6,
    difficulty: 'MEDIUM',
    cuisineType: 'Europe',
    regionOfOrigin: 'Italy',
    imageUrl: '/images/recipes/vitello_tonnato.jpg',
    calories: 320,
    type: 'MAIN',
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: true,
    isPescatarian: false, // Contains veal
    isLactoseFree: true,
    isNutFree: true,
    isFermented: true,
    isLowFodmap: false,
    ingredients: [
      { name: 'Veal', amount: 1000, unit: 'g', notes: 'girello/eye round' },
      { name: 'Tuna', amount: 200, unit: 'g', notes: 'oil-packed' },
      { name: 'Anchovies', amount: 4, unit: 'fillets' },
      { name: 'Capers', amount: 2, unit: 'tablespoons', notes: 'rinsed' },
      { name: 'Egg Yolks', amount: 3, unit: 'large', notes: 'hard-boiled' },
      { name: 'Lemon Juice', amount: 2, unit: 'tablespoons', notes: 'fresh' },
      { name: 'Olive Oil', amount: 120, unit: 'ml', notes: 'extra virgin' },
      { name: 'White Wine', amount: 250, unit: 'ml', notes: 'dry' },
      { name: 'Carrots', amount: 2, unit: 'medium' },
      { name: 'Celery', amount: 2, unit: 'stalks' },
      { name: 'Onion', amount: 1, unit: 'large' },
      { name: 'Bay Leaves', amount: 2, unit: 'pieces' },
      { name: 'Black Peppercorns', amount: 1, unit: 'tablespoon' }
    ],
    instructions: [
      { stepNumber: 1, description: 'Tie the veal with kitchen twine to maintain shape.' },
      { stepNumber: 2, description: 'Place veal in a pot with vegetables, wine, bay leaves, and peppercorns.' },
      { stepNumber: 3, description: 'Add water to cover, bring to simmer, and cook for 1.5 hours or until tender.' },
      { stepNumber: 4, description: 'Let meat cool completely in its cooking liquid.' },
      { stepNumber: 5, description: 'For the sauce: blend tuna, anchovies, capers, and egg yolks until smooth.' },
      { stepNumber: 6, description: 'Gradually blend in olive oil and lemon juice until creamy.' },
      { stepNumber: 7, description: 'Thin sauce with a few tablespoons of the meat cooking liquid if needed.' },
      { stepNumber: 8, description: 'Slice the cooled veal very thinly against the grain.' },
      { stepNumber: 9, description: 'Arrange veal slices on a serving platter.' },
      { stepNumber: 10, description: 'Cover completely with the tuna sauce.' },
      { stepNumber: 11, description: 'Refrigerate for at least 24 hours before serving.' },
      { stepNumber: 12, description: 'Garnish with capers and lemon wedges before serving.' }
    ],
    notes: [
      "The success of this dish depends on very thin slicing of the veal.",
      "The sauce should be creamy but not too thick - it should coat the meat like a thick mayonnaise.",
      "Traditional recipes use veal girello, but other lean cuts can work.",
      "The dish must rest overnight for flavors to develop.",
      "Serve chilled but not ice-cold to appreciate the flavors.",
      "Contains fermented ingredients: Anchovies (salt-cured, involving enzymatic fermentation), Capers (lactic acid fermentation in brine), White Wine (alcoholic fermentation).",
      "High-FODMAP ingredients include: Onion. Celery can be high-FODMAP in larger servings.",
      "Low-FODMAP ingredients include: Veal, Tuna, Anchovies (in moderation), Capers (in moderation), Egg Yolks, Lemon Juice, Olive Oil, Carrots, Bay Leaves, Black Peppercorns.",
      "To make this strictly low-FODMAP: Replace onion with green tops of spring onions or omit. Use garlic-infused oil if garlic is typically added (though not listed). Limit celery to low-FODMAP serving size or omit. Ensure the cooking liquid used for thinning the sauce doesn't concentrate FODMAPs from onion/celery.",
      "Nutrient Profile: Veal is rich in protein, B vitamins (B12, niacin, B6), phosphorus, zinc, and selenium. Tuna provides protein, omega-3 fatty acids, Vitamin D, B12, and selenium. Anchovies offer omega-3s, calcium, selenium, and niacin. Capers contain Vitamin K and sodium. Egg Yolks are sources of Vitamin D, B12, choline, selenium, and fat. Lemon Juice provides Vitamin C. Olive Oil offers monounsaturated fats and Vitamin E. White Wine contains antioxidants. Carrots are high in Vitamin A (beta-carotene), biotin, Vitamin K, and potassium. Celery gives Vitamin K, A, folate, and potassium. Onion contains Vitamin C, B6, folate, and manganese. Bay leaves and Peppercorns add trace minerals and antioxidants."
    ],
    nutritionFacts: {
      protein: 35,
      carbs: 3,
      fat: 22,
      fiber: 1,
      sugar: 2,
      sodium: 450
    }
  },
  {
    title: "Souvlaki",
    description: "Tender cubes of marinated meat grilled on skewers, traditionally served with pita bread, tzatziki, and a variety of accompaniments. While popular throughout Greece, Athens is particularly known for its souvlaki stands. The dish has ancient origins, with similar preparations mentioned in the works of Aristotle.",
    cookingTime: 40,
    servings: 4,
    difficulty: "EASY",
    cuisineType: "Europe",
    regionOfOrigin: "Greece",
    imageUrl: "/images/recipes/souvlaki.jpg",
    calories: 380, // Note: Calories likely higher when served with pita and tzatziki
    type: "MAIN",
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: false, // Due to Pita Bread
    isPescatarian: false,
    isLactoseFree: false, // Due to Tzatziki Sauce (unless made lactose-free)
    isNutFree: true,
    isFermented: false, // Core ingredients are not fermented; Tzatziki uses yogurt (fermented).
    isLowFodmap: false,
    ingredients: [
      { name: "Chicken or Pork", amount: 1, unit: "kg", notes: "cut into 1-inch cubes" },
      { name: "Olive Oil", amount: 60, unit: "ml" },
      { name: "Lemon Juice", amount: 60, unit: "ml" },
      { name: "Garlic", amount: 4, unit: "cloves", notes: "minced" },
      { name: "Oregano", amount: 2, unit: "tablespoons", notes: "dried" },
      { name: "Pita Bread", amount: 8, unit: "pieces" }, // Often served with
      { name: "Tzatziki Sauce", amount: 1, unit: "cup" } // Often served with
    ],
    instructions: [
      { stepNumber: 1, description: "Mix olive oil, lemon juice, garlic, and oregano for marinade" },
      { stepNumber: 2, description: "Marinate meat cubes for at least 2 hours" },
      { stepNumber: 3, description: "Thread meat onto skewers" },
      { stepNumber: 4, description: "Grill for 10-12 minutes, turning occasionally" },
      { stepNumber: 5, description: "Serve with warm pita bread and tzatziki" }
    ],
    notes: [
      "Can be made with either chicken or pork",
      "Best served immediately while hot",
      "Traditional street food in Greece",
      "High-FODMAP ingredients include: Garlic, Pita Bread (contains wheat), Tzatziki Sauce (contains garlic and often lactose from yogurt).",
      "Low-FODMAP ingredients include: Chicken/Pork, Olive Oil, Lemon Juice, Oregano.",
      "To make this strictly low-FODMAP: Replace minced garlic with garlic-infused oil in the marinade. Serve with gluten-free pita bread (check ingredients). Use a homemade low-FODMAP tzatziki sauce made with lactose-free yogurt and garlic-infused oil instead of fresh garlic.",
      "Nutrient Profile: Chicken/Pork is high in protein, B vitamins (especially B12, B6, niacin), selenium, phosphorus, and zinc. Olive Oil provides monounsaturated fats and Vitamin E. Lemon Juice offers Vitamin C. Garlic contains manganese, Vitamin B6, Vitamin C, and selenium, plus allicin compounds. Oregano provides antioxidants. Pita Bread (typically wheat) offers carbohydrates, some fiber, and B vitamins. Tzatziki Sauce (typically yogurt-based) contributes calcium, protein, probiotics (if live cultures), B vitamins; cucumber adds hydration and Vitamin K."
    ],
    nutritionFacts: { // Represents marinade & meat primarily
      protein: 30,
      carbs: 18, // Higher with pita
      fat: 18, // Higher with oil & tzatziki
      fiber: 3, // Higher with pita
      sugar: 4,
      sodium: 750 // Higher with added salt & accompaniments
    }
  },
  {
    title: "Dolmades",
    description: "Grape leaves stuffed with a savory rice mixture, often served as a meze. While found throughout the Mediterranean and Middle East, Greek dolmades are distinctive for their use of fresh herbs and lemon. The dish dates back to the time of Alexander the Great and was a way to preserve grape leaves after the harvest.",
    cookingTime: 90,
    servings: 6,
    difficulty: "MEDIUM",
    cuisineType: "Europe",
    regionOfOrigin: "Greece",
    imageUrl: "/images/recipes/dolmades.jpg",
    calories: 220,
    type: "SNACK",
    isVegetarian: true,
    isVegan: true,
    isGlutenFree: true,
    isPescatarian: false,
    isLactoseFree: true,
    isNutFree: true,
    isFermented: true,
    isLowFodmap: false,
    ingredients: [
      { name: "Grape Leaves", amount: 50, unit: "pieces", notes: "preserved" },
      { name: "Rice", amount: 2, unit: "cups", notes: "short grain" },
      { name: "Onion", amount: 1, unit: "large", notes: "finely chopped" },
      { name: "Fresh Dill", amount: 0.5, unit: "cup", notes: "chopped" },
      { name: "Fresh Mint", amount: 0.25, unit: "cup", notes: "chopped" },
      { name: "Lemon Juice", amount: 0.25, unit: "cup" },
      { name: "Olive Oil", amount: 0.5, unit: "cup" }
    ],
    instructions: [
      { stepNumber: 1, description: "Rinse grape leaves and soak in hot water" },
      { stepNumber: 2, description: "Mix rice with herbs, onion, and seasonings" },
      { stepNumber: 3, description: "Place a small amount of filling on each leaf" },
      { stepNumber: 4, description: "Roll leaves tightly, tucking in sides" },
      { stepNumber: 5, description: "Layer in pot and cook with lemon-water mixture" }
    ],
    notes: [
      "Can be served hot or cold",
      "Keeps well in refrigerator for several days",
      "Traditional meze dish",
      "Contains fermented ingredients: Preserved Grape Leaves (typically brined, involving lactic acid fermentation).",
      "High-FODMAP ingredients include: Onion.",
      "Low-FODMAP ingredients include: Grape Leaves (in moderation), Rice, Dill, Mint, Lemon Juice, Olive Oil.",
      "To make this strictly low-FODMAP: Replace onion with the green tops of spring onions (scallions) or use garlic-infused oil for flavour (if garlic is typically added, though not listed). Limit serving size according to grape leaf FODMAP content if necessary (consult Monash app for specific limits).",
      "Nutrient Profile: Grape Leaves provide Vitamin K, Vitamin A, calcium, iron, and fiber. Rice is a source of carbohydrates, manganese, and selenium. Onion offers Vitamin C, B6, folate, and manganese. Dill contains Vitamin C, manganese, and Vitamin A. Mint provides antioxidants and trace minerals. Lemon Juice is rich in Vitamin C. Olive Oil contributes monounsaturated fats and Vitamin E."
    ],
    nutritionFacts: { // Nutrition facts seem high for protein/low carbs for a rice dish, might need review.
      protein: 35, // Likely overestimated for a vegan rice dish
      carbs: 8,   // Likely underestimated
      fat: 3,    // Likely underestimated due to olive oil
      fiber: 2,
      sugar: 2,
      sodium: 400
    }
  },
 
  {
    title: "Avgolemono",
    description: "A silky, citrus-scented soup made with chicken broth, rice or orzo, and finished with eggs and lemon juice. This comforting soup is considered a national dish of Greece and is often served during winter months or to those feeling under the weather. While common throughout Greece, each region has its own variation.",
    cookingTime: 45,
    servings: 6,
    difficulty: "MEDIUM",
    cuisineType: "Europe",
    regionOfOrigin: "Greece",
    imageUrl: "/images/recipes/avgolemono.jpg",
    calories: 280,
    type: "MAIN",
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: true, // If using rice, ensure stock is GF
    isPescatarian: false,
    isLactoseFree: true,
    isNutFree: true,
    isFermented: false, // Core ingredients are not fermented. Stock might contain fermented elements (yeast extract).
    isLowFodmap: false, // Depends on stock and choice of rice/orzo
    ingredients: [
      { name: "Chicken Stock", amount: 2, unit: "liters" }, // Check for onion/garlic
      { name: "Rice or Orzo", amount: 1, unit: "cup" }, // Orzo contains wheat (high-FODMAP)
      { name: "Eggs", amount: 3, unit: "large" },
      { name: "Lemons", amount: 2, unit: "whole", notes: "juiced" },
      { name: "Chicken Breast", amount: 500, unit: "grams", notes: "cooked and shredded" },
      { name: "Salt", amount: 1, unit: "teaspoon" },
      { name: "Black Pepper", amount: 0.5, unit: "teaspoon" }
    ],
    instructions: [
      { stepNumber: 1, description: "Bring stock to boil and cook rice until tender" },
      { stepNumber: 2, description: "Whisk eggs with lemon juice until frothy" },
      { stepNumber: 3, description: "Slowly temper hot broth into egg mixture" },
      { stepNumber: 4, description: "Return mixture to pot and heat gently" },
      { stepNumber: 5, description: "Add shredded chicken and season" }
    ],
    notes: [
      "Never let soup boil after adding egg mixture",
      "Can be made with turkey or just vegetables",
      "Traditional remedy for colds",
      "High-FODMAP ingredients: Orzo (contains wheat). Chicken Stock often contains onion and garlic.",
      "Low-FODMAP ingredients: Rice, Eggs, Lemons, Chicken Breast, Salt, Black Pepper.",
      "To make this strictly low-FODMAP: Use rice instead of orzo. Use a certified low-FODMAP chicken stock or make your own without onion and garlic (using green onion tops/leek tops and garlic-infused oil for flavour if desired).",
      "Nutrient Profile: Chicken Stock provides hydration, electrolytes, and collagen (if bone broth). Rice offers carbohydrates, manganese, selenium. Orzo (wheat) provides carbohydrates, fiber, B vitamins. Eggs are rich in protein, Vitamin D, B12, selenium, choline. Lemons contribute Vitamin C. Chicken Breast is high in lean protein, B vitamins (niacin, B6, B12), phosphorus, and selenium. Salt provides sodium. Black Pepper contains piperine and trace minerals."
    ],
    nutritionFacts: { // Fat seems low for a recipe with eggs and potentially fatty stock. Carbs low for 1 cup rice/orzo.
      protein: 35,
      carbs: 8,
      fat: 2,
      fiber: 2,
      sugar: 3,
      sodium: 480
    }
  },
  {
    title: 'Jollof Rice',
    description: 'A beloved West African dish of fragrant rice cooked in a rich tomato and pepper sauce with aromatic spices. This iconic dish is a staple at celebrations and gatherings across West Africa, particularly in Nigeria, Ghana, Senegal, and other neighboring countries. Each region has its own unique twist, leading to friendly rivalries about which country makes it best.',
    cookingTime: 75,
    servings: 6,
    difficulty: 'MEDIUM',
    cuisineType: 'Africa',
    regionOfOrigin: 'Nigeria',
    imageUrl: '/images/recipes/jollof_rice.jpg',
    calories: 380,
    type: 'MAIN',
    isVegetarian: true, // If using vegetable stock cubes
    isVegan: true, // If using vegetable stock cubes
    isGlutenFree: true, // Ensure stock cubes are GF
    isPescatarian: false,
    isLactoseFree: true,
    isNutFree: true,
    isFermented: true, // Stock cubes often contain yeast extract.
    isLowFodmap: false,
    ingredients: [
      { name: 'Long Grain Rice', amount: 3, unit: 'cups', notes: 'rinsed until water runs clear' },
      { name: 'Plum Tomatoes', amount: 6, unit: 'large', notes: 'roughly chopped' },
      { name: 'Red Bell Peppers', amount: 3, unit: 'medium', notes: 'roughly chopped' },
      { name: 'Scotch Bonnet Pepper', amount: 1, unit: 'piece', notes: 'deseeded (adjust to taste)' },
      { name: 'Onions', amount: 2, unit: 'large', notes: '1 roughly chopped, 1 finely diced' },
      { name: 'Tomato Paste', amount: 3, unit: 'tablespoons' },
      { name: 'Vegetable Oil', amount: 0.5, unit: 'cup' },
      { name: 'Bay Leaves', amount: 2, unit: 'pieces' },
      { name: 'Curry Powder', amount: 1, unit: 'tablespoon' }, // Check ingredients for FODMAPs
      { name: 'Thyme', amount: 1, unit: 'teaspoon', notes: 'dried' },
      { name: 'Garlic', amount: 4, unit: 'cloves', notes: 'minced' },
      { name: 'Ginger', amount: 2, unit: 'inches', notes: 'peeled and minced' },
      { name: 'Stock Cubes', amount: 2, unit: 'pieces', notes: 'use vegetable stock for a vegan recipe' }, // Check for onion/garlic/gluten
      { name: 'Salt', amount: 1, unit: 'teaspoon', notes: 'to taste' },
      { name: 'White Pepper', amount: 0.5, unit: 'teaspoon' }
    ],
    instructions: [
      // ... (instructions remain the same)
       { stepNumber: 1, description: 'Blend tomatoes, red bell peppers, scotch bonnet, and the roughly chopped onion into a smooth paste using a food processor.' },
      { stepNumber: 2, description: 'Heat vegetable oil in a large, heavy-bottomed pot over medium heat. Add the finely diced onion and sauté until golden brown, about 5-7 minutes.' },
      { stepNumber: 3, description: 'Add tomato paste and fry for 3-4 minutes until the oil slightly separates from the paste.' },
      { stepNumber: 4, description: 'Pour in the blended tomato-pepper mixture. Cook on medium-high heat, stirring occasionally, until the water evaporates and the sauce thickens (about 20-25 minutes).' },
      { stepNumber: 5, description: 'Add minced garlic, ginger, curry powder, thyme, bay leaves, stock cubes, salt, and white pepper. Stir well and cook for another 5 minutes.' },
      { stepNumber: 6, description: 'Add the washed rice and stir until well coated with the sauce. Add 2.5 cups of hot water, stir once, and cover with foil and a tight-fitting lid.' },
      { stepNumber: 7, description: 'Reduce heat to low and cook for 30-35 minutes, or until rice is tender. Do not stir while cooking.' },
      { stepNumber: 8, description: 'After 30 minutes, check if rice is cooked. If needed, add a little more hot water and continue cooking.' },
      { stepNumber: 9, description: 'Once done, let it rest for 10 minutes, then fluff with a fork before serving.' }
    ],
    notes: [
      "The characteristic smoky flavor comes from allowing the bottom layer to crisp slightly (but not burn) - this is called 'socarat' in some regions.",
      "Different regions have variations: Ghanaian Jollof often uses jasmine rice and additional spices, while Nigerian Jollof typically uses long-grain rice.",
      "For extra flavor, you can use chicken or beef stock instead of water.",
      "The scotch bonnet pepper adds authentic heat - adjust amount based on preference.",
      "Party Jollof is often cooked over firewood for an extra smoky flavor.",
      "Contains fermented ingredients: Stock Cubes often contain yeast extract or other fermented flavor enhancers.",
      "High-FODMAP ingredients include: Onions, Garlic. Stock cubes and curry powder may also contain high-FODMAP ingredients.",
      "Low-FODMAP ingredients include: Rice, Tomatoes (in moderation), Red Bell Peppers (in moderation), Scotch Bonnet Pepper, Tomato Paste (in moderation), Vegetable Oil, Bay Leaves, Thyme, Ginger, Salt, White Pepper.",
      "To make this strictly low-FODMAP: Replace onions and garlic with green tops of spring onions and garlic-infused oil. Use a certified low-FODMAP stock cube/powder or homemade low-FODMAP broth. Check curry powder ingredients carefully or make your own blend using low-FODMAP spices. Limit tomato and red bell pepper amounts per serving according to low-FODMAP guidelines.",
      "Nutrient Profile: Rice provides carbohydrates, manganese, selenium. Tomatoes offer Vitamin C, potassium, folate, lycopene. Red Bell Peppers are high in Vitamin C, Vitamin A, and B6. Scotch Bonnet Peppers provide Vitamin C and capsaicin. Onions contain Vitamin C, B6, folate, manganese. Tomato Paste is concentrated in lycopene, Vitamin C, potassium. Vegetable Oil provides fat. Bay leaves, Thyme, Ginger, Curry Powder, White Pepper add flavor, antioxidants and trace minerals. Garlic contributes manganese, B6, C, selenium, allicin. Stock Cubes add sodium and flavor compounds."
    ],
    nutritionFacts: {
      protein: 6,
      carbs: 65,
      fat: 12,
      fiber: 3,
      sugar: 4,
      sodium: 380 // Likely higher with stock cubes and added salt
    }
  },
   {
    title: 'Fufu ati Egusi Soup',
    description: 'A classic West African combination featuring smooth, pounded fufu (made from cassava and plantains) served with a rich, nutty soup made from ground melon seeds (egusi) and filled with leafy greens and protein. This hearty dish is particularly popular in Nigeria, Ghana, and Cameroon, with each region adding its own unique blend of ingredients and spices.',
    cookingTime: 90,
    servings: 6,
    difficulty: 'HARD',
    cuisineType: 'Africa',
    regionOfOrigin: 'Nigeria',
    imageUrl: '/images/recipes/fufu-egusi.jpg',
    calories: 450, // Highly variable based on fufu portion and oil/meat
    type: 'MAIN',
    isVegetarian: false, // Contains beef, dried fish, stock fish
    isVegan: false,
    isGlutenFree: true, // Ensure stock cubes are GF
    isPescatarian: false, // Contains beef
    isLactoseFree: true,
    isNutFree: true, // Egusi are seeds, not nuts. Check cross-contamination if allergic.
    isFermented: true,
    isLowFodmap: false,
    ingredients: [
      // For Fufu
      { name: 'Cassava Flour', amount: 2, unit: 'cups', notes: 'or pounded cassava' },
      { name: 'Plantain Flour', amount: 1, unit: 'cup', notes: 'optional, for mixed fufu' },
      { name: 'Hot Water', amount: 2, unit: 'cups', notes: 'approximately, adjust as needed' },
      // For Egusi Soup
      { name: 'Egusi (Ground Melon Seeds)', amount: 2, unit: 'cups' },
      { name: 'Palm Oil', amount: 0.5, unit: 'cup' },
      { name: 'Beef', amount: 500, unit: 'grams', notes: 'cut into bite-sized pieces' },
      { name: 'Dried Fish', amount: 100, unit: 'grams', notes: 'soaked and deboned' }, // Often fermented/smoked
      { name: 'Stock Fish', amount: 100, unit: 'grams', notes: 'soaked and cleaned' }, // Often air-dried/fermented
      { name: 'Spinach', amount: 2, unit: 'bunches', notes: 'chopped (or bitter leaf)' },
      { name: 'Onions', amount: 2, unit: 'medium', notes: 'chopped' },
      { name: 'Habanero Peppers', amount: 2, unit: 'pieces', notes: 'chopped (adjust to taste)' },
      { name: 'Locust Beans', amount: 2, unit: 'tablespoons', notes: 'iru or ogiri' }, // Fermented
      { name: 'Stock Cubes', amount: 2, unit: 'pieces' }, // Check ingredients
      { name: 'Salt', amount: 1, unit: 'teaspoon', notes: 'to taste' }
    ],
    instructions: [
      // ... (instructions remain the same)
      // Fufu Instructions
      { stepNumber: 1, description: 'For fufu: Gradually add hot water to cassava flour (and plantain flour if using) in a large bowl, stirring vigorously with a wooden spoon.' },
      { stepNumber: 2, description: 'Knead the mixture until it becomes smooth and forms a dough-like consistency. The fufu should be firm but pliable.' },
      { stepNumber: 3, description: 'Shape into smooth balls and keep warm by covering with plastic wrap.' },
      // Egusi Soup Instructions
      { stepNumber: 4, description: 'Season beef with onions, stock cube, and salt. Cook until tender, about 30 minutes. Reserve the stock.' },
      { stepNumber: 5, description: 'Mix ground egusi with chopped onions to form a paste. Heat palm oil in a large pot until hot.' },
      { stepNumber: 6, description: 'Add the egusi paste in small portions, stirring to form lumps. Fry until golden brown, about 10 minutes.' },
      { stepNumber: 7, description: 'Add the meat stock, cooked beef, dried fish, and stock fish. Simmer for 10 minutes.' },
      { stepNumber: 8, description: 'Add locust beans, remaining onions, and peppers. Cook for 5 minutes.' },
      { stepNumber: 9, description: 'Add chopped spinach, adjust seasoning, and simmer for 5 more minutes.' },
      { stepNumber: 10, description: 'Serve hot with prepared fufu balls.' }
    ],
    notes: [
      "The consistency of fufu is crucial - it should be smooth and slightly elastic.",
      "Different regions use various leafy greens: bitter leaf in Nigeria, spinach or collard greens elsewhere.",
      "The soup should be thick enough to coat the back of a spoon.",
      "Traditional eating method is to pinch off a small piece of fufu, make an indentation, and use it to scoop up the soup.",
      "Egusi seeds can be ground at home or bought pre-ground from African markets.",
      "Contains fermented ingredients: Locust Beans (iru/ogiri), Dried Fish, Stock Fish (often involve fermentation/drying processes), Stock Cubes (may contain yeast extract).",
      "High-FODMAP ingredients include: Onions, Locust Beans. Cassava flour and Plantain flour can be high in larger servings. Stock cubes may contain onion/garlic.",
      "Low-FODMAP ingredients include: Egusi seeds (check portion size), Palm Oil, Beef, Spinach (common), Habanero Peppers, Salt.",
      "To make this strictly low-FODMAP: Replace onions with green tops of spring onions/leeks. Omit locust beans (or use a tiny amount of asafoetida powder if tolerated). Use certified low-FODMAP stock. Control portion sizes of fufu (cassava/plantain). Choose low-FODMAP greens like spinach or kale.",
      "Nutrient Profile: Cassava Flour provides carbohydrates. Plantain Flour offers carbs, potassium, Vitamin A, C. Egusi Seeds are rich in protein, healthy fats, phosphorus, magnesium, zinc. Palm Oil is high in saturated fat and Vitamin E (red palm oil also has beta-carotene). Beef offers protein, iron, zinc, B12. Dried/Stock Fish are concentrated sources of protein, calcium, omega-3s (varies). Spinach provides Vitamin K, A, C, folate, iron, magnesium. Onions give C, B6, folate, manganese. Habaneros provide Vitamin C, capsaicin. Locust Beans add umami and some protein/fiber. Stock Cubes add sodium/flavor."
    ],
    nutritionFacts: {
      protein: 25,
      carbs: 45, // Primarily from Fufu
      fat: 28, // Primarily from Palm Oil and Egusi
      fiber: 6,
      sugar: 3,
      sodium: 450 // Likely higher from stock/salt/dried fish
    }
  },
  {
    title: 'Yassa Poulet',
    description: 'A tangy and savory Senegalese dish of marinated chicken cooked with caramelized onions, lemon, and dijon mustard. This dish originated from the Casamance region of Senegal but has become popular throughout West Africa and beyond. The unique combination of citrus, onions, and mustard creates a delightfully complex flavor profile.',
    cookingTime: 90, // Plus marination time
    servings: 6,
    difficulty: 'MEDIUM',
    cuisineType: 'Africa',
    regionOfOrigin: 'Senegal',
    imageUrl: '/images/recipes/yassa-poulet.jpg',
    calories: 420,
    type: 'MAIN',
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: true, // Ensure stock cube and mustard are GF
    isPescatarian: false,
    isLactoseFree: true,
    isNutFree: true,
    isFermented: true,
    isLowFodmap: false,
    ingredients: [
      { name: 'Chicken', amount: 1.5, unit: 'kg', notes: 'whole chicken cut into pieces' },
      { name: 'Onions', amount: 8, unit: 'large', notes: 'thinly sliced' }, // Very high quantity
      { name: 'Lemons', amount: 4, unit: 'whole', notes: 'juiced' },
      { name: 'Dijon Mustard', amount: 4, unit: 'tablespoons' }, // Contains vinegar (fermented)
      { name: 'Garlic', amount: 6, unit: 'cloves', notes: 'minced' },
      { name: 'Vegetable Oil', amount: 0.5, unit: 'cup' },
      { name: 'Bay Leaves', amount: 3, unit: 'pieces' },
      { name: 'Habanero Pepper', amount: 1, unit: 'piece', notes: 'whole (optional)' },
      { name: 'White Vinegar', amount: 2, unit: 'tablespoons' }, // Fermented
      { name: 'Stock Cube', amount: 2, unit: 'pieces', notes: 'chicken flavor' }, // Check ingredients
      { name: 'Black Pepper', amount: 1, unit: 'teaspoon' },
      { name: 'Salt', amount: 1, unit: 'tablespoon', notes: 'to taste' }
    ],
    instructions: [
      // ... (instructions remain the same)
        { stepNumber: 1, description: 'Make the marinade: combine lemon juice, mustard, minced garlic, 1 stock cube, black pepper, and half the salt.' },
      { stepNumber: 2, description: 'Place chicken pieces in a large bowl, pour marinade over them, and massage well. Cover and refrigerate for 4-8 hours or overnight.' },
      { stepNumber: 3, description: 'Remove chicken from marinade (reserve the marinade) and pat dry. Grill or broil until browned on both sides, about 10-15 minutes. Set aside.' },
      { stepNumber: 4, description: 'In a large pot, heat oil over medium heat. Add sliced onions, bay leaves, and remaining salt. Cook until onions are soft and caramelized, about 20-25 minutes.' },
      { stepNumber: 5, description: 'Add reserved marinade, vinegar, remaining stock cube, and 1 cup of water. Bring to a simmer.' },
      { stepNumber: 6, description: 'Add the grilled chicken pieces and whole habanero pepper (if using). Cover and simmer on low heat for 30-40 minutes.' },
      { stepNumber: 7, description: 'Adjust seasoning to taste. The sauce should be tangy and savory, with caramelized onions soft and abundant.' },
      { stepNumber: 8, description: 'Serve hot over rice, removing bay leaves and whole habanero before serving.' }
    ],
    notes: [
      "The key to great Yassa is properly caramelized onions - take your time with this step.",
      "Traditional versions often grill the chicken over charcoal for added smoky flavor.",
      "Some regions add carrots or olives to the dish for extra flavor and color.",
      "The dish can also be made with fish (Yassa Poisson) or lamb.",
      "Overnight marination yields the best results.",
      "Contains fermented ingredients: Dijon Mustard (contains vinegar), White Vinegar (acetic acid fermentation), Stock Cube (may contain yeast extract).",
      "High-FODMAP ingredients include: Onions (in very large quantity), Garlic. Stock cubes may contain onion/garlic.",
      "Low-FODMAP ingredients include: Chicken, Lemons, Dijon Mustard (in moderation), Vegetable Oil, Bay Leaves, Habanero Pepper, White Vinegar, Black Pepper, Salt.",
      "To make this strictly low-FODMAP: This recipe is challenging due to the central role of caramelized onions. A low-FODMAP version would require significant adaptation, perhaps using a large amount of leek green tops instead of onions and garlic-infused oil instead of garlic cloves. Use certified low-FODMAP stock. Check mustard ingredients. Portion size would need to be carefully managed.",
      "Nutrient Profile: Chicken provides protein, B vitamins, selenium, phosphorus. Onions offer Vitamin C, B6, folate, manganese, and fructans (fiber). Lemons are high in Vitamin C. Dijon Mustard adds flavor, trace minerals, and isothiocyanates. Garlic contains manganese, B6, C, selenium, allicin. Vegetable Oil provides fat. Bay Leaves & Black Pepper add trace elements/antioxidants. Habanero gives Vitamin C, capsaicin. Vinegar is mainly acetic acid. Stock Cubes add sodium/flavor."
    ],
    nutritionFacts: {
      protein: 35,
      carbs: 20, // Mostly from onions
      fat: 25,
      fiber: 4, // Mostly from onions
      sugar: 8, // Mostly from onions
      sodium: 580 // Likely higher from stock/salt/mustard
    }
  },
  {
    title: 'Waakye',
    description: 'A beloved Ghanaian dish of rice and beans cooked together with waakye leaves or sorghum stalks, giving it its characteristic reddish-brown color. This complete meal is typically served with a variety of accompaniments and is a popular street food as well as a household staple throughout Ghana.',
    cookingTime: 60, // Plus soaking time for beans
    servings: 6,
    difficulty: 'MEDIUM',
    cuisineType: 'Africa',
    regionOfOrigin: 'Ghana',
    imageUrl: '/images/recipes/waakye.jpg',
    calories: 400, // Base waakye; calories increase significantly with accompaniments
    type: 'MAIN',
    isVegetarian: false, // Often served with non-veg accompaniments like fish or meat stew, Shito contains fish/shrimp
    isVegan: false, // See above; eggs are common too
    isGlutenFree: true, // Base is GF; spaghetti accompaniment is not
    isPescatarian: true, // Shito contains fish/shrimp; often served with fish
    isLactoseFree: true,
    isNutFree: true,
    isFermented: true, // Shito (common accompaniment) is fermented.
    isLowFodmap: false,
    ingredients: [
      { name: 'Long Grain Rice', amount: 2, unit: 'cups', notes: 'rinsed' },
      { name: 'Black-Eyed Peas', amount: 1, unit: 'cup', notes: 'soaked overnight' }, // Moderate-High FODMAP
      { name: 'Waakye Leaves', amount: 6, unit: 'pieces', notes: 'or dried sorghum leaves' },
      { name: 'Baking Soda', amount: 0.5, unit: 'teaspoon' },
      { name: 'Onion', amount: 1, unit: 'medium', notes: 'chopped' }, // High-FODMAP
      { name: 'Garlic', amount: 3, unit: 'cloves', notes: 'minced' }, // High-FODMAP
      { name: 'Salt', amount: 1, unit: 'teaspoon', notes: 'to taste' },
      // Traditional Accompaniments (Often High-FODMAP)
      { name: 'Shito (Black Pepper Sauce)', amount: 0.5, unit: 'cup', notes: 'for serving' }, // Often contains onion/garlic/fermented fish
      { name: 'Gari', amount: 1, unit: 'cup', notes: 'for serving' }, // Cassava, can be high FODMAP
      { name: 'Spaghetti', amount: 200, unit: 'grams', notes: 'cooked, for serving' }, // Wheat, high-FODMAP
      { name: 'Fried Plantains', amount: 2, unit: 'medium', notes: 'sliced and fried, for serving' }, // Ripe plantains are high-FODMAP
      { name: 'Boiled Eggs', amount: 6, unit: 'pieces', notes: 'for serving' } // Low-FODMAP
    ],
    instructions: [
      // ... (instructions remain the same)
       { stepNumber: 1, description: 'Rinse the soaked black-eyed peas and place in a large pot. Add enough water to cover by 2 inches.' },
      { stepNumber: 2, description: 'Add waakye leaves (or sorghum leaves) and baking soda. Bring to a boil, then reduce heat and simmer until peas are almost tender, about 25-30 minutes.' },
      { stepNumber: 3, description: 'Add rice, chopped onion, minced garlic, and salt to the pot. Add more water if needed to cover everything by about 1 inch.' },
      { stepNumber: 4, description: 'Cover and cook on low heat until rice is tender and has absorbed the colored water, about 20-25 minutes.' },
      { stepNumber: 5, description: 'Remove waakye leaves. Fluff the rice and beans mixture with a fork.' },
      { stepNumber: 6, description: 'While the waakye cooks, prepare the accompaniments: fry plantains, boil eggs, and warm the shito sauce.' },
      { stepNumber: 7, description: 'Serve hot waakye with your choice of accompaniments: shito, gari, spaghetti, fried plantains, and boiled eggs.' }
    ],
    notes: [
      "Waakye leaves can be substituted with dried sorghum stalks or leaves - both give the characteristic color.",
      "The baking soda helps soften the beans faster and enhance the color from the leaves.",
      "Traditional street vendors serve waakye in banana leaves.",
      "Each region in Ghana has its preferred combination of accompaniments.",
      "Leftover waakye can be reheated with a splash of water to maintain moisture.",
      "Contains fermented ingredients: Shito, a common accompaniment, is made with fermented fish or shrimp.",
      "High-FODMAP ingredients include: Black-Eyed Peas, Onion, Garlic. Common accompaniments like Shito, Gari, Spaghetti, and ripe Fried Plantains are also typically high-FODMAP.",
      "Low-FODMAP ingredients include: Rice, Waakye Leaves, Baking Soda, Salt, Boiled Eggs. Unripe plantains fried would be low-FODMAP.",
      "To make this strictly low-FODMAP: This is very difficult due to core ingredients and accompaniments. For the base: replace onion/garlic with green onion tops/garlic-infused oil. Limit black-eyed peas to a small portion (e.g., 1/4 cup cooked per person). Avoid high-FODMAP accompaniments: use gluten-free pasta, unripe plantains, avoid Shito/Gari or find certified low-FODMAP versions (unlikely). Stick to boiled eggs and potentially a simple low-FODMAP tomato-based stew.",
      "Nutrient Profile: Rice provides carbs. Black-Eyed Peas offer protein, fiber, folate, iron, potassium. Waakye Leaves add color. Baking Soda is sodium bicarbonate. Onion gives C, B6, folate, manganese. Garlic has manganese, B6, C, selenium, allicin. Salt is sodium chloride. Shito adds spice, umami, fat, sodium. Gari provides carbs. Spaghetti (wheat) gives carbs, B vitamins. Plantains offer carbs, Vitamin C, B6, potassium. Eggs give protein, Vitamin D, B12, choline."
    ],
    nutritionFacts: { // Base Waakye only
      protein: 15,
      carbs: 70,
      fat: 8,
      fiber: 12,
      sugar: 5,
      sodium: 400 // Higher with added salt
    }
  },
   {
    title: 'Suya',
    description: 'A popular Nigerian street food of spiced, skewered beef grilled over open flames. This dish originated from the Hausa people of northern Nigeria but has become a beloved street food throughout West Africa. The distinctive taste comes from a complex spice mixture called yaji or suya spice.',
    cookingTime: 45, // Plus resting time
    servings: 4,
    difficulty: 'MEDIUM',
    cuisineType: 'Africa',
    regionOfOrigin: 'Nigeria',
    imageUrl: '/images/recipes/suya.jpg',
    calories: 320, // Meat & spice only; higher with oil/garnish
    type: 'MAIN', // Often eaten as snack/street food but substantial
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: true, // Ensure bouillon powder is GF
    isPescatarian: false,
    isLactoseFree: true,
    isNutFree: false, // Contains peanuts
    isFermented: true, // Bouillon powder may contain yeast extract.
    isLowFodmap: false,
    ingredients: [
      { name: 'Beef Sirloin', amount: 1, unit: 'kg', notes: 'thinly sliced against the grain' },
      // Suya Spice (Yaji)
      { name: 'Ground Peanuts', amount: 1, unit: 'cup', notes: 'roasted and finely ground' }, // High FODMAP in large amounts
      { name: 'Ground Ginger', amount: 2, unit: 'tablespoons' }, // Low FODMAP
      { name: 'Garlic Powder', amount: 1, unit: 'tablespoon' }, // High FODMAP
      { name: 'Onion Powder', amount: 1, unit: 'tablespoon' }, // High FODMAP
      { name: 'Cayenne Pepper', amount: 1, unit: 'tablespoon', notes: 'adjust to taste' }, // Low FODMAP
      { name: 'Paprika', amount: 1, unit: 'tablespoon' }, // Low FODMAP
      { name: 'Ground Cloves', amount: 0.5, unit: 'teaspoon' }, // Low FODMAP
      { name: 'Bouillon Powder', amount: 1, unit: 'tablespoon' }, // Check ingredients for FODMAPs
      { name: 'Salt', amount: 1, unit: 'teaspoon' }, // Low FODMAP
      // Serving
      { name: 'Red Onions', amount: 2, unit: 'medium', notes: 'sliced' }, // High FODMAP garnish
      { name: 'Tomatoes', amount: 2, unit: 'medium', notes: 'sliced' }, // Low FODMAP garnish (moderate)
      { name: 'Fresh Cabbage', amount: 0.25, unit: 'head', notes: 'shredded' } // Low FODMAP garnish (common cabbage)
    ],
    instructions: [
      // ... (instructions remain the same)
       { stepNumber: 1, description: 'Make the suya spice (yaji): Combine ground peanuts with all the ground spices, bouillon powder, and salt. Mix well.' },
      { stepNumber: 2, description: 'Thread the thinly sliced beef onto skewers, making sure not to pack the meat too tightly.' },
      { stepNumber: 3, description: 'Drizzle the skewered meat with a little oil, then coat generously with the suya spice mixture, pressing to adhere.' },
      { stepNumber: 4, description: 'Let the seasoned meat rest for at least 30 minutes to allow flavors to penetrate.' },
      { stepNumber: 5, description: 'Preheat your grill to high heat. Oil the grates to prevent sticking.' },
      { stepNumber: 6, description: 'Grill the skewers for 3-4 minutes per side for medium doneness, or adjust to your preference.' },
      { stepNumber: 7, description: 'While grilling, sprinkle additional suya spice on the meat for extra flavor.' },
      { stepNumber: 8, description: 'Serve hot with sliced onions, tomatoes, and cabbage. Sprinkle extra suya spice on top if desired.' }
    ],
    notes: [
      "Traditional suya is made with kuli-kuli (ground peanut paste) instead of ground peanuts.",
      "The meat should be sliced very thinly for authentic texture - partially freezing the meat makes this easier.",
      "Suya can also be made with chicken, goat, or lamb.",
      "The spice mixture can be stored in an airtight container for future use.",
      "In Nigeria, suya is often wrapped in newspaper and served with extra spice on the side.",
      "Contains fermented ingredients: Bouillon powder may contain yeast extract or other fermented flavor enhancers.",
      "High-FODMAP ingredients include: Ground Peanuts (in large quantity), Garlic Powder, Onion Powder. Bouillon powder may contain FODMAPs. Red onion garnish is high-FODMAP.",
      "Low-FODMAP ingredients include: Beef Sirloin, Ground Ginger, Cayenne Pepper, Paprika, Ground Cloves, Salt. Tomato and Cabbage garnishes are low-FODMAP in moderation.",
      "To make this strictly low-FODMAP: Omit garlic and onion powders. Significantly reduce the amount of ground peanuts in the spice mix. Use a certified low-FODMAP bouillon powder or omit. Serve without red onion garnish, using only tomato and cabbage in moderation.",
      "Nutrient Profile: Beef Sirloin provides protein, iron, zinc, B12, B6, niacin. Ground Peanuts offer protein, healthy fats, niacin, folate, Vitamin E, magnesium. Ginger contains gingerol (antioxidant). Garlic/Onion Powders are concentrated sources of flavor compounds. Cayenne/Paprika provide Vitamin A, C, capsaicin/antioxidants. Cloves contain eugenol (antioxidant). Bouillon adds sodium/flavor. Salt is sodium chloride. Red Onions give C, B6, folate. Tomatoes offer C, potassium, folate, lycopene. Cabbage provides Vitamin K, C, fiber."
    ],
    nutritionFacts: { // Fat seems low for sirloin + 1 cup peanuts.
      protein: 45,
      carbs: 12, // Primarily from peanuts
      fat: 18,
      fiber: 3,
      sugar: 2,
      sodium: 480 // Higher with bouillon/salt
    }
  },
   {
    title: 'Thieboudienne',
    description: 'The national dish of Senegal, this flavorful one-pot meal combines fish, rice, and vegetables in a rich tomato sauce. Also known as ceebu jen, this dish originated from Saint-Louis, Senegal, and has become a staple throughout West Africa, particularly in Senegal, Gambia, and Mali.',
    cookingTime: 120,
    servings: 8,
    difficulty: 'HARD',
    cuisineType: 'Africa',
    regionOfOrigin: 'Senegal',
    imageUrl: '/images/recipes/thieboudienne.jpg',
    calories: 520,
    type: 'MAIN',
    isVegetarian: false, // Contains fish
    isVegan: false,
    isGlutenFree: true, // Ensure stock cubes are GF
    isPescatarian: true,
    isLactoseFree: true,
    isNutFree: true,
    isFermented: true,
    isLowFodmap: false,
    ingredients: [
      { name: 'Whole Fish', amount: 2, unit: 'kg', notes: 'grouper or sea bass, cleaned and cut into steaks' },
      { name: 'Broken Rice', amount: 4, unit: 'cups', notes: 'or regular rice' },
      { name: 'Tomato Paste', amount: 3, unit: 'tablespoons' },
      { name: 'Fresh Tomatoes', amount: 3, unit: 'large', notes: 'chopped' },
      { name: 'Onions', amount: 3, unit: 'large', notes: '2 chopped, 1 sliced' }, // High FODMAP
      { name: 'Garlic', amount: 6, unit: 'cloves', notes: 'minced' }, // High FODMAP
      { name: 'Parsley', amount: 1, unit: 'bunch', notes: 'chopped' }, // Low FODMAP
      { name: 'Scotch Bonnet Pepper', amount: 1, unit: 'piece', notes: 'whole' }, // Low FODMAP
      { name: 'Dried Fish', amount: 100, unit: 'grams', notes: 'cleaned and soaked' }, // Often fermented/smoked
      // Vegetables (Check FODMAP content - many are moderate/high in larger servings)
      { name: 'Cassava', amount: 2, unit: 'medium', notes: 'peeled and chunked' }, // Moderate FODMAP
      { name: 'Carrots', amount: 4, unit: 'large', notes: 'cut into large pieces' }, // Low FODMAP
      { name: 'Cabbage', amount: 0.5, unit: 'head', notes: 'cut into wedges' }, // Low/Moderate FODMAP depending on type/amount
      { name: 'Eggplant', amount: 2, unit: 'medium', notes: 'quartered' }, // Low FODMAP
      { name: 'Sweet Potatoes', amount: 2, unit: 'medium', notes: 'peeled and chunked' }, // Moderate FODMAP
      // Seasonings
      { name: 'Fish Stock Cubes', amount: 2, unit: 'pieces' }, // Check ingredients for FODMAPs
      { name: 'Bay Leaves', amount: 2, unit: 'pieces' }, // Low FODMAP
      { name: 'Tamarind Paste', amount: 2, unit: 'tablespoons', notes: 'soaked in water' }, // Often fermented, Low FODMAP in moderation
      { name: 'Salt', amount: 1, unit: 'tablespoon', notes: 'to taste' } // Low FODMAP
    ],
    instructions: [
     // ... (instructions remain the same)
       { stepNumber: 1, description: 'Make the stuffing: Combine chopped onions, garlic, parsley, stock cube, and salt. Make slits in fish pieces and stuff with this mixture.' },
      { stepNumber: 2, description: 'Heat oil in a large pot. Fry the fish pieces until golden brown on both sides. Remove and set aside.' },
      { stepNumber: 3, description: 'In the same pot, sauté remaining onions until translucent. Add tomato paste and cook until oil separates.' },
      { stepNumber: 4, description: 'Add fresh tomatoes, bay leaves, and tamarind water. Simmer for 10 minutes.' },
      { stepNumber: 5, description: 'Add 8 cups of water, dried fish, and bring to a boil. Add vegetables in order of cooking time: cassava and carrots first.' },
      { stepNumber: 6, description: 'After 10 minutes, add cabbage, eggplant, and sweet potatoes. Cook until vegetables are almost tender.' },
      { stepNumber: 7, description: 'Remove vegetables and set aside. Add rice to the pot with the cooking liquid. Add fried fish on top.' },
      { stepNumber: 8, description: 'Cover and cook on low heat until rice is done and has absorbed the flavorful liquid, about 20-25 minutes.' },
      { stepNumber: 9, description: 'Arrange rice on a large platter, topped with fish and vegetables. Serve hot.' }
    ],
    notes: [
      "Traditional recipes use broken rice, which absorbs flavors better and yields the right texture.",
      "The vegetables can vary by season and availability.",
      "Some regions add fermented fish paste (guedj) for extra umami.",
      "The bottom of the rice (called xoon) often gets crispy - this is considered a delicacy.",
      "Leftovers taste even better the next day as flavors continue to develop.",
      "Contains fermented ingredients: Dried Fish (often fermented/smoked), Tamarind Paste (can be fermented), Fish Stock Cubes (may contain yeast extract). Guedj (if used) is fermented fish.",
      "High-FODMAP ingredients include: Onions, Garlic. Cassava and Sweet Potatoes are moderate-high in larger servings. Cabbage can be high depending on type/amount. Stock cubes may contain FODMAPs.",
      "Low-FODMAP ingredients include: Fish, Rice, Tomato Paste (moderate), Fresh Tomatoes (moderate), Parsley, Scotch Bonnet Pepper, Carrots, Eggplant, Bay Leaves, Tamarind Paste (moderate), Salt.",
      "To make this strictly low-FODMAP: Replace onion/garlic with green onion/leek tops and garlic-infused oil. Use certified low-FODMAP stock. Carefully portion moderate-FODMAP vegetables like cassava, sweet potato, and cabbage per serving. Omit dried fish or ensure it doesn't add FODMAPs.",
      "Nutrient Profile: Fish (varies by type, e.g., Grouper/Bass) offers protein, B12, selenium, omega-3s. Rice provides carbs. Tomato Paste/Tomatoes give lycopene, C, potassium. Onions/Garlic add flavor, C, B6, manganese, fructans/allicin. Parsley provides K, C, A. Scotch Bonnet gives C, capsaicin. Dried Fish is concentrated protein, calcium. Vegetables (Cassava, Carrots, Cabbage, Eggplant, Sweet Potato) offer a mix of carbs, fiber, vitamins (A, C, K), minerals (potassium, manganese). Stock Cubes add sodium/flavor. Bay Leaves/Tamarind add trace elements/antioxidants."
    ],
    nutritionFacts: {
      protein: 35,
      carbs: 65,
      fat: 18,
      fiber: 8,
      sugar: 6,
      sodium: 600 // Likely higher from stock/salt/dried fish
    }
  },
  {
    title: 'Sadza neNyama (Cornmeal Porridge with Beef Stew)',
    description: 'A traditional Zimbabwean dish made with cornmeal porridge served with a flavorful beef stew. This hearty meal is a staple in Zimbabwean cuisine and is often enjoyed during special occasions.',
    cookingTime: 90, // Can be longer for tender beef
    servings: 6,
    difficulty: 'MEDIUM',
    cuisineType: 'Africa',
    regionOfOrigin: 'Zimbabwe',
    imageUrl: '/images/recipes/sadza-nenyama.jpg',
    calories: 450,
    type: 'MAIN',
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: true, // Ensure stock/Worcestershire are GF
    isPescatarian: false,
    isLactoseFree: true,
    isNutFree: true,
    isFermented: true,
    isLowFodmap: false,
    ingredients: [
      { name: 'Cornmeal', amount: 2, unit: 'cups', notes: 'finely ground' }, // Sadza
      { name: 'Water', amount: 4, unit: 'cups', notes: 'for porridge' }, // Sadza
      // Stew (Nyama)
      { name: 'Beef', amount: 500, unit: 'grams', notes: 'cut into bite-sized pieces' },
      { name: 'Onions', amount: 2, unit: 'large', notes: 'finely chopped' }, // High FODMAP
      { name: 'Garlic', amount: 4, unit: 'cloves', notes: 'minced' }, // High FODMAP
      { name: 'Tomatoes', amount: 2, unit: 'medium', notes: 'finely diced' }, // Low FODMAP (moderate)
      { name: 'Carrots', amount: 2, unit: 'medium', notes: 'finely diced' }, // Low FODMAP
      { name: 'Celery', amount: 2, unit: 'stalks', notes: 'finely diced' }, // Moderate/High FODMAP
      { name: 'Bay Leaves', amount: 2, unit: 'pieces' }, // Low FODMAP
      { name: 'Beef Stock', amount: 1, unit: 'liter', notes: 'for stew' }, // Check ingredients for FODMAPs
      { name: 'Tomato Paste', amount: 2, unit: 'tablespoons', notes: 'for stew' }, // Low FODMAP (moderate)
      { name: 'Worcestershire Sauce', amount: 1, unit: 'tablespoon', notes: 'for stew' }, // Contains fermented anchovies/tamarind
      { name: 'Salt', amount: 1, unit: 'teaspoon', notes: 'for stew' }, // Low FODMAP
      { name: 'Black Pepper', amount: 0.5, unit: 'teaspoon', notes: 'for stew' }, // Low FODMAP
      { name: 'Olive Oil', amount: 2, unit: 'tablespoons', notes: 'for stew' } // Low FODMAP
    ],
    instructions: [
      { stepNumber: 1, description: 'Prepare the porridge (Sadza): In a pot, mix some cornmeal with cold water to form a paste. Bring remaining water to boil, add paste, stir well. Gradually add rest of cornmeal, stirring vigorously until very thick. Reduce heat, cover, steam for 15-20 mins.' }, // Corrected Sadza method
      { stepNumber: 2, description: 'Meanwhile, prepare the stew (Nyama): Heat oil in a large pot. Brown beef pieces. Remove and set aside.' },
      { stepNumber: 3, description: 'In the same pot, sauté onions, garlic, and celery until softened.' },
      { stepNumber: 4, description: 'Add carrots and diced tomatoes, cook for a few minutes.'},
      { stepNumber: 5, description: 'Return beef to pot. Add beef stock, tomato paste, Worcestershire sauce, bay leaves, salt, and pepper.'},
      { stepNumber: 6, description: 'Bring to a simmer, cover, and cook on low heat for 1.5 - 2 hours, or until beef is very tender.'},
      { stepNumber: 7, description: 'Adjust seasoning. Serve the stew alongside or over the sadza.' }
    ],
    notes: [
      "Sadza consistency is key - it should be thick and hold its shape.",
      "The stew develops more flavor with long, slow cooking.",
      "This dish is best served hot.",
       "Contains fermented ingredients: Worcestershire Sauce (contains fermented anchovies/tamarind), Beef Stock (may contain yeast extract).",
      "High-FODMAP ingredients include: Onions, Garlic, Celery. Beef stock and Worcestershire sauce may contain FODMAPs.",
      "Low-FODMAP ingredients include: Cornmeal, Water, Beef, Tomatoes (moderate), Carrots, Bay Leaves, Tomato Paste (moderate), Salt, Black Pepper, Olive Oil. Worcestershire sauce is low-FODMAP in small servings (like 1 tbsp spread over 6 servings).",
      "To make this strictly low-FODMAP: Replace onion/garlic with green onion/leek tops and garlic-infused oil. Limit celery to a small amount or omit. Use certified low-FODMAP beef stock. Ensure cornmeal is pure corn without added high-FODMAP flours.",
      "Nutrient Profile: Cornmeal provides carbohydrates, some fiber, magnesium. Beef is rich in protein, iron, zinc, B12. Onions/Garlic offer flavor, C, B6, manganese. Tomatoes give C, potassium, lycopene. Carrots provide Vitamin A. Celery gives K, A, folate. Bay Leaves/Pepper add trace elements. Beef Stock adds minerals, collagen (if bone broth). Tomato Paste concentrates lycopene, C, potassium. Worcestershire adds umami, sodium. Olive Oil provides monounsaturated fats, E."
    ],
    nutritionFacts: {
      protein: 25, // Seems low for 500g beef / 6 servings
      carbs: 40, // Mainly from cornmeal
      fat: 12,
      fiber: 4,
      sugar: 6,
      sodium: 480 // Higher with stock/Worcestershire/salt
    }
  },
  {
    title: 'Bobotie (Spiced Mince Casserole)',
    description: 'A South African dish made with a mixture of ground beef, lamb, and spices, topped with a creamy egg custard and baked until golden. This flavorful dish is a popular comfort food in South Africa.', // Corrected description - no sauce separate
    cookingTime: 60, // Plus baking time
    servings: 6,
    difficulty: 'MEDIUM',
    cuisineType: 'Africa',
    regionOfOrigin: 'South Africa',
    imageUrl: '/images/recipes/bobotie.jpg',
    calories: 450, // Seems low for meat/egg/cream dish
    type: 'MAIN',
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: true, // Traditionally includes bread soaked in milk (omit/use GF bread for GF) - This version omits bread. Ensure Worcestershire/stock are GF.
    isPescatarian: false,
    isLactoseFree: true, // Contains Cream/Milk - changed flag to false.
    isNutFree: true, // Traditionally includes almonds (omit for nut-free) - This version omits almonds. Ensure Worcestershire is nut-free.
    isFermented: true,
    isLowFodmap: false,
    ingredients: [ // Simplified and corrected typical Bobotie ingredients
      { name: 'Ground Beef', amount: 500, unit: 'grams', notes: 'lean' },
      { name: 'Ground Lamb', amount: 250, unit: 'grams', notes: 'lean (optional, can use all beef)' },
      { name: 'Onions', amount: 2, unit: 'large', notes: 'finely chopped' }, // High FODMAP
      { name: 'Garlic', amount: 4, unit: 'cloves', notes: 'minced' }, // High FODMAP
      { name: 'Curry Powder', amount: 2, unit: 'tablespoons' }, // Check FODMAPs
      { name: 'Turmeric', amount: 1, unit: 'teaspoon' }, // Low FODMAP
      { name: 'Apricot Jam', amount: 2, unit: 'tablespoons' }, // Moderate/High FODMAP (fructose)
      { name: 'Worcestershire Sauce', amount: 1, unit: 'tablespoon' }, // Contains fermented ingredients
      { name: 'Vinegar', amount: 1, unit: 'tablespoon', notes:'cider or white wine'}, // Fermented
      { name: 'Bay Leaves', amount: 2, unit: 'pieces' }, // Low FODMAP
      { name: 'Salt', amount: 1, unit: 'teaspoon' }, // Low FODMAP
      { name: 'Black Pepper', amount: 0.5, unit: 'teaspoon' }, // Low FODMAP
      { name: 'Olive Oil', amount: 2, unit: 'tablespoons' }, // Low FODMAP
      // For Topping (Custard)
      { name: 'Milk', amount: 1, unit: 'cup' }, // High FODMAP (lactose)
      { name: 'Eggs', amount: 2, unit: 'large' }, // Low FODMAP
      { name: 'Salt', amount: 0.25, unit: 'teaspoon' }, // Low FODMAP
      { name: 'Turmeric', amount: 0.25, unit: 'teaspoon' } // Low FODMAP
    ],
    instructions: [ // Simplified and corrected Bobotie instructions
      { stepNumber: 1, description: 'Preheat oven to 180°C (350°F). Grease a baking dish.' },
      { stepNumber: 2, description: 'Heat oil in a large pan. Sauté onions and garlic until softened.' },
      { stepNumber: 3, description: 'Add ground meats and cook until browned, breaking up lumps.' },
      { stepNumber: 4, description: 'Stir in curry powder, turmeric, apricot jam, Worcestershire sauce, vinegar, salt, and pepper. Simmer for 10 minutes.' },
      { stepNumber: 5, description: 'Remove from heat. Discard bay leaves if desired (or leave for baking). Transfer meat mixture to the prepared baking dish.' },
      { stepNumber: 6, description: 'Make the topping: Whisk together milk, eggs, salt, and turmeric.' },
      { stepNumber: 7, description: 'Pour the egg mixture evenly over the meat.' },
      { stepNumber: 8, description: 'Place bay leaves on top if removed earlier. Bake for 30-35 minutes, until the topping is set and golden brown.'}
    ],
    notes: [
      "Traditionally served with yellow rice and chutney.",
      "Adding soaked bread (squeezed dry) to the meat mixture is traditional but omitted here for simplicity/GF option.",
      "Sultanas or raisins are often added to the meat mixture.",
      "Almonds are a common garnish but omitted here for nut-free option.",
       "Contains fermented ingredients: Worcestershire Sauce, Vinegar.",
      "High-FODMAP ingredients include: Onions, Garlic, Milk (lactose), Apricot Jam (fructose). Curry powder and Worcestershire sauce may contain FODMAPs.",
      "Low-FODMAP ingredients include: Ground Beef, Ground Lamb, Turmeric, Bay Leaves, Salt, Black Pepper, Olive Oil, Eggs.",
      "To make this strictly low-FODMAP: Replace onion/garlic with green onion/leek tops and garlic-infused oil. Replace milk with lactose-free milk. Replace apricot jam with a low-FODMAP alternative like strawberry jam (check ingredients) or a small amount of maple syrup/sugar. Use certified low-FODMAP curry powder or make your own blend. Ensure Worcestershire sauce is low-FODMAP in the amount used. Omit raisins/sultanas if typically added.",
      "Nutrient Profile: Ground Meats provide protein, iron, zinc, B12. Onions/Garlic add flavor, C, B6, manganese. Curry Powder/Turmeric offer antioxidants (curcumin). Apricot Jam provides sugar. Worcestershire/Vinegar add flavor. Bay Leaves/Pepper give trace elements. Olive Oil provides fat, E. Milk offers calcium, D (if fortified), protein. Eggs give protein, D, B12, choline."
    ],
    nutritionFacts: { // Original facts likely based on a different ingredient list
      protein: 30, // Seems more plausible with meat/egg/milk
      carbs: 20, // Plausible with jam/milk sugars
      fat: 25, // Plausible with meat/oil/egg yolk
      fiber: 4,
      sugar: 6, // Higher with jam
      sodium: 580 // Plausible with salt/Worcestershire
    }
  },
   {
    title: "Kapenta, Sadza, and Muriwo uneDovi",
    description: "A traditional Zimbabwean meal featuring dried kapenta (matemba), sadza (cornmeal porridge), and muriwo unedovi (African greens in peanut butter sauce). This authentic combination represents the heart of Zimbabwean cuisine, offering a perfect balance of protein, starch, and vegetables.",
    cookingTime: 60,
    servings: 4,
    difficulty: "MEDIUM",
    cuisineType: "Africa",
    regionOfOrigin: "Zimbabwe",
    imageUrl: "/images/recipes/kapenta-sadza-muriwo.jpg",
    calories: 520,
    type: "MAIN",
    isVegetarian: false, // Contains Kapenta (fish)
    isVegan: false,
    isGlutenFree: true, // Ensure curry powder/peanut butter are GF
    isPescatarian: true,
    isLactoseFree: true,
    isNutFree: false, // Contains Peanut Butter
    isFermented: false, // Kapenta drying isn't typically fermentation; Peanut butter isn't typically fermented.
    isLowFodmap: false,
    ingredients: [
      // Kapenta
      { name: "Dried Kapenta", amount: 250, unit: "grams", notes: "matemba, cleaned and sorted" },
      { name: "Onions", amount: 1, unit: "medium", notes: "for kapenta, finely chopped" }, // High FODMAP
      { name: "Tomatoes", amount: 2, unit: "medium", notes: "for kapenta, chopped" }, // Low FODMAP (moderate)
      { name: "Garlic", amount: 1, unit: "clove", notes: "minced, for kapenta" }, // High FODMAP
      { name: "Curry Powder", amount: 0.5, unit: "teaspoon", notes: "for kapenta" }, // Check FODMAPs
      { name: "Tomato Paste", amount: 2, unit: "teaspoons", notes: "for kapenta sauce" }, // Low FODMAP (moderate)
      { name: "Cooking Oil", amount: 2, unit: "tablespoons", notes: "for kapenta" }, // Low FODMAP
      // Sadza
      { name: "Mealie Meal", amount: 3, unit: "cups", notes: "white cornmeal for sadza" }, // Low FODMAP
      { name: "Water", amount: 5, unit: "cups", notes: "for sadza (approx)" }, // Low FODMAP
      // Muriwo uneDovi
      { name: "African Greens", amount: 8, unit: "cups", notes: "rape, kale, or collard greens, finely chopped" }, // Check FODMAPs (Kale/Collards low)
      { name: "Onions", amount: 1, unit: "medium", notes: "for muriwo, finely chopped" }, // High FODMAP
      { name: "Bell Pepper", amount: 1, unit: "medium", notes: "for muriwo, chopped" }, // Low FODMAP (moderate)
      { name: "Garlic", amount: 2, unit: "cloves", notes: "minced, for muriwo" }, // High FODMAP
      { name: 'Ginger', amount: 1, unit: 'inch', notes: 'fresh, minced' }, // Low FODMAP
      { name: 'Smoked Paprika', amount: 1, unit: 'teaspoon', notes: 'for muriwo' }, // Low FODMAP
      { name: "Natural Peanut Butter", amount: 0.25, unit: "cup", notes: "for muriwo sauce" }, // Moderate FODMAP
      { name: "Cooking Oil", amount: 2, unit: "tablespoons", notes: "for muriwo" }, // Low FODMAP
      { name: "Water", amount: 0.25, unit: "cup", notes: "for muriwo sauce" }, // Low FODMAP
      { name: "Salt", amount: 1, unit: "teaspoon", notes: "or to taste, divided" } // Low FODMAP
    ],
    instructions: [ // Slightly adjusted structure for clarity
      { stepNumber: 1, description: "Prepare Kapenta: Soak dried kapenta in hot water for 10 minutes. Drain and pat dry." },
      { stepNumber: 2, description: "Heat 2 tbsp oil for kapenta, fry until lightly browned. Remove." },
      { stepNumber: 3, description: "In same pan, sauté 1 chopped onion and 1 minced garlic clove. Add curry powder." },
      { stepNumber: 4, description: "Add chopped tomatoes and tomato paste. Cook for 3 minutes." },
      { stepNumber: 5, description: "Return kapenta to pan, add a little water, salt to taste. Cover and simmer 10 minutes until sauce thickens." },
      { stepNumber: 6, description: "Prepare Sadza: Bring 4 cups water to boil. Mix 1 cup mealie meal with 1 cup cold water into a paste. Add paste to boiling water, stir constantly. Cook 5 mins." },
      { stepNumber: 7, description: "Gradually add remaining mealie meal, stirring vigorously until very thick. Reduce heat, cover, steam 15-20 mins." },
      { stepNumber: 8, description: "Prepare Muriwo: Heat 2 tbsp oil for muriwo. Sauté 1 chopped onion, bell pepper, and ginger until softened." },
      { stepNumber: 9, description: "Add 2 minced garlic cloves and smoked paprika, cook 1 minute." },
      { stepNumber: 10, description: "Add greens and cook until wilted, about 5 minutes. Salt to taste." },
      { stepNumber: 11, description: "Mix peanut butter with 1/4 cup hot water until smooth. Add to the greens, stir well, simmer 5 minutes." },
      { stepNumber: 12, description: "Serve hot: Plate sadza, top with kapenta stew, and serve muriwo unedovi alongside." }
    ],
    notes: [
      "Kapenta should be cleaned thoroughly before cooking to remove any sand or debris",
      "For best sadza, maintain constant stirring to achieve smooth consistency",
      "The peanut butter sauce for muriwo should be smooth and not too thick",
      "Traditional muriwo uses rape (covo) but kale or collards work well as substitutes",
      "Adjust the thickness of sadza by adding more water or mealie meal as needed",
       "High-FODMAP ingredients include: Onions, Garlic. Peanut Butter is moderate-FODMAP and can become high in larger servings. Some African greens (like rape/covo) haven't been tested; use tested low-FODMAP greens like kale or collard greens. Curry powder may contain FODMAPs.",
      "Low-FODMAP ingredients include: Dried Kapenta, Mealie Meal, Water, Tomatoes (moderate), Tomato Paste (moderate), Cooking Oil, Kale/Collard Greens, Bell Pepper (moderate), Ginger, Smoked Paprika, Salt.",
      "To make this strictly low-FODMAP: Replace onion/garlic with green onion/leek tops and garlic-infused oil in both Kapenta and Muriwo preparations. Use low-FODMAP greens (kale, collards). Limit peanut butter to the low-FODMAP serving size (max 2 tbsp per person). Check curry powder ingredients or use low-FODMAP spices.",
      "Nutrient Profile: Dried Kapenta is very rich in protein, calcium, iron, zinc. Mealie Meal provides carbs, magnesium. Greens (Kale/Collards) offer Vitamin K, A, C, fiber. Peanut Butter gives protein, healthy fats, niacin. Onions/Garlic add flavor, C, B6, manganese. Tomatoes give C, potassium, lycopene. Bell Pepper provides C, A. Ginger contains gingerol. Paprika adds color/antioxidants. Oil provides fat."
    ],
    nutritionFacts: {
      protein: 28, // Plausible with Kapenta + Peanut Butter
      carbs: 65, // Plausible with Sadza
      fat: 18, // Plausible with oil + Peanut Butter
      fiber: 12, // Plausible with greens/cornmeal/PB
      sugar: 4,
      sodium: 520 // Plausible with salt
    }
  },
  {
    title: "Umngqusho (Samp and Beans)",
    description: "A traditional South African dish made with samp (crushed dried corn) and beans, prepared in the vegetarian style common in daily South African cooking. This hearty meal is a staple in South African cuisine, known to be Nelson Mandela's favorite dish, and is often enjoyed during both everyday meals and special occasions.",
    cookingTime: 60, // Plus soaking time, actual cooking often 2-3 hours
    servings: 6,
    difficulty: "MEDIUM",
    cuisineType: "Africa",
    regionOfOrigin: "South Africa",
    imageUrl: "/images/recipes/umngqusho.jpeg",
    calories: 400,
    type: "MAIN",
    isVegetarian: true,
    isVegan: true,
    isGlutenFree: true, // Ensure stock/curry powder/nutritional yeast are GF
    isPescatarian: false,
    isLactoseFree: true,
    isNutFree: true,
    isFermented: true, // Nutritional Yeast is produced via fermentation. Stock may contain yeast extract.
    isLowFodmap: false,
    ingredients: [
      { name: "Samp", amount: 2, unit: "cups", notes: "crushed dried corn" }, // Moderate FODMAP
      { name: "Sugar Beans", amount: 1, unit: "cup", notes: "dried, soaked overnight" }, // High FODMAP
      { name: "Water", amount: 8, unit: "cups", notes: "approx, for cooking samp/beans" }, // Low FODMAP
      { name: "Onions", amount: 2, unit: "large", notes: "finely chopped" }, // High FODMAP
      { name: "Garlic", amount: 4, unit: "cloves", notes: "minced" }, // High FODMAP
      { name: "Carrots", amount: 2, unit: "medium", notes: "finely diced" }, // Low FODMAP
      { name: "Celery", amount: 2, unit: "stalks", notes: "finely diced" }, // Moderate/High FODMAP
      { name: "Tomatoes", amount: 2, unit: "medium", notes: "finely diced" }, // Low FODMAP (moderate)
      { name: "Bay Leaves", amount: 2, unit: "pieces" }, // Low FODMAP
      { name: "Vegetable Stock", amount: 1, unit: "liter", notes: "for stew" }, // Check FODMAPs
      { name: "Tomato Paste", amount: 2, unit: "tablespoons", notes: "for richness" }, // Low FODMAP (moderate)
      { name: "Curry Powder", amount: 1, unit: "tablespoon", notes: "traditional spicing" }, // Check FODMAPs
      { name: "Paprika", amount: 1, unit: "teaspoon", notes: "for flavor and color" }, // Low FODMAP
      { name: "Nutritional Yeast", amount: 2, unit: "tablespoons", notes: "optional, for umami" }, // Low FODMAP
      { name: "Salt", amount: 1, unit: "teaspoon", notes: "or to taste" }, // Low FODMAP
      { name: "Black Pepper", amount: 0.5, unit: "teaspoon", notes: "freshly ground" }, // Low FODMAP
      { name: "Olive Oil", amount: 2, unit: "tablespoons", notes: "for cooking" } // Low FODMAP
    ],
    instructions: [ // Adjusted instructions for typical Umngqusho method
      { stepNumber: 1, description: "Soak samp and beans separately overnight. Drain and rinse." },
      { stepNumber: 2, description: "In a large pot, combine soaked samp and beans. Cover generously with water (about 8 cups). Bring to boil, then reduce heat and simmer for 2-3 hours, or until tender, adding more hot water if needed." },
      { stepNumber: 3, description: "When samp/beans are almost tender, heat oil in a separate pan. Sauté onions, garlic, celery, and carrots until softened." },
      { stepNumber: 4, description: "Add tomatoes, tomato paste, curry powder, paprika, bay leaves, salt, and pepper to the vegetables. Cook for 5-10 minutes." },
      { stepNumber: 5, description: "Add the sautéed vegetable mixture and vegetable stock to the pot with the samp and beans." },
      { stepNumber: 6, description: "Stir in nutritional yeast (if using). Simmer for another 30 minutes, or until desired consistency is reached and flavors meld. Ensure it doesn't dry out." },
      { stepNumber: 7, description: "Remove bay leaves. Adjust seasoning and serve hot." }
    ],
    notes: [
      "Soak samp and beans overnight for best results and shorter cooking time (though still long).",
      "The consistency should be thick and hearty, but not dry; add water/stock as needed.",
      "Can be made in advance and reheated, as flavors improve over time.",
      "Traditional versions vary; some add potatoes or meat.",
      "Nutritional yeast is a modern addition for umami flavor but can be omitted.",
       "Contains fermented ingredients: Nutritional Yeast (produced via fermentation), Vegetable Stock (may contain yeast extract).",
      "High-FODMAP ingredients include: Sugar Beans, Onions, Garlic, Celery. Samp is moderate-FODMAP. Stock and curry powder may contain FODMAPs.",
      "Low-FODMAP ingredients include: Water, Carrots, Tomatoes (moderate), Bay Leaves, Tomato Paste (moderate), Paprika, Nutritional Yeast, Salt, Black Pepper, Olive Oil.",
      "To make this strictly low-FODMAP: This is very difficult as beans and samp are core ingredients. Replace onion/garlic with green onion/leek tops and garlic-infused oil. Limit celery or omit. Use certified low-FODMAP stock and curry powder. The main strategy would be strict portion control of the finished dish due to beans and samp.",
      "Nutrient Profile: Samp provides carbs, fiber, magnesium. Sugar Beans are high in protein, fiber, folate, iron, potassium. Onions/Garlic add flavor, C, B6, manganese. Carrots give Vitamin A. Celery provides K, A, folate. Tomatoes offer C, potassium, lycopene. Bay Leaves/Paprika/Pepper add trace elements. Veg Stock adds minerals/flavor. Tomato Paste concentrates lycopene, C, K. Curry Powder adds antioxidants. Nutritional Yeast provides B vitamins (often fortified B12), protein. Olive Oil gives fat, E."
    ],
    nutritionFacts: {
      protein: 15, // Plausible from beans
      carbs: 45, // Plausible from samp/beans
      fat: 8, // Plausible with oil
      fiber: 12, // Plausible from beans/samp/veg
      sugar: 6,
      sodium: 480 // Plausible with stock/salt
    }
  },
  
    {
      title: "Full English Breakfast",
      description: "A robust and indulgent morning feast featuring eggs, bacon, sausages, baked beans, tomatoes, mushrooms, and toast. A quintessential British start to the day.",
      cookingTime: 30,
      servings: 2,
      difficulty: "EASY",
      cuisineType: "Europe",
      regionOfOrigin: "England",
      imageUrl: "/images/recipes/full_english_breakfast.jpg",
      calories: 800,
      type: "BREAKFAST",
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: false,
      isPescatarian: false,
      isLactoseFree: false,
      isNutFree: true,
      isFermented: true,
      isLowFodmap: false,
      ingredients: [
        { name: "Bacon", amount: 4, unit: "slices", notes: "streaky or back bacon" },
        { name: "Sausages", amount: 2, unit: "pieces", notes: "pork or Cumberland sausages" },
        { name: "Eggs", amount: 2, unit: "pieces", notes: "free-range" },
        { name: "Baked beans", amount: 1, unit: "can", notes: "classic Heinz or homemade" },
        { name: "Tomatoes", amount: 2, unit: "pieces", notes: "halved" },
        { name: "Mushrooms", amount: 100, unit: "g", notes: "button or chestnut" },
        { name: "Bread", amount: 2, unit: "slices", notes: "thick-cut, for toasting" },
        { name: "Butter", amount: 1, unit: "tbsp", notes: "for spreading" },
        { name: "Salt", amount: 1, unit: "tsp", notes: "to taste" },
        { name: "Black pepper", amount: 0.5, unit: "tsp", notes: "to taste" },
        { name: "Vegetable oil", amount: 1, unit: "tbsp", notes: "for frying" }
      ],
      instructions: [
        { stepNumber: 1, description: "Heat a large frying pan over medium heat. Add a drizzle of vegetable oil and fry the sausages until golden brown and cooked through (about 10-12 minutes). Remove and set aside." },
        { stepNumber: 2, description: "In the same pan, fry the bacon until crispy (about 4-5 minutes). Remove and set aside with the sausages." },
        { stepNumber: 3, description: "Add the halved tomatoes and mushrooms to the pan. Cook until softened and slightly caramelized (about 5 minutes). Season with salt and pepper." },
        { stepNumber: 4, description: "In a small saucepan, heat the baked beans over low heat until warmed through." },
        { stepNumber: 5, description: "In a separate non-stick pan, fry the eggs to your liking (sunny-side up, over-easy, or scrambled)." },
        { stepNumber: 6, description: "Toast the bread and spread with butter." },
        { stepNumber: 7, description: "Arrange all components on a plate: sausages, bacon, eggs, tomatoes, mushrooms, baked beans, and toast. Serve immediately." }
      ],
      notes: [
        "For a traditional touch, add black pudding or hash browns.",
        "Use vegetarian sausages and omit the bacon for a meat-free version.",
        "Keep the fried eggs runny for dipping the toast.",
        "Fermented Ingredients: Bread is leavened using yeast fermentation. Butter may be made from cultured cream.",
        "FODMAP Information: High-FODMAP ingredients include baked beans (GOS), sausages (often contain onion, garlic, wheat - check label), mushrooms (polyols), and bread (fructans). Low-FODMAP ingredients include eggs, bacon (check additives), tomatoes (limit to 1/2 medium), butter (small amounts), oil, salt, pepper. ",
        "Low-FODMAP Recommendations: Use gluten-free bread. Choose low-FODMAP certified sausages or make your own without onion/garlic. Replace baked beans with a homemade low-FODMAP version (e.g., using tomato passata, maple syrup). Limit mushrooms or substitute with low-FODMAP oyster mushrooms (up to 1 cup). Ensure bacon is free from high-FODMAP additives.",
        "Vitamins & Minerals: This breakfast offers protein and B vitamins (B12, niacin, B6) from eggs, bacon, and sausages. Baked beans provide fiber and folate. Tomatoes contribute Vitamin C and lycopene. Mushrooms offer B vitamins and selenium. Bread provides carbohydrates and some B vitamins (if fortified). Butter contains Vitamin A."
      ],
      nutritionFacts: {
        protein: 35,
        carbs: 50,
        fat: 40,
        fiber: 8,
        sugar: 10,
        sodium: 1200
      }
    },
    {
      title: "Fish and Chips",
      description: "A crispy and golden delight of beer-battered fish paired with thick-cut chips, often served with mushy peas and tartar sauce. A British seaside classic.",
      cookingTime: 30,
      servings: 2,
      difficulty: "MEDIUM",
      cuisineType: "Europe",
      regionOfOrigin: "England",
      imageUrl: "/images/recipes/fishandchips.jpg",
      calories: 900,
      type: "MAIN",
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: false,
      isPescatarian: true,
      isLactoseFree: false,
      isNutFree: true,
      isFermented: true,
      isLowFodmap: false,
      ingredients: [
        { name: "White fish fillets", amount: 2, unit: "pieces", notes: "cod or haddock, skinless" },
        { name: "Potatoes", amount: 4, unit: "pieces", notes: "Maris Piper or Russet, peeled and cut into chips" },
        { name: "Flour", amount: 150, unit: "g", notes: "for the batter and coating" },
        { name: "Beer", amount: 200, unit: "ml", notes: "chilled, for the batter" },
        { name: "Baking powder", amount: 1, unit: "tsp" },
        { name: "Salt", amount: 1, unit: "tsp", notes: "to taste" },
        { name: "Vegetable oil", amount: 1, unit: "liter", notes: "for deep frying" },
        { name: "Mushy peas", amount: 200, unit: "g", notes: "optional, for serving" },
        { name: "Tartar sauce", amount: 4, unit: "tbsp", notes: "optional, for serving" }
      ],
      instructions: [
        { stepNumber: 1, description: "Preheat the oil in a deep fryer or large pot to 160°C (320°F)." },
        { stepNumber: 2, description: "Blanch the potato chips in the hot oil for 3-4 minutes until soft but not colored. Remove and drain on paper towels." },
        { stepNumber: 3, description: "Increase the oil temperature to 190°C (375°F)." },
        { stepNumber: 4, description: "In a mixing bowl, whisk together the flour, beer, baking powder, and a pinch of salt to form a smooth batter." },
        { stepNumber: 5, description: "Lightly coat the fish fillets in flour, then dip them into the batter, ensuring they are fully covered." },
        { stepNumber: 6, description: "Carefully lower the battered fish into the hot oil and fry for 6-8 minutes until golden and crispy. Remove and drain on paper towels." },
        { stepNumber: 7, description: "Fry the blanched chips in the hot oil for 2-3 minutes until golden and crispy. Drain on paper towels and season with salt." },
        { stepNumber: 8, description: "Serve the fish and chips with mushy peas and tartar sauce on the side." }
      ],
      notes: [
        "For a gluten-free version, use gluten-free flour and beer.",
        "Add a splash of malt vinegar for an authentic touch.",
        "Double-frying the chips ensures they are extra crispy.",
        "Fermented Ingredients: Beer is produced through yeast fermentation. Tartar sauce often contains pickles or relish, which are typically fermented.",
        "FODMAP Information: High-FODMAP ingredients include regular flour (fructans), beer (fructans), mushy peas (GOS), and tartar sauce (often contains onion, garlic, or high-FODMAP relish). Low-FODMAP ingredients are fish, potatoes, baking powder, salt, and oil.",
        "Low-FODMAP Recommendations: Use gluten-free all-purpose flour and certified gluten-free beer for the batter. Serve with a low-FODMAP side instead of mushy peas (e.g., steamed carrots or green beans). Choose a low-FODMAP tartar sauce (check ingredients carefully for onion, garlic, HFCS) or make your own.",
        "Vitamins & Minerals: Fish is a great source of lean protein, Vitamin B12, iodine, and selenium. Potatoes provide potassium, Vitamin C, and carbohydrates. Flour (especially if fortified) adds B vitamins. Beer contains some B vitamins. Vegetable oil primarily contributes fat."
      ],
      nutritionFacts: {
        protein: 40,
        carbs: 80,
        fat: 45,
        fiber: 6,
        sugar: 2,
        sodium: 800
      }
    },
    {
      title: "Shepherd's Pie",
      description: "A comforting and savory dish of minced lamb cooked with vegetables, topped with a creamy layer of mashed potatoes, and baked until golden and bubbling.",
      cookingTime: 45,
      servings: 4,
      difficulty: "MEDIUM",
      cuisineType: "Europe",
      regionOfOrigin: "England",
      imageUrl: "/images/recipes/shepherdspie.jpg",
      calories: 600,
      type: "MAIN",
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: true,
      isPescatarian: false,
      isLactoseFree: false,
      isNutFree: true,
      isFermented: true,
      isLowFodmap: false,
      ingredients: [
        { name: "Minced lamb", amount: 500, unit: "g" },
        { name: "Onion", amount: 1, unit: "piece", notes: "finely chopped" },
        { name: "Carrots", amount: 2, unit: "pieces", notes: "diced" },
        { name: "Peas", amount: 100, unit: "g", notes: "frozen or fresh" },
        { name: "Tomato paste", amount: 2, unit: "tbsp" },
        { name: "Beef stock", amount: 300, unit: "ml" },
        { name: "Worcestershire sauce", amount: 1, unit: "tbsp" },
        { name: "Potatoes", amount: 4, unit: "pieces", notes: "peeled and cubed" },
        { name: "Butter", amount: 50, unit: "g" },
        { name: "Milk", amount: 100, unit: "ml" },
        { name: "Salt", amount: 1, unit: "tsp", notes: "to taste" },
        { name: "Black pepper", amount: 0.5, unit: "tsp", notes: "to taste" }
      ],
      instructions: [
        { stepNumber: 1, description: "Preheat the oven to 200°C (400°F)." },
        { stepNumber: 2, description: "In a large pan, brown the minced lamb over medium heat. Remove and set aside." },
        { stepNumber: 3, description: "In the same pan, sauté the onion and carrots until softened (about 5 minutes)." },
        { stepNumber: 4, description: "Add the tomato paste, Worcestershire sauce, and beef stock. Stir well and return the lamb to the pan. Simmer for 10 minutes, then add the peas. Season with salt and pepper." },
        { stepNumber: 5, description: "Boil the potatoes until tender. Drain and mash with butter and milk until smooth. Season with salt and pepper." },
        { stepNumber: 6, description: "Transfer the lamb mixture to a baking dish. Spread the mashed potatoes evenly over the top." },
        { stepNumber: 7, description: "Bake for 20-25 minutes until the top is golden and the filling is bubbling." },
        { stepNumber: 8, description: "Serve hot with a side of steamed vegetables." }
      ],
      notes: [
        "For a vegetarian version, replace the lamb with lentils or plant-based mince.",
        "Add grated cheese to the mashed potatoes for extra richness.",
        "Make ahead and refrigerate before baking for an easy weeknight meal.",
        "Fermented Ingredients: Worcestershire sauce typically contains fermented ingredients like anchovies and vinegar. Butter may be cultured.",
        "FODMAP Information: High-FODMAP ingredients include onion (fructans), peas (GOS), beef stock (often contains onion/garlic), Worcestershire sauce (often contains onion/garlic), and milk (lactose). Low-FODMAP ingredients include lamb, carrots (limit to 1 medium), tomato paste (limit to 2 tbsp), potatoes, butter (small amounts), salt, and pepper.",
        "Low-FODMAP Recommendations: Replace onion with the green parts of leeks or spring onions, or use garlic-infused oil for flavour. Use a certified low-FODMAP beef stock. Limit peas to 1 tablespoon per serve or omit. Use lactose-free milk for the mash. Check Worcestershire sauce label for onion/garlic or use a low-FODMAP alternative.",
        "Vitamins & Minerals: Lamb provides protein, iron, zinc, and Vitamin B12. Potatoes are rich in potassium and Vitamin C. Carrots offer Vitamin A (beta-carotene). Peas contribute fiber and Vitamin K. Milk and butter add calcium and Vitamin D (if fortified). Beef stock can provide minerals."
      ],
      nutritionFacts: {
        protein: 30,
        carbs: 50,
        fat: 25,
        fiber: 6,
        sugar: 5,
        sodium: 700
      }
    },
    {
      title: "Mhadjeb (Algerian Stuffed Pancakes)",
      description: 'A popular Algerian street food made with thin semolina pancakes stuffed with a flavorful mixture of onions, tomatoes, and spices.',
      cookingTime: 60,
      servings: 4,
      difficulty: 'MEDIUM',
      cuisineType: 'Africa',
      regionOfOrigin: 'Algeria',
      imageUrl: '/images/recipes/mhadjeb.jpg',
      calories: 300,
      type: 'SNACK',
      isVegetarian: true,
      isVegan: true,
      isGlutenFree: false,
      isPescatarian: false,
      isLactoseFree: true,
      isNutFree: true,
      isFermented: false,
      isLowFodmap: false,
      ingredients: [
        { name: 'Semolina', amount: 2, unit: 'cups' },
        { name: 'Water', amount: 1, unit: 'cup' },
        { name: 'Onions', amount: 2, unit: 'medium' },
        { name: 'Tomatoes', amount: 4, unit: 'large' },
        { name: 'Tomato paste', amount: 1, unit: 'tablespoon' },
        { name: 'Olive oil', amount: 3, unit: 'tablespoons' },
        { name: 'Spices (paprika, cumin)', amount: 1, unit: 'teaspoon each' },
        { name: 'Salt', amount: 1, unit: 'teaspoon', notes: 'to taste' }
      ],
      instructions: [
        { stepNumber: 1, description: 'Mix semolina and water to form a dough. Let it rest for 30 minutes.' },
        { stepNumber: 2, description: 'Sauté onions in olive oil until soft. Add tomatoes, tomato paste, and spices. Cook until thickened.' },
        { stepNumber: 3, description: 'Divide the dough into balls and roll out into thin circles.' },
        { stepNumber: 4, description: 'Place the filling on one half of the circle and fold over to seal.' },
        { stepNumber: 5, description: 'Cook on a hot griddle until golden brown on both sides.' },
        { stepNumber: 6, description: 'Serve warm as a snack or light meal.' }
      ],
      notes: [
        "FODMAP Information: High-FODMAP ingredients include semolina (fructans - wheat) and onions (fructans). Garlic (fructans) is also often included in the filling. Low-FODMAP ingredients include water, tomatoes (limit to 1/2 medium), tomato paste (limit to 2 tbsp), olive oil, salt, and spices (check blends).",
        "Low-FODMAP Recommendations: This recipe is difficult to adapt due to the semolina dough. For the filling, omit onions (and garlic if used), replacing with green parts of spring onions or garlic-infused oil. Limit tomato quantities. A gluten-free flour blend might be experimented with for the dough, but the texture will differ significantly.",
        "Vitamins & Minerals: Semolina provides carbohydrates, some protein, and B vitamins. Tomatoes are a source of Vitamin C, potassium, and lycopene. Onions contain Vitamin C and antioxidants. Olive oil offers healthy monounsaturated fats and Vitamin E. Spices like paprika and cumin contribute antioxidants."
      ],
      nutritionFacts: {
        protein: 8,
        carbs: 50,
        fat: 10,
        fiber: 4,
        sugar: 5,
        sodium: 400
      }
    },
    {
      title: "Muamba de Galinha (Chicken Muamba)",
      description: 'A flavorful Angolan stew made with chicken, palm oil, okra, and garlic, often served with funge or rice.',
      cookingTime: 90,
      servings: 4,
      difficulty: 'MEDIUM',
      cuisineType: 'Africa',
      regionOfOrigin: 'Angola',
      imageUrl: '/images/recipes/muamba-de-galinha-chicken-muamba-55.jpg',
      calories: 400,
      type: 'MAIN',
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: true,
      isPescatarian: false,
      isLactoseFree: true,
      isNutFree: true,
      isFermented: false,
      isLowFodmap: false,
      ingredients: [
        { name: 'Chicken', amount: 1, unit: 'whole', notes: 'cut into pieces' },
        { name: 'Palm oil', amount: 4, unit: 'tablespoons' },
        { name: 'Okra', amount: 200, unit: 'grams' },
        { name: 'Garlic', amount: 4, unit: 'cloves' },
        { name: 'Onion', amount: 1, unit: 'large' },
        { name: 'Tomatoes', amount: 2, unit: 'large' },
        { name: 'Chili pepper', amount: 1, unit: 'piece' },
        { name: 'Water', amount: 2, unit: 'cups' },
        { name: 'Salt', amount: 1, unit: 'teaspoon', notes: 'to taste' }
      ],
      instructions: [
        { stepNumber: 1, description: 'Heat palm oil in a large pot. Add chopped onions and garlic, and sauté until fragrant.' },
        { stepNumber: 2, description: 'Add chicken pieces and brown on all sides.' },
        { stepNumber: 3, description: 'Add chopped tomatoes, chili pepper, and salt. Stir well.' },
        { stepNumber: 4, description: 'Add water and bring to a boil. Reduce heat and simmer for 30 minutes.' },
        { stepNumber: 5, description: 'Add okra and cook for another 20-30 minutes until the chicken is tender and the sauce thickens.' },
        { stepNumber: 6, description: 'Serve hot with funge or rice.' }
      ],
      notes: [
        "FODMAP Information: High-FODMAP ingredients include okra (fructans/GOS), garlic (fructans), and onion (fructans). Low-FODMAP ingredients include chicken, palm oil, tomatoes (limit to 1/2 medium), chili pepper (test tolerance for capsaicin), water, and salt.",
        "Low-FODMAP Recommendations: Omit onion and garlic. Use garlic-infused oil and the green parts of spring onions or leeks for flavour instead. Omit okra or replace with a low-FODMAP vegetable like green beans or bell peppers (limited portion). Limit tomato quantity.",
        "Vitamins & Minerals: Chicken is rich in protein and B vitamins (niacin, B6, B12). Palm oil provides Vitamin E and beta-carotene. Okra offers fiber, Vitamin C, and Vitamin K. Tomatoes supply Vitamin C and potassium. Garlic and onions contain beneficial sulfur compounds and antioxidants. Chili pepper provides Vitamin C and capsaicin."
      ],
      nutritionFacts: {
        protein: 30,
        carbs: 15,
        fat: 25,
        fiber: 5,
        sugar: 4,
        sodium: 600
      }
    },
    {
      title: "Maftoul",
      description: "A traditional Palestinian dish made with hand-rolled couscous pearls, typically served with chicken, chickpeas, and a flavorful broth.",
      cookingTime: 90,
      servings: 6,
      difficulty: "MEDIUM",
      cuisineType: "Asia",
      regionOfOrigin: "Palestine",
      imageUrl: "/images/recipes/maftoul.jpg",
      calories: 450,
      type: "MAIN",
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: false,
      isPescatarian: false,
      isLactoseFree: true,
      isNutFree: true,
      isFermented: false,
      isLowFodmap: false,
      ingredients: [
        { name: "Maftoul", amount: 2, unit: "cups", notes: "hand-rolled couscous" },
        { name: "Chicken", amount: 2, unit: "pounds", notes: "cut into pieces" },
        { name: "Chickpeas", amount: 1, unit: "can", notes: "drained and rinsed" },
        { name: "Onion", amount: 1, unit: "large", notes: "diced" },
        { name: "Chicken broth", amount: 4, unit: "cups" },
        { name: "Olive oil", amount: 3, unit: "tablespoons" },
        { name: "Palestinian spice mix", amount: 2, unit: "tablespoons", notes: "includes allspice, cinnamon, cumin" },
        { name: "Salt", amount: 1, unit: "teaspoon", notes: "to taste" },
        { name: "Black pepper", amount: 0.5, unit: "teaspoon", notes: "to taste" }
      ],
      instructions: [
        { stepNumber: 1, description: "In a large pot, sauté diced onions in olive oil until golden brown." },
        { stepNumber: 2, description: "Add chicken pieces and brown on all sides. Season with spice mix, salt, and pepper." },
        { stepNumber: 3, description: "Add chicken broth and bring to a boil. Reduce heat and simmer for 30 minutes." },
        { stepNumber: 4, description: "Add chickpeas and continue cooking for 15 minutes." },
        { stepNumber: 5, description: "In a separate pot, cook maftoul with some of the chicken broth until tender." },
        { stepNumber: 6, description: "Serve the maftoul topped with chicken, chickpeas, and broth." }
      ],
      notes: [
        "FODMAP Information: High-FODMAP ingredients include Maftoul (fructans - wheat), chickpeas (GOS), onion (fructans), chicken broth (check for onion/garlic), and potentially the spice mix (check for onion/garlic powder). Low-FODMAP ingredients are chicken, olive oil, salt, and pepper.",
        "Low-FODMAP Recommendations: Replace Maftoul with a gluten-free grain like quinoa or large-grain rice. Omit onion or use garlic-infused oil and green parts of spring onions/leeks. Use certified low-FODMAP chicken broth. Limit canned, rinsed chickpeas to 1/4 cup per serve. Ensure the spice mix is free from onion and garlic powder.",
        "Vitamins & Minerals: Maftoul (wheat) provides carbohydrates and some B vitamins. Chicken is a good source of protein and niacin. Chickpeas offer protein, fiber, folate, and iron. Onions provide Vitamin C. Olive oil supplies healthy fats and Vitamin E. Spices contribute antioxidants."
      ],
      nutritionFacts: {
        protein: 28,
        carbs: 45,
        fat: 18,
        fiber: 6,
        sugar: 3,
        sodium: 580
      }
    },
    {
      title: 'Beef Wellington',
      description: 'A luxurious and elegant dish of tender beef fillet coated with mushroom duxelles, wrapped in puff pastry, and baked to perfection. Perfect for special occasions.',
      cookingTime: 45,
      servings: 4,
      difficulty: 'HARD',
      cuisineType: 'Europe',
      regionOfOrigin: 'England',
      imageUrl: '/images/recipes/beef_wellington.jpg',
      calories: 850,
      type: 'MAIN',
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: false,
      isPescatarian: false,
      isLactoseFree: false,
      isNutFree: true,
      isFermented: true,
      isLowFodmap: false,
      ingredients: [
        { name: 'Beef fillet', amount: 500, unit: 'g', notes: 'center-cut' },
        { name: 'Mushrooms', amount: 300, unit: 'g', notes: 'finely chopped' },
        { name: 'Puff pastry', amount: 1, unit: 'sheet', notes: 'store-bought or homemade' },
        { name: 'Prosciutto', amount: 6, unit: 'slices' },
        { name: 'Dijon mustard', amount: 2, unit: 'tbsp' },
        { name: 'Egg', amount: 1, unit: 'piece', notes: 'beaten, for egg wash' },
        { name: 'Salt', amount: 1, unit: 'tsp', notes: 'to taste' },
        { name: 'Black pepper', amount: 0.5, unit: 'tsp', notes: 'to taste' },
        { name: 'Olive oil', amount: 2, unit: 'tbsp' }
      ],
      instructions: [
        { stepNumber: 1, description: 'Preheat the oven to 200°C (400°F).' },
        { stepNumber: 2, description: 'Season the beef fillet with salt and pepper. Heat olive oil in a pan and sear the beef on all sides until browned. Remove and let it cool. Brush with Dijon mustard.' },
        { stepNumber: 3, description: 'In the same pan, sauté the mushrooms until all moisture evaporates. Season with salt and pepper.' },
        { stepNumber: 4, description: 'Lay out a sheet of plastic wrap. Arrange the prosciutto slices in a rectangle, slightly overlapping. Spread the mushroom mixture over the prosciutto.' },
        { stepNumber: 5, description: 'Place the beef fillet in the center and wrap the prosciutto and mushrooms around it using the plastic wrap. Chill for 15 minutes.' },
        { stepNumber: 6, description: 'Roll out the puff pastry. Unwrap the beef and place it in the center of the pastry. Wrap the pastry around the beef, sealing the edges with egg wash.' },
        { stepNumber: 7, description: 'Brush the pastry with egg wash and score the top lightly with a knife. Bake for 25-30 minutes until golden brown.' },
        { stepNumber: 8, description: 'Let it rest for 10 minutes before slicing. Serve with roasted vegetables or a red wine sauce.' }
      ],
      notes: [
        "Use a meat thermometer to ensure the beef is cooked to your preference (50°C for rare, 60°C for medium).",
        "For a vegetarian version, replace the beef with a portobello mushroom or a block of firm tofu.",
        "Fermented Ingredients: Puff pastry often uses butter which may be cultured. Prosciutto is cured, a process potentially involving fermentation. Dijon mustard production involves fermentation (vinegar, mustard seeds).",
        "FODMAP Information: High-FODMAP ingredients include mushrooms (polyols), puff pastry (fructans - wheat), and potentially Dijon mustard and prosciutto (check labels for onion/garlic/additives). Duxelles often contain shallots or garlic (fructans). Low-FODMAP ingredients include beef fillet, egg, salt, pepper, and olive oil.",
        "Low-FODMAP Recommendations: Use gluten-free puff pastry. Replace mushrooms with finely chopped low-FODMAP oyster mushrooms (up to 1 cup) or a low-FODMAP vegetable like finely chopped carrots or parsnips. Ensure duxelles are made without onion, shallots or garlic (use garlic-infused oil or green parts of leeks/spring onions). Check prosciutto and Dijon mustard labels for high-FODMAP ingredients.",
        "Vitamins & Minerals: Beef fillet is rich in protein, iron, zinc, and Vitamin B12. Mushrooms provide B vitamins and selenium. Puff pastry contributes carbohydrates and fat. Prosciutto offers protein and sodium. Eggs provide protein and choline. Olive oil adds healthy fats."
      ],
      nutritionFacts: {
        protein: 45,
        carbs: 30,
        fat: 50,
        fiber: 3,
        sugar: 2,
        sodium: 900
      }
    },
    {
      title: 'Toad in the Hole',
      description: 'A comforting and rustic dish of sausages baked in a fluffy Yorkshire pudding batter. Perfect for a cozy family dinner.',
      cookingTime: 40,
      servings: 4,
      difficulty: 'MEDIUM',
      cuisineType: 'Europe',
      regionOfOrigin: 'England',
      imageUrl: '/images/recipes/toad-in-the-hole-58.jpg',
      calories: 600,
      type: 'MAIN',
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: false,
      isPescatarian: false,
      isLactoseFree: false,
      isNutFree: true,
      isFermented: true,
      isLowFodmap: false,
      ingredients: [
        { name: 'Sausages', amount: 8, unit: 'pieces', notes: 'pork or Cumberland' },
        { name: 'Flour', amount: 150, unit: 'g' },
        { name: 'Eggs', amount: 3, unit: 'pieces' },
        { name: 'Milk', amount: 300, unit: 'ml' },
        { name: 'Vegetable oil', amount: 2, unit: 'tbsp' },
        { name: 'Salt', amount: 1, unit: 'tsp', notes: 'to taste' },
        { name: 'Black pepper', amount: 0.5, unit: 'tsp', notes: 'to taste' }
      ],
      instructions: [
        { stepNumber: 1, description: 'Preheat the oven to 220°C (425°F). Add the oil to a baking dish and place it in the oven to heat.' },
        { stepNumber: 2, description: 'In a mixing bowl, whisk together the flour, eggs, milk, salt, and pepper until smooth. Let the batter rest for 10 minutes.' },
        { stepNumber: 3, description: 'Add the sausages to the hot baking dish and roast for 10 minutes until browned.' },
        { stepNumber: 4, description: 'Pour the batter over the sausages and bake for 25-30 minutes until the pudding is risen and golden.' },
        { stepNumber: 5, description: 'Serve hot with onion gravy and mashed potatoes.' }
      ],
      notes: [
        "For a vegetarian version, use vegetarian sausages.",
        "Ensure the oil is very hot before adding the batter to achieve a crispy rise.",
        "Fermented Ingredients: Some sausage production methods or casings might involve fermentation.",
        "FODMAP Information: High-FODMAP ingredients include sausages (often contain wheat, onion, garlic - check label), regular flour (fructans), and milk (lactose). Low-FODMAP ingredients are eggs, vegetable oil, salt, and pepper.",
        "Low-FODMAP Recommendations: Use certified low-FODMAP sausages (gluten-free, no onion/garlic). Use a gluten-free all-purpose flour blend for the batter. Use lactose-free milk.",
        "Vitamins & Minerals: Sausages provide protein and fat, along with B vitamins and minerals like zinc depending on the type. Flour (if fortified) contributes B vitamins. Eggs are rich in protein, choline, and Vitamin D. Milk provides calcium and Vitamin D."
      ],
      nutritionFacts: {
        protein: 25,
        carbs: 40,
        fat: 30,
        fiber: 2,
        sugar: 3,
        sodium: 800
      }
    },
    {
      title: 'Yorkshire Pudding',
      description: 'A classic British side dish of light and crispy batter puddings that rise to golden perfection. Essential for Sunday roasts and a must-have accompaniment to roast beef.',
      cookingTime: 30,
      servings: 6,
      difficulty: 'MEDIUM',
      cuisineType: 'Europe',
      regionOfOrigin: 'England',
      imageUrl: '/images/recipes/yorkshire_pudding.jpg',
      calories: 180,
      type: 'SIDE',
      isVegetarian: true,
      isVegan: false,
      isGlutenFree: false,
      isPescatarian: false,
      isLactoseFree: false,
      isNutFree: true,
      isFermented: false,
      isLowFodmap: false,
      ingredients: [
        { name: 'Plain flour', amount: 140, unit: 'g' },
        { name: 'Eggs', amount: 4, unit: 'large' },
        { name: 'Milk', amount: 200, unit: 'ml' },
        { name: 'Water', amount: 200, unit: 'ml' },
        { name: 'Vegetable oil', amount: 4, unit: 'tbsp', notes: 'for the tin' },
        { name: 'Salt', amount: 0.5, unit: 'tsp' }
      ],
      instructions: [
        { stepNumber: 1, description: 'Put the flour and salt in a bowl. Make a well in the center and add the eggs. Gradually whisk in the milk and water until you have a smooth batter.' },
        { stepNumber: 2, description: 'Cover and leave to rest in the fridge for at least 30 minutes, or ideally overnight.' },
        { stepNumber: 3, description: 'Preheat oven to 230°C (450°F). Add 1/2 tablespoon of oil to each hole of a 12-hole Yorkshire pudding tin.' },
        { stepNumber: 4, description: 'Place the tin in the oven for 10 minutes until the oil is smoking hot.' },
        { stepNumber: 5, description: 'Give the batter a quick whisk, then carefully pour into the hot tins, filling each about halfway.' },
        { stepNumber: 6, description: 'Bake for 20-25 minutes until well risen, golden brown and crispy. Do not open the oven door during cooking.' }
      ],
      notes: [
        "The key to perfect Yorkshires is getting the oil smoking hot before adding the batter.",
        "The batter can be made up to 24 hours in advance.",
        "For best results, ensure all ingredients are at room temperature before mixing.",
        "FODMAP Information: High-FODMAP ingredients are plain flour (fructans) and milk (lactose). Low-FODMAP ingredients include eggs, water, vegetable oil, and salt.",
        "Low-FODMAP Recommendations: Use a suitable gluten-free all-purpose flour blend. Use lactose-free milk.",
        "Vitamins & Minerals: Flour provides carbohydrates and B vitamins (if fortified). Eggs are a source of protein, Vitamin D, B12, and choline. Milk contributes calcium and Vitamin D. Vegetable oil adds fat."
      ],
      nutritionFacts: {
        protein: 6,
        carbs: 20,
        fat: 8,
        fiber: 1,
        sugar: 2,
        sodium: 200
      }
    },
    {
      title: 'Bangers and Mash',
      description: 'Classic British comfort food featuring succulent pork sausages served on a bed of creamy mashed potatoes, topped with rich onion gravy.',
      cookingTime: 45,
      servings: 4,
      difficulty: 'EASY',
      cuisineType: 'Europe',
      regionOfOrigin: 'England',
      imageUrl: '/images/recipes/bangers_and_mash.jpg',
      calories: 650,
      type: 'MAIN',
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: false,
      isPescatarian: false,
      isLactoseFree: false,
      isNutFree: true,
      isFermented: true,
      isLowFodmap: false,
      ingredients: [
        { name: 'Pork sausages', amount: 8, unit: 'pieces', notes: 'good quality' },
        { name: 'Potatoes', amount: 1, unit: 'kg', notes: 'Maris Piper or Yukon Gold' },
        { name: 'Butter', amount: 100, unit: 'g' },
        { name: 'Milk', amount: 100, unit: 'ml', notes: 'warm' },
        { name: 'Onions', amount: 2, unit: 'large', notes: 'thinly sliced' },
        { name: 'Beef stock', amount: 500, unit: 'ml' },
        { name: 'Plain flour', amount: 2, unit: 'tbsp' },
        { name: 'Vegetable oil', amount: 2, unit: 'tbsp' },
        { name: 'Salt', amount: 1, unit: 'tsp' },
        { name: 'Black pepper', amount: 0.5, unit: 'tsp' }
      ],
      instructions: [
        { stepNumber: 1, description: 'Peel and quarter potatoes. Place in cold salted water and bring to a boil. Cook for 15-20 minutes until tender.' },
        { stepNumber: 2, description: 'Meanwhile, heat oil in a large frying pan. Add sausages and cook over medium heat for 15-20 minutes, turning occasionally, until golden and cooked through.' },
        { stepNumber: 3, description: 'In another pan, slowly cook sliced onions in oil for 15-20 minutes until caramelized.' },
        { stepNumber: 4, description: 'Add flour to the onions and cook for 1 minute. Gradually stir in beef stock and simmer until thickened.' },
        { stepNumber: 5, description: 'Drain potatoes and return to pan. Add butter and warm milk. Mash until smooth and creamy. Season with salt and pepper.' },
        { stepNumber: 6, description: 'Serve sausages on a bed of mash, topped with onion gravy.' }
      ],
      notes: [
        "Use good quality sausages for the best flavor.",
        "For extra creamy mash, pass the potatoes through a ricer.",
        "The gravy can be made ahead and reheated.",
        "Fermented Ingredients: Sausages might involve fermentation in processing. Butter may be cultured. Beef stock might contain fermented flavour enhancers.",
        "FODMAP Information: High-FODMAP ingredients include sausages (check for wheat, onion, garlic), onions (fructans), beef stock (check for onion/garlic), plain flour (fructans - gravy), and milk (lactose). Low-FODMAP ingredients are potatoes, butter (small amounts), vegetable oil, salt, and pepper.",
        "Low-FODMAP Recommendations: Use certified low-FODMAP sausages. For the mash, use lactose-free milk. For the gravy, omit onions or use only the green parts of spring onions/leeks cooked in garlic-infused oil. Use gluten-free flour or cornstarch as a thickener and certified low-FODMAP beef stock.",
        "Vitamins & Minerals: Sausages provide protein and B vitamins. Potatoes are rich in potassium and Vitamin C. Butter and milk contribute calcium and fat-soluble vitamins (A, D). Onions offer Vitamin C. Beef stock can add minerals."
      ],
      nutritionFacts: {
        protein: 25,
        carbs: 45,
        fat: 38,
        fiber: 4,
        sugar: 6,
        sodium: 900
      }
    },
    {
      title: 'Cottage Pie',
      description: 'A hearty British classic of seasoned ground beef in rich gravy, topped with creamy mashed potatoes and baked until golden brown.',
      cookingTime: 75,
      servings: 6,
      difficulty: 'MEDIUM',
      cuisineType: 'Europe',
      regionOfOrigin: 'England',
      imageUrl: '/images/recipes/cottage_pie.jpg',
      calories: 550,
      type: 'MAIN',
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: true,
      isPescatarian: false,
      isLactoseFree: false,
      isNutFree: true,
      isFermented: true,
      isLowFodmap: false,
      ingredients: [
        { name: 'Ground beef', amount: 1, unit: 'kg', notes: 'lean' },
        { name: 'Onions', amount: 2, unit: 'large', notes: 'finely chopped' },
        { name: 'Carrots', amount: 3, unit: 'medium', notes: 'diced' },
        { name: 'Celery', amount: 2, unit: 'stalks', notes: 'finely chopped' },
        { name: 'Potatoes', amount: 1.5, unit: 'kg', notes: 'peeled and quartered' },
        { name: 'Beef stock', amount: 500, unit: 'ml' },
        { name: 'Tomato paste', amount: 2, unit: 'tbsp' },
        { name: 'Worcestershire sauce', amount: 2, unit: 'tbsp' },
        { name: 'Butter', amount: 100, unit: 'g' },
        { name: 'Milk', amount: 100, unit: 'ml' },
        { name: 'Frozen peas', amount: 150, unit: 'g' }
      ],
      instructions: [
        { stepNumber: 1, description: 'Heat oil in a large pan and cook onions, carrots, and celery until softened (about 10 minutes).' },
        { stepNumber: 2, description: 'Add ground beef and cook until browned, breaking up any lumps.' },
        { stepNumber: 3, description: 'Stir in tomato paste, Worcestershire sauce, and beef stock. Simmer for 30 minutes until thickened.' },
        { stepNumber: 4, description: 'Meanwhile, boil potatoes until tender. Drain and mash with butter and milk until smooth.' },
        { stepNumber: 5, description: 'Add frozen peas to the meat mixture and transfer to a baking dish.' },
        { stepNumber: 6, description: 'Top with mashed potatoes, creating peaks with a fork for crispy bits.' },
        { stepNumber: 7, description: 'Bake at 200°C (400°F) for 25-30 minutes until golden brown and bubbling.' }
      ],
      notes: [
        "Can be assembled ahead and refrigerated before baking.",
        "For extra richness, add grated cheese to the potato topping.",
        "Leftovers can be frozen for up to 3 months.",
        "Fermented Ingredients: Worcestershire sauce contains fermented components (anchovies, vinegar). Butter may be cultured. Beef stock might have fermented elements.",
        "FODMAP Information: High-FODMAP ingredients include onions (fructans), celery (polyols - moderate), beef stock (check for onion/garlic), Worcestershire sauce (check for onion/garlic), milk (lactose), and peas (GOS). Low-FODMAP ingredients are ground beef, carrots (limit portion), potatoes, tomato paste (limit portion), and butter (small amounts).",
        "Low-FODMAP Recommendations: Replace onions with green parts of leeks/spring onions or use garlic-infused oil. Limit celery to less than 1 small stalk (5cm). Use certified low-FODMAP beef stock. Use lactose-free milk for the mash. Limit peas to 1 tablespoon per serve or omit. Check Worcestershire sauce label or use a low-FODMAP alternative.",
        "Vitamins & Minerals: Ground beef provides protein, iron, zinc, and B12. Potatoes offer potassium and Vitamin C. Carrots supply Vitamin A. Celery contains Vitamin K. Milk and butter add calcium and Vitamin D (if fortified). Peas provide fiber and Vitamin K. Tomato paste contributes lycopene."
      ],
      nutritionFacts: {
        protein: 35,
        carbs: 40,
        fat: 25,
        fiber: 6,
        sugar: 8,
        sodium: 650
      }
    },
    {
      title: 'Sunday Roast',
      description: 'The ultimate British weekend feast featuring perfectly roasted beef, crispy roast potatoes, Yorkshire puddings, seasonal vegetables, and rich gravy.',
      cookingTime: 120,
      servings: 6,
      difficulty: 'HARD',
      cuisineType: 'Europe',
      regionOfOrigin: 'England',
      imageUrl: '/images/recipes/sunday-roast-62.jpg',
      calories: 850,
      type: 'MAIN',
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: false,
      isPescatarian: false,
      isLactoseFree: false,
      isNutFree: true,
      isFermented: true,
      isLowFodmap: false,
      ingredients: [
        { name: 'Beef roasting joint', amount: 2, unit: 'kg', notes: 'topside or sirloin' },
        { name: 'Potatoes', amount: 1.5, unit: 'kg', notes: 'peeled and quartered' },
        { name: 'Carrots', amount: 500, unit: 'g', notes: 'peeled and chunked' },
        { name: 'Parsnips', amount: 500, unit: 'g', notes: 'peeled and quartered' },
        { name: 'Brussels sprouts', amount: 500, unit: 'g', notes: 'trimmed' },
        { name: 'Beef stock', amount: 1, unit: 'liter' },
        { name: 'Goose fat', amount: 4, unit: 'tbsp', notes: 'for roasting' },
        { name: 'Garlic', amount: 1, unit: 'whole bulb' },
        { name: 'Fresh rosemary', amount: 4, unit: 'sprigs' },
        { name: 'Fresh thyme', amount: 4, unit: 'sprigs' },
        { name: 'Plain flour', amount: 2, unit: 'tbsp', notes: 'for gravy' }
      ],
      instructions: [
        { stepNumber: 1, description: 'Remove beef from fridge 2 hours before cooking. Preheat oven to 240°C (465°F).' },
        { stepNumber: 2, description: 'Rub beef with oil, season generously. Place in roasting tin with herbs and garlic.' },
        { stepNumber: 3, description: 'Sear in hot oven for 20 minutes, then reduce to 180°C (350°F). Cook for 1 hour 15 minutes for medium-rare.' },
        { stepNumber: 4, description: 'Par-boil potatoes for 10 minutes. Shake in colander to roughen edges. Heat goose fat in roasting tin until smoking.' },
        { stepNumber: 5, description: 'Add potatoes to hot fat, coat well. Roast for 1 hour, turning occasionally until golden and crispy.' },
        { stepNumber: 6, description: 'Roast carrots and parsnips for 45 minutes. Steam sprouts for 8-10 minutes before serving.' },
        { stepNumber: 7, description: 'Rest beef for 30 minutes. Meanwhile, make gravy using meat juices, flour, and stock.' },
        { stepNumber: 8, description: 'Serve beef with vegetables, Yorkshire puddings, and gravy.' }
      ],
      notes: [
        "The key to perfect roast potatoes is par-boiling and rough edges for maximum crispiness.",
        "Let the meat rest properly for juicier results.",
        "Make Yorkshire puddings while the meat is resting.",
        "Fermented Ingredients: Beef stock might contain fermented flavour enhancers.",
        "FODMAP Information: High-FODMAP ingredients include Brussels sprouts (fructans), garlic (fructans), plain flour (fructans - gravy), and beef stock (check for onion/garlic). Parsnips can be high in polyols for some people. Low-FODMAP ingredients are beef, potatoes, carrots (limit portion), goose fat, rosemary, and thyme.",
        "Low-FODMAP Recommendations: Replace Brussels sprouts with low-FODMAP green beans or roasted bell peppers (limit portion). Use garlic-infused oil instead of garlic cloves for flavouring the meat/fat. Use certified low-FODMAP beef stock. Thicken gravy with cornstarch instead of flour. Limit parsnip and carrot portions. Serve with low-FODMAP Yorkshire puddings (see adapted recipe).",
        "Vitamins & Minerals: Beef is rich in protein, iron, zinc, and B12. Potatoes provide potassium and Vitamin C. Carrots offer Vitamin A. Parsnips contribute folate and fiber. Brussels sprouts are high in Vitamin C and K. Goose fat is primarily fat. Herbs provide antioxidants."
      ],
      nutritionFacts: {
        protein: 45,
        carbs: 65,
        fat: 40,
        fiber: 8,
        sugar: 10,
        sodium: 750
      }
    },
    {
      title: 'Steak and Kidney Pie',
      description: 'A rich and hearty British pie filled with tender chunks of beef, kidney, and mushrooms in a rich gravy, all encased in golden, flaky pastry.',
      cookingTime: 150,
      servings: 6,
      difficulty: 'HARD',
      cuisineType: 'Europe',
      regionOfOrigin: 'England',
      imageUrl: '/images/recipes/steak_and_kidney_pie.jpg',
      calories: 650,
      type: 'MAIN',
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: false,
      isPescatarian: false,
      isLactoseFree: false,
      isNutFree: true,
      isFermented: true,
      isLowFodmap: false,
      ingredients: [
        { name: 'Beef chuck', amount: 700, unit: 'g', notes: 'cut into 2.5cm chunks' },
        { name: 'Beef kidney', amount: 300, unit: 'g', notes: 'trimmed and diced' },
        { name: 'Mushrooms', amount: 200, unit: 'g', notes: 'quartered' },
        { name: 'Onions', amount: 2, unit: 'large', notes: 'diced' },
        { name: 'Plain flour', amount: 3, unit: 'tbsp', notes: 'for dusting' },
        { name: 'Beef stock', amount: 500, unit: 'ml' },
        { name: 'Worcestershire sauce', amount: 2, unit: 'tbsp' },
        { name: 'Shortcrust pastry', amount: 500, unit: 'g' },
        { name: 'Egg', amount: 1, unit: 'large', notes: 'beaten for glazing' },
        { name: 'Thyme', amount: 4, unit: 'sprigs', notes: 'fresh' },
        { name: 'Bay leaves', amount: 2, unit: 'pieces' }
      ],
      instructions: [
        { stepNumber: 1, description: 'Toss beef and kidney in seasoned flour. Brown meat in batches in hot oil. Set aside.' },
        { stepNumber: 2, description: 'In the same pan, cook onions until softened. Add mushrooms and cook until golden.' },
        { stepNumber: 3, description: 'Return meat to pan. Add stock, Worcestershire sauce, thyme, and bay leaves. Simmer for 2 hours until meat is tender.' },
        { stepNumber: 4, description: 'Let filling cool completely. Remove bay leaves and thyme stems.' },
        { stepNumber: 5, description: 'Preheat oven to 200°C (400°F). Line a pie dish with pastry, leaving overhang.' },
        { stepNumber: 6, description: 'Fill with meat mixture. Cover with pastry lid, crimp edges to seal. Cut steam vents.' },
        { stepNumber: 7, description: 'Brush with beaten egg and bake for 45 minutes until golden brown.' }
      ],
      notes: [
        "Can be made with just steak if kidney is not to your taste.",
        "The filling can be made a day ahead.",
        "Ensure the filling is completely cool before adding pastry to prevent a soggy bottom.",
        "Fermented Ingredients: Beef stock might contain fermented elements. Worcestershire sauce includes fermented ingredients. Shortcrust pastry often uses butter, which may be cultured.",
        "FODMAP Information: High-FODMAP ingredients include mushrooms (polyols), onions (fructans), plain flour (fructans), beef stock (check for onion/garlic), Worcestershire sauce (check for onion/garlic), and shortcrust pastry (fructans - wheat). Kidney may be high FODMAP for some individuals. Low-FODMAP ingredients are beef chuck, egg, thyme, bay leaves, and oil.",
        "Low-FODMAP Recommendations: Use gluten-free shortcrust pastry. Replace mushrooms with low-FODMAP oyster mushrooms (up to 1 cup) or omit. Replace onions with green parts of leeks/spring onions or use garlic-infused oil. Use gluten-free flour for dusting/thickening. Use certified low-FODMAP beef stock. Check Worcestershire sauce or use a low-FODMAP alternative. Consider omitting kidney.",
        "Vitamins & Minerals: Beef chuck and kidney are excellent sources of protein, iron, zinc, selenium, and B vitamins (especially B12). Mushrooms offer B vitamins. Onions provide Vitamin C. Pastry contributes carbohydrates and fat. Eggs add protein."
      ],
      nutritionFacts: {
        protein: 35,
        carbs: 45,
        fat: 35,
        fiber: 3,
        sugar: 4,
        sodium: 800
      }
    },
    {
      title: 'Tortilla Española',
      description: 'A classic Spanish omelette made with potatoes and onions slowly cooked in olive oil until tender, then combined with beaten eggs and cooked to golden perfection. This versatile dish can be served hot or cold, as a tapa, main course, or sandwich filling.',
      cookingTime: 45,
      servings: 6,
      difficulty: 'MEDIUM',
      cuisineType: 'Europe',
      regionOfOrigin: 'Spain',
      imageUrl: '/images/recipes/tortilla-espa-ola-64.jpg',
      calories: 320,
      type: 'MAIN',
      isVegetarian: true,
      isVegan: false,
      isGlutenFree: true,
      isPescatarian: false,
      isLactoseFree: true,
      isNutFree: true,
      isFermented: false,
      isLowFodmap: false,
      ingredients: [
        { name: 'Potatoes', amount: 500, unit: 'g', notes: 'peeled and thinly sliced' },
        { name: 'Onions', amount: 2, unit: 'medium', notes: 'thinly sliced' },
        { name: 'Eggs', amount: 6, unit: 'large' },
        { name: 'Olive Oil', amount: 250, unit: 'ml', notes: 'extra virgin' },
        { name: 'Salt', amount: 1, unit: 'teaspoon', notes: 'to taste' },
        { name: 'Black Pepper', amount: 0.25, unit: 'teaspoon', notes: 'freshly ground' }
      ],
      instructions: [
        { stepNumber: 1, description: 'Heat olive oil in a large non-stick skillet over medium heat. Add sliced potatoes and onions, season with salt.' },
        { stepNumber: 2, description: 'Cook potatoes and onions slowly, stirring occasionally, until potatoes are tender but not browned, about 20-25 minutes.' },
        { stepNumber: 3, description: 'Meanwhile, beat eggs in a large bowl with salt and pepper.' },
        { stepNumber: 4, description: 'Drain the potato-onion mixture, reserving the oil. Let cool slightly, then add to the beaten eggs and gently mix.' },
        { stepNumber: 5, description: 'Heat 2 tablespoons of the reserved oil in the skillet over medium heat. Pour in the egg mixture and cook until edges start to set.' },
        { stepNumber: 6, description: 'Place a large plate over the skillet and carefully flip the tortilla. Slide it back into the pan to cook the other side.' },
        { stepNumber: 7, description: 'Cook for another 3-4 minutes until golden but still slightly creamy in the center.' },
        { stepNumber: 8, description: 'Let rest for 5 minutes before serving. Can be served hot, room temperature, or cold.' }
      ],
      notes: [
        "The key to a perfect tortilla is cooking the potatoes and onions slowly in plenty of oil.",
        "The center should be slightly creamy when done - don't overcook.",
        "Save the oil used for cooking the potatoes - it's great for other dishes.",
        "A non-stick pan makes flipping much easier.",
        "Some regions of Spain add other ingredients like peppers or chorizo.",
        "FODMAP Information: The main High-FODMAP ingredient is onions (fructans). Low-FODMAP ingredients are potatoes, eggs, olive oil, salt, and pepper.",
        "Low-FODMAP Recommendations: Omit the onions completely. Alternatively, use finely chopped green parts of spring onions or chives, adding them to the egg mixture or towards the end of cooking the potatoes.",
        "Vitamins & Minerals: Potatoes are a good source of potassium, Vitamin C, and Vitamin B6. Eggs provide high-quality protein, choline, selenium, and Vitamins D and B12. Olive oil contributes healthy monounsaturated fats and Vitamin E. Onions offer Vitamin C and antioxidants."
      ],
      nutritionFacts: {
        protein: 12,
        carbs: 28,
        fat: 18,
        fiber: 3,
        sugar: 2,
        sodium: 450
      }
    },
    {
      title: 'Cocido Madrileño',
      description: 'A hearty traditional Madrid stew that combines chickpeas, various meats, and vegetables, typically served in multiple courses. This warming dish is a cornerstone of Madrid\'s cuisine, especially popular during winter months.',
      cookingTime: 180,
      servings: 6,
      difficulty: 'HARD',
      cuisineType: 'Europe',
      regionOfOrigin: 'Spain',
      imageUrl: '/images/recipes/cocido_madrile.jpg',
      calories: 750,
      type: 'MAIN',
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: true,
      isPescatarian: false,
      isLactoseFree: true,
      isNutFree: true,
      isFermented: true,
      isLowFodmap: false,
      ingredients: [
        { name: 'Chickpeas', amount: 500, unit: 'g', notes: 'dried, soaked overnight' },
        { name: 'Beef Shank', amount: 300, unit: 'g' },
        { name: 'Pork Belly', amount: 200, unit: 'g' },
        { name: 'Chorizo', amount: 2, unit: 'pieces' },
        { name: 'Morcilla', amount: 1, unit: 'piece', notes: 'Spanish blood sausage' },
        { name: 'Chicken', amount: 2, unit: 'pieces', notes: 'legs or thighs' },
        { name: 'Carrots', amount: 3, unit: 'large' },
        { name: 'Potatoes', amount: 4, unit: 'medium', notes: 'peeled and quartered' },
        { name: 'Cabbage', amount: 1, unit: 'small', notes: 'cut into wedges' },
        { name: 'Leeks', amount: 2, unit: 'pieces', notes: 'white parts only' },
        { name: 'Onion', amount: 1, unit: 'large' },
        { name: 'Garlic', amount: 4, unit: 'cloves' },
        { name: 'Bay Leaves', amount: 2, unit: 'pieces' },
        { name: 'Black Peppercorns', amount: 1, unit: 'tablespoon' },
        { name: 'Saffron', amount: 1, unit: 'pinch' },
        { name: 'Salt', amount: 1, unit: 'tablespoon', notes: 'to taste' }
      ],
      instructions: [
        { stepNumber: 1, description: 'Soak chickpeas overnight in cold water with a pinch of salt.' },
        { stepNumber: 2, description: 'In a large pot, bring water to boil. Add chickpeas, beef, pork belly, whole onion studded with garlic cloves, and bay leaves.' },
        { stepNumber: 3, description: 'Simmer for about 1 hour, skimming any foam that rises to the surface.' },
        { stepNumber: 4, description: 'Add carrots, leeks, and saffron. Continue cooking for 30 minutes.' },
        { stepNumber: 5, description: 'Add potatoes, chorizo, and chicken. Cook for another 30 minutes.' },
        { stepNumber: 6, description: 'Add cabbage and morcilla in the last 15 minutes of cooking.' },
        { stepNumber: 7, description: 'Traditional serving: First course - strain the broth and serve with fine noodles.' },
        { stepNumber: 8, description: 'Second course - serve the chickpeas and vegetables.' },
        { stepNumber: 9, description: 'Third course - serve the meats, sliced appropriately.' }
      ],
      notes: [
        "Traditionally served in three courses: soup, vegetables, and meats.",
        "Quality of chickpeas is crucial - use Spanish chickpeas if possible.",
        "Can be made a day ahead - flavors improve overnight.",
        "Save the cooking broth - it's excellent for other dishes.",
        "Some regions add different vegetables or meats to their version.",
        "Fermented Ingredients: Chorizo and Morcilla are cured sausages, a process involving fermentation.",
        "FODMAP Information: High-FODMAP ingredients include chickpeas (GOS), the white part of leeks (fructans), onion (fructans), and garlic (fructans). Chorizo and Morcilla often contain garlic/onion and should be checked. Cabbage contains fructans/polyols depending on type (limit portion). Low-FODMAP ingredients: beef shank, pork belly, chicken, carrots (limit portion), potatoes, green parts of leeks, bay leaves, peppercorns, saffron, salt.",
        "Low-FODMAP Recommendations: Limit canned, rinsed chickpeas to 1/4 cup per serve (traditional large quantity is problematic). Use only the green parts of the leeks. Omit onion and garlic. Check chorizo/morcilla labels carefully or use low-FODMAP alternatives if available. Limit cabbage serving size (e.g., 1/2 cup Savoy).",
        "Vitamins & Minerals: Provides protein, iron, zinc, and B12 (beef, pork, chicken, chorizo, morcilla). Chickpeas offer fiber, protein, and folate. Vegetables (carrots, potatoes, cabbage, leeks) contribute various vitamins (C, K, A) and potassium. Saffron adds antioxidants."
      ],
      nutritionFacts: {
        protein: 45,
        carbs: 65,
        fat: 38,
        fiber: 12,
        sugar: 6,
        sodium: 980
      }
    },
    {
      title: 'Fabada Asturiana',
      description: 'A rich and hearty bean stew from Asturias, made with large white beans, various cuts of pork, and Spanish chorizo. This warming dish is perfect for cold weather and is considered one of Spain\'s most iconic comfort foods.',
      cookingTime: 180,
      servings: 6,
      difficulty: 'MEDIUM',
      cuisineType: 'Europe',
      regionOfOrigin: 'Spain',
      imageUrl: '/images/recipes/fabada-asturiana.jpg',
      calories: 680,
      type: 'MAIN',
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: true,
      isPescatarian: false,
      isLactoseFree: true,
      isNutFree: true,
      isFermented: true,
      isLowFodmap: false,
      ingredients: [
        { name: 'Fabes', amount: 500, unit: 'g', notes: 'dried large white beans, soaked overnight' },
        { name: 'Pork Belly', amount: 200, unit: 'g', notes: 'fresh, in one piece' },
        { name: 'Chorizo', amount: 2, unit: 'pieces', notes: 'Spanish-style' },
        { name: 'Morcilla', amount: 2, unit: 'pieces', notes: 'Spanish blood sausage' },
        { name: 'Ham Bone', amount: 1, unit: 'piece', notes: 'Serrano or similar' },
        { name: 'Onion', amount: 1, unit: 'large' },
        { name: 'Garlic', amount: 3, unit: 'cloves' },
        { name: 'Bay Leaves', amount: 2, unit: 'pieces' },
        { name: 'Sweet Paprika', amount: 1, unit: 'teaspoon' },
        { name: 'Saffron', amount: 1, unit: 'pinch', notes: 'optional' },
        { name: 'Salt', amount: 1, unit: 'teaspoon', notes: 'to taste' }
      ],
      instructions: [
        { stepNumber: 1, description: 'Soak the fabes beans overnight in cold water. Drain and rinse.' },
        { stepNumber: 2, description: 'In a large pot, cover beans with cold water. Bring to a boil, then drain and rinse again.' },
        { stepNumber: 3, description: 'Return beans to the pot with fresh water. Add whole onion studded with garlic cloves, bay leaves, and ham bone.' },
        { stepNumber: 4, description: 'Simmer very gently, never letting it boil vigorously, for about 1 hour.' },
        { stepNumber: 5, description: 'Add pork belly and chorizo. Continue cooking for another hour.' },
        { stepNumber: 6, description: 'Add morcilla and paprika in the last 30 minutes of cooking.' },
        { stepNumber: 7, description: 'The beans should be creamy inside but maintain their shape. Add salt to taste.' },
        { stepNumber: 8, description: 'Let rest for 10 minutes before serving. Remove bay leaves and onion.' }
      ],
      notes: [
        "The key to perfect fabada is gentle cooking - never let it boil hard.",
        "Authentic fabes beans from Asturias are ideal but other large white beans can work.",
        "The stew should be creamy but not too thick - add hot water if needed.",
        "Can be made a day ahead - the flavors improve overnight.",
        "Traditional accompaniment is Asturian cider.",
        "Fermented Ingredients: Chorizo and Morcilla are cured sausages involving fermentation.",
        "FODMAP Information: High-FODMAP ingredients include Fabes (large white beans - GOS), onion (fructans), and garlic (fructans). Chorizo and Morcilla often contain high-FODMAP garlic/onion. Low-FODMAP ingredients: pork belly, ham bone (check additives), bay leaves, paprika, saffron, salt.",
        "Low-FODMAP Recommendations: This dish is inherently high FODMAP due to the large quantity and type of beans (fabes). Replacing the beans fundamentally changes the dish. Omitting onion and garlic and carefully checking chorizo/morcilla labels is necessary, but the beans remain the primary issue for a low-FODMAP diet.",
        "Vitamins & Minerals: Fabes provide significant fiber, protein, folate, and iron. Pork belly, chorizo, morcilla, and ham contribute protein, fat, B vitamins, zinc, and iron. Paprika and saffron offer antioxidants."
      ],
      nutritionFacts: {
        protein: 35,
        carbs: 52,
        fat: 42,
        fiber: 15,
        sugar: 3,
        sodium: 890
      }
    },
    {
      title: 'Gazpacho',
      description: 'A refreshing cold soup from Andalusia made with ripe tomatoes, cucumbers, peppers, and other raw vegetables. Perfect for hot summer days, this no-cook dish is both healthy and revitalizing.',
      cookingTime: 20,
      servings: 6,
      difficulty: 'EASY',
      cuisineType: 'Europe',
      regionOfOrigin: 'Spain',
      imageUrl: '/images/recipes/gazpacho.jpg',
      calories: 120,
      type: 'MAIN',
      isVegetarian: true,
      isVegan: true,
      isGlutenFree: true,
      isPescatarian: false,
      isLactoseFree: true,
      isNutFree: true,
      isFermented: true,
      isLowFodmap: false,
      ingredients: [
        { name: 'Tomatoes', amount: 1, unit: 'kg', notes: 'ripe, cored and chopped' },
        { name: 'Cucumber', amount: 1, unit: 'medium', notes: 'peeled and chopped' },
        { name: 'Red Bell Pepper', amount: 1, unit: 'large', notes: 'seeded and chopped' },
        { name: 'Garlic', amount: 2, unit: 'cloves' },
        { name: 'Bread', amount: 100, unit: 'g', notes: 'day-old white bread, crusts removed' },
        { name: 'Olive Oil', amount: 100, unit: 'ml', notes: 'extra virgin' },
        { name: 'Sherry Vinegar', amount: 2, unit: 'tablespoons' },
        { name: 'Salt', amount: 1, unit: 'teaspoon', notes: 'to taste' },
        // For Garnish
        { name: 'Cucumber', amount: 0.5, unit: 'small', notes: 'finely diced' },
        { name: 'Tomato', amount: 1, unit: 'small', notes: 'finely diced' },
        { name: 'Green Bell Pepper', amount: 0.5, unit: 'small', notes: 'finely diced' },
        { name: 'Croutons', amount: 100, unit: 'g', notes: 'optional' }
      ],
      instructions: [
        { stepNumber: 1, description: 'Soak the bread in water for 10 minutes, then squeeze out excess water.' },
        { stepNumber: 2, description: 'In a blender, combine tomatoes, cucumber, red pepper, garlic, and soaked bread.' },
        { stepNumber: 3, description: 'Blend until smooth, then gradually add olive oil while blending to emulsify.' },
        { stepNumber: 4, description: 'Add sherry vinegar and salt to taste. Blend again until completely smooth.' },
        { stepNumber: 5, description: 'Pass through a fine-mesh strainer for extra smoothness (optional).' },
        { stepNumber: 6, description: 'Chill for at least 2 hours or overnight.' },
        { stepNumber: 7, description: 'Before serving, adjust seasoning and thin with cold water if needed.' },
        { stepNumber: 8, description: 'Serve in chilled bowls with diced vegetables and croutons on the side.' }
      ],
      notes: [
        "Use the ripest tomatoes you can find - they're the key to great gazpacho.",
        "Some regions add cumin or ground almonds for extra flavor.",
        "Can be stored in the refrigerator for up to 2 days.",
        "Serve very cold - some people even add ice cubes.",
        "The bread helps create a smoother texture but can be omitted for a lighter version.",
        "Fermented Ingredients: Bread is typically made with yeast fermentation. Sherry vinegar is produced through fermentation of sherry wine. Croutons (if used) are also fermented.",
        "FODMAP Information: High-FODMAP ingredients include garlic (fructans), bread (fructans), and croutons (fructans). Onion (fructans) is also sometimes added. Low/Moderate-FODMAP ingredients: tomatoes (limit 1/2 medium), cucumber, red bell pepper (limit 1/3 cup), olive oil, sherry vinegar, salt, green bell pepper (limit 1/2 cup).",
        "Low-FODMAP Recommendations: Omit garlic or use garlic-infused oil (add before chilling). Omit bread or use gluten-free bread. Serve without croutons or use gluten-free croutons. Stick to recommended low-FODMAP portion sizes for tomatoes and bell peppers to avoid FODMAP stacking. Ensure no onion is added.",
        "Vitamins & Minerals: Rich in Vitamin C (tomatoes, peppers), lycopene (tomatoes), Vitamin K (cucumber), and antioxidants. Olive oil provides healthy fats and Vitamin E. Vinegar adds acidity. Bread provides carbohydrates."
      ],
      nutritionFacts: {
        protein: 3,
        carbs: 15,
        fat: 8,
        fiber: 4,
        sugar: 6,
        sodium: 320
      }
    },
    {
      title: 'Pulpo a la Gallega',
      description: 'A classic Galician dish of tender octopus served on sliced potatoes, drizzled with olive oil and sprinkled with sweet paprika. This seemingly simple dish requires perfect timing to achieve the right texture.',
      cookingTime: 60,
      servings: 4,
      difficulty: 'MEDIUM',
      cuisineType: 'Europe',
      regionOfOrigin: 'Spain',
      imageUrl: '/images/recipes/pulpo-a-la-gallega-68.jpg',
      calories: 280,
      type: 'MAIN',
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: true,
      isPescatarian: true,
      isLactoseFree: true,
      isNutFree: true,
      isFermented: false,
      isLowFodmap: true,
      ingredients: [
        { name: 'Octopus', amount: 2, unit: 'kg', notes: 'cleaned' },
        { name: 'Potatoes', amount: 4, unit: 'large', notes: 'peeled' },
        { name: 'Olive Oil', amount: 100, unit: 'ml', notes: 'extra virgin' },
        { name: 'Sweet Paprika', amount: 2, unit: 'tablespoons' },
        { name: 'Coarse Sea Salt', amount: 2, unit: 'tablespoons' },
        { name: 'Bay Leaves', amount: 2, unit: 'pieces' }
      ],
      instructions: [
        { stepNumber: 1, description: 'Bring a large pot of water to boil. Dip the octopus into the water 3 times to help the tentacles curl.' },
        { stepNumber: 2, description: 'Add bay leaves and lower the octopus into the pot. Cook at a gentle simmer for about 40-50 minutes.' },
        { stepNumber: 3, description: 'Test for tenderness by piercing with a knife - it should be tender but not mushy.' },
        { stepNumber: 4, description: 'Meanwhile, cook the potatoes in salted water until tender. Slice into thick rounds.' },
        { stepNumber: 5, description: 'When the octopus is done, let it rest in its cooking water for 20 minutes.' },
        { stepNumber: 6, description: 'Cut the tentacles into diagonal slices.' },
        { stepNumber: 7, description: 'Arrange potato slices on plates, top with octopus slices.' },
        { stepNumber: 8, description: 'Drizzle generously with olive oil, sprinkle with paprika and coarse salt.' }
      ],
      notes: [
        "Traditionally, octopus is cooked in a copper pot, which some say helps tenderize it.",
        "The cooking time varies depending on the size of the octopus.",
        "Don't add salt while cooking the octopus - it can make it tough.",
        "Some cooks freeze and thaw the octopus before cooking to help tenderize it.",
        "In Galicia, this is typically served on wooden plates.",
        "FODMAP Information: All main ingredients (octopus, potatoes, olive oil, paprika, salt, bay leaves) are considered Low FODMAP.",
        "Low-FODMAP Recommendations: This dish is naturally low FODMAP. Ensure paprika is pure and does not contain added anti-caking agents or flavorings if very sensitive.",
        "Vitamins & Minerals: Octopus is an excellent source of protein, iron, selenium, copper, and Vitamin B12. Potatoes provide potassium, Vitamin C, and carbohydrates. Olive oil supplies monounsaturated fats and Vitamin E. Paprika contains antioxidants and Vitamin A."
      ],
      nutritionFacts: {
        protein: 28,
        carbs: 22,
        fat: 14,
        fiber: 2,
        sugar: 1,
        sodium: 580
      }
    },
    {
      title: 'Churros con Chocolate',
      description: 'Crispy, golden Spanish churros served with thick, rich hot chocolate for dipping. A beloved breakfast or afternoon snack throughout Spain, especially popular during winter months and festivals.',
      cookingTime: 45,
      servings: 6,
      difficulty: 'MEDIUM',
      cuisineType: 'Europe',
      regionOfOrigin: 'Spain',
      imageUrl: '/images/recipes/churros_con_chocolate.jpg',
      calories: 420,
      type: 'DESSERT',
      isVegetarian: true,
      isVegan: false,
      isGlutenFree: false,
      isPescatarian: false,
      isLactoseFree: false,
      isNutFree: true,
      isFermented: true,
      isLowFodmap: false,
      ingredients: [
        // For Churros
        { name: 'Water', amount: 250, unit: 'ml' },
        { name: 'Butter', amount: 50, unit: 'g' },
        { name: 'Salt', amount: 0.25, unit: 'teaspoon' },
        { name: 'Plain Flour', amount: 250, unit: 'g' },
        { name: 'Eggs', amount: 3, unit: 'large' },
        { name: 'Vegetable Oil', amount: 1, unit: 'liter', notes: 'for frying' },
        { name: 'Sugar', amount: 100, unit: 'g', notes: 'for coating' },
        { name: 'Ground Cinnamon', amount: 1, unit: 'tablespoon', notes: 'for coating' },
        // For Hot Chocolate
        { name: 'Dark Chocolate', amount: 200, unit: 'g', notes: '70% cocoa' },
        { name: 'Whole Milk', amount: 500, unit: 'ml' },
        { name: 'Sugar', amount: 2, unit: 'tablespoons', notes: 'for chocolate' },
        { name: 'Cornstarch', amount: 1, unit: 'tablespoon' }
      ],
      instructions: [
        { stepNumber: 1, description: 'For churros: Bring water, butter, and salt to a boil in a medium saucepan.' },
        { stepNumber: 2, description: 'Add flour all at once, stirring vigorously with a wooden spoon until mixture forms a smooth ball.' },
        { stepNumber: 3, description: 'Remove from heat and let cool for 5 minutes. Beat in eggs one at a time until fully incorporated.' },
        { stepNumber: 4, description: 'Transfer mixture to a piping bag fitted with a large star tip.' },
        { stepNumber: 5, description: 'Heat oil to 180°C (350°F). Pipe 15cm lengths of dough directly into hot oil, cutting with scissors.' },
        { stepNumber: 6, description: 'Fry until golden brown, about 2-3 minutes per side. Drain on paper towels.' },
        { stepNumber: 7, description: 'Mix sugar and cinnamon, roll hot churros in the mixture.' },
        { stepNumber: 8, description: 'For chocolate: Heat milk until almost boiling. Add chopped chocolate and sugar.' },
        { stepNumber: 9, description: 'Mix cornstarch with a little cold milk, add to the hot chocolate. Stir until thickened.' },
        { stepNumber: 10, description: 'Serve churros hot with thick hot chocolate for dipping.' }
      ],
      notes: [
        "The dough should be stiff enough to pipe and hold its shape.",
        "Oil temperature is crucial - too hot will brown outside but leave inside raw.",
        "Traditional Spanish hot chocolate is very thick, almost pudding-like.",
        "Churros are best served immediately while crispy.",
        "Some regions serve them plain without sugar coating.",
        "Fermented Ingredients: Butter may be cultured. Dark chocolate production involves the fermentation of cocoa beans.",
        "FODMAP Information: High-FODMAP ingredients include plain flour (fructans) in churros and whole milk (lactose) in the chocolate. Dark chocolate can be high FODMAP in larger portions. Low-FODMAP ingredients: water, butter (small amounts), salt, eggs, oil, sugar, cinnamon, cornstarch.",
        "Low-FODMAP Recommendations: Use a gluten-free flour blend suitable for choux pastry to make the churros. For the dipping chocolate, use lactose-free milk and limit dark chocolate (70-85% cocoa) to a low-FODMAP serving size (approx. 30g per person), ensuring no high-FODMAP additives.",
        "Vitamins & Minerals: Flour provides carbohydrates. Eggs offer protein and choline. Butter and oil contribute fat. Sugar provides energy. Cinnamon contains antioxidants. Dark chocolate is rich in antioxidants, iron, and magnesium. Milk supplies calcium and Vitamin D."
      ],
      nutritionFacts: {
        protein: 8,
        carbs: 52,
        fat: 24,
        fiber: 3,
        sugar: 28,
        sodium: 180
      }
    },
      {
        title: 'Pisto',
        description: 'A colorful Spanish ratatouille made with sautéed vegetables, typically including tomatoes, peppers, zucchini, and onions. This versatile vegetable stew can be served hot or cold, as a side dish or main course, often topped with a fried egg.',
        cookingTime: 45,
        servings: 4,
        difficulty: 'EASY',
        cuisineType: 'Europe',
        regionOfOrigin: 'Spain',
        imageUrl: '/images/recipes/pisto.jpg',
        calories: 180,
        type: 'MAIN',
        isVegetarian: true,
        isVegan: true,
        isGlutenFree: true,
        isPescatarian: false,
        isLactoseFree: true,
        isNutFree: true,
        isFermented: false,
        isLowFodmap: false,
        ingredients: [
          { name: 'Tomatoes', amount: 6, unit: 'large', notes: 'ripe, diced' },
          { name: 'Zucchini', amount: 2, unit: 'medium', notes: 'diced' },
          { name: 'Green Bell Pepper', amount: 1, unit: 'large', notes: 'diced' },
          { name: 'Red Bell Pepper', amount: 1, unit: 'large', notes: 'diced' },
          { name: 'Onion', amount: 2, unit: 'medium', notes: 'diced' },
          { name: 'Garlic', amount: 3, unit: 'cloves', notes: 'minced' },
          { name: 'Olive Oil', amount: 60, unit: 'ml', notes: 'extra virgin' },
          { name: 'Bay Leaf', amount: 1, unit: 'piece' },
          { name: 'Salt', amount: 1, unit: 'teaspoon', notes: 'to taste' },
          { name: 'Black Pepper', amount: 0.5, unit: 'teaspoon', notes: 'freshly ground' },
          { name: 'Eggs', amount: 4, unit: 'large', notes: 'optional, for serving' }
        ],
        instructions: [
          { stepNumber: 1, description: 'Heat olive oil in a large skillet over medium heat. Add onions and garlic, cook until softened.' },
          { stepNumber: 2, description: 'Add bell peppers and bay leaf. Cook for 10 minutes, stirring occasionally.' },
          { stepNumber: 3, description: 'Add zucchini and cook for another 5 minutes.' },
          { stepNumber: 4, description: 'Add tomatoes, salt, and pepper. Reduce heat to low and simmer for 20-25 minutes.' },
          { stepNumber: 5, description: 'The vegetables should be tender but not mushy, and the liquid should be reduced.' },
          { stepNumber: 6, description: 'Remove bay leaf. Taste and adjust seasoning.' },
          { stepNumber: 7, description: 'Optional: Serve topped with fried eggs.' }
        ],
        notes: [
          "Each region has its own version - some add eggplant or other vegetables.",
          "Can be made ahead and reheated - flavors improve overnight.",
          "Perfect for using summer vegetables at their peak.",
          "Traditionally served with crusty bread.",
          "Can be used as a filling for empanadas or served with rice.",
          "FODMAP Information: High-FODMAP ingredients are onion (fructans) and garlic (fructans). Low/Moderate-FODMAP ingredients include tomatoes (limit 1/2 medium), zucchini (limit 1/3 cup), green bell pepper (limit 1/2 cup), red bell pepper (limit 1/3 cup), olive oil, bay leaf, salt, pepper, and eggs.",
          "Low-FODMAP Recommendations: Omit onion and garlic. Use garlic-infused oil for flavour and add chopped green parts of spring onions or chives if desired. Be mindful of FODMAP stacking from the vegetables; stick to recommended low-FODMAP serving sizes per ingredient and for the overall meal.",
          "Vitamins & Minerals: This dish is rich in vitamins and antioxidants. Tomatoes provide Vitamin C and lycopene. Bell peppers are high in Vitamin C. Zucchini offers Vitamin A and potassium. Onions and garlic contain beneficial sulfur compounds. Olive oil adds healthy fats and Vitamin E. Eggs (if used) contribute protein, choline, and Vitamin D."
        ],
        nutritionFacts: {
          protein: 6,
          carbs: 18,
          fat: 12,
          fiber: 5,
          sugar: 8,
          sodium: 320
        }
      },
      {
        title: 'Samaki wa Kupaka',
        description: 'A traditional Swahili dish featuring grilled fish fillets marinated in a spicy and tangy sauce, served with a side of creamy coconut rice. This flavorful meal is a staple in coastal regions of East Africa, showcasing the fusion of African and Arabic influences.',
        cookingTime: 60,
        servings: 4,
        difficulty: 'MEDIUM',
        cuisineType: 'Africa',
        regionOfOrigin: 'East Africa',
        imageUrl: '/images/recipes/samaki-wa-kupaka-71.jpeg',
        calories: 450,
        type: 'MAIN',
        isVegetarian: false,
        isVegan: false,
        isGlutenFree: true,
        isPescatarian: false,
        isLactoseFree: true,
        isNutFree: true,
        isFermented: false,
        isLowFodmap: false,
        ingredients: [
          { name: 'Fish Fillets', amount: 1, unit: 'kg', notes: 'firm white fish like tilapia or snapper, cut into 4 pieces' },
          { name: 'Onion', amount: 1, unit: 'large', notes: 'finely chopped' },
          { name: 'Garlic', amount: 4, unit: 'cloves', notes: 'minced' },
          { name: 'Ginger', amount: 2, unit: 'inches', notes: 'peeled and grated' },
          { name: 'Lemon Juice', amount: 2, unit: 'tbsp', notes: 'freshly squeezed' },
          { name: 'Cumin', amount: 1, unit: 'tsp', notes: 'ground' },
          { name: 'Paprika', amount: 1, unit: 'tsp' },
          { name: 'Cayenne Pepper', amount: 1, unit: 'tsp', notes: 'or to taste' },
          { name: 'Salt', amount: 1, unit: 'tsp', notes: 'or to taste' },
          { name: 'Coconut Milk', amount: 1, unit: 'can', notes: '14 oz can' },
          { name: 'Basmati Rice', amount: 1, unit: 'cup', notes: 'rinsed and drained' },
          { name: 'Water', amount: 2, unit: 'cups', notes: 'for cooking rice' },
          { name: 'Vegetable Oil', amount: 2, unit: 'tbsp' },
          { name: 'Fresh Cilantro', amount: 1, unit: 'cup', notes: 'chopped for garnish' }
        ],
        instructions: [
          { stepNumber: 1, description: 'Combine onion, garlic, ginger, lemon juice, cumin, paprika, cayenne pepper, and salt in a bowl. Mix well.' },
          { stepNumber: 2, description: 'Marinate fish fillets in the spice mixture for at least 30 minutes, or up to 2 hours.' },
          { stepNumber: 3, description: 'Heat oil in a large pot over medium heat. Add marinated fish fillets and cook for 3-4 minutes per side, or until cooked through.' },
          { stepNumber: 4, description: 'Remove fish from pot and set aside. Add coconut milk to the pot and bring to a simmer.' },
          { stepNumber: 5, description: 'Add basmati rice to the coconut milk. Stir well to coat. Add water and bring to a boil.' },
          { stepNumber: 6, description: 'Reduce heat to low, cover, and simmer for 15-20 minutes, or until rice is tender and liquid is absorbed.' },
          { stepNumber: 7, description: 'Fluff rice with a fork. Garnish with fresh cilantro. Serve hot with grilled fish fillets.' }
        ],
        notes: [
          "The fish should be cooked through but not overcooked - adjust cooking time as needed",
          "The rice should be fluffy and not sticky - add more water if needed",
          "The dish can be made with red snapper or other firm white fish",
          "Leftover samaki wa kupaka can be refrigerated for up to 3 days",
          "FODMAP Information: High-FODMAP ingredients include onion (fructans), garlic (fructans), and coconut milk (polyols - moderate). Low-FODMAP ingredients include fish fillets, ginger, lemon juice, spices (check purity), salt, basmati rice, water, oil, and cilantro.",
          "Low-FODMAP Recommendations: Omit onion and garlic; use garlic-infused oil and the green parts of spring onions for flavor. Limit coconut milk to 1/4 cup (60ml) per serving.",
          "Vitamins & Minerals: Fish provides lean protein, Vitamin B12, selenium, and iodine. Ginger contains gingerol with anti-inflammatory properties. Lemon juice is rich in Vitamin C. Coconut milk offers medium-chain triglycerides and manganese. Basmati rice provides carbohydrates. Cilantro adds Vitamin K."
        ],
        nutritionFacts: {
          protein: 30,
          carbs: 40,
          fat: 20,
          fiber: 5,
          sugar: 2,
          sodium: 400
        }
      },
      {
        title: 'Maharagwe ya Nazi',
        description: 'A hearty and flavorful Tanzanian dish featuring kidney beans simmered in a rich and creamy coconut sauce. This comforting meal is a staple in Tanzanian cuisine, often enjoyed as a main dish or a side with ugali (cornmeal porridge).',
        cookingTime: 60,
        servings: 6,
        difficulty: 'EASY',
        cuisineType: 'Africa',
        regionOfOrigin: 'Tanzania',
        imageUrl: '/images/recipes/maharagwe_ya_nazi.jpg',
        calories: 300,
        type: 'MAIN',
        isVegetarian: true,
        isVegan: true,
        isGlutenFree: true,
        isPescatarian: false,
        isLactoseFree: true,
        isNutFree: true,
        isFermented: false,
        isLowFodmap: false,
        ingredients: [
          { name: 'Kidney Beans', amount: 2, unit: 'cans', notes: '15 oz cans, drained and rinsed' },
          { name: 'Coconut Milk', amount: 2, unit: 'cans', notes: '14 oz cans' },
          { name: 'Onion', amount: 1, unit: 'large', notes: 'finely chopped' },
          { name: 'Garlic', amount: 4, unit: 'cloves', notes: 'minced' },
          { name: 'Ginger', amount: 2, unit: 'inches', notes: 'peeled and grated' },
          { name: 'Cumin', amount: 1, unit: 'tsp', notes: 'ground' },
          { name: 'Paprika', amount: 1, unit: 'tsp' },
          { name: 'Salt', amount: 1, unit: 'tsp', notes: 'or to taste' },
          { name: 'Fresh Cilantro', amount: 1, unit: 'cup', notes: 'chopped for garnish' }
        ],
        instructions: [
          { stepNumber: 1, description: 'Heat oil in a large pot over medium heat. Add onion, garlic, and ginger. Cook until softened.' },
          { stepNumber: 2, description: 'Add cumin and paprika. Cook for 1 minute until fragrant.' },
          { stepNumber: 3, description: 'Add kidney beans and coconut milk. Bring to a simmer.' },
          { stepNumber: 4, description: 'Reduce heat to low, cover, and simmer for 20-25 minutes, or until beans are tender and sauce is thickened.' },
          { stepNumber: 5, description: 'Season with salt to taste. Garnish with fresh cilantro. Serve hot with ugali.' }
        ],
        notes: [
          "The beans should be tender but not mushy - adjust cooking time as needed",
          "The sauce should be creamy and flavorful - add more coconut milk if needed",
          "The dish can be made with black-eyed peas or other beans",
          "Leftover maharagwe ya nazi can be refrigerated for up to 3 days",
          "FODMAP Information: High-FODMAP ingredients include kidney beans (GOS), coconut milk (polyols - moderate), onion (fructans), and garlic (fructans). Low-FODMAP ingredients are ginger, cumin, paprika, salt, and cilantro.",
          "Low-FODMAP Recommendations: Significantly limit kidney beans (e.g., 1/4 cup canned/rinsed per serve) or substitute with a lower FODMAP legume like lentils (limit portion). Limit coconut milk to 1/4 cup (60ml) per serve. Omit onion and garlic; use garlic-infused oil and green parts of spring onions for flavor.",
          "Vitamins & Minerals: Kidney beans are an excellent source of plant-based protein, fiber, folate, iron, and molybdenum. Coconut milk provides manganese and medium-chain fatty acids. Onions and garlic contain antioxidants and sulfur compounds. Ginger offers anti-inflammatory benefits. Cilantro provides Vitamin K."
        ],
        nutritionFacts: {
          protein: 15,
          carbs: 40,
          fat: 15,
          fiber: 10,
          sugar: 2,
          sodium: 400
        }
      },
      {
        title: 'Kaimati',
        description: 'A sweet and fragrant Tanzanian dessert made from cardamom-infused syrup, coconut milk, and a delicate dough. These dumplings are then poached in the syrup until tender and served with a scoop of vanilla ice cream.',
        cookingTime: 90,
        servings: 6,
        difficulty: 'MEDIUM',
        cuisineType: 'Africa',
        regionOfOrigin: 'Tanzania',
        imageUrl: '/images/recipes/kaimati.webp',
        calories: 350,
        type: 'DESSERT',
        isVegetarian: true,
        isVegan: false,
        isGlutenFree: false,
        isPescatarian: false,
        isLactoseFree: false,
        isNutFree: true,
        isFermented: true,
        isLowFodmap: false,
        ingredients: [
          { name: 'Cardamom Pods', amount: 6, unit: 'pieces', notes: 'crushed' },
          { name: 'Water', amount: 2, unit: 'cups', notes: 'for syrup' },
          { name: 'Sugar', amount: 1, unit: 'cup', notes: 'for syrup' },
          { name: 'Coconut Milk', amount: 1, unit: 'can', notes: '14 oz can' },
          { name: 'All-Purpose Flour', amount: 1, unit: 'cup', notes: 'for dough' },
          { name: 'Baking Powder', amount: 1, unit: 'tsp', notes: 'for dough' },
          { name: 'Salt', amount: 1, unit: 'pinch', notes: 'for dough' },
          { name: 'Vanilla Ice Cream', amount: 1, unit: 'pint', notes: 'for serving' }
        ],
        instructions: [
          { stepNumber: 1, description: 'To make syrup: Combine cardamom pods, water, and sugar in a saucepan. Bring to a boil, then reduce heat and simmer for 10 minutes.' },
          { stepNumber: 2, description: 'Strain syrup and discard cardamom pods. Stir in coconut milk and set aside.' },
          { stepNumber: 3, description: 'To make dough: Combine flour, baking powder, and salt in a bowl. Gradually add syrup while stirring until a soft dough forms.' },
          { stepNumber: 4, description: 'Roll out dough on a floured surface to 1/4-inch thickness. Cut into 2-inch circles.' },
          { stepNumber: 5, description: 'Heat syrup in a large pot over medium heat. Add dough circles and poach for 3-4 minutes per side, or until tender and cooked through.' },
          { stepNumber: 6, description: 'Drain kaimati and serve with a scoop of vanilla ice cream.' }
        ],
        notes: [
          "The syrup should be fragrant and flavorful - adjust spices or sugar as needed",
          "The dough should be soft and pliable - add more syrup if needed",
          "The kaimati should be tender but not mushy - adjust cooking time as needed",
          "The dish can be made with different flavors like lemon or rose",
          "Fermented Ingredients: Vanilla ice cream may contain cultured milk/cream. The production of vanilla extract (often used in ice cream) involves fermentation.",
          "FODMAP Information: High-FODMAP ingredients include coconut milk (polyols - moderate), all-purpose flour (fructans), and vanilla ice cream (lactose, plus other potential high-FODMAP ingredients like HFCS). Low-FODMAP ingredients: cardamom, water, sugar (limit intake), baking powder, salt.",
          "Low-FODMAP Recommendations: Use gluten-free all-purpose flour for the dough. Limit the portion size due to coconut milk and sugar content. Serve with lactose-free ice cream or a low-FODMAP sorbet (check ingredients carefully).",
          "Vitamins & Minerals: Cardamom contains antioxidants and minerals like manganese. Coconut milk provides some fat and manganese. Flour offers carbohydrates. Sugar primarily provides energy. Ice cream contributes calcium and fat."
        ],
        nutritionFacts: {
          protein: 5,
          carbs: 50,
          fat: 15,
          fiber: 2,
          sugar: 30,
          sodium: 100
        }
      },
      {
        title: 'Shakshuka',
        description: 'A simple and flavorful North African dish featuring poached eggs cooked in a spicy tomato sauce, often served with bread for dipping. This hearty meal is a staple in North African cuisine, showcasing the fusion of Mediterranean and Middle Eastern influences.',
        cookingTime: 30,
        servings: 4,
        difficulty: 'EASY',
        cuisineType: 'Africa',
        regionOfOrigin: 'Egypt/Morocco/Tunisia',
        imageUrl: '/images/recipes/shakshuka.jpg',
        calories: 300,
        type: 'MAIN',
        isVegetarian: true,
        isVegan: false,
        isGlutenFree: true,
        isPescatarian: false,
        isLactoseFree: false,
        isNutFree: true,
        isFermented: true,
        isLowFodmap: false,
        ingredients: [
          { name: 'Olive Oil', amount: 2, unit: 'tbsp' },
          { name: 'Onion', amount: 1, unit: 'large', notes: 'finely chopped' },
          { name: 'Garlic', amount: 2, unit: 'cloves', notes: 'minced' },
          { name: 'Red Bell Pepper', amount: 1, unit: 'large', notes: 'diced' },
          { name: 'Canned Tomatoes', amount: 2, unit: 'cans', notes: '14.5 oz cans, drained' },
          { name: 'Cumin', amount: 1, unit: 'tsp', notes: 'ground' },
          { name: 'Paprika', amount: 1, unit: 'tsp' },
          { name: 'Cayenne Pepper', amount: 1, unit: 'tsp', notes: 'or to taste' },
          { name: 'Salt', amount: 1, unit: 'tsp', notes: 'or to taste' },
          { name: 'Eggs', amount: 4, unit: 'large', notes: 'room temperature' },
          { name: 'Fresh Cilantro', amount: 1, unit: 'cup', notes: 'chopped for garnish' },
          { name: 'Lemon Wedges', amount: 4, unit: 'pieces', notes: 'for serving' }
        ],
        instructions: [
          { stepNumber: 1, description: 'Heat oil in a large pot over medium heat. Add onion, garlic, and red bell pepper. Cook until softened.' },
          { stepNumber: 2, description: 'Add drained tomatoes, cumin, paprika, cayenne pepper, and salt. Bring to a simmer.' },
          { stepNumber: 3, description: 'Reduce heat to low, cover, and simmer for 10-15 minutes, or until sauce thickens and flavors meld.' },
          { stepNumber: 4, description: 'Create 4 wells in the sauce. Carefully crack an egg into each well.' },
          { stepNumber: 5, description: 'Cover and cook for 5-7 minutes, or until eggs are set but yolks are still runny.' },
          { stepNumber: 6, description: 'Garnish with fresh cilantro. Serve hot with lemon wedges.' }
        ],
        notes: [
          "The sauce should be flavorful and thick - adjust spices or cooking time as needed",
          "The eggs should be cooked to your preference - runny yolks are traditional",
          "Leftover shakshuka can be refrigerated for up to 3 days",
          "Fermented Ingredients: Canned tomatoes often contain citric acid, a product of fermentation, as a preservative. Lemon juice production can sometimes involve fermentation.",
          "FODMAP Information: High-FODMAP ingredients include onion (fructans) and garlic (fructans). Moderate-FODMAP ingredients include red bell pepper (fructans - limit 1/3 cup) and canned tomatoes (fructose - limit 1/2 cup). Low-FODMAP ingredients: olive oil, spices (check purity), salt, eggs, cilantro, lemon juice.",
          "Low-FODMAP Recommendations: Omit onion and garlic; use garlic-infused oil and the green parts of spring onions for flavor. Limit red bell pepper and canned tomato quantities per serving to stay within low-FODMAP guidelines.",
          "Vitamins & Minerals: Eggs provide high-quality protein, Vitamin D, B12, and choline. Tomatoes are rich in Vitamin C, potassium, and lycopene. Bell peppers offer Vitamin C. Olive oil provides healthy monounsaturated fats. Spices contribute antioxidants. Cilantro adds Vitamin K."
        ],
        nutritionFacts: {
          protein: 15,
          carbs: 25,
          fat: 15,
          fiber: 5,
          sugar: 6,
          sodium: 400
        }
      },
      {
        title: "Akara",
        description: "A popular West African street food made from black-eyed peas, Akara are savory, deep-fried bean fritters that are crispy on the outside and fluffy on the inside. This protein-rich snack is commonly eaten for breakfast or as an appetizer in Nigeria, Ghana, and other West African countries.",
        cookingTime: 45,
        servings: 4,
        difficulty: "MEDIUM",
        cuisineType: "Africa",
        regionOfOrigin: "Nigeria",
        imageUrl: "/images/recipes/akara.jpg",
        calories: 250,
        type: "APPETIZER",
        isVegetarian: true,
        isVegan: true,
        isGlutenFree: true,
        isPescatarian: false,
        isLactoseFree: true,
        isNutFree: true,
        isFermented: false,
        isLowFodmap: false,
        ingredients: [
          { name: "Black-eyed Peas", amount: 2, unit: "cups", notes: "dried" },
          { name: "Onion", amount: 1, unit: "medium", notes: "finely chopped" },
          { name: "Scotch Bonnet Pepper", amount: 1, unit: "small", notes: "seeds removed and finely chopped (adjust to taste)" },
          { name: "Salt", amount: 1, unit: "tsp", notes: "or to taste" },
          { name: "Vegetable Oil", amount: 3, unit: "cups", notes: "for deep frying" },
          { name: "Water", amount: 2, unit: "tbsp", notes: "if needed to adjust batter consistency" }
        ],
        instructions: [
          { stepNumber: 1, description: "Soak the black-eyed peas in water for at least 4 hours or overnight. After soaking, rub them between your palms to remove the skins, then rinse thoroughly." },
          { stepNumber: 2, description: "Place the peeled beans in a blender with just enough water to allow the blender to run smoothly. Blend until smooth but not watery." },
          { stepNumber: 3, description: "Transfer the bean paste to a large bowl and whisk vigorously for about 5 minutes to incorporate air, which helps the fritters become fluffy." },
          { stepNumber: 4, description: "Add the chopped onions, scotch bonnet pepper, and salt to the bean mixture. Mix well to combine." },
          { stepNumber: 5, description: "Heat the vegetable oil in a deep pot over medium-high heat until hot but not smoking (around 350°F/175°C)." },
          { stepNumber: 6, description: "Test the oil readiness by dropping a small amount of batter - it should sizzle and rise to the top immediately." },
          { stepNumber: 7, description: "Using a tablespoon, scoop the batter and carefully drop into the hot oil. Don't overcrowd the pot; fry in batches." },
          { stepNumber: 8, description: "Fry until golden brown on all sides, about 3-4 minutes, turning occasionally for even cooking." },
          { stepNumber: 9, description: "Remove with a slotted spoon and drain on paper towels to absorb excess oil." },
          { stepNumber: 10, description: "Serve hot as a snack, breakfast, or appetizer with a side of pepper sauce or as part of a larger meal." }
        ],
        notes: [
          "Traditional preparation involves removing all the skins from the beans for a smoother texture, but this is time-consuming. For a quicker version, you can use a food processor instead.",
          "The batter should be thick enough to scoop but not runny. If too thick, add a little water; if too thin, let it rest to thicken naturally.",
          "Adding a small amount of baking powder (1/2 tsp) can make the akara even fluffier, though this is not traditional.",
          "The oil must be hot but not smoking to prevent the akara from absorbing too much oil and becoming greasy.",
          "For extra flavor, some regions add a little grated ginger or crushed bouillon cube to the batter.",
          "FODMAP Information: High-FODMAP ingredients include black-eyed peas (GOS) and onion (fructans). Low-FODMAP ingredients: Scotch bonnet pepper (test tolerance for capsaicin), salt, vegetable oil, water.",
          "Low-FODMAP Recommendations: This dish is difficult to make low-FODMAP due to the primary ingredient, black-eyed peas. Reducing the portion size significantly is the main strategy. Omit onion and use the green parts of spring onions instead.",
          "Vitamins & Minerals: Black-eyed peas are a good source of plant-based protein, fiber, folate, iron, and potassium. Onions provide Vitamin C and antioxidants. Scotch bonnet peppers contain capsaicin and Vitamin C. Vegetable oil contributes fat."
        ],
        nutritionFacts: {
          protein: 12,
          carbs: 30,
          fat: 8,
          fiber: 9,
          sugar: 2,
          sodium: 300
        }
      },
      {
        title: "Amala with Ewedu and Gbegiri",
        description: "A traditional Nigerian meal from the Yoruba culture featuring amala (a smooth, dark brown swallow made from yam flour), served with ewedu soup (jute leaves) and gbegiri (bean soup). This hearty combination offers a perfect balance of flavors and textures, with the smoothness of amala complementing the slightly slimy ewedu and thick, protein-rich gbegiri.",
        cookingTime: 90,
        servings: 4,
        difficulty: "HARD",
        cuisineType: "Africa",
        regionOfOrigin: "Nigeria",
        imageUrl: "/images/recipes/amala-ewedu-gbegiri.jpg",
        calories: 450,
        type: "MAIN",
        isVegetarian: false,
        isVegan: false,
        isGlutenFree: true,
        isPescatarian: false,
        isLactoseFree: true,
        isNutFree: true,
        isFermented: true,
        isLowFodmap: false,
        ingredients: [
          { name: "Yam Flour (Elubo)", amount: 2, unit: "cups", notes: "for amala" },
          { name: "Water", amount: 4, unit: "cups", notes: "hot, for amala" },
          { name: "Black-eyed Beans", amount: 1, unit: "cup", notes: "peeled, for gbegiri" },
          { name: "Palm Oil", amount: 3, unit: "tbsp", notes: "for gbegiri" },
          { name: "Dried Jute Leaves (Ewedu)", amount: 2, unit: "cups", notes: "or fresh if available" },
          { name: "Locust Bean (Iru)", amount: 1, unit: "tbsp", notes: "fermented" },
          { name: "Beef", amount: 500, unit: "g", notes: "cut into chunks, for serving" },
          { name: "Crayfish", amount: 3, unit: "tbsp", notes: "ground" },
          { name: "Scotch Bonnet Pepper", amount: 2, unit: "medium", notes: "blended" },
          { name: "Onion", amount: 1, unit: "large", notes: "diced" },
          { name: "Bouillon Cubes", amount: 3, unit: "cubes", notes: "for flavor" },
          { name: "Salt", amount: 1, unit: "tsp", notes: "or to taste" }
        ],
        instructions: [
          { stepNumber: 1, description: "For the Gbegiri: Rinse and boil peeled black-eyed beans in 4 cups of water until soft and mushy, about 40-50 minutes." },
          { stepNumber: 2, description: "Mash the boiled beans with a wooden spoon or blend to a smooth consistency. Return to the pot and add some water if too thick." },
          { stepNumber: 3, description: "Add palm oil, one bouillon cube, salt, and half of the diced onions to the bean mixture. Simmer for 15 minutes on low heat, stirring occasionally." },
          { stepNumber: 4, description: "For the Ewedu: If using dried ewedu leaves, reconstitute in warm water for 10 minutes, then drain. If using fresh, wash thoroughly." },
          { stepNumber: 5, description: "In a separate pot, boil ewedu leaves in 2 cups of water for about 10 minutes until soft." },
          { stepNumber: 6, description: "Add a tablespoon of ground crayfish, locust bean, and one bouillon cube to the ewedu. Using an ewedu broom or hand blender, mash the leaves to a slimy consistency." },
          { stepNumber: 7, description: "For the Amala: Bring 4 cups of water to a boil in a large pot." },
          { stepNumber: 8, description: "Gradually add yam flour to the boiling water, stirring continuously with a wooden spoon to avoid lumps." },
          { stepNumber: 9, description: "Keep stirring until the mixture forms a smooth, elastic dough. Reduce heat to low, cover, and let it cook for 5 minutes." },
          { stepNumber: 10, description: "For the Meat: Season beef with remaining onions, one bouillon cube, salt, and half of the blended pepper. Cook until tender, about 30 minutes." },
          { stepNumber: 11, description: "Serve amala hot with ewedu, gbegiri, and the cooked beef, arranged as desired on a plate." }
        ],
        notes: [
          "The key to smooth amala is adding the yam flour gradually to hot water and stirring vigorously to prevent lumps.",
          "Authentic gbegiri should have a smooth, thick consistency that's not too watery or too stiff.",
          "Ewedu is meant to be slimy - this texture is prized in Yoruba cuisine and pairs perfectly with the smoothness of amala.",
          "Traditional preparation uses an ewedu broom (ijabe) to whip the leaves, but a hand blender works as a modern alternative.",
          "Peeling black-eyed beans for gbegiri is labor-intensive; soaking them overnight helps make the process easier.",
          "Fermented Ingredients: Yam Flour (Elubo) processing often involves fermentation. Locust Bean (Iru) is a fermented product.",
          "FODMAP Information: High-FODMAP ingredients include Yam Flour (check processing, potentially high), Black-eyed Beans (GOS), Locust Bean (Iru - FODMAP content variable), Onion (fructans), and Bouillon Cubes (check for onion/garlic). Low-FODMAP ingredients: water, palm oil, Ewedu (jute leaves), beef, crayfish (check additives), Scotch bonnet pepper (test tolerance), salt.",
          "Low-FODMAP Recommendations: Extremely difficult to make fully low-FODMAP. Substitute Amala with plain rice or quinoa. Substitute Gbegiri with a low-FODMAP lentil soup (limit portion). Omit Iru and Onion. Use low-FODMAP bouillon/stock.",
          "Vitamins & Minerals: Yam flour provides carbohydrates and potassium. Black-eyed beans offer protein, fiber, and folate. Ewedu leaves contain vitamins A and C. Locust beans are rich in protein and calcium. Beef provides protein, iron, zinc, and B12. Palm oil contains Vitamin E."
        ],
        nutritionFacts: {
          protein: 25,
          carbs: 65,
          fat: 12,
          fiber: 15,
          sugar: 4,
          sodium: 750
        }
      },
      {
        title: "Attiéké with Grilled Fish",
        description: "A beloved dish from Côte d'Ivoire (Ivory Coast) featuring attiéké, a fermented cassava couscous with a slightly tangy flavor, served with perfectly grilled fish and a vibrant tomato-onion sauce. This complete meal offers a harmonious blend of starchy comfort food with savory grilled protein and fresh, zesty accompaniments.",
        cookingTime: 60,
        servings: 4,
        difficulty: "MEDIUM",
        cuisineType: "Africa",
        regionOfOrigin: "Côte d'Ivoire",
        imageUrl: "/images/recipes/attieke-with-grilled-fish.jpg",
        calories: 420,
        type: "MAIN",
        isVegetarian: false,
        isVegan: false,
        isGlutenFree: true,
        isPescatarian: true,
        isLactoseFree: true,
        isNutFree: true,
        isFermented: true,
        isLowFodmap: false,
        ingredients: [
          { name: "Attiéké", amount: 500, unit: "g", notes: "pre-made cassava couscous, available at African markets" },
          { name: "Whole Tilapia or Sea Bass", amount: 4, unit: "medium", notes: "gutted and scaled" },
          { name: "Garlic", amount: 4, unit: "cloves", notes: "minced" },
          { name: "Ginger", amount: 2, unit: "inches", notes: "peeled and grated" },
          { name: "Scotch Bonnet Pepper", amount: 1, unit: "small", notes: "seeded and minced (adjust to taste)" },
          { name: "Onions", amount: 3, unit: "medium", notes: "1 sliced for marinade, 2 for sauce" },
          { name: "Tomatoes", amount: 4, unit: "medium", notes: "diced" },
          { name: "Lemon or Lime", amount: 2, unit: "whole", notes: "1 for marinade, 1 sliced for serving" },
          { name: "Vegetable Oil", amount: 3, unit: "tbsp", notes: "for sauce and grilling" },
          { name: "Fresh Thyme", amount: 2, unit: "sprigs", notes: "leaves only" },
          { name: "Chicken Bouillon Cube", amount: 1, unit: "cube", notes: "crumbled" },
          { name: "Salt", amount: 1, unit: "tsp", notes: "or to taste" },
          { name: "Black Pepper", amount: 1, unit: "tsp", notes: "freshly ground" },
          { name: "Water", amount: 1, unit: "cup", notes: "for steaming attiéké" }
        ],
        instructions: [
          { stepNumber: 1, description: "Prepare the fish marinade by combining minced garlic, grated ginger, 1 sliced onion, thyme leaves, juice of 1 lemon, salt, and black pepper in a small bowl." },
          { stepNumber: 2, description: "Make 3-4 diagonal cuts on each side of the fish, then rub the marinade all over and inside the cavity. Let marinate for at least 30 minutes, preferably 1 hour." },
          { stepNumber: 3, description: "While the fish marinates, prepare the tomato-onion sauce: Heat 2 tbsp oil in a pan, add 2 sliced onions and sauté until translucent." },
          { stepNumber: 4, description: "Add diced tomatoes, minced scotch bonnet pepper, and crumbled bouillon cube to the pan. Cook on medium heat until tomatoes break down and sauce thickens, about 15 minutes. Season with salt to taste." },
          { stepNumber: 5, description: "Prepare the attiéké by placing it in a heat-proof bowl. Sprinkle with 1 cup of water and mix lightly with a fork to moisten." },
          { stepNumber: 6, description: "Cover the bowl with plastic wrap or a tight-fitting lid and microwave for 3-4 minutes, or place in a steamer over boiling water for 10 minutes." },
          { stepNumber: 7, description: "After steaming, fluff the attiéké with a fork to separate the grains. Cover to keep warm." },
          { stepNumber: 8, description: "Preheat a grill to medium-high heat. Brush the grill grates with oil to prevent sticking." },
          { stepNumber: 9, description: "Place the marinated fish on the grill and cook for 5-7 minutes per side, or until the fish is cooked through and the skin is crispy." },
          { stepNumber: 10, description: "To serve, place a portion of attiéké on each plate, top with grilled fish, and spoon the tomato-onion sauce over or beside the fish." },
          { stepNumber: 11, description: "Garnish with lemon or lime slices and serve immediately." }
        ],
        notes: [
          "If you can't find prepared attiéké, you can substitute with couscous, though the flavor will be different.",
          "The fish can also be cooked in a hot oven (400°F/200°C) for about 20 minutes if a grill is not available.",
          "Traditional preparation involves wrapping the attiéké in banana leaves and steaming it, which imparts additional flavor.",
          "Alloco (fried plantains) make an excellent side dish to serve alongside this meal.",
          "In Côte d'Ivoire, this dish is often served with a very spicy chili condiment called 'piment' on the side - adjust the scotch bonnet amount in the sauce according to your spice preference.",
          "Fermented Ingredients: Attiéké is a couscous made from fermented cassava pulp.",
          "FODMAP Information: High-FODMAP ingredients include Attiéké (fermented cassava, potentially high FODMAP), Garlic (fructans), Onions (fructans), and Bouillon Cube (check for onion/garlic). Low-FODMAP ingredients: Fish, Ginger, Scotch Bonnet Pepper (test tolerance), Tomatoes (limit 1/2 medium), Lemon/Lime juice, Oil, Thyme, Salt, Pepper, Water.",
          "Low-FODMAP Recommendations: Substitute attiéké with plain rice or quinoa. Omit garlic and onions; use garlic-infused oil and green parts of spring onions. Use low-FODMAP bouillon/stock. Limit tomato portion size.",
          "Vitamins & Minerals: Attiéké provides carbohydrates. Fish is an excellent source of protein, Vitamin B12, selenium, and Omega-3 fatty acids (depending on fish type). Garlic, ginger, and onions offer antioxidants and various vitamins/minerals. Tomatoes provide Vitamin C and lycopene. Lemon/Lime juice adds Vitamin C."
        ],
        nutritionFacts: {
          protein: 32,
          carbs: 48,
          fat: 14,
          fiber: 6,
          sugar: 5,
          sodium: 650
        }
      },
      {
        title: "Beef Tehari",
        description: "A fragrant one-pot Bangladeshi rice dish that combines tender beef with aromatic basmati rice and potatoes, all infused with a blend of warming spices. Unlike biryani, tehari cooks the meat and rice together, allowing the flavors to fully meld. This hearty dish is especially popular during festivals and gatherings in Bangladesh.",
        cookingTime: 90,
        servings: 6,
        difficulty: "MEDIUM",
        cuisineType: "Asia",
        regionOfOrigin: "Bangladesh",
        imageUrl: "/images/recipes/beef_tehari.jpg",
        calories: 580,
        type: "MAIN",
        isVegetarian: false,
        isVegan: false,
        isGlutenFree: true,
        isPescatarian: false,
        isLactoseFree: true,
        isNutFree: true,
        isFermented: true,
        isLowFodmap: false,
        ingredients: [
          { name: "Beef", amount: 1, unit: "kg", notes: "cut into 1-inch cubes" },
          { name: "Basmati Rice", amount: 3, unit: "cups", notes: "washed and soaked for 30 minutes" },
          { name: "Potatoes", amount: 3, unit: "medium", notes: "peeled and cut into large cubes" },
          { name: "Onions", amount: 3, unit: "large", notes: "2 thinly sliced, 1 for fried garnish" },
          { name: "Ginger Paste", amount: 2, unit: "tbsp", notes: "freshly made preferred" },
          { name: "Garlic Paste", amount: 2, unit: "tbsp", notes: "freshly made preferred" },
          { name: "Green Chilies", amount: 4, unit: "whole", notes: "slit lengthwise" },
          { name: "Yogurt", amount: 0.5, unit: "cup", notes: "beaten" },
          { name: "Vegetable Oil", amount: 0.5, unit: "cup", notes: "or ghee for authentic flavor" },
          { name: "Cinnamon Sticks", amount: 2, unit: "inches", notes: "broken into pieces" },
          { name: "Cardamom Pods", amount: 5, unit: "whole", notes: "green" },
          { name: "Cloves", amount: 5, unit: "whole", notes: "" },
          { name: "Bay Leaves", amount: 2, unit: "whole", notes: "" },
          { name: "Star Anise", amount: 1, unit: "whole", notes: "" },
          { name: "Cumin Powder", amount: 2, unit: "tsp", notes: "" },
          { name: "Coriander Powder", amount: 2, unit: "tsp", notes: "" },
          { name: "Turmeric Powder", amount: 1, unit: "tsp", notes: "" },
          { name: "Red Chili Powder", amount: 1, unit: "tsp", notes: "adjust to taste" },
          { name: "Garam Masala", amount: 1, unit: "tsp", notes: "" },
          { name: "Salt", amount: 2, unit: "tsp", notes: "or to taste" },
          { name: "Water", amount: 4, unit: "cups", notes: "hot" },
          { name: "Mint Leaves", amount: 0.25, unit: "cup", notes: "fresh, chopped" },
          { name: "Cilantro", amount: 0.25, unit: "cup", notes: "fresh, chopped" }
        ],
        instructions: [
          { stepNumber: 1, description: "In a large bowl, marinate beef with yogurt, ginger paste, garlic paste, 1 tsp turmeric, 1 tsp red chili powder, 1 tsp cumin powder, 1 tsp coriander powder, and 1 tsp salt. Mix well and let it rest for at least 30 minutes, preferably 1 hour." },
          { stepNumber: 2, description: "Heat oil in a large, heavy-bottomed pot over medium heat. Add the whole spices (cinnamon, cardamom, cloves, bay leaves, star anise) and sauté until fragrant, about 30 seconds." },
          { stepNumber: 3, description: "Add sliced onions and cook until golden brown, about 8-10 minutes." },
          { stepNumber: 4, description: "Add marinated beef to the pot and cook on high heat for 5 minutes, stirring frequently." },
          { stepNumber: 5, description: "Reduce heat to medium, cover the pot, and let the meat cook in its own juices for about 15-20 minutes, stirring occasionally." },
          { stepNumber: 6, description: "Add the potato cubes, remaining cumin and coriander powders, and green chilies. Stir well to combine with the meat." },
          { stepNumber: 7, description: "Cook for another 10 minutes until potatoes are partially tender and the oil begins to separate." },
          { stepNumber: 8, description: "Drain the soaked rice and add it to the pot. Gently stir to mix it with the meat and spices without breaking the rice grains." },
          { stepNumber: 9, description: "Pour in 4 cups of hot water, add the remaining salt, and bring to a boil." },
          { stepNumber: 10, description: "Once boiling, reduce heat to low, cover the pot with a tight-fitting lid, and cook for 15-20 minutes until the rice is tender and all the water has been absorbed." },
          { stepNumber: 11, description: "Remove from heat, sprinkle garam masala, chopped mint, and cilantro over the top. Cover again and let it rest for 10 minutes." },
          { stepNumber: 12, description: "Meanwhile, fry one thinly sliced onion until crispy and golden for garnish." },
          { stepNumber: 13, description: "Gently fluff the tehari with a fork before serving, garnish with fried onions, and serve hot." }
        ],
        notes: [
          "For authentic tehari, use beef with some fat as it adds richness to the dish.",
          "The key to perfect tehari is getting the rice-to-water ratio right - the rice should be separate but fully cooked.",
          "Yellow food coloring is sometimes added traditionally, but turmeric provides a natural color.",
          "In Bangladesh, tehari is often served with a simple salad of sliced cucumber, onion, and chili.",
          "If your pot doesn't have a tight seal, place a kitchen towel between the pot and lid to prevent steam from escaping.",
          "Fermented Ingredients: Yogurt is made through lactic acid fermentation.",
          "FODMAP Information: High-FODMAP ingredients include Onions (fructans), Garlic Paste (fructans), and Yogurt (lactose). Low-FODMAP ingredients: Beef, Basmati Rice, Potatoes, Ginger Paste, Green Chilies (test tolerance for capsaicin), Oil/Ghee, Spices (check blends for onion/garlic powder), Salt, Water, Mint, Cilantro.",
          "Low-FODMAP Recommendations: Omit onions and garlic paste; use garlic-infused oil and green parts of spring onions. Use lactose-free yogurt for the marinade. Ensure spice powders and garam masala do not contain onion or garlic powder.",
          "Vitamins & Minerals: Beef is rich in protein, iron, zinc, and Vitamin B12. Basmati rice provides carbohydrates. Potatoes offer potassium and Vitamin C. Yogurt contributes calcium and probiotics. Ginger and spices provide antioxidants and various minerals."
        ],
        nutritionFacts: {
          protein: 38,
          carbs: 62,
          fat: 22,
          fiber: 4,
          sugar: 3,
          sodium: 520
        }
      },
      {
        title: "Bissap/Zobo (Hibiscus Tea)",
        description: "A vibrant, ruby-red beverage made from dried hibiscus flowers, popular throughout West Africa. Known as bissap in Senegal and zobo in Nigeria, this refreshing drink has a pleasantly tart flavor balanced with sweetness and aromatic spices. Served chilled, it's the perfect thirst-quencher on hot days and is known for its high vitamin C content and antioxidant properties.",
        cookingTime: 45,
        servings: 8,
        difficulty: "EASY",
        cuisineType: "Africa",
        regionOfOrigin: "Nigeria",
        imageUrl: "/images/recipes/bissap-zobo-hibiscus-tea.jpg",
        calories: 120,
        type: "BEVERAGE",
        isVegetarian: true,
        isVegan: true,
        isGlutenFree: true,
        isPescatarian: false,
        isLactoseFree: true,
        isNutFree: true,
        isFermented: true,
        isLowFodmap: true,
        ingredients: [
          { name: "Dried Hibiscus Flowers", amount: 2, unit: "cups", notes: "also called sorrel or roselle" },
          { name: "Water", amount: 10, unit: "cups", notes: "divided" },
          { name: "Ginger", amount: 3, unit: "inches", notes: "peeled and sliced" },
          { name: "Cinnamon Stick", amount: 1, unit: "whole", notes: "about 3 inches" },
          { name: "Cloves", amount: 5, unit: "whole", notes: "" },
          { name: "Pineapple", amount: 0.5, unit: "small", notes: "rind only (optional)" },
          { name: "Vanilla Extract", amount: 1, unit: "tsp", notes: "pure, not imitation" },
          { name: "Sugar", amount: 1, unit: "cup", notes: "adjust to taste" },
          { name: "Fresh Mint Leaves", amount: 0.25, unit: "cup", notes: "for garnish (optional)" },
          { name: "Lemon or Lime", amount: 1, unit: "whole", notes: "sliced for garnish (optional)" }
        ],
        instructions: [
          { stepNumber: 1, description: "Rinse the dried hibiscus flowers thoroughly in cold water to remove any dust or debris." },
          { stepNumber: 2, description: "In a large pot, bring 8 cups of water to a boil over high heat." },
          { stepNumber: 3, description: "Once boiling, add the rinsed hibiscus flowers, sliced ginger, cinnamon stick, cloves, and pineapple rind (if using)." },
          { stepNumber: 4, description: "Reduce heat to medium-low and simmer, covered, for 20-25 minutes until the water turns a deep ruby red color and is deeply flavored." },
          { stepNumber: 5, description: "Remove from heat and strain the liquid through a fine-mesh sieve into a large heat-proof container, pressing on the solids to extract all the flavor." },
          { stepNumber: 6, description: "While still hot, add the sugar and stir until completely dissolved." },
          { stepNumber: 7, description: "Add the vanilla extract and the remaining 2 cups of cold water to help cool the drink and adjust the concentration." },
          { stepNumber: 8, description: "Let the mixture cool to room temperature, then refrigerate for at least 2 hours until thoroughly chilled." },
          { stepNumber: 9, description: "Taste and adjust sweetness if necessary by adding more dissolved sugar." },
          { stepNumber: 10, description: "Serve over ice, garnished with fresh mint leaves and lemon or lime slices if desired." }
        ],
        notes: [
          "For a more intense flavor, you can steep the hibiscus flowers for longer, up to 30-40 minutes.",
          "In Nigeria, zobo is sometimes flavored with pineapple juice or coconut extract for added depth.",
          "The drink can be stored in the refrigerator for up to 3 days in a tightly sealed container.",
          "For a lower-calorie version, use a natural sweetener like honey, agave nectar, or stevia to taste.",
          "In Senegal, bissap is sometimes enhanced with orange flower water or rose water - add 1-2 tsp if desired.",
          "Fermented Ingredients: Vanilla extract production involves fermentation.",
          "FODMAP Information: Generally Low FODMAP. The main ingredients (hibiscus, water, ginger, cinnamon, cloves, vanilla, mint, lemon/lime) are low FODMAP. The primary consideration is added sugar; limit intake as large amounts of sucrose (glucose + fructose) can be problematic for some.",
          "Low-FODMAP Recommendations: This drink is suitable for a low-FODMAP diet if sugar intake is managed. Use a preferred low-FODMAP sweetener if desired.",
          "Vitamins & Minerals: Hibiscus flowers are very rich in Vitamin C and antioxidants (anthocyanins). Ginger provides anti-inflammatory compounds. Cinnamon may help regulate blood sugar. Cloves offer manganese and antioxidants. Lemon/lime adds Vitamin C."
        ],
        nutritionFacts: {
          protein: 0,
          carbs: 30,
          fat: 0,
          fiber: 1,
          sugar: 28,
          sodium: 10
        }
      },
      {
        title: "Açaí Bowl",
        description: "A refreshing and nutritious Brazilian breakfast or snack made with frozen açaí berry pulp blended to a smooth, sorbet-like consistency and topped with granola, fresh fruits, and honey. Originally from the Amazon region of Brazil, açaí bowls are now beloved worldwide for their vibrant purple color, refreshing taste, and energizing properties.",
        cookingTime: 15,
        servings: 2,
        difficulty: "EASY",
        cuisineType: "South America",
        regionOfOrigin: "Brazil",
        imageUrl: "/images/recipes/brazilian-acai-bowl.jpg",
        calories: 420,
        type: "BREAKFAST",
        isVegetarian: true,
        isVegan: false,
        isGlutenFree: false,
        isLactoseFree: false,
        isNutFree: false,
        isFermented: true,
        isLowFodmap: false,
        ingredients: [
          { name: "Frozen Açaí Berry Pulp", amount: 200, unit: "g", notes: "2 packs, unsweetened" },
          { name: "Banana", amount: 1, unit: "medium", notes: "frozen, plus extra slices for topping" },
          { name: "Blueberries", amount: 0.5, unit: "cup", notes: "fresh or frozen" },
          { name: "Strawberries", amount: 0.5, unit: "cup", notes: "fresh, sliced" },
          { name: "Granola", amount: 0.5, unit: "cup", notes: "preferably with nuts and seeds" },
          { name: "Honey", amount: 2, unit: "tbsp", notes: "or to taste" },
          { name: "Guarana Syrup", amount: 1, unit: "tbsp", notes: "optional, authentic Brazilian ingredient" },
          { name: "Milk", amount: 0.25, unit: "cup", notes: "or almond milk for dairy-free version" },
          { name: "Sliced Almonds", amount: 2, unit: "tbsp", notes: "for topping" },
          { name: "Coconut Flakes", amount: 2, unit: "tbsp", notes: "for topping" },
          { name: "Fresh Kiwi", amount: 1, unit: "medium", notes: "sliced, for topping" }
        ],
        instructions: [
          { stepNumber: 1, description: "Break up the frozen açaí packets by tapping them against the counter or squeezing the package with your hands." },
          { stepNumber: 2, description: "Run the sealed açaí packets under warm water for a few seconds to slightly soften them." },
          { stepNumber: 3, description: "Empty the açaí pulp into a high-powered blender. Break the frozen banana into chunks and add to the blender." },
          { stepNumber: 4, description: "Add the frozen blueberries, milk, and guarana syrup (if using) to the blender." },
          { stepNumber: 5, description: "Blend on high until smooth, stopping to scrape down the sides as needed. The consistency should be thick like a sorbet – add a little more milk if too thick or more frozen fruit if too thin." },
          { stepNumber: 6, description: "Taste the blend and add honey if needed, especially if using unsweetened açaí pulp. Blend briefly to incorporate." },
          { stepNumber: 7, description: "Pour the açaí mixture into two bowls, smoothing the top with a spoon." },
          { stepNumber: 8, description: "Arrange the sliced banana, strawberries, and kiwi on top of the açaí mixture." },
          { stepNumber: 9, description: "Sprinkle granola, sliced almonds, and coconut flakes evenly over the fruits." },
          { stepNumber: 10, description: "Drizzle with additional honey if desired and serve immediately while still cold and thick." }
        ],
        notes: [
          "Authentic Brazilian açaí bowls are less sweet than Western versions and often include guarana syrup for extra energy.",
          "For the best texture, all ingredients should be very cold - chill your serving bowls in the freezer for 10 minutes before assembling.",
          "If you can't find pure açaí pulp, ensure any açaí products you use don't contain added sugars or other fillers.",
          "In Brazil, açaí bowls are sometimes topped with tapioca pearls or farinha (toasted cassava flour) for added texture.",
          "Eat immediately after preparing as the açaí mixture will start to melt quickly at room temperature.",
          "Fermented Ingredients: Granola may contain fermented grains or additives. Honey processing might involve fermentation. Milk may be cultured.",
          "FODMAP Information: High-FODMAP ingredients include Açaí pulp (fructans - limit portion), Honey (excess fructose), Milk (lactose), and Granola (check ingredients for high-FODMAP grains, dried fruits, sweeteners). Low/Moderate-FODMAP: Banana (ripe = fructans, limit 1/3 medium), Blueberries (limit 1/4 cup), Strawberries (limit 5 medium), Guarana syrup (check ingredients), Almonds (limit 10), Coconut flakes (limit 1/4 cup), Kiwi (limit 2 small).",
          "Low-FODMAP Recommendations: Limit açaí pulp portion (<1/2 cup). Use maple syrup instead of honey. Use lactose-free milk or suitable plant milk (check additives). Choose certified low-FODMAP granola or make your own with gluten-free oats, allowed nuts/seeds, and no high-FODMAP fruits/sweeteners. Adhere to low-FODMAP portion sizes for fruits and nuts.",
          "Vitamins & Minerals: Açaí berries are packed with antioxidants (anthocyanins), healthy fats, and fiber. Bananas provide potassium and Vitamin B6. Berries offer Vitamin C and antioxidants. Granola adds fiber and micronutrients depending on ingredients. Milk provides calcium. Nuts and seeds contribute healthy fats, protein, and minerals like magnesium."
        ],
        nutritionFacts: {
          protein: 8,
          carbs: 65,
          fat: 15,
          fiber: 12,
          sugar: 38,
          sodium: 60
        }
      },
      {
        title: "Chitol Macher Muitha",
        description: "A traditional Bengali fish delicacy featuring clown knife fish dumplings simmered in a rich, spicy gravy. This labor-intensive dish transforms the bony chitol fish into tender koftas, which are then bathed in a complex sauce of onions, ginger, garlic, and warm spices. Considered a celebratory dish in Bangladesh and West Bengal, it showcases the region's mastery of fish preparation.",
        cookingTime: 120,
        servings: 4,
        difficulty: "HARD",
        cuisineType: "Asia",
        regionOfOrigin: "Bangladesh/West Bengal",
        imageUrl: "/images/recipes/chitol-macher-muitha.jpg",
        calories: 450,
        type: "MAIN",
        isVegetarian: false,
        isVegan: false,
        isGlutenFree: true,
        isPescatarian: true,
        isLactoseFree: true,
        isNutFree: true,
        isFermented: false,
        isLowFodmap: false,
        ingredients: [
          { name: "Chitol Fish", amount: 1, unit: "kg", notes: "clown knife fish, cleaned and with skin removed" },
          { name: "Potatoes", amount: 2, unit: "medium", notes: "boiled and mashed" },
          { name: "Onions", amount: 3, unit: "large", notes: "2 finely chopped, 1 thinly sliced" },
          { name: "Ginger", amount: 2, unit: "inches", notes: "finely grated" },
          { name: "Garlic", amount: 6, unit: "cloves", notes: "minced" },
          { name: "Green Chilies", amount: 6, unit: "medium", notes: "4 finely chopped, 2 slit lengthwise" },
          { name: "Cumin Powder", amount: 2, unit: "tsp", notes: "" },
          { name: "Coriander Powder", amount: 2, unit: "tsp", notes: "" },
          { name: "Turmeric Powder", amount: 1.5, unit: "tsp", notes: "divided" },
          { name: "Red Chili Powder", amount: 1, unit: "tsp", notes: "adjust to taste" },
          { name: "Garam Masala", amount: 1, unit: "tsp", notes: "" },
          { name: "Bay Leaves", amount: 2, unit: "whole", notes: "" },
          { name: "Cinnamon Stick", amount: 1, unit: "inch", notes: "" },
          { name: "Cardamom Pods", amount: 3, unit: "whole", notes: "" },
          { name: "Cloves", amount: 3, unit: "whole", notes: "" },
          { name: "Mustard Oil", amount: 6, unit: "tbsp", notes: "divided, or vegetable oil if unavailable" },
          { name: "All-purpose Flour", amount: 3, unit: "tbsp", notes: "for binding the fish paste" },
          { name: "Cilantro", amount: 0.25, unit: "cup", notes: "fresh, chopped" },
          { name: "Salt", amount: 1.5, unit: "tsp", notes: "or to taste" },
          { name: "Water", amount: 2, unit: "cups", notes: "" }
        ],
        instructions: [
          { stepNumber: 1, description: "Debone the chitol fish completely, scraping all meat from the bones. This is labor-intensive but crucial for the dish." },
          { stepNumber: 2, description: "Mix the fish meat with 0.5 tsp turmeric and 0.5 tsp salt. Let it marinate for 15 minutes." },
          { stepNumber: 3, description: "In a food processor, blend the fish meat with mashed potatoes, 1 chopped onion, half the ginger and garlic, 2 chopped green chilies, and 1 tbsp mustard oil until smooth." },
          { stepNumber: 4, description: "Add flour to the fish mixture and mix well. The paste should be firm enough to shape into balls." },
          { stepNumber: 5, description: "With oiled hands, shape the fish paste into balls about 1.5 inches in diameter. Make a small indentation in each with your thumb." },
          { stepNumber: 6, description: "Heat 3 tbsp mustard oil in a deep pan. Carefully add the fish balls and fry on medium heat until golden brown on all sides, about 5-6 minutes. Remove and set aside." },
          { stepNumber: 7, description: "In the same pan, add the remaining 3 tbsp oil. Add bay leaves, cinnamon, cardamom, and cloves. Sauté until fragrant." },
          { stepNumber: 8, description: "Add the sliced onion and fry until golden brown, about 5-6 minutes." },
          { stepNumber: 9, description: "Add the remaining ginger, garlic, and 2 chopped green chilies. Cook for 2 minutes until the raw smell disappears." },
          { stepNumber: 10, description: "Add cumin powder, coriander powder, remaining turmeric, red chili powder, and salt. Cook for 2-3 minutes, stirring continuously." },
          { stepNumber: 11, description: "Add 0.5 cup water and cook until oil separates from the masala, about 5-6 minutes." },
          { stepNumber: 12, description: "Carefully add the fried fish balls to the gravy. Pour in the remaining 1.5 cups water and 2 slit green chilies." },
          { stepNumber: 13, description: "Cover and simmer on low heat for 20-25 minutes until the gravy thickens and the koftas absorb the flavors." },
          { stepNumber: 14, description: "Add garam masala and half the cilantro. Cook for another 2 minutes." },
          { stepNumber: 15, description: "Garnish with remaining cilantro and serve hot with steamed rice." }
        ],
        notes: [
          "Deboning the chitol fish is challenging but essential - patiently remove all bones and cartilage to prevent any from remaining in the koftas.",
          "If chitol fish is unavailable, you can substitute with any firm white fish like sea bass or catfish, though the texture will be slightly different.",
          "The indentation in each kofta helps the gravy penetrate the dumplings better.",
          "In some regions, the dumplings are steamed instead of fried for a healthier version.",
          "Authentic Bengali preparation uses mustard oil for its distinctive pungent flavor, but you can substitute with vegetable oil if necessary.",
          "FODMAP Information: High-FODMAP ingredients include Onions (fructans), Garlic (fructans), and All-purpose Flour (fructans - binder). Low-FODMAP ingredients: Chitol fish, Potatoes, Ginger, Green chilies (test tolerance for capsaicin), Spices (check purity), Mustard oil, Cilantro, Salt, Water.",
          "Low-FODMAP Recommendations: Omit onions and garlic; use garlic-infused oil and green parts of spring onions. Use gluten-free flour or cornstarch as a binder for the fish balls instead of all-purpose flour. Ensure garam masala blend is free from onion/garlic powder.",
          "Vitamins & Minerals: Chitol fish provides protein and Omega-3 fatty acids. Potatoes offer potassium and Vitamin C. Ginger and garlic have antioxidant and anti-inflammatory properties. Spices contribute various micronutrients and antioxidants. Mustard oil contains monounsaturated and polyunsaturated fats. Cilantro adds Vitamin K."
        ],
        nutritionFacts: {
          protein: 32,
          carbs: 22,
          fat: 28,
          fiber: 3,
          sugar: 4,
          sodium: 520
        }
      },
      {
        title: "Eba with Okra Soup",
        description: "A quintessential Nigerian meal consisting of eba (a stiff dough made from fermented cassava flour) served with okra soup, a slimy, nutritious stew featuring okra, assorted meats, fish, and African spices. The stretchy texture of okra soup is highly prized in Nigerian cuisine, providing the perfect complement to the smooth, filling eba.",
        cookingTime: 75,
        servings: 4,
        difficulty: "MEDIUM",
        cuisineType: "Africa",
        regionOfOrigin: "Nigeria",
        imageUrl: "/images/recipes/eba-okra.jpg",
        calories: 520,
        type: "MAIN",
        isVegetarian: false,
        isVegan: false,
        isGlutenFree: true,
        isPescatarian: false,
        isLactoseFree: true,
        isNutFree: true,
        isFermented: true,
        isLowFodmap: false,
        ingredients: [
          { name: "Garri (Cassava Flour)", amount: 3, unit: "cups", notes: "white or yellow, finely processed" },
          { name: "Water", amount: 4, unit: "cups", notes: "boiling, for eba" },
          { name: "Fresh Okra", amount: 500, unit: "g", notes: "sliced thinly" },
          { name: "Beef", amount: 300, unit: "g", notes: "cut into bite-sized pieces" },
          { name: "Assorted Meat", amount: 300, unit: "g", notes: "tripe, cow skin (ponmo), etc. (optional)" },
          { name: "Smoked Fish", amount: 200, unit: "g", notes: "cleaned and deboned" },
          { name: "Stockfish", amount: 100, unit: "g", notes: "soaked overnight and deboned" },
          { name: "Palm Oil", amount: 0.33, unit: "cup", notes: "" },
          { name: "Onions", amount: 1, unit: "medium", notes: "finely chopped" },
          { name: "Scotch Bonnet Peppers", amount: 2, unit: "medium", notes: "blended or finely chopped, adjust to taste" },
          { name: "Crayfish", amount: 3, unit: "tbsp", notes: "ground" },
          { name: "Ogiri/Iru", amount: 1, unit: "tbsp", notes: "fermented locust beans (optional)" },
          { name: "Bouillon Cubes", amount: 2, unit: "cubes", notes: "" },
          { name: "Salt", amount: 1, unit: "tsp", notes: "or to taste" },
          { name: "Water", amount: 4, unit: "cups", notes: "for soup" },
          { name: "Spinach or Bitter Leaf", amount: 1, unit: "cup", notes: "washed and chopped (optional)" }
        ],
        instructions: [
          { stepNumber: 1, description: "Start by preparing the protein: In a pot, combine beef, assorted meat, bouillon cube, salt, and 1 cup of water. Cook until tender, about 25-30 minutes." },
          { stepNumber: 2, description: "While the meat is cooking, wash and slice the okra very thinly. The thinner the slices, the more viscous your soup will be." },
          { stepNumber: 3, description: "Break the smoked fish and soaked stockfish into pieces, ensuring all bones are removed." },
          { stepNumber: 4, description: "Once the meat is tender, add 3 more cups of water to the pot with the meat and its stock. Bring to a boil." },
          { stepNumber: 5, description: "Add the smoked fish and stockfish to the pot. Cook for 5 minutes." },
          { stepNumber: 6, description: "Add palm oil, chopped onions, ground crayfish, ogiri/iru (if using), and scotch bonnet peppers to the pot. Stir well." },
          { stepNumber: 7, description: "Allow to simmer for 5 minutes, then add the sliced okra. Stir gently to prevent the okra from becoming too soft." },
          { stepNumber: 8, description: "Cook for 5-7 minutes until the okra is tender but still green and the soup has developed a viscous, stretchy texture." },
          { stepNumber: 9, description: "If using, add the chopped spinach or bitter leaf and cook for 2 more minutes." },
          { stepNumber: 10, description: "Taste and adjust seasoning with salt and bouillon if necessary. The soup is ready when it has a good slimy consistency." },
          { stepNumber: 11, description: "To prepare the eba: Boil 4 cups of water in a large pot." },
          { stepNumber: 12, description: "Gradually add the garri to the hot water while stirring vigorously with a wooden spatula to prevent lumps." },
          { stepNumber: 13, description: "Continue stirring until all the garri is incorporated and the mixture forms a smooth, stiff dough." },
          { stepNumber: 14, description: "Cover the pot and let it steam on low heat for 2 minutes." },
          { stepNumber: 15, description: "Serve the eba hot, shaped into smooth balls or ovals, alongside the okra soup in separate bowls." }
        ],
        notes: [
          "The slimier the okra soup, the more authentic and enjoyable it is considered in Nigerian cuisine. Achieve this by cutting the okra very finely and not overcooking it.",
          "Yellow garri gives eba a slightly sour taste and is preferred in some regions, while white garri has a milder flavor.",
          "To eat traditionally, take a small piece of eba with your fingers, form a small indentation, and use it to scoop up the soup.",
          "You can add periwinkles, shrimp, or cow foot to the soup for extra flavor and texture.",
          "Some regions add a little baking soda to the okra soup to enhance the viscosity, though this is not necessary if the okra is fresh and properly sliced.",
          "Fermented Ingredients: Garri (cassava flour) is produced through fermentation. Ogiri/Iru (locust beans) are fermented.",
          "FODMAP Information: High-FODMAP ingredients include Garri (fermented cassava, potentially high FODMAP), Okra (fructans/GOS - moderate), Onions (fructans), Ogiri/Iru (FODMAP content variable), and Bouillon Cubes (check for onion/garlic). Low-FODMAP: Water, Beef, Assorted meat (check types), Smoked fish (check additives), Stockfish (check additives), Palm oil, Scotch bonnet peppers (test tolerance), Crayfish (check additives), Salt, Spinach.",
          "Low-FODMAP Recommendations: Substitute Eba (Garri) with plain rice or quinoa. Limit okra portion to 1/2 cup (75g) slices per serve. Omit onions and Ogiri/Iru. Use low-FODMAP bouillon/stock cubes.",
          "Vitamins & Minerals: Garri provides carbohydrates. Okra is a good source of fiber, Vitamin C, and Vitamin K. Beef and assorted meats offer protein, iron, and zinc. Smoked fish/Stockfish contribute protein and calcium. Palm oil provides Vitamin E. Crayfish adds protein and minerals. Spinach offers iron, Vitamin K, and Vitamin A."
        ],
        nutritionFacts: {
          protein: 38,
          carbs: 65,
          fat: 19,
          fiber: 8,
          sugar: 3,
          sodium: 650
        }
      },
      {
        title: "Kelewele",
        description: "A popular Ghanaian street food consisting of spicy, fried plantain cubes seasoned with a zesty blend of ginger, garlic, cayenne pepper, and aromatic spices. These golden-brown, caramelized plantain bites offer a perfect balance of sweetness and heat, with crispy edges and a soft interior. Typically enjoyed as a snack or side dish, kelewele is a beloved staple of Ghanaian cuisine.",
        cookingTime: 30,
        servings: 4,
        difficulty: "EASY",
        cuisineType: "Africa",
        regionOfOrigin: "Ghana",
        imageUrl: "/images/recipes/ghanaian-kelewele.jpg",
        calories: 280,
        type: "APPETIZER",
        isVegetarian: true,
        isVegan: true,
        isGlutenFree: true,
        isPescatarian: false,
        isLactoseFree: true,
        isNutFree: true,
        isFermented: false,
        isLowFodmap: false,
        ingredients: [
          { name: "Ripe Plantains", amount: 4, unit: "large", notes: "yellow with black spots, not too soft" },
          { name: "Fresh Ginger", amount: 2, unit: "inches", notes: "peeled and grated" },
          { name: "Garlic", amount: 3, unit: "cloves", notes: "minced" },
          { name: "Onion", amount: 0.5, unit: "medium", notes: "finely grated" },
          { name: "Cayenne Pepper", amount: 1, unit: "tsp", notes: "adjust to taste" },
          { name: "Ground Nutmeg", amount: 0.5, unit: "tsp", notes: "" },
          { name: "Ground Cloves", amount: 0.25, unit: "tsp", notes: "" },
          { name: "Anise Seeds", amount: 0.5, unit: "tsp", notes: "crushed (optional)" },
          { name: "Salt", amount: 0.5, unit: "tsp", notes: "or to taste" },
          { name: "Vegetable Oil", amount: 2, unit: "cups", notes: "for deep frying" },
          { name: "Roasted Peanuts", amount: 0.25, unit: "cup", notes: "chopped, for garnish (optional)" }
        ],
        instructions: [
          { stepNumber: 1, description: "Peel the plantains and cut them into 1-inch cubes or diagonal slices, depending on your preference." },
          { stepNumber: 2, description: "In a large bowl, combine the grated ginger, minced garlic, grated onion, cayenne pepper, nutmeg, ground cloves, anise seeds (if using), and salt to make the marinade." },
          { stepNumber: 3, description: "Add the plantain pieces to the spice mixture and gently toss until all pieces are evenly coated. Be careful not to mash the plantains." },
          { stepNumber: 4, description: "Let the plantains marinate in the spice mixture for 15-30 minutes to absorb the flavors." },
          { stepNumber: 5, description: "Heat the vegetable oil in a deep pan or pot to 350°F (175°C). The oil should be about 2 inches deep." },
          { stepNumber: 6, description: "Test the oil readiness by dropping a small piece of plantain - it should sizzle and rise to the surface immediately." },
          { stepNumber: 7, description: "Working in batches to avoid overcrowding, carefully add the marinated plantain pieces to the hot oil." },
          { stepNumber: 8, description: "Fry until golden brown and crispy on the outside, about 3-4 minutes, turning occasionally for even cooking." },
          { stepNumber: 9, description: "Using a slotted spoon, remove the fried kelewele and drain on paper towels to remove excess oil." },
          { stepNumber: 10, description: "Serve hot, garnished with chopped roasted peanuts if desired." }
        ],
        notes: [
          "The perfect plantains for kelewele should be ripe (yellow with black spots) but still firm. If they're too soft, they'll absorb too much oil.",
          "Some Ghanaian cooks add a sprinkle of sugar to the marinade for extra caramelization, though this is a modern adaptation.",
          "For an authentic touch, wrap the finished kelewele in paper cones made from old newspaper, as it's commonly served by street vendors in Ghana.",
          "Kelewele pairs wonderfully with roasted peanuts (sometimes called 'Koose') and can be enjoyed with a cold beer or as a side dish with rice and stew.",
          "For a quick version, you can substitute the individual spices with a pre-mixed kelewele spice blend, available in some African grocery stores.",
          "FODMAP Information: High-FODMAP ingredients include Ripe Plantains (fructans - moderate), Garlic (fructans), and Onion (fructans). Low-FODMAP ingredients: Ginger, Spices (check purity), Salt, Oil, Peanuts (limit 32 nuts).",
          "Low-FODMAP Recommendations: Limit ripe plantain portion size to 1/3 medium (45g). Omit garlic and onion from the marinade. Consider flavoring primarily with ginger, cayenne, salt, and other low-FODMAP spices. Limit peanut garnish.",
          "Vitamins & Minerals: Plantains are rich in carbohydrates, potassium, Vitamin A, and Vitamin C. Ginger and garlic offer anti-inflammatory compounds and antioxidants. Spices like nutmeg and cloves provide manganese and antioxidants. Peanuts contribute protein, healthy fats, and magnesium."
        ],
        nutritionFacts: {
          protein: 2,
          carbs: 48,
          fat: 10,
          fiber: 4,
          sugar: 22,
          sodium: 150
        }
      },
      {
        title: "Hilsa Fish Curry",
        description: "A quintessential Bengali delicacy featuring the prized hilsa fish (ilish) cooked in a tangy mustard sauce. This iconic dish showcases the distinctive flavor of hilsa, often called the 'king of fish' in Bengal, complemented by the pungent kick of mustard and the warming heat of green chilies. Traditionally enjoyed during monsoon season when hilsa is at its best, this curry is a celebration of Bengali culinary heritage.",
        cookingTime: 45,
        servings: 4,
        difficulty: "MEDIUM",
        cuisineType: "Asia",
        regionOfOrigin: "Bengal (India/Bangladesh)",
        imageUrl: "/images/recipes/hilsa-fish-curry.jpg",
        calories: 380,
        type: "MAIN",
        isVegetarian: false,
        isVegan: false,
        isGlutenFree: true,
        isPescatarian: true,
        isLactoseFree: true,
        isNutFree: true,
        isFermented: false,
        isLowFodmap: true,
        ingredients: [
          { name: "Hilsa Fish", amount: 800, unit: "g", notes: "cut into 2-inch steaks (with bone)" },
          { name: "Yellow Mustard Seeds", amount: 3, unit: "tbsp", notes: "" },
          { name: "Black Mustard Seeds", amount: 1, unit: "tbsp", notes: "" },
          { name: "Green Chilies", amount: 6, unit: "medium", notes: "4 slit lengthwise, 2 for paste" },
          { name: "Turmeric Powder", amount: 1, unit: "tsp", notes: "divided" },
          { name: "Nigella Seeds (Kalonji)", amount: 0.5, unit: "tsp", notes: "" },
          { name: "Mustard Oil", amount: 5, unit: "tbsp", notes: "divided" },
          { name: "Salt", amount: 1, unit: "tsp", notes: "or to taste" },
          { name: "Sugar", amount: 0.5, unit: "tsp", notes: "to balance flavors" },
          { name: "Water", amount: 1, unit: "cup", notes: "" }
        ],
        instructions: [
          { stepNumber: 1, description: "Clean the hilsa fish pieces and pat them dry. Rub with 0.5 tsp turmeric and 0.5 tsp salt. Let marinate for 15 minutes." },
          { stepNumber: 2, description: "Soak the yellow and black mustard seeds in warm water for 15-20 minutes." },
          { stepNumber: 3, description: "Drain the soaked mustard seeds and blend them with 2 green chilies and 0.25 cup water to make a smooth paste. The paste should have a thick but pourable consistency." },
          { stepNumber: 4, description: "Heat 3 tbsp mustard oil in a heavy-bottomed pan until it reaches smoking point. Then remove from heat and let it cool slightly until it stops smoking." },
          { stepNumber: 5, description: "Return the pan to medium heat and carefully add the fish pieces. Fry gently for about 2 minutes on each side until lightly golden. Remove and set aside." },
          { stepNumber: 6, description: "In the same pan, add the remaining 2 tbsp mustard oil. When hot, add nigella seeds and let them splutter for a few seconds." },
          { stepNumber: 7, description: "Add the remaining 0.5 tsp turmeric powder to the oil and stir quickly to prevent burning." },
          { stepNumber: 8, description: "Immediately add the mustard paste and stir continuously on medium-low heat for 3-4 minutes. The raw smell of mustard should disappear." },
          { stepNumber: 9, description: "Add the remaining salt, sugar, and 0.75 cup water. Bring to a gentle simmer." },
          { stepNumber: 10, description: "Carefully add the fried fish pieces and the 4 slit green chilies to the curry. Cover and cook on low heat for 8-10 minutes." },
          { stepNumber: 11, description: "Gently shake the pan occasionally instead of stirring to prevent breaking the fish pieces." },
          { stepNumber: 12, description: "Once the gravy thickens slightly and oil surfaces on top, the curry is ready." },
          { stepNumber: 13, description: "Serve hot with steamed rice, garnished with a drizzle of raw mustard oil if desired." }
        ],
        notes: [
          "Hilsa (Ilish) fish is known for its numerous fine bones - eat carefully and traditionally with your fingers to better detect them.",
          "The authentic Bengali preparation involves neither stirring the curry nor flipping the fish too many times to maintain the delicate texture.",
          "Mustard oil is essential for the authentic flavor - it should be heated until it reaches its smoking point to reduce its pungency.",
          "During monsoon season (June to September), hilsa is at its fattiest and most flavorful.",
          "If hilsa is unavailable, you can substitute with other oily fish like mackerel or herring, though the flavor will differ.",
          "FODMAP Information: All ingredients are generally considered Low FODMAP in the quantities used. Mustard seeds are low FODMAP.",
          "Low-FODMAP Recommendations: This dish is naturally low FODMAP. Ensure turmeric and other spices are pure without additives.",
          "Vitamins & Minerals: Hilsa fish is exceptionally rich in Omega-3 fatty acids, protein, Vitamin D, and selenium. Mustard seeds provide selenium and magnesium. Mustard oil contains monounsaturated fats. Turmeric offers curcumin with anti-inflammatory benefits. Green chilies contain Vitamin C."
        ],
        nutritionFacts: {
          protein: 25,
          carbs: 3,
          fat: 29,
          fiber: 1,
          sugar: 1,
          sodium: 450
        }
      },
      {
        title: "Horiatiki Greek Salad",
        description: "The authentic Greek salad known as 'Horiatiki' (village salad) features ripe tomatoes, cucumber, bell pepper, onion, Kalamata olives, and a generous slab of feta cheese, all dressed with extra virgin olive oil and dried oregano. This rustic, refreshing dish embodies the simplicity and quality-focused philosophy of Mediterranean cuisine, allowing the natural flavors of fresh, seasonal ingredients to shine through.",
        cookingTime: 15,
        servings: 4,
        difficulty: "EASY",
        cuisineType: "Europe",
        regionOfOrigin: "Greece",
        imageUrl: "/images/recipes/horiatiki-greek-salad.jpg",
        calories: 310,
        type: "SALAD",
        isVegetarian: true,
        isVegan: false,
        isGlutenFree: true,
        isLactoseFree: false,
        isNutFree: true,
        isPescatarian: false,
        isFermented: true,
        isLowFodmap: false,
        ingredients: [
          { name: "Tomatoes", amount: 4, unit: "large", notes: "ripe, cut into wedges or large chunks" },
          { name: "Cucumber", amount: 1, unit: "large", notes: "partially peeled and sliced into thick half-moons" },
          { name: "Green Bell Pepper", amount: 1, unit: "medium", notes: "deseeded and sliced into rings" },
          { name: "Red Onion", amount: 1, unit: "small", notes: "thinly sliced" },
          { name: "Kalamata Olives", amount: 16, unit: "whole", notes: "with pits" },
          { name: "Feta Cheese", amount: 200, unit: "g", notes: "in one piece, not crumbled" },
          { name: "Extra Virgin Olive Oil", amount: 4, unit: "tbsp", notes: "highest quality available" },
          { name: "Dried Oregano", amount: 1, unit: "tsp", notes: "Greek oregano preferred" },
          { name: "Sea Salt", amount: 0.5, unit: "tsp", notes: "or to taste" },
          { name: "Capers", amount: 1, unit: "tbsp", notes: "drained (optional)" },
          { name: "Red Wine Vinegar", amount: 1, unit: "tsp", notes: "optional, not traditional" }
        ],
        instructions: [
          { stepNumber: 1, description: "Select a wide, shallow serving bowl or platter for the salad." },
          { stepNumber: 2, description: "Cut the tomatoes into wedges or large chunks and place them in the bowl." },
          { stepNumber: 3, description: "Partially peel the cucumber, leaving strips of skin for color and texture. Slice into thick half-moons and add to the bowl." },
          { stepNumber: 4, description: "Remove the seeds from the bell pepper and slice into rings. Add to the bowl." },
          { stepNumber: 5, description: "Thinly slice the red onion and add to the vegetables." },
          { stepNumber: 6, description: "Scatter the Kalamata olives and capers (if using) over the vegetables." },
          { stepNumber: 7, description: "Place the whole piece of feta cheese on top of the salad. Traditionally, it's placed as a large slab in the center, not crumbled." },
          { stepNumber: 8, description: "Drizzle the extra virgin olive oil generously over the entire salad." },
          { stepNumber: 9, description: "Sprinkle with dried oregano and sea salt to taste." },
          { stepNumber: 10, description: "If using red wine vinegar (though not traditional), drizzle a small amount over the vegetables." },
          { stepNumber: 11, description: "Allow the salad to rest for about 5 minutes before serving to let the flavors meld." },
          { stepNumber: 12, description: "Serve with crusty bread to mop up the flavorful juices at the bottom of the bowl." }
        ],
        notes: [
          "For authentic Horiatiki, never include lettuce or any other leafy greens - these are not part of the traditional recipe.",
          "The quality of ingredients is paramount - use the ripest tomatoes, the best extra virgin olive oil, and authentic Greek feta made from sheep's milk (or a mixture of sheep and goat milk).",
          "In Greece, this salad is typically enjoyed as a starter shared among the table, with each person served a portion of the feta.",
          "Allow the salad to come to room temperature before serving to enhance the flavors - never serve cold from the refrigerator.",
          "Some regions in Greece may add a sprinkle of caper berries or a few sprigs of fresh purslane when in season.",
          "Fermented Ingredients: Kalamata Olives are cured through fermentation/brining. Feta Cheese is made using lactic acid fermentation. Capers are often brined, involving fermentation. Red Wine Vinegar is produced via acetic acid fermentation.",
          "FODMAP Information: High-FODMAP ingredients include Red Onion (fructans) and Feta Cheese (lactose - moderate). Low-FODMAP ingredients: Tomatoes (limit 1/2 medium), Cucumber, Green Bell Pepper (limit 1/2 cup), Kalamata Olives (limit 15 small), Olive Oil, Oregano, Salt, Capers (limit 1 tbsp), Red Wine Vinegar (limit 2 tbsp).",
          "Low-FODMAP Recommendations: Omit red onion or use only the green parts of spring onions. Limit feta cheese portion to 1.5 oz (40g) per serve. Ensure individual vegetable portions stay within low-FODMAP limits.",
          "Vitamins & Minerals: Tomatoes provide Vitamin C and lycopene. Cucumbers offer hydration and Vitamin K. Bell peppers are rich in Vitamin C. Olives contain healthy monounsaturated fats and Vitamin E. Feta cheese supplies calcium and protein. Olive oil provides healthy fats and Vitamin E. Oregano adds antioxidants."
        ],
        nutritionFacts: {
          protein: 9,
          carbs: 10,
          fat: 26,
          fiber: 3,
          sugar: 6,
          sodium: 750
        }
      },
      {
        title: "Korean Bibimbap",
        description: "Bibimbap is a colorful and nutritious Korean rice bowl featuring steamed white rice topped with an array of seasoned vegetables (namul), protein, a fried egg, and gochujang (Korean chili paste). The dish's name literally means 'mixed rice,' as all components are stirred together just before eating, creating a harmonious blend of flavors and textures. This iconic Korean comfort food offers a perfect balance of carbohydrates, proteins, and vegetables in one beautiful bowl.",
        cookingTime: 90,
        servings: 4,
        difficulty: "MEDIUM",
        cuisineType: "Asia",
        regionOfOrigin: "Korea",
        imageUrl: "/images/recipes/korean-bibimbap.jpg",
        calories: 520,
        type: "MAIN",
        isVegetarian: false,
        isVegan: false,
        isGlutenFree: false,
        isLactoseFree: true,
        isNutFree: false,
        isPescatarian: false,
        isFermented: true,
        isLowFodmap: false,
        ingredients: [
          { name: "Short-grain Rice", amount: 2, unit: "cups", notes: "uncooked" },
          { name: "Beef Sirloin", amount: 300, unit: "g", notes: "thinly sliced (can substitute with tofu for vegetarian version)" },
          { name: "Spinach", amount: 250, unit: "g", notes: "fresh" },
          { name: "Bean Sprouts", amount: 200, unit: "g", notes: "fresh" },
          { name: "Carrots", amount: 2, unit: "medium", notes: "julienned" },
          { name: "Zucchini", amount: 1, unit: "medium", notes: "julienned" },
          { name: "Shiitake Mushrooms", amount: 100, unit: "g", notes: "stems removed, thinly sliced" },
          { name: "Eggs", amount: 4, unit: "large", notes: "one per serving" },
          { name: "Garlic", amount: 4, unit: "cloves", notes: "minced" },
          { name: "Soy Sauce", amount: 4, unit: "tbsp", notes: "divided" },
          { name: "Sesame Oil", amount: 5, unit: "tbsp", notes: "divided" },
          { name: "Gochujang (Korean Chili Paste)", amount: 4, unit: "tbsp", notes: "adjust to taste" },
          { name: "Sugar", amount: 2, unit: "tsp", notes: "divided" },
          { name: "Sesame Seeds", amount: 2, unit: "tbsp", notes: "toasted" },
          { name: "Green Onions", amount: 3, unit: "stalks", notes: "chopped" },
          { name: "Vegetable Oil", amount: 4, unit: "tbsp", notes: "for cooking" },
          { name: "Salt", amount: 1, unit: "tsp", notes: "or to taste" }
        ],
        instructions: [
          { stepNumber: 1, description: "Rinse the rice until water runs clear. Cook according to package instructions or in a rice cooker. Set aside and keep warm." },
          { stepNumber: 2, description: "Beef Marinade: Combine beef slices with 2 tbsp soy sauce, 1 tbsp sesame oil, 1 tsp sugar, and 1 clove minced garlic. Marinate for at least 30 minutes." },
          { stepNumber: 3, description: "Prepare the Vegetables: Heat 1 tbsp vegetable oil in a pan over medium heat. Add spinach and 1 clove minced garlic, stir-fry until wilted (about 1 minute). Remove from heat, squeeze out excess water, and season with 1/2 tbsp sesame oil and a pinch of salt." },
          { stepNumber: 4, description: "Blanch bean sprouts in boiling water for 2 minutes. Drain, rinse with cold water, and mix with 1/2 tbsp sesame oil, a pinch of salt, and some chopped green onions." },
          { stepNumber: 5, description: "Sauté carrots in 1 tbsp vegetable oil for 2 minutes until slightly softened. Season with a pinch of salt. Remove from pan and set aside." },
          { stepNumber: 6, description: "Sauté zucchini in 1 tbsp vegetable oil for 2 minutes until slightly softened. Season with a pinch of salt. Remove from pan and set aside." },
          { stepNumber: 7, description: "Sauté mushrooms with 1 clove minced garlic in 1 tbsp vegetable oil until soft and slightly browned. Add 1 tbsp soy sauce and 1/2 tsp sugar. Cook until liquid is absorbed. Set aside." },
          { stepNumber: 8, description: "Cook the marinated beef in the same pan over medium-high heat until well-browned and cooked through, about 3-4 minutes. Set aside." },
          { stepNumber: 9, description: "In the same pan, fry the eggs sunny-side up or over easy, keeping the yolk runny." },
          { stepNumber: 10, description: "Prepare the Gochujang Sauce: Mix 4 tbsp gochujang, 1 tbsp sesame oil, 1 tbsp soy sauce, 1 clove minced garlic, and 1/2 tsp sugar." },
          { stepNumber: 11, description: "Assemble the Bibimbap: Divide warm rice among four bowls. Arrange the cooked beef and prepared vegetables on top of the rice in separate sections, creating a colorful presentation." },
          { stepNumber: 12, description: "Place a fried egg in the center of each bowl. Sprinkle with toasted sesame seeds and remaining chopped green onions." },
          { stepNumber: 13, description: "Serve each bowl with a portion of the gochujang sauce on the side. Instruct diners to add the sauce according to their spice preference and mix everything together thoroughly before eating." }
        ],
        notes: [
          "Traditional bibimbap is sometimes served in a heated stone bowl (dolsot bibimbap), which creates a crispy rice crust at the bottom.",
          "For dolsot bibimbap, heat stone bowls in the oven at 400°F (200°C) for 30 minutes, coat with sesame oil, add rice and toppings, then let it sit for a few minutes to create the crispy bottom.",
          "The vegetables can be prepared in advance and refrigerated, making assembly quicker at mealtime.",
          "For a vegetarian version, substitute the beef with firm tofu marinated in the same sauce, or use additional mushrooms.",
          "Customize with your favorite vegetables - fernbrake (gosari), bellflower root (doraji), or cucumber are other traditional options.",
          "Fermented Ingredients: Soy Sauce is made from fermented soybeans and wheat. Gochujang is a fermented paste of chili, rice, and soybeans.",
          "FODMAP Information: High-FODMAP ingredients include Shiitake Mushrooms (polyols), Garlic (fructans), and Gochujang (check label for HFCS, onion/garlic). Moderate FODMAP: Soy Sauce (limit 2 tbsp), Bean Sprouts (limit 3/4 cup). Low FODMAP: Rice, Beef, Spinach, Carrots, Zucchini, Eggs, Sesame Oil, Sugar, Sesame Seeds, Green Onion tops, Oil, Salt.",
          "Low-FODMAP Recommendations: Replace shiitake mushrooms with low-FODMAP oyster mushrooms or omit. Omit garlic; use garlic-infused oil. Use only the green parts of green onions. Use a certified low-FODMAP gochujang or make a substitute sauce (e.g., combining paprika, maple syrup, vinegar - check individual FODMAP levels). Limit soy sauce and bean sprout portions.",
          "Vitamins & Minerals: Rice provides carbohydrates. Beef offers protein, iron, and B12. Spinach is rich in iron, Vitamin K, and Vitamin A. Carrots supply Vitamin A. Zucchini provides Vitamin C. Mushrooms contain B vitamins. Eggs are a source of protein and choline. Soy sauce adds umami and sodium. Sesame oil contributes healthy fats and Vitamin E."
        ],
        nutritionFacts: {
          protein: 28,
          carbs: 65,
          fat: 20,
          fiber: 6,
          sugar: 8,
          sodium: 1100
        }
      },
      {
        title: "فتوش (Fattoush Salad)",
        description: "A vibrant Levantine bread salad that combines fresh vegetables, herbs, and toasted or fried pita bread, all dressed with a tangy sumac-infused vinaigrette. This refreshing dish showcases the bright flavors of Mediterranean cuisine with its perfect balance of crisp textures, herbal notes, and zesty dressing. Fattoush is a traditional way to use leftover pita bread and celebrates the simple, fresh ingredients central to Lebanese cooking.",
        cookingTime: 25,
        servings: 6,
        difficulty: "EASY",
        cuisineType: "Asia",
        regionOfOrigin: "Lebanon",
        imageUrl: "/images/recipes/fattoush.jpg",
        calories: 240,
        type: "SALAD",
        isVegetarian: true,
        isVegan: true,
        isGlutenFree: false,
        isLactoseFree: true,
        isNutFree: true,
        isPescatarian: false,
        isFermented: true,
        isLowFodmap: false,
        ingredients: [
          { name: "Pita Bread", amount: 2, unit: "large", notes: "day-old or toasted until crisp" },
          { name: "Romaine Lettuce", amount: 1, unit: "head", notes: "chopped into bite-sized pieces" },
          { name: "Cucumber", amount: 2, unit: "medium", notes: "diced" },
          { name: "Tomatoes", amount: 4, unit: "medium", notes: "diced" },
          { name: "Green Bell Pepper", amount: 1, unit: "medium", notes: "seeded and diced" },
          { name: "Radishes", amount: 6, unit: "medium", notes: "thinly sliced" },
          { name: "Green Onions", amount: 4, unit: "stalks", notes: "finely chopped" },
          { name: "Fresh Mint Leaves", amount: 0.5, unit: "cup", notes: "roughly chopped" },
          { name: "Fresh Parsley", amount: 1, unit: "cup", notes: "roughly chopped" },
          { name: "Fresh Purslane", amount: 0.5, unit: "cup", notes: "leaves only, optional" },
          { name: "Extra Virgin Olive Oil", amount: 0.33, unit: "cup" },
          { name: "Lemon Juice", amount: 0.25, unit: "cup", notes: "freshly squeezed" },
          { name: "Garlic", amount: 2, unit: "cloves", notes: "minced" },
          { name: "Sumac", amount: 2, unit: "tbsp", notes: "plus extra for garnish" },
          { name: "Pomegranate Molasses", amount: 1, unit: "tbsp", notes: "optional" },
          { name: "Salt", amount: 0.75, unit: "tsp", notes: "or to taste" },
          { name: "Black Pepper", amount: 0.25, unit: "tsp", notes: "freshly ground" }
        ],
        instructions: [
          { stepNumber: 1, description: "If using day-old pita, break or cut into bite-sized pieces. If using fresh pita, toast in a 350°F (175°C) oven until crisp and golden, about 10 minutes, then break into pieces." },
          { stepNumber: 2, description: "In a small bowl, prepare the dressing by whisking together olive oil, lemon juice, minced garlic, sumac, pomegranate molasses (if using), salt, and pepper. Set aside to allow flavors to meld." },
          { stepNumber: 3, description: "In a large salad bowl, combine the chopped romaine lettuce, cucumber, tomatoes, bell pepper, radishes, and green onions." },
          { stepNumber: 4, description: "Add the chopped mint, parsley, and purslane (if using) to the vegetable mixture." },
          { stepNumber: 5, description: "Just before serving, add the pita bread pieces to the salad. If added too early, they will become soggy." },
          { stepNumber: 6, description: "Pour the dressing over the salad and toss gently to combine, ensuring all ingredients are coated with the dressing." },
          { stepNumber: 7, description: "Let the salad rest for 2-3 minutes to allow the bread to slightly absorb the dressing while still maintaining some crunch." },
          { stepNumber: 8, description: "Serve immediately, sprinkled with an additional pinch of sumac for garnish." }
        ],
        notes: [
          "For a more authentic version, try to find purslane, a lemony-flavored succulent herb often used in Middle Eastern cuisine.",
          "The bread should have some crunch, but not be completely hard - it should soften slightly in the dressing while still providing texture.",
          "Sumac is essential for authentic flavor - this deep red spice adds a distinctive tangy, lemony note that defines fattoush.",
          "In Lebanon, fattoush is often served as part of a mezze spread alongside hummus, baba ganoush, and tabbouleh.",
          "For a variation, you can fry the pita bread in olive oil instead of toasting, which adds richness to the salad.",
          "Fermented Ingredients: Pita Bread relies on yeast fermentation. Pomegranate Molasses production can involve fermentation processes.",
          "FODMAP Information: High-FODMAP ingredients include Pita Bread (fructans), Garlic (fructans), and Pomegranate Molasses (fructose/fructans). Low/Moderate FODMAP: Tomatoes (limit 1/2 medium), Green Bell Pepper (limit 1/2 cup), Radishes (limit 2), Green Onions (green parts only). Low FODMAP: Lettuce, Cucumber, Herbs, Olive Oil, Lemon Juice, Sumac, Salt, Pepper.",
          "Low-FODMAP Recommendations: Use gluten-free pita bread (check ingredients). Omit garlic from dressing; use garlic-infused oil instead. Use only the green parts of green onions. Limit pomegranate molasses to 1 tsp per serve or omit. Ensure vegetable portions stay within low-FODMAP limits.",
          "Vitamins & Minerals: Romaine lettuce provides Vitamin K and A. Cucumbers offer hydration. Tomatoes supply Vitamin C and lycopene. Bell peppers are rich in Vitamin C. Radishes contain Vitamin C. Herbs like mint and parsley provide antioxidants and vitamins (K, C). Olive oil adds healthy fats and Vitamin E. Lemon juice offers Vitamin C. Sumac is rich in antioxidants."
        ],
        nutritionFacts: {
          protein: 5,
          carbs: 28,
          fat: 14,
          fiber: 6,
          sugar: 7,
          sodium: 380
        }
      },
      {
        title: "Liberian Rice Bread",
        description: "A traditional Liberian sweet bread made from rice flour, creating a dense, moist loaf with a unique texture and subtle sweetness. This staple bread represents Liberia's resourcefulness in using locally abundant rice as a wheat flour alternative. Often enjoyed as a breakfast food or snack, Liberian rice bread pairs wonderfully with hot tea or coffee and can be enhanced with various spices, fruit, or nuts.",
        cookingTime: 90,
        servings: 8,
        difficulty: "MEDIUM",
        cuisineType: "Africa",
        regionOfOrigin: "Liberia",
        imageUrl: "/images/recipes/liberian-rice-bread.jpg",
        calories: 280,
        type: "BREAD",
        isVegetarian: true,
        isVegan: false,
        isGlutenFree: true,
        isLactoseFree: false,
        isNutFree: true,
        isPescatarian: false,
        isFermented: true,
        isLowFodmap: false,
        ingredients: [
          { name: "Rice", amount: 2, unit: "cups", notes: "white, uncooked, or 3 cups rice flour" },
          { name: "Milk", amount: 1, unit: "cup", notes: "warm" },
          { name: "Butter", amount: 0.5, unit: "cup", notes: "melted and cooled" },
          { name: "Eggs", amount: 3, unit: "large", notes: "room temperature" },
          { name: "Sugar", amount: 0.75, unit: "cup" },
          { name: "Baking Powder", amount: 1, unit: "tbsp" },
          { name: "Salt", amount: 0.5, unit: "tsp" },
          { name: "Vanilla Extract", amount: 1, unit: "tbsp" },
          { name: "Nutmeg", amount: 0.5, unit: "tsp", notes: "freshly grated" },
          { name: "Cinnamon", amount: 0.5, unit: "tsp", notes: "ground" },
          { name: "Banana", amount: 1, unit: "ripe", notes: "mashed (optional)" },
          { name: "Raisins", amount: 0.5, unit: "cup", notes: "optional" }
        ],
        instructions: [
          { stepNumber: 1, description: "If using whole rice: Rinse the rice thoroughly and soak in water overnight or for at least 6 hours. Drain well." },
          { stepNumber: 2, description: "Preheat the oven to 350°F (175°C). Grease a 9x5-inch loaf pan or line with parchment paper." },
          { stepNumber: 3, description: "If using whole rice: Place the soaked rice in a blender with 1/2 cup of the warm milk. Blend until smooth and the consistency of a thick paste. You may need to scrape down the sides several times." },
          { stepNumber: 4, description: "In a large bowl, combine the rice paste (or rice flour if using that instead) with the remaining warm milk. Stir until well combined." },
          { stepNumber: 5, description: "Add the melted butter and sugar to the rice mixture and stir well." },
          { stepNumber: 6, description: "In a separate bowl, beat the eggs until frothy. Add them to the rice mixture along with the vanilla extract." },
          { stepNumber: 7, description: "Add the baking powder, salt, nutmeg, and cinnamon to the batter. Mix thoroughly until all ingredients are well incorporated." },
          { stepNumber: 8, description: "If using, fold in the mashed banana and raisins until evenly distributed throughout the batter." },
          { stepNumber: 9, description: "Pour the batter into the prepared loaf pan, smoothing the top with a spatula." },
          { stepNumber: 10, description: "Bake in the preheated oven for 60-70 minutes, or until a toothpick inserted into the center comes out clean. The top should be golden brown." },
          { stepNumber: 11, description: "Allow the bread to cool in the pan for 15 minutes before transferring to a wire rack to cool completely." },
          { stepNumber: 12, description: "Once cooled, slice and serve. The bread can be stored in an airtight container at room temperature for 2-3 days, or refrigerated for up to a week." }
        ],
        notes: [
          "The texture of Liberian rice bread is denser than wheat bread - this is normal and part of its distinctive character.",
          "For best results when using whole rice, soak it long enough to soften substantially, and blend until very smooth to avoid a gritty texture.",
          "Some traditional recipes use grated coconut or coconut milk instead of regular milk for a tropical flavor.",
          "If the bread starts to brown too quickly during baking, cover loosely with aluminum foil.",
          "This bread can be frozen for up to 3 months. Wrap tightly in plastic wrap and then aluminum foil before freezing.",
          "Fermented Ingredients: Milk and Butter may be cultured. Vanilla Extract production involves fermentation.",
          "FODMAP Information: High-FODMAP ingredients include Milk (lactose) and Raisins (fructans). Ripe Banana (fructans) is moderate FODMAP. Low-FODMAP ingredients: Rice/Rice Flour, Butter (limit 1 tbsp), Eggs, Sugar, Baking Powder, Salt, Vanilla Extract, Nutmeg, Cinnamon.",
          "Low-FODMAP Recommendations: Use lactose-free milk. Omit or strictly limit raisins (max 1 tbsp per serve). Use just-ripe banana instead of overripe, or omit.",
          "Vitamins & Minerals: Rice flour provides carbohydrates. Milk offers calcium and Vitamin D (if fortified). Butter supplies fat and Vitamin A. Eggs are rich in protein, choline, and Vitamin D. Bananas contribute potassium. Raisins offer iron and fiber. Spices like nutmeg and cinnamon contain antioxidants."
        ],
        nutritionFacts: {
          protein: 6,
          carbs: 45,
          fat: 10,
          fiber: 1,
          sugar: 15,
          sodium: 200
        }
      },
        {
          title: "Mafé (Peanut Stew)",
          description: "A rich, savory West African stew centered around a creamy peanut butter sauce, featuring tender meat and vegetables. This hearty dish originated in Mali but is beloved throughout Senegal, Gambia, and neighboring countries. The complex, nutty sauce balances sweet, spicy, and savory elements, creating a comforting meal that showcases the ingenuity of West African cuisine.",
          cookingTime: 120,
          servings: 6,
          difficulty: "MEDIUM",
          cuisineType: "Africa",
          regionOfOrigin: "Senegal/Mali",
          imageUrl: "/images/recipes/mafe-peanut-stew.jpg",
          calories: 580,
          type: "MAIN",
          isVegetarian: false,
          isVegan: false,
          isGlutenFree: true,
          isLactoseFree: true,
          isNutFree: false,
          isPescatarian: false,
          isFermented: true,
          isLowFodmap: false,
          ingredients: [
            { name: "Beef Chuck", amount: 1.5, unit: "lbs", notes: "cut into 1-inch cubes (can substitute with chicken or lamb)" },
            { name: "Natural Peanut Butter", amount: 1, unit: "cup", notes: "unsweetened, smooth" },
            { name: "Tomato Paste", amount: 3, unit: "tbsp" },
            { name: "Onions", amount: 2, unit: "large", notes: "finely chopped" },
            { name: "Garlic", amount: 4, unit: "cloves", notes: "minced" },
            { name: "Ginger", amount: 2, unit: "inches", notes: "peeled and grated" },
            { name: "Scotch Bonnet Pepper", amount: 1, unit: "small", notes: "seeded and minced (adjust to taste)" },
            { name: "Sweet Potatoes", amount: 1, unit: "large", notes: "peeled and cut into chunks" },
            { name: "Carrots", amount: 2, unit: "medium", notes: "peeled and cut into chunks" },
            { name: "Cabbage", amount: 0.25, unit: "head", notes: "cut into large pieces" },
            { name: "Bell Pepper", amount: 1, unit: "medium", notes: "red or green, cut into chunks" },
            { name: "Eggplant", amount: 1, unit: "small", notes: "cut into chunks (optional)" },
            { name: "Chicken Bouillon Cube", amount: 1, unit: "cube", notes: "crumbled" },
            { name: "Bay Leaves", amount: 2, unit: "leaves" },
            { name: "Thyme", amount: 1, unit: "tsp", notes: "dried" },
            { name: "Vegetable Oil", amount: 3, unit: "tbsp" },
            { name: "Water", amount: 4, unit: "cups", notes: "or beef broth" },
            { name: "Salt", amount: 1, unit: "tsp", notes: "or to taste" },
            { name: "Black Pepper", amount: 0.5, unit: "tsp", notes: "ground" }
          ],
          instructions: [
            { stepNumber: 1, description: "Season the meat with salt and black pepper. Heat 2 tablespoons of oil in a large, heavy-bottomed pot over medium-high heat." },
            { stepNumber: 2, description: "Working in batches, brown the meat on all sides, about 3-4 minutes per batch. Transfer to a plate and set aside." },
            { stepNumber: 3, description: "In the same pot, add the remaining oil and sauté the onions until soft and translucent, about 5 minutes." },
            { stepNumber: 4, description: "Add the minced garlic, grated ginger, and scotch bonnet pepper. Sauté for another 1-2 minutes until fragrant." },
            { stepNumber: 5, description: "Stir in the tomato paste and cook for 2 minutes, stirring frequently to prevent burning." },
            { stepNumber: 6, description: "Return the browned meat to the pot along with any accumulated juices. Add the bay leaves and dried thyme." },
            { stepNumber: 7, description: "Pour in the water or broth and bring to a boil. Reduce heat, cover, and simmer for 45 minutes, or until the meat is nearly tender." },
            { stepNumber: 8, description: "In a separate bowl, whisk the peanut butter with 1 cup of the hot liquid from the pot until smooth." },
            { stepNumber: 9, description: "Gradually stir the peanut butter mixture back into the pot. Add the crumbled bouillon cube and stir well." },
            { stepNumber: 10, description: "Add the sweet potatoes and carrots to the pot. Cover and simmer for 15 minutes." },
            { stepNumber: 11, description: "Add the cabbage, bell pepper, and eggplant (if using). Continue cooking for another 15-20 minutes until all vegetables are tender." },
            { stepNumber: 12, description: "Taste and adjust seasoning with salt and pepper as needed. The stew should have a rich, creamy consistency - if too thick, add a little water; if too thin, simmer uncovered to reduce." },
            { stepNumber: 13, description: "Remove bay leaves before serving. Serve hot over steamed rice or with fufu, a starchy side dish." }
          ],
          notes: [
            "The key to authentic mafe is using unsweetened, natural peanut butter - avoid commercial brands with added sugar and stabilizers.",
            "This stew tastes even better the next day as the flavors continue to develop. It keeps well refrigerated for up to 3 days.",
            "Vegetarians can omit the meat and use vegetable broth, adding chickpeas or additional vegetables for protein.",
            "For a thicker sauce, some cooks add a small amount of ground peanuts or ground rice.",
            "The choice of vegetables can vary based on seasonal availability - okra, turnips, and cassava are also traditional additions in different regions.",
            "Fermented Ingredients: Bouillon cubes or broth may contain fermented flavor enhancers.",
            "FODMAP Information: High-FODMAP ingredients include onions (fructans), garlic (fructans), peanut butter (GOS/Fructans - limit serving), sweet potatoes (polyols - limit serving), cabbage (polyols/fructans - limit serving), and potentially bouillon/broth (check for onion/garlic). Low-FODMAP ingredients: beef/chicken/lamb, tomato paste (limit portion), ginger, scotch bonnet (test tolerance), carrots (limit portion), bell pepper (limit portion), eggplant (limit portion), bay leaves, thyme, oil, water, salt, pepper.",
            "Low-FODMAP Recommendations: Omit onions and garlic; use garlic-infused oil and the green parts of leeks or spring onions for flavor. Limit peanut butter to 2 tablespoons per serving. Limit sweet potato to 1/2 cup per serving. Limit cabbage (Savoy) to 1/2 cup per serving. Limit bell pepper and eggplant portions. Use a certified low-FODMAP bouillon cube or broth.",
            "Vitamins & Minerals: Beef provides protein, iron, zinc, and B12. Peanut butter offers protein, healthy fats, magnesium, and niacin. Sweet potatoes are rich in Vitamin A (beta-carotene) and fiber. Carrots also provide Vitamin A. Cabbage offers Vitamin C and K. Bell peppers contribute Vitamin C. Tomato paste provides lycopene."
          ],
          nutritionFacts: {
            protein: 40,
            carbs: 35,
            fat: 32,
            fiber: 8,
            sugar: 12,
            sodium: 650
          }
        },
        {
          title: "Chilaquiles",
          description: "A traditional Mexican breakfast dish featuring crispy tortilla chips simmered in a flavorful salsa until slightly softened, then topped with cheese, crema, avocado, and often a fried egg. Chilaquiles originated as a clever way to use leftover tortillas, transforming them into a satisfying meal that balances textures and flavors. This versatile dish can be prepared with either red (rojo) or green (verde) salsa, each offering a distinct taste experience.",
          cookingTime: 30,
          servings: 4,
          difficulty: "EASY",
          cuisineType: "North America",
          regionOfOrigin: "Mexico",
          imageUrl: "/images/recipes/mexican-chilaquiles.jpg",
          calories: 450,
          type: "BREAKFAST",
          isVegetarian: true,
          isVegan: false,
          isGlutenFree: true,
          isLactoseFree: false,
          isNutFree: true,
          isPescatarian: false,
          isFermented: true,
          isLowFodmap: false,
          ingredients: [
            { name: "Corn Tortillas", amount: 12, unit: "medium", notes: "cut into triangles or strips" },
            { name: "Vegetable Oil", amount: 0.33, unit: "cup", notes: "for frying tortillas (or use store-bought tortilla chips)" },
            { name: "Tomatillos", amount: 1, unit: "lb", notes: "husked and rinsed (for salsa verde)" },
            { name: "Tomatoes", amount: 6, unit: "medium", notes: "for salsa roja option" },
            { name: "Jalapeño Peppers", amount: 2, unit: "medium", notes: "stems removed, seeded if less heat desired" },
            { name: "Serrano Peppers", amount: 1, unit: "medium", notes: "for extra heat (optional)" },
            { name: "White Onion", amount: 1, unit: "medium", notes: "half rough chopped for salsa, half sliced for garnish" },
            { name: "Garlic", amount: 3, unit: "cloves" },
            { name: "Cilantro", amount: 1, unit: "bunch", notes: "stems removed, divided for salsa and garnish" },
            { name: "Chicken Broth", amount: 0.5, unit: "cup", notes: "low sodium" },
            { name: "Queso Fresco", amount: 1, unit: "cup", notes: "crumbled (can substitute with cotija cheese)" },
            { name: "Mexican Crema", amount: 0.5, unit: "cup", notes: "or sour cream thinned with a little milk" },
            { name: "Avocado", amount: 1, unit: "large", notes: "sliced" },
            { name: "Eggs", amount: 4, unit: "large", notes: "optional, for topping" },
            { name: "Refried Beans", amount: 1, unit: "cup", notes: "warm, for serving (optional)" },
            { name: "Salt", amount: 1, unit: "tsp", notes: "or to taste" }
          ],
          instructions: [
            { stepNumber: 1, description: "If making your own tortilla chips: Heat oil in a large skillet over medium-high heat. Fry tortilla triangles in batches until crisp and lightly golden, about 2-3 minutes. Drain on paper towels and sprinkle with a little salt while hot." },
            { stepNumber: 2, description: "For salsa verde: Place tomatillos, jalapeños, half the onion, garlic, and half the cilantro in a medium saucepan. Cover with water and bring to a boil. Reduce heat and simmer for 10 minutes until tomatillos are soft." },
            { stepNumber: 3, description: "Drain the boiled ingredients, reserving 1/4 cup of the cooking liquid. Transfer to a blender with the reserved liquid and blend until smooth. Season with salt to taste." },
            { stepNumber: 4, description: "Alternatively, for salsa roja: Roast tomatoes, jalapeños, and half the onion on a hot comal or in a dry skillet until charred in spots. Blend with garlic and half the cilantro until smooth." },
            { stepNumber: 5, description: "Heat 1 tablespoon oil in a large skillet over medium heat. Carefully pour in the salsa (it may splatter) and cook for 5 minutes, stirring occasionally." },
            { stepNumber: 6, description: "Stir in the chicken broth and bring to a simmer. Taste and adjust seasoning if needed." },
            { stepNumber: 7, description: "Add the tortilla chips to the simmering salsa, gently folding them in to coat evenly. Cook for 2-3 minutes until the chips slightly soften but still retain some texture." },
            { stepNumber: 8, description: "If adding eggs: While the chips simmer in the salsa, heat a separate pan and fry the eggs to your preference (sunny-side up is traditional)." },
            { stepNumber: 9, description: "Divide the chilaquiles among four plates. Top each serving with crumbled queso fresco, a drizzle of crema, sliced avocado, and a fried egg if using." },
            { stepNumber: 10, description: "Garnish with the remaining sliced onion and chopped cilantro. Serve immediately with refried beans on the side if desired." }
          ],
          notes: [
            "The ideal texture for chilaquiles is slightly softened tortilla chips that still maintain some structure - avoid cooking them too long or they'll become mushy.",
            "Store-bought tortilla chips work well for convenience, but homemade chips will give you better control over thickness and saltiness.",
            "For a heartier version, add shredded chicken or chorizo after cooking the salsa and before adding the chips.",
            "Chilaquiles are best served immediately after cooking - they don't keep well once the chips have been added to the salsa.",
            "Regional variations exist throughout Mexico: in some areas, chilaquiles are served with a side of beans or rice, while others layer them like a casserole.",
            "Fermented Ingredients: Mexican Crema or sour cream is typically made using bacterial cultures (fermentation). Queso fresco production may involve cultures. Chicken broth could contain fermented elements.",
            "FODMAP Information: High-FODMAP ingredients include onion (fructans), garlic (fructans), crema/sour cream (lactose), avocado (polyols - limit serving), and refried beans (GOS). Low-FODMAP ingredients: corn tortillas (check ingredients/portion), oil, tomatillos (limit portion), tomatoes (limit portion), jalapeños/serranos (test tolerance), cilantro, queso fresco (check lactose/portion), eggs, salt. Chicken broth should be checked for onion/garlic.",
            "Low-FODMAP Recommendations: Use certified low-FODMAP corn tortillas. Omit onion and garlic from salsa and garnish; use garlic-infused oil for cooking salsa and garnish with green parts of spring onions or chives. Use lactose-free crema/sour cream. Limit avocado to 1/8 per serving. Omit refried beans. Use low-FODMAP chicken broth. Limit salsa portion size.",
            "Vitamins & Minerals: Corn tortillas provide carbohydrates and some fiber. Tomatillos and tomatoes offer Vitamin C and antioxidants. Peppers contribute Vitamin C. Onions and garlic provide various beneficial compounds. Eggs are rich in protein and choline. Avocado provides healthy fats and potassium. Cheese and crema add calcium and fat."
          ],
          nutritionFacts: {
            protein: 15,
            carbs: 45,
            fat: 25,
            fiber: 8,
            sugar: 5,
            sodium: 620
          }
        },
        {
          title: "Moin Moin with Pap",
          description: "A classic Nigerian breakfast combination featuring moin moin (steamed bean pudding) and pap (fermented corn porridge). Moin moin is a savory, protein-rich pudding made from blended black-eyed peas, peppers, and spices, while pap is a smooth, mild porridge that complements the flavorful bean cake. This nutritious pairing is beloved across Nigeria and often served to both children and adults as a wholesome start to the day.",
          cookingTime: 120,
          servings: 6,
          difficulty: "MEDIUM",
          cuisineType: "Africa",
          regionOfOrigin: "Nigeria",
          imageUrl: "/images/recipes/moinmoin-pap.jpg",
          calories: 350,
          type: "BREAKFAST",
          isVegetarian: true,
          isVegan: true,
          isGlutenFree: true,
          isLactoseFree: true,
          isNutFree: true,
          isPescatarian: false,
          isFermented: true,
          isLowFodmap: false,
          ingredients: [
            { name: "Black-eyed Peas", amount: 2, unit: "cups", notes: "dried, for moin moin" },
            { name: "Red Bell Pepper", amount: 1, unit: "medium", notes: "seeded and chopped" },
            { name: "Scotch Bonnet Pepper", amount: 1, unit: "small", notes: "adjust to taste" },
            { name: "Onion", amount: 1, unit: "large", notes: "chopped" },
            { name: "Vegetable Oil", amount: 0.33, unit: "cup" },
            { name: "Bouillon Cube", amount: 1, unit: "cube", notes: "vegetable or chicken flavor" },
            { name: "Salt", amount: 1, unit: "tsp", notes: "or to taste" },
            { name: "Hard-boiled Eggs", amount: 3, unit: "large", notes: "peeled, optional for filling" },
            { name: "Crayfish", amount: 2, unit: "tbsp", notes: "ground, optional" },
            { name: "Corn Flour", amount: 2, unit: "cups", notes: "white, finely ground, for pap" },
            { name: "Water", amount: 5, unit: "cups", notes: "divided" },
            { name: "Sugar", amount: 2, unit: "tbsp", notes: "for pap, adjust to taste" },
            { name: "Banana Leaves or Aluminum Foil", amount: 1, unit: "package", notes: "for wrapping moin moin" }
          ],
          instructions: [
            { stepNumber: 1, description: "For the Moin Moin: Soak the black-eyed peas in plenty of water for at least 1 hour, preferably overnight." },
            { stepNumber: 2, description: "After soaking, rub the beans between your palms to remove the skins. Rinse several times until the water runs clear and all skins are removed." },
            { stepNumber: 3, description: "Place the peeled beans in a blender along with the bell pepper, scotch bonnet pepper, and half of the chopped onion. Add just enough water (about 1/2 cup) to help the blender run smoothly." },
            { stepNumber: 4, description: "Blend until you achieve a smooth paste, but not too watery. The consistency should be similar to cake batter." },
            { stepNumber: 5, description: "Transfer the paste to a large bowl. Add the vegetable oil, crumbled bouillon cube, salt, and ground crayfish (if using). Mix thoroughly." },
            { stepNumber: 6, description: "Prepare your moin moin containers: If using banana leaves, quickly pass them over an open flame to make them pliable, then cut into squares. If using aluminum foil, cut into squares and lightly oil them." },
            { stepNumber: 7, description: "Fold the banana leaves or aluminum foil into cone shapes, filling each about 2/3 full with the bean mixture. If using hard-boiled eggs, place half an egg in the center of each portion before sealing." },
            { stepNumber: 8, description: "Fold and seal each package securely. Arrange in a large pot with a steamer basket or place a wire rack at the bottom of the pot to elevate the moin moin packages." },
            { stepNumber: 9, description: "Add water to the pot up to about 1 inch below the bottom of the packages. Cover and steam for 45-50 minutes, adding more hot water if needed. The moin moin is ready when firm to the touch." },
            { stepNumber: 10, description: "For the Pap: While the moin moin is steaming, prepare the pap by mixing 1 cup of corn flour with 1 cup of cold water to form a smooth paste." },
            { stepNumber: 11, description: "Bring 3 cups of water to a boil in a pot. Once boiling, reduce heat to medium." },
            { stepNumber: 12, description: "Gradually whisk the corn flour paste into the boiling water, stirring continuously to prevent lumps from forming." },
            { stepNumber: 13, description: "Continue stirring until the mixture thickens to your desired consistency, about 3-5 minutes. Add sugar to taste." },
            { stepNumber: 14, description: "If the pap becomes too thick, add a little more hot water and whisk until smooth." },
            { stepNumber: 15, description: "To serve: Unwrap the moin moin and serve warm alongside a bowl of hot pap." }
          ],
          notes: [
            "The key to smooth moin moin is properly removing all the bean skins - this is time-consuming but essential for the right texture.",
            "Traditional moin moin is steamed in banana leaves, which impart a subtle flavor, but ramekins, small heat-proof bowls, or aluminum foil work well as alternatives.",
            "You can customize moin moin with additional fillings like cooked fish, corned beef, or cooked vegetables placed in the center of each portion.",
            "When making pap, the whiteness of the corn flour affects the final color - some prefer the creamy white variety, while others use yellow corn for a golden porridge.",
            "Leftover pap can be refrigerated and reheated with a splash of water, while moin moin can be enjoyed cold or reheated by steaming again for a few minutes.",
            "Fermented Ingredients: Pap, also known as akamu or ogi, is traditionally made from fermented corn, undergoing lactic acid fermentation. Bouillon cubes may contain fermented flavor enhancers.",
            "FODMAP Information: High-FODMAP ingredients include black-eyed peas (GOS), onion (fructans), and potentially bouillon cubes (check for onion/garlic). Corn flour used for pap can be high FODMAP in larger servings. Low-FODMAP ingredients: red bell pepper (limit portion), scotch bonnet (test tolerance), oil, salt, eggs, crayfish, water, sugar.",
            "Low-FODMAP Recommendations: Moin Moin is challenging due to black-eyed peas; limiting portion size is necessary. Omit onion and use green parts of spring onions. Use low-FODMAP bouillon. For Pap, test tolerance to corn flour or consider alternatives like rice congee if corn triggers symptoms.",
            "Vitamins & Minerals: Black-eyed peas are a good source of protein, fiber, folate, and iron. Corn flour provides carbohydrates. Bell peppers offer Vitamin C. Eggs contribute protein and choline. Crayfish provide protein and minerals. Palm oil contains Vitamin E."
          ],
          nutritionFacts: {
            protein: 15,
            carbs: 48,
            fat: 12,
            fiber: 8,
            sugar: 5,
            sodium: 380
          }
        },
        {
          title: "Lamb Tagine",
          description: "A fragrant North African stew named after the distinctive conical clay pot in which it's traditionally cooked. This aromatic lamb tagine combines tender meat with sweet dried fruits, warming spices like cinnamon and cumin, and the nutty crunch of almonds. The slow cooking process allows the flavors to meld beautifully, creating a dish that perfectly represents Morocco's rich culinary heritage, where sweet and savory elements harmonize in memorable ways.",
          cookingTime: 150,
          servings: 6,
          difficulty: "MEDIUM",
          cuisineType: "Africa",
          regionOfOrigin: "Morocco",
          imageUrl: "/images/recipes/lamb_tagine.jpg",
          calories: 520,
          type: "MAIN",
          isVegetarian: false,
          isVegan: false,
          isGlutenFree: true,
          isLactoseFree: true,
          isNutFree: false,
          isPescatarian: false,
          isFermented: true,
          isLowFodmap: false,
          ingredients: [
            { name: "Lamb Shoulder", amount: 2, unit: "lbs", notes: "boneless, cut into 1.5-inch cubes" },
            { name: "Onions", amount: 2, unit: "large", notes: "thinly sliced" },
            { name: "Garlic", amount: 4, unit: "cloves", notes: "minced" },
            { name: "Fresh Ginger", amount: 1, unit: "tbsp", notes: "grated" },
            { name: "Ground Cumin", amount: 2, unit: "tsp" },
            { name: "Ground Coriander", amount: 2, unit: "tsp" },
            { name: "Ground Cinnamon", amount: 1, unit: "tsp" },
            { name: "Paprika", amount: 1, unit: "tbsp" },
            { name: "Turmeric", amount: 1, unit: "tsp" },
            { name: "Saffron Threads", amount: 0.25, unit: "tsp", notes: "soaked in 2 tbsp hot water" },
            { name: "Tomato Paste", amount: 2, unit: "tbsp" },
            { name: "Honey", amount: 2, unit: "tbsp" },
            { name: "Dried Apricots", amount: 1, unit: "cup", notes: "halved" },
            { name: "Dried Prunes", amount: 0.5, unit: "cup", notes: "pitted" },
            { name: "Chickpeas", amount: 1, unit: "can (15 oz)", notes: "drained and rinsed" },
            { name: "Chicken or Vegetable Broth", amount: 2, unit: "cups" },
            { name: "Olive Oil", amount: 3, unit: "tbsp" },
            { name: "Lemon", amount: 1, unit: "whole", notes: "zest and juice" },
            { name: "Almonds", amount: 0.5, unit: "cup", notes: "blanched and toasted" },
            { name: "Fresh Cilantro", amount: 0.25, unit: "cup", notes: "chopped, for garnish" },
            { name: "Fresh Mint", amount: 0.25, unit: "cup", notes: "chopped, for garnish" },
            { name: "Salt", amount: 1.5, unit: "tsp", notes: "or to taste" },
            { name: "Black Pepper", amount: 0.5, unit: "tsp", notes: "freshly ground" }
          ],
          instructions: [
            { stepNumber: 1, description: "In a small bowl, mix together the cumin, coriander, cinnamon, paprika, and turmeric to create a spice blend. Set aside." },
            { stepNumber: 2, description: "Season the lamb cubes generously with salt and pepper. Heat 2 tablespoons of olive oil in a tagine pot or heavy-bottomed Dutch oven over medium-high heat." },
            { stepNumber: 3, description: "Working in batches, brown the lamb on all sides, about 3-4 minutes per batch. Transfer to a plate and set aside." },
            { stepNumber: 4, description: "In the same pot, add the remaining tablespoon of olive oil. Add the sliced onions and cook until softened and starting to caramelize, about 5-7 minutes." },
            { stepNumber: 5, description: "Add the minced garlic and grated ginger to the onions. Cook for another minute until fragrant." },
            { stepNumber: 6, description: "Stir in the prepared spice blend and cook for 30 seconds until aromatic, being careful not to burn the spices." },
            { stepNumber: 7, description: "Add the tomato paste and stir to combine with the spices and onion mixture, cooking for about 1 minute." },
            { stepNumber: 8, description: "Return the browned lamb to the pot along with any accumulated juices. Add the saffron with its soaking liquid, honey, and lemon zest." },
            { stepNumber: 9, description: "Pour in the broth, stir well, and bring to a simmer. Reduce heat to low, cover with the tagine lid or Dutch oven lid, and simmer gently for 1 hour." },
            { stepNumber: 10, description: "After 1 hour, add the dried apricots, prunes, and drained chickpeas to the pot. Stir gently to combine, taking care not to break up the meat too much." },
            { stepNumber: 11, description: "Continue to simmer, covered, for another 30-45 minutes, or until the lamb is very tender and the sauce has thickened slightly." },
            { stepNumber: 12, description: "Just before serving, stir in the lemon juice and check for seasoning, adding more salt and pepper if needed." },
            { stepNumber: 13, description: "Serve hot, garnished with toasted almonds, chopped cilantro, and mint. Traditionally accompanied by couscous or crusty bread to soak up the flavorful sauce." }
          ],
          notes: [
            "Authentic tagine cooking uses a special clay pot with a conical lid that traps steam and returns moisture to the stew. If using a tagine pot, remember it needs to be heat-safe and properly seasoned before use.",
            "A Dutch oven or heavy-bottomed pot with a tight-fitting lid works well as an alternative to a traditional tagine.",
            "For maximum flavor development, prepare this dish a day ahead and reheat gently before serving.",
            "Other dried fruits like dates, raisins, or dried cherries can substitute for or complement the apricots and prunes.",
            "For a lighter variation, use chicken thighs instead of lamb and reduce the cooking time to about 45 minutes total.",
            "Fermented Ingredients: Broth may contain fermented flavor enhancers. Preserved lemons, a common tagine ingredient not listed here, are fermented.",
            "FODMAP Information: High-FODMAP ingredients include onions (fructans), garlic (fructans), honey (fructose - limit serving), dried apricots (fructose/polyols - limit serving), dried prunes (polyols - limit serving), chickpeas (GOS - limit serving), almonds (GOS - limit serving), and potentially broth (check for onion/garlic). Low-FODMAP ingredients: lamb, ginger, spices (check blends), saffron, tomato paste (limit portion), olive oil, lemon, cilantro, mint, salt, pepper.",
            "Low-FODMAP Recommendations: Omit onions and garlic; use garlic-infused oil and green parts of leeks/spring onions. Replace honey with maple syrup (limit to 1 tbsp). Omit or strictly limit dried fruits (e.g., 1 prune, 1 dried apricot half per serve). Limit chickpeas to 1/4 cup (canned, rinsed) per serve. Limit almonds to 10 per serve. Use certified low-FODMAP broth.",
            "Vitamins & Minerals: Lamb provides protein, iron, zinc, and B12. Dried fruits offer fiber, potassium, and some vitamins (A in apricots). Chickpeas add protein and fiber. Almonds contribute Vitamin E and magnesium. Spices provide antioxidants. Tomato paste offers lycopene. Lemon provides Vitamin C."
          ],
          nutritionFacts: {
            protein: 35,
            carbs: 42,
            fat: 26,
            fiber: 8,
            sugar: 24,
            sodium: 580
          }
        },
        {
          title: "Ofada Rice with Ayamase Sauce",
          description: "A distinguished Nigerian dish featuring locally grown ofada rice served with ayamase, a fiery green pepper sauce. The unpolished, brown ofada rice has a distinct nutty flavor and is traditionally wrapped in banana leaves, while ayamase (also known as designer stew or ofada stew) delivers a bold, complex flavor from green bell peppers, scotch bonnet peppers, and assorted meats. This celebrated combination represents the pinnacle of Yoruba cuisine from Southwestern Nigeria.",
          cookingTime: 120,
          servings: 6,
          difficulty: "HARD",
          cuisineType: "Africa",
          regionOfOrigin: "Nigeria",
          imageUrl: "/images/recipes/ofada-ayamase.jpg",
          calories: 550,
          type: "MAIN",
          isVegetarian: false,
          isVegan: false,
          isGlutenFree: true,
          isLactoseFree: true,
          isNutFree: true,
          isPescatarian: false,
          isFermented: true,
          isLowFodmap: false,
          ingredients: [
            { name: "Ofada Rice", amount: 3, unit: "cups", notes: "unpolished, brown local rice (or substitute with short-grain brown rice)" },
            { name: "Green Bell Peppers", amount: 8, unit: "large", notes: "seeded" },
            { name: "Green Scotch Bonnet Peppers", amount: 5, unit: "medium", notes: "adjust according to heat preference" },
            { name: "Onions", amount: 2, unit: "large", notes: "1 for blending, 1 sliced" },
            { name: "Palm Oil", amount: 1, unit: "cup", notes: "unbleached, traditional" },
            { name: "Locust Beans (Iru)", amount: 3, unit: "tbsp", notes: "fermented, can substitute with miso paste" },
            { name: "Assorted Meat", amount: 1.5, unit: "lbs", notes: "beef, tripe, cow skin (ponmo), and/or goat meat" },
            { name: "Beef Stock", amount: 2, unit: "cups", notes: "from cooking the meat" },
            { name: "Crayfish", amount: 2, unit: "tbsp", notes: "ground" },
            { name: "Bouillon Cubes", amount: 2, unit: "cubes", notes: "beef or vegetable flavor" },
            { name: "Salt", amount: 1, unit: "tsp", notes: "or to taste" },
            { name: "Water", amount: 6, unit: "cups", notes: "for cooking rice" },
            { name: "Banana Leaves", amount: 6, unit: "pieces", notes: "optional, for traditional serving" }
          ],
          instructions: [
            { stepNumber: 1, description: "Preparing the Ofada Rice: Wash the rice thoroughly in several changes of water until the water runs clear, removing any stones or debris." },
            { stepNumber: 2, description: "Place the washed rice in a large pot, add 6 cups of water and a pinch of salt. Bring to a boil over high heat." },
            { stepNumber: 3, description: "Once boiling, reduce heat to medium-low, cover, and simmer for 35-40 minutes until the rice is cooked but still firm (ofada rice should have a slight chew to it). Drain any excess water." },
            { stepNumber: 4, description: "Preparing the Meat: Cut the assorted meats into bite-sized pieces. Place in a pot with 1 chopped onion, 1 bouillon cube, and salt to taste." },
            { stepNumber: 5, description: "Add enough water to cover the meat. Bring to a boil and cook until the meats are tender, about 30-45 minutes depending on the types used. Reserve the stock." },
            { stepNumber: 6, description: "Preparing the Ayamase Sauce: Wash the green bell peppers and scotch bonnet peppers. Remove the seeds (wear gloves when handling hot peppers)." },
            { stepNumber: 7, description: "In a blender, combine the peppers with 1 onion and blend until smooth but not watery. If needed, blend in batches." },
            { stepNumber: 8, description: "In a large, deep pot, heat the palm oil over medium heat until it becomes clear and just begins to smoke. Immediately reduce the heat to prevent burning." },
            { stepNumber: 9, description: "Add the sliced onion to the hot oil and sauté until translucent, about 3-4 minutes." },
            { stepNumber: 10, description: "Carefully add the blended pepper mixture to the hot oil (it will splatter). Stir well and allow to cook for 10-15 minutes, stirring occasionally to prevent burning." },
            { stepNumber: 11, description: "Add the locust beans (iru), ground crayfish, remaining bouillon cube, and salt to taste. Stir to combine." },
            { stepNumber: 12, description: "Add the cooked meats and about 1-2 cups of the reserved beef stock. Stir well." },
            { stepNumber: 13, description: "Reduce heat to low and simmer, partially covered, for 25-30 minutes until the oil floats to the top and the sauce has thickened." },
            { stepNumber: 14, description: "Traditional Serving (optional): If using banana leaves, quickly pass them over an open flame to make them pliable. Line small bowls with the leaves." },
            { stepNumber: 15, description: "Scoop the ofada rice into the banana leaf-lined bowls. Fold the leaves over to wrap the rice. Serve with generous portions of the ayamase sauce on the side or poured over the rice." }
          ],
          notes: [
            "True ofada rice has a distinctive aroma and nutty flavor. If unavailable, short-grain brown rice makes an acceptable substitute, though the taste will differ.",
            "The green color of the ayamase sauce is traditional and comes from using only green peppers, not red ones.",
            "The sauce should be quite oily - this is traditional and the palm oil carries much of the flavor.",
            "For an authentic taste, bleached palm oil should not be used; the traditional unbleached oil has a rich, red color and distinctive flavor essential to the dish.",
            "Locust beans (iru) have a unique, pungent flavor that's important to authentic ayamase. If unavailable, fermented black bean paste or miso can provide a similar umami quality, though the flavor profile will be different.",
            "Fermented Ingredients: Locust beans (iru) undergo alkaline fermentation. Beef stock and bouillon cubes may contain fermented flavor enhancers.",
            "FODMAP Information: High-FODMAP ingredients include onions (fructans), locust beans (iru - likely high), assorted meats (some types like tripe can be high, test tolerance), and potentially stock/bouillon (check for onion/garlic). Ofada rice portion size needs monitoring. Low-FODMAP ingredients: green bell peppers (limit portion), scotch bonnet (test tolerance), palm oil, crayfish, salt, water. Beef/goat meat are low FODMAP.",
            "Low-FODMAP Recommendations: Omit onions; use green parts of spring onions. Omit locust beans (this significantly changes the flavour). Choose low-FODMAP meats like beef or goat. Use certified low-FODMAP stock/bouillon. Limit green bell pepper to 1/2 cup per serve. Serve with a controlled portion of rice (approx 1 cup cooked).",
            "Vitamins & Minerals: Ofada rice (brown rice) provides fiber, magnesium, and B vitamins. Bell peppers are rich in Vitamin C. Palm oil contributes Vitamin E. Locust beans offer protein and minerals. Meats supply protein, iron, zinc, and B12. Crayfish adds protein and calcium."
          ],
          nutritionFacts: {
            protein: 35,
            carbs: 68,
            fat: 25,
            fiber: 7,
            sugar: 5,
            sodium: 680
          }
        },
        {
          title: "Panta Bhat",
          description: "A traditional Bengali dish consisting of fermented rice soaked in water overnight, typically served for breakfast. This humble yet nutritious preparation has a subtle tangy flavor from natural fermentation and is usually accompanied by simple sides like raw onions, green chilies, and mashed potatoes. Especially popular in rural areas during hot summer months, panta bhat is prized for its cooling properties and is considered a comfort food deeply connected to Bengali cultural identity.",
          cookingTime: 480,
          servings: 4,
          difficulty: "EASY",
          cuisineType: "Asia",
          regionOfOrigin: "Bengal (India/Bangladesh)",
          imageUrl: "/images/recipes/panta-bhat.jpg",
          calories: 250,
          type: "BREAKFAST",
          isVegetarian: true,
          isVegan: true,
          isGlutenFree: true,
          isLactoseFree: true,
          isNutFree: true,
          isPescatarian: true,
          isFermented: true,
          isLowFodmap: false,
          ingredients: [
            { name: "Rice", amount: 2, unit: "cups", notes: "preferably local varieties like Govindabhog or Kalijira, but any short or medium grain works" },
            { name: "Water", amount: 4, unit: "cups", notes: "for cooking rice, plus more for soaking" },
            { name: "Water", amount: 6, unit: "cups", notes: "for fermenting, preferably filtered" },
            { name: "Salt", amount: 1, unit: "tsp", notes: "or to taste" },
            { name: "Green Chilies", amount: 4, unit: "medium", notes: "slit lengthwise" },
            { name: "Red Onion", amount: 1, unit: "large", notes: "finely chopped" },
            { name: "Mustard Oil", amount: 2, unit: "tbsp", notes: "optional, but traditional" },
            { name: "Lemon", amount: 1, unit: "medium", notes: "cut into wedges" },
            { name: "Aloo Bhorta", amount: 1, unit: "serving", notes: "mashed potatoes with onions and chilies (optional side)" },
            { name: "Shutki Bhorta", amount: 1, unit: "serving", notes: "mashed dried fish (optional side)" },
            { name: "Fresh Cilantro", amount: 2, unit: "tbsp", notes: "chopped, for garnish" },
            { name: "Banana", amount: 2, unit: "medium", notes: "for serving (optional)" }
          ],
          instructions: [
            { stepNumber: 1, description: "Wash the rice thoroughly in several changes of water until the water runs clear." },
            { stepNumber: 2, description: "Cook the rice: Add the washed rice to a pot with 4 cups of water and bring to a boil. Reduce heat and simmer until the rice is fully cooked and soft, about 15-20 minutes." },
            { stepNumber: 3, description: "Once cooked, spread the rice on a large flat dish or tray to cool completely to room temperature." },
            { stepNumber: 4, description: "Transfer the cooled rice to a large non-reactive container (ceramic, glass, or food-grade plastic)." },
            { stepNumber: 5, description: "Pour 6 cups of clean water over the rice, ensuring it's completely submerged. The water level should be about 2 inches above the rice." },
            { stepNumber: 6, description: "Cover the container loosely with a lid or clean cloth that allows some air circulation but prevents dust or insects from getting in." },
            { stepNumber: 7, description: "Place the container in a cool, dry place (not the refrigerator) and allow to ferment for 8-12 hours or overnight. In warmer weather, 8 hours is usually sufficient." },
            { stepNumber: 8, description: "By morning, the rice will have fermented slightly, developing a subtle sour flavor. The rice should look slightly puffy and the water will have a whitish appearance." },
            { stepNumber: 9, description: "To serve: Portion the fermented rice along with some of its soaking water into individual bowls." },
            { stepNumber: 10, description: "Add salt to taste to each serving. This is traditionally done at the time of eating, not during preparation." },
            { stepNumber: 11, description: "Drizzle each serving with a little mustard oil if using, which adds a pungent flavor characteristic of Bengali cuisine." },
            { stepNumber: 12, description: "Serve with chopped onions, green chilies, and lemon wedges on the side, allowing each person to add these according to their preference." },
            { stepNumber: 13, description: "Traditional accompaniments like aloo bhorta (mashed potato with onions), shutki bhorta (dried fish mash), or fresh banana can be served alongside." },
            { stepNumber: 14, description: "Garnish with fresh cilantro if desired and serve at room temperature." }
          ],
          notes: [
            "The fermentation time varies with temperature - in hot summer months, 6-8 hours might be sufficient, while in cooler weather, it may take 12-15 hours.",
            "Some regions add curry leaves or a whole green chili to the fermenting rice for additional flavor.",
            "Do not refrigerate the rice during fermentation, as cold temperatures will inhibit the fermentation process.",
            "In Bengal, panta bhat is especially popular during the Bengali New Year (Pohela Boishakh) celebrations.",
            "For food safety, ensure all utensils, containers, and water used are clean. If the rice develops an off smell or unusual color, discard it.",
            "Fermented Ingredients: The core of the dish is rice that undergoes spontaneous lactic acid fermentation when soaked overnight. Some accompaniments like shutki bhorta (dried fish mash) may also involve fermented ingredients depending on preparation.",
            "FODMAP Information: High-FODMAP ingredients include the raw onion garnish (fructans). The fermented rice itself may develop FODMAPs during fermentation and should be tested for individual tolerance. Accompaniments like aloo bhorta and shutki bhorta often contain high-FODMAP onion and garlic. Low-FODMAP ingredients: plain cooked rice (portion controlled), water, salt, green chilies (test tolerance), mustard oil, lemon, cilantro, banana (limit portion).",
            "Low-FODMAP Recommendations: Test personal tolerance to the fermented rice. Omit the raw onion garnish or use only the green parts of spring onions. Ensure any side dishes (bhorta) are prepared without onion or garlic, using garlic-infused oil if needed. Limit banana portion.",
            "Vitamins & Minerals: Rice provides carbohydrates. Fermentation can potentially increase the bioavailability of some nutrients like B vitamins. Onions offer Vitamin C. Mustard oil contains Vitamin E. Lemon provides Vitamin C. Optional sides like mashed potato add potassium, while dried fish contributes protein, calcium, and omega-3 fatty acids."
          ],
          nutritionFacts: {
            protein: 5,
            carbs: 52,
            fat: 3,
            fiber: 1,
            sugar: 2,
            sodium: 250
          }
        },
        {
          title: "Yassa Poulet",
          description: "A beloved West African dish originating from the Casamance region of Senegal, featuring marinated chicken cooked with caramelized onions in a tangy sauce of lemon juice, mustard, and vinegar. This iconic dish balances savory, tangy, and slightly sweet flavors, creating a complex taste profile that has made it popular throughout West Africa and beyond. Traditionally served over rice, Yassa Poulet showcases Senegal's rich culinary heritage influenced by both indigenous traditions and colonial encounters.",
          cookingTime: 120,
          servings: 6,
          difficulty: "MEDIUM",
          cuisineType: "Africa",
          regionOfOrigin: "Senegal",
          imageUrl: "/images/recipes/senegalese-yassa-poulet.jpg",
          calories: 480,
          type: "MAIN",
          isVegetarian: false,
          isVegan: false,
          isGlutenFree: true,
          isLactoseFree: true,
          isNutFree: true,
          isPescatarian: false,
          isFermented: true,
          isLowFodmap: false,
          ingredients: [
            { name: "Chicken", amount: 3, unit: "lbs", notes: "whole cut into pieces, or chicken thighs" },
            { name: "Onions", amount: 5, unit: "large", notes: "thinly sliced" },
            { name: "Lemons", amount: 4, unit: "medium", notes: "juiced (about 3/4 cup juice)" },
            { name: "Dijon Mustard", amount: 2, unit: "tbsp" },
            { name: "White Vinegar", amount: 2, unit: "tbsp" },
            { name: "Garlic", amount: 5, unit: "cloves", notes: "minced" },
            { name: "Habanero or Scotch Bonnet Pepper", amount: 1, unit: "whole", notes: "seeds removed for less heat, or left intact for traditional spiciness" },
            { name: "Bay Leaves", amount: 2, unit: "whole" },
            { name: "Vegetable Oil", amount: 0.33, unit: "cup" },
            { name: "Chicken Bouillon Cube", amount: 1, unit: "cube", notes: "crushed" },
            { name: "Black Pepper", amount: 1, unit: "tsp", notes: "freshly ground" },
            { name: "Salt", amount: 1, unit: "tsp", notes: "or to taste" },
            { name: "White Rice", amount: 3, unit: "cups", notes: "uncooked, for serving" },
            { name: "Green Olives", amount: 0.5, unit: "cup", notes: "pitted, for garnish (optional)" },
            { name: "Fresh Parsley", amount: 0.25, unit: "cup", notes: "chopped, for garnish" }
          ],
          instructions: [
            { stepNumber: 1, description: "Prepare the marinade: In a large bowl, combine lemon juice, Dijon mustard, vinegar, minced garlic, crushed bouillon cube, black pepper, and half of the salt." },
            { stepNumber: 2, description: "Add the chicken pieces to the marinade, turning to coat well. Cover and refrigerate for at least 2 hours, preferably overnight, turning occasionally." },
            { stepNumber: 3, description: "After marinating, remove the chicken from the marinade, but save the marinade. Pat the chicken pieces dry with paper towels." },
            { stepNumber: 4, description: "Add the sliced onions and habanero pepper to the reserved marinade. Stir to combine and let sit while you cook the chicken." },
            { stepNumber: 5, description: "Heat 3 tablespoons of oil in a large, deep skillet or Dutch oven over medium-high heat. Brown the chicken pieces on all sides, about 3-4 minutes per side. Remove chicken and set aside." },
            { stepNumber: 6, description: "In the same pot, add the remaining oil. Add the onions from the marinade (reserve the liquid). Cook the onions over medium heat, stirring frequently, until they are very soft and caramelized, about 20-25 minutes. Be patient - proper caramelization is key to the dish's flavor." },
            { stepNumber: 7, description: "Once the onions are deeply golden and caramelized, pour in the reserved marinade. Add the bay leaves and bring to a simmer." },
            { stepNumber: 8, description: "Return the browned chicken to the pot, nestling the pieces into the onions. Reduce heat to low, cover, and simmer for 30-40 minutes until the chicken is very tender and cooked through." },
            { stepNumber: 9, description: "While the chicken is cooking, prepare the rice according to package instructions." },
            { stepNumber: 10, description: "About 10 minutes before the chicken is done, check the seasoning of the sauce, adding more salt if needed." },
            { stepNumber: 11, description: "To serve, place a portion of rice on each plate. Top with chicken pieces and generously spoon the onion sauce over the rice and chicken." },
            { stepNumber: 12, description: "Garnish with green olives (if using) and sprinkle with chopped parsley. Serve hot." }
          ],
          notes: [
            "The long marination is crucial for developing the signature tangy flavor of Yassa Poulet - don't rush this step.",
            "In Senegal, this dish is traditionally cooked over a charcoal grill before being finished in the sauce, which adds a smoky flavor. You can replicate this by grilling the marinated chicken before adding it to the onion sauce.",
            "The level of heat can be adjusted by using more or fewer hot peppers, or by removing the seeds and membranes for a milder dish.",
            "Some Senegalese cooks add a tablespoon of peanut butter to the sauce for added richness and a subtle nutty flavor.",
            "Leftovers taste even better the next day as the flavors continue to develop. Reheat gently to avoid drying out the chicken.",
            "Fermented Ingredients: Dijon mustard (processed from fermented seeds/vinegar), white vinegar (acetic acid fermentation), green olives (cured/fermented). Bouillon cubes may contain fermented enhancers.",
            "FODMAP Information: High-FODMAP ingredients include the large quantity of onions (fructans) and garlic (fructans). Dijon mustard and bouillon cubes should be checked for added onion/garlic. Low-FODMAP ingredients: chicken, lemon juice, white vinegar, habanero/scotch bonnet (test tolerance), bay leaves, oil, pepper, salt, rice, green olives (limit portion), parsley.",
            "Low-FODMAP Recommendations: This dish is challenging to make low-FODMAP as onions are central. Replacing the onions with a large quantity of green leek/spring onion tops will change the flavor profile significantly. Omit garlic; use garlic-infused oil. Check Dijon mustard and bouillon cubes for high-FODMAP ingredients.",
            "Vitamins & Minerals: Chicken provides protein and B vitamins (niacin, B6). Onions offer Vitamin C and antioxidants. Lemons are rich in Vitamin C. Mustard and vinegar add flavor with minimal calories. Olive oil contributes healthy fats. Rice provides carbohydrates."
          ],
          nutritionFacts: {
            protein: 32,
            carbs: 45,
            fat: 20,
            fiber: 3,
            sugar: 6,
            sodium: 520
          }
        },
        {
          title: "Shorshe Bata Maach",
          description: "A traditional Bengali fish curry where fish steaks are cooked in a creamy, pungent mustard seed paste. This iconic dish showcases the Bengali love for fish and bold flavors, with the signature sharpness of mustard balanced by the subtle heat of green chilies and the richness of mustard oil. Typically prepared with river fish like rohu or hilsa, this curry is a staple in both West Bengal and Bangladesh, often enjoyed with steamed rice during special occasions and everyday meals alike.",
          cookingTime: 45,
          servings: 4,
          difficulty: "MEDIUM",
          cuisineType: "Asia",
          regionOfOrigin: "Bengal (India/Bangladesh)",
          imageUrl: "/images/recipes/shorshe-bata-maach.jpg",
          calories: 320,
          type: "MAIN",
          isVegetarian: false,
          isVegan: false,
          isGlutenFree: true,
          isLactoseFree: true,
          isNutFree: false,
          isPescatarian: true,
          isFermented: false,
          isLowFodmap: true,
          ingredients: [
            { name: "Fish Steaks", amount: 1.5, unit: "lbs", notes: "rohu, hilsa, or pomfret, cleaned and scored" },
            { name: "Yellow Mustard Seeds", amount: 3, unit: "tbsp" },
            { name: "Black Mustard Seeds", amount: 1, unit: "tbsp", notes: "for more pungency" },
            { name: "Green Chilies", amount: 4, unit: "medium", notes: "2 slit lengthwise for garnish, 2 for paste" },
            { name: "Turmeric Powder", amount: 1, unit: "tsp", notes: "divided" },
            { name: "Mustard Oil", amount: 4, unit: "tbsp", notes: "divided" },
            { name: "Salt", amount: 1, unit: "tsp", notes: "or to taste" },
            { name: "Sugar", amount: 0.5, unit: "tsp", notes: "to balance flavors" },
            { name: "Poppy Seeds", amount: 1, unit: "tbsp", notes: "optional, for thickening" },
            { name: "Water", amount: 0.5, unit: "cup" },
            { name: "Fresh Cilantro", amount: 2, unit: "tbsp", notes: "chopped, for garnish" }
          ],
          instructions: [
            { stepNumber: 1, description: "Wash the fish steaks and pat them dry. Rub with 0.5 teaspoon turmeric powder and 0.5 teaspoon salt. Let marinate for 15 minutes." },
            { stepNumber: 2, description: "Soak the yellow and black mustard seeds in warm water for 30 minutes. If using poppy seeds, soak them separately." },
            { stepNumber: 3, description: "Drain the soaked mustard seeds and add them to a blender along with 2 green chilies and 2 tablespoons of water. Grind to a smooth paste. If using poppy seeds, add them to the mixture and blend together." },
            { stepNumber: 4, description: "Heat 2 tablespoons of mustard oil in a non-stick or heavy-bottomed pan until it reaches smoking point. Remove from heat and let it cool slightly." },
            { stepNumber: 5, description: "Return the pan to medium heat and carefully add the fish pieces. Gently fry for about 2 minutes on each side until lightly golden but not fully cooked. Remove and set aside." },
            { stepNumber: 6, description: "In the same pan, add the remaining 2 tablespoons of mustard oil. Once hot, add the remaining 0.5 teaspoon of turmeric powder and stir quickly." },
            { stepNumber: 7, description: "Immediately add the mustard paste to the oil. Stir continuously on medium-low heat for 3-4 minutes until the raw smell of mustard disappears and the oil begins to separate." },
            { stepNumber: 8, description: "Add 0.5 cup of water, remaining salt, and sugar to the pan. Bring to a gentle simmer." },
            { stepNumber: 9, description: "Carefully place the fried fish pieces into the mustard sauce. Spoon some sauce over the fish." },
            { stepNumber: 10, description: "Cover and cook on low heat for 5-7 minutes until the fish is cooked through but still moist and tender." },
            { stepNumber: 11, description: "Add the slit green chilies to the curry and gently shake the pan to incorporate (avoid stirring, which may break the fish)." },
            { stepNumber: 12, description: "Turn off the heat and let it rest for 5 minutes to allow the flavors to meld." },
            { stepNumber: 13, description: "Garnish with fresh cilantro and a drizzle of raw mustard oil for added pungency if desired." },
            { stepNumber: 14, description: "Serve hot with steamed white rice." }
          ],
          notes: [
            "The key to authentic Shorshe Bata Maach is using freshly ground mustard seeds rather than pre-made mustard paste or powder.",
            "If the mustard paste tastes too bitter, add a pinch more sugar to balance the flavors.",
            "For a richer version, some Bengali households add a small amount of coconut paste or poppy seed paste to the mustard mixture.",
            "In traditional preparation, the dish is never stirred after adding the fish to prevent breaking the delicate pieces - instead, the pan is gently shaken.",
            "Fish with fewer bones like tilapia or sea bass can be substituted if traditional Bengali fish varieties aren't available, though the authentic flavor comes from freshwater fish.",
            "FODMAP Information: Most ingredients are low FODMAP. Mustard seeds/paste can be an irritant and potentially high FODMAP in large quantities; test individual tolerance. Low-FODMAP ingredients: fish, green chilies (test tolerance), turmeric, mustard oil, salt, sugar, poppy seeds, water, cilantro.",
            "Low-FODMAP Recommendations: This recipe is generally low FODMAP. If sensitive to mustard, start with a smaller portion size to assess tolerance.",
            "Vitamins & Minerals: Fish provides lean protein, omega-3 fatty acids (especially fatty fish like hilsa), Vitamin D, and B12. Mustard seeds contain selenium and magnesium. Mustard oil offers monounsaturated fats. Turmeric contains curcumin, an anti-inflammatory compound. Poppy seeds provide calcium and manganese."
          ],
          nutritionFacts: {
            protein: 28,
            carbs: 5,
            fat: 22,
            fiber: 2,
            sugar: 1,
            sodium: 410
          }
        },
        {
          title: "Paella",
          description: "A quintessential Spanish dish originating from Valencia, featuring saffron-infused rice cooked with an array of meats, seafood, and vegetables in a wide, shallow pan. This iconic one-pan meal showcases the rich flavors of Spanish cuisine through its distinctive combination of land and sea ingredients, vibrant colors, and the coveted socarrat—the caramelized rice crust that forms at the bottom of the pan. Traditionally enjoyed as a communal meal, paella represents the heart of Spanish social dining.",
          cookingTime: 60,
          servings: 6,
          difficulty: "MEDIUM",
          cuisineType: "Europe",
          regionOfOrigin: "Spain",
          imageUrl: "/images/recipes/spanish-paella.jpg",
          calories: 580,
          type: "MAIN",
          isVegetarian: false,
          isVegan: false,
          isGlutenFree: true,
          isLactoseFree: true,
          isNutFree: true,
          isPescatarian: false,
          isFermented: true,
          isLowFodmap: false,
          ingredients: [
            { name: "Bomba Rice", amount: 2, unit: "cups", notes: "or other short-grain Spanish rice" },
            { name: "Chicken Thighs", amount: 1, unit: "lb", notes: "bone-in, skin-on, cut into pieces" },
            { name: "Spanish Chorizo", amount: 8, unit: "oz", notes: "sliced into rounds" },
            { name: "Large Shrimp", amount: 12, unit: "pieces", notes: "peeled and deveined, tails on" },
            { name: "Mussels", amount: 12, unit: "pieces", notes: "cleaned and debearded" },
            { name: "Squid", amount: 8, unit: "oz", notes: "cleaned and sliced into rings" },
            { name: "Saffron Threads", amount: 1, unit: "generous pinch", notes: "about 0.5 teaspoon" },
            { name: "Sweet Paprika", amount: 1, unit: "tbsp", notes: "preferably Spanish" },
            { name: "Fresh Tomatoes", amount: 2, unit: "medium", notes: "grated or finely chopped" },
            { name: "Onion", amount: 1, unit: "medium", notes: "finely chopped" },
            { name: "Red Bell Pepper", amount: 1, unit: "medium", notes: "sliced into strips" },
            { name: "Garlic", amount: 4, unit: "cloves", notes: "minced" },
            { name: "Green Beans", amount: 8, unit: "oz", notes: "trimmed" },
            { name: "Frozen Peas", amount: 0.5, unit: "cup" },
            { name: "Chicken Broth", amount: 4, unit: "cups", notes: "hot" },
            { name: "White Wine", amount: 0.5, unit: "cup", notes: "dry" },
            { name: "Olive Oil", amount: 0.25, unit: "cup", notes: "extra virgin" },
            { name: "Lemon", amount: 1, unit: "whole", notes: "cut into wedges for serving" },
            { name: "Fresh Parsley", amount: 0.25, unit: "cup", notes: "chopped, for garnish" },
            { name: "Salt", amount: 1, unit: "tsp", notes: "or to taste" },
            { name: "Black Pepper", amount: 0.5, unit: "tsp", notes: "freshly ground" }
          ],
          instructions: [
            { stepNumber: 1, description: "Heat the broth in a saucepan and keep warm. Crush the saffron threads and dissolve them in the hot broth to infuse the flavor and color." },
            { stepNumber: 2, description: "Heat olive oil in a large paella pan (or wide, shallow skillet) over medium-high heat. Season chicken pieces with salt and pepper, then add to the hot oil. Brown on all sides, about 5-7 minutes. Remove and set aside." },
            { stepNumber: 3, description: "In the same pan, add the chorizo and cook until it releases its oils and begins to crisp, about 2 minutes. Remove and set aside with the chicken." },
            { stepNumber: 4, description: "Add the onion to the pan and sauté until translucent, about 3 minutes. Add the bell pepper strips and cook for another 2-3 minutes until slightly softened." },
            { stepNumber: 5, description: "Add the minced garlic and cook until fragrant, about 30 seconds. Stir in the grated tomatoes and cook until they darken and the mixture thickens slightly, about 3 minutes." },
            { stepNumber: 6, description: "Stir in the paprika and cook for 30 seconds to bloom the spice, being careful not to burn it." },
            { stepNumber: 7, description: "Add the rice to the pan and stir to coat with the sofrito (tomato mixture), toasting lightly for 1-2 minutes." },
            { stepNumber: 8, description: "Pour in the white wine and let it reduce by half, about 2 minutes." },
            { stepNumber: 9, description: "Add the saffron-infused broth, green beans, and a teaspoon of salt. Stir gently to distribute the ingredients evenly." },
            { stepNumber: 10, description: "Return the chicken and chorizo to the pan, nestling them into the rice. Bring the mixture to a boil, then reduce heat to a gentle simmer." },
            { stepNumber: 11, description: "Cook uncovered without stirring (this is crucial) for about 15 minutes, or until the rice has absorbed most of the liquid but is still slightly soupy." },
            { stepNumber: 12, description: "Arrange the shrimp, squid rings, and mussels (hinge side down) on top of the rice. Scatter the frozen peas over the surface." },
            { stepNumber: 13, description: "Continue cooking without stirring for another 10 minutes, or until the rice is tender, the seafood is cooked, and most of the liquid is absorbed." },
            { stepNumber: 14, description: "To develop the socarrat (crispy bottom layer), increase the heat to medium-high for the final 1-2 minutes, listening for a slight crackling sound. Remove from heat once you smell a toasty aroma, being careful not to burn the rice." },
            { stepNumber: 15, description: "Cover the paella with a clean kitchen towel and let rest for 5 minutes to allow the flavors to meld and any remaining liquid to be absorbed." },
            { stepNumber: 16, description: "Garnish with chopped parsley and lemon wedges. Serve directly from the pan, making sure each portion includes some socarrat from the bottom." }
          ],
          notes: [
            "A traditional paella pan is wide and shallow to maximize the rice's contact with the pan, creating more socarrat. If you don't have one, use the widest, shallowest skillet available.",
            "Authentic paella should have a layer of rice thin enough that it doesn't exceed the height of the pan's sides (about 1 cm thick).",
            "Never stir the paella after adding the broth - this releases the rice's starch and makes the dish gummy rather than achieving the desired separate grains.",
            "The socarrat is considered the crown jewel of the dish - listen for a gentle crackling sound in the final minutes of cooking to know it's forming.",
            "Regional variations exist: Valencia's original paella includes rabbit, chicken, snails, and beans; seafood paella (paella de marisco) omits meat; and mixed paella (paella mixta) combines both meat and seafood as in this recipe.",
            "Fermented Ingredients: Chorizo (cured via fermentation), white wine (yeast fermentation). Broth may contain fermented enhancers.",
            "FODMAP Information: High-FODMAP ingredients include chorizo (check for onion/garlic), onion (fructans), garlic (fructans), green beans (polyols - limit serving), peas (GOS - limit serving), and potentially broth (check for onion/garlic). Low-FODMAP ingredients: rice (limit portion), chicken, shrimp, mussels, squid, saffron, paprika, tomatoes (limit portion), bell pepper (limit portion), white wine (usually ok), olive oil, lemon, parsley, salt, pepper.",
            "Low-FODMAP Recommendations: Omit onion and garlic; use garlic-infused oil and green parts of leeks/spring onions. Check chorizo for high-FODMAP ingredients or use a low-FODMAP alternative. Limit green beans to approx. 15 per serve and peas to 1 tbsp per serve, or omit. Use certified low-FODMAP broth. Limit tomato and bell pepper portions.",
            "Vitamins & Minerals: Provides protein from chicken, chorizo, and seafood. Seafood also offers iodine, selenium, and B12. Rice provides carbohydrates. Vegetables (tomatoes, peppers, beans, peas) contribute various vitamins (C, K) and fiber. Saffron contains antioxidants. Olive oil adds healthy fats."
          ],
          nutritionFacts: {
            protein: 38,
            carbs: 62,
            fat: 24,
            fiber: 5,
            sugar: 6,
            sodium: 850
          }
        },
        {
          title: "Croissants",
          description: "A classic French pastry characterized by its buttery flavor, flaky texture, and distinctive crescent shape. These laminated pastries are created through a meticulous process of folding butter into dough multiple times, creating hundreds of alternating layers that puff up during baking. The result is an exquisite balance of crispy exterior and tender, airy interior that has made croissants a beloved breakfast staple worldwide, though true French croissants require patience, precision, and proper technique.",
          cookingTime: 720,
          servings: 12,
          difficulty: "HARD",
          cuisineType: "Europe",
          regionOfOrigin: "France",
          imageUrl: "/images/recipes/traditional-french-croissants.jpg",
          calories: 340,
          type: "BREAKFAST",
          isVegetarian: true,
          isVegan: false,
          isGlutenFree: false,
          isLactoseFree: false,
          isNutFree: true,
          isPescatarian: false,
          isFermented: true,
          isLowFodmap: false,
          ingredients: [
            { name: "All-Purpose Flour", amount: 500, unit: "g", notes: "plus extra for dusting" },
            { name: "Water", amount: 140, unit: "ml", notes: "cold" },
            { name: "Whole Milk", amount: 140, unit: "ml", notes: "cold" },
            { name: "Granulated Sugar", amount: 55, unit: "g" },
            { name: "Unsalted Butter", amount: 40, unit: "g", notes: "softened, for the dough" },
            { name: "European-style Butter", amount: 280, unit: "g", notes: "cold, for lamination (high fat content, at least 82%)" },
            { name: "Active Dry Yeast", amount: 7, unit: "g", notes: "or 2 0.25 teaspoons" },
            { name: "Salt", amount: 10, unit: "g", notes: "or 1 0.75 teaspoons" },
            { name: "Egg", amount: 1, unit: "large", notes: "for egg wash" },
            { name: "Water", amount: 1, unit: "tbsp", notes: "for egg wash" }
          ],
          instructions: [
            { stepNumber: 1, description: "Day 1 - Make the dough: In a large bowl, combine the flour, sugar, salt, and yeast. Mix well." },
            { stepNumber: 2, description: "Add the cold milk, cold water, and softened butter to the dry ingredients. Mix until a shaggy dough forms." },
            { stepNumber: 3, description: "Turn the dough onto a lightly floured surface and knead for about 3-4 minutes until smooth. The dough should be soft but not sticky." },
            { stepNumber: 4, description: "Shape the dough into a rectangle about 1-inch thick. Wrap tightly in plastic wrap and refrigerate for at least 8 hours, preferably overnight." },
            { stepNumber: 5, description: "Prepare the butter block: Place the cold lamination butter between two sheets of parchment paper. Using a rolling pin, pound and roll the butter into an 8x5-inch (20x12 cm) rectangle. Wrap and refrigerate until firm but still pliable." },
            { stepNumber: 6, description: "Day 2 - Lamination: Remove the dough from the refrigerator and place on a lightly floured surface. Roll it into a rectangle approximately 16x8 inches (40x20 cm)." },
            { stepNumber: 7, description: "Place the butter block on the bottom half of the dough rectangle, leaving a 0.5-inch border. Fold the top half of the dough over the butter. Seal the edges by pressing firmly with your fingers." },
            { stepNumber: 8, description: "First turn: Roll the dough into a long rectangle about 24x8 inches (60x20 cm). Fold the dough like a letter: bottom third up, then top third down. This completes the first turn. Wrap and refrigerate for 1 hour." },
            { stepNumber: 9, description: "Second turn: Rotate the dough 90 degrees (so the open ends are facing you). Roll again into a 24x8 inch rectangle and complete the second letter fold. Wrap and refrigerate for another hour." },
            { stepNumber: 10, description: "Third turn: Repeat the process one more time for a total of three turns. After the third turn, wrap the dough tightly and refrigerate overnight." },
            { stepNumber: 11, description: "Day 3 - Shaping: Remove the dough from the refrigerator. On a lightly floured surface, roll it into a long rectangle about 24x8 inches (60x20 cm) and about 0.25 inch thick." },
            { stepNumber: 12, description: "Trim the edges to make a neat rectangle. Cut the dough into triangles with a 4-inch base and 8-inch height. Make a small 0.5-inch notch in the center of each base." },
            { stepNumber: 13, description: "To shape: Gently stretch each triangle lengthwise, then starting from the base, roll towards the tip, slightly flaring the ends outward to create the classic crescent shape." },
            { stepNumber: 14, description: "Place the shaped croissants on parchment-lined baking sheets, ensuring they're at least 2 inches apart. Curve the ends inward slightly to form the crescent shape." },
            { stepNumber: 15, description: "Proofing: Cover loosely with plastic wrap and let proof at room temperature (around 75°F/24°C) until visibly puffy and nearly doubled in size, about 2 hours." },
            { stepNumber: 16, description: "Preheat the oven to 400°F (200°C). Prepare egg wash by beating the egg with 1 tablespoon water." },
            { stepNumber: 17, description: "Gently brush the croissants with egg wash, being careful not to deflate them." },
            { stepNumber: 18, description: "Baking: Bake for 18-22 minutes until deeply golden brown. Transfer to a wire rack to cool slightly before serving." }
          ],
          notes: [
            "Temperature control is crucial throughout the process - the dough should remain cold to prevent the butter from melting into the layers.",
            "If at any point during lamination the butter starts to soften too much or break through the dough, pause and refrigerate before continuing.",
            "European-style butter with higher fat content (at least 82%) is essential for proper lamination and flavor.",
            "The croissants are ready to bake when you can see the layers in the dough and they jiggle slightly when you gently shake the baking sheet.",
            "For chocolate croissants (pain au chocolat), cut the dough into rectangles instead of triangles and place chocolate batons at each end before rolling up from both sides toward the center.",
            "Fermented Ingredients: The dough (détrempe) undergoes yeast fermentation. The butter used may be cultured.",
            "FODMAP Information: High-FODMAP ingredients include flour (fructans) and milk (lactose). Butter contains lactose, but usually in small amounts tolerated by many. Low-FODMAP ingredients: water, sugar, yeast, salt, egg.",
            "Low-FODMAP Recommendations: Achieving a low-FODMAP croissant with traditional texture is very difficult. Use a specialized gluten-free flour blend designed for laminated dough. Use lactose-free milk. Be mindful of portion size due to high fat content (potential IBS trigger) and residual lactose in butter.",
            "Vitamins & Minerals: Flour provides carbohydrates and B vitamins (if fortified). Milk adds calcium. Butter contributes fat-soluble vitamins like A and D. Eggs provide protein."
          ],
          nutritionFacts: {
            protein: 5,
            carbs: 30,
            fat: 22,
            fiber: 1,
            sugar: 5,
            sodium: 190
          }
        },
        {
          title: "ビーガンラーメン (Vegan Ramen)",
          description: "A plant-based adaptation of the beloved Japanese noodle soup that delivers depth, complexity, and satisfaction without animal products. This vegan ramen features a rich, umami-packed broth made from mushrooms, kombu, and miso, complemented by tender noodles and colorful toppings like marinated tofu, seasonal vegetables, and aromatic garnishes. While diverging from traditional pork or chicken-based versions, this thoughtful recreation honors the soul of ramen by balancing flavors and textures for a comforting, nourishing bowl.",
          cookingTime: 90,
          servings: 4,
          difficulty: "MEDIUM",
          cuisineType: "Asia",
          regionOfOrigin: "Japan",
          imageUrl: "/images/recipes/vegan-ramen.jpg",
          calories: 380,
          type: "MAIN",
          isVegetarian: true,
          isVegan: true,
          isGlutenFree: false,
          isLactoseFree: true,
          isNutFree: false,
          isPescatarian: false,
          isFermented: true,
          isLowFodmap: false,
          ingredients: [
            { name: "Dried Shiitake Mushrooms", amount: 1, unit: "oz", notes: "about 10 mushrooms" },
            { name: "Kombu", amount: 1, unit: "6-inch piece", notes: "dried seaweed" },
            { name: "Fresh Shiitake Mushrooms", amount: 8, unit: "oz", notes: "stems removed and sliced" },
            { name: "Ginger", amount: 2, unit: "inches", notes: "peeled and sliced" },
            { name: "Garlic", amount: 6, unit: "cloves", notes: "smashed" },
            { name: "Green Onions", amount: 6, unit: "stalks", notes: "white parts for broth, green parts for garnish" },
            { name: "Miso Paste", amount: 3, unit: "tbsp", notes: "white or red, depending on preference" },
            { name: "Soy Sauce", amount: 0.25, unit: "cup", notes: "or tamari for gluten-free option" },
            { name: "Sesame Oil", amount: 2, unit: "tbsp", notes: "toasted" },
            { name: "Rice Vinegar", amount: 1, unit: "tbsp" },
            { name: "Firm Tofu", amount: 14, unit: "oz", notes: "pressed and cut into 0.5-inch cubes" },
            { name: "Ramen Noodles", amount: 12, unit: "oz", notes: "fresh or dried, egg-free" },
            { name: "Corn Kernels", amount: 1, unit: "cup", notes: "fresh or frozen" },
            { name: "Baby Bok Choy", amount: 4, unit: "small", notes: "halved lengthwise" },
            { name: "Bean Sprouts", amount: 1, unit: "cup", notes: "fresh" },
            { name: "Carrots", amount: 2, unit: "medium", notes: "julienned or cut into thin ribbons" },
            { name: "Nori Sheets", amount: 2, unit: "sheets", notes: "cut into strips" },
            { name: "Sesame Seeds", amount: 2, unit: "tbsp", notes: "toasted" },
            { name: "Chili Oil", amount: 2, unit: "tsp", notes: "optional, for serving" },
            { name: "Water", amount: 8, unit: "cups", notes: "for broth" }
          ],
          instructions: [
            { stepNumber: 1, description: "Prepare the mushroom-kombu dashi: In a large pot, combine the dried shiitake mushrooms, kombu, and 8 cups of water. Bring to just under a boil, then reduce heat and simmer gently for 20 minutes. Remove from heat and let steep for 10 minutes." },
            { stepNumber: 2, description: "Remove the kombu and dried mushrooms from the broth (reserve the rehydrated mushrooms for later use). Strain the broth through a fine-mesh sieve lined with cheesecloth for a clearer result." },
            { stepNumber: 3, description: "Return the strained broth to the pot. Add the ginger, garlic, and white parts of the green onions. Simmer for 20 minutes, then strain again, returning the clear broth to the pot." },
            { stepNumber: 4, description: "Slice the rehydrated shiitake mushrooms and set them aside with the fresh mushrooms." },
            { stepNumber: 5, description: "Prepare the tofu: Preheat the oven to 400°F (200°C). Toss the tofu cubes with 1 tablespoon of soy sauce and 1 tablespoon of sesame oil. Spread on a baking sheet and bake for 20-25 minutes until golden and crispy, turning halfway through." },
            { stepNumber: 6, description: "In a skillet over medium-high heat, add 1 tablespoon of sesame oil. Sauté the fresh and rehydrated shiitake mushrooms until golden brown, about 5-7 minutes. Set aside." },
            { stepNumber: 7, description: "Bring the broth back to a simmer. In a small bowl, whisk together the miso paste with a few tablespoons of the hot broth until smooth, then stir this mixture back into the pot." },
            { stepNumber: 8, description: "Add the remaining soy sauce and rice vinegar to the broth. Taste and adjust seasonings as needed. Keep warm on low heat." },
            { stepNumber: 9, description: "Prepare the noodles according to package instructions, being careful not to overcook. Drain and rinse briefly with cold water to stop the cooking process." },
            { stepNumber: 10, description: "Blanch the baby bok choy in boiling water for 1-2 minutes until bright green and slightly tender. Remove and set aside." },
            { stepNumber: 11, description: "If using frozen corn, blanch briefly; if fresh, it can be added raw." },
            { stepNumber: 12, description: "Assemble the ramen bowls: Divide the cooked noodles among four large bowls. Ladle the hot broth over the noodles." },
            { stepNumber: 13, description: "Arrange the toppings attractively on top of each bowl: baked tofu, sautéed mushrooms, corn, baby bok choy, bean sprouts, and julienned carrots." },
            { stepNumber: 14, description: "Garnish with sliced green parts of the green onions, nori strips, toasted sesame seeds, and a drizzle of chili oil if desired." },
            { stepNumber: 15, description: "Serve immediately while hot, providing additional soy sauce, chili oil, and sesame oil on the side for diners to adjust to their taste." }
          ],
          notes: [
            "For a gluten-free version, use 100% buckwheat soba noodles or rice noodles, and ensure your soy sauce is tamari.",
            "The key to a flavorful vegan ramen is building layers of umami - don't rush the broth-making process.",
            "This recipe is highly customizable; feel free to swap in seasonal vegetables or proteins based on availability.",
            "Homemade chili oil (simply infusing oil with crushed red pepper flakes) can elevate the final dish significantly.",
            "For an even richer broth, roast the fresh mushrooms, garlic, and ginger before adding to the stock.",
            "Fermented Ingredients: Miso paste (fermented soybeans/grains), soy sauce/tamari (fermented soybeans), rice vinegar (fermented rice).",
            "FODMAP Information: High-FODMAP ingredients include dried and fresh shiitake mushrooms (polyols), garlic (fructans), ramen noodles (if wheat - fructans), corn (polyols - limit serving), bok choy (polyols - limit serving), and potentially miso paste/soy sauce (check portion/type). Low-FODMAP ingredients: kombu, ginger, green onion tops, sesame oil, rice vinegar, firm tofu (limit portion), carrots (limit portion), nori, sesame seeds, chili oil, water.",
            "Low-FODMAP Recommendations: Use low-FODMAP oyster mushrooms instead of shiitake, or strain broth well after steeping shiitake. Omit garlic; use garlic-infused oil. Use only green parts of spring onions. Choose gluten-free noodles (rice, buckwheat). Limit corn to 1/2 cob, bok choy to 1 cup, and bean sprouts. Limit carrots. Limit firm tofu to 170g per serve. Use tamari instead of soy sauce and test tolerance to miso paste in small amounts.",
            "Vitamins & Minerals: Tofu provides plant-based protein, iron, and calcium. Mushrooms offer B vitamins and selenium. Kombu is rich in iodine. Miso and soy sauce provide some protein and minerals. Noodles provide carbohydrates. Vegetables like bok choy and carrots contribute Vitamins A, C, and K. Nori adds iodine and other minerals."
          ],
          nutritionFacts: {
            protein: 18,
            carbs: 52,
            fat: 12,
            fiber: 8,
            sugar: 6,
            sodium: 880
          }
        },
        {
          title: "እንጀራ በዶሮ ወጥ (Injera be Doro Wat - Ethiopian Fermented Bread and Chicken Stew)",
          description: "A classic Ethiopian feast featuring injera, a sourdough flatbread made from teff flour, served with spicy chicken stew. The injera's unique tangy flavor and spongy texture perfectly complements the rich, complex flavors of doro wat, which is considered Ethiopia's national dish. The key to its distinctive taste lies in berbere spice blend and niter kibbeh (spiced clarified butter), creating a dish that exemplifies the sophisticated flavors of Ethiopian cuisine.",
          cookingTime: 1080,
          servings: 6,
          difficulty: "MEDIUM",
          cuisineType: "Africa",
          regionOfOrigin: "Ethiopia",
          imageUrl: "/images/recipes/injera_be_doro_wat.jpg",
          calories: 450,
          type: "MAIN",
          isVegetarian: false,
          isVegan: false,
          isGlutenFree: false,
          isLactoseFree: false,
          isNutFree: true,
          isPescatarian: false,
          isFermented: true,
          isLowFodmap: false,
          ingredients: [
            { name: "Teff Flour", amount: 2, unit: "cups", notes: "dark or ivory teff, preferably dark for authentic color" },
            { name: "All-Purpose Flour", amount: 0.5, unit: "cup", notes: "optional, for easier fermentation" },
            { name: "Active Dry Yeast", amount: 0.25, unit: "tsp", notes: "for starter only" },
            { name: "Warm Water", amount: 3, unit: "cups", notes: "for injera batter" },
            { name: "Chicken Legs", amount: 3, unit: "lbs", notes: "cut into pieces, skin removed" },
            { name: "Lemon Juice", amount: 2, unit: "tbsp", notes: "for cleaning chicken" },
            { name: "Berbere Spice", amount: 0.5, unit: "cup", notes: "Ethiopian spice blend" },
            { name: "Niter Kibbeh", amount: 1, unit: "cup", notes: "Ethiopian spiced clarified butter" },
            { name: "Red Onions", amount: 4, unit: "large", notes: "finely diced" },
            { name: "Garlic", amount: 8, unit: "cloves", notes: "minced" },
            { name: "Ginger", amount: 2, unit: "inches", notes: "peeled and minced" },
            { name: "Tomato Paste", amount: 2, unit: "tbsp" },
            { name: "Hard-Boiled Eggs", amount: 6, unit: "whole", notes: "peeled and scored" },
            { name: "Salt", amount: 2, unit: "tsp", notes: "or to taste" }
          ],
          instructions: [
            { stepNumber: 1, description: "For injera: Mix teff flour with warm water and a tiny pinch of yeast. Cover and let ferment in a warm place for 3 days, stirring daily to aerate." },
            { stepNumber: 2, description: "After fermentation, thin the batter with water until it reaches the consistency of crepe batter. Let rest for 30 minutes." },
            { stepNumber: 3, description: "Heat a large non-stick pan or traditional mitad. Pour batter in a spiral from outside to center. Cover and cook until holes form and top is dry, about 3 minutes." },
            { stepNumber: 4, description: "For doro wat: Clean chicken pieces with lemon juice and salt, rinse, and pat dry." },
            { stepNumber: 5, description: "In a large pot, sauté onions in niter kibbeh until deeply caramelized, about 45 minutes." },
            { stepNumber: 6, description: "Add garlic, ginger, and berbere. Cook until fragrant and oil starts to separate, about 15 minutes." },
            { stepNumber: 7, description: "Add tomato paste and cook for 5 minutes. Add chicken pieces and stir to coat well." },
            { stepNumber: 8, description: "Pour in enough water to barely cover chicken. Simmer covered for 45 minutes, stirring occasionally." },
            { stepNumber: 9, description: "Add hard-boiled eggs, simmer for another 15-20 minutes until sauce is thick and chicken is very tender." },
            { stepNumber: 10, description: "Taste and adjust seasoning with salt if needed." },
            { stepNumber: 11, description: "Serve hot doro wat over freshly made injera, with additional injera on the side." }
          ],
          notes: [
            "The injera fermentation process is crucial - the batter should smell sour and have tiny bubbles on the surface.",
            "Traditional injera uses 100% teff flour, but adding some all-purpose flour makes fermentation easier for beginners.",
            "The key to great doro wat is properly caramelizing the onions - they should be deep brown but not burnt.",
            "Authentic berbere and niter kibbeh can be found in Ethiopian markets or made from scratch for best results.",
            "Score the hard-boiled eggs with a knife before adding them to the stew - this helps them absorb the sauce.",
            "The consistency of injera batter should be like slightly thick crepe batter - it should spread easily when poured.",
            "Never stir injera while cooking - this will ruin the formation of the characteristic holes (eyes).",
            "Leftover injera can be stored at room temperature for 1-2 days, wrapped in a clean cloth.",
            "Fermented Ingredients: Injera is a sourdough flatbread made from fermenting teff flour batter over several days. Niter kibbeh might be made from cultured butter.",
            "FODMAP Information: High-FODMAP ingredients include injera (Teff can be high in large portions, plus optional wheat flour - fructans), the large quantity of red onions (fructans), garlic (fructans), and potentially berbere spice mix (check for onion/garlic powder). Low-FODMAP ingredients: chicken, lemon juice, niter kibbeh (clarified butter = low lactose), ginger, tomato paste (limit portion), eggs, salt.",
            "Low-FODMAP Recommendations: This dish is very challenging to adapt. Limit injera portion size significantly. Replacing the large volume of onions with low-FODMAP alternatives (like green leek/spring onion tops) will drastically alter the traditional flavour. Omit garlic; use garlic-infused niter kibbeh if possible. Ensure berbere spice mix is free from onion/garlic powder.",
            "Vitamins & Minerals: Teff flour is rich in iron, calcium, fiber, and protein. Chicken provides protein and B vitamins. Onions offer Vitamin C. Niter kibbeh adds fat-soluble vitamins (from butter). Eggs contribute protein and choline. Berbere spices contain various antioxidants."
          ],
          nutritionFacts: {
            protein: 32,
            carbs: 45,
            fat: 28,
            fiber: 6,
            sugar: 4,
            sodium: 720
          }
        },
        {
          title: "Phở (Pho - Vietnamese Noodle Soup)",
          description: "An iconic Vietnamese soup featuring a deeply aromatic beef broth, rice noodles, thinly sliced beef, and an abundance of fresh herbs and garnishes. The heart of pho lies in its complex broth, which is traditionally simmered for hours with beef bones, charred onions, ginger, and a careful balance of warm spices like star anise, cinnamon, and cloves. This national dish of Vietnam marries Chinese and French culinary influences and is enjoyed at any time of day, though many Vietnamese consider it the perfect breakfast.",
          cookingTime: 240,
          servings: 6,
          difficulty: "MEDIUM",
          cuisineType: "Asia",
          regionOfOrigin: "Vietnam",
          imageUrl: "/images/recipes/vietnamese-pho.jpg",
          calories: 420,
          type: "MAIN",
          isVegetarian: false,
          isVegan: false,
          isGlutenFree: true,
          isLactoseFree: true,
          isNutFree: true,
          isPescatarian: false,
          isFermented: true,
          isLowFodmap: false,
          ingredients: [
            { name: "Beef Bones", amount: 5, unit: "lbs", notes: "preferably knuckle, marrow, and oxtail bones" },
            { name: "Beef Chuck", amount: 1.5, unit: "lbs", notes: "or brisket, cut into large chunks" },
            { name: "Beef Sirloin", amount: 1, unit: "lb", notes: "thinly sliced for serving" },
            { name: "Yellow Onions", amount: 2, unit: "large", notes: "halved and charred" },
            { name: "Ginger", amount: 4, unit: "inches", notes: "sliced lengthwise and charred" },
            { name: "Star Anise", amount: 5, unit: "whole" },
            { name: "Cinnamon Stick", amount: 1, unit: "whole", notes: "about 4 inches" },
            { name: "Coriander Seeds", amount: 1, unit: "tbsp", notes: "whole" },
            { name: "Fennel Seeds", amount: 1, unit: "tsp", notes: "whole" },
            { name: "Cloves", amount: 5, unit: "whole" },
            { name: "Cardamom Pods", amount: 3, unit: "whole" },
            { name: "Fish Sauce", amount: 0.25, unit: "cup", notes: "high-quality" },
            { name: "Rock Sugar", amount: 1, unit: "oz", notes: "or 1 tablespoon regular sugar" },
            { name: "Salt", amount: 1, unit: "tbsp", notes: "or to taste" },
            { name: "Rice Noodles", amount: 1, unit: "lb", notes: "dried, flat, about 0.25 inch wide" },
            { name: "Green Onions", amount: 4, unit: "stalks", notes: "thinly sliced" },
            { name: "White Onion", amount: 0.5, unit: "medium", notes: "very thinly sliced" },
            { name: "Fresh Bean Sprouts", amount: 2, unit: "cups", notes: "for serving" },
            { name: "Thai Basil", amount: 1, unit: "bunch", notes: "for serving" },
            { name: "Cilantro", amount: 0.5, unit: "cup", notes: "chopped, for serving" },
            { name: "Lime", amount: 2, unit: "whole", notes: "cut into wedges, for serving" },
            { name: "Thai Bird's Eye Chilies", amount: 4, unit: "whole", notes: "sliced, for serving" },
            { name: "Hoisin Sauce", amount: 1, unit: "bottle", notes: "for serving" },
            { name: "Sriracha Sauce", amount: 1, unit: "bottle", notes: "for serving" }
          ],
          instructions: [
            { stepNumber: 1, description: "Prepare the bones and meat: Rinse the beef bones thoroughly under cold water. Place in a large stockpot and cover with cold water. Bring to a boil and cook for 5 minutes to remove impurities." },
            { stepNumber: 2, description: "Drain the bones and rinse the pot. Return the bones to the clean pot with the beef chuck or brisket. Add 6 quarts of cold water and bring to a gentle simmer." },
            { stepNumber: 3, description: "Char the aromatics: Place the halved onions and sliced ginger cut-side down on a baking sheet. Broil until charred, about 5 minutes, or char directly over a gas flame using tongs. Add to the stockpot." },
            { stepNumber: 4, description: "Prepare the spices: In a dry skillet over medium heat, toast the star anise, cinnamon, coriander seeds, fennel seeds, cloves, and cardamom pods until fragrant, about 2-3 minutes. Transfer to a spice bag or wrap in cheesecloth and secure with kitchen twine." },
            { stepNumber: 5, description: "Add the spice packet to the stockpot. Simmer, partially covered, for 3 hours, occasionally skimming off any foam or fat that rises to the surface." },
            { stepNumber: 6, description: "After 1.5 hours, remove the beef chuck or brisket pieces when tender. Allow to cool, then thinly slice and set aside for serving." },
            { stepNumber: 7, description: "Continue simmering the broth for the remaining time. After 3 hours total, remove the bones, spice packet, onions, and ginger from the broth and discard." },
            { stepNumber: 8, description: "Season the broth with fish sauce, rock sugar, and salt to taste. The broth should be a balance of savory, slightly sweet, and aromatic." },
            { stepNumber: 9, description: "Keep the broth at a low simmer while preparing the remaining components." },
            { stepNumber: 10, description: "Prepare the noodles: Cook the rice noodles according to package instructions until just tender. Drain and rinse under cold water to stop the cooking process." },
            { stepNumber: 11, description: "Prepare the fresh toppings: Arrange the bean sprouts, Thai basil, lime wedges, and sliced chilies on a platter for serving." },
            { stepNumber: 12, description: "Place the raw sirloin slices on a separate plate. The meat should be sliced as thinly as possible (partially freezing it first can help with this)." },
            { stepNumber: 13, description: "Assemble the pho: Divide the cooked noodles among 6 large, deep soup bowls. Top each with some of the cooked beef and several slices of raw sirloin." },
            { stepNumber: 14, description: "Ladle the hot broth directly over the raw beef to cook it partially. Top with sliced green onions, white onion, and cilantro." },
            { stepNumber: 15, description: "Serve immediately, allowing each person to customize their bowl with bean sprouts, herbs, lime juice, chilies, hoisin sauce, and sriracha according to their preference." }
          ],
          notes: [
            "The depth of flavor in pho comes from properly charring the onions and ginger, which adds a subtle smoky sweetness to the broth.",
            "Blanching the bones before making the broth helps remove impurities and results in a clearer final product.",
            "For an authentic touch, some cooks add a small piece of Chinese rock sugar to the broth, but regular sugar works as well.",
            "The key to properly cooked rice noodles is to slightly undercook them, as they'll continue to soften in the hot broth.",
            "Traditional pho is served with the raw beef on top, which gently cooks in the hot broth. If preferred, you can fully cook all the beef before serving.",
            "Fermented Ingredients: Fish sauce (fermented anchovies), hoisin sauce (often contains fermented soybean paste), sriracha (fermented chilies).",
            "FODMAP Information: High-FODMAP ingredients include onions (fructans) used in broth and garnish, potentially garlic (fructans - often used traditionally), hoisin sauce, and sriracha (check labels/portions). Low-FODMAP ingredients: beef/bones, ginger, whole spices, fish sauce (check portion), sugar, salt, rice noodles (limit portion), green onion tops, bean sprouts (limit portion), Thai basil, cilantro, lime, chilies (test tolerance).",
            "Low-FODMAP Recommendations: Omit onions and garlic from broth and garnish. Use only green parts of spring onions for garnish. Avoid hoisin and sriracha or use certified low-FODMAP versions. Limit rice noodle serving size (approx 1 cup cooked) and bean sprouts.",
            "Vitamins & Minerals: Beef provides protein, iron, zinc, and B12. Bone broth contributes collagen and minerals like calcium and phosphorus. Fish sauce adds sodium and umami. Rice noodles offer carbohydrates. Fresh herbs provide antioxidants and vitamins (like Vitamin K from basil, C from cilantro and lime)."
          ],
          nutritionFacts: {
            protein: 35,
            carbs: 48,
            fat: 15,
            fiber: 3,
            sugar: 6,
            sodium: 950
          }
        },
        {
          title: "Boeuf Bourguignon (French Beef Stew)",
          description: "A classic French dish of beef slowly braised in red wine with carrots, pearl onions, and mushrooms. This hearty stew originated in the Burgundy region of France, known for its exceptional wines and rich cuisine. The long, slow cooking process transforms tough cuts of beef into tender morsels while creating a deeply flavorful sauce that exemplifies the rustic elegance of French country cooking.",
          cookingTime: 180,
          servings: 6,
          difficulty: "MEDIUM",
          cuisineType: "Europe",
          regionOfOrigin: "France",
          imageUrl: "/images/recipes/boeuf-bourguignon.jpg",
          calories: 520,
          type: "MAIN",
          isVegetarian: false,
          isVegan: false,
          isGlutenFree: true,
          isLactoseFree: false,
          isNutFree: true,
          isPescatarian: false,
          isFermented: true,
          isLowFodmap: false,
          ingredients: [
            { name: "Beef Chuck", amount: 1.5, unit: "kg", notes: "cut into 5cm cubes" },
            { name: "Bacon", amount: 200, unit: "g", notes: "thick cut, diced" },
            { name: "Red Wine", amount: 750, unit: "ml", notes: "full-bodied, preferably Burgundy" },
            { name: "Beef Stock", amount: 500, unit: "ml", notes: "homemade preferred" },
            { name: "Tomato Paste", amount: 2, unit: "tbsp" },
            { name: "Carrots", amount: 4, unit: "medium", notes: "cut into chunks" },
            { name: "Pearl Onions", amount: 20, unit: "small", notes: "peeled" },
            { name: "Button Mushrooms", amount: 500, unit: "g", notes: "quartered" },
            { name: "Garlic", amount: 4, unit: "cloves", notes: "minced" },
            { name: "Butter", amount: 3, unit: "tbsp", notes: "divided" },
            { name: "All-Purpose Flour", amount: 3, unit: "tbsp" },
            { name: "Bouquet Garni", amount: 1, unit: "bundle", notes: "thyme, parsley, and bay leaf tied together" },
            { name: "Olive Oil", amount: 2, unit: "tbsp" },
            { name: "Salt", amount: 1, unit: "tsp", notes: "to taste" },
            { name: "Black Pepper", amount: 1, unit: "tsp", notes: "freshly ground, to taste" },
            { name: "Fresh Parsley", amount: 3, unit: "tbsp", notes: "chopped, for garnish" }
          ],
          instructions: [
            { stepNumber: 1, description: "Preheat oven to 160°C (325°F). Pat the beef chunks dry with paper towels and season generously with salt and pepper." },
            { stepNumber: 2, description: "In a large Dutch oven, cook the diced bacon over medium heat until crispy and fat is rendered. Remove with a slotted spoon and set aside, leaving the fat in the pot." },
            { stepNumber: 3, description: "Increase heat to medium-high. Working in batches to avoid overcrowding, brown the beef chunks on all sides in the bacon fat, about 3-4 minutes per batch. Transfer browned beef to a plate." },
            { stepNumber: 4, description: "In the same pot, add carrots and pearl onions. Cook for 5 minutes until they begin to brown. Add garlic and cook for 1 minute more." },
            { stepNumber: 5, description: "Return the beef and bacon to the pot. Sprinkle flour over the meat and vegetables, stirring to coat evenly." },
            { stepNumber: 6, description: "Add the wine, beef stock, and tomato paste. Stir well, scraping the bottom of the pot to release any browned bits. Add the bouquet garni and bring to a simmer." },
            { stepNumber: 7, description: "Once simmering, cover the pot and transfer to the preheated oven. Cook for 2.5 to 3 hours, until the beef is fork-tender." },
            { stepNumber: 8, description: "About 30 minutes before the stew is done, heat 2 tablespoons of butter and the olive oil in a large skillet over medium heat. Add the mushrooms and cook until browned and their moisture has evaporated, about 8-10 minutes." },
            { stepNumber: 9, description: "When the stew is done, remove from oven and discard the bouquet garni. Gently stir in the sautéed mushrooms." },
            { stepNumber: 10, description: "Taste and adjust seasoning with salt and pepper as needed. If the sauce seems too thin, simmer uncovered on the stovetop for a few minutes to reduce." },
            { stepNumber: 11, description: "Serve hot, garnished with fresh chopped parsley, alongside crusty bread, mashed potatoes, or buttered noodles." }
          ],
          notes: [
            "For authentic flavor, use a Burgundy wine such as Pinot Noir. If unavailable, any full-bodied red wine will work.",
            "This stew tastes even better the next day, making it perfect for preparing ahead of time.",
            "To peel pearl onions easily, blanch them in boiling water for 1 minute, then shock in ice water. The skins will slip off.",
            "For a thicker stew, you can make a beurre manié by kneading together equal parts flour and softened butter, then stirring it into the hot stew near the end of cooking.",
            "If you don't have a Dutch oven, you can transfer everything to a covered casserole dish for the oven portion of cooking.",
            "Fermented Ingredients: Red wine (yeast fermentation). Butter may be cultured. Beef stock might contain fermented enhancers.",
            "FODMAP Information: High-FODMAP ingredients include red wine (fructans/fructose - limit serving), pearl onions (fructans), button mushrooms (polyols), garlic (fructans), all-purpose flour (fructans), and potentially beef stock (check for onion/garlic). Low-FODMAP ingredients: beef, bacon (check additives), tomato paste (limit portion), carrots (limit portion), butter (small amounts), bouquet garni, olive oil, salt, pepper, parsley.",
            "Low-FODMAP Recommendations: Limit red wine quantity used in cooking (approx. 150ml per serving may be tolerated) or substitute with low-FODMAP broth. Replace pearl onions with green parts of leeks/spring onions (add later in cooking). Use low-FODMAP oyster mushrooms instead of button mushrooms. Omit garlic; use garlic-infused oil. Use gluten-free flour or cornstarch slurry for thickening. Use certified low-FODMAP beef stock. Limit carrot portion.",
            "Vitamins & Minerals: Beef is rich in protein, iron, zinc, and B12. Red wine contributes antioxidants (in moderation). Carrots provide Vitamin A. Mushrooms offer B vitamins and selenium. Onions contain Vitamin C. Butter adds fat-soluble vitamins."
          ],
          nutritionFacts: {
            protein: 45,
            carbs: 16,
            fat: 28,
            fiber: 3,
            sugar: 6,
            sodium: 680
          }
        },
        {
          title: "Pönnukökur (Icelandic Pancakes)",
          description: "Delicate, thin Icelandic pancakes similar to French crêpes but with distinctive Nordic flavors and traditions. These elegant pancakes are thinner than American-style pancakes and have a subtle hint of cardamom, reflecting Iceland's connection to Scandinavian culinary traditions. Traditionally cooked on a special ridged pan called a pönnukökupanna, they're served rolled or folded with sugar, jam, or whipped cream. Pönnukökur are central to Icelandic hospitality, offered to guests alongside coffee and are a beloved treat for both everyday enjoyment and special occasions.",
          cookingTime: 40,
          servings: 12,
          difficulty: "EASY",
          cuisineType: "Europe",
          regionOfOrigin: "Iceland",
          imageUrl: "/images/recipes/ponnukokur.jpg",
          calories: 120,
          type: "BREAKFAST",
          isVegetarian: true,
          isVegan: false,
          isGlutenFree: false,
          isLactoseFree: false,
          isNutFree: true,
          isPescatarian: false,
          isFermented: true,
          isLowFodmap: false,
          ingredients: [
            { name: "All-Purpose Flour", amount: 250, unit: "g", notes: "sifted" },
            { name: "Sugar", amount: 2, unit: "tbsp" },
            { name: "Salt", amount: 0.25, unit: "tsp" },
            { name: "Baking Powder", amount: 1, unit: "tsp" },
            { name: "Ground Cardamom", amount: 0.5, unit: "tsp", notes: "optional but traditional" },
            { name: "Eggs", amount: 3, unit: "large", notes: "room temperature" },
            { name: "Milk", amount: 500, unit: "ml", notes: "room temperature" },
            { name: "Butter", amount: 50, unit: "g", notes: "melted, plus more for cooking" },
            { name: "Vanilla Extract", amount: 1, unit: "tsp" },
            { name: "Granulated Sugar", amount: 50, unit: "g", notes: "for sprinkling" },
            { name: "Whipped Cream", amount: 250, unit: "ml", notes: "whipped to soft peaks" },
            { name: "Jam", amount: 120, unit: "ml", notes: "preferably rhubarb or blueberry" },
            { name: "Fresh Berries", amount: 200, unit: "g", notes: "optional, for serving" }
          ],
          instructions: [
            { stepNumber: 1, description: "In a large bowl, whisk together the flour, sugar, salt, baking powder, and cardamom (if using)." },
            { stepNumber: 2, description: "In a separate bowl or large measuring cup, whisk the eggs until well beaten. Add the milk, melted butter, and vanilla extract, whisking to combine." },
            { stepNumber: 3, description: "Gradually pour the wet ingredients into the dry ingredients, whisking continuously to prevent lumps from forming. The batter should be very thin, similar to heavy cream in consistency." },
            { stepNumber: 4, description: "Let the batter rest for at least 30 minutes at room temperature. This allows the flour to fully hydrate and results in more tender pancakes." },
            { stepNumber: 5, description: "Heat a pönnukökupanna (Icelandic pancake pan) or a regular non-stick crepe pan over medium heat. If you don't have a special pancake pan, any flat, non-stick skillet will work." },
            { stepNumber: 6, description: "When the pan is hot, lightly brush with butter. Using a ladle, pour just enough batter to thinly coat the bottom of the pan when you tilt and rotate it (about 3-4 tablespoons for a standard-sized pan)." },
            { stepNumber: 7, description: "Cook until the top of the pancake begins to look dry and the edges start to curl slightly, about 1-2 minutes. The bottom should be golden brown." },
            { stepNumber: 8, description: "Flip the pancake using a thin spatula (or with a flick of your wrist if you're experienced) and cook the other side for about 30 seconds to 1 minute." },
            { stepNumber: 9, description: "Transfer the cooked pancake to a plate and cover with a clean kitchen towel to keep warm. Continue with the remaining batter, adding a tiny bit of butter to the pan for each pancake as needed." },
            { stepNumber: 10, description: "Stack the pancakes with a piece of parchment paper between each one to prevent sticking." },
            { stepNumber: 11, description: "To serve in the traditional Icelandic way, sprinkle each pancake with granulated sugar while still warm." },
            { stepNumber: 12, description: "Either roll the pancakes into tubes or fold them into quarters (first in half, then in half again to form a triangle)." },
            { stepNumber: 13, description: "Serve with whipped cream and jam. In Iceland, rhubarb jam and blueberry jam are particularly traditional, but any berry jam works beautifully." }
          ],
          notes: [
            "The batter should be very thin - if it's too thick, the pancakes won't develop their characteristic lacy edges.",
            "Room temperature ingredients are crucial for achieving the right batter consistency.",
            "The traditional pönnukökupanna has ridges that create a beautiful pattern on the pancakes.",
            "Let the pan heat thoroughly before starting to cook - a properly heated pan is key to getting the right texture.",
            "The first pancake is often not perfect - this is normal and known as 'the cook's pancake'.",
            "If making ahead, stack with parchment paper between each pancake and reheat briefly before serving.",
            "The cardamom is subtle but authentic - don't skip it if you want the true Icelandic experience.",
            "Leftover batter can be stored in the refrigerator for up to 24 hours.",
            "Fermented Ingredients: Butter may be made from cultured cream. The source of whipped cream could also be cultured.",
            "FODMAP Information: High-FODMAP ingredients include all-purpose flour (fructans), milk (lactose), whipped cream (lactose), and potentially jam (depending on fruit and sweeteners) and berries (depending on type/quantity). Low-FODMAP ingredients: sugar, salt, baking powder, cardamom, eggs, butter (small amounts), vanilla. Strawberries and blueberries are low FODMAP in limited portions.",
            "Low-FODMAP Recommendations: Use a gluten-free flour blend suitable for thin pancakes/crepes. Use lactose-free milk. Use lactose-free whipped cream or whipped coconut cream. Choose low-FODMAP jam (like strawberry) and check for high-FODMAP sweeteners (like HFCS or large amounts of fructose). Serve with low-FODMAP berry portions (e.g., strawberries, blueberries).",
            "Vitamins & Minerals: Flour provides carbohydrates. Eggs offer protein and choline. Milk and cream contribute calcium and fat. Butter adds fat-soluble vitamins. Cardamom contains antioxidants. Berries and jam provide Vitamin C and fiber."
          ],
          nutritionFacts: {
            protein: 5,
            carbs: 18,
            fat: 4,
            fiber: 1,
            sugar: 6,
            sodium: 120
          }
        },
        {
          title: "Karjalanpiirakka (Karelian Pies)",
          description: "Traditional Finnish pastries originating from the region of Karelia, consisting of a thin rye crust filled with creamy rice porridge. These oval-shaped, open-faced pies are a beloved staple in Finnish cuisine, typically served with munavoi (egg butter) - a mixture of hard-boiled eggs and butter. Karelian pies showcase Finland's culinary history with Russia and represent the resourcefulness of northern cooking traditions, where simple ingredients create something extraordinary. They're enjoyed at breakfast, as snacks, or alongside soups and are an essential part of Finnish celebrations and everyday meals alike.",
          cookingTime: 120,
          servings: 15,
          difficulty: "MEDIUM",
          cuisineType: "Europe",
          regionOfOrigin: "Finland",
          imageUrl: "/images/recipes/karjalanpiirakka.jpg",
          calories: 180,
          type: "SIDE",
          isVegetarian: true,
          isVegan: false,
          isGlutenFree: false,
          isLactoseFree: false,
          isNutFree: true,
          isPescatarian: false,
          isFermented: true,
          isLowFodmap: false,
          ingredients: [
            { name: "Short-grain Rice", amount: 300, unit: "g", notes: "for filling" },
            { name: "Whole Milk", amount: 1, unit: "liter", notes: "for filling" },
            { name: "Water", amount: 500, unit: "ml", notes: "for filling" },
            { name: "Salt", amount: 1, unit: "tsp", notes: "for filling" },
            { name: "Rye Flour", amount: 200, unit: "g", notes: "for pastry" },
            { name: "All-purpose Flour", amount: 100, unit: "g", notes: "for pastry" },
            { name: "Water", amount: 250, unit: "ml", notes: "for pastry dough, lukewarm" },
            { name: "Salt", amount: 1, unit: "tsp", notes: "for pastry dough" },
            { name: "Eggs", amount: 3, unit: "large", notes: "hard-boiled, for egg butter" },
            { name: "Butter", amount: 100, unit: "g", notes: "softened, for egg butter" },
            { name: "Salt", amount: 0.25, unit: "tsp", notes: "for egg butter" },
            { name: "Butter", amount: 50, unit: "g", notes: "melted, for brushing" },
            { name: "Milk", amount: 50, unit: "ml", notes: "warm, for brushing after baking" }
          ],
          instructions: [
            { stepNumber: 1, description: "Start with the filling: Combine rice, milk, water, and salt in a large pot. Bring to a boil, then reduce heat to low. Simmer, stirring frequently, for about 45-50 minutes until rice is very tender and porridge is thick. Let cool completely." },
            { stepNumber: 2, description: "For the dough: Mix rye flour, all-purpose flour, and salt in a large bowl. Gradually add lukewarm water while mixing to form a smooth, pliable dough. Knead for about 10 minutes until elastic." },
            { stepNumber: 3, description: "Preheat the oven to 250°C (480°F). Line two baking sheets with parchment paper." },
            { stepNumber: 4, description: "Divide the dough into 15 equal portions. On a floured surface, roll each portion into a very thin oval, approximately 15x20cm." },
            { stepNumber: 5, description: "Place about 2-3 tablespoons of the cooled rice porridge in the center of each oval, leaving a border around the edges." },
            { stepNumber: 6, description: "Fold the edges over the filling, pinching and crimping to create the characteristic ridged border." },
            { stepNumber: 7, description: "Mix melted butter with warm milk for brushing." },
            { stepNumber: 8, description: "Place the pies on the prepared baking sheets." },
            { stepNumber: 9, description: "Bake each batch for 10-15 minutes until the edges are crisp and lightly browned." },
            { stepNumber: 10, description: "While the pies are baking, prepare the egg butter: Peel and chop the hard-boiled eggs finely, then mix with the softened butter and salt until well combined but still somewhat chunky." },
            { stepNumber: 11, description: "As soon as the pies come out of the oven, brush them generously with the butter-milk mixture. This softens the crust and adds flavor." },
            { stepNumber: 12, description: "Place the brushed pies on a cooling rack and cover with a clean kitchen towel to keep them soft as they cool." },
            { stepNumber: 13, description: "Serve warm or at room temperature with egg butter on top." }
          ],
          notes: [
            "The key to authentic Karelian pies is rolling the dough extremely thin – traditional bakers pride themselves on how many 'landscapes' (thin spots where the filling shows through) they can create.",
            "The porridge filling should be thick enough to hold its shape but still creamy. It will continue to thicken as it cools.",
            "Traditionally, these pies were made with water instead of milk for the filling, but modern versions typically use milk for a creamier result.",
            "For best results, consume the pies on the same day they're made. To reheat, sprinkle with a little water and warm in the oven at 150°C (300°F) for about 10 minutes.",
            "While the traditional filling is rice porridge, variations include mashed potato, carrot, or barley.",
            "Fermented Ingredients: Butter may be made from cultured cream.",
            "FODMAP Information: High-FODMAP ingredients include rye flour (fructans), all-purpose flour (fructans), and milk (lactose) used in the filling and brushing. Low-FODMAP ingredients: rice (limit portion), water, salt, eggs, butter (limit portion).",
            "Low-FODMAP Recommendations: Use a gluten-free flour blend (containing low-FODMAP flours like rice, tapioca, potato starch) for the crust; texture will differ. Use lactose-free milk for the filling and brushing mixture. Be mindful of portion size due to rice content.",
            "Vitamins & Minerals: Rice provides carbohydrates. Milk adds calcium. Rye flour offers fiber and manganese. Eggs contribute protein, Vitamin D, and choline. Butter provides fat-soluble vitamins."
          ],
          nutritionFacts: {
            protein: 6,
            carbs: 24,
            fat: 8,
            fiber: 2,
            sugar: 4,
            sodium: 280
          }
        },
        {
          title: "Pierogi (Polish Dumplings)",
          description: "Beloved Polish dumplings with a tender dough wrapped around various fillings, traditionally served with caramelized onions and sour cream. These half-moon shaped pockets of goodness are central to Polish cuisine and culture, appearing at everything from everyday meals to Christmas Eve dinner. While this recipe features the classic potato and cheese filling (ruskie), pierogi can contain numerous sweet or savory fillings, each with its own regional or family traditions. Making pierogi is often a communal activity in Polish homes, with family members gathering to prepare these time-honored treats together.",
          cookingTime: 120,
          servings: 6,
          difficulty: "MEDIUM",
          cuisineType: "Europe",
          regionOfOrigin: "Poland",
          imageUrl: "/images/recipes/pierogi.jpg",
          calories: 380,
          type: "MAIN",
          isVegetarian: true,
          isVegan: false,
          isGlutenFree: false,
          isLactoseFree: false,
          isNutFree: true,
          isPescatarian: false,
          isFermented: true,
          isLowFodmap: false,
          ingredients: [
            { name: "All-Purpose Flour", amount: 3, unit: "cups", notes: "for the dough" },
            { name: "Eggs", amount: 2, unit: "large", notes: "for the dough" },
            { name: "Sour Cream", amount: 3, unit: "tbsp", notes: "for the dough" },
            { name: "Water", amount: 0.5, unit: "cup", notes: "warm, for the dough" },
            { name: "Vegetable Oil", amount: 2, unit: "tbsp", notes: "for the dough" },
            { name: "Salt", amount: 1, unit: "tsp", notes: "for the dough" },
            { name: "Potatoes", amount: 1, unit: "kg", notes: "starchy variety like Russet, peeled, for filling" },
            { name: "Farmers Cheese", amount: 250, unit: "g", notes: "or dry curd cottage cheese, for filling" },
            { name: "Onion", amount: 1, unit: "medium", notes: "finely chopped, for filling" },
            { name: "Butter", amount: 2, unit: "tbsp", notes: "for filling" },
            { name: "Salt", amount: 1, unit: "tsp", notes: "or to taste, for filling" },
            { name: "Black Pepper", amount: 0.5, unit: "tsp", notes: "freshly ground, for filling" },
            { name: "Onions", amount: 2, unit: "large", notes: "thinly sliced, for serving" },
            { name: "Butter", amount: 4, unit: "tbsp", notes: "for caramelizing onions and tossing cooked pierogi" },
            { name: "Sour Cream", amount: 1, unit: "cup", notes: "for serving" }
          ],
          instructions: [
            { stepNumber: 1, description: "Make the filling: Boil peeled potatoes in salted water until tender, about 15-20 minutes. Drain well and mash until smooth." },
            { stepNumber: 2, description: "While potatoes are cooking, melt butter in a skillet over medium heat. Add the chopped onion and sauté until golden brown, about 5-7 minutes." },
            { stepNumber: 3, description: "Mix the mashed potatoes with the sautéed onions, farmers cheese, salt, and pepper. Stir until well combined and smooth. Let cool while you prepare the dough." },
            { stepNumber: 4, description: "Make the dough: In a large bowl, combine flour and salt. Make a well in the center and add eggs, sour cream, and oil." },
            { stepNumber: 5, description: "Gradually add warm water while mixing with a fork to incorporate the flour from the sides. Once the dough starts to come together, turn it onto a floured surface." },
            { stepNumber: 6, description: "Knead the dough for about 5-7 minutes until it becomes smooth and elastic. Cover with a damp kitchen towel or plastic wrap and let rest for 30 minutes." },
            { stepNumber: 7, description: "Divide the dough into manageable portions. On a floured surface, roll each portion to about 1/8 inch (3mm) thickness." },
            { stepNumber: 8, description: "Using a 3-inch (7.5cm) round cutter or a glass, cut circles from the rolled dough." },
            { stepNumber: 9, description: "Place a tablespoon of filling in the center of each circle. Fold the dough over to create a half-moon shape and press edges firmly to seal. You can create a decorative edge by pinching or pressing with a fork." },
            { stepNumber: 10, description: "Place the formed pierogi on a floured surface or parchment-lined tray, not touching each other to prevent sticking." },
            { stepNumber: 11, description: "Meanwhile, prepare the caramelized onions for serving: In a large skillet, melt 2 tablespoons of butter over medium-low heat. Add thinly sliced onions and cook, stirring occasionally, until golden brown and caramelized, about 20-25 minutes." },
            { stepNumber: 12, description: "Bring a large pot of salted water to a gentle boil. Working in batches, carefully drop pierogi into the boiling water. Once they float to the surface (about 2-3 minutes), cook for another minute." },
            { stepNumber: 13, description: "Remove cooked pierogi with a slotted spoon. In a large skillet, melt the remaining butter and lightly pan-fry the boiled pierogi until they develop golden spots, about 2-3 minutes per side." },
            { stepNumber: 14, description: "Serve hot, topped with caramelized onions and a dollop of sour cream." }
          ],
          notes: [
            "For the best texture, don't overwork the dough. It should be soft and slightly tacky, but not sticky.",
            "Pierogi freeze exceptionally well before cooking. Arrange them on a parchment-lined tray so they're not touching, freeze until solid, then transfer to freezer bags. Cook from frozen, adding a few extra minutes to the boiling time.",
            "Traditional variations include sweet fillings like sweetened farmer's cheese with vanilla or fruit, sauerkraut and mushroom filling (popular for Christmas Eve), and meat fillings with ground pork or beef.",
            "In Poland, leftover pierogi are often pan-fried for breakfast the next day - they develop a wonderful crispy exterior.",
            "If you can't find farmer's cheese, you can substitute with a mixture of ricotta and feta, drained cottage cheese, or quark.",
            "Fermented Ingredients: Sour cream is made via fermentation (cultured cream). Farmer's cheese and butter may also involve cultures.",
            "FODMAP Information: High-FODMAP ingredients include all-purpose flour (fructans), sour cream (lactose), farmer's cheese (lactose content varies, often moderate to high), and onions (fructans, both in filling and garnish). Low-FODMAP ingredients: eggs, water, oil, salt, potatoes, butter (small amounts), pepper.",
            "Low-FODMAP Recommendations: Use a gluten-free flour blend suitable for dumplings/pasta. Use lactose-free sour cream. Substitute farmer's cheese with lactose-free cottage cheese or test tolerance with a small amount. Omit onions from filling and garnish; use green parts of spring onions or chives for garnish, and serve with garlic/onion-infused butter instead of caramelized onions.",
            "Vitamins & Minerals: Flour provides carbohydrates. Potatoes offer potassium and Vitamin C. Eggs contribute protein and choline. Cheese and sour cream add calcium and fat. Butter provides fat-soluble vitamins."
          ],
          nutritionFacts: {
            protein: 12,
            carbs: 48,
            fat: 18,
            fiber: 3,
            sugar: 4,
            sodium: 620
          }
        },
        {
          title: "Caldo Verde (Portuguese Green Soup)",
          description: "A simple yet flavorful Portuguese soup originating from the northern Minho province, featuring potatoes, collard greens, and chouriço sausage. This iconic soup represents the essence of Portuguese cuisine - humble ingredients transformed into something extraordinary through careful preparation. The creamy potato base contrasts perfectly with the ribbons of dark greens and smoky sausage, creating a nutritious and satisfying meal that's enjoyed year-round, from family dinners to festivals and celebrations throughout Portugal.",
          cookingTime: 45,
          servings: 6,
          difficulty: "EASY",
          cuisineType: "Europe",
          regionOfOrigin: "Portugal",
          imageUrl: "/images/recipes/caldo-verde.jpg",
          calories: 280,
          type: "MAIN",
          isVegetarian: false,
          isVegan: false,
          isGlutenFree: true,
          isLactoseFree: true,
          isNutFree: true,
          isPescatarian: false,
          isFermented: true,
          isLowFodmap: false,
          ingredients: [
            { name: "Potatoes", amount: 1, unit: "kg", notes: "peeled and roughly chopped" },
            { name: "Collard Greens", amount: 400, unit: "g", notes: "or kale, stems removed and thinly sliced into ribbons" },
            { name: "Onion", amount: 1, unit: "large", notes: "finely chopped" },
            { name: "Garlic", amount: 4, unit: "cloves", notes: "minced" },
            { name: "Portuguese Chouriço", amount: 200, unit: "g", notes: "or Spanish chorizo, sliced" },
            { name: "Olive Oil", amount: 60, unit: "ml", notes: "extra virgin, divided" },
            { name: "Water", amount: 2, unit: "liters", notes: "or chicken stock for more flavor" },
            { name: "Salt", amount: 1.5, unit: "tsp", notes: "or to taste" },
            { name: "Black Pepper", amount: 0.5, unit: "tsp", notes: "freshly ground" },
            { name: "Crusty Bread", amount: 1, unit: "loaf", notes: "for serving" }
          ],
          instructions: [
            { stepNumber: 1, description: "Prepare the collard greens: Remove the tough stems and central ribs. Stack the leaves, roll them tightly, and slice into very thin strips (chiffonade). Traditional caldo verde has extremely thin ribbons of greens, about 1/8 inch (3mm) wide." },
            { stepNumber: 2, description: "In a large pot, heat 2 tablespoons of olive oil over medium heat. Add the chopped onion and sauté until translucent, about 5 minutes." },
            { stepNumber: 3, description: "Add the minced garlic and cook for another minute until fragrant, being careful not to burn it." },
            { stepNumber: 4, description: "Add the peeled and chopped potatoes to the pot, stirring to coat with oil." },
            { stepNumber: 5, description: "Pour in the water or stock and add 1 teaspoon of salt. Bring to a boil, then reduce heat to maintain a simmer. Cook until the potatoes are very tender, about 20 minutes." },
            { stepNumber: 6, description: "While the potatoes are cooking, heat a small skillet over medium heat. Add the sliced chouriço and cook for a few minutes until the edges start to crisp and the fat renders. Remove from heat and set aside, reserving a few slices for garnish if desired." },
            { stepNumber: 7, description: "When the potatoes are very soft, use an immersion blender to puree the soup until smooth and creamy. Alternatively, transfer in batches to a regular blender, being careful with the hot liquid, then return to the pot." },
            { stepNumber: 8, description: "Return the soup to a simmer and add the thinly sliced collard greens. Cook for about 5 minutes until the greens are tender but still bright green." },
            { stepNumber: 9, description: "Add most of the cooked chouriço to the soup, reserving some for garnish." },
            { stepNumber: 10, description: "Taste and adjust seasoning with additional salt and black pepper as needed." },
            { stepNumber: 11, description: "Ladle the hot soup into bowls. Garnish with the reserved chouriço slices and drizzle each serving with the remaining olive oil." },
            { stepNumber: 12, description: "Serve immediately with crusty Portuguese bread on the side." }
          ],
          notes: [
            "The key to authentic caldo verde is cutting the greens into extremely thin strips. Take your time with this step for the traditional texture.",
            "If you can't find Portuguese chouriço, Spanish chorizo makes a good substitute, though the flavor profile is slightly different. For a milder option, use linguiça.",
            "Some regions of Portugal add beans to their caldo verde - white beans work particularly well.",
            "For a vegetarian version, omit the sausage and use vegetable stock, adding a teaspoon of smoked paprika to simulate the smoky flavor.",
            "Traditional caldo verde has a specific consistency - it should be thicker than a broth but not as thick as a cream soup. Adjust with more water or stock if needed.",
            "Fermented Ingredients: Chouriço/chorizo is a cured sausage made via fermentation. Stock may contain fermented enhancers. Bread served alongside may be fermented (e.g., sourdough).",
            "FODMAP Information: High-FODMAP ingredients include onion (fructans), garlic (fructans), chouriço/chorizo (check for onion/garlic), and collard greens (fructans - limit serving). Low-FODMAP ingredients: potatoes, olive oil, water/stock (check for onion/garlic), salt, pepper.",
            "Low-FODMAP Recommendations: Omit onion and garlic; use garlic-infused olive oil. Check chouriço/chorizo ingredients carefully or use plain sausage without high-FODMAP additives. Limit collard greens to 1/2 cup per serve or substitute with kale (also limit portion). Use certified low-FODMAP stock. Serve with suitable low-FODMAP bread.",
            "Vitamins & Minerals: Potatoes provide potassium and Vitamin C. Collard greens are rich in Vitamins K, A, and C, as well as calcium. Chouriço adds protein, fat, and B vitamins. Olive oil contributes healthy fats and Vitamin E."
          ],
          nutritionFacts: {
            protein: 12,
            carbs: 32,
            fat: 14,
            fiber: 4,
            sugar: 3,
            sodium: 680
          }
        },
        {
          title: "Bigos (Polish Hunter's Stew)",
          description: "A hearty Polish stew that combines various meats with sauerkraut, fresh cabbage, and dried mushrooms, slowly simmered to create a rich, complex flavor. Often called Poland's national dish, Bigos has ancient roots and was traditionally prepared by hunters using game meats. The dish improves with age, developing deeper flavors when reheated over several days, making it a perfect make-ahead meal. Every Polish family has their own version of this robust stew, which embodies the essence of Polish cuisine - hearty, flavorful, and designed to sustain through cold winter months.",
          cookingTime: 180,
          servings: 8,
          difficulty: "MEDIUM",
          cuisineType: "Europe",
          regionOfOrigin: "Poland",
          imageUrl: "/images/recipes/bigos.jpg",
          calories: 480,
          type: "MAIN",
          isVegetarian: false,
          isVegan: false,
          isGlutenFree: true,
          isLactoseFree: true,
          isNutFree: true,
          isPescatarian: false,
          isFermented: true,
          isLowFodmap: false,
          ingredients: [
            { name: "Sauerkraut", amount: 750, unit: "g", notes: "drained and rinsed if very sour" },
            { name: "White Cabbage", amount: 500, unit: "g", notes: "finely shredded" },
            { name: "Pork Shoulder", amount: 500, unit: "g", notes: "cubed" },
            { name: "Kielbasa Sausage", amount: 300, unit: "g", notes: "sliced into rounds" },
            { name: "Smoked Bacon", amount: 200, unit: "g", notes: "diced" },
            { name: "Dried Mushrooms", amount: 30, unit: "g", notes: "preferably porcini" },
            { name: "Onions", amount: 2, unit: "large", notes: "diced" },
            { name: "Garlic", amount: 4, unit: "cloves", notes: "minced" },
            { name: "Tomato Paste", amount: 2, unit: "tbsp" },
            { name: "Prunes", amount: 100, unit: "g", notes: "pitted and chopped" },
            { name: "Dry Red Wine", amount: 240, unit: "ml", notes: "can substitute beef broth" },
            { name: "Bay Leaves", amount: 3, unit: "whole" },
            { name: "Allspice Berries", amount: 4, unit: "whole" },
            { name: "Juniper Berries", amount: 6, unit: "whole", notes: "lightly crushed" },
            { name: "Caraway Seeds", amount: 1, unit: "tsp", notes: "lightly crushed" },
            { name: "Marjoram", amount: 1, unit: "tsp", notes: "dried" },
            { name: "Honey", amount: 1, unit: "tbsp", notes: "or to taste" },
            { name: "Vegetable Oil", amount: 2, unit: "tbsp" },
            { name: "Salt", amount: 1.5, unit: "tsp", notes: "or to taste" },
            { name: "Black Pepper", amount: 1, unit: "tsp", notes: "freshly ground" },
            { name: "Rye Bread", amount: 1, unit: "loaf", notes: "for serving" }
          ],
          instructions: [
            { stepNumber: 1, description: "Place the dried mushrooms in a bowl and cover with hot water. Let soak for at least 30 minutes, then drain, reserving the soaking liquid. Chop the rehydrated mushrooms and set aside." },
            { stepNumber: 2, description: "In a large Dutch oven or heavy-bottomed pot, heat the vegetable oil over medium heat. Add the diced bacon and cook until it renders its fat and becomes crispy, about 5 minutes." },
            { stepNumber: 3, description: "Add the cubed pork shoulder to the pot. Brown on all sides, about 6-8 minutes." },
            { stepNumber: 4, description: "Add the diced onions and cook until translucent, about 5 minutes. Add the minced garlic and cook for another minute until fragrant." },
            { stepNumber: 5, description: "Add the sliced kielbasa and cook for 2-3 minutes until it starts to brown." },
            { stepNumber: 6, description: "Stir in the tomato paste and cook for 1 minute, then add the red wine. Scrape up any browned bits from the bottom of the pot and let the wine reduce by half, about 3-4 minutes." },
            { stepNumber: 7, description: "Add the sauerkraut, shredded fresh cabbage, rehydrated mushrooms, and the strained mushroom soaking liquid (being careful to leave any grit behind)." },
            { stepNumber: 8, description: "Add the bay leaves, allspice berries, juniper berries, caraway seeds, and marjoram. Season with salt and pepper." },
            { stepNumber: 9, description: "Bring the mixture to a boil, then reduce heat to a very low simmer. Cover and cook for 2 hours, stirring occasionally to prevent sticking." },
            { stepNumber: 10, description: "After 2 hours, add the chopped prunes and honey. Continue simmering, uncovered, for another 30 minutes to allow the stew to thicken slightly and for the flavors to meld." },
            { stepNumber: 11, description: "Taste and adjust seasoning with additional salt, pepper, or honey as needed. The stew should have a balanced sweet-sour flavor." },
            { stepNumber: 12, description: "Before serving, remove the bay leaves and allspice berries if you can find them (or warn guests to look out for them)." },
            { stepNumber: 13, description: "Ideally, let the bigos cool completely and refrigerate overnight. Reheat the next day - the flavor improves significantly. This can be repeated for several days." },
            { stepNumber: 14, description: "Serve hot with thick slices of rye bread." }
          ],
          notes: [
            "Traditional bigos is often made with various game meats like venison, wild boar, or rabbit in addition to or instead of pork. Feel free to experiment with different meat combinations.",
            "Some Polish families add small amounts of other ingredients like mushroom powder, paprika, or even a splash of vodka for additional complexity.",
            "The longer bigos cooks, the better it tastes. Many Polish cooks prepare it 2-3 days before serving, reheating it daily to develop the flavors.",
            "If your sauerkraut is very sour, rinse it briefly before using. If it's mild, you might not need the honey to balance the flavor.",
            "Bigos freezes excellently, so don't hesitate to make a large batch and save portions for future meals.",
            "Fermented Ingredients: Sauerkraut (lactic acid fermentation), Kielbasa (cured via fermentation), Red Wine (yeast fermentation). Rye bread served alongside is often sourdough.",
            "FODMAP Information: High-FODMAP ingredients include sauerkraut (polyols - limit serving), fresh cabbage (polyols/fructans - limit serving), dried mushrooms (polyols), onions (fructans), garlic (fructans), prunes (polyols - limit serving), red wine (fructans/fructose - limit serving), honey (fructose - limit serving), and rye bread (fructans). Kielbasa should be checked for onion/garlic. Low-FODMAP ingredients: pork, bacon (check additives), tomato paste (limit portion), spices, marjoram, oil, salt, pepper.",
            "Low-FODMAP Recommendations: Limit sauerkraut to 1 tbsp and fresh cabbage to 1/2 cup per serve. Omit dried mushrooms or use low-FODMAP oyster mushrooms. Omit onions and garlic; use garlic-infused oil and green parts of leeks/spring onions. Limit prunes to 1 per serve. Limit red wine and replace honey with maple syrup (limit portion). Check kielbasa ingredients. Serve without rye bread or with suitable low-FODMAP bread.",
            "Vitamins & Minerals: Sauerkraut provides Vitamin C and K, and probiotics. Cabbage offers Vitamin C and K. Pork provides protein, B vitamins, and selenium. Kielbasa adds protein and fat. Mushrooms contribute B vitamins. Prunes offer fiber and potassium. Red wine contains antioxidants."
          ],
          nutritionFacts: {
            protein: 32,
            carbs: 25,
            fat: 28,
            fiber: 7,
            sugar: 10,
            sodium: 920
          }
        },
        {
          title: "Flammkuchen (Tarte Flambée)",
          description: "A thin, crispy bread topped with crème fraîche, thinly sliced onions, and bacon, originating from the Alsace region along the French-German border. The name 'flammkuchen' literally means 'flame cake' in German, referring to how it was traditionally baked in wood-fired ovens where the flames would lick the edges of the dough. This deliciously simple dish was originally created as a means to test the temperature of bread ovens - bakers would use it to determine if their ovens were hot enough for bread baking. Today, it's served as an appetizer or light meal and pairs perfectly with a glass of dry Alsatian white wine.",
          cookingTime: 30,
          servings: 4,
          difficulty: "EASY",
          cuisineType: "Europe",
          regionOfOrigin: "Germany",
          imageUrl: "/images/recipes/flammkuchen.jpg",
          calories: 320,
          type: "MAIN",
          isVegetarian: false,
          isVegan: false,
          isGlutenFree: false,
          isLactoseFree: false,
          isNutFree: true,
          isPescatarian: false,
          isFermented: true,
          isLowFodmap: false,
          ingredients: [
            { name: "All-Purpose Flour", amount: 250, unit: "g" },
            { name: "Water", amount: 125, unit: "ml", notes: "lukewarm" },
            { name: "Olive Oil", amount: 2, unit: "tbsp" },
            { name: "Salt", amount: 0.5, unit: "tsp" },
            { name: "Crème Fraîche", amount: 200, unit: "g", notes: "or sour cream" },
            { name: "White Onions", amount: 2, unit: "large", notes: "very thinly sliced" },
            { name: "Bacon", amount: 200, unit: "g", notes: "pancetta or lardons, cut into small pieces" },
            { name: "Nutmeg", amount: 0.25, unit: "tsp", notes: "freshly grated" },
            { name: "Black Pepper", amount: 0.25, unit: "tsp", notes: "freshly ground" },
            { name: "Fresh Chives", amount: 2, unit: "tbsp", notes: "finely chopped, for garnish (optional)" }
          ],
          instructions: [
            { stepNumber: 1, description: "Preheat the oven to its highest setting (usually around 250°C/480°F). If you have a pizza stone, place it in the oven to heat up." },
            { stepNumber: 2, description: "In a large bowl, combine the flour and salt. Make a well in the center and add the lukewarm water and olive oil." },
            { stepNumber: 3, description: "Mix with a fork, gradually incorporating the flour from the sides until a dough forms. Turn onto a floured surface and knead for 5 minutes until smooth and elastic." },
            { stepNumber: 4, description: "Divide the dough into 2 equal portions. Roll each portion out very thinly into an oval or rectangle (about 2-3mm thick) on a piece of parchment paper. The dough should be almost translucent." },
            { stepNumber: 5, description: "In a small bowl, mix the crème fraîche with freshly grated nutmeg and black pepper. Spread half the mixture over each piece of dough, leaving a very small border around the edges." },
            { stepNumber: 6, description: "Distribute the thinly sliced onions evenly over the crème fraîche, then sprinkle with the bacon pieces." },
            { stepNumber: 7, description: "Carefully transfer the tarts (with the parchment paper) onto the hot pizza stone or a preheated baking sheet." },
            { stepNumber: 8, description: "Bake for 10-12 minutes or until the edges are crisp and golden, and the bacon is cooked. The bottom should be crispy and the toppings should have some caramelization." },
            { stepNumber: 9, description: "Remove from the oven and sprinkle with chopped fresh chives if desired." },
            { stepNumber: 10, description: "Slice and serve immediately while hot." }
          ],
          notes: [
            "For authentic Alsatian flavor, traditional recipes use fromage blanc instead of crème fraîche, but the latter is more widely available and gives a similar result.",
            "It's crucial to roll the dough as thin as possible - flammkuchen should be crisp like a cracker rather than doughy like pizza.",
            "If you like, you can add a small amount of minced garlic to the crème fraîche mixture for an extra flavor dimension.",
            "A vegetarian version can be made by omitting the bacon and adding sautéed mushrooms instead.",
            "The key to great flammkuchen is very high heat and a short cooking time - this gives the characteristic crispy texture and slight char on the edges.",
            "Fermented Ingredients: Crème fraîche (cultured cream).",
            "FODMAP Information: High-FODMAP ingredients include all-purpose flour (fructans), crème fraîche (lactose), and onions (fructans). Low-FODMAP ingredients: water, olive oil, salt, bacon (check additives), nutmeg, pepper, chives.",
            "Low-FODMAP Recommendations: Use a gluten-free flour blend suitable for thin, crispy crusts. Use lactose-free crème fraîche or sour cream. Omit onions or use very thinly sliced green parts of spring onions or chives scattered over before baking.",
            "Vitamins & Minerals: Flour provides carbohydrates. Crème fraîche adds fat and some calcium. Onions offer Vitamin C. Bacon contributes protein and fat. Olive oil provides healthy fats."
          ],
          nutritionFacts: {
            protein: 12,
            carbs: 32,
            fat: 18,
            fiber: 2,
            sugar: 3,
            sodium: 680
          }
        },
        {
          title: "Kulajda (Czech Mushroom Soup)",
          description: "A distinctive creamy soup from South Bohemia in the Czech Republic, featuring wild mushrooms, potatoes, and dill, finished with a poached egg and a swirl of vinegar cream. This hearty soup beautifully balances earthy, tangy, and herbaceous flavors, making it a beloved comfort food throughout Czech cuisine. Traditionally made with foraged forest mushrooms during mushroom season, Kulajda represents the Czech people's deep connection to their woodlands and the art of foraging, though cultivated mushrooms make a fine substitute year-round.",
          cookingTime: 45,
          servings: 6,
          difficulty: "MEDIUM",
          cuisineType: "Europe",
          regionOfOrigin: "Czech Republic",
          imageUrl: "/images/recipes/kulajda.jpg",
          calories: 280,
          type: "MAIN",
          isVegetarian: true,
          isVegan: false,
          isGlutenFree: true,
          isLactoseFree: false,
          isNutFree: true,
          isPescatarian: false,
          isFermented: true,
          isLowFodmap: false,
          ingredients: [
            { name: "Potatoes", amount: 500, unit: "g", notes: "peeled and diced into 1cm cubes" },
            { name: "Wild Mushrooms", amount: 300, unit: "g", notes: "fresh, cleaned and sliced (porcini, chanterelles, or cultivated mushrooms)" },
            { name: "Dried Mushrooms", amount: 20, unit: "g", notes: "porcini or mixed wild (optional, for enhanced flavor)" },
            { name: "Onion", amount: 1, unit: "medium", notes: "finely diced" },
            { name: "Garlic", amount: 2, unit: "cloves", notes: "minced" },
            { name: "Butter", amount: 2, unit: "tbsp" },
            { name: "All-Purpose Flour", amount: 2, unit: "tbsp" },
            { name: "Vegetable Stock", amount: 1.5, unit: "liters" },
            { name: "Bay Leaves", amount: 2, unit: "whole" },
            { name: "Allspice Berries", amount: 3, unit: "whole" },
            { name: "Heavy Cream", amount: 200, unit: "ml" },
            { name: "White Wine Vinegar", amount: 2, unit: "tbsp", notes: "or to taste" },
            { name: "Fresh Dill", amount: 0.25, unit: "cup", notes: "chopped, plus extra for garnish" },
            { name: "Eggs", amount: 6, unit: "large", notes: "one per serving" },
            { name: "Caraway Seeds", amount: 0.5, unit: "tsp", notes: "lightly crushed" },
            { name: "Salt", amount: 1, unit: "tsp", notes: "or to taste" },
            { name: "Black Pepper", amount: 0.5, unit: "tsp", notes: "freshly ground" },
            { name: "Sugar", amount: 0.5, unit: "tsp", notes: "to balance acidity (optional)" }
          ],
          instructions: [
            { stepNumber: 1, description: "If using dried mushrooms, place them in a bowl and cover with hot water. Let soak for 20 minutes. Strain, reserving the liquid, and chop the rehydrated mushrooms. Add the strained soaking liquid to your stock." },
            { stepNumber: 2, description: "In a large pot, melt the butter over medium heat. Add the onion and sauté until translucent, about 5 minutes. Add the minced garlic and cook for another minute until fragrant." },
            { stepNumber: 3, description: "Add the fresh and rehydrated mushrooms (if using) to the pot. Cook for about 5-7 minutes until they release their moisture and begin to brown slightly." },
            { stepNumber: 4, description: "Sprinkle the flour over the mushroom mixture and stir continuously for 2 minutes to make a roux. This will help thicken the soup." },
            { stepNumber: 5, description: "Gradually add the vegetable stock, stirring constantly to prevent lumps. Add the bay leaves, allspice berries, and crushed caraway seeds." },
            { stepNumber: 6, description: "Add the diced potatoes to the soup. Bring to a boil, then reduce heat and simmer for about 15 minutes, or until the potatoes are tender." },
            { stepNumber: 7, description: "Pour in the heavy cream and stir to combine. Add the vinegar, starting with 1 tablespoon and adding more to taste - the soup should have a pleasant tangy note." },
            { stepNumber: 8, description: "Stir in most of the chopped dill, reserving some for garnish. Season with salt and black pepper, and add a pinch of sugar if the soup is too tangy." },
            { stepNumber: 9, description: "For the poached eggs: In a separate pan, bring water with a splash of vinegar to a gentle simmer. Crack each egg into a small cup, then gently slip into the simmering water. Cook for 3-4 minutes for a runny yolk. Remove with a slotted spoon." },
            { stepNumber: 10, description: "Remove the bay leaves and allspice berries from the soup." },
            { stepNumber: 11, description: "To serve, ladle the hot soup into bowls, place a poached egg in the center of each bowl, and garnish with the remaining fresh dill." }
          ],
          notes: [
            "The combination of wild mushrooms gives the most authentic flavor, but if unavailable, cultivated mushrooms like cremini or button mushrooms work well too.",
            "The traditional tanginess comes from fermented cream (similar to sour cream), but the vinegar and fresh cream combination achieves a similar result.",
            "Some Czech cooks add a small amount of dried marjoram along with the caraway seeds for additional flavor.",
            "The soup should have a balance of creamy, tangy, and earthy flavors - adjust the vinegar, salt, and pepper to achieve this balance.",
            "In the Czech Republic, this soup is often served with rye bread on the side.",
            "Fermented Ingredients: White wine vinegar (acetic acid fermentation). Butter/heavy cream source may be cultured. Stock might contain fermented enhancers.",
            "FODMAP Information: High-FODMAP ingredients include wild/dried mushrooms (polyols), onion (fructans), garlic (fructans), all-purpose flour (fructans), and heavy cream (lactose). Low-FODMAP ingredients: potatoes, butter (small amounts), stock (check for onion/garlic), bay leaves, allspice, white wine vinegar, dill, eggs, caraway seeds, salt, pepper, sugar.",
            "Low-FODMAP Recommendations: Use low-FODMAP oyster mushrooms instead of wild/dried varieties. Omit onion and garlic; use garlic-infused butter or oil. Thicken with gluten-free flour or cornstarch slurry instead of all-purpose flour. Use lactose-free heavy cream or a suitable alternative. Ensure vegetable stock is certified low-FODMAP or homemade without onion/garlic.",
            "Vitamins & Minerals: Potatoes provide potassium and Vitamin C. Mushrooms offer B vitamins (especially riboflavin and niacin) and selenium. Cream and butter add fat and calcium (from cream). Eggs contribute high-quality protein, choline, and Vitamin D. Dill provides antioxidants and some Vitamin C."
          ],
          nutritionFacts: {
            protein: 10,
            carbs: 25,
            fat: 16,
            fiber: 3,
            sugar: 4,
            sodium: 580
          }
        },
          {
            title: "Janssons Frestelse (Swedish Potato Casserole)",
            description: "A classic Swedish potato gratin that's an essential part of the traditional Christmas smörgåsbord, but enjoyed year-round. The name translates to 'Jansson's Temptation,' reportedly named after a food-loving opera singer. This creamy potato casserole gets its distinctive flavor from Swedish sprats (anchovies), which add a subtle saltiness that balances perfectly with the sweetness of the onions and the richness of the cream. The result is a luxurious dish that epitomizes Swedish comfort food and has remained a beloved staple on Swedish tables for generations.",
            cookingTime: 75,
            servings: 6,
            difficulty: "EASY",
            cuisineType: "Europe",
            regionOfOrigin: "Sweden",
            imageUrl: "/images/recipes/janssons-frestelse.jpg",
            calories: 380,
            type: "SIDE",
            isVegetarian: false,
            isVegan: false,
            isGlutenFree: true,
            isLactoseFree: false,
            isNutFree: true,
            isPescatarian: true,
            isFermented: true,
            isLowFodmap: false,
            ingredients: [
              { name: "Potatoes", amount: 1.5, unit: "kg", notes: "firm, peeled and cut into thin strips (julienne)" },
              { name: "Yellow Onions", amount: 2, unit: "medium", notes: "thinly sliced" },
              { name: "Swedish Anchovy Fillets", amount: 125, unit: "g", notes: "canned in brine (actually sprats, not true anchovies)" },
              { name: "Heavy Cream", amount: 300, unit: "ml" },
              { name: "Milk", amount: 100, unit: "ml" },
              { name: "Butter", amount: 50, unit: "g", notes: "plus more for greasing dish" },
              { name: "Breadcrumbs", amount: 3, unit: "tbsp", notes: "preferably unseasoned" },
              { name: "Salt", amount: 0.5, unit: "tsp", notes: "use carefully as the anchovies are already salty" },
              { name: "White Pepper", amount: 0.25, unit: "tsp", notes: "freshly ground" }
            ],
            instructions: [
              { stepNumber: 1, description: "Preheat the oven to 200°C (400°F). Butter a 30x20cm (12x8 inch) baking dish." },
              { stepNumber: 2, description: "Peel the potatoes and cut them into thin matchsticks (julienne). Traditional Swedish recipes call for this specific cut rather than thin slices - it contributes to the characteristic texture of the dish." },
              { stepNumber: 3, description: "Thinly slice the onions into half-rings. In a frying pan, melt 25g of butter over medium-low heat. Add the onions and sauté until soft and translucent but not browned, about 10 minutes. Set aside." },
              { stepNumber: 4, description: "Reserve 2 tablespoons of the liquid from the anchovy can. Drain the rest and cut the anchovy fillets into smaller pieces if they're large." },
              { stepNumber: 5, description: "Layer the ingredients in the buttered baking dish as follows: Start with one-third of the potato sticks, followed by half the sautéed onions, and half the anchovy pieces. Repeat with another third of potatoes, the remaining onions, and remaining anchovies. Finish with the final third of potatoes on top." },
              { stepNumber: 6, description: "In a small saucepan or microwave-safe bowl, combine the cream, milk, reserved anchovy liquid, salt (use sparingly), and white pepper. Heat just until warm, not boiling." },
              { stepNumber: 7, description: "Pour the warm cream mixture evenly over the potato casserole. It should come about three-quarters of the way up the sides of the dish, but not completely cover the top layer of potatoes." },
              { stepNumber: 8, description: "Sprinkle the breadcrumbs evenly over the top of the casserole. Cut the remaining 25g of butter into small pieces and dot them over the breadcrumbs." },
              { stepNumber: 9, description: "Cover the dish with aluminum foil and bake in the preheated oven for 30 minutes." },
              { stepNumber: 10, description: "Remove the foil and continue baking for another 20-30 minutes, until the top is golden brown, the potatoes are tender when pierced with a knife, and the cream is bubbling around the edges." },
              { stepNumber: 11, description: "Let the casserole rest for 10 minutes before serving to allow the creamy sauce to set slightly." }
            ],
            notes: [
              "Authentic Swedish 'ansjovis' are actually sprats (Sprattus sprattus) canned in a sweet brine, not true Mediterranean anchovies. If you can't find Swedish anchovy fillets, you can substitute regular anchovies but use fewer as they're saltier, and add a pinch of sugar to the cream mixture.",
              "The julienne cut of the potatoes is traditional and gives the dish its characteristic texture - a mandoline with a julienne blade makes this task much easier.",
              "In Sweden, this dish is often served with pickled beetroot on the side, which provides a lovely sweet-sour contrast to the rich, creamy casserole.",
              "Jansson's Temptation is a classic part of the Swedish Christmas smörgåsbord but is also served year-round as a side dish with roasted meats.",
              "For a richer version, use only cream instead of the cream and milk mixture.",
              "Fermented Ingredients: Swedish anchovies (sprats) are cured in brine, which can involve fermentation. Butter may be made from cultured cream. Breadcrumbs are derived from bread, typically made via yeast fermentation.",
              "FODMAP Information: High-FODMAP ingredients include onions (fructans), heavy cream (lactose), milk (lactose), and breadcrumbs (fructans - wheat). Low-FODMAP ingredients are potatoes, Swedish anchovy fillets (check brine ingredients), butter (limit amount), salt, and white pepper.",
              "Low-FODMAP Recommendations: Replace onions with the green parts of leeks or spring onions sautéed in garlic-infused oil. Use lactose-free heavy cream and lactose-free milk. Replace regular breadcrumbs with gluten-free breadcrumbs.",
              "Vitamins & Minerals: Potatoes provide potassium, Vitamin C, and Vitamin B6. Onions contain Vitamin C and antioxidants. Swedish anchovies/sprats offer protein, omega-3 fatty acids, and Vitamin D. Cream, milk, and butter contribute calcium and fat-soluble vitamins (A, D). Breadcrumbs add carbohydrates."
            ],
            nutritionFacts: {
              protein: 8,
              carbs: 36,
              fat: 24,
              fiber: 4,
              sugar: 5,
              sodium: 650
            }
          },
          {
            title: "Tarta de Santiago (Spanish Almond Cake)",
            description: "A traditional Spanish almond cake from the region of Galicia, dating back to the Middle Ages. This flourless cake is distinguished by its rich almond flavor, moist texture, and the iconic powdered sugar cross of Saint James (Cruz de Santiago) stenciled on top. Named after St. James the Apostle, the patron saint of Spain, this cake has been served to pilgrims completing the Camino de Santiago pilgrimage for centuries. With its simple yet distinctive flavor profile and historical significance, Tarta de Santiago represents the beautiful intersection of Spanish religious tradition and culinary excellence.",
            cookingTime: 60,
            servings: 8,
            difficulty: "EASY",
            cuisineType: "Europe",
            regionOfOrigin: "Spain",
            imageUrl: "/images/recipes/tarta-de-santiago.jpg",
            calories: 370,
            type: "DESSERT",
            isVegetarian: true,
            isVegan: false,
            isGlutenFree: true,
            isLactoseFree: false,
            isNutFree: false,
            isPescatarian: false,
            isFermented: true,
            isLowFodmap: false,
            ingredients: [
              { name: "Ground Almonds", amount: 250, unit: "g", notes: "blanched" },
              { name: "Granulated Sugar", amount: 200, unit: "g" },
              { name: "Eggs", amount: 5, unit: "large", notes: "separated" },
              { name: "Lemon Zest", amount: 1, unit: "lemon", notes: "finely grated" },
              { name: "Orange Zest", amount: 1, unit: "orange", notes: "finely grated" },
              { name: "Almond Extract", amount: 1, unit: "tsp" },
              { name: "Cinnamon", amount: 0.5, unit: "tsp", notes: "ground" },
              { name: "Salt", amount: 0.25, unit: "tsp" },
              { name: "Butter", amount: 2, unit: "tbsp", notes: "for greasing pan" },
              { name: "Powdered Sugar", amount: 2, unit: "tbsp", notes: "for dusting" },
              { name: "Cross of St. James Template", amount: 1, unit: "piece", notes: "for decoration (optional, can be made with paper)" }
            ],
            instructions: [
              { stepNumber: 1, description: "Preheat the oven to 180°C (350°F). Grease a 9-inch (23cm) springform pan with butter and line the bottom with parchment paper." },
              { stepNumber: 2, description: "In a large bowl, combine the ground almonds, 150g (3/4) of the sugar, lemon zest, orange zest, almond extract, cinnamon, and salt. Mix well." },
              { stepNumber: 3, description: "In a separate clean bowl, beat the egg whites with an electric mixer until they form soft peaks. Gradually add the remaining 50g (1/4) of sugar while continuing to beat until stiff, glossy peaks form." },
              { stepNumber: 4, description: "In another bowl, beat the egg yolks until pale and creamy, about 2-3 minutes." },
              { stepNumber: 5, description: "Gently fold the beaten egg yolks into the almond mixture until well combined." },
              { stepNumber: 6, description: "Gradually and gently fold the beaten egg whites into the almond-yolk mixture, taking care not to deflate the whites. Use a large metal spoon or rubber spatula, and fold with a light, cutting motion rather than stirring." },
              { stepNumber: 7, description: "Pour the batter into the prepared pan and smooth the top with a spatula." },
              { stepNumber: 8, description: "Bake in the preheated oven for 35-40 minutes, or until the cake is golden brown and a toothpick inserted into the center comes out clean or with a few moist crumbs." },
              { stepNumber: 9, description: "Allow the cake to cool in the pan for about 10 minutes. Then run a knife around the edge and release the springform. Let cool completely on a wire rack." },
              { stepNumber: 10, description: "Once the cake is completely cool, place it on a serving plate. If using a Cross of St. James template, place it gently on top of the cake. If you don't have a template, you can make one by cutting the cross shape out of a piece of paper or cardboard." },
              { stepNumber: 11, description: "Dust generously with powdered sugar, then carefully remove the template to reveal the cross pattern." },
              { stepNumber: 12, description: "Serve at room temperature. The cake can be stored in an airtight container for up to 3 days." }
            ],
            notes: [
              "For the most authentic flavor, use blanched ground almonds. If you can only find almond flour with skins, the cake will have a stronger flavor and speckled appearance.",
              "The traditional Cross of St. James (Cruz de Santiago) is a distinctive symbol that looks like a sword with a fleur-de-lis hilt. You can find templates online to print, or create a simplified cross design yourself.",
              "This cake actually improves in flavor if made a day ahead, making it perfect for entertaining.",
              "For a more intense citrus flavor, add a tablespoon of orange liqueur like Grand Marnier to the batter.",
              "As this cake is flourless, it's naturally gluten-free, but check that your ground almonds are processed in a gluten-free facility if this is a concern.",
              "Fermented Ingredients: Butter may be produced using cultured cream.",
              "FODMAP Information: The primary ingredient, ground almonds, is moderate-to-high in GOS (limit serving size to ~30g or less). Powdered sugar should be checked for anti-caking agents. Low-FODMAP ingredients include granulated sugar, eggs, lemon zest, orange zest, almond extract, cinnamon, salt, and small amounts of butter.",
              "Low-FODMAP Recommendations: Due to the high almond content, this cake is not strictly low FODMAP unless consumed in a very small portion (e.g., 1/16th of the cake or less). Ensure powdered sugar is pure.",
              "Vitamins & Minerals: Ground almonds provide Vitamin E, magnesium, manganese, healthy fats, and protein. Eggs are rich in protein, choline, Vitamin D, and B vitamins. Citrus zest contributes small amounts of Vitamin C and antioxidants. Butter adds Vitamin A."
            ],
            nutritionFacts: {
              protein: 10,
              carbs: 32,
              fat: 22,
              fiber: 4,
              sugar: 28,
              sodium: 120
            }
          },
          {
            title: "Σπανακόπιτα (Spanakopita)",
            description: "A traditional Greek savory pie made of perfectly crispy layers of phyllo dough filled with a mixture of spinach, feta cheese, onions, and herbs. This iconic dish showcases the brilliance of Greek cuisine in transforming simple ingredients into something truly extraordinary. The contrast between the flaky, buttery exterior and the fresh, tangy filling makes spanakopita a beloved staple at Greek tavernas, family gatherings, and as street food. It can be made as a large pie or as individual triangular pastries, and is enjoyed hot, warm, or at room temperature.",
            cookingTime: 75,
            servings: 8,
            difficulty: "MEDIUM",
            cuisineType: "Europe",
            regionOfOrigin: "Greece",
            imageUrl: "/images/recipes/spanakopita.jpg",
            calories: 310,
            type: "MAIN",
            isVegetarian: true,
            isVegan: false,
            isGlutenFree: false,
            isLactoseFree: false,
            isNutFree: true,
            isPescatarian: false,
            isFermented: true,
            isLowFodmap: false,
            ingredients: [
              { name: "Frozen Spinach", amount: 1, unit: "kg", notes: "thawed and well-drained" },
              { name: "Onions", amount: 2, unit: "medium", notes: "finely chopped" },
              { name: "Green Onions", amount: 1, unit: "bunch", notes: "chopped" },
              { name: "Garlic", amount: 4, unit: "cloves", notes: "minced" },
              { name: "Olive Oil", amount: 60, unit: "ml", notes: "plus more for brushing" },
              { name: "Feta Cheese", amount: 400, unit: "g", notes: "crumbled" },
              { name: "Ricotta Cheese", amount: 250, unit: "g", notes: "optional, for a creamier filling" },
              { name: "Eggs", amount: 3, unit: "large", notes: "lightly beaten" },
              { name: "Fresh Dill", amount: 0.5, unit: "cup", notes: "chopped" },
              { name: "Fresh Parsley", amount: 0.5, unit: "cup", notes: "chopped" },
              { name: "Fresh Mint", amount: 2, unit: "tbsp", notes: "chopped (optional)" },
              { name: "Nutmeg", amount: 0.25, unit: "tsp", notes: "freshly grated" },
              { name: "Phyllo Dough", amount: 1, unit: "package", notes: "thawed according to package directions" },
              { name: "Butter", amount: 226, unit: "g", notes: "melted, or a mixture of butter and olive oil" },
              { name: "Salt", amount: 1, unit: "tsp", notes: "or to taste" },
              { name: "Black Pepper", amount: 0.5, unit: "tsp", notes: "freshly ground" },
              { name: "Sesame Seeds", amount: 1, unit: "tbsp", notes: "for sprinkling (optional)" }
            ],
            instructions: [
              { stepNumber: 1, description: "Thaw the spinach and squeeze out as much water as possible. This is crucial for preventing a soggy pie. Using your hands, squeeze handfuls of spinach, or place in a clean kitchen towel and twist to extract water." },
              { stepNumber: 2, description: "Preheat the oven to 180°C (350°F)." },
              { stepNumber: 3, description: "Heat the olive oil in a large skillet over medium heat. Add the chopped onions and cook until soft and translucent, about a 5-7 minutes." },
              { stepNumber: 4, description: "Add the green onions and garlic, and cook for another 2 minutes until fragrant." },
              { stepNumber: 5, description: "Transfer the onion mixture to a large bowl and let cool slightly. Add the drained spinach and mix well." },
              { stepNumber: 6, description: "Add the crumbled feta, ricotta (if using), eggs, dill, parsley, mint, nutmeg, salt, and pepper to the spinach mixture. Stir until everything is well combined. Taste and adjust seasoning, noting that feta is already salty." },
              { stepNumber: 7, description: "Brush a 9x13 inch (23x33 cm) baking dish with melted butter. Carefully unroll the phyllo dough and keep it covered with a damp cloth to prevent it from drying out while you work." },
              { stepNumber: 8, description: "Place one sheet of phyllo in the baking dish, allowing it to hang over the edges. Brush lightly with melted butter. Repeat with about half the phyllo sheets (usually 7-8 sheets), brushing each layer with butter." },
              { stepNumber: 9, description: "Spread the spinach and feta filling evenly over the phyllo layers." },
              { stepNumber: 10, description: "Continue layering the remaining phyllo sheets on top of the filling, brushing each with butter. When you reach the final sheet, fold any overhanging edges inward and brush the top generously with butter." },
              { stepNumber: 11, description: "Using a sharp knife, score the top layers of phyllo into serving-sized squares or diamonds, being careful not to cut all the way through to the filling." },
              { stepNumber: 12, description: "Sprinkle the top with sesame seeds if desired." },
              { stepNumber: 13, description: "Bake in the preheated oven for 45-50 minutes, until the phyllo is golden brown and crispy." },
              { stepNumber: 14, description: "Remove from the oven and let cool for at least 10-15 minutes before cutting along the scored lines and serving. This allows the filling to set and makes for cleaner slices." }
            ],
            notes: [
              "The key to working with phyllo dough is keeping it from drying out. Always cover the sheets you're not currently using with a damp kitchen towel.",
              "For a shortcut, you can use fresh spinach instead of frozen - just wilt about 1.5 kg fresh spinach, then drain and squeeze out excess water.",
              "Authentic Greek spanakopita often uses only feta, but adding some ricotta makes for a creamier filling.",
              "For individual servings, you can fold the phyllo into triangular packets instead of making a large pie.",
              "Spanakopita can be assembled ahead of time and refrigerated, unbaked, for up to 24 hours. Just bring to room temperature before baking.",
              "Fermented Ingredients: Feta cheese undergoes lactic acid fermentation and brining. Ricotta cheese may use cultured whey. Butter can be cultured.",
              "FODMAP Information: High-FODMAP ingredients include onions (fructans), the white parts of green onions (fructans), garlic (fructans), ricotta cheese (lactose), and phyllo dough (fructans - wheat). Feta cheese is moderate in lactose (limit portion). Low-FODMAP ingredients: spinach (limit portion), green parts of green onions, olive oil, eggs, herbs (dill, parsley, mint), nutmeg, butter (limit portion), salt, pepper, sesame seeds.",
              "Low-FODMAP Recommendations: Use gluten-free phyllo dough if available. Omit onions and garlic; use garlic-infused oil and only the green tops of green onions. Replace ricotta with lactose-free ricotta or omit. Limit the amount of feta per serving (consult Monash University FODMAP app for current serving size recommendations). Ensure spinach portion per serving is within limits (approx. 1 cup cooked).",
              "Vitamins & Minerals: Spinach is rich in Vitamin K, Vitamin A, folate, iron, and magnesium. Feta and ricotta provide calcium and protein. Eggs contribute protein, choline, and Vitamin D. Olive oil and butter offer fats and Vitamin E/A. Phyllo dough adds carbohydrates. Herbs provide antioxidants."
            ],
            nutritionFacts: {
              protein: 12,
              carbs: 24,
              fat: 20,
              fiber: 4,
              sugar: 3,
              sodium: 650
            }
          },
          {
            title: "Борщ (Borscht)",
            description: "A vibrant, ruby-red soup that's a culinary staple across Eastern Europe, particularly in Ukraine, Russia, Poland, and Belarus. This hearty soup gets its distinctive color and earthy sweetness from beets, balanced with a subtle tanginess. While countless regional and family variations exist, traditional borscht typically includes beets, cabbage, potatoes, and other vegetables simmered in a flavorful broth, often with a meat base. Served hot with a dollop of sour cream and fresh dill, this comforting dish represents the soul of Eastern European cuisine.",
            cookingTime: 90,
            servings: 6,
            difficulty: "MEDIUM",
            cuisineType: "Europe",
            regionOfOrigin: "Ukraine/Russia/Poland",
            imageUrl: "/images/recipes/borscht.jpg",
            calories: 280,
            type: "MAIN",
            isVegetarian: false,
            isVegan: false,
            isGlutenFree: true,
            isLactoseFree: false,
            isNutFree: true,
            isPescatarian: false,
            isFermented: true,
            isLowFodmap: false,
            ingredients: [
              { name: "Beef Chuck", amount: 500, unit: "g", notes: "bone-in for extra flavor, cut into chunks (optional for vegetarian version)" },
              { name: "Beets", amount: 4, unit: "medium", notes: "peeled and grated or julienned" },
              { name: "Cabbage", amount: 300, unit: "g", notes: "shredded" },
              { name: "Potatoes", amount: 3, unit: "medium", notes: "peeled and diced" },
              { name: "Carrots", amount: 2, unit: "medium", notes: "peeled and grated" },
              { name: "Onion", amount: 1, unit: "large", notes: "diced" },
              { name: "Tomato Paste", amount: 2, unit: "tbsp" },
              { name: "Garlic", amount: 3, unit: "cloves", notes: "minced" },
              { name: "Bay Leaves", amount: 2, unit: "whole" },
              { name: "Vegetable Oil", amount: 3, unit: "tbsp" },
              { name: "White Vinegar", amount: 2, unit: "tbsp", notes: "or lemon juice" },
              { name: "Sugar", amount: 1, unit: "tsp" },
              { name: "Beef or Vegetable Stock", amount: 2, unit: "liters" },
              { name: "Black Peppercorns", amount: 5, unit: "whole" },
              { name: "Dill", amount: 0.25, unit: "cup", notes: "fresh, chopped, plus more for garnish" },
              { name: "Sour Cream", amount: 0.5, unit: "cup", notes: "for serving" },
              { name: "Salt", amount: 1, unit: "tsp", notes: "or to taste" },
              { name: "Black Pepper", amount: 0.5, unit: "tsp", notes: "freshly ground" }
            ],
            instructions: [
              { stepNumber: 1, description: "If using beef: Place beef chunks in a large pot with 2.5 liters of cold water, 1 teaspoon of salt, and the peppercorns. Bring to a boil, reduce heat, and simmer for about 1 hour, skimming off any foam that rises to the surface. Remove the meat, strain the broth, and return both to the pot. For a vegetarian version, skip this step and use vegetable stock instead." },
              { stepNumber: 2, description: "While the broth is simmering (or as your first step for vegetarian version), prepare the vegetables. Peel and grate or julienne the beets. Shred the cabbage. Peel and dice the potatoes. Peel and grate the carrots. Dice the onion. Mince the garlic." },
              { stepNumber: 3, description: "In a large skillet, heat the vegetable oil over medium heat. Add the onions and carrots, and sauté until softened, about 5 minutes." },
              { stepNumber: 4, description: "Add the grated beets to the skillet with the onions and carrots. Stir in the tomato paste. Cook, stirring frequently, until the vegetables are softened and fragrant." },
              { stepNumber: 5, description: "Add 1 tablespoon of vinegar and 1 teaspoon of sugar to the beet mixture. This helps preserve the vibrant red color and adds a subtle sweet-sour balance. Cook for 2 more minutes, then remove from heat." },
              { stepNumber: 6, description: "If using pre-made stock instead of making your own, bring 2 liters of stock to a simmer in a large pot." },
              { stepNumber: 7, description: "Add the diced potatoes and bay leaves to the simmering broth. Cook for about 10 minutes until the potatoes are starting to soften." },
              { stepNumber: 8, description: "Add the shredded cabbage to the broth and cook for 5 more minutes." },
              { stepNumber: 9, description: "Stir in the sautéed beet mixture and minced garlic. Simmer everything together for about 10 more minutes until all vegetables are tender." },
              { stepNumber: 10, description: "Remove the bay leaves. Season with salt, pepper, and additional vinegar to taste - the soup should have a pleasant sweet-sour balance." },
              { stepNumber: 11, description: "Turn off the heat and stir in most of the chopped fresh dill, reserving some for garnish." },
              { stepNumber: 12, description: "Let the borscht stand covered for about 10 minutes before serving - the flavors deepen as it rests." },
              { stepNumber: 13, description: "Serve hot with a dollop of sour cream and a sprinkle of fresh dill. In the traditional Ukrainian style, offer slices of dark rye bread on the side." }
            ],
            notes: [
              "The key to a beautiful borsch is preventing the beets from turning brown - adding acid (vinegar or lemon juice) while sautéing them helps maintain their vibrant color.",
              "Some regional variations include adding white beans, mushrooms, or bell peppers.",
              "Borscht actually tastes even better the next day after the flavors have had time to meld.",
              "In summer, try serving cold borscht (known as 'kholodnik' in some regions) garnished with hard-boiled eggs and fresh cucumbers.",
              "For an authentic touch, many Ukrainian cooks add a small piece of pork fat (salo) during cooking for extra richness, though this is optional.",
              "Fermented Ingredients: White vinegar is produced through fermentation. Sour cream is made by fermenting cream with lactic acid bacteria. Stock may contain fermented flavor enhancers.",
              "FODMAP Information: High/Moderate-FODMAP ingredients include beets (GOS - limit serving), cabbage (polyols - limit serving), onion (fructans), garlic (fructans), and sour cream (lactose). Low-FODMAP ingredients include beef chuck, potatoes, carrots (limit serving), tomato paste (limit serving), bay leaves, oil, vinegar, sugar, beef/vegetable stock (check label), peppercorns, dill, salt, and pepper.",
              "Low-FODMAP Recommendations: Significantly limit the amount of beets (e.g., 20g per serve) and cabbage (e.g., 1/2 cup Savoy per serve). Omit onion and garlic, using garlic-infused oil and green parts of leeks/spring onions instead. Use certified low-FODMAP stock. Serve with lactose-free sour cream.",
              "Vitamins & Minerals: Beef provides protein, iron, zinc, and B12. Beets are a source of folate, manganese, and potassium. Cabbage offers Vitamin K and C. Potatoes and carrots contribute potassium, Vitamin C, and Vitamin A (carrots). Sour cream adds calcium. Dill provides Vitamin C and antioxidants."
            ],
            nutritionFacts: {
              protein: 18,
              carbs: 24,
              fat: 12,
              fiber: 6,
              sugar: 8,
              sodium: 720
            }
          },
          {
            title: "Bacalhau à Brás (Portuguese Codfish)",
            description: "A beloved Portuguese dish featuring shredded salt cod mixed with onions, thinly sliced potatoes, eggs, olives, and fresh parsley. Named after a Lisbon tavern owner who created it in the 19th century, this comforting yet elegant dish perfectly represents Portugal's deep culinary connection to salt cod, which has been central to Portuguese cuisine since the Age of Discoveries. The combination of soft, scrambled eggs, crispy potato shreds, and flavorful bacalhau creates a uniquely textured dish that's served in homes and restaurants throughout Portugal.",
            cookingTime: 60,
            servings: 4,
            difficulty: "MEDIUM",
            cuisineType: "Europe",
            regionOfOrigin: "Portugal",
            imageUrl: "/images/recipes/bacalhau-a-bras.jpg",
            calories: 450,
            type: "MAIN",
            isVegetarian: false,
            isVegan: false,
            isGlutenFree: true,
            isLactoseFree: false,
            isNutFree: true,
            isPescatarian: true,
            isFermented: true,
            isLowFodmap: false,
            ingredients: [
              { name: "Salt Cod (Bacalhau)", amount: 500, unit: "g", notes: "soaked and desalted" },
              { name: "Potatoes", amount: 500, unit: "g", notes: "peeled" },
              { name: "Onions", amount: 2, unit: "large", notes: "thinly sliced" },
              { name: "Garlic", amount: 3, unit: "cloves", notes: "minced" },
              { name: "Eggs", amount: 6, unit: "large", notes: "beaten" },
              { name: "Black Olives", amount: 100, unit: "g", notes: "pitted, preferably Portuguese" },
              { name: "Parsley", amount: 0.25, unit: "cup", notes: "chopped, plus more for garnish" },
              { name: "Olive Oil", amount: 120, unit: "ml", notes: "divided" },
              { name: "Bay Leaves", amount: 2, unit: "whole" },
              { name: "Vegetable Oil", amount: 500, unit: "ml", notes: "for frying potatoes" },
              { name: "Salt", amount: 0.5, unit: "tsp", notes: "or to taste (careful, the cod is already salty)" },
              { name: "Black Pepper", amount: 0.5, unit: "tsp", notes: "freshly ground" }
            ],
            instructions: [
              { stepNumber: 1, description: "Prepare the salt cod: If you haven't already, soak the bacalhau in cold water for 24-36 hours, changing the water several times to remove excess salt. Once desalted, drain thoroughly and pat dry with paper towels." },
              { stepNumber: 2, description: "Shred the soaked cod by hand, removing any bones or skin you find. Set aside." },
              { stepNumber: 3, description: "Cut the peeled potatoes into very thin matchsticks (you can use a mandoline or food processor with a julienne attachment). Rinse under cold water to remove excess starch, then pat thoroughly dry with paper towels." },
              { stepNumber: 4, description: "Heat the vegetable oil in a deep, heavy-bottomed pot to 350°F (175°C). Working in batches, fry the potato matchsticks until golden and crispy, about 4-5 minutes per batch. Remove with a slotted spoon and drain on paper towels. Set aside." },
              { stepNumber: 5, description: "In a large skillet or wide pot, heat 60ml (4 tablespoons) of olive oil over medium heat. Add the sliced onions and bay leaves, cooking until the onions are soft and translucent, about 5-7 minutes." },
              { stepNumber: 6, description: "Add the minced garlic and cook for another minute until fragrant." },
              { stepNumber: 7, description: "Add the shredded cod to the skillet, breaking up any clumps with a wooden spoon. Cook, stirring occasionally, for about 5 minutes." },
              { stepNumber: 8, description: "Remove the bay leaves. Stir in the fried potato matchsticks, mixing gently to combine with the cod and onions." },
              { stepNumber: 9, description: "Reduce heat to low. Pour the beaten eggs over the mixture and stir continuously but gently. The eggs should remain soft and creamy, similar to loose scrambled eggs, not dry." },
              { stepNumber: 10, description: "Once the eggs are just set but still moist (about 2-3 minutes), remove from heat. Season with black pepper and taste before adding any salt, as the cod may already provide enough saltiness." },
              { stepNumber: 11, description: "Fold in the chopped parsley and most of the olives, reserving some olives for garnish." },
              { stepNumber: 12, description: "Transfer to a warm serving dish, garnish with the remaining olives and additional fresh parsley. Drizzle with the remaining olive oil and serve immediately." }
            ],
            notes: [
              "Properly soaking the salt cod is crucial - it should be changed in cold water for at least 24 hours, with the water changed 4-5 times. Some cooks soak it for up to 3 days for the best texture.",
              "You can save time by using pre-soaked bacalhau, which is available in some Portuguese or specialty food stores.",
              "The potatoes should be cut into very thin matchsticks for the authentic texture. A mandoline makes this task much easier.",
              "Traditional Portuguese versions use black olives, but green olives can be substituted.",
              "For an extra touch of luxury, some cooks add a small amount of heavy cream to the eggs before adding them to the pan.",
              "Fermented Ingredients: Salt cod curing might involve fermentation depending on the method. Black olives are typically cured through fermentation or brining.",
              "FODMAP Information: High-FODMAP ingredients include onions (fructans) and garlic (fructans). Low-FODMAP ingredients are desalted salt cod, potatoes, eggs, black olives (check brine/additives), parsley, olive oil, bay leaves, vegetable oil, salt, and pepper.",
              "Low-FODMAP Recommendations: Omit onions and garlic. Use garlic-infused olive oil for sautéing and add chopped green parts of spring onions or chives near the end for flavour.",
              "Vitamins & Minerals: Salt cod is an excellent source of protein, Vitamin B12, selenium, and iodine. Potatoes offer potassium and Vitamin C. Eggs provide protein, choline, and Vitamin D. Olives contribute healthy fats and Vitamin E. Parsley adds Vitamin K."
            ],
            nutritionFacts: {
              protein: 38,
              carbs: 28,
              fat: 24,
              fiber: 3,
              sugar: 4,
              sodium: 920
            }
          },
          {
            title: "Веганский Борщ (Vegan Borscht)",
            description: "A plant-based version of the classic Eastern European beet soup, maintaining the dish's vibrant ruby color and complex flavors while using only plant ingredients. This hearty vegan borscht features a rich vegetable broth base, earthy beets, and a variety of vegetables that create a deeply satisfying soup without any animal products. The traditional sweet-sour balance is achieved through the natural sweetness of beets and carrots contrasted with a touch of vinegar or lemon juice. Served with a dollop of plant-based sour cream and fresh dill, this vegan adaptation stays true to the soul-warming comfort of traditional borscht while aligning with plant-based dietary choices.",
            cookingTime: 75,
            servings: 6,
            difficulty: "EASY",
            cuisineType: "Europe",
            regionOfOrigin: "Ukraine/Russia/Poland",
            imageUrl: "/images/recipes/vegan-borscht.jpg",
            calories: 200,
            type: "MAIN",
            isVegetarian: true,
            isVegan: true,
            isGlutenFree: true,
            isLactoseFree: true,
            isNutFree: true,
            isPescatarian: false,
            isFermented: true,
            isLowFodmap: false,
            ingredients: [
              { name: "Beets", amount: 4, unit: "medium", notes: "peeled and grated or julienned" },
              { name: "Cabbage", amount: 300, unit: "g", notes: "shredded" },
              { name: "Potatoes", amount: 3, unit: "medium", notes: "peeled and diced" },
              { name: "Carrots", amount: 2, unit: "medium", notes: "peeled and grated" },
              { name: "Onion", amount: 1, unit: "large", notes: "diced" },
              { name: "Celery", amount: 2, unit: "stalks", notes: "diced" },
              { name: "Tomato Paste", amount: 3, unit: "tbsp" },
              { name: "Garlic", amount: 4, unit: "cloves", notes: "minced" },
              { name: "Vegetable Stock", amount: 2, unit: "liters", notes: "low sodium" },
              { name: "Bay Leaves", amount: 2, unit: "whole" },
              { name: "Dried Mushrooms", amount: 15, unit: "g", notes: "porcini or mixed, rehydrated (optional, for deeper flavor)" },
              { name: "Apple", amount: 1, unit: "medium", notes: "peeled and grated (adds natural sweetness)" },
              { name: "White Beans", amount: 1, unit: "can", notes: "cannellini or great northern, drained and rinsed, for protein" },
              { name: "Olive Oil", amount: 3, unit: "tbsp" },
              { name: "Apple Cider Vinegar", amount: 2, unit: "tbsp", notes: "or lemon juice, adjust to taste" },
              { name: "Maple Syrup", amount: 1, unit: "tsp", notes: "optional, to balance acidity if needed" },
              { name: "Black Peppercorns", amount: 5, unit: "whole" },
              { name: "Allspice Berries", amount: 3, unit: "whole" },
              { name: "Caraway Seeds", amount: 0.5, unit: "tsp", notes: "lightly crushed" },
              { name: "Fresh Dill", amount: 0.25, unit: "cup", notes: "chopped, plus more for garnish" },
              { name: "Fresh Parsley", amount: 0.25, unit: "cup", notes: "chopped" },
              { name: "Salt", amount: 1.5, unit: "tsp", notes: "or to taste" },
              { name: "Black Pepper", amount: 0.5, unit: "tsp", notes: "freshly ground" },
              { name: "Vegan Sour Cream", amount: 0.5, unit: "cup", notes: "store-bought or homemade, for serving" }
            ],
            instructions: [
              { stepNumber: 1, description: "If using dried mushrooms, place them in a bowl and cover with hot water. Let soak for 20-30 minutes. Strain through a coffee filter or fine mesh strainer, reserving the liquid. Chop the rehydrated mushrooms finely." },
              { stepNumber: 2, description: "In a large pot or Dutch oven, heat 2 tablespoons of olive oil over medium heat. Add the onions, carrots, and celery. Sauté until softened, about 5-7 minutes." },
              { stepNumber: 3, description: "Add the minced garlic and cook for another minute until fragrant." },
              { stepNumber: 4, description: "Add the grated beets and the remaining tablespoon of olive oil. Cook for about 5 minutes, stirring occasionally." },
              { stepNumber: 5, description: "Stir in the tomato paste and cook for 2 more minutes to caramelize it slightly." },
              { stepNumber: 6, description: "Add 1 tablespoon of apple cider vinegar or lemon juice to the beet mixture. This helps preserve the vibrant red color of the beets and adds a bit of brightness." },
              { stepNumber: 7, description: "Pour in the vegetable stock, reserved mushroom liquid (if using), bay leaves, black peppercorns, allspice berries, and caraway seeds. Bring to a boil, then reduce heat to a simmer." },
              { stepNumber: 8, description: "Add the diced potatoes, rehydrated chopped mushrooms (if using), and grated apple. Simmer for about 15 minutes or until the potatoes are starting to become tender." },
              { stepNumber: 9, description: "Add the shredded cabbage and drained white beans. Continue simmering for another 10-15 minutes until all vegetables are tender." },
              { stepNumber: 10, description: "Season with salt and freshly ground black pepper. Add the remaining apple cider vinegar or lemon juice to taste, and maple syrup if needed to balance the acidity." },
              { stepNumber: 11, description: "Remove from heat and discard bay leaves, peppercorns, and allspice berries (or warn diners to watch for them)." },
              { stepNumber: 12, description: "Stir in the chopped dill and parsley, reserving some for garnish." },
              { stepNumber: 13, description: "Let the borscht stand covered for about 10 minutes before serving to allow flavors to meld." },
              { stepNumber: 14, description: "Serve hot, garnished with additional fresh dill and a dollop of vegan sour cream. Traditional accompaniments include slices of hearty rye bread." }
            ],
            notes: [
              "Adding a grated apple provides natural sweetness that balances the earthy beets and vinegar without adding refined sugar.",
              "For additional protein and heartiness, the white beans are not traditional but complement the soup well and make it more satisfying as a main course.",
              "The mushrooms (both dried and their soaking liquid) add umami depth that helps compensate for the absence of meat stock.",
              "Like traditional borscht, this vegan version tastes even better the next day after the flavors have had time to develop.",
              "For a smoky flavor that mimics the traditional meat versions, you can add 1 teaspoon of smoked paprika during step 5.",
              "Some regions add sauerkraut instead of or in addition to fresh cabbage - this can add complexity and tanginess to your vegan borscht.",
              "Fermented Ingredients: Apple cider vinegar is produced via fermentation. Vegan sour cream may be fermented depending on its base (e.g., cultured soy or cashews). Vegetable stock might contain fermented flavour enhancers.",
              "FODMAP Information: High/Moderate-FODMAP ingredients include beets (limit 20g), cabbage (limit 1/2 cup Savoy), onion (fructans), celery (limit <5cm stalk), garlic (fructans), dried porcini mushrooms (high), apple (limit 20g), white beans (limit 1/4 cup canned). Low-FODMAP ingredients: potatoes, carrots (limit 1 medium), tomato paste (limit 2 tbsp), vegetable stock (check label), bay leaves, dried oyster mushrooms (low FODMAP), olive oil, vinegar, maple syrup, peppercorns, allspice, caraway, herbs, salt, pepper, vegan sour cream (check ingredients, avoid high FODMAP bases like cashews).",
              "Low-FODMAP Recommendations: Significantly limit beet, cabbage, celery, apple, and white bean portions per serving. Omit onion and garlic, using garlic-infused oil and green parts of leeks/spring onions. Use low-FODMAP stock. Use dried oyster mushrooms instead of porcini. Check vegan sour cream ingredients carefully for high-FODMAP components.",
              "Vitamins & Minerals: Beets offer folate and manganese. Cabbage provides Vitamin K and C. Potatoes and carrots contribute potassium, Vitamin C, and Vitamin A (carrots). Celery contains Vitamin K. White beans add protein and fiber. Mushrooms provide B vitamins. Apples add fiber. Herbs like dill and parsley offer Vitamin K and antioxidants."
            ],
            nutritionFacts: {
              protein: 8,
              carbs: 34,
              fat: 6,
              fiber: 9,
              sugar: 12,
              sodium: 580
            }
          },
          {
            title: "Pyttipanna (Swedish Hash)",
            description: "A beloved Swedish comfort food made from diced potatoes, meat, and onions, pan-fried to golden perfection. The name literally means 'small pieces in a pan,' which perfectly describes this hearty dish that originated as a way to use up leftovers. Traditionally topped with a fried egg and served with pickled beetroot, this simple yet satisfying meal is enjoyed throughout Sweden as both home cooking and pub food. It's especially popular for using Christmas or Sunday roast leftovers, making it a practical and delicious part of Swedish culinary tradition.",
            cookingTime: 40,
            servings: 4,
            difficulty: "EASY",
            cuisineType: "Europe",
            regionOfOrigin: "Sweden",
            imageUrl: "/images/recipes/pyttipanna.jpg",
            calories: 480,
            type: "MAIN",
            isVegetarian: false,
            isVegan: false,
            isGlutenFree: true,
            isLactoseFree: false,
            isNutFree: true,
            isPescatarian: false,
            isFermented: true,
            isLowFodmap: false,
            ingredients: [
              { name: "Potatoes", amount: 800, unit: "g", notes: "boiled, cooled, and diced into 1cm cubes" },
              { name: "Cooked Meat", amount: 400, unit: "g", notes: "beef, ham, or sausage, diced into 1cm cubes" },
              { name: "Onions", amount: 2, unit: "medium", notes: "diced" },
              { name: "Butter", amount: 3, unit: "tbsp", notes: "divided" },
              { name: "Eggs", amount: 4, unit: "large", notes: "for frying" },
              { name: "Pickled Beetroot", amount: 200, unit: "g", notes: "for serving" },
              { name: "Fresh Parsley", amount: 3, unit: "tbsp", notes: "chopped, for garnish" },
              { name: "Salt", amount: 1, unit: "tsp", notes: "or to taste" },
              { name: "Black Pepper", amount: 0.5, unit: "tsp", notes: "freshly ground" },
              { name: "Worcestershire Sauce", amount: 1, unit: "tbsp", notes: "optional" }
            ],
            instructions: [
              { stepNumber: 1, description: "Ensure all ingredients are diced to roughly the same size (about 1cm cubes) for even cooking." },
              { stepNumber: 2, description: "Heat a large, heavy-bottomed skillet or frying pan over medium-high heat. Add 2 tablespoons of butter and let it melt." },
              { stepNumber: 3, description: "Add the diced onions to the pan and sauté until they begin to soften and turn translucent, about 3-4 minutes." },
              { stepNumber: 4, description: "Add the diced potatoes to the pan. Cook without stirring too often to allow them to develop a golden crust, about 5-7 minutes." },
              { stepNumber: 5, description: "Add the diced meat to the pan and continue cooking, stirring occasionally, until everything is heated through and developing crispy edges, about 5 minutes more." },
              { stepNumber: 6, description: "Season the mixture with salt, black pepper, and Worcestershire sauce (if using). Stir to combine and cook for an additional 2 minutes to allow flavors to meld." },
              { stepNumber: 7, description: "While the hash is finishing, heat the remaining tablespoon of butter in a separate frying pan over medium heat. Crack the eggs into the pan and fry them to your preferred doneness (sunny-side up is traditional)." },
              { stepNumber: 8, description: "Divide the pyttipanna among four plates, making a small indentation in the center of each portion for the egg." },
              { stepNumber: 9, description: "Place a fried egg on top of each serving and garnish with chopped parsley." },
              { stepNumber: 10, description: "Serve immediately with pickled beetroot on the side." }
            ],
            notes: [
              "For the best texture, use potatoes that have been boiled the day before and refrigerated overnight. They'll hold their shape better when diced and fried.",
              "This dish is incredibly versatile - use whatever leftover meat you have on hand. Traditionalists often use leftover roast beef, ham, or Swedish meatballs.",
              "For an extra flavor boost, add diced bell peppers or a sprinkle of paprika toward the end of cooking.",
              "Some Swedes like to serve this with a dollop of dijon mustard or ketchup alongside the pickled beetroot.",
              "For a vegetarian version, substitute the meat with halloumi cheese or a meat substitute, added toward the end of cooking.",
              "Fermented Ingredients: Cured meats like ham or sausage involve fermentation/curing. Butter may be cultured. Pickled beetroot is preserved via lactic acid fermentation. Worcestershire sauce contains fermented ingredients (anchovies, vinegar).",
              "FODMAP Information: High-FODMAP ingredients include onions (fructans) and pickled beetroot (GOS). Worcestershire sauce often contains onion/garlic. Low-FODMAP ingredients: potatoes, plain cooked meat (check sausages/ham for additives), butter (limit portion), eggs, parsley, salt, pepper.",
              "Low-FODMAP Recommendations: Omit onions or replace with green parts of spring onions added near the end. Omit pickled beetroot or serve with a low-FODMAP alternative like pickled cucumbers (without onion/garlic). Check Worcestershire sauce label or use a low-FODMAP alternative/omit. Ensure any processed meat used is free from high-FODMAP additives.",
              "Vitamins & Minerals: Potatoes provide potassium and Vitamin C. Meat offers protein, iron, zinc, and B12. Onions contain Vitamin C. Butter adds Vitamin A. Eggs are rich in protein and choline. Pickled beetroot provides folate and manganese. Parsley offers Vitamin K."
            ],
            nutritionFacts: {
              protein: 28,
              carbs: 45,
              fat: 22,
              fiber: 5,
              sugar: 6,
              sodium: 720
            }
          },
          {
            title: "Gulyás (Hungarian Goulash)",
            description: "A rich, hearty Hungarian beef stew characterized by its abundant use of paprika, Hungary's national spice. Originally prepared by cattle herdsmen (gulyás) over open fires on the Hungarian plains, this soul-warming dish features tender chunks of beef, vegetables, and aromatic spices simmered to perfection. Unlike many westernized versions, authentic Hungarian goulash is more soup-like than thick stew, and is traditionally served with csipetke (pinched noodles) or crusty bread for a complete meal that represents the heart of Hungarian cuisine.",
            cookingTime: 150,
            servings: 6,
            difficulty: "MEDIUM",
            cuisineType: "Europe",
            regionOfOrigin: "Hungary",
            imageUrl: "/images/recipes/hungarian-goulash.jpg",
            calories: 420,
            type: "MAIN",
            isVegetarian: false,
            isVegan: false,
            isGlutenFree: true,
            isLactoseFree: true,
            isNutFree: true,
            isPescatarian: false,
            isFermented: true,
            isLowFodmap: false,
            ingredients: [
              { name: "Beef Chuck", amount: 1.5, unit: "kg", notes: "cut into 2.5cm cubes" },
              { name: "Onions", amount: 2, unit: "large", notes: "diced" },
              { name: "Garlic", amount: 4, unit: "cloves", notes: "minced" },
              { name: "Hungarian Sweet Paprika", amount: 3, unit: "tbsp", notes: "high-quality" },
              { name: "Hot Paprika", amount: 1, unit: "tsp", notes: "or cayenne pepper, adjust to taste" },
              { name: "Caraway Seeds", amount: 1, unit: "tsp", notes: "lightly crushed" },
              { name: "Marjoram", amount: 1, unit: "tsp", notes: "dried" },
              { name: "Bay Leaves", amount: 2, unit: "whole" },
              { name: "Tomatoes", amount: 2, unit: "medium", notes: "diced" },
              { name: "Bell Peppers", amount: 2, unit: "medium", notes: "preferably one red and one yellow, diced" },
              { name: "Carrots", amount: 2, unit: "medium", notes: "diced" },
              { name: "Potatoes", amount: 4, unit: "medium", notes: "peeled and cut into 2cm cubes" },
              { name: "Beef Stock", amount: 1.5, unit: "liters" },
              { name: "Lard", amount: 2, unit: "tbsp", notes: "or vegetable oil" },
              { name: "Salt", amount: 1, unit: "tsp", notes: "or to taste" },
              { name: "Black Pepper", amount: 0.5, unit: "tsp", notes: "freshly ground" },
              { name: "All-Purpose Flour", amount: 150, unit: "g", notes: "for csipetke (optional)" },
              { name: "Egg", amount: 1, unit: "large", notes: "for csipetke (optional)" },
              { name: "Salt", amount: 0.25, unit: "tsp", notes: "for csipetke (optional)" },
              { name: "Water", amount: 2, unit: "tbsp", notes: "for csipetke (optional), as needed" },
              { name: "Sour Cream", amount: 240, unit: "ml", notes: "for serving" },
              { name: "Fresh Parsley", amount: 3, unit: "tbsp", notes: "chopped, for garnish" }
            ],
            instructions: [
              { stepNumber: 1, description: "In a large Dutch oven or heavy-bottomed pot, melt the lard over medium-high heat. Working in batches to avoid overcrowding, brown the beef cubes on all sides, about 3-4 minutes per batch. Transfer browned meat to a plate and set aside." },
              { stepNumber: 2, description: "In the same pot, reduce heat to medium and add diced onions. Cook until softened and translucent, about 5-7 minutes, scraping up any browned bits from the bottom of the pot." },
              { stepNumber: 3, description: "Add minced garlic and cook for another minute until fragrant. Remove the pot from heat momentarily to cool slightly (this prevents the paprika from burning)." },
              { stepNumber: 4, description: "Add the sweet and hot paprika, stirring quickly to coat the onions. Return pot to low heat and cook for 30 seconds, stirring constantly to prevent burning." },
              { stepNumber: 5, description: "Return the browned beef to the pot, along with any accumulated juices. Add crushed caraway seeds, marjoram, bay leaves, salt, and pepper. Stir to combine." },
              { stepNumber: 6, description: "Add diced tomatoes and bell peppers. Pour in enough beef stock to just cover the meat, about 1 liter. Bring to a simmer." },
              { stepNumber: 7, description: "Reduce heat to maintain a gentle simmer, cover, and cook for 1.5 hours, or until meat is nearly tender, stirring occasionally." },
              { stepNumber: 8, description: "Add diced carrots and potatoes, along with additional beef stock if needed to keep ingredients covered. Continue to simmer, covered, for about 30 minutes more, until vegetables and meat are tender." },
              { stepNumber: 9, description: "If making csipetke: While the goulash is simmering, prepare the noodles. Mix flour, egg, and salt in a bowl. Add water as needed to form a stiff dough. Let rest for 10 minutes." },
              { stepNumber: 10, description: "For the csipetke: Pinch off small, fingernail-sized pieces of dough and roll between your fingers to form small noodles. Set aside on a floured surface." },
              { stepNumber: 11, description: "When the meat and vegetables are tender, taste the goulash and adjust seasonings as needed. If using csipetke, add the noodles to the simmering goulash and cook for about 5 minutes until they float to the surface." },
              { stepNumber: 12, description: "Remove bay leaves. Ladle the goulash into bowls, garnish with a dollop of sour cream and a sprinkle of fresh parsley. Serve hot with crusty bread." }
            ],
            notes: [
              "The quality of paprika is crucial for authentic Hungarian goulash - look for imported Hungarian sweet paprika for the best flavor.",
              "Traditional Hungarian goulash has a soup-like consistency, not a thick stew texture common in American versions.",
              "For the most authentic taste, use lard instead of oil, though vegetable oil works fine as a substitute.",
              "Some Hungarian cooks add a green pepper called Hungarian wax pepper (similar to banana peppers) for extra flavor.",
              "The csipetke noodles are optional but traditional - small egg dumplings that add a hearty touch to the dish.",
              "Fermented Ingredients: Sour cream is produced by fermenting cream with lactic acid bacteria. Beef stock may contain fermented flavor enhancers.",
              "FODMAP Information: High-FODMAP ingredients include onions (fructans), garlic (fructans), all-purpose flour (fructans - in csipetke), and sour cream (lactose). Low/Moderate-FODMAP ingredients: beef chuck, paprika, spices, tomatoes (limit portion), bell peppers (limit portion/color), carrots (limit portion), potatoes, stock (check label), lard/oil, salt, pepper, egg, water, parsley.",
              "Low-FODMAP Recommendations: Omit onions and garlic, using garlic-infused oil/lard and green parts of leeks/spring onions. Use certified low-FODMAP beef stock. Omit csipetke noodles or make with gluten-free flour. Serve with lactose-free sour cream. Limit portions of tomatoes and bell peppers.",
              "Vitamins & Minerals: Beef provides protein, iron, zinc, and B12. Paprika is rich in Vitamin A and antioxidants. Onions and garlic contain Vitamin C and sulfur compounds. Tomatoes and bell peppers offer Vitamin C. Carrots provide Vitamin A. Potatoes supply potassium and Vitamin C. Sour cream adds calcium."
            ],
            nutritionFacts: {
              protein: 38,
              carbs: 28,
              fat: 20,
              fiber: 5,
              sugar: 8,
              sodium: 680
            }
          },
          {
            title: "Bouillabaisse (French Seafood Stew)",
            description: "A traditional Provençal fish stew originating from the port city of Marseille. This iconic French dish features a variety of Mediterranean fish and shellfish simmered in a rich broth flavored with saffron, fennel, and orange zest. Originally created by Marseille fishermen using unsold seafood from the day's catch, bouillabaisse has evolved into a celebrated delicacy that captures the essence of southern French coastal cuisine. It's traditionally served with rouille, a garlicky saffron mayonnaise, and crusty bread to soak up the flavorful broth.",
            cookingTime: 90,
            servings: 6,
            difficulty: "MEDIUM",
            cuisineType: "Europe",
            regionOfOrigin: "France",
            imageUrl: "/images/recipes/bouillabaisse.jpg",
            calories: 480,
            type: "MAIN",
            isVegetarian: false,
            isVegan: false,
            isGlutenFree: true,
            isLactoseFree: true,
            isNutFree: true,
            isPescatarian: true,
            isFermented: true,
            isLowFodmap: false,
            ingredients: [
              { name: "Fish Fillets", amount: 1.5, unit: "kg", notes: "assorted firm white fish like cod, haddock, sea bass, cut into large chunks" },
              { name: "Mussels", amount: 500, unit: "g", notes: "cleaned and debearded" },
              { name: "Large Shrimp", amount: 500, unit: "g", notes: "peeled and deveined, tails left on" },
              { name: "Olive Oil", amount: 60, unit: "ml", notes: "for cooking vegetables" },
              { name: "Leeks", amount: 2, unit: "medium", notes: "white and light green parts, cleaned and sliced" },
              { name: "Fennel Bulb", amount: 1, unit: "large", notes: "cored and thinly sliced, fronds reserved for garnish" },
              { name: "Onion", amount: 1, unit: "large", notes: "chopped" },
              { name: "Garlic", amount: 6, unit: "cloves", notes: "minced, for stew" },
              { name: "Tomatoes", amount: 800, unit: "g", notes: "canned, chopped, with juices" },
              { name: "Orange Zest", amount: 1, unit: "tbsp", notes: "finely grated" },
              { name: "Saffron Threads", amount: 0.5, unit: "tsp", notes: "for stew" },
              { name: "Bay Leaves", amount: 2, unit: "whole" },
              { name: "Thyme", amount: 2, unit: "sprigs", notes: "fresh" },
              { name: "Fish Stock", amount: 1.5, unit: "liters" },
              { name: "Dry White Wine", amount: 240, unit: "ml", notes: "for cooking" },
              { name: "Pernod or Pastis", amount: 2, unit: "tbsp", notes: "optional but traditional" },
              { name: "Red Pepper Flakes", amount: 0.25, unit: "tsp", notes: "or to taste" },
              { name: "Salt", amount: 1, unit: "tsp", notes: "for stew, or to taste" },
              { name: "Black Pepper", amount: 0.5, unit: "tsp", notes: "freshly ground" },
              { name: "Baguette", amount: 1, unit: "loaf", notes: "sliced and toasted, for serving" },
              { name: "Garlic", amount: 4, unit: "cloves", notes: "minced, for rouille sauce" },
              { name: "Red Pepper", amount: 1, unit: "small", notes: "roasted, peeled and seeded, for rouille sauce" },
              { name: "Breadcrumbs", amount: 60, unit: "g", notes: "fresh, for rouille sauce" },
              { name: "Egg Yolk", amount: 1, unit: "large", notes: "for rouille sauce" },
              { name: "Olive Oil", amount: 120, unit: "ml", notes: "extra virgin, for rouille sauce" },
              { name: "Saffron Threads", amount: 0.25, unit: "tsp", notes: "soaked in 1 tbsp hot water, for rouille sauce" },
              { name: "Lemon Juice", amount: 2, unit: "tsp", notes: "fresh, for rouille sauce" },
              { name: "Salt", amount: 0.25, unit: "tsp", notes: "for rouille sauce, or to taste" }
            ],
            instructions: [
              { stepNumber: 1, description: "Prepare the seafood: Clean and cut fish into 2-inch chunks. Clean mussels by scrubbing shells and removing beards. Peel and devein shrimp, leaving tails on. Refrigerate seafood until needed." },
              { stepNumber: 2, description: "In a large Dutch oven or heavy pot, heat olive oil over medium heat. Add leeks, fennel, and onion. Cook, stirring occasionally, until vegetables are softened but not browned, about 8-10 minutes." },
              { stepNumber: 3, description: "Add garlic and cook until fragrant, about 1 minute. Stir in tomatoes with their juices, orange zest, saffron, bay leaves, and thyme sprigs." },
              { stepNumber: 4, description: "Pour in the fish stock and white wine. Bring to a gentle boil, then reduce heat to maintain a simmer. Cook uncovered for 20 minutes to allow flavors to meld." },
              { stepNumber: 5, description: "Meanwhile, prepare the rouille: In a food processor, combine garlic, roasted red pepper, breadcrumbs, egg yolk, saffron with its soaking liquid, and lemon juice. Pulse until smooth. With the machine running, gradually add olive oil in a thin stream until the mixture thickens like mayonnaise. Season with salt and set aside." },
              { stepNumber: 6, description: "After the broth has simmered for 20 minutes, season with salt, pepper, and red pepper flakes. If using, add the Pernod or Pastis." },
              { stepNumber: 7, description: "Add the fish pieces to the simmering broth. Cook for 2 minutes, then add the mussels and shrimp. Cover and cook until the mussels open and the fish and shrimp are just cooked through, about 4-5 minutes. Discard any mussels that don't open." },
              { stepNumber: 8, description: "Remove bay leaves and thyme sprigs. Taste broth and adjust seasoning if necessary." },
              { stepNumber: 9, description: "To serve traditionally: Ladle some broth into soup bowls, then arrange the seafood and vegetables on a separate platter. Allow diners to help themselves to the seafood and pour additional broth over it. Alternatively, you can place seafood and vegetables directly into individual bowls and ladle broth over them." },
              { stepNumber: 10, description: "Garnish with reserved fennel fronds. Serve immediately with toasted baguette slices spread with rouille." }
            ],
            notes: [
              "Authentic bouillabaisse should include at least three different types of fish typical of the Mediterranean. Traditional choices include red mullet, sea robin, and European conger.",
              "For the best flavor, make your own fish stock by simmering fish bones with aromatics, or ask your fishmonger for fish trimmings to make the stock.",
              "The saffron is essential to achieve the distinctive flavor and golden color of a true bouillabaisse.",
              "In Marseille, the broth is traditionally served separately from the seafood, with diners adding the seafood to their bowls as desired.",
              "While Pernod or Pastis adds an authentic touch, you can omit it if unavailable or not to your taste.",
              "Fermented Ingredients: Fish stock may contain fermented elements. White wine is produced via yeast fermentation. Pernod/Pastis involves fermentation and distillation. Baguette and breadcrumbs rely on yeast fermentation.",
              "FODMAP Information: High/Moderate-FODMAP ingredients include leeks (white parts), fennel bulb (limit portion), onion (fructans), garlic (fructans), baguette (fructans), and breadcrumbs (fructans). Low-FODMAP ingredients: fish, mussels, shrimp, olive oil, leeks (green parts), tomatoes (limit portion), orange zest, saffron, herbs, fish stock (check label), white wine, Pernod/Pastis (small amounts), red pepper flakes, salt, pepper, roasted red pepper (limit portion), egg yolk, lemon juice.",
              "Low-FODMAP Recommendations: Use only the green parts of leeks. Limit fennel bulb serving size (e.g., 1/2 cup). Omit onion and garlic, using garlic-infused oil. Use low-FODMAP fish stock. For rouille, use gluten-free breadcrumbs and omit garlic (or use garlic-infused oil). Serve with gluten-free bread instead of baguette. Limit tomato and roasted red pepper portions.",
              "Vitamins & Minerals: Assorted fish and shellfish provide lean protein, Vitamin B12, iodine, selenium, and omega-3 fatty acids. Leeks, fennel, and onion offer Vitamin C and antioxidants. Tomatoes provide Vitamin C and lycopene. Saffron contains antioxidants. Olive oil supplies healthy fats and Vitamin E."
            ],
            nutritionFacts: {
              protein: 48,
              carbs: 22,
              fat: 18,
              fiber: 4,
              sugar: 6,
              sodium: 850
            }
          },
          {
            title: "Kartoffelpuffer (German Potato Pancakes)",
            description: "Crispy on the outside, tender on the inside, these traditional German potato pancakes are a beloved street food and home-cooked staple throughout Germany. Also known as Reibekuchen or Reiberdatschi in different regions, these simple yet satisfying pancakes are made from grated potatoes mixed with onion, eggs, and a touch of flour. They're typically served hot with sweet applesauce, savory sour cream, or both, creating a perfect balance of flavors and textures.",
            cookingTime: 45,
            servings: 4,
            difficulty: "EASY",
            cuisineType: "Europe",
            regionOfOrigin: "Germany",
            imageUrl: "/images/recipes/kartoffelpuffer.jpg",
            calories: 320,
            type: "SIDE",
            isVegetarian: true,
            isVegan: false,
            isGlutenFree: false,
            isLactoseFree: false,
            isNutFree: true,
            isPescatarian: false,
            isFermented: true,
            isLowFodmap: false,
            ingredients: [
              { name: "Russet Potatoes", amount: 1, unit: "kg", notes: "peeled" },
              { name: "Onion", amount: 1, unit: "medium", notes: "peeled" },
              { name: "Eggs", amount: 2, unit: "large" },
              { name: "All-Purpose Flour", amount: 3, unit: "tbsp" },
              { name: "Salt", amount: 1, unit: "tsp" },
              { name: "Black Pepper", amount: 0.25, unit: "tsp", notes: "freshly ground" },
              { name: "Nutmeg", amount: 0.125, unit: "tsp", notes: "freshly grated" },
              { name: "Vegetable Oil", amount: 240, unit: "ml", notes: "for frying" },
              { name: "Applesauce", amount: 240, unit: "ml", notes: "for serving" },
              { name: "Sour Cream", amount: 120, unit: "ml", notes: "for serving" }
            ],
            instructions: [
              { stepNumber: 1, description: "Line a large bowl with a clean kitchen towel. Using a box grater or food processor with a grating attachment, grate the peeled potatoes and onion." },
              { stepNumber: 2, description: "Transfer the grated mixture to the towel-lined bowl. Gather the corners of the towel and twist tightly over the sink to squeeze out as much liquid as possible. This is crucial for crispy pancakes." },
              { stepNumber: 3, description: "Transfer the squeezed potato and onion mixture to a clean bowl. Add the eggs, flour, salt, pepper, and nutmeg. Mix thoroughly to form a batter." },
              { stepNumber: 4, description: "Heat about 1/4 inch of vegetable oil in a large skillet over medium-high heat until shimmering but not smoking." },
              { stepNumber: 5, description: "Working in batches, drop spoonfuls (about 2 tablespoons) of the batter into the hot oil and flatten slightly with the back of the spoon to form pancakes about 3-4 inches in diameter." },
              { stepNumber: 6, description: "Fry until the edges are golden brown and crispy, about 3-4 minutes. Flip carefully and cook the other side until golden brown, about 3 minutes more." },
              { stepNumber: 7, description: "Transfer to a paper towel-lined plate to drain excess oil. Keep warm in a low oven (about 93°C/200°F) while cooking remaining batches." },
              { stepNumber: 8, description: "Serve hot with applesauce and/or sour cream on the side." }
            ],
            notes: [
              "The key to crispy potato pancakes is removing as much moisture as possible from the grated potatoes.",
              "If the batter starts to release liquid between batches, stir it well and drain off any excess liquid before continuing.",
              "For a twist, add a handful of grated apple to the potato mixture for a touch of sweetness.",
              "In northern Germany, they're often served with a simple shrimp salad, while in eastern regions you might find them with quark (a fresh dairy product similar to Greek yogurt).",
              "Leftover pancakes can be refrigerated and reheated in a 180°C (350°F) oven for about 10 minutes until crispy again.",
              "Fermented Ingredients: Sour cream is produced by fermenting cream with lactic acid bacteria.",
              "FODMAP Information: High-FODMAP ingredients include onion (fructans), all-purpose flour (fructans), applesauce (fructose/polyols), and sour cream (lactose). Low-FODMAP ingredients are potatoes, eggs, salt, pepper, nutmeg, and oil.",
              "Low-FODMAP Recommendations: Omit onion or replace with finely chopped green parts of spring onions. Use gluten-free all-purpose flour. Replace applesauce with a low-FODMAP serving of maple syrup or enjoy plain. Serve with lactose-free sour cream.",
              "Vitamins & Minerals: Potatoes provide potassium, Vitamin C, and B6. Onions offer Vitamin C. Eggs are a source of protein and choline. Flour adds carbohydrates. Applesauce contains Vitamin C and fiber. Sour cream provides calcium."
            ],
            nutritionFacts: {
              protein: 8,
              carbs: 38,
              fat: 16,
              fiber: 4,
              sugar: 7,
              sodium: 320
            }
          },
          {
            title: "Käsespätzle (German Cheese Noodles)",
            description: "A comforting German dish from the Swabian region, featuring handmade egg noodles layered with melted cheese and topped with caramelized onions. Käsespätzle is the German equivalent of mac and cheese, but with a rustic, homemade approach that creates uniquely textured noodles. The combination of buttery spätzle, gooey mountain cheese, and sweet caramelized onions makes this a beloved dish throughout southern Germany, Austria, and parts of Switzerland.",
            cookingTime: 60,
            servings: 4,
            difficulty: "MEDIUM",
            cuisineType: "Europe",
            regionOfOrigin: "Germany",
            imageUrl: "/images/recipes/kasespatzle.jpg",
            calories: 580,
            type: "MAIN",
            isVegetarian: true,
            isVegan: false,
            isGlutenFree: false,
            isLactoseFree: false,
            isNutFree: true,
            isPescatarian: false,
            isFermented: true,
            isLowFodmap: false,
            ingredients: [
              { name: "All-Purpose Flour", amount: 400, unit: "g" },
              { name: "Eggs", amount: 5, unit: "large" },
              { name: "Whole Milk", amount: 120, unit: "ml", notes: "as needed" },
              { name: "Salt", amount: 1.5, unit: "tsp", notes: "divided, plus more for cooking water" },
              { name: "Nutmeg", amount: 0.25, unit: "tsp", notes: "freshly grated" },
              { name: "Onions", amount: 3, unit: "large", notes: "thinly sliced" },
              { name: "Butter", amount: 100, unit: "g", notes: "divided" },
              { name: "Emmentaler Cheese", amount: 200, unit: "g", notes: "grated" },
              { name: "Gruyère Cheese", amount: 200, unit: "g", notes: "grated" },
              { name: "Black Pepper", amount: 0.5, unit: "tsp", notes: "freshly ground" },
              { name: "Chives", amount: 2, unit: "tbsp", notes: "chopped, for garnish" }
            ],
            instructions: [
              { stepNumber: 1, description: "Start with the caramelized onions: Melt 50g butter in a large skillet over medium-low heat. Add the thinly sliced onions and a pinch of salt. Cook, stirring occasionally, for 25-30 minutes until deeply golden brown and caramelized. Set aside." },
              { stepNumber: 2, description: "Meanwhile, prepare the spätzle batter: In a large bowl, combine flour, 1 teaspoon salt, and nutmeg. Make a well in the center and add the eggs. Begin mixing with a wooden spoon, gradually incorporating flour from the edges." },
              { stepNumber: 3, description: "Slowly add milk as needed, continuing to stir until a smooth, thick batter forms. It should be thick enough to slowly drop from the spoon but not as firm as a dough. Let the batter rest for 10 minutes." },
              { stepNumber: 4, description: "Bring a large pot of well-salted water to a boil. Prepare an ice bath in a large bowl." },
              { stepNumber: 5, description: "To form the spätzle: Hold a spätzle maker, coarse colander, or potato ricer with large holes over the boiling water. Add a portion of the batter and press through the holes into the water. Alternatively, place batter on a wet cutting board and use a knife to scrape thin strips into the water." },
              { stepNumber: 6, description: "Cook the spätzle for 2-3 minutes until they float to the surface. Remove with a slotted spoon and transfer to the ice bath to stop cooking. Drain well and toss with a little butter to prevent sticking. Repeat with remaining batter." },
              { stepNumber: 7, description: "Preheat oven to 180°C (350°F). Butter a 2-liter (9x13 inch) baking dish." },
              { stepNumber: 8, description: "In a large bowl, combine both grated cheeses. In the prepared baking dish, create alternating layers of spätzle and cheese, beginning and ending with spätzle. Each cheese layer should be generously sprinkled but not too thick." },
              { stepNumber: 9, description: "Top the final layer with the caramelized onions and dot with the remaining butter cut into small pieces. Sprinkle with black pepper." },
              { stepNumber: 10, description: "Bake for 20-25 minutes until the cheese is melted and bubbly, and the top is lightly browned." },
              { stepNumber: 11, description: "Let stand for 5 minutes before serving. Garnish with chopped chives and serve hot." }
            ],
            notes: [
              "Traditional German spätzle makers (spätzlehobel) make the process easier, but a colander with large holes or even a cheese grater can work in a pinch.",
              "The batter should be between a thick batter and a soft dough - it should slowly fall from a spoon but hold its shape somewhat.",
              "For variation, you can add a handful of cooked and crumbled bacon to the layers.",
              "Mountain cheeses like Bergkäse or Allgäuer Emmentaler are traditional, but any good melting cheese can be substituted.",
              "In some regions, a small amount of sautéed leeks or spinach is added between the layers for additional flavor and color.",
              "Fermented Ingredients: Butter may be cultured. Emmentaler and Gruyère cheeses are aged cheeses produced using bacterial fermentation.",
              "FODMAP Information: High-FODMAP ingredients include all-purpose flour (fructans), milk (lactose), and onions (fructans). Low-FODMAP ingredients: eggs, salt, nutmeg, butter (limit portion), Emmentaler cheese (low lactose), Gruyère cheese (low lactose), pepper, chives.",
              "Low-FODMAP Recommendations: Use a gluten-free all-purpose flour blend for the spätzle. Use lactose-free milk in the batter. Omit the caramelized onions, or replace with sautéed green parts of leeks or spring onions cooked in garlic-infused oil.",
              "Vitamins & Minerals: Flour provides carbohydrates. Eggs offer protein and choline. Milk contributes calcium and Vitamin D. Onions contain Vitamin C. Butter adds Vitamin A. Emmentaler and Gruyère cheeses are excellent sources of calcium and protein. Chives provide Vitamin K."
            ],
            nutritionFacts: {
              protein: 32,
              carbs: 48,
              fat: 34,
              fiber: 2,
              sugar: 5,
              sodium: 890
            }
          },
  ] as SeedRecipeRecipe [];