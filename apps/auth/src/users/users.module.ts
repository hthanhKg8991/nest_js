import { MongooseModule } from "@nestjs/mongoose";
import { Users, UsersSchema } from "./schema/users.schema";
import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { UsersRepository } from "./users.repository";
import { DatabaseModule, Status, StatusSchema } from "@app/common";
import { LanguagesModule } from "@app/common/i18n/lang.module";


@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Users.name,
                schema: UsersSchema,
            },
            { name: Status.name, schema: StatusSchema },
        ]),
    ],
    controllers: [UsersController],
    providers: [
        UsersService, UsersRepository
    ],
    exports:[UsersService]
})
export class UsersModule { }
