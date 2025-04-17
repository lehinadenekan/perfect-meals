/*
  Warnings:

  - You are about to drop the column `totalTime` on the `Recipe` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "totalTime";

-- CreateTable
CREATE TABLE "IngredientMapping" (
    "id" TEXT NOT NULL,
    "ingredientQuery" TEXT NOT NULL,
    "amazonSearchTerm" TEXT NOT NULL,
    "amazonAsin" TEXT,
    "confidenceScore" DOUBLE PRECISION,
    "lastVerifiedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "IngredientMapping_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "IngredientMapping_amazonSearchTerm_idx" ON "IngredientMapping"("amazonSearchTerm");

-- CreateIndex
CREATE INDEX "IngredientMapping_ingredientQuery_idx" ON "IngredientMapping"("ingredientQuery");
