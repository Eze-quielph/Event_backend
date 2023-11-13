import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserReturn } from 'src/Common/Interfaces/user-interface';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UserService {
  async register(createUserDto: CreateUserDto): Promise<User> {
    try {
      console.log(createUserDto)
      const existingUser = await User.findOne({
        where: { Email: createUserDto.Email },
      });

      if (existingUser) {
        throw new HttpException('El usuario ya existe', HttpStatus.BAD_REQUEST);
      }

      const hashedPassword = await bcrypt.hash(createUserDto.Password, 10);

      let role: string = '';
      createUserDto.Role === undefined ? role = 'USER' : role = createUserDto.Role;

      const dataUser = {
        FirstName: createUserDto.FirstName,
        LastName: createUserDto.LastName,
        Username: createUserDto.Username,
        Adress: createUserDto.Adress,
        Birthdate: createUserDto.Birthdate,
        Email: createUserDto.Email,
        Password: hashedPassword,
        Image: createUserDto.Image,
        Role: role,
      };

      console.info(dataUser)

      const user = await User.create(dataUser);
      return user.dataValues;
    } catch (error) {
      throw new HttpException(error.message || 'No se pudo crear el usuario', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getUserById(sub: string): Promise<UserReturn> {
    const user = await User.findByPk(sub);

    console.log(sub)
    if (!user) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }

    return {
      id: user.id,
      name: user.Username,
      email: user.Email,
      role: user.Role,
    };
  }


  public async findUserByEmail(email: string): Promise<User> {
    try {
      console.info(email)
      return await User.findOne({ where: { Email: email } })
    } catch (error) {
      throw new HttpException('No se pudo iniciar sesión', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async deleteUserById(id: string): Promise<void> {
    try {
      const result = await User.destroy({
        where: { id },
      });

      if (result === 0) {
        throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      throw new HttpException(error.message || 'No se pudo eliminar el usuario', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async restoreUserById(id: string): Promise<void> {
    const user = await User.findByPk(id);

    if (!user) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }

    // flag paranoid dudoso, a revisar...
    await user.update({ paranoid: false });
  }
}
