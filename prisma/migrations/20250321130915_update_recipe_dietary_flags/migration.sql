/*
  Warnings:

  - You are about to drop the column `isAlkaline` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `isHalal` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `isKeto` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `isKosher` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `isPaleo` on the `Recipe` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "isAlkaline",
DROP COLUMN "isHalal",
DROP COLUMN "isKeto",
DROP COLUMN "isKosher",
DROP COLUMN "isPaleo",
ADD COLUMN     "hasFermented" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "hasFish" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isLowCarb" BOOLEAN NOT NULL DEFAULT false;
