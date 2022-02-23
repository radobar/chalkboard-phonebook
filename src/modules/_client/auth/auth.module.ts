import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { CommonAuthService } from './services/common/common.auth.service';
import { SigninService } from './services/signin.service';
import { SignupService } from './services/signup.service';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [PassportModule],
  controllers: [AuthController],
  exports: [CommonAuthService, SigninService, SignupService, AuthService],
  providers: [CommonAuthService, SigninService, SignupService, AuthService, LocalStrategy],
})
export class AuthModule {}
