import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { randomUUID } from 'crypto';
import { UserDto } from 'src/users/dto/user-dto';
import { RegisterUserDto } from 'src/auth/dto/register-user-dto';
import { UserResponseDto } from 'src/users/dto/user-response.dto';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(userData: RegisterUserDto): Promise<UserDto> {
    const createdUser = await this.prisma.user.create({
      data: {
        id: randomUUID(),
        apiKey: randomUUID(),
        ...userData,
      },
      select: {
        id: true,
        username: true,
        email: true,
        apiKey: true,
      },
    });

    return createdUser;
  }

  async findOne(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async getUserById(userId: string): Promise<UserDto> {
    return this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        username: true,
        email: true,
        image: true,
        apiKey: true,
        createdAt: true,
        updatedAt: true,
        favorites: true,
        likes: true,
      },
    });
  }

  async getUserByEmail(email: string): Promise<UserResponseDto> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    const userResponse: UserResponseDto = {
      id: user.id,
      username: user.username,
      email: user.email,
    };

    return userResponse;
  }

  async findAllUsers(): Promise<UserDto[]> {
    return this.prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        apiKey: true,
      },
    });
  }

  async removeUser(id: string) {
    try {
      await this.prisma.user.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async findOneByApiKey(apiKey: string): Promise<UserDto> {
    return this.prisma.user.findUnique({
      where: { apiKey },
    });
  }
}
