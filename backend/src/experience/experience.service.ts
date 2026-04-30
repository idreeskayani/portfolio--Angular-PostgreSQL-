import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Experience } from './experience.entity';
import { CreateExperienceDto, UpdateExperienceDto } from './dto/experience.dto';

@Injectable()
export class ExperienceService {
  constructor(@InjectRepository(Experience) private repo: Repository<Experience>) {}

  findAll() {
    return this.repo.find({ order: { sortOrder: 'ASC' } });
  }

  create(dto: CreateExperienceDto) {
    return this.repo.save(this.repo.create(dto));
  }

  async update(id: number, dto: UpdateExperienceDto) {
    const item = await this.repo.findOne({ where: { id } });
    if (!item) throw new NotFoundException();
    Object.assign(item, dto);
    return this.repo.save(item);
  }

  async remove(id: number) {
    const item = await this.repo.findOne({ where: { id } });
    if (!item) throw new NotFoundException();
    return this.repo.remove(item);
  }
}
