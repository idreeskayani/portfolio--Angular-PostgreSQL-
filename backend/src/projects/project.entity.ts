import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('project')
export class Project {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column() name!: string;
  @Column() type!: string;
  @Column('text') description!: string;
  @Column('text', { array: true, default: [] }) features!: string[];
  @Column('text', { array: true, default: [] }) tech!: string[];
  @Column({ default: 'mobile' }) category!: string;
  @Column({ default: 0 }) sortOrder!: number;
}
