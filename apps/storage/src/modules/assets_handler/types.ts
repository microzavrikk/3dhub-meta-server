import { Express } from 'express';

export type Asset = {
  id: string;
  name: string;
  description?: string;
  category: string
  fileKey: string;
  bucketName: string;
  fileSize: number;
  fileType: string;
  uploadDate: Date;
  updatedAt: Date;
  tags: string[];
  ownerId: string;
  publicAccess: boolean;
  thumbnailUrl?: string;
  metadata?: Record<string, any>;
};

export interface CreateAssetDto {
  file: Express.Multer.File;
  newAsset: {
    username: string;
    name: string;
    description: string;
    category: string;
    fileKey: string;
    bucketName: string;
    fileSize: string | number;
    fileType: string;
    tags: string[] | string;
    ownerId: string;
    publicAccess: boolean | string;
    thumbnailUrl?: string;
    metadata?: any;
  };
}

export type UpdateAssetDto = {
  id: string;
  newAsset: {
    name?: string;
    description?: string;
    fileKey?: string;
    bucketName?: string;
    fileSize?: string | number;
    fileType?: string;
    tags?: string[] | string;
    ownerId?: string;
    publicAccess?: boolean | string;
    thumbnailUrl?: string;
    metadata?: any;
  };
};

export type AssetCategory = {
  category: string;
};

export interface S3UploadDto {
  file: Express.Multer.File;
  name: string;
  category: string;
  fileKey: string;
  // ... другие необходимые поля
}