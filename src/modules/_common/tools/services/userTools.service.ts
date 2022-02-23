import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as config from 'config';
import * as jwt from 'jsonwebtoken';

const JWT_SECRET: string = config.get('jwt.jwt_secret');

@Injectable()
export class UserToolsService {
  public getTokenPayload(headers: any) {
    try {
      const authorization = headers.authorization;
      const token = authorization.replace(/Bearer /, '');
      const payload = jwt.verify(token, JWT_SECRET);

      return payload;
    } catch {
      throw new UnauthorizedException();
    }
  }
}
