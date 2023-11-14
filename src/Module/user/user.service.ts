import { Injectable, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserReturn } from 'src/Common/Interfaces/user-interface';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { dataValues } from '../../Common/Interfaces/user-interface';
import { ErrorManager } from 'src/share/error.manager';
import { UpdateUserDto } from './dto/update-user.dto';

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


  public async findUserByEmail(email: string): Promise<dataValues> {
    try {
      console.info(email)
      /*     return await User.findOne({ where: { Email: email } }) */
      const user = await User.findOne({ where: { Email: email } });
      return user.dataValues;
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
    try {
      const result = await User.restore({ where: { id: id } });

      if (result !== null) {
        return result;
      } else {
        throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
      }
    } catch (error) {
      throw new Error(
        `Ocurrió un error durante la activación del usuario: ${error.message}`,
      );
    }
  }

  public async getAllUsers() {
    try {
      const users = await User.findAll();
      if (!users || users.length === 0) {
        throw new NotFoundException('No hay usuarios en la base de datos');
      }
      const usersDataValues = users.map((user) => user.dataValues);
      return usersDataValues
    }
    catch (error) {
      throw new HttpException(
        'Hubo un error al obtener todos los usuarios', HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async updateUser(id: string, updateUser: UpdateUserDto) {
    try {
      const user = await User.findByPk(id);
      if (!user) {
        throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
      }
      const updatedUser = await user.update(updateUser);
      return updatedUser.dataValues;
    } catch (error) {
      throw new Error(
        `Ocurrió un error durante la actualización del usuario: ${error.message}`,
      );
    }
  }
}
