import { Prop, Schema } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

@Schema()
export class AbstractDocument {
  @Prop({ type: SchemaTypes.ObjectId })
  // @Prop()
  _id: string;
}
