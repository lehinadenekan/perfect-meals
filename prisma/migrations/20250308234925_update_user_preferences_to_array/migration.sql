/*
  Warnings:

  - You are about to drop the column `isDairyFree` on the `UserPreference` table. All the data in the column will be lost.
  - You are about to drop the column `isGlutenFree` on the `UserPreference` table. All the data in the column will be lost.
  - You are about to drop the column `isHalal` on the `UserPreference` table. All the data in the column will be lost.
  - You are about to drop the column `isKosher` on the `UserPreference` table. All the data in the column will be lost.
  - You are about to drop the column `isLowCarb` on the `UserPreference` table. All the data in the column will be lost.
  - You are about to drop the column `isVegan` on the `UserPreference` table. All the data in the column will be lost.
  - You are about to drop the column `isVegetarian` on the `UserPreference` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserPreference" DROP COLUMN "isDairyFree",
DROP COLUMN "isGlutenFree",
DROP COLUMN "isHalal",
DROP COLUMN "isKosher",
DROP COLUMN "isLowCarb",
DROP COLUMN "isVegan",
DROP COLUMN "isVegetarian",
ADD COLUMN     "dietTypes" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "excludedFoods" TEXT[] DEFAULT ARRAY[]::TEXT[];
