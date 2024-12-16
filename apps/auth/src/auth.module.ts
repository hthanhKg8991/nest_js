import { DatabaseModule } from '@app/common';
import { LanguagesModule } from '@app/common/i18n/lang.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtConfig } from '../configs/Jwt.config';
import refreshJwtConfig from '../configs/Refresh-jwt.config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Users, UsersSchema } from './users/schema/users.schema';
import { LocalStrategy } from '../strategies/local.strategy';
import { JwtStrategy } from '../strategies/jwt.strategy';
import { RefreshTokenStrategy } from '../strategies/refresh-jwt.strategy';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/users.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Users.name,
        discriminators: [
          //   { name: UserLocal.name, schema: UserLocalSchema },
        ],
        schema: UsersSchema,
      },
    ]),
    UsersModule,
    DatabaseModule,
    LanguagesModule,
    JwtModule.registerAsync(JwtConfig.asProvider()),
    ConfigModule.forFeature(refreshJwtConfig),
    PassportModule,

  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, RefreshTokenStrategy ],
  exports:[AuthService]
})
export class AuthModule {}
