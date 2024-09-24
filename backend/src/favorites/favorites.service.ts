import { Injectable } from '@nestjs/common';
import { UserFavoriteSnippetEntity } from 'src/entities/user-favorite-snippet-entity';
import { FavoriteRepository } from 'src/repositories/favorite-repository';
import { FavoriteDto } from './dto/favorite-snippet.dto';

@Injectable()
export class FavoritesService {
  constructor(private readonly favoriteRepository: FavoriteRepository) {}

  async getAllFavorites(userId: string): Promise<FavoriteDto[]> {
    return this.favoriteRepository.getAllFavorites(userId);
  }

  async createFavorite(
    userId: string,
    snippetId: string,
  ): Promise<UserFavoriteSnippetEntity> {
    return this.favoriteRepository.createFavorite(userId, snippetId);
  }
}
