import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class CreateSnippetDto {
  @IsString()
  @ApiProperty({
    description: 'The title of the snippet',
    example: 'Hello World',
  })
  title: string;
}
