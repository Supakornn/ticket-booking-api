import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateEventInput } from './dto/create-event.input';

@Injectable()
export class EventService {
  constructor(private prisma: PrismaService) {}

  async createEvent(createEventInput: CreateEventInput) {
    const { title, description, date } = createEventInput;
    return this.prisma.event.create({
      data: {
        title,
        description,
        date: new Date(date),
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.event.findUnique({ where: { id } });
  }

  async findAll() {
    return this.prisma.event.findMany();
  }
}
