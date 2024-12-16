import { Pagination } from "@app/common/base/Pagination.response";
import { IsObject, IsString } from "class-validator";

export class GetAllTemplateQuery extends Pagination { }

export class GetOneTemplateParams {
  @IsString()
  templateId: string;
}

export class ViewTemplateParams {
  @IsString()
  templateId: string;
}

export class ViewTemplateBody {
  @IsObject()
  metadata: Record<string, any>;
}