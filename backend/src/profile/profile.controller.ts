import { Controller, Get, Put, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProfileService } from './profile.service';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Controller('profile')
export class ProfileController {
  constructor(private service: ProfileService) {}

  @Get()
  findOne() {
    return this.service.findOne();
  }

  @Put()
  @UseGuards(AuthGuard('jwt'))
  update(@Body() dto: UpdateProfileDto) {
    return this.service.update(dto);
  }
}
