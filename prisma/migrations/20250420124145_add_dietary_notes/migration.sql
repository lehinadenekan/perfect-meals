-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "dietaryNotes" JSONB,
ALTER COLUMN "notes" SET DEFAULT ARRAY[]::TEXT[];
