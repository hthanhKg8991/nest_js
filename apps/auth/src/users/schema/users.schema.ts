import { BaseSchema } from "@app/common";
import { Status } from "@app/common";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as moment from "moment";
import { SchemaTypes, Types } from "mongoose";
/**
 * versionKey: false
 * __v
 */

export const enum Gender {
    MALE = "Male",
    FEMALE = "Female",
    OTHER = "Other",
}
export const enum UserSource {
    Local = 'UserLocal',
    Facebook = 'UserFacebook',
    Google = 'UserGoogle',
}

export type UsersDocument = Document & Users;

@Schema({ versionKey: false })
export class Users extends BaseSchema {
    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop({ required: false, default: '' })
    firstName?: string;

    @Prop({ required: false, default: '' })
    lastName?: string;

    @Prop({ required: false, default: '' })
    avatar?: string;

    @Prop({ required: false, default: Gender.OTHER })
    gender?: Gender;

    @Prop({ required: false, default: UserSource.Local })
    source: UserSource;

    @Prop()
    refreshToken?: string;

    @Prop({ required: false, default: '' })
    referralCode: string;

    @Prop({ required: false, default: false })
    skipReferral: boolean;

    @Prop({ required: false, default: '' })
    ipAddress?: string;

    @Prop()
    platform?: string;

    @Prop()
    deviceId?: string;

    @Prop({ required: true, type: Types.ObjectId, ref: 'Status' })
    status: Status;

    @Prop({ required: true, type: SchemaTypes.Date, default: moment().toDate() })
    last_login: Date;

}
export const UsersSchema = SchemaFactory.createForClass(Users);
export const UsersCollection = 'Users';