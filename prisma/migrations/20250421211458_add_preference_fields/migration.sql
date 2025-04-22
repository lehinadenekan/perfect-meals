-- AlterTable
ALTER TABLE "UserPreference" ADD COLUMN     "cookingStyles" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "mealCategories" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "regions" TEXT[] DEFAULT ARRAY[]::TEXT[];
