/*
  Warnings:

  - You are about to drop the column `time` on the `PlannerMeal` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PlannerMeal" DROP COLUMN "time",
ADD COLUMN     "mealTime" TEXT;
