/*
  Warnings:

  - The primary key for the `Ticket` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `_SeatToTicket` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[id]` on the table `Ticket` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "_SeatToTicket" DROP CONSTRAINT "_SeatToTicket_A_fkey";

-- DropForeignKey
ALTER TABLE "_SeatToTicket" DROP CONSTRAINT "_SeatToTicket_B_fkey";

-- AlterTable
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_pkey",
ADD CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id", "screeningId");

-- DropTable
DROP TABLE "_SeatToTicket";

-- CreateTable
CREATE TABLE "TicketsOnSeats" (
    "ticketId" INTEGER NOT NULL,
    "seatId" INTEGER NOT NULL,
    "screeningId" INTEGER NOT NULL,

    CONSTRAINT "TicketsOnSeats_pkey" PRIMARY KEY ("ticketId","screeningId","seatId")
);

-- CreateIndex
CREATE UNIQUE INDEX "TicketsOnSeats_screeningId_seatId_key" ON "TicketsOnSeats"("screeningId", "seatId");

-- CreateIndex
CREATE UNIQUE INDEX "Ticket_id_key" ON "Ticket"("id");

-- AddForeignKey
ALTER TABLE "TicketsOnSeats" ADD CONSTRAINT "TicketsOnSeats_ticketId_screeningId_fkey" FOREIGN KEY ("ticketId", "screeningId") REFERENCES "Ticket"("id", "screeningId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TicketsOnSeats" ADD CONSTRAINT "TicketsOnSeats_seatId_fkey" FOREIGN KEY ("seatId") REFERENCES "Seat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
