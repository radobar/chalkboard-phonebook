import { BadRequestException, Injectable } from '@nestjs/common';
import * as config from 'config';
import { User } from 'src/entity/User';
import { Connection } from 'typeorm';

import { CustomHttpException } from '../../../../common/http-exception-filter';
import { SignupRequestDto } from '../dto/request/signup.dto';
import { SignupResponseDto } from '../dto/response/signup.dto';
import { CommonAuthService } from './common/common.auth.service';

const SALT: string = config.get('account.salt');

@Injectable()
export class SignupService {
  private entityManager = this.connection.createEntityManager();

  constructor(
    private readonly connection: Connection,
    private readonly commonAuthService: CommonAuthService,
  ) {}

  public async signup(data: SignupRequestDto): Promise<SignupResponseDto> {
    try {
      const { email, password } = data;

      const user = await this.commonAuthService.getUserByEmail(email);

      if (user) {
        throw new BadRequestException({ EN: 'User with this email already exist' });
      }

      const registeredUser = new User({
        ...data,
        password: this.commonAuthService.cryptPassword(password, SALT),
      });

      await this.entityManager.save(registeredUser);

      return {
        userId: registeredUser.id,
      };
    } catch (e) {
      throw new CustomHttpException(e, {
        EN: 'Signup error',
      });
    }
  }
}
