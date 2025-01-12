/*
  Warnings:

  - You are about to drop the `Model3D` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Model3D";

-- CreateTable
CREATE TABLE "ThirdModel" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "fileKey" TEXT NOT NULL,
    "bucketName" TEXT NOT NULL,
    "fileSize" INTEGER NOT NULL,
    "fileType" TEXT NOT NULL,
    "uploadDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tags" TEXT[],
    "ownerId" TEXT NOT NULL,
    "publicAccess" BOOLEAN NOT NULL DEFAULT false,
    "thumbnailUrl" TEXT,
    "metadata" JSONB,

    CONSTRAINT "ThirdModel_pkey" PRIMARY KEY ("id")
);
