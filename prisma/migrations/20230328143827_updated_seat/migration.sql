/*
  Warnings:

  - Added the required column `number` to the `Seat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Seat" ADD COLUMN     "number" INTEGER NOT NULL;
