import { Controller, Post, Body, HttpStatus, HttpException,  } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from 'src/Authentication/auth.service';
import { PublicAccess } from 'src/Common/Decorators/public.decoractors';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService, private readonly authService: AuthService) {}

  @PublicAccess()
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.userService.register(createUserDto);
      console.log(user)

      return { user, message: 'Usuario creado exitosamente' };
    } catch (error) {
      throw new HttpException(error.message || 'No se pudo crear el usuario', HttpStatus.BAD_REQUEST);
    }
  }
}
