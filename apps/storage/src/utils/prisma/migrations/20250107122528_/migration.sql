-- CreateTable
CREATE TABLE "Model3D" (
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

    CONSTRAINT "Model3D_pkey" PRIMARY KEY ("id")
);
