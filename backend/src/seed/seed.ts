import { DataSource } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { AdminUser } from '../auth/admin-user.entity';

export async function seedDatabase(dataSource: DataSource) {
  const userRepo = dataSource.getRepository(AdminUser);
  const existing = await userRepo.findOne({ where: { email: 'idreeskayani420@gmail.com' } });
  if (!existing) {
    const hashed = await bcrypt.hash('Kayani@321', 10);
    await userRepo.save(userRepo.create({ email: 'idreeskayani420@gmail.com', password: hashed }));
   }
}
