/*
  Warnings:

  - A unique constraint covering the columns `[recipeId,stepNumber]` on the table `Instruction` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Instruction_recipeId_idx";

-- AlterTable
ALTER TABLE "Instruction" ADD COLUMN     "imageUrl" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Instruction_recipeId_stepNumber_key" ON "Instruction"("recipeId", "stepNumber");
