import { Injectable } from '@nestjs/common';
import { CreateOrderRequest } from './dto/order.request.dto';
import { OrdersRepository } from './order.repository';

@Injectable()
export class OrdersService {
  billingClient: any;

  constructor(
    private readonly ordersRepository: OrdersRepository,
    // @Inject(BILLING_SERVICE) private billingClient: ClientProxy,
  ) {}
  
  getHello(): string {
    return 'Hello Service Order!';
  }
  

  async createOrder(request: CreateOrderRequest, authentication: string) {
    const session = await this.ordersRepository.startTransaction();
    try {
      const order = await this.ordersRepository.create(request, { session });
      // await lastValueFrom(
      //   this.billingClient.emit('order_created', {
      //     request,
      //     Authentication: authentication,
      //   }),
      // );
      await session.commitTransaction();
      return order;
    } catch (err) {
      await session.abortTransaction();
      throw err;
    }
  }

  async getOrders() {
    return this.ordersRepository.find({});
  }
}
