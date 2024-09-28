import { ApiProperty } from '@nestjs/swagger';
import { TechnologyDto } from 'src/technology/dto/technology.dto';
import { UserResponseDto } from 'src/users/dto/user-response.dto';

export class SnippetResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  creator?: UserResponseDto;

  @ApiProperty({ required: false })
  technology?: TechnologyDto;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ required: true })
  isPublished?: boolean;
}
