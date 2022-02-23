import { BadRequestException, Injectable } from '@nestjs/common';
import * as config from 'config';
import * as jwt from 'jsonwebtoken';
import { Connection } from 'typeorm';

import { SigninRequestDto } from '../dto/request/signin.dto';
import { SigninResponseDto } from '../dto/response/signin.dto';
import { CustomHttpException } from '../../../../common/http-exception-filter';
import { User } from '../../../../entity/User';
import { CommonAuthService } from './common/common.auth.service';

const JWT_SECRET: string = config.get('jwt.jwt_secret');
const SALT: string = config.get('account.salt');

@Injectable()
export class SigninService {
  constructor(
    private readonly connection: Connection,
    private readonly commonAuthService: CommonAuthService,
  ) {}

  public async singin({ email, password }: SigninRequestDto): Promise<SigninResponseDto> {
    try {
      const cryptedPassword = this.commonAuthService.cryptPassword(password, SALT);
      const user = await this.connection
        .getRepository(User)
        .createQueryBuilder('user')
        .where('user.email = :email', { email })
        .andWhere('user.password = :cryptedPassword', { cryptedPassword })
        .getOne();

      if (!user) {
        throw new BadRequestException({ EN: 'Incorrect login or password' });
      }

      return {
        id: user.id,
        token: jwt.sign({ id: user.id }, JWT_SECRET),
      };
    } catch (e) {
      throw new CustomHttpException(e, { EN: 'Incorrect login or password' });
    }
  }

  public async getUserByName(name: string): Promise<User> {
    return this.connection
      .getRepository(User)
      .createQueryBuilder('user')
      .where('user.firstName = :name', { name })
      .getOne();
  }
}
