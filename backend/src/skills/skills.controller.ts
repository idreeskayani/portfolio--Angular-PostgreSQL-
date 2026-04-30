import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SkillsService } from './skills.service';
import { CreateSkillDto, UpdateSkillDto } from './dto/skill.dto';

@Controller('skills')
export class SkillsController {
  constructor(private service: SkillsService) {}

  @Get()
  findAll() { return this.service.findAll(); }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() dto: CreateSkillDto) { return this.service.create(dto); }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  update(@Param('id') id: string, @Body() dto: UpdateSkillDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string) { return this.service.remove(+id); }
}
