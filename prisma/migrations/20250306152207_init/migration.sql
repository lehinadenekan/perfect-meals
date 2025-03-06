/*
  Warnings:

  - You are about to drop the column `emailVerified` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `crossContaminationSensitive` on the `UserAllergy` table. All the data in the column will be lost.
  - You are about to drop the column `notes` on the `UserAllergy` table. All the data in the column will be lost.
  - You are about to drop the column `severityLevel` on the `UserAllergy` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `UserAllergy` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `UserCuisinePreference` table. All the data in the column will be lost.
  - You are about to drop the column `cookingSkillLevel` on the `UserPreference` table. All the data in the column will be lost.
  - You are about to drop the column `maxCookingTime` on the `UserPreference` table. All the data in the column will be lost.
  - You are about to drop the column `measurementSystem` on the `UserPreference` table. All the data in the column will be lost.
  - You are about to drop the column `preferDairyFree` on the `UserPreference` table. All the data in the column will be lost.
  - You are about to drop the column `preferGlutenFree` on the `UserPreference` table. All the data in the column will be lost.
  - You are about to drop the column `preferLowCalorie` on the `UserPreference` table. All the data in the column will be lost.
  - You are about to drop the column `preferLowCarb` on the `UserPreference` table. All the data in the column will be lost.
  - You are about to drop the column `preferVegan` on the `UserPreference` table. All the data in the column will be lost.
  - You are about to drop the column `preferVegetarian` on the `UserPreference` table. All the data in the column will be lost.
  - You are about to drop the column `preferredServingSize` on the `UserPreference` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `UserPreference` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userEmail,ingredientId]` on the table `UserAllergy` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userEmail,cuisineId]` on the table `UserCuisinePreference` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userEmail]` on the table `UserPreference` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `Cuisine` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `StandardIngredient` table without a default value. This is not possible if the table is not empty.
  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `severity` to the `UserAllergy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userEmail` to the `UserAllergy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userEmail` to the `UserCuisinePreference` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cookingTime` to the `UserPreference` table without a default value. This is not possible if the table is not empty.
  - Added the required column `servingSize` to the `UserPreference` table without a default value. This is not possible if the table is not empty.
  - Added the required column `skillLevel` to the `UserPreference` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userEmail` to the `UserPreference` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserAllergy" DROP CONSTRAINT "UserAllergy_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserCuisinePreference" DROP CONSTRAINT "UserCuisinePreference_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserPreference" DROP CONSTRAINT "UserPreference_userId_fkey";

-- DropIndex
DROP INDEX "UserAllergy_userId_idx";

-- DropIndex
DROP INDEX "UserAllergy_userId_ingredientId_key";

-- DropIndex
DROP INDEX "UserCuisinePreference_userId_cuisineId_key";

-- DropIndex
DROP INDEX "UserCuisinePreference_userId_idx";

-- DropIndex
DROP INDEX "UserPreference_userId_key";

-- AlterTable
ALTER TABLE "Cuisine" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "StandardIngredient" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "emailVerified",
ALTER COLUMN "email" SET NOT NULL;

-- AlterTable
ALTER TABLE "UserAllergy" DROP COLUMN "crossContaminationSensitive",
DROP COLUMN "notes",
DROP COLUMN "severityLevel",
DROP COLUMN "userId",
ADD COLUMN     "severity" TEXT NOT NULL,
ADD COLUMN     "userEmail" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "UserCuisinePreference" DROP COLUMN "userId",
ADD COLUMN     "userEmail" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "UserPreference" DROP COLUMN "cookingSkillLevel",
DROP COLUMN "maxCookingTime",
DROP COLUMN "measurementSystem",
DROP COLUMN "preferDairyFree",
DROP COLUMN "preferGlutenFree",
DROP COLUMN "preferLowCalorie",
DROP COLUMN "preferLowCarb",
DROP COLUMN "preferVegan",
DROP COLUMN "preferVegetarian",
DROP COLUMN "preferredServingSize",
DROP COLUMN "userId",
ADD COLUMN     "cookingTime" TEXT NOT NULL,
ADD COLUMN     "mealPrep" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "servingSize" INTEGER NOT NULL,
ADD COLUMN     "skillLevel" TEXT NOT NULL,
ADD COLUMN     "userEmail" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "UserAllergy_userEmail_ingredientId_key" ON "UserAllergy"("userEmail", "ingredientId");

-- CreateIndex
CREATE UNIQUE INDEX "UserCuisinePreference_userEmail_cuisineId_key" ON "UserCuisinePreference"("userEmail", "cuisineId");

-- CreateIndex
CREATE UNIQUE INDEX "UserPreference_userEmail_key" ON "UserPreference"("userEmail");

-- AddForeignKey
ALTER TABLE "UserPreference" ADD CONSTRAINT "UserPreference_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAllergy" ADD CONSTRAINT "UserAllergy_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCuisinePreference" ADD CONSTRAINT "UserCuisinePreference_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
