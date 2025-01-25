import { IsString, IsOptional, IsInt, IsBoolean, IsArray, IsJSON } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAssetDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: Express.Multer.File;

  @ApiProperty()
  titleName: string;
  @ApiProperty()
  name: string;

  @IsOptional()
  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty()
  category: string;

  @ApiProperty({ type: [String] })
  tags: string[];

  @ApiProperty()
  ownerId: string;

  @IsOptional()
  @ApiProperty({ required: false })
  publicAccess?: boolean;
}