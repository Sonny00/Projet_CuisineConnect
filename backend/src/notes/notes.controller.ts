import {
  Controller,
  Post,
  UseGuards,
  Param,
  Body,
  Put,
  Get,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { NoteService } from './notes.service';
import { Note } from '@prisma/client';
import { CreateNoteDto } from './noteDto/notes.dto';
import { findtheID } from '../users/user.decorator';
import { UpdateNoteDto } from './noteDto/update.dto';

@Controller('recettes/:recetteId/notes')
@UseGuards(AuthGuard('jwt'))
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post()
  async createNote(
    @Param('recetteId') recetteId: string,
    @Body() createNoteDto: CreateNoteDto,
    @findtheID() userId: string,
  ) {
    const note = await this.noteService.createNote(
      userId,
      recetteId,
      createNoteDto,
    );
    return note;
  }

  @Put(':noteId')
  async updateNote(
    @Param('noteId') noteId: string,
    @Body() updateNoteDto: { rating: number }, // Remarquez que nous fournissons un objet avec la note mise à jour
  ) {
    const updatedNote = await this.noteService.updateNote(
      noteId,
      updateNoteDto.rating,
    );
    return updatedNote;
  }

  @Get()
  async getNotesByRecetteId(@Param('recetteId') recetteId: string) {
    return await this.noteService.findNotesByRecetteId(recetteId);
  }
}
