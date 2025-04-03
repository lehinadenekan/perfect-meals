import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Check recipes marked as fermented
  const fermentedRecipes = await prisma.recipe.count({
    where: { isFermented: true }
  });
  console.log('Recipes marked as fermented:', fermentedRecipes);

  // Check recipes with fermented ingredients
  const recipesWithFermentedIngredients = await prisma.recipe.count({
    where: {
      ingredients: {
        some: { isFermented: true }
      }
    }
  });
  console.log('\nRecipes with fermented ingredients:', recipesWithFermentedIngredients);

  // Get detailed info about recipes with fermented ingredients
  const detailedFermentedRecipes = await prisma.recipe.findMany({
    where: {
      OR: [
        { isFermented: true },
        { ingredients: { some: { isFermented: true } } }
      ]
    },
    include: {
      ingredients: {
        where: { isFermented: true }
      }
    }
  });

  console.log('\nDetailed fermented recipe information:');
  detailedFermentedRecipes.forEach(recipe => {
    console.log(`\n${recipe.title}:`);
    console.log(`- Recipe fermented flag: ${recipe.isFermented}`);
    console.log('- Fermented ingredients:');
    recipe.ingredients.forEach(ing => {
      console.log(`  * ${ing.name} (${ing.amount} ${ing.unit})`);
    });
  });
  console.log('\nTotal recipes with any fermentation:', detailedFermentedRecipes.length);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect()); 