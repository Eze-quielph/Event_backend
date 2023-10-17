import { IUseToken, AuthTokenResult } from '../Interfaces/auth-interface';
import * as jwt from 'jsonwebtoken';

export const useToken = (token: string): IUseToken | string => {
  try {
    const decode = jwt.decode(token) as unknown as AuthTokenResult;

    const currentDate = new Date();
    const expireDate = new Date(+decode.exp * 1000);

    return {
      id: decode.sub,
      email: decode.email,
      role: decode.role,
      expire: +expireDate <= +currentDate,
    };
  } catch (error) {
    return 'Token is invalid';
  }
};
