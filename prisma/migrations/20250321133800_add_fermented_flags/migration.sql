/*
  Warnings:

  - You are about to drop the column `hasFermented` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `hasFish` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `isLowCarb` on the `Recipe` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "hasFermented",
DROP COLUMN "hasFish",
DROP COLUMN "isLowCarb";
