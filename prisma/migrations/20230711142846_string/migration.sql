/*
  Warnings:

  - A unique constraint covering the columns `[seatNumber]` on the table `Seat` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Seat" ALTER COLUMN "seatNumber" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Seat_seatNumber_key" ON "Seat"("seatNumber");
