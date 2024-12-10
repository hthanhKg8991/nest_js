import { Injectable } from "@nestjs/common";
import { Strategy } from 'passport-local';
import { PassportStrategy } from "@nestjs/passport";
import { AuthService } from "apps/auth/src/auth.service";
import { promises } from "dns";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(
        private authService: AuthService
    ) {
        super({
            usernameField: 'email',
            passwordField: 'password'
        })
    }

    async validate(email: string, password: string): Promise<any>{
        console.log('ThanhNguyen:: email', email);
        console.log('ThanhNguyen:: password', password);
        const result  =  await this.authService.getHello()
        return result;
    }
}