import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ExperienceService } from './experience.service';
import { CreateExperienceDto, UpdateExperienceDto } from './dto/experience.dto';

@Controller('experience')
export class ExperienceController {
  constructor(private service: ExperienceService) {}

  @Get()
  findAll() { return this.service.findAll(); }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() dto: CreateExperienceDto) { return this.service.create(dto); }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  update(@Param('id') id: string, @Body() dto: UpdateExperienceDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string) { return this.service.remove(+id); }
}
