import { Module } from '@nestjs/common';
import { MailService } from './Mail.service';
import { TemplateModule } from '../templates/Template.module';

@Module({
  imports: [TemplateModule],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
