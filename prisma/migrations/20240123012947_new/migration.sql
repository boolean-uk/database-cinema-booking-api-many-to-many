-- DropForeignKey
ALTER TABLE "Seat" DROP CONSTRAINT "Seat_screenId_fkey";

-- DropForeignKey
ALTER TABLE "_SeatToTicket" DROP CONSTRAINT "_SeatToTicket_A_fkey";

-- DropForeignKey
ALTER TABLE "_SeatToTicket" DROP CONSTRAINT "_SeatToTicket_B_fkey";

-- AlterTable
ALTER TABLE "Seat" DROP COLUMN "seatNumber",
DROP COLUMN "seatRow",
ADD COLUMN     "number" INTEGER NOT NULL,
ALTER COLUMN "screenId" SET NOT NULL;

-- DropTable
DROP TABLE "_SeatToTicket";

-- CreateTable
CREATE TABLE "TicketsOnSeats" (
    "ticketId" INTEGER NOT NULL,
    "seatId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TicketsOnSeats_pkey" PRIMARY KEY ("ticketId","seatId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Seat_number_key" ON "Seat"("number");

-- AddForeignKey
ALTER TABLE "Seat" ADD CONSTRAINT "Seat_screenId_fkey" FOREIGN KEY ("screenId") REFERENCES "Screen"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TicketsOnSeats" ADD CONSTRAINT "TicketsOnSeats_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "Ticket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TicketsOnSeats" ADD CONSTRAINT "TicketsOnSeats_seatId_fkey" FOREIGN KEY ("seatId") REFERENCES "Seat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
