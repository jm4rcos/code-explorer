import { IsString, IsOptional, IsUUID, IsDate } from 'class-validator';

export class CreateSnippetEntity {
  @IsString()
  title: string;

  // @IsOptional()
  // @IsString()
  // description?: string;

  // @IsString()
  // content?: string;

  @IsUUID()
  creatorId: string;

  // @IsUUID()
  // technologyId?: string;

  // @IsDate()
  // @IsOptional()
  // createdAt?: Date;
}
