// rewrite the RECIPENAME recipe

// - keep everything exactly the same unless specifically instructed to change it
// without sacrificing the genuine need to separate Steps, try and reduce the number of instruction steps to the minimum required
// - ensure each ingredient is mentioned in the instructions at some point
// - don't add extra signs like ** to highlight recipes
// - add an imageurl key to the instructions array in the following format  "imageUrl": "/recipe_step_images/‘recipe_name’/‘instruction_step_number’.png  <<replace ‘recipe_name’ and ‘instruction_step_number’ with an actual recipe name and number i.e. ‘Full_English_Breakfast’ and ‘1’
// - create a dietaryNotes array from the fermentation, lowfodmap, key nutrients, and anti inflammatory information like the example below

//  "notes": [
//       "Ensure all vegetables like Tomato, Cucumber, and Avocado are fresh.",
//       "Chopped Parsley adds brightness to the final dish.",
//       "Adjust seasoning (Sea Salt, Black Pepper) to your preference.",
//       "If using frozen Sweetcorn, thaw it first.",
//       "The amount of Warm Water needed for the dressing may vary based on tahini consistency.",
//       "Make sure Garlic is finely minced for the dressing."
//     ],
// "dietaryNotes": {
//   "fermentationInfo": "Contains Miso Paste, a traditional Japanese seasoning produced by fermenting soybeans with salt and kōji (a fungus, Aspergillus oryzae) and sometimes rice, barley, or other ingredients.",
//   "fodmapInfo": "High-FODMAP ingredients include Shiitake Mushrooms (mannitol) and Soft/Silken Tofu (fructans/GOS). Low-FODMAP ingredients include Kombu, Wakame, Green Onions (green parts only), and Dashi (check instant versions for additives like onion/garlic powder). Miso paste is low FODMAP in servings up to 2 tablespoons.",
//   "fodmapModificationTips": "Use firm or extra-firm tofu instead of soft/silken. Use only the green parts of the green onions. Omit shiitake mushrooms or limit intake to a very small amount (e.g., 1-2 slices per serving). Ensure dashi is homemade or certified low FODMAP.",
//   "keyNutrients": "Miso paste offers manganese, vitamin K, copper, and zinc. Tofu is a good source of calcium, manganese, selenium, protein, and iron. Wakame seaweed provides iodine, manganese, folate (B9), and magnesium. Kombu is rich in iodine and calcium. Shiitake mushrooms contain selenium, copper, zinc, and vitamin B5 (pantothenic acid). Green onions contribute vitamin K and vitamin C.",
//   "antiInflammatory": "Several ingredients possess anti-inflammatory potential. Miso paste (fermented, isoflavones) and the probiotics it may contain support gut health. Seaweeds like Wakame and Kombu provide unique antioxidants (e.g., fucoxanthin). Shiitake mushrooms offer immune-modulating polysaccharides and antioxidants like selenium. Tofu adds isoflavones, and Green Onions contribute antioxidants like quercetin and vitamin C. The combination of these ingredients provides minerals and compounds that support overall immune function and antioxidant systems."
// },









// IGNORE THE BELOW

// rewrite this recipe according to the rules in the recipe_rewrite.ts file

// give me the result as a json so I can copy it
