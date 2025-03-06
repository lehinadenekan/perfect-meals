-- CreateTable
CREATE TABLE "StandardIngredient" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,

    CONSTRAINT "StandardIngredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cuisine" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "region" TEXT NOT NULL,

    CONSTRAINT "Cuisine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserPreference" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "cookingSkillLevel" TEXT NOT NULL,
    "preferredServingSize" INTEGER NOT NULL DEFAULT 4,
    "maxCookingTime" INTEGER,
    "measurementSystem" TEXT NOT NULL DEFAULT 'METRIC',
    "preferVegetarian" BOOLEAN NOT NULL DEFAULT false,
    "preferVegan" BOOLEAN NOT NULL DEFAULT false,
    "preferGlutenFree" BOOLEAN NOT NULL DEFAULT false,
    "preferDairyFree" BOOLEAN NOT NULL DEFAULT false,
    "preferLowCarb" BOOLEAN NOT NULL DEFAULT false,
    "preferLowCalorie" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserPreference_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserAllergy" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "ingredientId" TEXT NOT NULL,
    "severityLevel" TEXT NOT NULL,
    "crossContaminationSensitive" BOOLEAN NOT NULL DEFAULT false,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserAllergy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserCuisinePreference" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "cuisineId" TEXT NOT NULL,
    "preferenceLevel" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserCuisinePreference_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StandardIngredient_name_key" ON "StandardIngredient"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Cuisine_name_key" ON "Cuisine"("name");

-- CreateIndex
CREATE UNIQUE INDEX "UserPreference_userId_key" ON "UserPreference"("userId");

-- CreateIndex
CREATE INDEX "UserAllergy_userId_idx" ON "UserAllergy"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserAllergy_userId_ingredientId_key" ON "UserAllergy"("userId", "ingredientId");

-- CreateIndex
CREATE INDEX "UserCuisinePreference_userId_idx" ON "UserCuisinePreference"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserCuisinePreference_userId_cuisineId_key" ON "UserCuisinePreference"("userId", "cuisineId");

-- AddForeignKey
ALTER TABLE "UserPreference" ADD CONSTRAINT "UserPreference_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAllergy" ADD CONSTRAINT "UserAllergy_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAllergy" ADD CONSTRAINT "UserAllergy_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "StandardIngredient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCuisinePreference" ADD CONSTRAINT "UserCuisinePreference_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCuisinePreference" ADD CONSTRAINT "UserCuisinePreference_cuisineId_fkey" FOREIGN KEY ("cuisineId") REFERENCES "Cuisine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
