import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';

@Injectable()
export class CookieService {

  constructor(private configService: ConfigService) { }

  setAuthCookie(res: Response, accessToken: string, refreshToken: string): void {

    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: this.configService.get<string>('NODE_ENV') === 'production',
      maxAge: 60 * 60 * 1000,
      sameSite: 'strict',
    });

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: this.configService.get<string>('NODE_ENV') === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: 'strict',
    });

  }


  clearCookie(res: Response): void {
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
  }
}
