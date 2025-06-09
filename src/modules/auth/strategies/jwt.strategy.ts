import { Rol } from '@common/enums';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

interface JWTPayload {
  uuid: string;
  email: string;
  rol: Rol;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {

  constructor(private configServices: ConfigService) {
    super({

      jwtFromRequest: ExtractJwt.fromExtractors([

        (req: Request) => req.cookies?.access_token as string,
        ExtractJwt.fromAuthHeaderAsBearerToken()

      ]),
      secretOrKey: configServices.get('KEY_TOKEN') ?? '',

    })
  }

  validate(payload: JWTPayload): unknown {

    return { email: payload.email, sub: payload.uuid, rol: payload.rol };
  }

  /*  private getTokenFromRequest(req: Request): string | undefined {
     return req.cookies?.access_token as string || req.headers?.authorization?.split(' ')[1];
 
   } */
}