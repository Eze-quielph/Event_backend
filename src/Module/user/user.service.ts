import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserReturn } from 'src/Common/Interfaces/user-interface';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { ErrorManager } from 'src/share/types/error.manager';

@Injectable()
export class UserService {
  async register(createUserDto: CreateUserDto): Promise<User> {
    try {
      const existingUser = await User.findOne({
        where: { Email: createUserDto.Email },
      });

      if (existingUser) {
        throw new HttpException('El usuario ya existe', HttpStatus.BAD_REQUEST);
      }

      const hashedPassword = await bcrypt.hash(createUserDto.Password, 10);

      const dataUser = {
        FirstName: createUserDto.FirstName,
        LastName: createUserDto.LastName,
        Username: createUserDto.Username,
        Adress: createUserDto.Adress,
        Birthdate: createUserDto.Birthdate,
        Email: createUserDto.Email,
        Password: hashedPassword,
        Image: createUserDto.Image,
        Qr: createUserDto.Qr,
        Tickets: createUserDto.Tickets,
        Role: createUserDto.Role,
      };

      const user = await User.create(dataUser);
      return user;
    } catch (error) {
      throw new HttpException(error.message || 'No se pudo crear el usuario', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async login(loginUserDto: LoginUserDto): Promise<User | void> {
    try {
      const user = await User.findOne({
        where: {
          Email: loginUserDto.Email,
        },
      });

      if (user) {
        const password: string = loginUserDto.Password;
        const isPasswordValid = await bcrypt.compare(password, user.Password);
        
        if (isPasswordValid) {
          return user;
        } else {
          throw new HttpException('Credenciales incorrectas', HttpStatus.UNAUTHORIZED);
        }
      } else {
        throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      throw new HttpException('No se pudo iniciar sesión', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getUserById(id: string): Promise<UserReturn> {
    const user = await User.findByPk(id);
    return {
      id: user.id,
      name: user.Username,
      email: user.Email,
      role: user.Role,
    };
  }
}
