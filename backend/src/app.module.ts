import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { PrismaService } from './database/prisma.service';
import { AuthModule } from './auth/auth.module';
import { SnippetsModule } from './snippets/snippets.module';
import { FavoritesModule } from './favorites/favorites.module';
import { LikesModule } from './likes/likes.module';
import { TechnologyModule } from './technology/technology.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    SnippetsModule,
    FavoritesModule,
    LikesModule,
    TechnologyModule,
    CommentsModule,
  ],
  controllers: [AppController],
  providers: [PrismaService],
})
export class AppModule {}
