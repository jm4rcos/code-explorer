import { Controller, Get, Param, Query } from '@nestjs/common';
import { TechnologyService } from './technology.service';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { TechnologyDto } from './dto/technology.dto';

@Controller('technology')
@ApiTags('technology')
export class TechnologyController {
  constructor(private readonly technologyService: TechnologyService) {}

  @Get()
  @ApiProperty({
    description: 'Get all technologies',
    type: [TechnologyDto],
  })
  async getAllTechnologies() {
    return this.technologyService.getAllTechnologies();
  }

  @Get('search')
  @ApiProperty({
    description: 'Search technologies',
    type: [TechnologyDto],
  })
  async searchTechnologies(@Query('searchTerm') searchTerm: string) {
    return this.technologyService.searchTechnologies(searchTerm);
  }
}
