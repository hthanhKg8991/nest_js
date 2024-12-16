import { AbstractRepository } from "@app/common";
import { Injectable, Logger } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connection, Model } from "mongoose";
import { Status } from "./schema/status.schema";

@Injectable()
export class StatusRepository extends AbstractRepository<Status>{
    protected readonly logger = new Logger(StatusRepository.name);
    constructor(
        @InjectModel(Status.name) statusModel: Model<Status>,
        @InjectConnection() connection: Connection
    ){
        super(statusModel, connection)
    }
}