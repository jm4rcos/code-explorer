import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserRepository } from 'src/repositories/user-repository';
import { PrismaService } from 'src/database/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { authConstants } from './auth.contants';
import { JwtStrategy } from './jwt-strategy';
import { ApiKeyStrategy } from './api-key-strategy';
import { UsersService } from 'src/users/users.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: authConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [
    AuthService,
    UserRepository,
    PrismaService,
    JwtStrategy,
    ApiKeyStrategy,
    UsersService,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
