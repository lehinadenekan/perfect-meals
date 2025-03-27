/*
  Warnings:

  - You are about to drop the column `regionOfOrigin` on the `Recipe` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "regionOfOrigin",
ADD COLUMN     "region_of_origin" TEXT;
