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
}

interface NutritionFacts {
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
  sodium: number;
}

interface Recipe {
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
  isDairyFree: boolean;
  isNutFree: boolean;
  ingredients: Ingredient[];
  instructions: Instruction[];
  nutritionFacts: NutritionFacts;
  notes?: string[];
}

export const recipes: Recipe[] = [
  {
    title: 'Quinoa Buddha Bowl',
    description: 'A vibrant and nutritious bowl featuring protein-rich quinoa, perfectly roasted sweet potatoes, crispy chickpeas, and fresh kale, all drizzled with a creamy tahini dressing. This balanced meal combines different textures and flavors while providing essential nutrients for a satisfying and healthy dining experience.',
    cookingTime: 40,
    servings: 2,
    difficulty: 'EASY',
    cuisineType: 'international',
    regionOfOrigin: 'Global',
    imageUrl: '/images/recipes/quinoa-buddha-bowl.jpg',
    calories: 450,
    type: 'LUNCH',
    isVegetarian: true,
    isVegan: true,
    isGlutenFree: true,
    isDairyFree: true,
    isNutFree: false,
    ingredients: [
      { name: 'Quinoa', amount: 1, unit: 'cup', notes: 'rinsed and drained' },
      { name: 'Water', amount: 2, unit: 'cups', notes: 'for cooking quinoa' },
      { name: 'Sweet Potato', amount: 1, unit: 'medium', notes: 'peeled and cut into 1-inch cubes' },
      { name: 'Chickpeas', amount: 1, unit: 'can', notes: '15 oz can, drained, rinsed, and patted dry' },
      { name: 'Kale', amount: 2, unit: 'cups', notes: 'stems removed, leaves torn into bite-sized pieces' },
      { name: 'Olive Oil', amount: 2, unit: 'tablespoons', notes: 'divided' },
      { name: 'Tahini', amount: 3, unit: 'tablespoons', notes: 'well-stirred' },
      { name: 'Lemon Juice', amount: 2, unit: 'tablespoons', notes: 'freshly squeezed' },
      { name: 'Garlic', amount: 1, unit: 'clove', notes: 'minced' },
      { name: 'Maple Syrup', amount: 1, unit: 'teaspoon' },
      { name: 'Sea Salt', amount: 1, unit: 'teaspoon', notes: 'divided' },
      { name: 'Black Pepper', amount: 0.5, unit: 'teaspoon', notes: 'freshly ground' },
      { name: 'Cumin', amount: 1, unit: 'teaspoon', notes: 'ground' },
      { name: 'Paprika', amount: 0.5, unit: 'teaspoon' },
      { name: 'Warm Water', amount: 3, unit: 'tablespoons', notes: 'for thinning tahini dressing' }
    ],
    instructions: [
      { stepNumber: 1, description: 'Preheat oven to 400°F (200°C) and line two baking sheets with parchment paper.' },
      { stepNumber: 2, description: 'Rinse quinoa thoroughly in a fine-mesh strainer. Combine with 2 cups water and 1/4 teaspoon salt in a medium saucepan. Bring to a boil, reduce heat to low, cover, and simmer for 15-20 minutes until water is absorbed and quinoa is fluffy. Remove from heat, fluff with a fork, and let stand covered for 5 minutes.' },
      { stepNumber: 3, description: 'Toss sweet potato cubes with 1 tablespoon olive oil, 1/4 teaspoon salt, cumin, and paprika. Spread on one baking sheet. On the second sheet, toss chickpeas with 1 tablespoon olive oil, 1/4 teaspoon salt, and remaining cumin. Roast both for 20-25 minutes, stirring halfway through. Sweet potatoes should be tender and chickpeas crispy.' },
      { stepNumber: 4, description: 'While vegetables roast, prepare the tahini dressing: Whisk together tahini, lemon juice, minced garlic, maple syrup, 1/4 teaspoon salt, and black pepper. Gradually add warm water until you reach desired consistency. The dressing should be pourable but still creamy.' },
      { stepNumber: 5, description: 'Place torn kale in a large bowl. Drizzle with 1 teaspoon olive oil and a pinch of salt. Massage the kale with your hands for 1-2 minutes until it becomes darker and more tender.' },
      { stepNumber: 6, description: 'To assemble bowls: Divide quinoa between two bowls. Arrange roasted sweet potatoes, crispy chickpeas, and massaged kale around the quinoa. Drizzle generously with tahini dressing.' },
      { stepNumber: 7, description: 'Optional: garnish with additional toppings like sesame seeds, microgreens, or a squeeze of lemon juice.' }
    ],
    notes: [
      "For meal prep: Prepare components separately and store in airtight containers. The tahini dressing will keep for up to 5 days in the refrigerator.",
      "To make the bowl more filling, add sliced avocado or additional roasted vegetables.",
      "The chickpeas can be seasoned with different spice combinations - try curry powder or za'atar for variation.",
      "Massage the kale well - this step breaks down the tough fibers and makes it more digestible.",
      "If tahini is too thick, warm it slightly before mixing the dressing."
    ],
    nutritionFacts: {
      protein: 15,
      carbs: 65,
      fat: 12,
      fiber: 8,
      sugar: 6,
      sodium: 400,
    },
  },
  {
    title: 'Japanese Miso Soup',
    description: 'A soul-warming traditional Japanese soup featuring a delicate dashi broth enriched with umami-rich miso paste, silky soft tofu, tender wakame seaweed, and fresh green onions. This nourishing soup is a cornerstone of Japanese cuisine, traditionally served for breakfast but perfect for any time of day.',
    cookingTime: 20,
    servings: 4,
    difficulty: 'EASY',
    cuisineType: 'japanese',
    regionOfOrigin: 'Japan',
    imageUrl: '/images/recipes/japanese-miso-soup.jpg',
    calories: 120,
    type: 'BREAKFAST',
    isVegetarian: true,
    isVegan: true,
    isGlutenFree: true,
    isDairyFree: true,
    isNutFree: true,
    ingredients: [
      { name: 'Dashi Stock', amount: 4, unit: 'cups', notes: 'kombu and shiitake based for vegan version' },
      { name: 'Kombu (Dried Kelp)', amount: 1, unit: 'piece', notes: '4-inch square piece' },
      { name: 'Dried Shiitake Mushrooms', amount: 2, unit: 'pieces' },
      { name: 'White Miso Paste', amount: 4, unit: 'tablespoons', notes: 'or mix white and yellow miso' },
      { name: 'Soft Tofu', amount: 14, unit: 'ounces', notes: 'cut into 1/2-inch cubes' },
      { name: 'Dried Wakame Seaweed', amount: 2, unit: 'tablespoons', notes: 'rehydrated' },
      { name: 'Green Onions', amount: 3, unit: 'stalks', notes: 'finely chopped' },
      { name: 'Fresh Shiitake Mushrooms', amount: 4, unit: 'pieces', notes: 'thinly sliced (optional)' },
      { name: 'Water', amount: 4, unit: 'cups', notes: 'filtered' }
    ],
    instructions: [
      { stepNumber: 1, description: 'To make dashi: Wipe the kombu piece with a damp cloth (do not wash). Place kombu and dried shiitake in 4 cups cold water in a medium saucepan. Let steep for 30 minutes.' },
      { stepNumber: 2, description: 'Place the saucepan over medium heat. Remove the kombu just before the water comes to a boil (this prevents bitterness). Let shiitake simmer for 5 minutes, then remove. This is your dashi stock.' },
      { stepNumber: 3, description: 'While making dashi, place wakame in a small bowl with cold water. Soak for 5-10 minutes until rehydrated. Drain and set aside.' },
      { stepNumber: 4, description: 'Reduce heat to low. Place miso paste in a small bowl. Add about 1/2 cup of the warm dashi and whisk until the miso is completely dissolved with no lumps.' },
      { stepNumber: 5, description: 'Add the dissolved miso back to the pot with the remaining dashi. Keep the soup below a simmer to preserve the probiotics in the miso.' },
      { stepNumber: 6, description: 'Gently add the cubed tofu and rehydrated wakame. If using fresh shiitake, add them now. Heat until the tofu is warmed through, about 2-3 minutes.' },
      { stepNumber: 7, description: 'Taste and adjust the miso seasoning if needed. Different types of miso have varying levels of saltiness.' },
      { stepNumber: 8, description: 'Divide into serving bowls and garnish with chopped green onions. Serve immediately while hot.' }
    ],
    notes: [
      "For non-vegan version, use bonito-based dashi instead of kombu-shiitake dashi.",
      "Don't boil the soup after adding miso to preserve its probiotic benefits.",
      "Store any leftover dashi stock in the refrigerator for up to 3 days.",
      "You can add other vegetables like spinach or daikon radish.",
      "The type of miso used will affect the flavor - white miso is milder, while darker miso is stronger.",
      "To save time, you can use instant dashi, though homemade has better flavor."
    ],
    nutritionFacts: {
      protein: 8,
      carbs: 12,
      fat: 4,
      fiber: 2,
      sugar: 1,
      sodium: 800,
    },
  },
  {
    title: 'Mediterranean Grilled Chicken',
    description: 'Succulent chicken breasts marinated in a fragrant blend of Greek yogurt, fresh lemon, garlic, and Mediterranean herbs, then grilled to perfection. Served with a crisp Greek salad and cooling tzatziki sauce, this dish brings the sunny flavors of the Mediterranean to your table.',
    cookingTime: 60,
    servings: 4,
    difficulty: 'MEDIUM',
    cuisineType: 'mediterranean',
    regionOfOrigin: 'Greece',
    imageUrl: '/images/recipes/mediterranean-grilled-chicken.jpg',
    calories: 420,
    type: 'DINNER',
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: true,
    isDairyFree: false,
    isNutFree: true,
    ingredients: [
      { name: 'Chicken Breasts', amount: 4, unit: 'pieces', notes: 'boneless, skinless, about 6 oz each' },
      { name: 'Greek Yogurt', amount: 1, unit: 'cup', notes: 'full-fat' },
      { name: 'Lemons', amount: 2, unit: 'whole', notes: '1 juiced, 1 for serving' },
      { name: 'Garlic Cloves', amount: 4, unit: 'pieces', notes: 'minced' },
      { name: 'Olive Oil', amount: 0.25, unit: 'cup', notes: 'extra virgin' },
      { name: 'Dried Oregano', amount: 2, unit: 'tablespoons', notes: 'preferably Greek' },
      { name: 'Fresh Rosemary', amount: 2, unit: 'sprigs', notes: 'finely chopped' },
      { name: 'Sea Salt', amount: 1.5, unit: 'teaspoons' },
      { name: 'Black Pepper', amount: 1, unit: 'teaspoon', notes: 'freshly ground' },
      // For Tzatziki Sauce
      { name: 'Greek Yogurt', amount: 1, unit: 'cup', notes: 'for tzatziki' },
      { name: 'English Cucumber', amount: 0.5, unit: 'piece', notes: 'grated and drained' },
      { name: 'Garlic Cloves', amount: 2, unit: 'pieces', notes: 'minced, for tzatziki' },
      { name: 'Fresh Dill', amount: 2, unit: 'tablespoons', notes: 'chopped' },
      // For Greek Salad
      { name: 'Cherry Tomatoes', amount: 2, unit: 'cups', notes: 'halved' },
      { name: 'English Cucumber', amount: 1, unit: 'piece', notes: 'diced' },
      { name: 'Red Onion', amount: 1, unit: 'medium', notes: 'thinly sliced' },
      { name: 'Kalamata Olives', amount: 0.5, unit: 'cup', notes: 'pitted' },
      { name: 'Feta Cheese', amount: 200, unit: 'grams', notes: 'cubed' },
      { name: 'Fresh Oregano', amount: 2, unit: 'tablespoons', notes: 'for garnish' }
    ],
    instructions: [
      { stepNumber: 1, description: 'Make the marinade: In a large bowl, combine 1 cup Greek yogurt, juice of 1 lemon, 4 minced garlic cloves, 2 tablespoons olive oil, dried oregano, chopped rosemary, 1 teaspoon salt, and 1/2 teaspoon pepper.' },
      { stepNumber: 2, description: 'Butterfly the chicken breasts to even thickness (about 1/2 inch) by slicing horizontally through the middle. Place between plastic wrap and gently pound if needed.' },
      { stepNumber: 3, description: 'Add chicken to the marinade, ensuring each piece is well-coated. Cover and refrigerate for at least 2 hours, preferably 4-6 hours.' },
      { stepNumber: 4, description: 'Meanwhile, make tzatziki: Grate cucumber and place in a clean kitchen towel. Squeeze out excess moisture. Mix with 1 cup Greek yogurt, 2 minced garlic cloves, dill, a pinch of salt, and a squeeze of lemon juice. Refrigerate until needed.' },
      { stepNumber: 5, description: 'Prepare the Greek salad: Combine tomatoes, cucumber, red onion, and olives. Dress with olive oil, a splash of red wine vinegar, salt, and pepper. Add feta just before serving.' },
      { stepNumber: 6, description: 'Preheat grill to medium-high heat (around 400°F/200°C). Clean and oil the grates well.' },
      { stepNumber: 7, description: 'Remove chicken from marinade, letting excess drip off. Grill for 5-6 minutes per side, or until internal temperature reaches 165°F (74°C).' },
      { stepNumber: 8, description: 'Let chicken rest for 5 minutes before slicing. Serve with tzatziki sauce, Greek salad, and lemon wedges. Garnish with fresh oregano.' }
    ],
    notes: [
      "For best results, let chicken marinate for 4-6 hours, but not longer than 12 hours as the acid can break down the meat too much.",
      "If you don't have a grill, you can use a grill pan or broiler.",
      "To ensure even cooking, pound the chicken breasts to uniform thickness.",
      "For extra flavor, add a pinch of sumac to the marinade or salad.",
      "Make tzatziki at least an hour ahead to allow flavors to meld.",
      "Serve with warm pita bread or rice pilaf if desired."
    ],
    nutritionFacts: {
      protein: 35,
      carbs: 12,
      fat: 28,
      fiber: 3,
      sugar: 4,
      sodium: 520,
    },
  },
  {
    title: 'Vegan Chocolate Energy Balls',
    description: 'Wholesome, no-bake energy balls that combine the natural sweetness of Medjool dates with nutrient-rich nuts, intense dark cocoa, and superfood chia seeds. These protein-packed treats are perfect for a quick energy boost, pre-workout snack, or healthy dessert alternative.',
    cookingTime: 25,
    servings: 15,
    difficulty: 'EASY',
    cuisineType: 'international',
    regionOfOrigin: 'Global',
    imageUrl: '/images/recipes/vegan-chocolate-energy-balls.jpg',
    calories: 120,
    type: 'SNACK',
    isVegetarian: true,
    isVegan: true,
    isGlutenFree: true,
    isDairyFree: true,
    isNutFree: false,
    ingredients: [
      { name: 'Medjool Dates', amount: 12, unit: 'pieces', notes: 'pitted (about 1 cup packed)' },
      { name: 'Raw Almonds', amount: 1, unit: 'cup', notes: 'unsalted' },
      { name: 'Raw Walnuts', amount: 0.5, unit: 'cup', notes: 'unsalted' },
      { name: 'Cocoa Powder', amount: 3, unit: 'tablespoons', notes: 'unsweetened, high-quality' },
      { name: 'Chia Seeds', amount: 2, unit: 'tablespoons' },
      { name: 'Vanilla Extract', amount: 1, unit: 'teaspoon', notes: 'pure' },
      { name: 'Sea Salt', amount: 0.25, unit: 'teaspoon', notes: 'fine' },
      { name: 'Cinnamon', amount: 0.5, unit: 'teaspoon', notes: 'ground' },
      { name: 'Coconut Oil', amount: 1, unit: 'tablespoon', notes: 'melted (if needed for binding)' },
      // For Rolling (optional)
      { name: 'Cocoa Powder', amount: 2, unit: 'tablespoons', notes: 'for rolling' },
      { name: 'Shredded Coconut', amount: 0.25, unit: 'cup', notes: 'unsweetened, for rolling' },
      { name: 'Hemp Seeds', amount: 0.25, unit: 'cup', notes: 'for rolling' }
    ],
    instructions: [
      { stepNumber: 1, description: 'Check dates for pits and remove if necessary. If dates are not soft, soak in warm water for 10 minutes, then drain well and pat dry.' },
      { stepNumber: 2, description: 'In a food processor, combine almonds and walnuts. Process until finely ground but not turned into butter (about 30 seconds).' },
      { stepNumber: 3, description: 'Add pitted dates, cocoa powder, chia seeds, vanilla extract, sea salt, and cinnamon to the food processor. Pulse until the mixture starts to come together and forms a dough-like consistency.' },
      { stepNumber: 4, description: 'Test the mixture by pinching a small amount between your fingers - it should hold together easily. If too dry, add melted coconut oil 1 teaspoon at a time while processing.' },
      { stepNumber: 5, description: 'Using slightly damp hands (to prevent sticking), roll the mixture into balls about 1-inch in diameter (approximately 1 tablespoon each).' },
      { stepNumber: 6, description: 'Optional: Roll balls in cocoa powder, shredded coconut, or hemp seeds for coating.' },
      { stepNumber: 7, description: 'Place the energy balls on a parchment-lined baking sheet and refrigerate for at least 30 minutes to firm up.' },
      { stepNumber: 8, description: 'Transfer to an airtight container, separating layers with parchment paper if stacking.' }
    ],
    notes: [
      "Store in an airtight container in the refrigerator for up to 2 weeks, or freeze for up to 3 months.",
      "For best results, use fresh, soft dates. If your dates are dry, soaking them will help them blend better.",
      "You can substitute almonds and walnuts with other nuts like cashews or pecans.",
      "Add a scoop of your favorite protein powder for extra protein content.",
      "If the mixture is too sticky to roll, refrigerate for 15-20 minutes first.",
      "For a chocolate-orange variation, add the zest of one orange to the mixture."
    ],
    nutritionFacts: {
      protein: 3,
      carbs: 18,
      fat: 7,
      fiber: 3,
      sugar: 12,
      sodium: 2,
    },
  },
  {
    title: 'Keto Cauliflower Mac and Cheese',
    description: 'A creamy, indulgent low-carb version of the classic comfort food, featuring tender cauliflower florets smothered in a rich, cheesy sauce made with three types of cheese. This keto-friendly dish delivers all the satisfaction of traditional mac and cheese while keeping carbs to a minimum.',
    cookingTime: 45,
    servings: 6,
    difficulty: 'MEDIUM',
    cuisineType: 'american',
    regionOfOrigin: 'United States',
    imageUrl: '/images/recipes/keto-cauliflower-mac-and-cheese.jpg',
    calories: 350,
    type: 'DINNER',
    isVegetarian: true,
    isVegan: false,
    isGlutenFree: true,
    isDairyFree: false,
    isNutFree: true,
    ingredients: [
      { name: 'Cauliflower', amount: 2, unit: 'heads', notes: 'cut into small, even-sized florets (about 8 cups)' },
      { name: 'Heavy Cream', amount: 1.5, unit: 'cups' },
      { name: 'Cream Cheese', amount: 8, unit: 'ounces', notes: 'softened, cut into cubes' },
      { name: 'Sharp Cheddar Cheese', amount: 2, unit: 'cups', notes: 'freshly grated, divided' },
      { name: 'Gruyere Cheese', amount: 1, unit: 'cup', notes: 'grated' },
      { name: 'Parmesan Cheese', amount: 0.5, unit: 'cup', notes: 'freshly grated' },
      { name: 'Butter', amount: 2, unit: 'tablespoons', notes: 'unsalted' },
      { name: 'Garlic', amount: 3, unit: 'cloves', notes: 'minced' },
      { name: 'Dijon Mustard', amount: 1, unit: 'teaspoon' },
      { name: 'Garlic Powder', amount: 1, unit: 'teaspoon' },
      { name: 'Onion Powder', amount: 0.5, unit: 'teaspoon' },
      { name: 'Paprika', amount: 0.5, unit: 'teaspoon', notes: 'plus more for garnish' },
      { name: 'Nutmeg', amount: 0.125, unit: 'teaspoon', notes: 'freshly grated (optional)' },
      { name: 'Black Pepper', amount: 0.5, unit: 'teaspoon', notes: 'freshly ground' },
      { name: 'Sea Salt', amount: 1, unit: 'teaspoon' },
      { name: 'Pork Rinds', amount: 0.5, unit: 'cup', notes: 'crushed (optional, for topping)' }
    ],
    instructions: [
      { stepNumber: 1, description: 'Preheat oven to 375°F (190°C). Grease a 9x13 inch baking dish.' },
      { stepNumber: 2, description: 'Bring a large pot of salted water to a boil. Add cauliflower florets and cook for 4-5 minutes until just tender (do not overcook). Drain well in a colander and pat dry with paper towels to remove excess moisture.' },
      { stepNumber: 3, description: 'While cauliflower cooks, start the cheese sauce. In a large saucepan over medium heat, melt butter. Add minced garlic and sauté until fragrant, about 1 minute.' },
      { stepNumber: 4, description: 'Reduce heat to medium-low. Add heavy cream, cream cheese, and spices (garlic powder, onion powder, paprika, nutmeg, salt, and pepper). Whisk until cream cheese is melted and mixture is smooth.' },
      { stepNumber: 5, description: 'Gradually stir in 1½ cups cheddar cheese, all of the gruyere, and parmesan. Whisk until completely melted and sauce is smooth. Stir in Dijon mustard.' },
      { stepNumber: 6, description: 'Add the drained cauliflower to the cheese sauce, gently folding to coat each floret evenly.' },
      { stepNumber: 7, description: 'Transfer the cauliflower mixture to the prepared baking dish. Top with remaining ½ cup cheddar cheese and crushed pork rinds (if using).' },
      { stepNumber: 8, description: 'Bake for 20-25 minutes until bubbly and golden brown on top. Let rest for 5 minutes before serving.' },
      { stepNumber: 9, description: 'Garnish with a sprinkle of paprika and fresh parsley if desired.' }
    ],
    notes: [
      "Don't overcook the cauliflower - it will continue to cook in the oven.",
      "For best results, grate your own cheese rather than using pre-shredded (which contains anti-caking agents).",
      "To prevent a grainy sauce, add cheese gradually and keep heat on medium-low.",
      "Make it ahead: Prepare up to step 7, cover and refrigerate. Add 10 minutes to baking time when cooking from cold.",
      "For extra crunch without pork rinds, try crushed plain pork rinds or almond flour mixed with parmesan.",
      "To reheat leftovers, add a splash of cream and heat gently to prevent separation."
    ],
    nutritionFacts: {
      protein: 18,
      carbs: 8,
      fat: 28,
      fiber: 3,
      sugar: 2,
      sodium: 480,
    },
  },
  {
    title: 'Spicy Pad Thai',
    description: 'An authentic Thai street food favorite featuring rice noodles stir-fried to perfection in a sweet-sour-savory sauce, complemented by crispy tofu, succulent shrimp, crunchy bean sprouts, and roasted peanuts. This version brings the perfect balance of traditional Thai flavors with a spicy kick.',
    cookingTime: 40,
    servings: 4,
    difficulty: 'MEDIUM',
    cuisineType: 'thai',
    regionOfOrigin: 'Thailand',
    imageUrl: '/images/recipes/spicy-pad-thai.jpg',
    calories: 450,
    type: 'DINNER',
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: true,
    isDairyFree: true,
    isNutFree: false,
    ingredients: [
      // Noodles & Proteins
      { name: 'Rice Noodles', amount: 8, unit: 'ounces', notes: 'flat, 1/4-inch wide (pad thai style)' },
      { name: 'Firm Tofu', amount: 8, unit: 'ounces', notes: 'pressed and cut into 1/2-inch cubes' },
      { name: 'Shrimp', amount: 8, unit: 'ounces', notes: 'medium size (21-25 count), peeled and deveined' },
      // Sauce
      { name: 'Tamarind Paste', amount: 3, unit: 'tablespoons', notes: 'or 2 tbsp lime juice + 1 tbsp brown sugar' },
      { name: 'Fish Sauce', amount: 3, unit: 'tablespoons' },
      { name: 'Palm Sugar', amount: 3, unit: 'tablespoons', notes: 'or brown sugar' },
      { name: 'Sriracha Sauce', amount: 2, unit: 'tablespoons', notes: 'adjust to taste' },
      // Aromatics & Vegetables
      { name: 'Garlic', amount: 4, unit: 'cloves', notes: 'minced' },
      { name: 'Shallots', amount: 2, unit: 'medium', notes: 'thinly sliced' },
      { name: 'Bean Sprouts', amount: 2, unit: 'cups', notes: 'fresh' },
      { name: 'Green Onions', amount: 3, unit: 'stalks', notes: 'cut into 2-inch lengths' },
      { name: 'Garlic Chives', amount: 1, unit: 'cup', notes: 'cut into 2-inch lengths (optional)' },
      { name: 'Dried Red Chilies', amount: 2, unit: 'pieces', notes: 'crushed (optional)' },
      // Garnishes
      { name: 'Roasted Peanuts', amount: 0.5, unit: 'cup', notes: 'crushed' },
      { name: 'Lime', amount: 2, unit: 'whole', notes: 'cut into wedges' },
      { name: 'Bean Sprouts', amount: 1, unit: 'cup', notes: 'extra for serving' },
      { name: 'Cilantro', amount: 0.25, unit: 'cup', notes: 'roughly chopped' },
      // Cooking
      { name: 'Vegetable Oil', amount: 3, unit: 'tablespoons', notes: 'for stir-frying' },
      { name: 'Eggs', amount: 2, unit: 'large' }
    ],
    instructions: [
      { stepNumber: 1, description: 'Soak rice noodles in warm water for 30 minutes until pliable but still firm. Drain well and set aside.' },
      { stepNumber: 2, description: 'Meanwhile, press tofu between paper towels with a weight on top for 15 minutes. Cut into cubes and pat dry.' },
      { stepNumber: 3, description: 'Make the sauce: Combine tamarind paste, fish sauce, palm sugar, and sriracha in a small bowl. Stir until sugar dissolves. Taste and adjust seasoning if needed.' },
      { stepNumber: 4, description: 'Heat 1 tablespoon oil in a large wok or skillet over medium-high heat. Add tofu and fry until golden brown on all sides, about 5 minutes. Remove and set aside.' },
      { stepNumber: 5, description: 'In the same wok, add another tablespoon of oil. Add shrimp and cook until just pink, about 2-3 minutes. Remove and set aside.' },
      { stepNumber: 6, description: 'Add remaining oil to the wok. Stir-fry garlic and shallots until fragrant, about 30 seconds. Push to one side of the wok.' },
      { stepNumber: 7, description: 'Crack eggs into the empty side of the wok. Scramble quickly until just set but still wet.' },
      { stepNumber: 8, description: 'Add drained noodles and sauce mixture. Toss everything together, keeping the heat high. Stir-fry until noodles are tender and have absorbed the sauce, about 2-3 minutes.' },
      { stepNumber: 9, description: 'Add back tofu and shrimp, along with bean sprouts, green onions, and garlic chives. Toss for another minute.' },
      { stepNumber: 10, description: 'Remove from heat and stir in half the crushed peanuts. Transfer to serving plates.' },
      { stepNumber: 11, description: 'Garnish with remaining peanuts, extra bean sprouts, cilantro, and lime wedges. Serve immediately.' }
    ],
    notes: [
      "Don't soak the noodles in hot water - they'll become too soft and break during stir-frying.",
      "Have all ingredients prepped and ready before starting to cook - pad thai comes together quickly.",
      "For vegetarian version, omit shrimp and use soy sauce instead of fish sauce.",
      "The key to good pad thai is high heat and quick cooking - don't overcrowd the wok.",
      "Tamarind paste can be found in Asian markets or substituted with lime juice and brown sugar.",
      "Adjust the sriracha amount to control spiciness level."
    ],
    nutritionFacts: {
      protein: 25,
      carbs: 58,
      fat: 15,
      fiber: 4,
      sugar: 8,
      sodium: 850,
    },
  },
  {
    title: 'Butter Chicken',
    description: 'A luxurious North Indian curry featuring tender chicken pieces marinated in yogurt and spices, then simmered in a rich, creamy tomato-based sauce. This restaurant-style Murgh Makhani balances aromatic spices with a subtle sweetness and rich, buttery finish.',
    cookingTime: 60,
    servings: 6,
    difficulty: 'MEDIUM',
    cuisineType: 'indian',
    regionOfOrigin: 'India',
    imageUrl: '/images/recipes/butter-chicken.jpg',
    calories: 550,
    type: 'DINNER',
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: true,
    isDairyFree: false,
    isNutFree: true,
    ingredients: [
      // First Marinade
      { name: 'Chicken Thighs', amount: 2, unit: 'pounds', notes: 'boneless, skinless, cut into 1.5-inch pieces' },
      { name: 'Lemon Juice', amount: 2, unit: 'tablespoons', notes: 'freshly squeezed' },
      { name: 'Red Chili Powder', amount: 1, unit: 'teaspoon', notes: 'Kashmiri chili powder preferred' },
      { name: 'Salt', amount: 1, unit: 'teaspoon' },
      // Second Marinade
      { name: 'Yogurt', amount: 1, unit: 'cup', notes: 'full-fat, whisked' },
      { name: 'Ginger Paste', amount: 2, unit: 'tablespoons', notes: 'freshly made' },
      { name: 'Garlic Paste', amount: 2, unit: 'tablespoons', notes: 'freshly made' },
      { name: 'Garam Masala', amount: 2, unit: 'teaspoons' },
      { name: 'Ground Cumin', amount: 1, unit: 'teaspoon' },
      { name: 'Ground Coriander', amount: 1, unit: 'teaspoon' },
      { name: 'Turmeric Powder', amount: 0.5, unit: 'teaspoon' },
      // Sauce
      { name: 'Butter', amount: 4, unit: 'tablespoons', notes: 'divided' },
      { name: 'Oil', amount: 2, unit: 'tablespoons', notes: 'vegetable or ghee' },
      { name: 'Onions', amount: 2, unit: 'large', notes: 'finely chopped' },
      { name: 'Tomatoes', amount: 6, unit: 'medium', notes: 'pureed, or 2 cups tomato puree' },
      { name: 'Green Chilies', amount: 2, unit: 'pieces', notes: 'slit lengthwise (optional)' },
      { name: 'Kasoori Methi', amount: 2, unit: 'teaspoons', notes: 'dried fenugreek leaves, crushed' },
      { name: 'Heavy Cream', amount: 1, unit: 'cup' },
      { name: 'Sugar', amount: 1, unit: 'teaspoon', notes: 'or to taste' },
      // Garnish
      { name: 'Butter', amount: 1, unit: 'tablespoon', notes: 'for finishing' },
      { name: 'Heavy Cream', amount: 2, unit: 'tablespoons', notes: 'for drizzling' },
      { name: 'Cilantro', amount: 0.25, unit: 'cup', notes: 'chopped' }
    ],
    instructions: [
      { stepNumber: 1, description: 'First marinade: Mix chicken pieces with lemon juice, red chili powder, and salt. Let sit for 15-20 minutes.' },
      { stepNumber: 2, description: 'Second marinade: Add yogurt, ginger paste, garlic paste, and all ground spices. Mix well, cover, and refrigerate for 4-6 hours or overnight.' },
      { stepNumber: 3, description: 'Preheat oven to 400°F (200°C). Arrange marinated chicken on a baking sheet and bake for 15-20 minutes until slightly charred, or grill on high heat.' },
      { stepNumber: 4, description: 'For the sauce: Heat 2 tablespoons butter and oil in a large pot. Add onions and sauté until golden brown, about 8-10 minutes.' },
      { stepNumber: 5, description: 'Add pureed tomatoes and green chilies. Cook on medium heat until oil separates from the sauce and it thickens, about 15-20 minutes.' },
      { stepNumber: 6, description: 'Add garam masala, crushed kasoori methi, and sugar. Stir well.' },
      { stepNumber: 7, description: 'Blend the sauce until smooth using an immersion blender or regular blender. Return to pot.' },
      { stepNumber: 8, description: 'Add grilled chicken pieces and any accumulated juices. Simmer for 5-7 minutes.' },
      { stepNumber: 9, description: 'Stir in heavy cream and remaining 2 tablespoons butter. Simmer for another 3-4 minutes until the sauce is creamy and chicken is fully cooked.' },
      { stepNumber: 10, description: 'Adjust seasoning to taste. Finish with a dollop of butter and a drizzle of cream.' },
      { stepNumber: 11, description: 'Garnish with chopped cilantro and serve hot with naan bread or rice.' }
    ],
    notes: [
      "For best results, use Kashmiri red chili powder which adds color without too much heat.",
      "Don't skip the marination time - it's crucial for tender, flavorful chicken.",
      "If using chicken breast instead of thighs, reduce cooking time slightly to prevent drying.",
      "Kasoori methi (dried fenugreek) gives an authentic flavor - don't skip if possible.",
      "The sauce can be made ahead and frozen. Add cream after reheating.",
      "For a lighter version, replace cream with cashew paste or light cream."
    ],
    nutritionFacts: {
      protein: 32,
      carbs: 12,
      fat: 38,
      fiber: 2,
      sugar: 6,
      sodium: 720,
    },
  },
  {
    title: 'Sushi Roll Platter',
    description: 'A stunning assortment of handcrafted sushi rolls including classic California rolls, spicy tuna rolls, and vegetable rolls. This homemade sushi platter brings restaurant-quality Japanese cuisine to your table, featuring perfectly seasoned rice, fresh seafood, and crisp vegetables.',
    cookingTime: 90,
    servings: 4,
    difficulty: 'HARD',
    cuisineType: 'japanese',
    regionOfOrigin: 'Japan',
    imageUrl: '/images/recipes/sushi-roll-platter.jpg',
    calories: 400,
    type: 'DINNER',
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: false,
    isDairyFree: true,
    isNutFree: true,
    ingredients: [
      // Sushi Rice
      { name: 'Sushi Rice', amount: 2, unit: 'cups', notes: 'short-grain Japanese rice' },
      { name: 'Water', amount: 2.5, unit: 'cups', notes: 'for cooking rice' },
      { name: 'Rice Vinegar', amount: 0.25, unit: 'cup' },
      { name: 'Sugar', amount: 2, unit: 'tablespoons' },
      { name: 'Salt', amount: 1, unit: 'teaspoon' },
      // California Roll
      { name: 'Nori Sheets', amount: 3, unit: 'sheets', notes: 'toasted' },
      { name: 'Imitation Crab Meat', amount: 8, unit: 'ounces', notes: 'or real crab meat' },
      { name: 'Cucumber', amount: 1, unit: 'medium', notes: 'julienned' },
      { name: 'Avocado', amount: 2, unit: 'medium', notes: 'ripe but firm' },
      // Spicy Tuna Roll
      { name: 'Sushi-Grade Tuna', amount: 8, unit: 'ounces', notes: 'fresh, diced' },
      { name: 'Sriracha Sauce', amount: 2, unit: 'tablespoons' },
      { name: 'Mayo', amount: 2, unit: 'tablespoons', notes: 'Japanese mayo preferred' },
      { name: 'Green Onion', amount: 2, unit: 'stalks', notes: 'finely chopped' },
      // Vegetable Roll
      { name: 'Carrots', amount: 1, unit: 'medium', notes: 'julienned' },
      { name: 'Bell Pepper', amount: 1, unit: 'medium', notes: 'julienned' },
      { name: 'Spinach', amount: 1, unit: 'cup', notes: 'fresh' },
      // Additional Items
      { name: 'Sesame Seeds', amount: 3, unit: 'tablespoons', notes: 'toasted' },
      { name: 'Wasabi Paste', amount: 2, unit: 'tablespoons', notes: 'to serve' },
      { name: 'Pickled Ginger', amount: 0.25, unit: 'cup', notes: 'gari, to serve' },
      { name: 'Soy Sauce', amount: 0.5, unit: 'cup', notes: 'for serving' }
    ],
    instructions: [
      { stepNumber: 1, description: 'Rinse sushi rice in cold water until water runs clear. Drain well and combine with 2.5 cups water in a rice cooker or heavy-bottomed pot.' },
      { stepNumber: 2, description: 'If using a pot: Bring to boil, reduce heat, cover, and simmer for 15 minutes. Remove from heat and let stand, covered, for 10 minutes.' },
      { stepNumber: 3, description: 'Meanwhile, combine rice vinegar, sugar, and salt in a small saucepan. Heat until sugar dissolves. Cool to room temperature.' },
      { stepNumber: 4, description: 'Transfer cooked rice to a large wooden or glass bowl. Pour vinegar mixture over rice and fold gently with a rice paddle or wooden spoon, fanning the rice to cool it quickly.' },
      { stepNumber: 5, description: 'For California Rolls: Place a sheet of nori shiny side down on bamboo mat. Spread about 3/4 cup seasoned rice evenly over nori, leaving a 1-inch strip bare at the top edge.' },
      { stepNumber: 6, description: 'Sprinkle rice with sesame seeds. Flip the nori so rice side faces down on the mat. Along the bottom edge, lay crab meat, cucumber strips, and avocado slices.' },
      { stepNumber: 7, description: 'Using the mat, roll firmly away from you, keeping filling in place. Moisten the bare edge of nori with water to seal.' },
      { stepNumber: 8, description: 'For Spicy Tuna Rolls: Mix diced tuna with sriracha and mayo. Spread rice on nori as above, flip, and add tuna mixture and green onions. Roll as directed.' },
      { stepNumber: 9, description: 'For Vegetable Rolls: Spread rice, flip nori, and arrange carrots, peppers, and spinach. Roll as directed.' },
      { stepNumber: 10, description: 'Let rolls rest for 5 minutes before cutting. With a very sharp knife dipped in water, cut each roll into 8 pieces.' },
      { stepNumber: 11, description: 'Arrange sushi pieces on a platter. Garnish with pickled ginger and serve with wasabi and soy sauce.' }
    ],
    notes: [
      "Use slightly warm rice when rolling - it's easier to work with and sticks better.",
      "Keep a bowl of water and clean kitchen towel handy for wiping your knife between cuts.",
      "The bamboo mat should be wrapped in plastic wrap to prevent sticking.",
      "Don't overfill the rolls - less is more for successful rolling.",
      "For best results, use sushi-grade fish from a reliable source.",
      "Rice should be at room temperature before serving."
    ],
    nutritionFacts: {
      protein: 18,
      carbs: 45,
      fat: 12,
      fiber: 4,
      sugar: 2,
      sodium: 380,
    },
  },
  {
    title: 'Vegetable Stir-Fry',
    description: 'A vibrant and healthy Chinese-style stir-fry featuring a colorful medley of fresh vegetables and crispy tofu in a savory-sweet sauce. This quick and versatile dish delivers both nutrition and authentic Asian flavors in under 30 minutes.',
    cookingTime: 25,
    servings: 4,
    difficulty: 'EASY',
    cuisineType: 'chinese',
    regionOfOrigin: 'China',
    imageUrl: '/images/recipes/vegetable-stir-fry.jpg',
    calories: 300,
    type: 'DINNER',
    isVegetarian: true,
    isVegan: true,
    isGlutenFree: true,
    isDairyFree: true,
    isNutFree: true,
    ingredients: [
      // Tofu & Vegetables
      { name: 'Extra-Firm Tofu', amount: 14, unit: 'ounces', notes: 'pressed and cubed' },
      { name: 'Broccoli Florets', amount: 2, unit: 'cups', notes: 'cut into bite-sized pieces' },
      { name: 'Carrots', amount: 2, unit: 'medium', notes: 'diagonal sliced' },
      { name: 'Snow Peas', amount: 1, unit: 'cup', notes: 'trimmed' },
      { name: 'Bell Peppers', amount: 2, unit: 'medium', notes: 'assorted colors, sliced' },
      { name: 'Baby Corn', amount: 1, unit: 'cup', notes: 'halved lengthwise' },
      { name: 'Mushrooms', amount: 8, unit: 'ounces', notes: 'sliced' },
      { name: 'Bean Sprouts', amount: 1, unit: 'cup', notes: 'fresh' },
      { name: 'Water Chestnuts', amount: 8, unit: 'ounces', notes: 'sliced, drained' },
      // Aromatics
      { name: 'Garlic', amount: 4, unit: 'cloves', notes: 'minced' },
      { name: 'Ginger', amount: 2, unit: 'tablespoons', notes: 'fresh, minced' },
      { name: 'Green Onions', amount: 4, unit: 'stalks', notes: '2 chopped, 2 for garnish' },
      // Sauce
      { name: 'Soy Sauce', amount: 3, unit: 'tablespoons', notes: 'low-sodium' },
      { name: 'Vegetable Broth', amount: 0.25, unit: 'cup' },
      { name: 'Rice Vinegar', amount: 1, unit: 'tablespoon' },
      { name: 'Sesame Oil', amount: 1, unit: 'teaspoon' },
      { name: 'Cornstarch', amount: 1, unit: 'tablespoon' },
      { name: 'Brown Sugar', amount: 1, unit: 'teaspoon' },
      { name: 'White Pepper', amount: 0.25, unit: 'teaspoon', notes: 'or black pepper' },
      // Cooking
      { name: 'Vegetable Oil', amount: 3, unit: 'tablespoons', notes: 'divided' },
      { name: 'Sesame Seeds', amount: 1, unit: 'tablespoon', notes: 'toasted, for garnish' }
    ],
    instructions: [
      { stepNumber: 1, description: 'Press tofu between paper towels with a weight on top for 15-20 minutes. Cut into 1-inch cubes and pat dry thoroughly.' },
      { stepNumber: 2, description: 'Prepare the sauce: In a small bowl, whisk together vegetable broth, soy sauce, rice vinegar, sesame oil, cornstarch, brown sugar, and white pepper until smooth. Set aside.' },
      { stepNumber: 3, description: 'Heat 2 tablespoons oil in a large wok or skillet over medium-high heat. Add tofu cubes and fry until golden brown on all sides, about 5-7 minutes. Remove and set aside.' },
      { stepNumber: 4, description: 'In the same wok, add remaining oil. Stir-fry garlic, ginger, and white parts of green onions until fragrant, about 30 seconds.' },
      { stepNumber: 5, description: 'Add harder vegetables first (carrots, broccoli) and stir-fry for 2 minutes. Add bell peppers, baby corn, and mushrooms, cooking for another 2 minutes.' },
      { stepNumber: 6, description: 'Add snow peas and water chestnuts. Stir-fry for 1 minute until vegetables are crisp-tender.' },
      { stepNumber: 7, description: 'Give the sauce mixture a quick stir and add to the wok. Cook, stirring constantly, until sauce thickens, about 1-2 minutes.' },
      { stepNumber: 8, description: 'Return tofu to the wok and add bean sprouts. Toss gently to combine and heat through.' },
      { stepNumber: 9, description: 'Garnish with sesame seeds and remaining green onions. Serve hot over rice or noodles.' }
    ],
    notes: [
      "For crispier tofu, coat cubes in cornstarch before frying.",
      "Keep vegetables crisp-tender - don't overcook them.",
      "Cut vegetables in similar sizes for even cooking.",
      "Substitute or add vegetables based on what's in season.",
      "For extra protein, add tempeh or seitan.",
      "The sauce can be made ahead and stored in the refrigerator."
    ],
    nutritionFacts: {
      protein: 15,
      carbs: 25,
      fat: 12,
      fiber: 6,
      sugar: 8,
      sodium: 600,
    },
  },
  {
    title: "Full English Breakfast",
    description: "A robust and indulgent morning feast featuring eggs, bacon, sausages, baked beans, tomatoes, mushrooms, and toast. A quintessential British start to the day.",
    cookingTime: 30,
    servings: 2,
    difficulty: "EASY",
    cuisineType: "British",
    regionOfOrigin: "England",
    imageUrl: "https://unpeeledjournal.com/wp-content/uploads/2023/04/52828009702_809417b444_b.jpg",
    calories: 800,
    type: "BREAKFAST",
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: false,
    isDairyFree: false,
    isNutFree: true,
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
      "Keep the fried eggs runny for dipping the toast."
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
    cuisineType: "British",
    regionOfOrigin: "England",
    imageUrl: "https://realfood.tesco.com/media/images/Fish-parsnip-chips-mushy-peas-recipe-1400x919-6be59267-426e-46e6-8e14-8678222acfbd-0-1400x919.jpg",
    calories: 900,
    type: "MAIN",
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: false,
    isDairyFree: false,
    isNutFree: true,
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
      "Double-frying the chips ensures they are extra crispy."
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
    cuisineType: "British",
    regionOfOrigin: "England",
    imageUrl: "https://images.services.kitchenstories.io/UeP1liDnJU3zMQIYEQcW2yiNwKo=/1920x0/filters:quality(85)/images.kitchenstories.io/wagtailOriginalImages/R152-cozy_shepherds_pie_title.jpg",
    calories: 600,
    type: "MAIN",
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: true,
    isDairyFree: false,
    isNutFree: true,
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
      "Make ahead and refrigerate before baking for an easy weeknight meal."
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
    cuisineType: 'algerian',
    regionOfOrigin: 'Algeria',
    imageUrl: 'https://theafrikanstore.com/cdn/shop/articles/M_hadjeb-djoudjousemetauxfourneaux_720x@2x.webp?v=1693943087',
    calories: 300,
    type: 'SNACK',
    isVegetarian: true,
    isVegan: true,
    isGlutenFree: false,
    isDairyFree: true,
    isNutFree: true,
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
    cuisineType: 'west-african',
    regionOfOrigin: 'Angola',
    imageUrl: 'https://jesseatsandtravels.com/wp-content/uploads/2018/03/africanpeanutstew.jpg',
    calories: 400,
    type: 'MAIN',
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: true,
    isDairyFree: true,
    isNutFree: true,
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
    cuisineType: "palestinian",
    regionOfOrigin: "Palestine",
    imageUrl: "https://palestineinadish.com/wp-content/uploads/2024/06/maftoul-main-photo-1B-scaled.jpg",
    calories: 450,
    type: "MAIN",
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: false,
    isDairyFree: true,
    isNutFree: true,
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
    cuisineType: 'British',
    regionOfOrigin: 'England',
    imageUrl: 'https://grillmomma.com/wp-content/uploads/2020/12/IMG_1986_jpg-3-1536x2048.jpg',
    calories: 850,
    type: 'MAIN',
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: false,
    isDairyFree: false,
    isNutFree: true,
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
      "For a vegetarian version, replace the beef with a portobello mushroom or a block of firm tofu."
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
    cuisineType: 'British',
    regionOfOrigin: 'England',
    imageUrl: 'https://www.daringgourmet.com/wp-content/uploads/2021/09/Toad-in-the-Hole-2.jpg',
    calories: 600,
    type: 'MAIN',
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: false,
    isDairyFree: false,
    isNutFree: true,
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
      "Ensure the oil is very hot before adding the batter to achieve a crispy rise."
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
    cuisineType: 'British',
    regionOfOrigin: 'England',
    imageUrl: 'https://static.wixstatic.com/media/513e77_12a3da937cb048b2b0bc58c869ede227~mv2.jpg/v1/fill/w_1024,h_1024,al_c,q_85,enc_avif,quality_auto/513e77_12a3da937cb048b2b0bc58c869ede227~mv2.jpg',
    calories: 180,
    type: 'SIDE',
    isVegetarian: true,
    isVegan: false,
    isGlutenFree: false,
    isDairyFree: false,
    isNutFree: true,
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
      "For best results, ensure all ingredients are at room temperature before mixing."
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
    cuisineType: 'British',
    regionOfOrigin: 'England',
    imageUrl: 'https://www.gimmesomeoven.com/wp-content/uploads/2024/12/Bangers-and-Mash-Recipe-10.jpg',
    calories: 650,
    type: 'MAIN',
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: false,
    isDairyFree: false,
    isNutFree: true,
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
      "The gravy can be made ahead and reheated."
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
    cuisineType: 'British',
    regionOfOrigin: 'England',
    imageUrl: 'https://ichef.bbci.co.uk/food/ic/food_16x9_1600/recipes/classiccottagepie_90765_16x9.jpg',
    calories: 550,
    type: 'MAIN',
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: true,
    isDairyFree: false,
    isNutFree: true,
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
      "Leftovers can be frozen for up to 3 months."
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
    cuisineType: 'British',
    regionOfOrigin: 'England',
    imageUrl: 'https://www.bhg.com/thmb/2zh1pCQZBXNXMskszzSU5uT9Jms=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/GettyImages-867459154-4515130cb9634951bca5aece99470469.jpg',
    calories: 850,
    type: 'MAIN',
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: false,
    isDairyFree: false,
    isNutFree: true,
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
      "Make Yorkshire puddings while the meat is resting."
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
    cuisineType: 'British',
    regionOfOrigin: 'England',
    imageUrl: 'https://recipes-nz.b-cdn.net/9f29d4d1082c8b2385e00ba4a9e706f9ede16409-1920x1080.jpg?auto=format&fit=max&q=75&w=1920',
    calories: 650,
    type: 'MAIN',
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: false,
    isDairyFree: false,
    isNutFree: true,
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
      "Ensure the filling is completely cool before adding pastry to prevent a soggy bottom."
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
    cuisineType: 'spanish',
    regionOfOrigin: 'Spain',
    imageUrl: 'https://www.aheadofthyme.com/wp-content/uploads/2024/06/spanish-tortilla.jpg',
    calories: 320,
    type: 'MAIN',
    isVegetarian: true,
    isVegan: false,
    isGlutenFree: true,
    isDairyFree: true,
    isNutFree: true,
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
      "Some regions of Spain add other ingredients like peppers or chorizo."
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
    cuisineType: 'spanish',
    regionOfOrigin: 'Madrid',
    imageUrl: 'https://www.thespruceeats.com/thmb/j5H9mxvF4x-4kMwFk_Kfh3MAsjA=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/SES-madrilene-stew-recipe-3083331-overhead-71c2b5c9380346c18952e0c966b0239e.jpg',
    calories: 750,
    type: 'MAIN',
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: true,
    isDairyFree: true,
    isNutFree: true,
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
      "Some regions add different vegetables or meats to their version."
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
    cuisineType: 'spanish',
    regionOfOrigin: 'Asturias',
    imageUrl: 'https://somersetfoodie.com/cdn/shop/articles/Somerset-Foodie-Spanish-Fabada-Recipe_1600x.jpg?v=1697472148',
    calories: 680,
    type: 'MAIN',
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: true,
    isDairyFree: true,
    isNutFree: true,
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
      "Traditional accompaniment is Asturian cider."
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
    cuisineType: 'spanish',
    regionOfOrigin: 'Andalusia',
    imageUrl: 'https://www.acouplecooks.com/wp-content/uploads/2021/07/Gazpacho-002.jpg',
    calories: 120,
    type: 'MAIN',
    isVegetarian: true,
    isVegan: true,
    isGlutenFree: true,
    isDairyFree: true,
    isNutFree: true,
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
      "The bread helps create a smoother texture but can be omitted for a lighter version."
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
    cuisineType: 'spanish',
    regionOfOrigin: 'Galicia',
    imageUrl: 'https://www.thespruceeats.com/thmb/dNhV7geaxPjY4ZiStdo8-LZkesU=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/galician-style-octopus-recipe-3083727-hero-01-9f2e6c31debb4cf093054bfe077be40e.jpg',
    calories: 280,
    type: 'MAIN',
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: true,
    isDairyFree: true,
    isNutFree: true,
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
      "In Galicia, this is typically served on wooden plates."
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
    cuisineType: 'spanish',
    regionOfOrigin: 'Spain',
    imageUrl: 'https://assets.bonappetit.com/photos/58ff5f162278cd3dbd2c069c/1:1/w_2240,c_limit/churros.jpg',
    calories: 420,
    type: 'DESSERT',
    isVegetarian: true,
    isVegan: false,
    isGlutenFree: false,
    isDairyFree: false,
    isNutFree: true,
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
      "Some regions serve them plain without sugar coating."
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
    cuisineType: 'spanish',
    regionOfOrigin: 'La Mancha',
    imageUrl: 'https://oliveoilsfromspain.org/wp-content/uploads/2021/03/pisto-recipe.jpg',
    calories: 180,
    type: 'MAIN',
    isVegetarian: true,
    isVegan: true,
    isGlutenFree: true,
    isDairyFree: true,
    isNutFree: true,
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
      "Can be used as a filling for empanadas or served with rice."
    ],
    nutritionFacts: {
      protein: 6,
      carbs: 18,
      fat: 12,
      fiber: 5,
      sugar: 8,
      sodium: 320
    }
  }
];