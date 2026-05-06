import { Controller, Get, Put, Body, UseGuards, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { ProfileService } from './profile.service';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Controller('profile')
export class ProfileController {
  constructor(private service: ProfileService) {}

  @Get()
  async findOne(@Res() res: Response) {
    const data = await this.service.findOne();
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate');
    return res.json(data);
  }

  @Put()
  @UseGuards(AuthGuard('jwt'))
  update(@Body() dto: UpdateProfileDto) {
    return this.service.update(dto);
  }
}
