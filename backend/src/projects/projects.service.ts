import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './project.entity';
import { CreateProjectDto, UpdateProjectDto } from './dto/project.dto';

@Injectable()
export class ProjectsService {
  constructor(@InjectRepository(Project) private repo: Repository<Project>) {}

  findAll(page = 0, limit = 0, category?: string) {
    const where: any = {};
    if (category) where.category = category;
    if (page > 0 && limit > 0) {
      return this.repo.findAndCount({
        where,
        order: { sortOrder: 'ASC' },
        skip: (page - 1) * limit,
        take: limit,
      }).then(([data, total]) => ({ data, total, page, lastPage: Math.ceil(total / limit) }));
    }
    return this.repo.find({ where, order: { sortOrder: 'ASC' } });
  }

  create(dto: CreateProjectDto) {
    return this.repo.save(this.repo.create(dto));
  }

  async update(id: number, dto: UpdateProjectDto) {
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
