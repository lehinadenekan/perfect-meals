/*
  Warnings:

  - You are about to drop the column `cookTime` on the `Recipe` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "cookTime",
ADD COLUMN     "cookingTime" INTEGER;
