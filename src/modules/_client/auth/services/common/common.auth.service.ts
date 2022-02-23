import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import * as requestIp from 'request-ip';
import { User } from 'src/entity/User';
import { Connection } from 'typeorm';

import { IPayload } from '../../../../../common/interfaces/request.interface';
import { CustomHttpException } from './../../../../../common/http-exception-filter';

@Injectable()
export class CommonAuthService {

  constructor(
    private readonly connection: Connection,
  ) { }

  public cryptPassword(password: string, salt: string): string {
    return crypto
      .createHmac('sha512', salt)
      .update(password)
      .digest('hex');
  }

  public getIp(request: IPayload): string {
    try {
      const ip = requestIp.getClientIp(request);

      return ip.substr(0, 7) === '::ffff:'
        ? ip.substr(7)
        : ip;
    } catch (e) {
      throw new CustomHttpException(e, {
        EN: `Get ip address error`,
      });
    }
  }

  public getUserByEmail(email: string) {
    return this.connection
      .getRepository(User)
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .getOne();
  }
}
