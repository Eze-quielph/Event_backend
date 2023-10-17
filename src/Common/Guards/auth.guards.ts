import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { PUBLIC_KEY } from '../Constants/key-decorators';
import { useToken } from '../utils/use.token';
import { IUseToken } from '../Interfaces/auth-interface';
import { UserService } from 'src/Module/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
 constructor(
  private readonly useService: UserService,
  private readonly reflector: Reflector
 ){}
  async canActivate(
    context: ExecutionContext,
  )  {
    const isPublic = this.reflector.get<boolean>(
      PUBLIC_KEY,
      context.getHandler()
    )
    if(isPublic){
      return true
    }

    const req = context.switchToHttp().getRequest<Request>()

    const token = req.header('coder_token')

    if(!token || Array.isArray(token)){
      throw new UnauthorizedException("Invalid token")
    }

    const manageToken: IUseToken | string = useToken(token)

    if(typeof manageToken === "string"){
      throw new UnauthorizedException(manageToken)
    }

    if(manageToken.expire){
      throw new UnauthorizedException("Token expired")
    }

    const {id} = manageToken

    const user = await this.useService.getUserById(id)
    if(!user){
      throw new UnauthorizedException("Invalid User")
    }

    req.idUser = user.id
    req.emailUser = user.email
    req.role = user.role
    return true;
  }
}