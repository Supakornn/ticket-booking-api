import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginDto, RegisterDto } from './auth.dto';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async validateUser(loginDto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: loginDto.email },
    });

    if (user && (await bcrypt.compare(loginDto.password, user.password))) {
      return user;
    }

    return null;
  }

  async register(registerDto: RegisterDto, response: Response) {
    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [{ email: registerDto.email }, { username: registerDto.username }],
      },
    });

    if (existingUser) {
      throw new BadRequestException({
        email: 'Email or Username already in use.',
      });
    }

    const hashPassword = await bcrypt.hash(registerDto.password, 10);
    const user = await this.prisma.user.create({
      data: {
        username: registerDto.username,
        email: registerDto.email,
        password: hashPassword,
      },
    });

    return { user, response };
  }

  async login(loginDto: LoginDto, response: Response) {
    const user = await this.validateUser(loginDto);

    if (!user) {
      throw new BadRequestException({ user: 'Invalid Email or Password.' });
    }

    return { user, response };
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }
}
