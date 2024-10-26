/*
  Warnings:

  - Added the required column `isActive` to the `BookingQueue` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BookingQueue" ADD COLUMN     "isActive" BOOLEAN NOT NULL;
