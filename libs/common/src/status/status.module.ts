import { Module } from '@nestjs/common';
import { StatusController } from './status.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Status, StatusSchema } from './schema/status.schema';
import { StatusService } from './status.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Status.name,
        discriminators: [
          //   { name: UserLocal.name, schema: UserLocalSchema },
        ],
        schema: StatusSchema,
      },
    ]),
  ],
  exports: [StatusService],
  providers: [StatusService],
  controllers: [StatusController],
})
export class StatusModule { }
