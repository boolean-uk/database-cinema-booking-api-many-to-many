/*
  Warnings:

  - You are about to drop the `seatsToCustomer` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[seatID]` on the table `Ticket` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `seatID` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "seatsToCustomer" DROP CONSTRAINT "seatsToCustomer_customerId_fkey";

-- DropForeignKey
ALTER TABLE "seatsToCustomer" DROP CONSTRAINT "seatsToCustomer_seatId_fkey";

-- AlterTable
ALTER TABLE "Seat" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "seatID" INTEGER NOT NULL;

-- DropTable
DROP TABLE "seatsToCustomer";

-- CreateTable
CREATE TABLE "_CustomerToSeat" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CustomerToSeat_AB_unique" ON "_CustomerToSeat"("A", "B");

-- CreateIndex
CREATE INDEX "_CustomerToSeat_B_index" ON "_CustomerToSeat"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Ticket_seatID_key" ON "Ticket"("seatID");

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_seatID_fkey" FOREIGN KEY ("seatID") REFERENCES "Seat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CustomerToSeat" ADD CONSTRAINT "_CustomerToSeat_A_fkey" FOREIGN KEY ("A") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CustomerToSeat" ADD CONSTRAINT "_CustomerToSeat_B_fkey" FOREIGN KEY ("B") REFERENCES "Seat"("id") ON DELETE CASCADE ON UPDATE CASCADE;
