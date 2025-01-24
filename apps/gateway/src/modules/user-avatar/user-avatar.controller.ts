import { Controller, Post, Get, UploadedFile, UseInterceptors, Body, Param } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { Logger } from '@nestjs/common';
import { UserAvatarService } from './user-avatar.service';
class UpdateAvatarDto {
  username: string;
}

@Controller('user-avatar')
export class UserAvatarController {
  private readonly logger = new Logger(UserAvatarController.name);

  constructor(private readonly userAvatarService: UserAvatarService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('avatar'))
  async uploadAvatar(
    @UploadedFile() file: Express.Multer.File,
    @Body() updateAvatarDto: UpdateAvatarDto
  ) {

    this.logger.log(`Received upload avatar request: ${JSON.stringify(updateAvatarDto)}, file size: ${file.size}`);

    return this.userAvatarService.uploadAvatar({
      username: updateAvatarDto.username,
      file: file
    });
  }

  @Get('get-avatar/:username')
  async getAvatar(@Param('username') username: string) {
    this.logger.log(`Received get avatar request for user ${username}`);
    const result = await this.userAvatarService.getAvatar(username);
    this.logger.log(`Get avatar result: ${JSON.stringify(result)}`);
    return result;
  }
}
