import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { ResponseSuccess } from './model/response-success.model';

@Injectable()
export class ResponseSuccessInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<ResponseSuccess> {
    return next.handle().pipe(
      map((res: ResponseSuccess) => {

        if (res.data) {
          return {
            statusCode: res.statusCode,
            message: res.message ? res.message : 'Operación Exitosa',
            success: true,
            data: res.data
          }
        }


        return {
          statusCode: res.statusCode,
          message: res.message ? res.message : 'Operación Exitosa',
          success: true,
        }
      }

      )
    );
  }
}
