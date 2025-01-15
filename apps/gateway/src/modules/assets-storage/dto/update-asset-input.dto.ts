// create-asset.dto.ts
import { IsString, IsOptional, IsInt, IsBoolean, IsArray, IsJSON } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform as TransformDecorator } from 'class-transformer';

export class CreateAssetDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: Express.Multer.File;

  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  description?: string;

  @IsString()
  @ApiProperty()
  category: string;

  @IsString()
  @ApiProperty()
  fileKey: string;

  @IsString()
  @ApiProperty()
  bucketName: string;

  @IsInt()
  @TransformDecorator(({ value }) => parseInt(value, 10))
  @ApiProperty()
  fileSize: number;

  @IsString()
  @ApiProperty()
  fileType: string;

  @IsArray()
  @TransformDecorator(({ value }) => {
    try {
      return typeof value === 'string' ? JSON.parse(value) : value;
    } catch {
      return value;
    }
  })
  @ApiProperty({ type: [String] })
  tags: string[];

  @IsString()
  @ApiProperty()
  ownerId: string;

  @IsBoolean()
  @IsOptional()
  @TransformDecorator(({ value }) => {
    if (typeof value === 'string') {
      return value.toLowerCase() === 'true';
    }
    return value;
  })
  @ApiProperty({ required: false })
  publicAccess?: boolean;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  thumbnailUrl?: string;

  @IsJSON()
  @IsOptional()
  @TransformDecorator(({ value }) => {
    try {
      return typeof value === 'string' ? JSON.parse(value) : value;
    } catch {
      return value;
    }
  })
  @ApiProperty({ required: false })
  metadata?: any;
}