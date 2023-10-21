import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { RecettesService } from './recette.service';
import { CreateRecetteDto } from './recetteDto/create-recette.dto';
import { UpdateRecetteDto } from './recetteDto/update-recette.dto';

@Controller('recettes')
export class RecetteController {
  constructor(private readonly recettesService: RecettesService) {}

  @Post()
  async create(@Body() createRecetteDto: CreateRecetteDto) {
    return this.recettesService.create(createRecetteDto);
  }

  @Get()
  async findAll() {
    return this.recettesService.findAll();
  }

  @Get('title/:title')
  async findOneByTitle(@Param('title') title: string) {
    return this.recettesService.findOneByTitle(title);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.recettesService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateRecetteDto: UpdateRecetteDto,
  ) {
    return this.recettesService.update(id, updateRecetteDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.recettesService.remove(id);
  }
}
