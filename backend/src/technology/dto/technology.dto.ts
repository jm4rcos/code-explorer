import { IsOptional, IsString, IsUUID } from 'class-validator';

export class TechnologyDto {
  @IsUUID()
  id: string;

  @IsString()
  name: string;

  @IsString()
  image: string;

  @IsString()
  @IsOptional()
  description: string;
}
