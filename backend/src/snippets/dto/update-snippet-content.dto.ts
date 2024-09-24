import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateSnippetContentDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'The content of the snippet',
    example: 'Hello World',
  })
  content: string;
}
