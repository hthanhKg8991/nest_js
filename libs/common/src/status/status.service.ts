import { Injectable } from "@nestjs/common";
import { StatusRepository } from "./status.repository";
import { plainToInstance } from "class-transformer";
import { CreateStatusRequest } from "./dto/Status.dto";

@Injectable()
export class StatusService {
    constructor(
        private readonly statusRepository: StatusRepository,
    ) {
    }
    async addStatus(body: CreateStatusRequest) {
        const params = {
            ...body,
          };
        const status = await this.statusRepository.create(params);
        console.log('ThanhNguyen:: status', status);
        // return plainToInstance(StatusCreate, status.toObject());
    }
}
