import { Body, Injectable } from '@nestjs/common';
import { UsersService } from './users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService
  ) { }

  getHello(): string {
    return 'Hello World!';
  }

  async login(@Body() body: any){
    console.log('ThanhNguyen:: login:: req', body);
    const reqBody = await this.userService.validateUser(body.email)
    return reqBody;
  }
}
