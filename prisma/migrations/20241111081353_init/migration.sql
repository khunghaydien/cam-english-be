-- CreateEnum
CREATE TYPE "ELevel" AS ENUM ('FOUNDATION', 'ADVANCED', 'INTERMEDIATE');

-- CreateEnum
CREATE TYPE "EChannel" AS ENUM ('ONLY_ME', 'SOLO_LEARN', 'ALL_ARE_WELCOME');

-- CreateEnum
CREATE TYPE "ELanguage" AS ENUM ('ENGLISH', 'VIETNAMESE', 'CHINESE', 'SPANISH', 'FRENCH', 'GERMAN', 'JAPANESE', 'KOREAN', 'RUSSIAN', 'ITALIAN', 'PORTUGUESE', 'ARABIC', 'THAI', 'MALAY', 'HINDI', 'BENGALI', 'URDU', 'PERSIAN', 'TURKISH', 'POLISH');

-- CreateTable
CREATE TABLE "Channel" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "level" "ELevel" NOT NULL,
    "type" "EChannel" NOT NULL,
    "language" "ELanguage" NOT NULL,

    CONSTRAINT "Channel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Channel_name_key" ON "Channel"("name");

-- CreateIndex
CREATE INDEX "Channel_name_idx" ON "Channel"("name");
