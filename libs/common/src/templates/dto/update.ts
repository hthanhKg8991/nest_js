import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class UpdateTemplateDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  template?: string;

  @ApiProperty()
  @IsString({ each: true })
  @IsOptional()
  requiredFields: Array<string>;
}
export class UpdateTemplateParams {
  @ApiProperty()
  @IsString()
  templateId: string;
}