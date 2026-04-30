import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('admin_user')
export class AdminUser {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;
}
