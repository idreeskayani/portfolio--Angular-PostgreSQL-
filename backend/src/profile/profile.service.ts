import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './profile.entity';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfileService {
  constructor(@InjectRepository(Profile) private repo: Repository<Profile>) {}

  async findOne() {
    return await this.repo.findOne({ where: { id: 1 } }) ?? {};
  }

  async update(dto: UpdateProfileDto) {
    const data = {
      id: 1,
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
    await this.repo.upsert(data, ['id']);
    return this.repo.findOne({ where: { id: 1 } });
  }
}
