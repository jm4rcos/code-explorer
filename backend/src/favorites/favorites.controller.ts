import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-guard';
import { UserFavoriteSnippetEntity } from 'src/entities/user-favorite-snippet-entity';
import { FavoritesService } from './favorites.service';
import { FavoriteDto } from './dto/favorite-snippet.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';

@Controller('favorites')
@ApiTags('User Favorites')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get('all')
  @ApiOperation({ summary: 'Get all user favorite snippets' })
  @ApiProperty({
    type: [UserFavoriteSnippetEntity],
    description: 'List of all user favorite snippets',
  })
  async getAllFavorites(@CurrentUser() userId: string): Promise<FavoriteDto[]> {
    return this.favoritesService.getAllFavorites(userId);
  }

  @Post('add')
  @ApiOperation({ summary: 'Add a new user favorite snippet' })
  @ApiProperty({
    type: UserFavoriteSnippetEntity,
    description: 'Add a new user favorite snippet',
  })
  async addFavorite(
    @Body() { snippetId }: UserFavoriteSnippetEntity,
    @CurrentUser() currentUser: string,
  ): Promise<UserFavoriteSnippetEntity> {
    return this.favoritesService.createFavorite(currentUser, snippetId);
  }
}
