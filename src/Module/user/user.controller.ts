import { Controller, Post, Body, HttpStatus, HttpException,  } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from 'src/Authentication/auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { PublicAccess } from 'src/Common/Decorators/public.decoractors';
import { AuthGuard } from 'src/Common/Guards/auth.guards';

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

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    try {
      const user = await this.userService.login(loginUserDto);
      if (user) {
        return { user, message: 'Usuario logueado exitosamente' };
      } else {
        throw new HttpException('Credenciales incorrectas', HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      throw new HttpException(error.message || 'No se pudo loguear el usuario', HttpStatus.BAD_REQUEST);
    }
  }
}
