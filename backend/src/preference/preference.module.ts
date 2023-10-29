import { Module } from '@nestjs/common';
import { PreferenceController } from './preference.controller';
import { PreferenceService } from './preference.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [PreferenceController],
  providers: [PreferenceService, PrismaService],
})
export class PreferenceModule {}
