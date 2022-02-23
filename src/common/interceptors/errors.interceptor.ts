import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import CustomLogger from '../logger';
import { ICustomError } from '../interfaces/error.interface';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err: ICustomError) => {
        if (err.message && err.message.EN) {
          if (err.status === HttpStatus.INTERNAL_SERVER_ERROR) {
            CustomLogger.error(err.message);
          }

          return throwError(
            new HttpException(
              {
                EN: err.message.EN,
                ...(err.message.DETAILS && { DETAILS: err.message.DETAILS }),
              },
              err.status || HttpStatus.INTERNAL_SERVER_ERROR,
            ),
          );
        }

        CustomLogger.error(err);

        return throwError(
          new InternalServerErrorException({
            EN: 'Internal Server Error',
          }),
        );
      }),
    );
  }
}
