-- This is an empty migration.

-- Add regionOfOrigin and imageUrl fields to Recipe model
ALTER TABLE "Recipe" ADD COLUMN "regionOfOrigin" TEXT;
ALTER TABLE "Recipe" ADD COLUMN "imageUrl" TEXT;

-- Update recipes to have default values
UPDATE "Recipe" SET "regionOfOrigin" = 'Global' WHERE "regionOfOrigin" IS NULL;
UPDATE "Recipe" SET "imageUrl" = CONCAT('/images/recipes/', "id", '.jpg') WHERE "imageUrl" IS NULL;