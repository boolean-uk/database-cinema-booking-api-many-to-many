/*
  Warnings:

  - You are about to drop the column `place` on the `Seat` table. All the data in the column will be lost.
  - Added the required column `aisle` to the `Seat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number` to the `Seat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Seat" DROP COLUMN "place",
ADD COLUMN     "aisle" TEXT NOT NULL,
ADD COLUMN     "number" INTEGER NOT NULL;
