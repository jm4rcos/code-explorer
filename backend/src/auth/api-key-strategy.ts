import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-http-bearer';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super();
  }
  async validate(apiKey: string) {
    const user = await this.usersService.validateApiKey(apiKey);
    if (!user) {
      return new UnauthorizedException('Invalid API key');
    } else {
      return user;
    }
  }
}
