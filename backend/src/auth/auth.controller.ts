import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user-dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user-dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully registered',
  })
  async createUser(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login a user' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully logged in',
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid credentials',
  })
  async login(@Body() loginUserDto: LoginUserDto) {
    try {
      return await this.authService.login(loginUserDto);
    } catch (error) {
      if (error.status === 401) {
        throw new UnauthorizedException('Invalid credentials');
      }
      throw error;
    }
  }

  // @Post('google')
  // @UseGuards(AuthGuard('google'))
  // async googleLogin(@Body() body: {
  //   email: string,
  //   name: string,
  //   picture: string
  // }) {
  // return this.authService.googleLogin(req.user);

  // @Get('google/redirect')
  // @UseGuards(AuthGuard('google'))
  // async googleAuthRedirect(@Req() req: any) {
  //   if (!req.user) {
  //     throw new UnauthorizedException('No user from Google');
  //   }

  //   return this.authService.googleLogin(req.user);
  // }
}
