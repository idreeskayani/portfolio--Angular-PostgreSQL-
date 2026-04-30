import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('experience')
export class Experience {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column() title!: string;
  @Column() company!: string;
  @Column() period!: string;
  @Column('text', { array: true, default: [] }) highlights!: string[];
  @Column({ default: 0 }) sortOrder!: number;
}
