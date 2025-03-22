/*
  Warnings:

  - You are about to drop the column `isLactoseFree` on the `Recipe` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "isLactoseFree",
ADD COLUMN     "hasFeatureFermented" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "hasFermentedIngredients" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "hasFish" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isFermented" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isLactoseFree" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isLowFodmap" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isPescatarian" BOOLEAN NOT NULL DEFAULT false;
