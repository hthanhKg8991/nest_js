import { EApiVersion } from '@app/common/config/api.version.config';
import { DefaultPost } from '@app/common/config/method.config';
import { LocalAuthGuard } from '@app/common/guard/local.auth.guard';
import { Body, Controller, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersRequestDTO } from './users/dto/users.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getHello(): string {
    return this.authService.getHello();
  }

  @UseGuards(LocalAuthGuard)
  @DefaultPost(`${EApiVersion.V1}/login`)
  login(@Body() body: UsersRequestDTO){
    console.log('ThanhNguyen:: body', body);
    return this.authService.login(body)
    // return body;
  }
}
