import { IsString, IsOptional, IsUUID, IsEmail, IsDate } from 'class-validator';

export class UserEntity {
  @IsUUID()
  id: string;

  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsString()
  password: string;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;

  @IsString()
  apiKey: string;
}
