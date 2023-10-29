import { Controller, Post, Body, Param, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport'; // Import AuthGuard
import { PreferenceService } from './preference.service';
import { CreatePreferenceDto } from './preferenceDto/create-preference.dto';
import { findtheID } from '../users/user.decorator';

@Controller('preferences')
@UseGuards(AuthGuard('jwt'))
export class PreferenceController {
  constructor(private readonly preferenceService: PreferenceService) {}

  @Post()
  async createPreference(
    @findtheID() userId: string,
    @Body() createPreferenceDto: CreatePreferenceDto,
  ) {
    const { allergies, contreIndications } = createPreferenceDto;
    const preference = await this.preferenceService.createPreference(
      userId,
      allergies,
      contreIndications,
    );

    return preference;
  }

  @Get(':userId')
  async getPreferenceByUserId(@Param('userId') userId: string) {
    const preference = await this.preferenceService.getPreferenceByUserId(
      userId,
    );
    return preference;
  }
}
