import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: 'The email of the user',
    example: 'email@example.com',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(6)
  @ApiProperty({
    description: 'The password of the user',
    example: 'password',
  })
  password: string;
}
