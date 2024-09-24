import { Module } from '@nestjs/common';
import { TechnologyController } from './technology.controller';
import { TechnologyService } from './technology.service';
import { TechnologyRepository } from 'src/repositories/techonology-repository';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [TechnologyController],
  providers: [TechnologyService, TechnologyRepository, PrismaService],
})
export class TechnologyModule {}
