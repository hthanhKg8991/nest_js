import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TemplateService } from '../templates/Template.service';
import { createTransport, Transporter } from 'nodemailer';
import { SendMailDto } from './dto/SendMail.dto';
import { AppConfig } from '../config/appConfig';

@Injectable()
export class MailService {
  private core: Transporter;
  constructor(
    private configService: ConfigService<AppConfig>,
    private templateService: TemplateService,
  ) {
    this.core = createTransport({
      host: this.configService.get('smtpHost'),
      port: this.configService.get('smtpPort'),
      secure: this.configService.get('smtpSecure'),
      auth: {
        user: this.configService.get('mailUser'),
        pass: this.configService.get('mailPassword'),
      },
      logger: true,
      debug: true,
      // tls: {
      //     rejectUnauthorized: false // (Tùy chọn) Bỏ qua xác thực chứng chỉ nếu cần
      // }
    });
  }

  async sendMail(data: SendMailDto) {
    const html = await this.templateService.compile(
      {
        name: data.templateName,
      },
      data.metadata,
    );
    let sendMailResult = this.core.sendMail({
      from: this.configService.get('mailUser'),
      to: data.to,
      subject: data.subject,
      html,
    });
    if(sendMailResult) 
      return {
      status: 200
    }
    throw new Error('Error');
  }
}
