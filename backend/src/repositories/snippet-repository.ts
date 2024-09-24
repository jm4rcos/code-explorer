import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { PrismaService } from 'src/database/prisma.service';
import { SnippetResponseDto } from 'src/snippets/dto/snippet-response.dto';
import { CreateSnippetDto } from 'src/snippets/dto/create-snippet.dto';
import { UpdateSnippetContentDto } from 'src/snippets/dto/update-snippet-content.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class SnippetRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getAllSnippets(params: {
    technologyId?: string;
    take?: number;
    skip?: number;
    searchTerm?: string;
  }): Promise<SnippetResponseDto[]> {
    const { technologyId, take = 10, skip = 0, searchTerm } = params;

    const whereClause: Prisma.SnippetWhereInput = {
      isPublished: true,
      ...(technologyId && { technologyId }),
      ...(searchTerm && {
        OR: [
          { title: { contains: searchTerm, mode: 'insensitive' } },
          { description: { contains: searchTerm, mode: 'insensitive' } },
          { content: { contains: searchTerm, mode: 'insensitive' } },
          {
            technology: {
              name: { contains: searchTerm, mode: 'insensitive' },
            },
          },
        ],
      }),
    };

    return this.prisma.snippet.findMany({
      where: whereClause,
      take,
      skip,
      orderBy: { createdAt: 'desc' },
      include: {
        creator: {
          select: {
            id: true,
            username: true,
            image: true,
            email: true,
          },
        },
        technology: {
          select: {
            id: true,
            name: true,
            image: true,
            description: true,
          },
        },
      },
    });
  }

  async getTotalSnippets(
    technologyId?: string,
    searchTerm?: string,
  ): Promise<number> {
    const whereClause: Prisma.SnippetWhereInput = {
      isPublished: true,
      ...(technologyId && { technologyId }),
      ...(searchTerm && {
        OR: [
          { title: { contains: searchTerm, mode: 'insensitive' } },
          { description: { contains: searchTerm, mode: 'insensitive' } },
          { content: { contains: searchTerm, mode: 'insensitive' } },
          {
            technology: {
              name: { contains: searchTerm, mode: 'insensitive' },
            },
          },
        ],
      }),
    };

    return this.prisma.snippet.count({ where: whereClause });
  }

  async getUserSnippets(userId: string): Promise<SnippetResponseDto[]> {
    return this.prisma.snippet.findMany({
      where: { creatorId: userId },
      include: {
        creator: true,
        technology: true,
      },
    });
  }

  async getSnippetById(id: string): Promise<SnippetResponseDto> {
    return this.prisma.snippet.findUnique({
      where: { id },
      include: {
        creator: true,
        technology: true,
      },
    });
  }

  async updateSnippet(id: string, dto: UpdateSnippetContentDto) {
    return this.prisma.snippet.update({
      where: { id },
      data: {
        ...dto,
        updatedAt: new Date(),
      },
    });
  }

  async deleteSnippet(id: string) {
    return this.prisma.snippet.delete({ where: { id } });
  }

  async createSnippet(
    snippet: CreateSnippetDto,
    creatorId: string,
  ): Promise<SnippetResponseDto> {
    return this.prisma.snippet.create({
      data: {
        id: randomUUID(),
        title: snippet.title,
        creatorId: creatorId,
        isPublished: false,
      },
      include: {
        creator: {
          select: {
            id: true,
            username: true,
            image: true,
            email: true,
          },
        },
        technology: true,
      },
    });
  }
}
