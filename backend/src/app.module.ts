import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ContactModule } from './contact/contact.module';
import { ProjectsModule } from './projects/projects.module';
import { Contact } from './contact/entities/contact.entity';
import { Project } from './projects/entities/project.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: +config.get<number>('DB_PORT'),
        database: config.get('DB_NAME'),
        username: config.get('DB_USER'),
        password: config.get('DB_PASSWORD'),
        entities: [Contact, Project],
        synchronize: true,
      }),
    }),
    ContactModule,
    ProjectsModule,
    //
  ],
})
export class AppModule {}
