import { CanActivate, ExecutionContext } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport"

export class JwtAuthGuard extends AuthGuard('jwt'){
    // async canActivate(context: ExecutionContext) {
    //     const request = context.switchToHttp().getRequest();
    //     console.log('ThanhNguyen:: JwtAuthGuard', request.header);
    //     // return request.isAuthenticated();
    //     return true;
    //   }
}