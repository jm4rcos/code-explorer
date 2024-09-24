import { IsOptional, IsUUID } from 'class-validator';
import { UserDto } from 'src/users/dto/user-dto';
import { SnippetResponseDto } from './snippet-response.dto';

export class SnippetLikeDto {
  @IsUUID()
  userId: string;

  @IsUUID()
  snippetId: string;

  @IsOptional()
  user?: UserDto;

  @IsOptional()
  snippet?: SnippetResponseDto;
}
