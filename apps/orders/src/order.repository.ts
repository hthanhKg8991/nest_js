import { AbstractRepository } from "@app/common";
import { Injectable, Logger } from "@nestjs/common";
import { Orders } from "./schemas/order.schema";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connection, Model } from "mongoose";
import { CreateOrderRequest } from "./dto/order.request.dto";

@Injectable()
export class OrdersRepository extends AbstractRepository<Orders> {
    protected readonly logger = new Logger(OrdersRepository.name);
    constructor(
        @InjectModel(Orders.name) orderModel: Model<Orders>,
        @InjectConnection() connection: Connection,
    ) {
        super(orderModel, connection);
    }
}