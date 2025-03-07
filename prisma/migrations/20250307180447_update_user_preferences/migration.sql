/*
  Warnings:

  - You are about to drop the column `cookingTime` on the `UserPreference` table. All the data in the column will be lost.
  - You are about to drop the column `isDairyFree` on the `UserPreference` table. All the data in the column will be lost.
  - You are about to drop the column `isGlutenFree` on the `UserPreference` table. All the data in the column will be lost.
  - You are about to drop the column `isHalal` on the `UserPreference` table. All the data in the column will be lost.
  - You are about to drop the column `isKosher` on the `UserPreference` table. All the data in the column will be lost.
  - You are about to drop the column `isLowCarb` on the `UserPreference` table. All the data in the column will be lost.
  - You are about to drop the column `isVegan` on the `UserPreference` table. All the data in the column will be lost.
  - You are about to drop the column `isVegetarian` on the `UserPreference` table. All the data in the column will be lost.
  - You are about to drop the column `mealPrep` on the `UserPreference` table. All the data in the column will be lost.
  - You are about to drop the column `servingSize` on the `UserPreference` table. All the data in the column will be lost.
  - You are about to drop the column `skillLevel` on the `UserPreference` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserPreference" DROP COLUMN "cookingTime",
DROP COLUMN "isDairyFree",
DROP COLUMN "isGlutenFree",
DROP COLUMN "isHalal",
DROP COLUMN "isKosher",
DROP COLUMN "isLowCarb",
DROP COLUMN "isVegan",
DROP COLUMN "isVegetarian",
DROP COLUMN "mealPrep",
DROP COLUMN "servingSize",
DROP COLUMN "skillLevel",
ADD COLUMN     "dietType" TEXT,
ADD COLUMN     "excludedFoods" TEXT[] DEFAULT ARRAY[]::TEXT[];
