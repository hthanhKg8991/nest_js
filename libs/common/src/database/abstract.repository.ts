import { Logger, NotFoundException } from '@nestjs/common';
import {
  FilterQuery,
  Model,
  Types,
  UpdateQuery,
  SaveOptions,
  Connection,
  QuerySelector,
} from 'mongoose';
import { BaseSchema } from '../base/base.schema';

export abstract class AbstractRepository<TDocument extends BaseSchema> {
  protected abstract readonly logger: Logger;

  constructor(
    protected readonly model: Model<TDocument>,
    private readonly connection: Connection,
  ) { }

  async create(
    document: Omit<TDocument, '_id'>,
    options?: SaveOptions,
  ): Promise<TDocument> {
    const createdDocument = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });
    return (
      await createdDocument.save(options)
    ).toJSON() as unknown as TDocument;
  }

  async findOne({
    query = {},
    filter = {},
    populate=null,
  }: { query?: QuerySelector<TDocument>; filter?: FilterQuery<TDocument>, populate?: any } = {}) {
    const queryBuilder = this.model.findOne(filter).select(query);
    if (populate) {
      queryBuilder.populate(populate);
    }
    return await queryBuilder.exec();
  }


  // async findOne({
  //   query = {},
  //   filter = {},
  //   populate=null,
  // }): Promise<FilterQuery<TDocument>> {
  //   const document = await this.model.findOne(filterQuery, {}, { lean: true });

  //   if (!document) {
  //     this.logger.warn('Document not found with filterQuery', filterQuery);
  //     throw new NotFoundException('Document not found.');
  //   }

  //   return document;
  // }

  async findOneAndUpdate(
    filterQuery: FilterQuery<TDocument>,
    update: UpdateQuery<TDocument>,
  ) {
    const document = await this.model.findOneAndUpdate(filterQuery, update, {
      lean: true,
      new: true,
    });

    if (!document) {
      this.logger.warn(`Document not found with filterQuery:`, filterQuery);
      throw new NotFoundException('Document not found.');
    }

    return document;
  }

  async upsert(
    filterQuery: FilterQuery<TDocument>,
    document: Partial<TDocument>,
  ) {
    return this.model.findOneAndUpdate(filterQuery, document, {
      lean: true,
      upsert: true,
      new: true,
    });
  }

  async find(filterQuery: FilterQuery<TDocument>) {
    return this.model.find(filterQuery, {}, { lean: true });
  }

  async startTransaction() {
    const session = await this.connection.startSession();
    session.startTransaction();
    return session;
  }
}
