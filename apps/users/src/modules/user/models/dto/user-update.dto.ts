import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { Role } from 'apps/users/src/utils/prisma/types';

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  username?: string;

  @IsString()
  @MinLength(6)
  @IsOptional()
  password?: string;

  @IsOptional()
  isVerified?: boolean;

  @IsOptional()
  role?: Role;
}