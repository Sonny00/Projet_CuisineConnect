import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { UsersInterceptor } from 'src/interceptors/users.interceptor';
import { IsOwnerOrAdmin } from 'src/is-admin-or-owner.decorator';
import { OwnerOrAdminGuard } from 'src/owner-or-admin.guard';
import { Roles } from 'src/roles.decorator';
import { RolesGuard } from 'src/roles.guard';
import { CreateUserDto } from './userDto/users.dto';
import { UsersService } from './users.service';
import { Entities } from 'src/entity.enum';
import { UserRole } from './userRole.enum';
import { UpdateUserDto } from './userDto/update-users.dto';
import { LoggedInUser } from 'src/loggedin-user.decorator';
import { UpdatePasswordDto } from './userDto/update-password.dto';
import { BadRequestException } from '@nestjs/common';
// import { PreferenceDto } from '../preference/preferenceDto/preference.dto';

@Controller('users')
@UseInterceptors(UsersInterceptor)
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  async getUsers(@Query() query): Promise<User[]> {
    return this.userService.getUsers(query);
  }

  @Get('/users-only')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  // @Roles(UserRole.ADMIN)
  async getUsersOnly(@Query() query): Promise<User[]> {
    const allUsers = this.userService.getUsers(query);
    return (await allUsers).filter((user) => user.role === UserRole.USER);
  }

  @Get('current')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async getLoggedinUser(@LoggedInUser() user: User) {
    return user;
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UseGuards(OwnerOrAdminGuard)
  @IsOwnerOrAdmin(Entities.USER)
  async getUserById(@Param('id') id: string): Promise<User | null> {
    return this.userService.findUserById(id);
  }

  @Post()
  async createUser(@Body(ValidationPipe) user: CreateUserDto): Promise<User> {
    const existingUser = await this.userService.findOneByEmail(user.email);

    if (existingUser) {
      throw new BadRequestException(
        'Cet email est déjà utilisé. Veuillez en choisir un autre.',
      );
    }
    return await this.userService.create(user);
  }

  @Patch(':id')
  @UseGuards(OwnerOrAdminGuard)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @IsOwnerOrAdmin(Entities.USER)
  async updateUser(
    @Param('id') id: string,
    @Body(ValidationPipe) updateUser: UpdateUserDto,
  ): Promise<User | null> {
    return this.userService.updateUser(id, updateUser);
  }

  @Patch('updatePassword/:id')
  @UseGuards(OwnerOrAdminGuard)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @IsOwnerOrAdmin(Entities.USER)
  async updatePassword(
    @Param('id') id: string,
    @Body(ValidationPipe) update: UpdatePasswordDto,
  ): Promise<User | null> {
    return this.userService.updatePassword(id, update);
  }

  @Delete(':id')
  @UseGuards(OwnerOrAdminGuard)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @IsOwnerOrAdmin(Entities.USER)
  async deleteUser(@Param('id') id: string): Promise<string> {
    await this.userService.deleteUser(id);
    return 'deleted';
  }

  @Get(':id/favorites')
  async findUserFavorites(@Param('id') userId: string) {
    return this.userService.findUserFavorites(userId);
  }

  @Delete(':userId/favorites/:recetteId')
  async removeFavorite(
    @Param('userId') userId: string,
    @Param('recetteId') recetteId: string,
  ) {
    return this.userService.removeFavoriteFromUser(userId, recetteId);
  }

  // @Patch(':id/preferences')
  // @UseGuards(AuthGuard('jwt'))
  // updatePreferences(
  //   @Param('id') userId: string,
  //   @Body() preferenceDto: PreferenceDto,
  // ) {
  //   return this.userService.updatePreferences(userId, preferenceDto);
  // }
}
