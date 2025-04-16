/*
  Warnings:

  - You are about to drop the column `cuisineType` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `isDraft` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `regionOfOrigin` on the `Recipe` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "cuisineType",
DROP COLUMN "isDraft",
DROP COLUMN "regionOfOrigin";
