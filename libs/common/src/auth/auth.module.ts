import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

@Module({
//   imports: [RmqModule.register({ name: AUTH_SERVICE })],
//   exports: [RmqModule],
})
export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(ChecksumMiddleware)
//       .exclude(
//         { path: 'auth/login', method: RequestMethod.ALL },
//         { path: 'user/register', method: RequestMethod.ALL },
//       )
//       .forRoutes('*');
//   }
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply()
      .forRoutes('*');
  }
}