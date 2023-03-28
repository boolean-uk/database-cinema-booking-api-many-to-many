-- CreateTable
CREATE TABLE "Seat" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Seat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "seatsToCustomer" (
    "customerId" INTEGER NOT NULL,
    "seatId" INTEGER NOT NULL,

    CONSTRAINT "seatsToCustomer_pkey" PRIMARY KEY ("customerId","seatId")
);

-- AddForeignKey
ALTER TABLE "seatsToCustomer" ADD CONSTRAINT "seatsToCustomer_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "seatsToCustomer" ADD CONSTRAINT "seatsToCustomer_seatId_fkey" FOREIGN KEY ("seatId") REFERENCES "Seat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
