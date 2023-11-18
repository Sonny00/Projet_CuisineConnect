import { Controller, Get, Patch, Body, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PreferenceService } from './preference.service';
import { PreferenceDto } from './preferenceDto/preference.dto';
import { findtheID } from '../users/user.decorator';

@Controller('users')
export class PreferenceController {
  constructor(private readonly preferenceService: PreferenceService) {}

  @Patch(':userId/preferences')
  @UseGuards(AuthGuard('jwt'))
  async updatePreferences(
    @Param('userId') userId: string,
    @Body() preferenceDto: PreferenceDto,
    @findtheID() requestUserId: string,
  ) {
    return this.preferenceService.upsertPreferences(userId, preferenceDto);
  }

  @Get(':userId/preferences')
  async getPreferences(@Param('userId') userId: string) {
    return this.preferenceService.getPreferences(userId);
  }
}
