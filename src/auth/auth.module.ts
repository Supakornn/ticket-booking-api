import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [UserModule, JwtModule.register({ secret: 'yourSecretKey' })],
  providers: [AuthService, AuthResolver, JwtStrategy, PrismaService],
})
export class AuthModule {}
