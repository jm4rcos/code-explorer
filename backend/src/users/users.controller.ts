import {
  Controller,
  Get,
  Delete,
  Param,
  UseGuards,
  Req,
  HttpException,
  UnauthorizedException,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { UserDto } from './dto/user-dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Post()
  // async createUser(@Body() createUserDto: UserDto) {
  //   return this.usersService.(createUserDto);
  // }
  @Get()
  async getUsers() {
    return this.usersService.getUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<UserDto> {
    return this.usersService.findUserById(id);
  }

  @Delete(':id')
  async removeUser(@Param('id') id: string): Promise<void> {
    return this.usersService.removeUser(id);
  }

  @Get('profile')
  @UseGuards(AuthGuard('bearer'))
  getProfile(@Req() request: any) {
    if (!request.user) {
      throw new UnauthorizedException('Unauthorized');
    }

    const { password, ...userWithoutPassword } = request.user;
    return {
      message: 'Authenticated with api key',
      user: userWithoutPassword,
    };
  }

  @Post('image')
  @ApiOperation({
    summary: 'Upload image',
    description: 'Upload image',
  })
  @UseGuards(AuthGuard('bearer'))
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './upload/files',
        filename: (req, file, cb) => {
          // const uniqueSuffix =
          //   Date.now() + '-' + Math.round(Math.random() * 1e9);
          // const ext = file.originalname.split('.').pop();
          // const filename = `${uniqueSuffix}.${ext}`;
          cb(null, file.originalname);
        },
      }),
      limits: {
        fileSize: 1024 * 1024 * 4, // 4 MB
      },
    }),
  )
  uploadImage(
    @UploadedFile() // definir tipo de archivo (png)
    // new ParseFilePipeBuilder()
    file //   .addFileTypeValidator({
    //     fileType: 'png',
    //   })
    //   .build({
    //     errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    //   }),
    : Express.Multer.File,
  ) {
    if (!file) {
      throw new HttpException('File not found', 404);
    }
    console.log('file: ', file);

    return {
      filename: file.originalname,
    };
  }
}
