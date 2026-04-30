import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './profile.entity';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfileService {
  constructor(@InjectRepository(Profile) private repo: Repository<Profile>) {}

  findOne() {
    return this.repo.findOne({ where: { id: 1 } });
  }

  async update(dto: UpdateProfileDto) {
    const profile = await this.repo.findOne({ where: { id: 1 } });
    if (!profile) throw new NotFoundException('Profile not found');
    Object.assign(profile, dto);
    return this.repo.save(profile);
  }
}
