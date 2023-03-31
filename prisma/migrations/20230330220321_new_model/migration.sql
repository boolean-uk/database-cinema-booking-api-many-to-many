-- CreateTable
CREATE TABLE "Seat" (
    "id" SERIAL NOT NULL,
    "screenId" INTEGER NOT NULL,
    "number" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Seat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SeatsForTicket" (
    "seatId" INTEGER NOT NULL,
    "ticketId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SeatsForTicket_pkey" PRIMARY KEY ("seatId","ticketId")
);

-- AddForeignKey
ALTER TABLE "Seat" ADD CONSTRAINT "Seat_screenId_fkey" FOREIGN KEY ("screenId") REFERENCES "Screen"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeatsForTicket" ADD CONSTRAINT "SeatsForTicket_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "Ticket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeatsForTicket" ADD CONSTRAINT "SeatsForTicket_seatId_fkey" FOREIGN KEY ("seatId") REFERENCES "Seat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
