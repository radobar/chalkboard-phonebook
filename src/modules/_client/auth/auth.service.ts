import { Injectable } from '@nestjs/common';
import { SigninService } from './services/signin.service';
import { CommonAuthService } from './services/common/common.auth.service';
import * as config from 'config';

const SALT: string = config.get('account.salt');

@Injectable()
export class AuthService {
  constructor(private signinService: SigninService, private commonAuthService: CommonAuthService) {}

  public async validateUser(name: string, password: string) {
    const user = await this.signinService.getUserByName(name);
    const cryptedPassword = this.commonAuthService.cryptPassword(password, SALT);

    if (user && user.password === cryptedPassword) {
      const { password, ...result } = user;

      return result;
    }

    return null;
  }
}
