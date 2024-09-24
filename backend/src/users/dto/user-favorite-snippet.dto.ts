import { IsOptional, IsUUID } from 'class-validator';
import { UserDto } from './user-dto';
import { SnippetResponseDto } from 'src/snippets/dto/snippet-response.dto';

export class UserFavoriteSnippetDto {
  @IsUUID()
  userId: string;

  @IsUUID()
  snippetId: string;

  @IsOptional()
  user?: UserDto;

  @IsOptional()
  snippet?: SnippetResponseDto;
}
