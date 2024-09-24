import { IsString, IsUUID } from 'class-validator';

export class TechnologyEntity {
  @IsUUID()
  id: string;

  @IsString()
  name: string;

  @IsString()
  image: string;
}
