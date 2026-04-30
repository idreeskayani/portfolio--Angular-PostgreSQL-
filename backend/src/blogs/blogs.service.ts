import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from './blog.entity';
import { CreateBlogDto, UpdateBlogDto } from './dto/blog.dto';

@Injectable()
export class BlogsService {
  constructor(@InjectRepository(Blog) private repo: Repository<Blog>) {}

  async findAll(page = 1, limit = 6) {
    const [data, total] = await this.repo.findAndCount({
      where: { published: true },
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
      select: ['id', 'title', 'slug', 'excerpt', 'thumbnail', 'tags', 'createdAt'],
    });
    return { data, total, page, lastPage: Math.ceil(total / limit) };
  }

  findAllAdmin() {
    return this.repo.find({ order: { createdAt: 'DESC' } });
  }

  async findBySlug(slug: string) {
    const blog = await this.repo.findOne({ where: { slug, published: true } });
    if (!blog) throw new NotFoundException('Blog not found');
    return blog;
  }

  create(dto: CreateBlogDto) {
    return this.repo.save(this.repo.create(dto));
  }

  async update(id: number, dto: UpdateBlogDto) {
    const blog = await this.repo.findOne({ where: { id } });
    if (!blog) throw new NotFoundException();
    Object.assign(blog, dto);
    return this.repo.save(blog);
  }

  async remove(id: number) {
    const blog = await this.repo.findOne({ where: { id } });
    if (!blog) throw new NotFoundException();
    return this.repo.remove(blog);
  }
}
