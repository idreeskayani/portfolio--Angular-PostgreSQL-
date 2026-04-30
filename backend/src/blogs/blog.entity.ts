import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('blog')
export class Blog {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column() title!: string;
  @Column({ unique: true }) slug!: string;
  @Column('text') excerpt!: string;
  @Column('text') content!: string; // stores HTML from rich text editor
  @Column({ nullable: true }) thumbnail!: string;
  @Column('text', { array: true, default: [] }) tags!: string[];
  @Column({ default: true }) published!: boolean;
  @CreateDateColumn() createdAt!: Date;
  @UpdateDateColumn() updatedAt!: Date;
}
