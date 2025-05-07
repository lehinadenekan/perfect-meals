import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Define the old and new category names
const oldCategoryName = 'FOOD'; 
const newCategoryName = 'Main'; // Use title case to match expected Category name

async function main() {
  console.log(`Starting meal category migration: Renaming '${oldCategoryName}' to '${newCategoryName}'...`);

  // 1. Find the category to rename
  const categoryToRename = await prisma.category.findUnique({
    where: { name: oldCategoryName },
  });

  if (categoryToRename) {
    console.log(`Found category '${oldCategoryName}' (ID: ${categoryToRename.id}). Renaming to '${newCategoryName}'...`);
    try {
      await prisma.category.update({
        where: { id: categoryToRename.id },
        data: { name: newCategoryName },
      });
      console.log(`Successfully renamed category to '${newCategoryName}'.`);
    } catch (error) {
      console.error(`Error renaming category '${oldCategoryName}':`, error);
      // Check if 'Main' already exists (potential issue if script run multiple times)
      const mainExists = await prisma.category.findUnique({ where: { name: newCategoryName } });
      if (mainExists) {
        console.warn(`Category '${newCategoryName}' already exists. Proceeding with UserPreference update.`);
      } else {
        // If renaming failed for another reason, stop
        throw error; 
      }
    }
  } else {
    console.log(`Category '${oldCategoryName}' not found. Checking if '${newCategoryName}' already exists...`);
    // Ensure 'Main' exists if 'FOOD' wasn't found (maybe script already ran partially)
    const mainCategory = await prisma.category.findUnique({ where: { name: newCategoryName } });
    if (!mainCategory) {
       console.log(`Creating category '${newCategoryName}'...`);
       await prisma.category.create({ data: { name: newCategoryName } });
    } else {
       console.log(`Category '${newCategoryName}' already exists.`);
    }
  }

  // 2. Update UserPreferences
  console.log(`Updating UserPreference mealCategories arrays (replacing '${oldCategoryName}' with '${newCategoryName}')...`);
  const userPreferencesToUpdate = await prisma.userPreference.findMany({
    where: {
      mealCategories: {
        has: oldCategoryName, // Find prefs that have the old category name
      },
    },
  });

  console.log(`Found ${userPreferencesToUpdate.length} user preferences to potentially update.`);
  let prefsUpdatedCount = 0;

  for (const pref of userPreferencesToUpdate) {
    const currentCategories = pref.mealCategories;
    // Replace old name with new name, keep others, ensure uniqueness
    const finalCategories = Array.from(new Set(currentCategories.map(c => c === oldCategoryName ? newCategoryName : c)));

    try {
      await prisma.userPreference.update({
        where: { id: pref.id },
        data: {
          mealCategories: finalCategories,
        },
      });
      prefsUpdatedCount++;
    } catch (error) {
      console.error(`Failed to update user preference ${pref.id}:`, error);
    }
  }
  console.log(`Finished updating ${prefsUpdatedCount} user preferences.`);

  console.log('Meal category rename migration finished.');
}

main()
  .catch((e) => {
    console.error('Error during migration script:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 