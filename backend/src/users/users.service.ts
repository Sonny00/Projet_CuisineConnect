import {
  BadGatewayException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './userDto/users.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './userDto/update-users.dto';
import { UpdatePasswordDto } from './userDto/update-password.dto';
// import { PreferenceDto } from '../preference/preferenceDto/preference.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const userData = this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
        role: 'USER',
        firstname: data.firstname,
        lastname: data.lastname,
      },
    });

    return userData;
  }

  async findOne(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async findUserById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    return user;
  }

  async getUsers(query): Promise<User[]> {
    const { search = undefined, skill = undefined } = query;

    const users = await this.prisma.user.findMany({
      orderBy: {
        firstname: 'desc',
      },
    });
    return users;
  }

  async updateUser(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User | null> {
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
    return updatedUser;
  }

  async updatePassword(
    id: string,
    updateDto: UpdatePasswordDto,
  ): Promise<User | null> {
    const { oldPassword, newPassword } = updateDto;

    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

    if (!isPasswordValid) {
      throw new BadGatewayException('Password is not valid');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        password: hashedPassword,
      },
    });
    return updatedUser;
  }

  async deleteUser(id: string): Promise<string> {
    await this.prisma.user.delete({
      where: { id },
    });
    return 'deleted';
  }
}
