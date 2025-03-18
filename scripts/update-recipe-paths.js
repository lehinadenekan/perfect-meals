const fs = require('fs');
const path = require('path');

// Path to the recipes file
const recipesFilePath = path.join(process.cwd(), 'prisma', 'seed-data', 'recipes.ts');

// Read the recipes file
let recipesContent = fs.readFileSync(recipesFilePath, 'utf8');

// Define the range we need to process (from line 4170 to 5896)
const recipeTitles = [
  'Akara',
  'Amala with Ewedu and Gbegiri',
  'Attiéké with Grilled Fish',
  'Beef Tehari',
  'Bissap/Zobo (Hibiscus Tea)',
  'Açaí Bowl',
  'Chitol Macher Muitha',
  'Eba with Okra Soup',
  'Ghanaian Kelewele',
  'Hilsa Fish Curry',
  'Horiatiki Greek Salad',
  'Korean Bibimbap',
  'Lebanese Fattoush Salad',
  'Liberian Rice Bread',
  'Mafe (Peanut Stew)',
  'Chilaquiles',
  'Moin Moin with Pap',
  'Lamb Tagine with Apricots',
  'Ofada Rice with Ayamase Sauce',
  'Panta Bhat',
  'Yassa Poulet',
  'Shorshe Bata Maach',
  'Paella',
  'Croissants',
  'Vegan Ramen',
  'Pho'
];

// Current image paths without prefix
const imagePatterns = [
  'akara.jpg',
  'amala-ewedu-gbegiri.jpg',
  'attieke-with-grilled-fish.jpg',
  'beef-tehari.jpg',
  'bissap-zobo-hibiscus-tea.jpg',
  'brazilian-acai-bowl.jpg',
  'chitol-macher-muitha.jpg',
  'eba-okra.jpg',
  'ghanaian-kelewele.jpg',
  'hilsa-fish-curry.jpg',
  'horiatiki-greek-salad.jpg',
  'korean-bibimbap.jpg',
  'lebanese-fattoush.jpg',
  'liberian-rice-bread.jpg',
  'mafe-peanut-stew.jpg',
  'mexican-chilaquiles.jpg',
  'moinmoin-pap.jpg',
  'moroccan-tagine.jpg',
  'ofada-ayamase.jpg',
  'panta-bhat.jpg',
  'senegalese-yassa-poulet.jpg',
  'shorshe-bata-maach.jpg',
  'spanish-paella.jpg',
  'traditional-french-croissants.jpg',
  'vegan-ramen.jpg',
  'vietnamese-pho.jpg'
];

// Update each image path with the correct prefix
imagePatterns.forEach(imagePath => {
  const oldPattern = `"imageUrl": "${imagePath}"`;
  const newPattern = `"imageUrl": "/images/recipes/${imagePath}"`;
  recipesContent = recipesContent.replace(oldPattern, newPattern);
});

// Write the updated content back to the file
fs.writeFileSync(recipesFilePath, recipesContent, 'utf8');

console.log('Successfully updated image paths for recipes.'); 