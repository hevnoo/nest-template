import { APP_FILTER } from '@nestjs/core';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './modules/users/users.controller';
import { TestModule } from './modules/test/test.module';
import { UsersModule } from './modules/users/users.module';
// 注册全局范围的过滤器直接为任何模块设置过滤器
import { HttpExceptionFilter } from './common/filter/http-exception.filter';
import { LoggerMiddleware } from './common/middleware/logger.middleware';

@Module({
  imports: [TestModule, UsersModule],
  controllers: [AppController, UsersController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
// export class AppModule {}
// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(LoggerMiddleware).forRoutes('test');
//   }
// }
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      //exclude排除的路径，这里排除cats路由
      .exclude(
        { path: 'cats', method: RequestMethod.GET },
        { path: 'cats', method: RequestMethod.POST },
        'cats/(.*)',
      )
      // '*'表示所有路由
      .forRoutes('*');
    // .forRoutes({ path: '*', method: RequestMethod.GET });
    // .forRoutes({ path: 'api/test/getData', method: RequestMethod.GET });
  }
}
