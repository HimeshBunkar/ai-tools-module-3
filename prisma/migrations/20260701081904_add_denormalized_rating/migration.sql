-- AlterTable
ALTER TABLE "Tool" ADD COLUMN     "avgRating" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "reviewCount" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE INDEX "Tool_avgRating_idx" ON "Tool"("avgRating");
