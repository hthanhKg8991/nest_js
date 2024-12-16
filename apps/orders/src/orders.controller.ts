import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderRequest } from './dto/order.request.dto';

@Controller("orders")
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  getHello(): string {
    return this.ordersService.getHello();
  }

  @Post()
  async createOrder(@Body() request: CreateOrderRequest, @Req() req: any) {
    console.log('ThanhNguyen:: Body', request);
    return this.ordersService.createOrder(request);
  }
}
