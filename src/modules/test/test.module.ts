import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TestController } from './test.controller';
import { TestService } from './test.service';
import { TestMiddleware } from './test.middleware';
import { Users } from 'src/config/models/users.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  controllers: [TestController],
  providers: [TestService],
  exports: [TestService], //导出服务即被其他模块访问
  imports: [SequelizeModule.forFeature([Users])], // 确保service用@InjectRepository()装饰器将 UsersRepository 注入到 UsersService 中:
})
// export class TestModule {}
export class TestModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TestMiddleware).forRoutes('*');
  }
}
