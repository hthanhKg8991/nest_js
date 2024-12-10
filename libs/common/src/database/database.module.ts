import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppConfig,  } from '@app/common';
import AppConfigLoader from '@config/appConfig';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [AppConfigLoader],
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService<AppConfig>) => {
        console.log('ThanhNguyen:: configService.get<string>', configService.get<string>('MONGODB_URI'));
        return{
          uri: configService.get<string>('MONGODB_URI'),
        }
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
