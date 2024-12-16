import { EApiVersion } from '@app/common/config/api.version.config';
import { DefaultPost } from '@app/common/config/method.config';
import { Request, Controller, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersRequestDTO } from './users/dto/users.dto';
import { LocalAuthGuard } from '../guard/local.auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @DefaultPost(`${EApiVersion.V1}/login`)
  login(@Request() req: UsersRequestDTO){
    return this.authService.login(req)
    // return body;
  }
}
