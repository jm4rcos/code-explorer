import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from '../database/prisma.service';
import { UserRepository } from 'src/repositories/user-repository';
import { ApiKeyStrategy } from 'src/auth/api-key-strategy';
import { JwtStrategy } from 'src/auth/jwt-strategy';
import { JwtModule } from '@nestjs/jwt';
import { authConstants } from 'src/auth/auth.contants';

@Module({
  imports: [
    JwtModule.register({
      secret: authConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    UserRepository,
    PrismaService,
    ApiKeyStrategy,
    JwtStrategy,
  ],
  exports: [UsersService],
})
export class UsersModule {}
