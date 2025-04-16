/*
  Warnings:

  - You are about to drop the column `coverImageUrl` on the `Album` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Album" DROP COLUMN "coverImageUrl",
ADD COLUMN     "coverImage" TEXT;

-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "isDraft" BOOLEAN NOT NULL DEFAULT false;
