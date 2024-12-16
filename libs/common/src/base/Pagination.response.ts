import { mixin } from "@nestjs/common";
import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString, Min } from "class-validator";
type Constructor<T = {}> = abstract new (...args: any[]) => T;

export function PaginationResponseFactory<T extends Constructor>(
  Result: T
) {
  class Response extends PaginationResponse<T> {
    data: Array<T>;
  }
  return mixin(Response);
}

export class PaginationResponse<T> {

  total: number;

  page: number;

  limit: number;

  data: Array<T>;
}

export class Pagination {


  @IsNumber()
  @Type(() => Number)
  @Min(1)
  @IsOptional()
  page: number = 1;

  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @IsOptional()
  limit: number = 10;

  @IsString()
  @IsOptional()
  keyword: string = '';

  @IsString()
  @IsOptional()
  sort: string = '';
}

export class DeleteResponse {
  deleted: number;
}
