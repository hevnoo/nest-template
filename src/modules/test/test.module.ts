import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TestController } from './test.controller';
import { TestService } from './test.service';
import { TestMiddleware } from './test.middleware';

@Module({
  controllers: [TestController],
  providers: [TestService],
  exports: [TestService], //导出服务即可在其他模块访问
})
// export class TestModule {}
export class TestModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TestMiddleware).forRoutes('*');
  }
}
