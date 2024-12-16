import { BaseSchema } from "@app/common";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Type } from "class-transformer";
import { Types } from "mongoose";
/**
 * versionKey: false
 * __v
 */
@Schema({ versionKey: false }) 
export class Status extends BaseSchema {

    @Prop({ required: true, default: 'PENDING' })
    code: string;

    @Prop({ required: true, default: 'pending' })
    name: string;

}
export const StatusSchema = SchemaFactory.createForClass(Status);
export const StatusCollection = 'Status';