-- DropForeignKey
ALTER TABLE "Seat" DROP CONSTRAINT "Seat_screenId_fkey";

-- CreateTable
CREATE TABLE "_ScreenToSeat" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ScreenToSeat_AB_unique" ON "_ScreenToSeat"("A", "B");

-- CreateIndex
CREATE INDEX "_ScreenToSeat_B_index" ON "_ScreenToSeat"("B");

-- AddForeignKey
ALTER TABLE "_ScreenToSeat" ADD CONSTRAINT "_ScreenToSeat_A_fkey" FOREIGN KEY ("A") REFERENCES "Screen"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ScreenToSeat" ADD CONSTRAINT "_ScreenToSeat_B_fkey" FOREIGN KEY ("B") REFERENCES "Seat"("id") ON DELETE CASCADE ON UPDATE CASCADE;
