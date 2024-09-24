import { IsString, IsOptional, IsUUID, IsDate } from 'class-validator';
import { UserEntity } from './user-entity';
import { TechnologyEntity } from './technology-entity';
import { UserFavoriteSnippetEntity } from './user-favorite-snippet-entity';
import { SnippetLikeEntity } from './snippet-like-entity';
import { CommentEntity } from './comment-entity';

export class SnippetEntity {
  @IsUUID()
  id: string;

  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  content?: string;

  @IsUUID()
  creatorId: string;

  creator?: UserEntity;

  @IsUUID()
  technologyId?: string;

  technology?: TechnologyEntity;

  @IsOptional()
  favorites?: UserFavoriteSnippetEntity[];

  @IsOptional()
  likes?: SnippetLikeEntity[];

  @IsOptional()
  comments?: CommentEntity[];

  @IsDate()
  @IsOptional()
  createdAt?: Date;

  @IsDate()
  @IsOptional()
  updatedAt?: Date;
}
