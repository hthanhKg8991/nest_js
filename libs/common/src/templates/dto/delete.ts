import { IsString } from "class-validator";

export class DeleteTemplateQuery {
  @IsString({
    each: true
  })
  
  templateIds: Array<string>;
}
