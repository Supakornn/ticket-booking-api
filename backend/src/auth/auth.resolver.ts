import { Args, Context, Mutation, Resolver, Query } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { RegisterResponse } from './types';
import { Response } from 'express';
import { LoginDto, RegisterDto } from './auth.dto';
import { BadRequestException } from '@nestjs/common';
import { LoginResponse } from './types';
import { User } from './user.type';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => RegisterResponse)
  async register(
    @Args('registerInput') registerDto: RegisterDto,
    @Context() context: { res: Response },
  ) {
    if (registerDto.password != registerDto.confirmPassword) {
      throw new BadRequestException({
        confirmPassword: 'Password and Confirm Password are not match.',
      });
    }
    const { user } = await this.authService.register(registerDto, context.res);
    return { user };
  }

  @Mutation(() => LoginResponse)
  async login(
    @Args('loginInput') loginDto: LoginDto,
    @Context() context: { res: Response },
  ) {
    return this.authService.login(loginDto, context.res);
  }

  @Query(() => [User], { name: 'users' })
  async getUsers(): Promise<User[]> {
    return this.authService.findAll();
  }
}
