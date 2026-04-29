import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { CreateProjectDto } from './dtos/create-project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepo: Repository<Project>,
  ) {}

  create(dto: CreateProjectDto): Promise<Project> {
    return this.projectRepo.save(this.projectRepo.create(dto));
  }

  findAll(): Promise<Project[]> {
    return this.projectRepo.find({ order: { createdAt: 'DESC' } });
  }

  findByCategory(category: string): Promise<Project[]> {
    return this.projectRepo.find({ where: { category }, order: { createdAt: 'DESC' } });
  }
}
