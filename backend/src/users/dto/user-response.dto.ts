import { IsString, IsEmail, IsUUID, IsOptional } from 'class-validator';
import { SnippetResponseDto } from 'src/snippets/dto/snippet-response.dto';
import { UserFavoriteSnippetDto } from './user-favorite-snippet.dto';
import { SnippetLikeDto } from 'src/snippets/dto/snippet-like.dto';
import { CommentDto } from 'src/comments/dto/comment.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
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
}
