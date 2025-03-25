/*
  Warnings:

  - You are about to drop the column `authenticity` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `averageRating` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `calories` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `cookingMethods` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `cuisineId` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `hasFeatureFermented` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `hasFermentedIngredients` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `hasFish` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `regionOfOrigin` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `showCount` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `spiceLevel` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `subCuisineType` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `videoUrl` on the `Recipe` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Recipe" DROP CONSTRAINT "Recipe_cuisineId_fkey";

-- DropIndex
DROP INDEX "Recipe_cuisineId_idx";

-- DropIndex
DROP INDEX "Recipe_cuisineType_idx";

-- DropIndex
DROP INDEX "Recipe_showCount_idx";

-- DropIndex
DROP INDEX "Recipe_type_idx";

-- AlterTable
ALTER TABLE "Ingredient" ADD COLUMN     "isFermented" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "authenticity",
DROP COLUMN "averageRating",
DROP COLUMN "calories",
DROP COLUMN "cookingMethods",
DROP COLUMN "cuisineId",
DROP COLUMN "hasFeatureFermented",
DROP COLUMN "hasFermentedIngredients",
DROP COLUMN "hasFish",
DROP COLUMN "imageUrl",
DROP COLUMN "regionOfOrigin",
DROP COLUMN "showCount",
DROP COLUMN "spiceLevel",
DROP COLUMN "subCuisineType",
DROP COLUMN "type",
DROP COLUMN "videoUrl",
ADD COLUMN     "needsDietaryReview" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "cookingTime" DROP NOT NULL,
ALTER COLUMN "servings" DROP NOT NULL,
ALTER COLUMN "difficulty" DROP NOT NULL,
ALTER COLUMN "cuisineType" DROP NOT NULL,
ALTER COLUMN "isVegetarian" DROP NOT NULL,
ALTER COLUMN "isVegan" DROP NOT NULL,
ALTER COLUMN "isGlutenFree" DROP NOT NULL,
ALTER COLUMN "isNutFree" DROP NOT NULL,
ALTER COLUMN "isFermented" DROP NOT NULL,
ALTER COLUMN "isLactoseFree" DROP NOT NULL,
ALTER COLUMN "isLowFodmap" DROP NOT NULL,
ALTER COLUMN "isPescatarian" DROP NOT NULL;

-- CreateTable
CREATE TABLE "DietaryFeedback" (
    "id" TEXT NOT NULL,
    "recipeId" TEXT NOT NULL,
    "lowFodmapIncorrect" BOOLEAN NOT NULL,
    "fermentedIncorrect" BOOLEAN NOT NULL,
    "pescatarianIncorrect" BOOLEAN NOT NULL,
    "comment" TEXT,
    "currentAnalysis" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DietaryFeedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CuisineRecipes" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_CuisineRecipes_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "DietaryFeedback_recipeId_idx" ON "DietaryFeedback"("recipeId");

-- CreateIndex
CREATE INDEX "_CuisineRecipes_B_index" ON "_CuisineRecipes"("B");

-- CreateIndex
CREATE INDEX "Recipe_jobId_idx" ON "Recipe"("jobId");

-- AddForeignKey
ALTER TABLE "DietaryFeedback" ADD CONSTRAINT "DietaryFeedback_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CuisineRecipes" ADD CONSTRAINT "_CuisineRecipes_A_fkey" FOREIGN KEY ("A") REFERENCES "Cuisine"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CuisineRecipes" ADD CONSTRAINT "_CuisineRecipes_B_fkey" FOREIGN KEY ("B") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;
