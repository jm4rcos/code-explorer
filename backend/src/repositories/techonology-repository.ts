import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { TechnologyDto } from 'src/technology/dto/technology.dto';

@Injectable()
export class TechnologyRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getAllTechnologies(): Promise<TechnologyDto[]> {
    return this.prisma.technology.findMany();
  }

  async searchTechnologies(searchTerm: string): Promise<TechnologyDto[]> {
    return this.prisma.technology.findMany({
      where: {
        name: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      },
      select: {
        id: true,
        name: true,
        image: true,
        description: true,
      },
    });
  }
}
