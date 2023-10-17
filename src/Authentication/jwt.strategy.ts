import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service'; 
import { User } from 'src/Module/user/entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'pepe', 
    });
  }

  async validate(payload: { sub: string; email: string }) {
    const user = await User.findOne({ where: { id: payload.sub, email: payload.email } });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}