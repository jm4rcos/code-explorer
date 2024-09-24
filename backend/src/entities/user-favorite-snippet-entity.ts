import { IsUUID } from 'class-validator';

export class UserFavoriteSnippetEntity {
  @IsUUID()
  userId: string;

  @IsUUID()
  snippetId: string;
}
