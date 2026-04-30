import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkillCategory } from './skill-category.entity';
import { SkillsController } from './skills.controller';
import { SkillsService } from './skills.service';

@Module({
  imports: [TypeOrmModule.forFeature([SkillCategory])],
  controllers: [SkillsController],
  providers: [SkillsService],
})
export class SkillsModule {}
