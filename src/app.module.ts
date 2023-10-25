import { APP_FILTER } from '@nestjs/core';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './modules/users/users.controller';
import { TestModule } from './modules/test/test.module';
import { UsersModule } from './modules/users/users.module';
// 注册全局范围的过滤器直接为任何模块设置过滤器
import { HttpExceptionFilter } from './common/filter/http-exception.filter';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { Users } from './config/models/users.model';
import { Article } from './config/models/article.model';

@Module({
  imports: [
    TestModule,
    UsersModule,
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'second_hand',
      autoLoadModels: true, // 自动加载模型
      synchronize: true, // 自动同步数据库
      models: [Users, Article], // 要开始使用`User`模型，我们需要通过将其插入到`forRoot()`方法选项的`models`数组中来让`Sequelize`知道它的存在。
    }),
    SequelizeModule.forFeature([Users, Article]), //在本模块中使用前需引入
  ],
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
