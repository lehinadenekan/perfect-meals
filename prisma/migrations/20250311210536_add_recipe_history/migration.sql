-- CreateTable
CREATE TABLE "UserRecipeHistory" (
    "id" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,
    "recipeId" TEXT NOT NULL,
    "shownAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserRecipeHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "UserRecipeHistory_userEmail_shownAt_idx" ON "UserRecipeHistory"("userEmail", "shownAt");

-- CreateIndex
CREATE INDEX "UserRecipeHistory_recipeId_idx" ON "UserRecipeHistory"("recipeId");

-- AddForeignKey
ALTER TABLE "UserRecipeHistory" ADD CONSTRAINT "UserRecipeHistory_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "users"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRecipeHistory" ADD CONSTRAINT "UserRecipeHistory_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
