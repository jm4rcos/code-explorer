import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { randomUUID } from 'crypto';
import { PrismaService } from 'src/database/prisma.service';
import { CreateSnippetDto } from 'src/snippets/dto/create-snippet.dto';
import { SnippetResponseDto } from 'src/snippets/dto/snippet-response.dto';
import { UpdateSnippetContentDto } from 'src/snippets/dto/update-snippet-content.dto';

@Injectable()
export class SnippetRepository {
  constructor(private readonly prisma: PrismaService) {}

  private buildWhereClause({
    technologyId,
    searchTerm,
    isPublished = true,
  }: {
    technologyId?: string;
    searchTerm?: string;
    isPublished?: boolean;
  }): Prisma.SnippetWhereInput {
    const whereClause: Prisma.SnippetWhereInput = {
      isPublished,
      ...(technologyId && { technologyId }),
    };

    if (searchTerm) {
      whereClause.OR = [
        { title: { contains: searchTerm, mode: 'insensitive' } },
        { description: { contains: searchTerm, mode: 'insensitive' } },
        { content: { contains: searchTerm, mode: 'insensitive' } },
        {
          technology: {
            name: { contains: searchTerm, mode: 'insensitive' },
          },
        },
      ];
    }

    return whereClause;
  }

  private snippetIncludes(): Prisma.SnippetInclude {
    return {
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
    };
  }

  async getAllSnippets({
    technologyId,
    take = 10,
    skip = 0,
    searchTerm,
  }: {
    technologyId?: string;
    take?: number;
    skip?: number;
    searchTerm?: string;
  }): Promise<SnippetResponseDto[]> {
    return this.prisma.snippet.findMany({
      where: this.buildWhereClause({ technologyId, searchTerm }),
      take,
      skip,
      orderBy: { createdAt: 'desc' },
      include: this.snippetIncludes(),
    });
  }

  async getTotalSnippets(
    technologyId?: string,
    searchTerm?: string,
  ): Promise<number> {
    return this.prisma.snippet.count({
      where: this.buildWhereClause({ technologyId, searchTerm }),
    });
  }

  async getUserSnippets(userId: string): Promise<SnippetResponseDto[]> {
    return this.prisma.snippet.findMany({
      where: { creatorId: userId },
      include: this.snippetIncludes(),
    });
  }

  async getSnippetById(id: string): Promise<SnippetResponseDto | null> {
    return this.prisma.snippet.findUnique({
      where: { id },
      include: this.snippetIncludes(),
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
        creatorId,
        isPublished: false,
      },
      include: this.snippetIncludes(),
    });
  }
}
