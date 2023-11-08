import { ExecutionContext, Injectable, CanActivate, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ADMIN_KEY, PUBLIC_KEY, ROLES_KEY } from '../Constants/key-decorators';
import { ROLES } from '../Constants/roles';
import { Request } from 'express';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.get<boolean>(
      PUBLIC_KEY,
      context.getHandler(),
    );

    console.log(isPublic)
    if (isPublic) {
      return true;
    }

    const roles = this.reflector.get<Array<keyof typeof ROLES>>(
      ROLES_KEY,
      context.getHandler(),
    );

    console.log(roles)
    const admin = this.reflector.get<string>(ADMIN_KEY, context.getHandler());

    const req = context.switchToHttp().getRequest<Request>();

    console.info('req: ', req)

    const { roleUser } = req;
    console.log(roleUser)

    if (roles[0] === undefined) {
      if (!admin) {
        return true;
      }else if(admin && roleUser === admin){
        return true;
      }else{
        throw new UnauthorizedException('Invalid role');
      }
    }

    const isAuth = roles.some((role) => role === roleUser);

    console.info('isAuth', isAuth);

    if(!isAuth){
        throw new UnauthorizedException('Invalid role');
    }

    return true;
  }
}
