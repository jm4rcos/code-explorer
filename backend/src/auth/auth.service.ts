import {
  ConflictException,
  HttpCode,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from 'src/repositories/user-repository';
import { RegisterUserDto } from './dto/register-user-dto';
import * as bcrypt from 'bcrypt';
import { UserDto } from 'src/users/dto/user-dto';
import { LoginUserDto } from './dto/login-user-dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async register(registerUserDto: RegisterUserDto): Promise<UserDto> {
    const emailAlreadyExists = await this.userRepository.findOne(
      registerUserDto.email,
    );
    if (emailAlreadyExists) {
      throw new ConflictException(HttpStatus.CONFLICT, 'Email already in use');
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(registerUserDto.password, salt);

    const userToCreate = {
      ...registerUserDto,
      password: hashedPassword,
    };

    return this.userRepository.createUser(userToCreate);
  }

  async findOne(data: LoginUserDto): Promise<UserDto> {
    const user = await this.userRepository.findOne(data.email);

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  async login(loginUserDto: LoginUserDto): Promise<{ accessToken: string }> {
    const user = await this.userRepository.findOne(loginUserDto.email);

    const passwordMatch = await bcrypt.compare(
      loginUserDto.password,
      user.password,
    );

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    delete user.password;
    const payload = {
      email: user.email,
      sub: user.id,
    };

    return {
      ...user,
      accessToken: this.jwtService.sign(payload),
    };
  }

  async googleLogin(profile: any) {
    const email = profile.emails[0].value;
    const existingUser = await this.userRepository.getUserByEmail(email);

    if (existingUser) {
      return existingUser;
    }

    const newUser = await this.userRepository.createUser({
      username: profile.displayName,
      email,
      password: null,
    });

    return newUser;
  }
}
