import { IsString, IsUUID, IsOptional } from 'class-validator';
import { SnippetDto } from 'src/snippets/dto/snippet.dto';
import { UserDto } from 'src/users/dto/user-dto';

export class CommentDto {
  @IsUUID()
  id: string;

  @IsString()
  content: string;

  @IsOptional()
  author: UserDto;

  @IsOptional()
  snippet: SnippetDto;

  @IsOptional()
  createdAt?: Date;

  @IsOptional()
  updatedAt?: Date;
}
