/*
  Warnings:

  - You are about to drop the column `ticketId` on the `Seat` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[seatNumber]` on the table `Seat` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Seat" DROP CONSTRAINT "Seat_ticketId_fkey";

-- DropIndex
DROP INDEX "Seat_ticketId_key";

-- AlterTable
ALTER TABLE "Seat" DROP COLUMN "ticketId",
ALTER COLUMN "seatNumber" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "_ScreenToSeat" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ScreenToSeat_AB_unique" ON "_ScreenToSeat"("A", "B");

-- CreateIndex
CREATE INDEX "_ScreenToSeat_B_index" ON "_ScreenToSeat"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Seat_seatNumber_key" ON "Seat"("seatNumber");

-- AddForeignKey
ALTER TABLE "_ScreenToSeat" ADD CONSTRAINT "_ScreenToSeat_A_fkey" FOREIGN KEY ("A") REFERENCES "Screen"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ScreenToSeat" ADD CONSTRAINT "_ScreenToSeat_B_fkey" FOREIGN KEY ("B") REFERENCES "Seat"("id") ON DELETE CASCADE ON UPDATE CASCADE;
