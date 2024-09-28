import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from './auth/jwt-guard';

@Controller()
export class AppController {
  constructor() {}
  @Get('healthz')
  healthCheck() {
    return 'OK';
  }

  @Get('protected')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  getHello(@Req() request: any) {
    return request.user;
  }
}
