import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('profile')
export class Profile {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column() name!: string;
  @Column() title!: string;
  @Column() location!: string;
  @Column() email!: string;
  @Column() phone!: string;
  @Column() github!: string;
  @Column() linkedin!: string;
  @Column({ default: '/uploads/imagepp.png' }) profilePic!: string;
  @Column({ default: '/uploads/Resume_Idrees.pdf' }) resumeUrl!: string;
  @Column('text', { array: true, default: [] }) aboutParagraphs!: string[];
  @Column('text', { array: true, default: [] }) interests!: string[];
  @Column('text', { array: true, default: [] }) strengths!: string[];
  @Column({ nullable: true }) goalText!: string;
  @Column('text', { array: true, default: [] }) techTags!: string[];
  @Column({ nullable: true }) degree!: string;
  @Column({ nullable: true }) institution!: string;
  @Column({ nullable: true }) educationPeriod!: string;
}
