import { Exclude, Expose } from "class-transformer";
import { FilterQuery, QuerySelector } from "mongoose";

@Exclude()
export class BaseRequest{
  @Expose()
  query?: QuerySelector<any>;
  @Expose()
  filter?: FilterQuery<any>;
}