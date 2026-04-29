import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column('text')
  description: string;

  @Column('simple-array')
  features: string[];

  @Column('simple-array')
  tech: string[];

  @Column({ default: 'web' })
  category: string;

  @CreateDateColumn()
  createdAt: Date;
}
