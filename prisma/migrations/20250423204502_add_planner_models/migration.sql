-- CreateEnum
CREATE TYPE "MealType" AS ENUM ('BREAKFAST', 'LUNCH', 'DINNER', 'SNACK', 'OTHER');

-- CreateTable
CREATE TABLE "PlannerDay" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "date" DATE NOT NULL,

    CONSTRAINT "PlannerDay_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlannerMeal" (
    "id" TEXT NOT NULL,
    "plannerDayId" TEXT NOT NULL,
    "mealType" "MealType" NOT NULL,
    "recipeId" TEXT,
    "customFoodEntryId" TEXT,
    "servings" DOUBLE PRECISION DEFAULT 1.0,

    CONSTRAINT "PlannerMeal_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PlannerDay_userId_idx" ON "PlannerDay"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "PlannerDay_userId_date_key" ON "PlannerDay"("userId", "date");

-- CreateIndex
CREATE INDEX "PlannerMeal_plannerDayId_idx" ON "PlannerMeal"("plannerDayId");

-- CreateIndex
CREATE INDEX "PlannerMeal_recipeId_idx" ON "PlannerMeal"("recipeId");

-- CreateIndex
CREATE INDEX "PlannerMeal_customFoodEntryId_idx" ON "PlannerMeal"("customFoodEntryId");

-- AddForeignKey
ALTER TABLE "PlannerDay" ADD CONSTRAINT "PlannerDay_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlannerMeal" ADD CONSTRAINT "PlannerMeal_plannerDayId_fkey" FOREIGN KEY ("plannerDayId") REFERENCES "PlannerDay"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlannerMeal" ADD CONSTRAINT "PlannerMeal_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlannerMeal" ADD CONSTRAINT "PlannerMeal_customFoodEntryId_fkey" FOREIGN KEY ("customFoodEntryId") REFERENCES "CustomFoodEntry"("id") ON DELETE SET NULL ON UPDATE CASCADE;
