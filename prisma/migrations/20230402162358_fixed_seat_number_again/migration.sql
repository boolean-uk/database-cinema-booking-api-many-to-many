/*
  Warnings:

  - Changed the type of `number` on the `Screen` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Screen" DROP COLUMN "number",
ADD COLUMN     "number" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Seat" ALTER COLUMN "number" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Screen_number_key" ON "Screen"("number");
