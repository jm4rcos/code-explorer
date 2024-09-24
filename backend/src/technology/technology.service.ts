import { Injectable } from '@nestjs/common';
import { TechnologyRepository } from 'src/repositories/techonology-repository';
import { TechnologyDto } from './dto/technology.dto';

@Injectable()
export class TechnologyService {
  constructor(private readonly technologyRepository: TechnologyRepository) {}

  async getAllTechnologies(): Promise<TechnologyDto[]> {
    return this.technologyRepository.getAllTechnologies();
  }

  async searchTechnologies(searchTerm: string): Promise<TechnologyDto[]> {
    return this.technologyRepository.searchTechnologies(searchTerm);
  }
}
