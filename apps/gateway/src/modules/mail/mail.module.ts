import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailService } from './mail.service';
import { Global, Module } from '@nestjs/common';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
    imports: [
        MailerModule.forRootAsync({
            useFactory: async (config: ConfigService) => ({
                transport: {
                    host: process.env.SMTP_HOST || 'localhost',
                    port: parseInt(process.env.SMTP_PORT || '587'),
                    secure: false,
                    auth: {
                        user: process.env.SMTP_USER || '',
                        pass: process.env.SMTP_PASSWORD || '',
                    }
                },
                defaults: {
                    from: '"[3DHUB] Email Confirmation" <support@3dhub.com>'
                }
            })
        })
    ],
    controllers: [],
    providers: [MailService],
    exports: [MailService]
})
export class MailModule { }