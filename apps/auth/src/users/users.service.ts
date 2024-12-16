import { Injectable } from "@nestjs/common";
import { I18nService } from "nestjs-i18n";
import { Users, UsersDocument } from "./schema/users.schema";
import { UsersRepository } from "./users.repository";
import { BaseServices } from "@app/common/base/base.services";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserDetailResponseDTO, UserResponseDTO } from "./dto/users.dto";
import { plainToInstance } from "class-transformer";
import { BaseResponse } from "@app/common/base/base.response";
import { BaseRequest } from "@app/common/base/base.request";
import Joi from "joi";
import { BaseResponseError } from "@app/common/exceptions/Base.exception";

@Injectable()
export class UsersService extends BaseServices<UsersDocument>{
    constructor(
        @InjectModel(Users.name)
        private usersModel: Model<UsersDocument>,
        private readonly i18n: I18nService,
    ) {
        super(usersModel);
     }

    async getUserDetail(userId: string, body: BaseRequest, populate?: any) {
        const user = await this.findOne({ filter: { _id: userId }, query: body?.query, populate: populate });
        if (body?.query && Object.keys(body?.query).length > 0) {
            return plainToInstance(UserDetailResponseDTO, user.toObject());
        } else {
            return plainToInstance(BaseResponse, user);
        }
    }

    async getUser(getUserArgs: Partial<Users>) {
        const result = await this.usersModel.find(getUserArgs);
        return result;
    }
}