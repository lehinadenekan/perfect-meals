/*
  Warnings:

  - You are about to drop the column `region_of_origin` on the `Recipe` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "region_of_origin",
ADD COLUMN     "regionOfOrigin" TEXT;
