import { Request } from 'express';

import { IJwtPayload } from './jwtPayload.interface';

export interface IPayload extends Request {
  user: IJwtPayload;
}
