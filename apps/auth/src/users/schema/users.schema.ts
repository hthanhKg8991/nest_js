import { AbstractDocument } from "@app/common";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
/**
 * versionKey: false
 * __v
 */
@Schema({ versionKey: false }) 
export class Users extends AbstractDocument {
    @Prop()
    email: string;

    @Prop()
    password: string;
}
export const UsersSchema = SchemaFactory.createForClass(Users);
export const UsersCollection = 'Users';