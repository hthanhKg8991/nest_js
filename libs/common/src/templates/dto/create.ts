import { IsString } from "class-validator";

export class CreateTemplateDto {
  @IsString()
  name: string;

  @IsString()
  template: string;

  @IsString({ each: true })
  requiredFields: Array<string>;
}