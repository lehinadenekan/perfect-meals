-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "search_vector" tsvector;

-- CreateIndex
CREATE INDEX "Recipe_search_vector_idx" ON "Recipe" USING GIN ("search_vector");
