import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { DatabaseModule, RmqModule } from '@app/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrdersRepository } from './order.repository';
import { Orders, OrdersSchema } from './schemas/order.schema';
import { LanguagesModule } from '@app/common/i18n/lang.module';
import { BILLING_SERVICE } from '../constants/services';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        APP_PORT: Joi.number().required()
      }),
      envFilePath:'./apps/orders/.env'
    }),
    DatabaseModule,
    MongooseModule.forFeature([
      {name: Orders.name, schema: OrdersSchema}
    ]),
    LanguagesModule,
    RmqModule.register({
      name: BILLING_SERVICE,
    }),
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository],
})
export class OrdersModule {}
