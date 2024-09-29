import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { CreateSnippetDto } from './dto/create-snippet.dto';
import { SnippetResponseDto } from './dto/snippet-response.dto';
import { UpdateSnippetContentDto } from './dto/update-snippet-content.dto';
import { UpdateSnippetDto } from './dto/update-snippet.dto';
import { SnippetsService } from './snippets.service';

@Controller('snippets')
@ApiTags('snippets')
export class SnippetsController {
  constructor(private readonly snippetsService: SnippetsService) {}

  @Get()
  @ApiQuery({ name: 'technologyId', required: false, type: String })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'search', required: false, type: String })
  async getSnippets(
    @Query('technologyId') technologyId?: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('search') search?: string,
  ): Promise<{ data: SnippetResponseDto[]; total: number }> {
    if (isNaN(+page) || isNaN(+limit)) {
      throw new HttpException(
        'Page and limit must be numbers',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (+page < 1 || +limit < 1) {
      throw new HttpException(
        'Page and limit must be greater than 0',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (+limit > 70) {
      throw new HttpException(
        'Limit cannot be greater than 70',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.snippetsService.getAllSnippets(
      technologyId,
      +page,
      +limit,
      search,
    );
  }

  @Get('user')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  async getUserSnippets(
    @CurrentUser() currentUser: string,
  ): Promise<SnippetResponseDto[]> {
    return this.snippetsService.getUserSnippets(currentUser);
  }

  @Get(':id')
  async getSnippetById(@Param('id') id: string) {
    return this.snippetsService.getSnippetById(id);
  }

  @Post('create')
  @ApiOperation({ summary: 'Create a new snippet' })
  @ApiResponse({ status: 201, description: 'The snippet has been created' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  async createSnippet(
    @Body() dto: CreateSnippetDto,
    @CurrentUser() currentUser: string,
  ): Promise<SnippetResponseDto> {
    return this.snippetsService.createSnippet(dto, currentUser);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a snippet' })
  @ApiResponse({ status: 200, description: 'The snippet has been updated' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  async updateSnippet(
    @Param('id') id: string,
    @Body() dto: UpdateSnippetDto,
    @CurrentUser() currentUser: string,
  ) {
    const snippet = await this.snippetsService.getSnippetById(id);

    if (snippet.creator.id !== currentUser) {
      throw new HttpException(
        'You are not authorized to update this snippet.',
        HttpStatus.FORBIDDEN,
      );
    }
    return this.snippetsService.updateSnippet(id, dto);
  }

  @Patch('/content/:id')
  @ApiOperation({ summary: 'Update a snippet content' })
  @ApiResponse({ status: 200, description: 'The snippet has been updated' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  async updateSnippetContent(
    @Param('id') id: string,
    @Body() dto: UpdateSnippetContentDto,
    @CurrentUser() currentUser: string,
  ) {
    const snippet = await this.snippetsService.getSnippetById(id);

    console.log(snippet?.creator.id, currentUser);

    if (snippet.creator.id !== currentUser) {
      throw new HttpException(
        'You are not authorized to update this snippet.',
        HttpStatus.FORBIDDEN,
      );
    }

    return this.snippetsService.updateSnippetContent(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a snippet' })
  @ApiResponse({ status: 200, description: 'The snippet has been deleted' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  async deleteSnippet(
    @Param('id') id: string,
    @CurrentUser() currentUser: string,
  ) {
    const snippet = await this.snippetsService.getSnippetById(id);

    if (snippet.creator.id !== currentUser) {
      throw new HttpException(
        'You are not authorized to delete this snippet.',
        HttpStatus.FORBIDDEN,
      );
    }

    return this.snippetsService.deleteSnippet(id);
  }

  @Get('user')
  async getUserId(@Req() req: any) {
    return req.user.id;
  }
}
