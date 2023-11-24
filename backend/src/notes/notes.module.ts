import { Module } from '@nestjs/common';
import { NoteService } from './notes.service';
import { NoteController } from './notes.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [NoteService, PrismaService],
  controllers: [NoteController],
})
export class NoteModule {}
