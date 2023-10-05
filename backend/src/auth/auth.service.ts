import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './loginDto/loginDto';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.findOneByEmail(email);
    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        return user;
      } else {
        throw new UnauthorizedException(
          'Les informations de connexion sont incorrectes',
        );
      }
    }
    return null;
  }

  async login(user: LoginDto) {
    const validatedUser = await this.validateUser(user.email, user.password);

    if (validatedUser) {
      const payload = { sub: validatedUser.id };
      return {
        id: validatedUser.id,
        access_token: this.jwtService.sign(payload),
      };
    } else {
      throw new UnauthorizedException(
        'Les informations de connexion sont incorrectes',
      );
    }
  }
  async validateToken(token: string): Promise<any> {
    try {
      return this.jwtService.verify(token);
    } catch (e) {
      return null;
    }
  }
}
