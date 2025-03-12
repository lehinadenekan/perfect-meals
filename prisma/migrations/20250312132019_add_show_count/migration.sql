-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "showCount" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE INDEX "Recipe_showCount_idx" ON "Recipe"("showCount");
