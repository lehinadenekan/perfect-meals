import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Seed Standard Ingredients
  const standardIngredients = [
    { name: 'Rice', category: 'Grains' },
    { name: 'Wheat Flour', category: 'Grains' },
    { name: 'Peanuts', category: 'Nuts' },
    { name: 'Milk', category: 'Dairy' },
    { name: 'Eggs', category: 'Protein' },
    { name: 'Soy', category: 'Legumes' },
    { name: 'Shellfish', category: 'Seafood' },
    { name: 'Fish', category: 'Seafood' },
    { name: 'Tree Nuts', category: 'Nuts' },
    { name: 'Wheat', category: 'Grains' },
  ];

  for (const ingredient of standardIngredients) {
    await prisma.standardIngredient.upsert({
      where: { name: ingredient.name },
      update: {},
      create: ingredient,
    });
  }

  // Seed Cuisines
  const cuisines = [
    { name: 'Japanese', region: 'East Asia' },
    { name: 'Chinese', region: 'East Asia' },
    { name: 'Italian', region: 'Europe' },
    { name: 'French', region: 'Europe' },
    { name: 'Mexican', region: 'North America' },
    { name: 'Indian', region: 'South Asia' },
    { name: 'Thai', region: 'Southeast Asia' },
    { name: 'Nigerian', region: 'West Africa' },
    { name: 'Ethiopian', region: 'East Africa' },
    { name: 'Brazilian', region: 'South America' },
  ];

  for (const cuisine of cuisines) {
    await prisma.cuisine.upsert({
      where: { name: cuisine.name },
      update: {},
      create: cuisine,
    });
  }

  // Seed Categories
  const categories = [
    'Breakfast',
    'Lunch',
    'Dinner',
    'Appetizer',
    'Main Course',
    'Dessert',
    'Snack',
    'Beverage',
    'Side Dish',
    'Soup',
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { name: category },
      update: {},
      create: { name: category },
    });
  }

  // Seed Tags
  const tags = [
    'Quick & Easy',
    'Healthy',
    'Budget-Friendly',
    'Spicy',
    'Kid-Friendly',
    'Party',
    'Comfort Food',
    'Low Calorie',
    'High Protein',
    'One Pot',
  ];

  for (const tag of tags) {
    await prisma.tag.upsert({
      where: { name: tag },
      update: {},
      create: { name: tag },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 