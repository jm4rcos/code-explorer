import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateSnippetDto {
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
  @IsOptional()
  @ApiProperty({
    description: 'The content of the snippet',
    example: 'Hello World',
  })
  content: string;

  @IsOptional()
  @IsUUID()
  @ApiProperty({
    description: 'The id of the technology used in the snippet',
    example: '1234-5678-90ab-cdef',
  })
  technologyId?: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    description: 'If the snippet is not published, only the creator can see it',
    example: true,
  })
  isPublished?: boolean;
}
