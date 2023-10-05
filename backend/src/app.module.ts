import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { JwtService } from './jwt/jwt.service';
import { PrismaService } from './prisma.service';
import { UsersModule } from './users/users.module';


@Module({
  imports: [UsersModule, AuthModule, JwtModule],
  // controllers: [AppController, AuthController],
  providers: [PrismaClient, JwtService, PrismaService, AuthService],
})
export class AppModule {}
