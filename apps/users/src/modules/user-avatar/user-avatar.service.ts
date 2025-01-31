import { Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ProfileService } from '../profile/profile.service';

@Injectable()
export class UserAvatarService {
  private readonly logger = new Logger(UserAvatarService.name);

  constructor(
    @Inject('STORAGE_SERVICE') private readonly storageClient: ClientProxy,
    private readonly profileService: ProfileService
  ) {}

  async uploadAvatar(data: { username: string, file: Express.Multer.File }) {
    try {
      this.logger.log(`Sending upload avatar request to storage service for user: ${data.username}`);
      const result = await firstValueFrom(
        this.storageClient.send({ cmd: 'storage.upload-avatar' }, data)
      );
      const avatarUrl = await firstValueFrom(
        this.storageClient.send({ cmd: 'storage.get-avatar' }, data.username)
      );
      this.logger.log(`Avatar uploaded successfully for user: ${avatarUrl}`);
      await this.profileService.setAvatarUrl(data.username, avatarUrl);
      return result;
    } catch (error: any) {
      this.logger.error(`Error uploading avatar: ${error.message}`);
      throw error;
    }
  }

  async uploadBanner(data: { username: string, file: Express.Multer.File }) {
    try {
      this.logger.log(`Sending upload avatar request to storage service for user: ${data.username}`);
      const result = await firstValueFrom(
        this.storageClient.send({ cmd: 'storage.upload-banner' }, data)
      );
      const bannerUrl = await firstValueFrom(
        this.storageClient.send({ cmd: 'storage.get-banner' }, data.username)
      );
      this.logger.log(`Banner uploaded successfully for user: ${bannerUrl}`);
      await this.profileService.setBackgroundUrl(data.username, bannerUrl);
      return result;
    } catch (error: any) {
      this.logger.error(`Error uploading avatar: ${error.message}`);
      throw error;
    }
  }

  async getBanner(username: string) {
    try {
      const result = await this.storageClient.send({ cmd: 'storage.get-banner' }, username).toPromise();
      return result;
    } catch (error: any) {
      this.logger.error(`Error getting banner: ${error.message}`);
      throw error;
    }
  }

  async getAvatar(username: string) {
    try {
      const result = await this.storageClient.send({ cmd: 'storage.get-avatar' }, username).toPromise();
      return result;
    } catch (error: any) {
      this.logger.error(`Error getting avatar: ${error.message}`);
      throw error;
    }
  }
}
