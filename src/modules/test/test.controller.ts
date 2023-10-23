import {
  Controller,
  Get,
  Post,
  Query,
  Body,
  Req,
  HttpCode,
  Header,
  Res,
  HttpException,
  HttpStatus,
  UseFilters,
  ForbiddenException,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { TestService } from './test.service';
//过滤器
import { HttpExceptionFilter } from 'src/common/filter/http-exception.filter';
import { TestMiddleware } from './test.middleware';
import { RolesGuard } from 'src/common/guard/roles.guard';
import { LoggingInterceptor } from 'src/common/interceptor/logging.interceptor';

@UseFilters(new HttpExceptionFilter()) //模块全局过滤器捕获并抛出错误
// @UseInterceptors(LoggingInterceptor) //拦截器
@Controller('api/test')
export class TestController {
  constructor(private testService: TestService) {}

  @Get('/getData')
  //   @UseGuards(RolesGuard)
  @Header('Cache-Control', 'none')
  @HttpCode(200)
  // findAlls(@Req() request: Request) 所有参数
  findAll(@Query() key?: object): object {
    console.log('---Get参数---', key);
    return this.testService.findAll(key);
  }

  @UseInterceptors(LoggingInterceptor) //拦截器
  @Post('/createData')
  @HttpCode(200)
  async create(@Body() key?: string) {
    console.log('---Post参数---', key);
    // this.testService.create();
    return this.testService.create();
  }

  @Get('/error')
  @UseFilters(new HttpExceptionFilter()) //过滤器方式抛错
  async myErr() {
    throw new ForbiddenException();
    // throw new HttpException(
    //   {
    //     status: HttpStatus.FORBIDDEN,
    //     error: 'This is a error message',
    //   },
    //   HttpStatus.FORBIDDEN,
    // );
  }

  // 使用 @Res() 装饰器--------------------
  @Get('/getData1')
  findAll1(@Res() res: Response) {
    res.status(HttpStatus.OK).json(['this is 1']);
  }
  @Post('createData1')
  create1(@Res() res: Response) {
    res.status(HttpStatus.CREATED).send({ msg: 'this is 1' });
  }
}
