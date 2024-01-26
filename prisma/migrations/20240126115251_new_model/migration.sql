/*
  Warnings:

  - You are about to drop the column `ticketId` on the `Seat` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Seat" DROP CONSTRAINT "Seat_ticketId_fkey";

-- AlterTable
ALTER TABLE "Seat" DROP COLUMN "ticketId";

-- CreateTable
CREATE TABLE "SeatOnTicket" (
    "seatId" INTEGER NOT NULL,
    "ticketId" INTEGER NOT NULL,

    CONSTRAINT "SeatOnTicket_pkey" PRIMARY KEY ("seatId","ticketId")
);

-- AddForeignKey
ALTER TABLE "SeatOnTicket" ADD CONSTRAINT "SeatOnTicket_seatId_fkey" FOREIGN KEY ("seatId") REFERENCES "Seat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeatOnTicket" ADD CONSTRAINT "SeatOnTicket_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "Ticket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
