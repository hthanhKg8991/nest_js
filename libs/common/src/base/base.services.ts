import { FilterQuery, Model, QueryOptions, QuerySelector, UpdateQuery } from "mongoose";

export abstract class BaseServices<T extends Document> {
  constructor(public readonly model: Model<T>) { }

  async findByIdAndUpdate(id: any, data: UpdateQuery<T>, options?: QueryOptions<T>) {
    return await this.model.findByIdAndUpdate(id, data, options);
  }

  async findOne({
    query = {},
    filter = {},
    populate = null,
  }: { query?: QuerySelector<T>; filter?: FilterQuery<T>, populate?: any } = {}) {
    const queryBuilder = this.model.findOne(filter).select(query);
    if (populate) {
      queryBuilder.populate(populate);
    }
    return await queryBuilder.exec();
  }


  async deletePermanently(id: string[] | number): Promise<any> {
    return await this.model.findOneAndDelete({ _id: id })
  }

}