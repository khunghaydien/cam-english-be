-- CreateEnum
CREATE TYPE "ELevel" AS ENUM ('FOUNDATION', 'ADVANCED', 'INTERMEDIATE');

-- CreateEnum
CREATE TYPE "EChannel" AS ENUM ('ONLY_ME', 'SOLO_LEARN', 'ALL_ARE_WELCOME');

-- CreateEnum
CREATE TYPE "ERole" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "ELanguage" AS ENUM ('ENGLISH', 'VIETNAMESE', 'CHINESE', 'SPANISH', 'FRENCH', 'GERMAN', 'JAPANESE', 'KOREAN', 'RUSSIAN', 'ITALIAN', 'PORTUGUESE', 'ARABIC', 'THAI', 'MALAY', 'HINDI', 'BENGALI', 'URDU', 'PERSIAN', 'TURKISH', 'POLISH');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "ERole" NOT NULL DEFAULT 'USER',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserChannel" (
    "id" TEXT NOT NULL,
    "participantId" TEXT NOT NULL,
    "channelId" TEXT NOT NULL,

    CONSTRAINT "UserChannel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Channel" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "level" "ELevel" NOT NULL,
    "type" "EChannel" NOT NULL,
    "language" "ELanguage" NOT NULL,
    "hostId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Channel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_name_idx" ON "User"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Channel_name_key" ON "Channel"("name");

-- CreateIndex
CREATE INDEX "Channel_name_idx" ON "Channel"("name");

-- AddForeignKey
ALTER TABLE "UserChannel" ADD CONSTRAINT "UserChannel_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserChannel" ADD CONSTRAINT "UserChannel_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Channel" ADD CONSTRAINT "Channel_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
