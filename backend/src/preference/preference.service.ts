import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Preference } from '@prisma/client';

@Injectable()
export class PreferenceService {
  constructor(private prisma: PrismaService) {}

  async createPreference(
    userId: string,
    allergies: string[],
    contreIndications: string[],
  ): Promise<Preference> {
    const preference = await this.prisma.preference.create({
      data: {
        userId,
        allergies,
        contreIndications,
      },
    });
    return preference;
  }

  async getPreferenceByUserId(userId: string): Promise<Preference | null> {
    const preference = await this.prisma.preference.findFirst({
      where: {
        userId: userId,
      },
    });
    return preference;
  }
}
