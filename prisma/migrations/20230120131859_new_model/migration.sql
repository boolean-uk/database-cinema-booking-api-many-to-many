/*
  Warnings:

  - You are about to drop the `_ScreenToSeat` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[seatId]` on the table `Screen` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `seatId` to the `Screen` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_ScreenToSeat" DROP CONSTRAINT "_ScreenToSeat_A_fkey";

-- DropForeignKey
ALTER TABLE "_ScreenToSeat" DROP CONSTRAINT "_ScreenToSeat_B_fkey";

-- AlterTable
ALTER TABLE "Screen" ADD COLUMN     "seatId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_ScreenToSeat";

-- CreateTable
CREATE TABLE "_SeatToTicket" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_SeatToTicket_AB_unique" ON "_SeatToTicket"("A", "B");

-- CreateIndex
CREATE INDEX "_SeatToTicket_B_index" ON "_SeatToTicket"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Screen_seatId_key" ON "Screen"("seatId");

-- AddForeignKey
ALTER TABLE "Screen" ADD CONSTRAINT "Screen_seatId_fkey" FOREIGN KEY ("seatId") REFERENCES "Seat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SeatToTicket" ADD CONSTRAINT "_SeatToTicket_A_fkey" FOREIGN KEY ("A") REFERENCES "Seat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SeatToTicket" ADD CONSTRAINT "_SeatToTicket_B_fkey" FOREIGN KEY ("B") REFERENCES "Ticket"("id") ON DELETE CASCADE ON UPDATE CASCADE;
