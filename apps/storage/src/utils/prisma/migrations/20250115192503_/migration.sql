/*
  Warnings:

  - Added the required column `category` to the `ThirdModel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ThirdModel" ADD COLUMN     "category" TEXT NOT NULL;
