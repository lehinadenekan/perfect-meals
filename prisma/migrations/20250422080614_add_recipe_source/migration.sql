-- CreateEnum
CREATE TYPE "RecipeSource" AS ENUM ('ADMIN', 'USER_CREATED', 'USER_IMPORTED');

-- DropForeignKey
ALTER TABLE "Recipe" DROP CONSTRAINT "Recipe_authorId_fkey";

-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "source" "RecipeSource" NOT NULL DEFAULT 'USER_CREATED',
ALTER COLUMN "authorId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
