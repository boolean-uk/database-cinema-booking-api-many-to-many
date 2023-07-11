/*
  Warnings:

  - A unique constraint covering the columns `[seatNumber]` on the table `Seat` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `seatNumber` to the `Seat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Seat" ADD COLUMN     "seatNumber" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Seat_seatNumber_key" ON "Seat"("seatNumber");
