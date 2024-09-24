import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user-dto';
import { UserRepository } from 'src/repositories/user-repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  // async updateUser(userId: string, updateUserDto: UpdateUserDto) {
  //   // Lógica de atualização aqui
  // }

  async findUserById(userId: string): Promise<UserDto> {
    const user = await this.userRepository.getUserById(userId);
    if (!user) {
      return null;
    }
    return user;
  }

  async getUsers(): Promise<UserDto[]> {
    return this.userRepository.findAllUsers();
  }

  async removeUser(id: string): Promise<void> {
    await this.userRepository.removeUser(id);
  }

  async validateApiKey(apiKey: string): Promise<UserDto> {
    const user = await this.userRepository.findOneByApiKey(apiKey); // Ajuste o método para buscar via apiKey
    if (!user) {
      return null;
    }
    return user;
  }
}
