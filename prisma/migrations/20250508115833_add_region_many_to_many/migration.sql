/*
  Warnings:

  - You are about to drop the column `continent` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `cookingTime` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `notes` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `regionOfOrigin` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `search_vector` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the `_CuisineRecipes` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[nutritionFactsId]` on the table `Recipe` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[dietaryNotesId]` on the table `Recipe` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "RegionType" AS ENUM ('COUNTRY', 'SUB_REGION', 'CONTINENT');

-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropForeignKey
ALTER TABLE "Album" DROP CONSTRAINT "Album_userId_fkey";

-- DropForeignKey
ALTER TABLE "Cuisine" DROP CONSTRAINT "Cuisine_parentCuisineId_fkey";

-- DropForeignKey
ALTER TABLE "CustomFoodEntry" DROP CONSTRAINT "CustomFoodEntry_userId_fkey";

-- DropForeignKey
ALTER TABLE "DietaryFeedback" DROP CONSTRAINT "DietaryFeedback_recipeId_fkey";

-- DropForeignKey
ALTER TABLE "DietaryNotes" DROP CONSTRAINT "DietaryNotes_recipeId_fkey";

-- DropForeignKey
ALTER TABLE "Ingredient" DROP CONSTRAINT "Ingredient_recipeId_fkey";

-- DropForeignKey
ALTER TABLE "Instruction" DROP CONSTRAINT "Instruction_recipeId_fkey";

-- DropForeignKey
ALTER TABLE "NutritionFacts" DROP CONSTRAINT "NutritionFacts_recipeId_fkey";

-- DropForeignKey
ALTER TABLE "PlannerDay" DROP CONSTRAINT "PlannerDay_userId_fkey";

-- DropForeignKey
ALTER TABLE "PlannerMeal" DROP CONSTRAINT "PlannerMeal_customFoodEntryId_fkey";

-- DropForeignKey
ALTER TABLE "PlannerMeal" DROP CONSTRAINT "PlannerMeal_plannerDayId_fkey";

-- DropForeignKey
ALTER TABLE "PlannerMeal" DROP CONSTRAINT "PlannerMeal_recipeId_fkey";

-- DropForeignKey
ALTER TABLE "Recipe" DROP CONSTRAINT "Recipe_authorId_fkey";

-- DropForeignKey
ALTER TABLE "RecipeToAlbum" DROP CONSTRAINT "RecipeToAlbum_albumId_fkey";

-- DropForeignKey
ALTER TABLE "RecipeToAlbum" DROP CONSTRAINT "RecipeToAlbum_recipeId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_recipeId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserAllergy" DROP CONSTRAINT "UserAllergy_ingredientId_fkey";

-- DropForeignKey
ALTER TABLE "UserAllergy" DROP CONSTRAINT "UserAllergy_userEmail_fkey";

-- DropForeignKey
ALTER TABLE "UserCuisinePreference" DROP CONSTRAINT "UserCuisinePreference_cuisineId_fkey";

-- DropForeignKey
ALTER TABLE "UserCuisinePreference" DROP CONSTRAINT "UserCuisinePreference_userEmail_fkey";

-- DropForeignKey
ALTER TABLE "UserPreference" DROP CONSTRAINT "UserPreference_userEmail_fkey";

-- DropForeignKey
ALTER TABLE "UserRecipeHistory" DROP CONSTRAINT "UserRecipeHistory_recipeId_fkey";

-- DropForeignKey
ALTER TABLE "UserRecipeHistory" DROP CONSTRAINT "UserRecipeHistory_userEmail_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToRecipe" DROP CONSTRAINT "_CategoryToRecipe_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToRecipe" DROP CONSTRAINT "_CategoryToRecipe_B_fkey";

-- DropForeignKey
ALTER TABLE "_CuisineRecipes" DROP CONSTRAINT "_CuisineRecipes_A_fkey";

-- DropForeignKey
ALTER TABLE "_CuisineRecipes" DROP CONSTRAINT "_CuisineRecipes_B_fkey";

-- DropForeignKey
ALTER TABLE "_SavedRecipes" DROP CONSTRAINT "_SavedRecipes_A_fkey";

-- DropForeignKey
ALTER TABLE "_SavedRecipes" DROP CONSTRAINT "_SavedRecipes_B_fkey";

-- DropIndex
DROP INDEX "Recipe_authorId_idx";

-- DropIndex
DROP INDEX "Recipe_search_vector_idx";

-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "continent",
DROP COLUMN "cookingTime",
DROP COLUMN "notes",
DROP COLUMN "regionOfOrigin",
DROP COLUMN "search_vector",
ADD COLUMN     "carbs" INTEGER,
ADD COLUMN     "cookTime" TEXT,
ADD COLUMN     "cuisineId" TEXT,
ADD COLUMN     "dietaryNotesId" TEXT,
ADD COLUMN     "fat" INTEGER,
ADD COLUMN     "isDairyFree" BOOLEAN,
ADD COLUMN     "isPublic" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "isSpicy" BOOLEAN,
ADD COLUMN     "mealCategories" TEXT[],
ADD COLUMN     "nutritionFactsId" TEXT,
ADD COLUMN     "prepTime" TEXT,
ADD COLUMN     "protein" INTEGER,
ADD COLUMN     "totalTime" TEXT,
ADD COLUMN     "type" TEXT,
ALTER COLUMN "servings" SET DATA TYPE TEXT,
ALTER COLUMN "isVegetarian" DROP DEFAULT,
ALTER COLUMN "isVegan" DROP DEFAULT,
ALTER COLUMN "isGlutenFree" DROP DEFAULT,
ALTER COLUMN "isNutFree" DROP DEFAULT,
ALTER COLUMN "isFermented" DROP DEFAULT,
ALTER COLUMN "isLactoseFree" DROP DEFAULT,
ALTER COLUMN "isLowFodmap" DROP DEFAULT,
ALTER COLUMN "isPescatarian" DROP DEFAULT,
ALTER COLUMN "cookingStyles" DROP DEFAULT;

-- DropTable
DROP TABLE "_CuisineRecipes";

-- CreateTable
CREATE TABLE "Region" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "continent" TEXT,
    "type" "RegionType",

    CONSTRAINT "Region_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "_RecipeRegions" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_RecipeRegions_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Region_name_key" ON "Region"("name");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE INDEX "_RecipeRegions_B_index" ON "_RecipeRegions"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Recipe_nutritionFactsId_key" ON "Recipe"("nutritionFactsId");

-- CreateIndex
CREATE UNIQUE INDEX "Recipe_dietaryNotesId_key" ON "Recipe"("dietaryNotesId");
