import { DatabaseModule, LocalStrategy } from '@app/common';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from './users/users.module';
import { LanguagesModule } from '@app/common/i18n/lang.module';

@Module({
  imports: [
    UsersModule,
    DatabaseModule,
    LanguagesModule
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy ],
})
export class AuthModule {}
