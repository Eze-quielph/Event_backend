import { Injectable } from '@nestjs/common';
import { User } from 'src/Module/user/entities/user.entity';
import { UserService } from 'src/Module/user/user.service';
import * as bycrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
  ) { }

  public async validateUser(email: string, password: string): Promise<any> {
    try {
      console.info(email, password)

      const dataValues = await this.userService.findUserByEmail(email);
      if (dataValues) {
        console.info(dataValues)
        const math = await bycrypt.compare(password, dataValues.Password);
        console.info(math)
        if (math) return dataValues
        else throw new Error('password incorrecta');
      }
    } catch (error) {
      console.warn(error);
    }
  }

  public async signJWT({
    payload,
    secret,
    expires,
  }: {
    payload: jwt.JwtPayload;
    secret: string;
    expires: number | string;
  }) {
    return jwt.sign(payload, secret, { expiresIn: expires });
  }

  public async generateJWT(user: User): Promise<any> {
    const dataValues = await this.userService.findUserByEmail(user.Email);

    console.info(dataValues)

    const payload = {
      sub: dataValues.id,
      role: dataValues.Role,
    };

    const access_token = await this.signJWT({
      payload,
      secret: process.env.JWT_SECRET,
      expires: '1h',
    });

    return {
      access_token,
      dataValues
    }
  }

}
