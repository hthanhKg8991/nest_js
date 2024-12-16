import { IsObject, IsString } from 'class-validator';

export class SendMailDto {
  @IsString()
  to: string;

  @IsString()
  subject: string;

  @IsObject()
  metadata: object;

  @IsString()
  templateName: string;
}
