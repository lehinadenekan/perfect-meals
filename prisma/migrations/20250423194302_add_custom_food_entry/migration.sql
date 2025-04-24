-- CreateTable
CREATE TABLE "CustomFoodEntry" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "servingSize" TEXT,
    "calories" INTEGER,
    "protein" INTEGER,
    "carbs" INTEGER,
    "fat" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CustomFoodEntry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CustomFoodEntry_userId_idx" ON "CustomFoodEntry"("userId");

-- AddForeignKey
ALTER TABLE "CustomFoodEntry" ADD CONSTRAINT "CustomFoodEntry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
