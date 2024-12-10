import { MongooseModule } from "@nestjs/mongoose";
import { Users, UsersSchema } from "./schema/users.schema";
import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { UsersRepository } from "./users.repository";
import { DatabaseModule } from "@app/common";


@Module({
    imports: [
        DatabaseModule,
        MongooseModule.forFeature([
            {
                name: Users.name,
                schema: UsersSchema,
            }
        ]),
    ],
    controllers: [UsersController],
    providers: [
        UsersService, UsersRepository
    ],
    exports:[UsersService]
})
export class UsersModule { }
