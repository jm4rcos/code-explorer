import { Injectable } from '@nestjs/common';
import { SnippetRepository } from 'src/repositories/snippet-repository';
import { SnippetResponseDto } from './dto/snippet-response.dto';
import { UpdateSnippetDto } from './dto/update-snippet.dto';
import { CreateSnippetDto } from './dto/create-snippet.dto';
import { UpdateSnippetContentDto } from './dto/update-snippet-content.dto';

@Injectable()
export class SnippetsService {
  constructor(private readonly snippetRepository: SnippetRepository) {}

  async getAllSnippets(
    technologyId?: string,
    page: number = 1,
    limit: number = 10,
    searchTerm?: string,
  ): Promise<{ data: SnippetResponseDto[]; total: number }> {
    const skip = (page - 1) * limit;
    const [snippets, total] = await Promise.all([
      this.snippetRepository.getAllSnippets({
        technologyId,
        take: limit,
        skip,
        searchTerm,
      }),
      this.snippetRepository.getTotalSnippets(technologyId, searchTerm),
    ]);

    return { data: snippets, total };
  }
  async getUserSnippets(userId: string): Promise<SnippetResponseDto[]> {
    return this.snippetRepository.getUserSnippets(userId);
  }

  async getSnippetById(id: string): Promise<SnippetResponseDto> {
    return this.snippetRepository.getSnippetById(id);
  }

  async createSnippet(
    dto: CreateSnippetDto,
    creatorId: string,
  ): Promise<SnippetResponseDto> {
    return this.snippetRepository.createSnippet(dto, creatorId);
  }

  async updateSnippet(id: string, dto: UpdateSnippetDto) {
    return this.snippetRepository.updateSnippet(id, dto);
  }

  async updateSnippetContent(id: string, dto: UpdateSnippetContentDto) {
    return this.snippetRepository.updateSnippet(id, dto);
  }

  async deleteSnippet(id: string) {
    return this.snippetRepository.deleteSnippet(id);
  }
}
