import { Controller, Post, Body, HttpStatus, HttpException, Delete, Param, Put, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from 'src/Authentication/auth.service';
import { PublicAccess } from 'src/Common/Decorators/public.decoractors';
import { ErrorManager } from 'src/share/error.manager';
import { RolesAccess } from 'src/Common/Decorators/roles.decoractors';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService, private readonly authService: AuthService) { }

  @PublicAccess()
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    try {

      const currentDate = new Date()
      const dataUser = new Date(createUserDto.Birthdate)

      if (dataUser > currentDate) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Date is invalid',
        });
      }

      const user = await this.userService.register(createUserDto);
      console.log(user)

      return { user, message: 'Usuario creado exitosamente' };
    } catch (error) {
      throw new HttpException(error.message || 'No se pudo crear el usuario', HttpStatus.BAD_REQUEST);
    }
  }

  @PublicAccess()
  @Get(':id')
  async getUserById(@Param('id') id: string) {
    try {
      const user = await this.userService.getUserById(id);
      return { user };
    } catch (error) {
      throw new HttpException(error.message || 'No se pudo obtener el usuario por ID', HttpStatus.NOT_FOUND);
    }
  }

  @PublicAccess()
  @Get('email/:email')
  async findUserByEmail(@Param('email') email: string) {
    try {
      const user = await this.userService.findUserByEmail(email);
      return { user };
    } catch (error) {
      throw new HttpException(error.message || 'No se pudo encontrar el usuario por email', HttpStatus.NOT_FOUND);
    }
  }

  //dudoso manejo de roles... a revisar
  @RolesAccess('ADMIN')
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    try {
      await this.userService.deleteUserById(id);
      return { message: 'Usuario eliminado exitosamente' };
    } catch (error) {
      throw new HttpException(error.message || 'No se pudo eliminar el usuario', HttpStatus.BAD_REQUEST);
    }
  }

  @RolesAccess('ADMIN')
  @Put(':id/restore')
  async restoreUser(@Param('id') id: string) {
    try {
      await this.userService.restoreUserById(id);
      return { message: 'Usuario restaurado exitosamente' };
    } catch (error) {
      throw new HttpException(error.message || 'No se pudo restaurar el usuario', HttpStatus.BAD_REQUEST);
    }
  }

}
