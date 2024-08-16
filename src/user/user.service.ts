import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany({
      include: {
        bookings: {
          include: {
            event: true,
          },
        },
      },
    }) as unknown as User[];
  }

  async findOne(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        bookings: {
          include: {
            event: true,
          },
        },
      },
    }) as unknown as User;
  }
}
