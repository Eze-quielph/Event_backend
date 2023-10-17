import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/Module/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}


  async generateToken(user: User) {
    const payload = { sub: user.id, email: user.Email }; 
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}