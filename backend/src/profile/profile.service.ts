import { Injectable } from '@nestjs/common';
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
    let profile = await this.repo.findOne({ where: { id: 1 } });
    const sanitized = {
      ...dto,
      aboutParagraphs: dto.aboutParagraphs ?? [],
      interests: dto.interests ?? [],
      strengths: dto.strengths ?? [],
      techTags: dto.techTags ?? [],
      phone: dto.phone ?? '',
      profilePic: dto.profilePic ?? '',
      resumeUrl: dto.resumeUrl ?? '',
      goalText: dto.goalText ?? '',
    };
    if (!profile) {
      profile = this.repo.create({ id: 1, ...sanitized });
    } else {
      Object.assign(profile, sanitized);
    }
    return this.repo.save(profile);
  }
}
