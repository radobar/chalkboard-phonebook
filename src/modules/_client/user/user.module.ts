import { Module } from '@nestjs/common';

import { UserService } from './services/user.service';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  exports: [UserService],
  providers: [UserService],
})
export class UserModule {}
