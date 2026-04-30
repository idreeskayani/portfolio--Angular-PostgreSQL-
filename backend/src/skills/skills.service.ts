import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SkillCategory } from './skill-category.entity';
import { CreateSkillDto, UpdateSkillDto } from './dto/skill.dto';

@Injectable()
export class SkillsService {
  constructor(@InjectRepository(SkillCategory) private repo: Repository<SkillCategory>) {}

  findAll() {
    return this.repo.find({ order: { sortOrder: 'ASC' } });
  }

  create(dto: CreateSkillDto) {
    return this.repo.save(this.repo.create(dto));
  }

  async update(id: number, dto: UpdateSkillDto) {
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
