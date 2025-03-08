/*
  Warnings:

  - Added the required column `averagePreparationTime` to the `Cuisine` table without a default value. This is not possible if the table is not empty.
  - Added the required column `difficultyLevel` to the `Cuisine` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cuisineId` to the `Recipe` table without a default value. This is not possible if the table is not empty.

*/
-- First add new columns to Cuisine table
ALTER TABLE "Cuisine" 
ADD COLUMN "averagePreparationTime" INTEGER,
ADD COLUMN "commonIngredients" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN "cookingMethods" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN "culturalContext" TEXT,
ADD COLUMN "description" TEXT,
ADD COLUMN "dietaryConsiderations" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN "difficultyLevel" TEXT,
ADD COLUMN "mealTypes" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN "parentCuisineId" TEXT,
ADD COLUMN "spiceProfile" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN "subRegion" TEXT;

-- Create default cuisine
INSERT INTO "Cuisine" (
  "id",
  "name",
  "region",
  "difficultyLevel",
  "averagePreparationTime",
  "createdAt",
  "updatedAt"
) VALUES (
  'default-cuisine-id',
  'Traditional',
  'Global',
  'MEDIUM',
  30,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);

-- Make required fields NOT NULL after data is inserted
ALTER TABLE "Cuisine" 
ALTER COLUMN "difficultyLevel" SET NOT NULL,
ALTER COLUMN "averagePreparationTime" SET NOT NULL;

-- Add Recipe columns
ALTER TABLE "Recipe" 
ADD COLUMN "cuisineId" TEXT,
ADD COLUMN "authenticity" TEXT NOT NULL DEFAULT 'TRADITIONAL',
ADD COLUMN "cookingMethods" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN "spiceLevel" TEXT NOT NULL DEFAULT 'MEDIUM',
ADD COLUMN "subCuisineType" TEXT;

-- Update existing recipes to use default cuisine
UPDATE "Recipe" SET "cuisineId" = 'default-cuisine-id' WHERE "cuisineId" IS NULL;
ALTER TABLE "Recipe" ALTER COLUMN "cuisineId" SET NOT NULL;

-- Create fusion cuisines table
CREATE TABLE "_RecipeFusionCuisines" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_RecipeFusionCuisines_AB_pkey" PRIMARY KEY ("A","B")
);

-- Create indexes
CREATE INDEX "_RecipeFusionCuisines_B_index" ON "_RecipeFusionCuisines"("B");
CREATE INDEX "Cuisine_region_subRegion_idx" ON "Cuisine"("region", "subRegion");
CREATE INDEX "Cuisine_name_idx" ON "Cuisine"("name");
CREATE INDEX "Recipe_cuisineId_idx" ON "Recipe"("cuisineId");

-- Add foreign key constraints
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_cuisineId_fkey" FOREIGN KEY ("cuisineId") REFERENCES "Cuisine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Cuisine" ADD CONSTRAINT "Cuisine_parentCuisineId_fkey" FOREIGN KEY ("parentCuisineId") REFERENCES "Cuisine"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "_RecipeFusionCuisines" ADD CONSTRAINT "_RecipeFusionCuisines_A_fkey" FOREIGN KEY ("A") REFERENCES "Cuisine"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "_RecipeFusionCuisines" ADD CONSTRAINT "_RecipeFusionCuisines_B_fkey" FOREIGN KEY ("B") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;
