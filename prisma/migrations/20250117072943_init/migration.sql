-- CreateEnum
CREATE TYPE "Level" AS ENUM ('FOUNDATION', 'INTERMEDIATE', 'ADVANCED');

-- CreateEnum
CREATE TYPE "SpeakingRoomType" AS ENUM ('ONLY_ME', 'SOLO_LEARN', 'ALL_ARE_WELCOME');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('MEMBER', 'ADMIN');

-- CreateEnum
CREATE TYPE "Language" AS ENUM ('ENGLISH', 'VIETNAMESE', 'CHINESE', 'SPANISH', 'FRENCH', 'GERMAN', 'JAPANESE', 'KOREAN', 'RUSSIAN', 'ITALIAN', 'PORTUGUESE', 'ARABIC', 'THAI', 'MALAY', 'HINDI', 'BENGALI', 'URDU', 'PERSIAN', 'TURKISH', 'POLISH');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'MEMBER',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserSpeakingRoom" (
    "id" TEXT NOT NULL,
    "participantId" TEXT NOT NULL,
    "speakingRoomId" TEXT NOT NULL,

    CONSTRAINT "UserSpeakingRoom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SpeakingRoom" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "level" "Level" NOT NULL,
    "type" "SpeakingRoomType" NOT NULL,
    "language" "Language" NOT NULL,
    "hostId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SpeakingRoom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Expense" (
    "id" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "authorId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Expense_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_name_idx" ON "User"("name");

-- CreateIndex
CREATE UNIQUE INDEX "UserSpeakingRoom_participantId_speakingRoomId_key" ON "UserSpeakingRoom"("participantId", "speakingRoomId");

-- CreateIndex
CREATE UNIQUE INDEX "SpeakingRoom_name_key" ON "SpeakingRoom"("name");

-- CreateIndex
CREATE INDEX "SpeakingRoom_name_idx" ON "SpeakingRoom"("name");

-- CreateIndex
CREATE INDEX "Expense_description_idx" ON "Expense"("description");

-- AddForeignKey
ALTER TABLE "UserSpeakingRoom" ADD CONSTRAINT "UserSpeakingRoom_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSpeakingRoom" ADD CONSTRAINT "UserSpeakingRoom_speakingRoomId_fkey" FOREIGN KEY ("speakingRoomId") REFERENCES "SpeakingRoom"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpeakingRoom" ADD CONSTRAINT "SpeakingRoom_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
