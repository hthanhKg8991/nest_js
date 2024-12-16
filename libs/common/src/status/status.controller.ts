import { Controller } from "@nestjs/common";
import { AppConfig } from "../config/appConfig";
import { ConfigService } from "@nestjs/config";
import { StatusService } from "./status.service";

@Controller('status')
export class StatusController {
    constructor(
        private userService: StatusService,
        private configService: ConfigService<AppConfig>,
    ) { }

}
