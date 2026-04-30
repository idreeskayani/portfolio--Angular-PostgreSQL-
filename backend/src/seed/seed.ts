import { DataSource } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { AdminUser } from '../auth/admin-user.entity';

export async function seedDatabase(dataSource: DataSource) {
  const userRepo = dataSource.getRepository(AdminUser);
  const existing = await userRepo.findOne({ where: { email: 'admin@portfolio.com' } });
  if (!existing) {
    const hashed = await bcrypt.hash('admin123', 10);
    await userRepo.save(userRepo.create({ email: 'admin@portfolio.com', password: hashed }));
    console.log('Admin seeded: admin@portfolio.com / admin123');
  }
}
