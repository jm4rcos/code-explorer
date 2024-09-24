import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class SnippetDto {
  @IsString()
  @ApiProperty({
    description: 'The title of the snippet',
    example: 'Hello World',
  })
  title: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'The description of the snippet',
    example: 'This is a snippet',
  })
  description?: string;

  @IsString()
  @ApiProperty({
    description: 'The content of the snippet',
    example: 'Hello World',
  })
  content: string;

  @IsUUID()
  @ApiProperty({
    description: 'The id of the user who created the snippet',
    example: '1234-5678-90ab-cdef',
  })
  creatorId: string;

  @IsOptional()
  @IsUUID()
  @ApiProperty({
    description: 'The id of the technology used in the snippet',
    example: '1234-5678-90ab-cdef',
  })
  technologyId?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'If the snippet is not published, only the creator can see it',
    example: true,
  })
  isPublished?: boolean;
}
