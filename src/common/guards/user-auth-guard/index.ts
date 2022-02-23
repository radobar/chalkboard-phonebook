import { CanActivate, ExecutionContext, Injectable, SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

import { UserToolsService } from '../../../modules/_common/tools/services/userTools.service';

const GUARD_KEY: string = 'user_access_control';

@Injectable()
export class UserAccessGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly userToolsService: UserToolsService,
  ) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const data = this.reflector.get(GUARD_KEY, context.getHandler());

    if (!data) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    request.user = this.userToolsService.getTokenPayload(request.headers);

    return true;
  }
}

export const UserAuthGuard = (options: { protected: boolean } = { protected: false }) =>
  SetMetadata(GUARD_KEY, options);
