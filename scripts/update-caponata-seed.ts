import * as fs from 'fs';
import * as path from 'path';

async function main() {
  console.log('Updating Caponata image in seed data file...');

  // Path to the recipes seed data file
  const seedDataPath = path.join(process.cwd(), 'prisma', 'seed-data', 'recipes.ts');
  
  // Read the seed data file
  let seedData = fs.readFileSync(seedDataPath, 'utf8');

  // Find the Caponata recipe section
  const recipeIndex = seedData.indexOf("title: 'Caponata'");
  
  if (recipeIndex !== -1) {
    // Find the imageUrl line within the Caponata recipe section
    const searchStartIndex = recipeIndex;
    const searchEndIndex = seedData.indexOf("ingredients:", searchStartIndex);
    
    if (searchEndIndex !== -1) {
      // Extract the recipe section to modify
      const recipeSection = seedData.substring(searchStartIndex, searchEndIndex);
      
      // Replace the imageUrl within this section
      const updatedSection = recipeSection.replace(
        /imageUrl: ['"].*?['"]/,
        "imageUrl: '/images/recipes/caponata.jpg'"
      );
      
      // Replace the section in the full file content
      seedData = seedData.substring(0, searchStartIndex) + 
                updatedSection + 
                seedData.substring(searchEndIndex);
      
      // Write the updated content back to the file
      fs.writeFileSync(seedDataPath, seedData, 'utf8');
      
      console.log('✅ Updated Caponata image URL in seed data file');
    } else {
      console.log('❌ Could not find imageUrl section for Caponata in seed data');
    }
  } else {
    console.log('❌ Could not find Caponata recipe in seed data file');
  }
}

main().catch(console.error);