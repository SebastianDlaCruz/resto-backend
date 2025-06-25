import { AuthService, CookieService } from '@modules/auth';
import { CallHandler, ExecutionContext, HttpException, Injectable, NestInterceptor, UnauthorizedException } from '@nestjs/common';
import { Request, Response } from 'express';
import { catchError, Observable } from 'rxjs';

@Injectable()
export class RefreshTokenInterceptor implements NestInterceptor {

  constructor(private authService: AuthService, private cookieService: CookieService) { }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    const ctx = context.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();

    return next.handle().pipe(
      catchError(async (error: HttpException) => {

        if (error.getStatus() === 401 || req.cookies.refresh_token) {

          const refreshToken = req.cookies.refresh_token as string;

          if (!refreshToken) throw new UnauthorizedException('Por favor inicie session');

          try {

            const response = await this.authService.refreshToken(refreshToken, res);

            req.cookies.user = response;

            return next.handle();

          } catch {
            this.cookieService.clearCookie(res);
            throw new UnauthorizedException('Sesión expirada,vuelva a iniciar session')
          }
        }

      })

    );
  }
}
