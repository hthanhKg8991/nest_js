import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderRequest } from './dto/order.request.dto';
import { OrdersRepository } from './order.repository';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { BILLING_SERVICE } from '../constants/services';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class OrdersService {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    @Inject(BILLING_SERVICE) private billingClient: ClientProxy,
    private readonly i18n: I18nService,

  ) {}
  
  getHello(): string {
    return this.i18n.t('lang.auth.notFound', {
      lang: I18nContext.current().lang,
    });
  }
  

  async createOrder(request: CreateOrderRequest) {
    // const session = await this.ordersRepository.startTransaction();
    try {
      const order = await this.ordersRepository.create(request);
      await lastValueFrom(
        this.billingClient.emit('order_created', {
          request,
        }),
      );
      // await session.commitTransaction();
      return order;
    } catch (err) {
      console.log('ThanhNguyen:: createOrder::err', err);
      // await session.abortTransaction();
      throw err;
    }
  }

  async getOrders() {
    return this.ordersRepository.find({});
  }
}
