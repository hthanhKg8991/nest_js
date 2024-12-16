import { Prop, Schema } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import * as moment from 'moment';

@Schema()
export class BaseSchema {
  @Prop({ type: SchemaTypes.ObjectId })
  _id: string;

  @Prop({ required: false, default: 'Admin' })
  creator?: string;
  
  @Prop({ type: SchemaTypes.Date,    default: moment().toDate(),
  })
  create_at?: Date;

  @Prop({ type: SchemaTypes.Date,    default: moment().toDate(),
  })
  update_at?: Date;
}
