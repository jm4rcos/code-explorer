import { Module } from '@nestjs/common';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { PrismaService } from 'src/database/prisma.service';
import { FavoriteRepository } from 'src/repositories/favorite-repository';
import { JwtStrategy } from 'src/auth/jwt-strategy';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService, FavoriteRepository, PrismaService, JwtStrategy],
})
export class FavoritesModule {}
