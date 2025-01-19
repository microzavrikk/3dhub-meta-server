import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from './user.entity'
import { EMAIL_TEMPLATE } from './templates/email.template';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: User, token: string) {
    const url = `${process.env.HOST_URL}.com/auth/confirm?token=${token}`;
    const logoUrl = 'https://your-domain.com/path-to-logo.png';

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Welcome to 3DHUB! Confirm your Email',
      html: EMAIL_TEMPLATE(user, url, logoUrl),
    });
  }
}
