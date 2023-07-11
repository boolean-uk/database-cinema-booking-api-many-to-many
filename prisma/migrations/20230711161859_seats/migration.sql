/*
  Warnings:

  - You are about to drop the `SeatOnScreening` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SeatOnScreening" DROP CONSTRAINT "SeatOnScreening_screeningId_fkey";

-- DropForeignKey
ALTER TABLE "SeatOnScreening" DROP CONSTRAINT "SeatOnScreening_seatId_fkey";

-- DropTable
DROP TABLE "SeatOnScreening";

-- CreateTable
CREATE TABLE "_ScreeningToSeat" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ScreeningToSeat_AB_unique" ON "_ScreeningToSeat"("A", "B");

-- CreateIndex
CREATE INDEX "_ScreeningToSeat_B_index" ON "_ScreeningToSeat"("B");

-- AddForeignKey
ALTER TABLE "_ScreeningToSeat" ADD CONSTRAINT "_ScreeningToSeat_A_fkey" FOREIGN KEY ("A") REFERENCES "Screening"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ScreeningToSeat" ADD CONSTRAINT "_ScreeningToSeat_B_fkey" FOREIGN KEY ("B") REFERENCES "Seat"("id") ON DELETE CASCADE ON UPDATE CASCADE;
