import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { UserFavoriteSnippetEntity } from 'src/entities/user-favorite-snippet-entity';
import { FavoriteDto } from 'src/favorites/dto/favorite-snippet.dto';

@Injectable()
export class FavoriteRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getAllFavorites(userId: string): Promise<FavoriteDto[]> {
    return this.prisma.userFavoriteSnippet.findMany({
      where: { userId },
    });
  }

  async createFavorite(
    userId: string,
    snippetId: string,
  ): Promise<UserFavoriteSnippetEntity> {
    return this.prisma.userFavoriteSnippet.create({
      data: {
        userId,
        snippetId,
      },
    });
  }
}
