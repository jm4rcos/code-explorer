import { IsString, IsEmail, IsUUID, IsOptional } from 'class-validator';
import { SnippetResponseDto } from 'src/snippets/dto/snippet-response.dto';
import { UserFavoriteSnippetDto } from './user-favorite-snippet.dto';
import { SnippetLikeDto } from 'src/snippets/dto/snippet-like.dto';
import { CommentDto } from 'src/comments/dto/comment.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @IsUUID()
  id: string;

  @IsString()
  @ApiProperty({
    description: 'The username of the user',
    example: 'john_doe',
  })
  username: string;

  @IsEmail()
  @ApiProperty({
    description: 'The email of the user',
    example: 'email@example.com',
  })
  email: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsString()
  @ApiProperty({
    description: 'The API key of the user',
    example: '1234-5678-90ab-cdef',
  })
  apiKey: string;

  @IsOptional()
  @ApiProperty({
    description: 'The snippets of the user',
    type: [SnippetResponseDto],
  })
  snippets?: SnippetResponseDto[];

  @IsOptional()
  favorites?: UserFavoriteSnippetDto[];

  @IsOptional()
  likes?: SnippetLikeDto[];

  @IsOptional()
  comments?: CommentDto[];

  @IsOptional()
  createdAt?: Date;

  @IsOptional()
  updatedAt?: Date;
}
