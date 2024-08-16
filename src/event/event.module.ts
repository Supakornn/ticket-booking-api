import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventResolver } from './event.resolver';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [EventService, EventResolver, PrismaService],
})
export class EventModule {}
