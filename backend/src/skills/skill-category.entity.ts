import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('skill_category')
export class SkillCategory {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column() category!: string;
  @Column() icon!: string;
  @Column('text', { array: true, default: [] }) skills!: string[];
  @Column({ default: 0 }) sortOrder!: number;
}
