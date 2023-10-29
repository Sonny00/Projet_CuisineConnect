import { Injectable, NotFoundException } from '@nestjs/common';
import { Note, Recette, User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateNoteDto } from './noteDto/notes.dto';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class NoteService {
  constructor(private prisma: PrismaService) {}

  async createNote(
    userId: string,
    recetteId: string,
    createNoteDto: CreateNoteDto,
  ): Promise<Note> {
    const { rating } = createNoteDto;

    // Vous pouvez ajouter des validations pour le champ de note ici si nécessaire.

    const note = await this.prisma.note.create({
      data: {
        userId,
        recetteId,
        rating,
      },
    });
    return note;
  }

  async getNotesForRecette(recetteId: string): Promise<Note[]> {
    const notes = await this.prisma.note.findMany({
      where: { recetteId },
    });
    return notes;
  }

  async getNoteById(noteId: string): Promise<Note | null> {
    const note = await this.prisma.note.findUnique({
      where: { id: noteId },
    });
    return note;
  }

  async updateNote(noteId: string, newValue: number): Promise<Note | null> {
    const note = await this.prisma.note.update({
      where: { id: noteId },
      data: { rating: newValue },
    });
    return note;
  }

  async deleteNote(noteId: string): Promise<void> {
    await this.prisma.note.delete({
      where: { id: noteId },
    });
  }
}
