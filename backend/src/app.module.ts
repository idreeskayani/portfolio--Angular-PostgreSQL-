import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AdminUser } from './auth/admin-user.entity';
import { Profile } from './profile/profile.entity';
import { Experience } from './experience/experience.entity';
import { Project } from './projects/project.entity';
import { SkillCategory } from './skills/skill-category.entity';
import { Blog } from './blogs/blog.entity';
import { Contact } from './contact/contact.entity';
import { ContactModule } from './contact/contact.module';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { ExperienceModule } from './experience/experience.module';
import { ProjectsModule } from './projects/projects.module';
import { SkillsModule } from './skills/skills.module';
import { BlogsModule } from './blogs/blogs.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      ...(process.env.DATABASE_URL
        ? { url: process.env.DATABASE_URL }
        : {
            host: process.env.DB_HOST || 'localhost',
            port: +(process.env.DB_PORT || 5432),
            username: process.env.DB_USERNAME || 'postgres',
            password: process.env.DB_PASSWORD || 'postgres',
            database: process.env.DB_NAME || 'portfolio_db',
          }),
      entities: [AdminUser, Profile, Experience, Project, SkillCategory, Blog, Contact],
      synchronize: true,
    }),
    AuthModule,
    ProfileModule,
    ExperienceModule,
    ProjectsModule,
    SkillsModule,
    BlogsModule,
    UploadModule,
    ContactModule,
  ],
})
export class AppModule {}
