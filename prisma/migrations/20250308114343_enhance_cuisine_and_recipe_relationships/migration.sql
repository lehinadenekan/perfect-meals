-- AlterTable
ALTER TABLE "Cuisine" ALTER COLUMN "commonIngredients" DROP DEFAULT,
ALTER COLUMN "cookingMethods" DROP DEFAULT,
ALTER COLUMN "dietaryConsiderations" DROP DEFAULT,
ALTER COLUMN "mealTypes" DROP DEFAULT,
ALTER COLUMN "spiceProfile" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Recipe" ALTER COLUMN "cookingMethods" DROP DEFAULT;
