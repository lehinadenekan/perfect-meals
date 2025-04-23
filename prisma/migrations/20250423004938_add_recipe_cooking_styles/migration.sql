/*
  Warnings:

  - You are about to drop the column `cuisineType` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `dietaryNotes` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `jobId` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `needsDietaryReview` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the `_RecipeFusionCuisines` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_RecipeToTag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Recipe" DROP CONSTRAINT "Recipe_jobId_fkey";

-- DropForeignKey
ALTER TABLE "_RecipeFusionCuisines" DROP CONSTRAINT "_RecipeFusionCuisines_A_fkey";

-- DropForeignKey
ALTER TABLE "_RecipeFusionCuisines" DROP CONSTRAINT "_RecipeFusionCuisines_B_fkey";

-- DropForeignKey
ALTER TABLE "_RecipeToTag" DROP CONSTRAINT "_RecipeToTag_A_fkey";

-- DropForeignKey
ALTER TABLE "_RecipeToTag" DROP CONSTRAINT "_RecipeToTag_B_fkey";

-- DropIndex
DROP INDEX "Recipe_jobId_idx";

-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "cuisineType",
DROP COLUMN "dietaryNotes",
DROP COLUMN "jobId",
DROP COLUMN "needsDietaryReview",
ADD COLUMN     "continent" TEXT,
ADD COLUMN     "cookingStyles" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- DropTable
DROP TABLE "_RecipeFusionCuisines";

-- DropTable
DROP TABLE "_RecipeToTag";

-- CreateTable
CREATE TABLE "DietaryNotes" (
    "id" TEXT NOT NULL,
    "fodmapInfo" TEXT,
    "keyNutrients" TEXT,
    "antiInflammatoryInfo" TEXT,
    "recipeId" TEXT NOT NULL,

    CONSTRAINT "DietaryNotes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DietaryNotes_recipeId_key" ON "DietaryNotes"("recipeId");

-- AddForeignKey
ALTER TABLE "DietaryNotes" ADD CONSTRAINT "DietaryNotes_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;
