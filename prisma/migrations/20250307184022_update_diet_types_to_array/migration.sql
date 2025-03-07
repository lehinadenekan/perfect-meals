/*
  Warnings:

  - You are about to drop the column `dietType` on the `UserPreference` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserPreference" DROP COLUMN "dietType",
ADD COLUMN     "dietTypes" TEXT[] DEFAULT ARRAY[]::TEXT[];
