-- DropForeignKey
ALTER TABLE "Token" DROP CONSTRAINT "Token_userId_fkey";

-- CreateTable
CREATE TABLE "BookingQueue" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "startPoint" TEXT NOT NULL,
    "endPoint" TEXT NOT NULL,
    "availableSeatsCount" INTEGER NOT NULL,
    "autoBooking" BOOLEAN NOT NULL,

    CONSTRAINT "BookingQueue_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingQueue" ADD CONSTRAINT "BookingQueue_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
