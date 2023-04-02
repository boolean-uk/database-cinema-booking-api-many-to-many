/*
  Warnings:

  - A unique constraint covering the columns `[number]` on the table `Screen` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[number]` on the table `Seat` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Screen_number_key" ON "Screen"("number");

-- CreateIndex
CREATE UNIQUE INDEX "Seat_number_key" ON "Seat"("number");
