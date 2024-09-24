import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller()
// @ApiBearerAuth('JWT-auth') // Aplicar aqui se for usar em todas rotas
export class AppController {
  constructor() {}

  @Get('protected')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  getHello(@Req() request: any) {
    return request.user;
  }
}
