import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { isEmpty } from 'lodash';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from 'apps/auth/src/auth.service';
import { AppConfig } from '@app/common';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  [x: string]: any;
  constructor(
    private configService: ConfigService<AppConfig>,
    private authService: AuthService,
    private readonly i18n: I18nService,

  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    })
  }

  async validate(payload: any) {
    const statusPermiSsion = ['DELETE', 'BLOCK'];
    const user = await this.authService.findOne({ filter: { _id: payload.sub }, populate: [{ path: 'status', select: 'code name' }] })
    const { status, _id } = user.toObject();
    if (!user || isEmpty(user.refreshToken)) {
      throw new UnauthorizedException('User not found');
    }
    if (statusPermiSsion.includes(status.code)) {
      throw new UnauthorizedException(this.i18n.translate('lang.auth.please_contact_admin', { lang: I18nContext.current().lang }));
    } else {
      return {
        id: 1,
        ...payload,
        status: 200
      }
    }
  }
}
