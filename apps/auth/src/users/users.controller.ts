import { Body, Controller, Req, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { JwtAuthGuard } from "apps/auth/guard/jwt.auth.guard";
import { DefaultPost } from "@app/common/config/method.config";
import { EApiVersion } from "@app/common/config/api.version.config";
import Joi from "joi";

@Controller('users')
export class UsersController {
    constructor(
        private userService: UsersService
    ){}

    @UseGuards(JwtAuthGuard)
    @DefaultPost(`${EApiVersion.V1}/me`)
    async me(@Req() req: any, @Body() body: any) {
        const { query = {} } = body;
        let populate = [];
        if (query?.hasOwnProperty('status')) {
          populate = [...populate, { path: 'status', select: 'code name' }]
        }
        // if (query?.hasOwnProperty('role')) {
        //   populate = [...populate, { path: 'role', select: 'name' }]
        // }
        return await this.userService.getUserDetail(req.user.sub, body, populate);
      }
    
}