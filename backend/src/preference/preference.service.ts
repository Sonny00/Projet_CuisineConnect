import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { PreferenceDto } from './preferenceDto/preference.dto';

@Injectable()
export class PreferenceService {
  constructor(private prisma: PrismaService) {}

  async upsertPreferences(userId: string, preferenceDto: PreferenceDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { preferences: true },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const preferenceId = user.preferences?.[0]?.id;

    return this.prisma.user.update({
      where: { id: userId },
      data: {
        preferences: {
          upsert: {
            create: { ...preferenceDto },
            update: { ...preferenceDto },
            where: { id: preferenceId || 'some-default-id' },
          },
        },
      },
      include: { preferences: true },
    });
  }

  async getPreferences(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { preferences: true },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user.preferences;
  }
}
