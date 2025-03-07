/*
  Warnings:

  - You are about to drop the column `createdAt` on the `UserPreference` table. All the data in the column will be lost.
  - You are about to drop the column `dietTypes` on the `UserPreference` table. All the data in the column will be lost.
  - You are about to drop the column `excludedFoods` on the `UserPreference` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `UserPreference` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'DINNER';

-- AlterTable
ALTER TABLE "UserPreference" DROP COLUMN "createdAt",
DROP COLUMN "dietTypes",
DROP COLUMN "excludedFoods",
DROP COLUMN "updatedAt",
ADD COLUMN     "cookingTime" TEXT NOT NULL DEFAULT 'MEDIUM',
ADD COLUMN     "isDairyFree" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isGlutenFree" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isHalal" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isKosher" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isLowCarb" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isVegan" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isVegetarian" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "mealPrep" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "servingSize" INTEGER NOT NULL DEFAULT 2,
ADD COLUMN     "skillLevel" TEXT NOT NULL DEFAULT 'BEGINNER';

-- CreateIndex
CREATE INDEX "Recipe_type_idx" ON "Recipe"("type");
