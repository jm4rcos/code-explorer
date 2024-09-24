import { IsString, IsUUID, IsDate } from 'class-validator';

export class CommentEntity {
  @IsUUID()
  id: string;

  @IsString()
  content: string;

  @IsUUID()
  snippetId: string;

  @IsUUID()
  authorId: string;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}
