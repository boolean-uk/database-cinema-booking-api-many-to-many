/*
  Warnings:

  - You are about to drop the column `seatId` on the `Screen` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[screenId]` on the table `Seat` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `screenId` to the `Seat` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Screen" DROP CONSTRAINT "Screen_seatId_fkey";

-- DropIndex
DROP INDEX "Screen_seatId_key";

-- AlterTable
ALTER TABLE "Screen" DROP COLUMN "seatId";

-- AlterTable
ALTER TABLE "Seat" ADD COLUMN     "screenId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Seat_screenId_key" ON "Seat"("screenId");

-- AddForeignKey
ALTER TABLE "Seat" ADD CONSTRAINT "Seat_screenId_fkey" FOREIGN KEY ("screenId") REFERENCES "Screen"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
