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

export type CreateAssetDto = {
  file: Express.Multer.File;
  name: string;
  description?: string;
  category: string
  fileKey: string;
  bucketName: string;
  fileSize: number;
  fileType: string;
  tags: string[];
  ownerId: string;
  publicAccess?: boolean;
  thumbnailUrl?: string;
  metadata?: Record<string, any>;
};

export type UpdateAssetDto = Partial<CreateAssetDto> & {
  id: string;
};

export type AssetCategory = {
  category: string;
};