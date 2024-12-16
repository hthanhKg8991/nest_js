import { BaseServices } from '@app/common/base/base.services';
import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
  Request,
  UnauthorizedException
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as argon from 'argon2';
import { Model } from 'mongoose';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { Users, UsersDocument } from './users/schema/users.schema';
import { plainToInstance } from 'class-transformer';
import { UserResponseDTO } from './users/dto/users.dto';
import { JwtService } from '@nestjs/jwt';
import refreshJwtConfig from '../configs/Refresh-jwt.config';
import { ConfigType } from '@nestjs/config';
import HeaderRequest from '@app/common/config/header.request';
import * as moment from 'moment';
import { BaseResponseError, BaseResponseSuccess } from '@app/common/exceptions/Base.exception';
import { BaseResponse } from '@app/common/base/base.response';

@Injectable()
export class AuthService extends BaseServices<UsersDocument> {
  constructor(
    @InjectModel(Users.name) 
    private usersModel: Model<UsersDocument>,
    private readonly i18n: I18nService,
    private jwtService: JwtService,
    @Inject(refreshJwtConfig.KEY)
    private refreshTokenConfig: ConfigType<typeof refreshJwtConfig>

  ) {
    super(usersModel)
  }

  async login(@Request() req: any) {
    const requestBody =  await this.findOne({ filter: { email: req.body.email } });
    const user = plainToInstance(BaseResponse, requestBody);
    const { accessToken, refreshToken } = await this.generateTokens(user._id);
    const hashedRefreshToken = await argon.hash(refreshToken);
    
    let platform = await req.headers[HeaderRequest.XPlatform];

    await this.findByIdAndUpdate(user._id, { 
      refreshToken: hashedRefreshToken,
      platform: platform,
      last_login: moment().toDate(),
    });
    return BaseResponseSuccess(
      {
        accessToken,
        refreshToken,
      },
      "Login success",
    )
    return {
      accessToken,
      refreshToken,
    };
  }
  
  async generateTokens(userId: string) {
    const payload: any = { sub: userId };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.signAsync(payload, this.refreshTokenConfig),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.findOne({ filter: { email: email }});

    if (!user) return BaseResponseError(
      this.i18n.t('lang.auth.notFound', {
        lang: I18nContext.current().lang,
      }),
      HttpStatus.NOT_FOUND
    );
    const passwordMatched = await argon.verify(user.password, password);
    if (user !== null && passwordMatched) {
      const { password, ...rest } = user.toObject();
      return rest;
    } else {
      throw new NotFoundException(
        this.i18n.t('lang.auth.notFound', {
          lang: I18nContext.current().lang,
        }),
      );
    }
  }

  async validateRefreshToken(userId: string, refreshToken: string) {
    const user = await this.findOne({ filter: { _id: userId } });
    if (!user || !user.refreshToken)
      throw new UnauthorizedException('Invalid Refresh Token');

    const refreshTokenMatches = await argon.verify(
      user.refreshToken,
      refreshToken,
    );
    if (!refreshTokenMatches)
      throw new UnauthorizedException('Invalid Refresh Token');

    return { id: userId };
  }
}
