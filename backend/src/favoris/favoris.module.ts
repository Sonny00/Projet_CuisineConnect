import { Module } from '@nestjs/common';
import { FavoriteController } from './favoris.controller';
import { FavoriteService } from './favoris.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [FavoriteController],
  providers: [FavoriteService, PrismaService],
})
export class FavorisModule {}
