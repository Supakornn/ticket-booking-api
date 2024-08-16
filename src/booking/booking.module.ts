import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingResolver } from './booking.resolver';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [BookingService, BookingResolver, PrismaService],
})
export class BookingModule {}
