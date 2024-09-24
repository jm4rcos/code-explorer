import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class RegisterUserDto {
  @IsString()
  @Length(3, 20, {
    message: 'Name must be between 3 and 20 characters',
  })
  @ApiProperty({
    example: 'John',
    description: 'The username of the user',
  })
  username: string;

  @IsString()
  @Length(6, 20, {
    message: 'Password must be between 6 and 20 characters',
  })
  @ApiProperty({
    example: 'password123',
    description: 'The password of the user',
  })
  password: string;

  @IsString()
  @IsEmail()
  @ApiProperty({
    example: 'email@example.com',
    description: 'The email of the user',
  })
  email: string;
}
