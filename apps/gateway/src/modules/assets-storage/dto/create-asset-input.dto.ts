import { IsString, IsOptional, IsInt, IsBoolean, IsArray, IsJSON } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAssetDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: Express.Multer.File;

  @ApiProperty()
  name: string;

  @IsOptional()
  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty()
  category: string;

  @ApiProperty()
  fileKey: string;

  @ApiProperty()
  bucketName: string;

  @ApiProperty()
  fileSize: number;

  @ApiProperty()
  fileType: string;

  @ApiProperty({ type: [String] })
  tags: string[];

  @ApiProperty()
  ownerId: string;

  @IsOptional()
  @ApiProperty({ required: false })
  publicAccess?: boolean;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  thumbnailUrl?: string;

  @IsOptional()
  @ApiProperty({ required: false })
  metadata?: any;
}