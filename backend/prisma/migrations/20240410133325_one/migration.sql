-- CreateEnum
CREATE TYPE "Role" AS ENUM ('user', 'loader', 'foreman', 'admin');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('created', 'inProgress', 'completed');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "telegramId" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "root" BOOLEAN NOT NULL DEFAULT false,
    "profileFilled" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "telegramId" TEXT NOT NULL,
    "fullName" TEXT,
    "phone" TEXT,
    "userAvatar" TEXT,
    "role" "Role" NOT NULL DEFAULT 'user',
    "rating" INTEGER NOT NULL DEFAULT 5,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "createdBy" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "address" TEXT,
    "numExecutors" INTEGER NOT NULL DEFAULT 1,
    "hourCost" INTEGER NOT NULL DEFAULT 500,
    "hourCount" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "potentialExecutors" TEXT[],
    "status" TEXT NOT NULL DEFAULT 'created',

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderExecutor" (
    "orderId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "OrderExecutor_pkey" PRIMARY KEY ("orderId","userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_telegramId_key" ON "User"("telegramId");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_telegramId_key" ON "Profile"("telegramId");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_phone_key" ON "Profile"("phone");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderExecutor" ADD CONSTRAINT "OrderExecutor_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderExecutor" ADD CONSTRAINT "OrderExecutor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("telegramId") ON DELETE RESTRICT ON UPDATE CASCADE;
