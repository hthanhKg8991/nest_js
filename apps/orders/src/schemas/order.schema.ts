import { BaseSchema } from "@app/common";
import { BaseServices } from "@app/common/base/base.services";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
/**
 * versionKey: false
 * __v
 */
@Schema({ versionKey: false }) 
export class Orders extends BaseSchema {
    @Prop()
    name: string;

    @Prop()
    price: number;

    @Prop()
    phoneNumber: string;
}
export const OrdersSchema = SchemaFactory.createForClass(Orders);
export const OrdersCollection = 'Orders';