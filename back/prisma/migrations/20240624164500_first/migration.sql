-- CreateEnum
CREATE TYPE "Role" AS ENUM ('user', 'loader', 'foreman', 'dispatcher');

-- CreateEnum
CREATE TYPE "Experience" AS ENUM ('newbie', 'experienced', 'veteran');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('created', 'pending', 'inProgress', 'completed');

-- CreateEnum
CREATE TYPE "TypeWork" AS ENUM ('moving', 'construction', 'rigging');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "telegramId" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "userAvatar" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isBlocked" BOOLEAN NOT NULL DEFAULT false,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "profileFilled" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "telegramId" TEXT,
    "phone" TEXT,
    "fullName" TEXT,
    "userAvatar" TEXT,
    "role" "Role" NOT NULL DEFAULT 'user',
    "experience" "Experience" NOT NULL DEFAULT 'newbie',
    "rating" INTEGER NOT NULL DEFAULT 5,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "authorId" TEXT NOT NULL,
    "authorName" TEXT NOT NULL,
    "startTime" TEXT NOT NULL,
    "typeWork" "TypeWork" NOT NULL DEFAULT 'moving',
    "numExecutors" INTEGER NOT NULL DEFAULT 1,
    "address" TEXT,
    "text" TEXT NOT NULL,
    "hourCost" INTEGER NOT NULL DEFAULT 500,
    "hourCount" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" "OrderStatus" NOT NULL DEFAULT 'created',

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderPossibleExecutor" (
    "orderId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "OrderPossibleExecutor_pkey" PRIMARY KEY ("orderId","userId")
);

-- CreateTable
CREATE TABLE "OrderExecutor" (
    "orderId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "startTime" TIMESTAMP(3),
    "endTime" TIMESTAMP(3),
    "numHours" TEXT,
    "title" TEXT,
    "comment" TEXT,

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
ALTER TABLE "OrderPossibleExecutor" ADD CONSTRAINT "OrderPossibleExecutor_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderPossibleExecutor" ADD CONSTRAINT "OrderPossibleExecutor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("telegramId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderExecutor" ADD CONSTRAINT "OrderExecutor_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderExecutor" ADD CONSTRAINT "OrderExecutor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("telegramId") ON DELETE RESTRICT ON UPDATE CASCADE;
