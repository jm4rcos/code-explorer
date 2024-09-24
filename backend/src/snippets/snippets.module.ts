import { Module } from '@nestjs/common';
import { SnippetsController } from './snippets.controller';
import { SnippetsService } from './snippets.service';
import { SnippetRepository } from 'src/repositories/snippet-repository';
import { PrismaService } from 'src/database/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { authConstants } from 'src/auth/auth.contants';
import { JwtStrategy } from 'src/auth/jwt-strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: authConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [SnippetsController],
  providers: [
    SnippetsService,
    SnippetsService,
    SnippetRepository,
    PrismaService,
    JwtStrategy,
  ],
  exports: [SnippetsService],
})
export class SnippetsModule {}
