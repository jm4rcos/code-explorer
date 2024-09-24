import { IsUUID } from 'class-validator';

export class SnippetLikeEntity {
  @IsUUID()
  userId: string;

  @IsUUID()
  snippetId: string;
}
