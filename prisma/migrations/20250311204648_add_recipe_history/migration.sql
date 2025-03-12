/*
  Warnings:

  - You are about to drop the `DietaryTag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_RecipeToDietaryTag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_RecipeToDietaryTag" DROP CONSTRAINT "_RecipeToDietaryTag_A_fkey";

-- DropForeignKey
ALTER TABLE "_RecipeToDietaryTag" DROP CONSTRAINT "_RecipeToDietaryTag_B_fkey";

-- DropTable
DROP TABLE "DietaryTag";

-- DropTable
DROP TABLE "_RecipeToDietaryTag";
