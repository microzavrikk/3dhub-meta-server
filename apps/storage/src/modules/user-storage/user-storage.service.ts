import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserStorageS3Repository } from './user-storage.s3.repository';
@Injectable()
export class UserStorageService {
  private readonly logger = new Logger(UserStorageService.name);

  constructor(
    private readonly userStorageS3Repository: UserStorageS3Repository,
    private readonly configService: ConfigService
  ) {}

  async uploadAvatar(username: string, file: Express.Multer.File) {
    return this.userStorageS3Repository.uploadAvatar(username, file);
  }

  async getAvatar(username: string) {
    return this.userStorageS3Repository.getAvatar(username);
  }
}
