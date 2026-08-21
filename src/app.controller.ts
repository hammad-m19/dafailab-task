import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('App')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Hello World check' })
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('debug-sentry')
  @ApiOperation({ summary: 'Trigger an intentional error for Sentry tracking' })
  debugSentry(): string {
    throw new Error('Sentry intentional testing error');
  }
}
