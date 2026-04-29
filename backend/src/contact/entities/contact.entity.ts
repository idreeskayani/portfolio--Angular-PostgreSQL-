import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

export type ContactType = 'call' | 'email' | 'message';

@Entity('contacts')
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column('text', { nullable: true })
  message: string;

  @Column({ type: 'varchar', default: 'message' })
  type: ContactType;

  @CreateDateColumn()
  createdAt: Date;
}
