import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact } from './entities/contact.entity';
import { CreateContactDto } from './dtos/create-contact.dto';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepo: Repository<Contact>,
  ) {}

  create(dto: CreateContactDto): Promise<Contact> {
    return this.contactRepo.save(this.contactRepo.create(dto));
  }

  findAll(): Promise<Contact[]> {
    return this.contactRepo.find({ order: { createdAt: 'DESC' } });
  }

  findByType(type: string): Promise<Contact[]> {
    return this.contactRepo.find({ where: { type: type as any }, order: { createdAt: 'DESC' } });
  }
}
