/*
  Warnings:

  - Changed the type of `row` on the `Seats` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Seats" DROP COLUMN "row",
ADD COLUMN     "row" INTEGER NOT NULL,
ALTER COLUMN "column" SET DATA TYPE TEXT;
