import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateBookingInput } from './dto/create-booking.input';
import { Booking } from './entities/booking.entity';

@Injectable()
export class BookingService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createBookingInput: CreateBookingInput): Promise<Booking> {
    const { userId, eventId } = createBookingInput;

    return this.prisma.booking.create({
      data: {
        user: { connect: { id: userId } },
        event: { connect: { id: eventId } },
      },
      include: {
        user: true,
        event: true,
      },
    });
  }

  async findAll(): Promise<Booking[]> {
    return this.prisma.booking.findMany({
      include: {
        user: true,
        event: true,
      },
    });
  }

  async findOne(id: number): Promise<Booking> {
    return this.prisma.booking.findUnique({
      where: { id },
      include: {
        user: true,
        event: true,
      },
    });
  }
}
