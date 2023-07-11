/*
  Warnings:

  - Changed the type of `column` on the `Seats` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Seats" DROP COLUMN "column",
ADD COLUMN     "column" INTEGER NOT NULL,
ALTER COLUMN "row" SET DATA TYPE TEXT;
