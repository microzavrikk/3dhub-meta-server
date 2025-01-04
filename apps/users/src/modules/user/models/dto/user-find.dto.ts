import { IsOptional, IsString, IsUUID } from 'class-validator';

export class UserFindDto {
  @IsUUID()
  @IsOptional()
  id?: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  username?: string;
}