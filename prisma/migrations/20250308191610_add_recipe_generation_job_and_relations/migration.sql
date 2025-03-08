-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "jobId" TEXT;

-- CreateTable
CREATE TABLE "RecipeGenerationJob" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "totalRecipes" INTEGER NOT NULL,
    "completed" INTEGER NOT NULL DEFAULT 0,
    "failed" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "error" TEXT,

    CONSTRAINT "RecipeGenerationJob_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "RecipeGenerationJob"("id") ON DELETE SET NULL ON UPDATE CASCADE;
