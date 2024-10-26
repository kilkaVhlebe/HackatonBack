/*
  Warnings:

  - Added the required column `startpoint_departure` to the `BookingQueue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `wagon_type` to the `BookingQueue` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BookingQueue" ADD COLUMN     "startpoint_departure" TEXT NOT NULL,
ADD COLUMN     "wagon_type" TEXT NOT NULL;
