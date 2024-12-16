import { Exclude, Expose } from "class-transformer";

@Exclude()
export class BaseResponse {
  @Expose()
  _id: string;
}