/*
  Warnings:

  - Added the required column `price` to the `ThirdModel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ThirdModel" ADD COLUMN     "price" DOUBLE PRECISION NOT NULL;
